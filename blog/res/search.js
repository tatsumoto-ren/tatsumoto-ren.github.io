/**
 *
 * @licstart  The following is the entire license notice for the
 *  JavaScript code in this page.
 *
 * Copyright (C) 2026  Ren Tatsumoto
 *
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */

/**
 * Initialize client-side article search behavior in an isolated module scope.
 * @returns {void}
 */
(function searchModule() {
    "use strict";

    // Keep reusable query grammar visible and avoid recompiling regex literals in hot paths.
    const QUERY_WHITESPACE_PATTERN = /\s+/g;
    const QUERY_SPLIT_PATTERN = /\s+/;
    // Combining marks belong to words, so decomposed accents must survive punctuation trimming.
    const EDGE_PUNCTUATION_PATTERN = /^[^\p{L}\p{M}\p{N}]+|[^\p{L}\p{M}\p{N}]+$/gu;
    const REGEXP_ESCAPE_PATTERN = /[.*+?^${}()|[\]\\]/g;
    // Inspect UTF-16 code units without the Unicode flag so clipping cannot separate a surrogate pair.
    const SURROGATE_PAIR_PATTERN = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;

    // Reuse collation rules instead of setting them up for every tied pair of search results.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
    const TITLE_COLLATOR = new Intl.Collator(undefined, { sensitivity: "accent" });

    // Scoring weights for search result ranking.
    // Higher values make a match type more prominent in the results.
    const SearchScore = Object.freeze({
        TITLE: 100,
        TAG: 50,
        PARENT: 30,
        BODY: 10,
    });

    /** An original-text search-index property and its ranking weight. Immutable. */
    class SearchField {
        /**
         * @param {string} name — original-text property name on SearchIndexEntry.
         * @param {number} weight — ranking weight for matches in this property.
         */
        constructor(name, weight) {
            this.name = name;
            this.weight = weight;
            Object.freeze(this);
        }
    }

    /**
     * Immutable content of one search-index field, paired with its ranking weight.
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
     */
    class IndexedTextField {
        /**
         * Bind a title, body, or parent field definition to one search-index entry.
         * @param {SearchIndexEntry} entry — candidate index entry containing title, body, and parent text.
         * @param {SearchField} definition — name and weight of the field to analyze.
         */
        constructor(entry, definition) {
            this.content = entry[definition.name];
            this.weight = definition.weight;
            Object.freeze(this);
        }
    }

    // Text fields allow substring matches. Tags are checked separately with full-tag matchers.
    const SEARCH_FIELDS = Object.freeze([
        new SearchField("title", SearchScore.TITLE),
        new SearchField("parent", SearchScore.PARENT),
        new SearchField("body", SearchScore.BODY),
    ]);

    // Tunable parameters for the search UI.
    const SearchConfig = Object.freeze({
        // Number of characters shown before and after the matched query in a snippet.
        SNIPPET_CONTEXT_CHARS: 120,
        // Maximum number of result cards rendered in the DOM.
        MAX_DISPLAYED_RESULTS: 100,
        // Milliseconds to wait after the last keystroke before running a search.
        DEBOUNCE_MS: 200,
    });

    // States of the asynchronous search-index request.
    const SearchLoadStatus = Object.freeze({
        LOADING: "loading",
        READY: "ready",
        FAILED: "failed",
    });

    /** Immutable localized messages rendered into the search container. */
    class SearchMessages {
        /** @param {HTMLElement|null} container — search container with localized data attributes. */
        constructor(container) {
            const data = container?.dataset ?? {};
            this.loading = data.loadingMessage ?? "Loading search index...";
            this.noResults = data.noResultsMessage ?? "No results found.";
            this.misconfigured = data.misconfiguredMessage ?? "Search is misconfigured.";
            this.failed = data.failedMessage ?? "Failed to load search index.";
            this.results = data.resultsMessage ?? "Results: {count}";
            this.showingFirst = data.showingFirst ?? "(showing first {count})";
            Object.freeze(this);
        }
    }

    /** Immutable references to the mutable search DOM. */
    class SearchElements {
        /**
         * Initialize the required search elements and localized messages.
         * @param {HTMLInputElement} input — search input element.
         * @param {HTMLElement} resultsContainer — rendered result container.
         * @param {HTMLElement|null} searchContainer — search configuration container.
         * @param {HTMLElement} statusElement — live search status element.
         */
        constructor(input, resultsContainer, searchContainer, statusElement) {
            this.input = input;
            this.messages = new SearchMessages(searchContainer);
            this.resultsContainer = resultsContainer;
            this.searchContainer = searchContainer;
            this.statusElement = statusElement;
            Object.freeze(this);
        }
    }

    /**
     * Create immutable references for the search UI while leaving DOM content mutable.
     * Returns null on pages without search, or after reporting incomplete search markup.
     * @returns {SearchElements|null} immutable search UI references and messages, or null.
     */
    function getSearchHtmlElements() {
        const input = document.getElementById("search-input");
        if (input === null) {
            // The absence of a search bar is not an error.
            return null;
        }
        if (!(input instanceof HTMLInputElement)) {
            console.error("Search: #search-input must be an input element.");
            return null;
        }
        const resultsContainer = document.getElementById("search-results");
        const searchContainer = document.getElementById("search-container");
        const statusElement = document.getElementById("number-results-found");
        if (!resultsContainer || !statusElement) {
            console.error("Search: missing required element for initialization.");
            return null;
        }
        return new SearchElements(input, resultsContainer, searchContainer, statusElement);
    }

    /**
     * Format the localized status shown above non-empty search results.
     * @param {number} count — number of matching entries.
     * @param {SearchMessages} messages — localized search messages.
     * @returns {string} localized result count text.
     */
    function resultCountMessage(count, messages) {
        const resultCount = messages.results.replace("{count}", count);
        if (count <= SearchConfig.MAX_DISPLAYED_RESULTS) {
            return resultCount;
        }
        return `${resultCount} ${messages.showingFirst.replace("{count}", SearchConfig.MAX_DISPLAYED_RESULTS)}`;
    }

    /** An immutable query word with case-insensitive substring and full-token matchers. */
    class QueryWord {
        /**
         * @param {string} text — query token after stripping edge punctuation.
         */
        constructor(text) {
            this.pattern = makeLiteralPattern(text);
            this.exactPattern = new RegExp(`^${this.pattern.source}$`, "iu");
            Object.freeze(this);
        }
    }

    /** A normalized phrase and distinct query words, compiled once without changing indexed text. */
    class Query {
        /**
         * @param {string} phrase — full query with normalized whitespace and original case.
         * @param {QueryWord[]} words — distinct query words with their compiled matchers.
         */
        constructor(phrase, words) {
            /** Locate the complete query phrase anywhere in a title, body, or parent field. */
            this.phrasePattern = makeLiteralPattern(phrase);
            /** Match the complete query against one complete tag, never across adjacent tags. */
            this.exactPhrasePattern = new RegExp(`^${this.phrasePattern.source}$`, "iu");
            this.words = Object.freeze([...words]);
            Object.freeze(this);
        }

        /**
         * Build a Query from a raw user query string, tokenizing it once.
         * Splits on any run of whitespace, strips leading and
         * trailing punctuation from individual words, drops empty tokens, and
         * deduplicates words in first-seen order.
         * @param {string} raw — the user's raw search query.
         * @returns {Query} the parsed, immutable query.
         */
        static parse(raw) {
            const phrase = raw.trim().replace(QUERY_WHITESPACE_PATTERN, " ");
            const words = [];
            for (const token of phrase.split(QUERY_SPLIT_PATTERN)) {
                const text = stripPunctuation(token);
                if (text && !words.some(word => word.exactPattern.test(text))) {
                    words.push(new QueryWord(text));
                }
            }
            return new Query(phrase, words);
        }
    }

    /**
     * Strip leading and trailing punctuation from a query word.
     * @param {string} word — raw query word or whitespace-delimited text token.
     * @returns {string} word with punctuation removed from both edges.
     */
    function stripPunctuation(word) {
        return word.replace(EDGE_PUNCTUATION_PATTERN, "");
    }

    /**
     * Compile a literal case-insensitive matcher without changing original text offsets.
     * @param {string} text — literal query text, not a regex expression.
     * @returns {RegExp} non-global Unicode-aware matcher safe for repeated tests.
     */
    function makeLiteralPattern(text) {
        // Keep strings like "node.js" and "a+b" literal,
        // with no boundary lookarounds or lowercase offset maps.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/ignoreCase
        return new RegExp(text.replace(REGEXP_ESCAPE_PATTERN, "\\$&"), "iu");
    }

    /** A normalized, immutable entry from the generated search index. */
    class SearchIndexEntry {
        /** @param {object} entry — raw entry decoded from the search index. */
        constructor(entry) {
            this.title = entry.title ?? "";
            this.url = entry.url;
            this.body = entry.body ?? "";
            this.tags = Object.freeze([...(entry.tags ?? [])]);
            this.parent = entry.parent ?? "";
            Object.freeze(this);
        }
    }

    /** Local mutable scoring state for one index entry, copied into an immutable result afterward. */
    class SearchAnalysis {
        /** Initialize independent accumulators so each query word is counted only once across fields. */
        constructor() {
            this.score = 0;
            this.hasPhraseMatch = false;
            // All distinct query words found as substrings, including those that match complete words.
            this.substringMatchedQueryWords = new Set();
            // The subset also found as complete field tokens or exact canonical tags.
            this.wholeMatchedQueryWords = new Set();
        }
    }

    /**
     * A scored search result: a matched index entry and its ranking metadata.
     * Immutable.
     */
    class ScoredResult {
        /**
         * @param {SearchIndexEntry} entry — the matched search index entry.
         * @param {SearchAnalysis} analysis — completed per-entry scoring state, not retained by the result.
         */
        constructor(entry, analysis) {
            /** Original index entry used to render the result's link, parent title, and matching substrings. */
            this.entry = entry;

            /**
             * Sum of field weights earned by matching query words.
             * Each word scores once per field, not once per occurrence.
             * Used after whole-word count, phrase priority, and total distinct-word count.
             */
            this.score = analysis.score;

            /**
             * Number of distinct query words found anywhere in the entry, including exact tags.
             * Includes both matches inside larger words and complete-word matches.
             * Used after whole-word count and phrase priority.
             */
            this.matchedWordCount = analysis.substringMatchedQueryWords.size;

            /**
             * Whether a text field contains the complete query phrase or the complete query matches a tag.
             * Both checks ignore case.
             * These results rank first when whole-word counts are tied.
             */
            this.hasPhraseMatch = analysis.hasPhraseMatch;

            /**
             * Number of distinct query words matching complete field tokens or exact tags.
             * This is the first ranking criterion, so more whole-word matches rank higher.
             */
            this.wholeWordMatchCount = analysis.wholeMatchedQueryWords.size;
            Object.freeze(this);
        }
    }

    /**
     * The immutable outcome of a search-index request.
     * Status is authoritative because JavaScript promises may reject with any
     * value, including a falsy one.
     */
    class SearchLoadResult {
        /**
         * @param {string} status — ready or failed load status.
         * @param {SearchIndexEntry[]|null} index — normalized index copied and frozen on success.
         * @param {*} error — failure detail, defaulting to null when omitted or undefined.
         */
        constructor(status, index = null, error = null) {
            this.status = status;
            this.index = index === null ? null : Object.freeze([...index]);
            this.error = error;
            Object.freeze(this);
        }
    }

    /**
     * Half-open [start, end) positions for an exact query-word match or its expanded display context.
     * Positions use JavaScript string units (UTF-16 code units), not a count of visible characters.
     * Mutable: mergeRanges creates fresh output ranges and extends `end` on
     * those when joining overlapping or touching ranges. Keeping this local
     * mutation avoids repeatedly copying short-lived ranges during a merge.
     */
    class Range {
        /**
         * @param {number} start — inclusive start offset.
         * @param {number} end — exclusive end offset.
         */
        constructor(start, end) {
            this.start = start;
            this.end = end;
        }
    }

    /**
     * Locate every query-word occurrence in a matched search-index entry's body field.
     * @param {string} entryBody — SearchIndexEntry.body with original case, not the HTML document body.
     * @param {QueryWord[]} queryWords — distinct query words with compiled matchers.
     * @returns {Range[]} unsorted, possibly overlapping positions,
     * or [] if the entry matched only other fields.
     */
    function collectMatchRanges(entryBody, queryWords) {
        return queryWords.flatMap(queryWord => collectBodyWordRanges(entryBody, queryWord));
    }

    /**
     * Locate query-word occurrences in a matched search-index entry's body field.
     * These positions are used to clip displayed substrings and highlight matches.
     * Includes overlapping occurrences, such as both instances of "ana" in "banana".
     * @param {string} entryBody — SearchIndexEntry.body with original case, not the HTML document body.
     * @param {QueryWord} queryWord — query word whose occurrences need highlighting.
     * @returns {Range[]} start/end positions in entryBody, measured in UTF-16 code units.
     * Returns [] when only another entry field matches.
     */
    function collectBodyWordRanges(entryBody, queryWord) {
        // indexOf is case-sensitive. The i flag matches original text
        // without lowercasing or shifting offsets.
        const matcher = new RegExp(queryWord.pattern.source, "giu");
        const queryWordMatchRanges = [];
        // Resume one complete character after this match's start, not after the whole matched word.
        // That keeps both "ana" occurrences in "banana" without moving into the middle of an emoji.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec
        for (let match = matcher.exec(entryBody); match !== null; match = matcher.exec(entryBody)) {
            queryWordMatchRanges.push(new Range(match.index, match.index + match[0].length));
            matcher.lastIndex = match.index + String.fromCodePoint(entryBody.codePointAt(match.index)).length;
        }
        return queryWordMatchRanges;
    }

    /**
     * Merge overlapping or touching ranges to avoid nested highlights or repeated display context.
     * @param {Range[]} input — exact match ranges or expanded display ranges to combine.
     * @returns {Range[]} sorted, non-overlapping ranges.
     */
    function mergeRanges(input) {
        return [...input]
            .sort((a, b) => a.start - b.start)
            .reduce((merged, range) => {
                const last = merged[merged.length - 1];
                if (!last || range.start > last.end) {
                    merged.push(new Range(range.start, range.end));
                } else {
                    last.end = Math.max(last.end, range.end);
                }
                return merged;
            }, []);
    }

    /**
     * Escape plain text for safe insertion into HTML.
     * Replaces &, <, >, and " with their HTML entity equivalents.
     * @param {string} text — raw plain text.
     * @returns {string} the text with special characters replaced by HTML entities.
     */
    function escapeTextForHtml(text) {
        const div = document.createElement("div");
        div.appendChild(document.createTextNode(text));
        return div.innerHTML;
    }

    /**
     * Check whether clipping would cut a two-part JavaScript character, such as an emoji, in half.
     * @param {string} entryBody — SearchIndexEntry.body, not the HTML document body.
     * @param {number} offset — clipping position within SearchIndexEntry.body,
     * measured in JavaScript string units (UTF-16 code units).
     * @returns {boolean} true only when the position falls between the two parts of one character.
     */
    function splitsSurrogatePair(entryBody, offset) {
        return (
            offset > 0 &&
            offset < entryBody.length &&
            SURROGATE_PAIR_PATTERN.test(entryBody.substring(offset - 1, offset + 1))
        );
    }

    /**
     * Expand one original match with context without leaving half an emoji at either edge.
     * @param {string} entryBody — SearchIndexEntry.body, not the HTML document body.
     * @param {Range} queryWordMatchRange — exact query-word positions in entryBody, before adding context.
     * @returns {Range} bounded context window whose edges keep emoji intact.
     */
    function expandSnippetWindow(entryBody, queryWordMatchRange) {
        let contextStart = Math.max(0, queryWordMatchRange.start - SearchConfig.SNIPPET_CONTEXT_CHARS);
        let contextEnd = Math.min(entryBody.length, queryWordMatchRange.end + SearchConfig.SNIPPET_CONTEXT_CHARS);
        if (splitsSurrogatePair(entryBody, contextStart)) {
            contextStart -= 1;
        }
        if (splitsSurrogatePair(entryBody, contextEnd)) {
            contextEnd += 1;
        }
        return new Range(contextStart, contextEnd);
    }

    /**
     * Collect context windows for every original-text match and merge overlapping windows.
     * @param {string} entryBody — SearchIndexEntry.body, not the HTML document body.
     * @param {Range[]} queryWordMatchRanges — exact positions to highlight,
     * before adding surrounding context.
     * @returns {Range[]} sorted, disjoint context windows, or an empty array when nothing matches.
     */
    function collectSnippetWindows(entryBody, queryWordMatchRanges) {
        return mergeRanges(queryWordMatchRanges.map(matchRange => expandSnippetWindow(entryBody, matchRange)));
    }

    /**
     * Escape text and wrap every query-word occurrence in <mark>.
     * @param {string} entryBody — SearchIndexEntry.body, not the HTML document body.
     * @param {Range} snippetContextRange — displayed substring bounds,
     * including unhighlighted surrounding text.
     * @param {Range[]} queryWordMatchRanges — exact query-word positions inside this displayed substring.
     * @returns {string} escaped HTML with matches wrapped in <mark>.
     */
    function highlightWordsInText(entryBody, snippetContextRange, queryWordMatchRanges) {
        // Original-text match offsets are reused for highlighting, so no case conversion can shift them.
        let html = "";
        let cursor = snippetContextRange.start;
        for (const matchRange of queryWordMatchRanges) {
            html += escapeTextForHtml(entryBody.substring(cursor, matchRange.start));
            html += `<mark>${escapeTextForHtml(entryBody.substring(matchRange.start, matchRange.end))}</mark>`;
            cursor = matchRange.end;
        }
        return html + escapeTextForHtml(entryBody.substring(cursor, snippetContextRange.end));
    }

    /**
     * Render sorted windows while consuming their matches in one forward pass.
     * @param {string} entryBody — SearchIndexEntry.body, not the HTML document body.
     * @param {Range[]} snippetContextRanges — sorted display bounds with surrounding context,
     * without overlaps.
     * @param {Range[]} queryWordMatchRanges — exact positions to highlight, not the expanded display bounds.
     * @returns {string} escaped, highlighted substrings separated by ellipses.
     */
    function renderSnippetWindows(entryBody, snippetContextRanges, queryWordMatchRanges) {
        // A local cursor avoids rescanning all previous matches for each distant substring.
        let queryWordMatchIndex = 0;
        const parts = [];
        for (const contextRange of snippetContextRanges) {
            const contextQueryWordMatchRanges = [];
            while (
                queryWordMatchIndex < queryWordMatchRanges.length &&
                queryWordMatchRanges[queryWordMatchIndex].start < contextRange.end
            ) {
                contextQueryWordMatchRanges.push(queryWordMatchRanges[queryWordMatchIndex]);
                queryWordMatchIndex += 1;
            }
            parts.push(highlightWordsInText(entryBody, contextRange, contextQueryWordMatchRanges));
        }
        return parts.join("...");
    }

    /**
     * Build HTML from every matching substring, merging overlapping context windows.
     * Every matching query word within each substring is wrapped in <mark>.
     * @param {string} entryBody — SearchIndexEntry.body, not the HTML document body.
     * @param {Query} query — original-case query words with case-insensitive matchers.
     * @returns {string} HTML with matches wrapped in <mark>, or "" if no match.
     */
    function makeSnippet(entryBody, query) {
        // Don't hide later matches.
        // Exact query-word positions in SearchIndexEntry.body control highlighting,
        // without surrounding context.
        // Merge overlapping matches so <mark> elements do not nest.
        const queryWordMatchRanges = mergeRanges(collectMatchRanges(entryBody, query.words));
        // Display ranges add 120 UTF-16 string units before and after matches, capped at entryBody's edges.
        // Merge overlapping context so text is not displayed twice,
        // but keep exact match ranges for highlighting.
        const snippetContextRanges = collectSnippetWindows(entryBody, queryWordMatchRanges);
        if (snippetContextRanges.length === 0) {
            return "";
        }
        let html = renderSnippetWindows(entryBody, snippetContextRanges, queryWordMatchRanges);
        if (snippetContextRanges[0].start > 0) {
            html = `...${html}`;
        }
        if (snippetContextRanges[snippetContextRanges.length - 1].end < entryBody.length) {
            html = `${html}...`;
        }
        return html;
    }

    /**
     * Analyze one entry using original text and exact canonical tag values.
     * @param {SearchIndexEntry} entry — normalized entry with original-case text fields.
     * @param {Query} query — the parsed query (words plus normalized phrase).
     * @returns {ScoredResult} ranking metadata for the entry.
     */
    function analyzeEntry(entry, query) {
        const analysis = new SearchAnalysis();
        for (const searchField of SEARCH_FIELDS) {
            analyzeTextField(new IndexedTextField(entry, searchField), query, analysis);
        }
        analyzeTags(entry.tags, query, analysis);
        return new ScoredResult(entry, analysis);
    }

    /**
     * Score literal text matches and whole whitespace-delimited tokens with edge punctuation stripped.
     * @param {IndexedTextField} indexField — title, body, or parent content from one index entry
     * and its weight.
     * @param {Query} query — parsed case-insensitive query.
     * @param {SearchAnalysis} analysis — local scoring state to update.
     * @returns {void}
     */
    function analyzeTextField(indexField, query, analysis) {
        analysis.hasPhraseMatch ||= query.phrasePattern.test(indexField.content);
        // Find query words contained in this search-index field.
        // Partial matches count: "fun" matches "function".
        const matchingQueryWords = query.words.filter(queryWord => queryWord.pattern.test(indexField.content));
        if (matchingQueryWords.length === 0) {
            return;
        }
        // Each query word earns this field's weight once, regardless of how often it occurs.
        // Other fields may score the same word again, while the sets keep entry-wide word counts distinct.
        analysis.score += matchingQueryWords.length * indexField.weight;
        // Earlier fields already established these whole-word counts, but this field still earns its score.
        if (matchingQueryWords.every(queryWord => analysis.wholeMatchedQueryWords.has(queryWord))) {
            return;
        }
        const fieldTokens = indexField.content.split(QUERY_SPLIT_PATTERN).map(stripPunctuation);
        // Set has no bulk-add method. Record matches and check which also match a complete field token.
        for (const queryWord of matchingQueryWords) {
            analysis.substringMatchedQueryWords.add(queryWord);
            if (
                !analysis.wholeMatchedQueryWords.has(queryWord) &&
                fieldTokens.some(token => queryWord.exactPattern.test(token))
            ) {
                analysis.wholeMatchedQueryWords.add(queryWord);
            }
        }
    }

    /**
     * Score exact tags without partial matches or phrases spanning adjacent tags.
     * @param {string[]} tags — canonical lowercase tags validated by Tatsublog.
     * @param {Query} query — parsed query with full-token and full-phrase matchers.
     * @param {SearchAnalysis} analysis — local scoring state to update.
     * @returns {void}
     */
    function analyzeTags(tags, query, analysis) {
        // Use the same Unicode case matching as query deduplication, so "ſ s" and "s ſ" keep identical results.
        analysis.hasPhraseMatch ||= tags.some(tag => query.exactPhrasePattern.test(tag));
        const matchingTagQueryWords = query.words.filter(queryWord =>
            tags.some(tag => queryWord.exactPattern.test(tag)),
        );
        analysis.score += matchingTagQueryWords.length * SearchScore.TAG;
        // Every exact tag match belongs in both sets. Set has no bulk-add method.
        for (const queryWord of matchingTagQueryWords) {
            analysis.substringMatchedQueryWords.add(queryWord);
            analysis.wholeMatchedQueryWords.add(queryWord);
        }
    }

    /**
     * Compare results by whole words, phrase, matched words, score, then case-insensitive title order.
     * @param {ScoredResult} left — first result to compare.
     * @param {ScoredResult} right — second result to compare.
     * @returns {number} negative when left ranks before right.
     */
    function compareSearchResults(left, right) {
        // A body containing "have fun" must outrank a title containing only "function" or "funds".
        // Sort by distinct whole words first, then full-string match, then by number of distinct words
        // found, then by weighted field score, then by title alphabetically.
        return (
            right.wholeWordMatchCount - left.wholeWordMatchCount ||
            Number(right.hasPhraseMatch) - Number(left.hasPhraseMatch) ||
            right.matchedWordCount - left.matchedWordCount ||
            right.score - left.score ||
            // Ignore case for title ties while retaining accent differences in the original text.
            TITLE_COLLATOR.compare(left.entry.title, right.entry.title)
        );
    }

    /**
     * Collect and rank all matching entries from the search index.
     * @param {SearchIndexEntry[]} searchIndex — normalized index with original-case text fields.
     * @param {Query} query — parsed query with case-insensitive literal matchers.
     * @returns {ScoredResult[]} results sorted by relevance.
     */
    function collectSearchResults(searchIndex, query) {
        return searchIndex
            .map(entry => analyzeEntry(entry, query))
            .filter(result => result.matchedWordCount > 0)
            .sort(compareSearchResults);
    }

    /**
     * Create a link element for a search result.
     * @param {SearchIndexEntry} entry — search index entry.
     * @returns {HTMLAnchorElement} link element.
     */
    function createResultLink(entry) {
        const link = document.createElement("a");
        link.href = entry.url;
        link.textContent = entry.title;
        return link;
    }

    /**
     * Create a parent element if entry has a parent.
     * @param {SearchIndexEntry} entry — search index entry.
     * @returns {HTMLDivElement|null} parent element or null.
     */
    function createParentElement(entry) {
        if (!entry.parent) {
            return null;
        }
        const parent = document.createElement("div");
        parent.className = "parent-article-name";
        parent.textContent = entry.parent;
        return parent;
    }

    /**
     * Create a snippet element when a matched search-index entry has occurrences in its body field.
     * @param {SearchIndexEntry} entry — search index entry.
     * @param {Query} query — parsed query with case-insensitive literal matchers.
     * @returns {HTMLDivElement|null} matching body substrings, or null if only other entry fields match.
     */
    function createSnippetElement(entry, query) {
        const entryBodySnippet = makeSnippet(entry.body ?? "", query);
        if (!entryBodySnippet) {
            return null;
        }
        const snippet = document.createElement("div");
        snippet.className = "snippet";
        snippet.innerHTML = entryBodySnippet;
        return snippet;
    }

    /**
     * Create a DOM element for a single search result card.
     * @param {SearchIndexEntry} entry — the matched search index entry.
     * @param {Query} query — parsed query with case-insensitive literal matchers.
     * @returns {HTMLDivElement} a .search-result div ready to append.
     */
    function createResultCard(entry, query) {
        const resultCard = document.createElement("div");
        resultCard.className = "search-result";

        resultCard.appendChild(createResultLink(entry));

        const parent = createParentElement(entry);
        if (parent) {
            resultCard.appendChild(parent);
        }

        const snippet = createSnippetElement(entry, query);
        if (snippet) {
            resultCard.appendChild(snippet);
        }

        return resultCard;
    }

    /**
     * Render ranked results or the localized empty-result status.
     * @param {SearchElements} searchElements — immutable search UI references and messages.
     * @param {ScoredResult[]} scoredResults — matching entries in ranking order.
     * @param {Query} query — the parsed query used to create snippets.
     * @returns {void}
     */
    function renderSearchResults(searchElements, scoredResults, query) {
        if (scoredResults.length === 0) {
            searchElements.statusElement.textContent = searchElements.messages.noResults;
            return;
        }
        searchElements.statusElement.textContent = resultCountMessage(scoredResults.length, searchElements.messages);
        for (const result of scoredResults.slice(0, SearchConfig.MAX_DISPLAYED_RESULTS)) {
            searchElements.resultsContainer.appendChild(createResultCard(result.entry, query));
        }
    }

    /**
     * Run a search and render results into the DOM.
     * @param {SearchElements} searchElements — immutable search UI references and messages.
     * @param {SearchIndexEntry[]} searchIndex — normalized index entries.
     * @returns {void}
     */
    function performSearch(searchElements, searchIndex) {
        const query = searchElements.input.value.trim();
        if (!query) {
            clearSearch(searchElements);
            return;
        }
        const parsedQuery = Query.parse(query);
        if (parsedQuery.words.length === 0) {
            clearSearch(searchElements);
            return;
        }
        setQueryInUrl(query);
        searchElements.resultsContainer.innerHTML = "";
        renderSearchResults(searchElements, collectSearchResults(searchIndex, parsedQuery), parsedQuery);
    }

    /** Immutable plain fragment and serialized parameters decoded from a URL hash. */
    class SearchHash {
        /**
         * Initialize parsed URL hash data.
         * @param {string} fragment — optional bare anchor segment.
         * @param {URLSearchParams} parameters — parameters retained for serialization.
         */
        constructor(fragment, parameters) {
            this.fragment = fragment;
            this.parameters = parameters.toString();
            Object.freeze(this);
        }
    }

    /**
     * Split the URL hash into an optional plain anchor and parameter data.
     * Search URLs historically use hash parameters, while ordinary anchors use
     * forms such as #section. Keeping the first bare segment separate prevents
     * URLSearchParams from changing #section into #section=.
     * @returns {SearchHash} parsed hash data.
     */
    function readSearchHash() {
        const segments = window.location.hash.slice(1).split("&");
        const fragment = segments[0] && !segments[0].includes("=") ? segments.shift() : "";
        return new SearchHash(fragment, new URLSearchParams(segments.join("&")));
    }

    /**
     * Serialize a plain anchor and hash parameters without changing the anchor.
     * @param {string} fragment — optional bare anchor segment.
     * @param {string} parameters — serialized hash parameters to append.
     * @returns {string} hash content without the leading # character.
     */
    function formatSearchHash(fragment, parameters) {
        return [fragment, parameters].filter(Boolean).join("&");
    }

    /**
     * Read the search query from the URL hash (e.g., #q=some+query).
     * @returns {string} the decoded query, or "" if absent.
     */
    function getQueryFromUrl() {
        return new URLSearchParams(readSearchHash().parameters).get("q") ?? "";
    }

    /**
     * Write the search query to the URL hash so it persists across reloads.
     * @param {string} query — the query to store, or "" to remove its hash parameter.
     * @returns {void}
     */
    function setQueryInUrl(query) {
        const searchHash = readSearchHash();
        const parameters = new URLSearchParams(searchHash.parameters);
        if (query) {
            parameters.set("q", query);
            window.location.hash = formatSearchHash(searchHash.fragment, parameters.toString());
            return;
        }
        if (!parameters.has("q")) {
            return;
        }
        parameters.delete("q");
        const hash = formatSearchHash(searchHash.fragment, parameters.toString());
        // Remove an empty hash without triggering a scroll to top.
        history.replaceState(null, "", `${window.location.pathname}${window.location.search}${hash ? `#${hash}` : ""}`);
    }

    /**
     * Render the localized status for one search-index load state.
     * @param {SearchElements} searchElements — immutable search UI references and messages.
     * @param {string} status — loading, ready, or failed request status.
     * @returns {void}
     */
    function renderSearchLoadStatus(searchElements, status) {
        switch (status) {
            case SearchLoadStatus.LOADING:
                searchElements.statusElement.textContent = searchElements.messages.loading;
                return;
            case SearchLoadStatus.FAILED:
                searchElements.statusElement.textContent = searchElements.messages.failed;
                return;
            case SearchLoadStatus.READY:
            default:
                searchElements.statusElement.textContent = "";
        }
    }

    /**
     * Clear the current query and rendered result cards.
     * @param {SearchElements} searchElements — immutable search UI references and messages.
     * @returns {void}
     */
    function clearSearch(searchElements) {
        setQueryInUrl("");
        searchElements.resultsContainer.innerHTML = "";
        searchElements.statusElement.textContent = "";
    }

    /** Mutable debounce scheduling for one loaded search UI. */
    class SearchScheduler {
        /**
         * @param {SearchElements} searchElements — immutable search UI references and messages.
         * @param {SearchIndexEntry[]} searchIndex — normalized index entries.
         */
        constructor(searchElements, searchIndex) {
            this.searchElements = searchElements;
            this.searchIndex = searchIndex;
            this.timer = null;
        }

        /**
         * Cancel a pending debounced search.
         * @returns {void}
         */
        cancel() {
            clearTimeout(this.timer);
            this.timer = null;
        }

        /**
         * Run the current query and clear its timer reference.
         * @returns {void}
         */
        run() {
            this.timer = null;
            performSearch(this.searchElements, this.searchIndex);
        }

        /**
         * Debounce the current input, clearing immediately when it is empty.
         * @returns {void}
         */
        schedule() {
            this.cancel();
            if (!this.searchElements.input.value.trim()) {
                clearSearch(this.searchElements);
                return;
            }
            this.timer = setTimeout(() => this.run(), SearchConfig.DEBOUNCE_MS);
        }
    }

    /**
     * Return immutable normalized entries without duplicating their text in lowercase.
     * @param {object[]} data — raw search index entries from the JSON file.
     * @returns {SearchIndexEntry[]} new array of normalized entries.
     */
    function normalizeSearchIndex(data) {
        return data.map(entry => new SearchIndexEntry(entry));
    }

    /**
     * Return the configured search-index URL or report a configuration error.
     * @param {SearchElements} searchElements — immutable search UI references and messages.
     * @returns {string|null} the index URL, or null if it is absent.
     */
    function searchIndexUrl(searchElements) {
        const indexUrl = searchElements.searchContainer?.getAttribute("data-index-url");
        if (indexUrl) {
            return indexUrl;
        }
        console.error("Search: missing data-index-url attribute on #search-container.");
        searchElements.statusElement.textContent = searchElements.messages.misconfigured;
        return null;
    }

    /**
     * Restore a query from the URL hash before the index loads.
     * @param {SearchElements} searchElements — immutable search UI references and messages.
     * @returns {void}
     */
    function restoreInitialQuery(searchElements) {
        const query = getQueryFromUrl();
        if (query) {
            searchElements.input.value = query;
        }
    }

    /**
     * Fetch and normalize the search index without changing the UI.
     * @param {string} indexUrl — URL of the JSON search index.
     * @returns {Promise<SearchLoadResult>} immutable load outcome.
     */
    async function loadSearchIndex(indexUrl) {
        try {
            const response = await fetch(indexUrl);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return new SearchLoadResult(SearchLoadStatus.READY, normalizeSearchIndex(await response.json()));
        } catch (error) {
            return new SearchLoadResult(SearchLoadStatus.FAILED, null, error);
        }
    }

    /**
     * Render a changed URL-hash query without creating another history entry.
     * @param {SearchElements} searchElements — immutable search UI references and messages.
     * @param {SearchScheduler} scheduler — post-load search scheduler.
     * @returns {void}
     */
    function syncQueryFromHash(searchElements, scheduler) {
        const query = getQueryFromUrl();
        if (query !== searchElements.input.value.trim()) {
            scheduler.cancel();
            searchElements.input.value = query;
            scheduler.run();
        }
    }

    /**
     * Register input and hash-navigation listeners for a loaded search index.
     * @param {SearchElements} searchElements — immutable search UI references and messages.
     * @param {SearchIndexEntry[]} searchIndex — normalized index entries.
     * @returns {void}
     */
    function registerSearchListeners(searchElements, searchIndex) {
        const scheduler = new SearchScheduler(searchElements, searchIndex);
        // Deliberately register only after a successful load.
        // Avoiding mutable pre-load UI state keeps this script easier to reason about.
        searchElements.input.addEventListener("input", () => scheduler.schedule());
        window.addEventListener("hashchange", () => syncQueryFromHash(searchElements, scheduler));
    }

    /**
     * Register loaded search behavior and render any current query.
     * @param {SearchElements} searchElements — immutable search UI references and messages.
     * @param {SearchIndexEntry[]} searchIndex — normalized index entries.
     * @returns {void}
     */
    function initializeLoadedSearch(searchElements, searchIndex) {
        registerSearchListeners(searchElements, searchIndex);
        if (searchElements.input.value.trim()) {
            performSearch(searchElements, searchIndex);
        } else {
            clearSearch(searchElements);
        }
    }

    /**
     * Initialize the search UI. No-op on pages without #search-input.
     * @returns {Promise<void>} completion of asynchronous initialization.
     */
    async function init() {
        const searchElements = getSearchHtmlElements();
        if (!searchElements) {
            return;
        }
        // The HTML autofocus attribute is not honored consistently, so focus
        // explicitly before waiting for the search index request.
        searchElements.input.focus();
        const indexUrl = searchIndexUrl(searchElements);
        if (!indexUrl) {
            return;
        }
        restoreInitialQuery(searchElements);
        renderSearchLoadStatus(searchElements, SearchLoadStatus.LOADING);
        const result = await loadSearchIndex(indexUrl);
        renderSearchLoadStatus(searchElements, result.status);
        // Do not infer failure from error truthiness: Promise.reject(null) is valid.
        if (result.status === SearchLoadStatus.FAILED) {
            console.error("Failed to load search index:", result.error);
            return;
        }
        initializeLoadedSearch(searchElements, result.index);
    }

    /* Entry point */

    document.addEventListener("DOMContentLoaded", () => void init(), false);
})();
