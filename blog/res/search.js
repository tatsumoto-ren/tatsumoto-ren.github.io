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
    const EDGE_PUNCTUATION_PATTERN = /^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu;

    // Scoring weights for search result ranking.
    // Higher values make a match type more prominent in the results.
    const SearchScore = Object.freeze({
        TITLE: 100,
        TAG: 50,
        PARENT: 30,
        BODY: 10,
    });

    /** A lowercase search-index property and its ranking weight. Immutable. */
    class SearchField {
        /**
         * @param {string} name — lowercase property name on SearchIndexEntry.
         * @param {number} weight — ranking weight for matches in this property.
         */
        constructor(name, weight) {
            this.name = name;
            this.weight = weight;
            Object.freeze(this);
        }
    }

    // Lowercase search-index properties and their corresponding ranking weights.
    const SearchFields = Object.freeze([
        new SearchField("title_lower", SearchScore.TITLE),
        new SearchField("tags_lower", SearchScore.TAG),
        new SearchField("parent_lower", SearchScore.PARENT),
        new SearchField("body_lower", SearchScore.BODY),
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

    /**
     * A parsed search query: the normalized lowercase phrase plus its distinct words.
     * Computed once per search and threaded through the ranking pipeline so the
     * query is tokenized and lowercased exactly once. Immutable.
     */
    class Query {
        /**
         * @param {string} lower — the full query string, lowercased.
         * @param {string[]} words — deduplicated lowercase query words.
         */
        constructor(lower, words) {
            this.lower = lower;
            this.words = Object.freeze([...words]);
            Object.freeze(this);
        }

        /**
         * Build a Query from a raw user query string, tokenizing and lowercasing
         * it exactly once. Splits on any run of whitespace, strips leading and
         * trailing punctuation from individual words, drops empty tokens, and
         * deduplicates words in first-seen order.
         * @param {string} raw — the user's raw search query.
         * @returns {Query} the parsed, immutable query.
         */
        static parse(raw) {
            const lower = raw.toLowerCase().trim().replace(QUERY_WHITESPACE_PATTERN, " ");
            const words = lower
                .split(QUERY_SPLIT_PATTERN)
                .map(word => stripPunctuation(word))
                .filter(word => word.length > 0);
            return new Query(lower, [...new Set(words)]);
        }
    }

    /**
     * Strip leading and trailing punctuation from a query word.
     * @param {string} word — raw lowercase query word.
     * @returns {string} word with punctuation removed from both edges.
     */
    function stripPunctuation(word) {
        return word.replace(EDGE_PUNCTUATION_PATTERN, "");
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
            this.title_lower = this.title.toLowerCase();
            this.body_lower = this.body.toLowerCase();
            this.tags_lower = this.tags.join(" ").toLowerCase();
            this.parent_lower = this.parent.toLowerCase();
            Object.freeze(this);
        }
    }

    /**
     * A scored search result: a matched index entry and its ranking metadata.
     * Immutable.
     */
    class ScoredResult {
        /**
         * @param {SearchIndexEntry} entry — the matched search index entry.
         * @param {number} score — the entry's relevance score.
         * @param {number} matchedWordCount — number of distinct query words found.
         * @param {boolean} hasPhraseMatch — true when the full query phrase matched.
         */
        constructor(entry, score, matchedWordCount, hasPhraseMatch) {
            this.entry = entry;
            this.score = score;
            this.matchedWordCount = matchedWordCount;
            this.hasPhraseMatch = hasPhraseMatch;
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
     * A half-open [start, end) range of matched text within a snippet.
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
     * Collect the [start, end) range of every query-word occurrence in text.
     * @param {string} textLower — the text to scan, already lowercased.
     * @param {string[]} queryWords — the deduplicated lowercase query words.
     * @returns {Range[]} unsorted, possibly overlapping match ranges.
     */
    function collectMatchRanges(textLower, queryWords) {
        return queryWords.flatMap(word => {
            const ranges = [];
            for (let idx = textLower.indexOf(word); idx >= 0; idx = textLower.indexOf(word, idx + 1)) {
                ranges.push(new Range(idx, idx + word.length));
            }
            return ranges;
        });
    }

    /**
     * Merge overlapping or touching ranges so highlight markup never nests.
     * @param {Range[]} input — the raw match ranges.
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
     * Find a snippet anchor, preferring the full phrase and falling back to
     * the earliest matching word.
     * @param {string} bodyLower — the body text, already lowercased.
     * @param {Query} query — the parsed query (words plus full lowercase phrase).
     * @returns {number} anchor index, or -1 if nothing matches.
     */
    function findSnippetAnchor(bodyLower, query) {
        const phraseIdx = bodyLower.indexOf(query.lower);
        if (phraseIdx >= 0) {
            return phraseIdx;
        }
        const wordIndices = query.words.map(word => bodyLower.indexOf(word)).filter(idx => idx >= 0);
        return wordIndices.length > 0 ? Math.min(...wordIndices) : -1;
    }

    /**
     * Escape text and wrap every query-word occurrence in <mark>.
     * @param {string} text — the raw window text (original case preserved).
     * @param {Query} query — the parsed query (words plus full lowercase phrase).
     * @returns {string} escaped HTML with matches wrapped in <mark>.
     */
    function highlightWordsInText(text, query) {
        const textLower = text.toLowerCase();
        // Lowercase match offsets are normally valid for the original text. A few
        // Unicode characters expand when lowercased, so omit highlighting rather
        // than applying shifted offsets and marking the wrong characters.
        if (textLower.length !== text.length) {
            return escapeTextForHtml(text);
        }
        const ranges = mergeRanges(collectMatchRanges(textLower, query.words));
        let html = "";
        let cursor = 0;
        for (const { start, end } of ranges) {
            html += escapeTextForHtml(text.substring(cursor, start));
            html += `<mark>${escapeTextForHtml(text.substring(start, end))}</mark>`;
            cursor = end;
        }
        return html + escapeTextForHtml(text.substring(cursor));
    }

    /**
     * Build an HTML snippet showing the query matches in context.
     * The snippet window is anchored on the earliest match (full phrase if
     * present, otherwise the earliest matching word); every matching query
     * word within the window is wrapped in <mark>.
     * @param {string} body — full body text of the search entry.
     * @param {Query} query — the parsed query (words plus full lowercase phrase).
     * @returns {string} HTML with matches wrapped in <mark>, or "" if no match.
     */
    function makeSnippet(body, query) {
        const anchor = findSnippetAnchor(body.toLowerCase(), query);
        if (anchor < 0) {
            return "";
        }
        const start = Math.max(0, anchor - SearchConfig.SNIPPET_CONTEXT_CHARS);
        const end = Math.min(body.length, anchor + query.lower.length + SearchConfig.SNIPPET_CONTEXT_CHARS);

        const highlighted = highlightWordsInText(body.substring(start, end), query);
        return `${start > 0 ? "..." : ""}${highlighted}${end < body.length ? "..." : ""}`;
    }

    /**
     * Analyze one entry in a single pass over its searchable fields.
     * @param {SearchIndexEntry} entry — a search index entry with lowercase fields.
     * @param {Query} query — the parsed query (words plus normalized phrase).
     * @returns {ScoredResult} ranking metadata for the entry.
     */
    function analyzeEntry(entry, query) {
        let score = 0;
        let hasPhraseMatch = false;
        const matchedWords = new Set();
        for (const { name, weight } of SearchFields) {
            const field = entry[name];
            hasPhraseMatch ||= field.includes(query.lower);
            for (const word of query.words) {
                if (field.includes(word)) {
                    score += weight;
                    matchedWords.add(word);
                }
            }
        }
        return new ScoredResult(entry, score, matchedWords.size, hasPhraseMatch);
    }

    /**
     * Compare results by phrase, matched words, score, then normalized title.
     * @param {ScoredResult} left — first result to compare.
     * @param {ScoredResult} right — second result to compare.
     * @returns {number} negative when left ranks before right.
     */
    function compareSearchResults(left, right) {
        // Sort by full-string match first, then by number of distinct words
        // found, then by weighted field score, then by title alphabetically.
        return (
            Number(right.hasPhraseMatch) - Number(left.hasPhraseMatch) ||
            right.matchedWordCount - left.matchedWordCount ||
            right.score - left.score ||
            // Tie-break alphabetically on the normalized (lowercase) title,
            // which buildLowercaseIndex guarantees is always a string.
            left.entry.title_lower.localeCompare(right.entry.title_lower)
        );
    }

    /**
     * Collect and rank all matching entries from the search index.
     * @param {SearchIndexEntry[]} searchIndex — the full index with lowercase fields.
     * @param {Query} query — the parsed query (words plus full lowercase phrase).
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
     * Create a snippet element if there is a match in the body.
     * @param {SearchIndexEntry} entry — search index entry.
     * @param {Query} query — the parsed query (words plus full lowercase phrase).
     * @returns {HTMLDivElement|null} snippet element or null.
     */
    function createSnippetElement(entry, query) {
        const bodySnippet = makeSnippet(entry.body ?? "", query);
        if (!bodySnippet) {
            return null;
        }
        const snippet = document.createElement("div");
        snippet.className = "snippet";
        snippet.innerHTML = bodySnippet;
        return snippet;
    }

    /**
     * Create a DOM element for a single search result card.
     * @param {SearchIndexEntry} entry — the matched search index entry.
     * @param {Query} query — the parsed query (words plus full lowercase phrase).
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
        for (const { entry } of scoredResults.slice(0, SearchConfig.MAX_DISPLAYED_RESULTS)) {
            searchElements.resultsContainer.appendChild(createResultCard(entry, query));
        }
    }

    /**
     * Run a search and render results into the DOM.
     * @param {SearchElements} searchElements — immutable search UI references and messages.
     * @param {SearchIndexEntry[]} searchIndex — normalized index entries.
     * @returns {void}
     */
    function performSearch(searchElements, searchIndex) {
        const { input, resultsContainer } = searchElements;
        const query = input.value.trim();
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
        resultsContainer.innerHTML = "";
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
        const { fragment, parameters: serializedParameters } = readSearchHash();
        const parameters = new URLSearchParams(serializedParameters);
        if (query) {
            parameters.set("q", query);
            window.location.hash = formatSearchHash(fragment, parameters.toString());
            return;
        }
        if (!parameters.has("q")) {
            return;
        }
        parameters.delete("q");
        const hash = formatSearchHash(fragment, parameters.toString());
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
     * Return a new array with lowercase copies of searchable fields added to each entry.
     * @param {object[]} data — raw search index entries from the JSON file.
     * @returns {SearchIndexEntry[]} new array of normalized entries.
     */
    function buildLowercaseIndex(data) {
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
            return new SearchLoadResult(SearchLoadStatus.READY, buildLowercaseIndex(await response.json()));
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
