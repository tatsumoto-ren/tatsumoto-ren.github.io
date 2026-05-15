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

"use strict";

// Scoring weights for search result ranking.
// Higher values make a match type more prominent in the results.
const SearchScore = Object.freeze({
    TITLE: 100,
    TAG: 50,
    PARENT: 30,
    BODY: 10,
});

// Tunable parameters for the search UI.
const SearchConfig = Object.freeze({
    // Number of characters shown before and after the matched query in a snippet.
    SNIPPET_CONTEXT_CHARS: 120,
    // Maximum number of result cards rendered in the DOM.
    MAX_DISPLAYED_RESULTS: 100,
    // Milliseconds to wait after the last keystroke before running a search.
    DEBOUNCE_MS: 200,
});

const SearchApp = Object.freeze({
    /**
     * Escape plain text for safe insertion into HTML.
     * Replaces &, <, >, and " with their HTML entity equivalents.
     * @param {string} text — raw plain text.
     * @returns {string} the text with special characters replaced by HTML entities.
     */
    escapeTextForHtml(text) {
        const div = document.createElement("div");
        div.appendChild(document.createTextNode(text));
        return div.innerHTML;
    },

    /**
     * Build an HTML snippet showing the query match in context.
     * @param {string} body — full body text of the search entry.
     * @param {string} query — the user's search query.
     * @returns {string} HTML with the match wrapped in <mark>, or "" if no match.
     */
    makeSnippet(body, query) {
        const idx = body.toLowerCase().indexOf(query.toLowerCase());
        if (idx < 0) {
            return "";
        }
        const start = Math.max(0, idx - SearchConfig.SNIPPET_CONTEXT_CHARS);
        const end = Math.min(body.length, idx + query.length + SearchConfig.SNIPPET_CONTEXT_CHARS);

        const before = this.escapeTextForHtml(body.substring(start, idx));
        const match = this.escapeTextForHtml(body.substring(idx, idx + query.length));
        const after = this.escapeTextForHtml(body.substring(idx + query.length, end));

        return `${start > 0 ? "..." : ""}${before}<mark>${match}</mark>${after}${end < body.length ? "..." : ""}`;
    },

    /**
     * Calculate a relevance score for a single index entry.
     * @param {object} entry — a search index entry with lowercase fields.
     * @param {string} queryLower — the query string, already lowercased.
     * @returns {number} score (0 means no match).
     */
    calcEntryScore(entry, queryLower) {
        let score = 0;

        if (entry.title_lower.includes(queryLower)) {
            score += SearchScore.TITLE;
        }
        if (entry.tags_lower.includes(queryLower)) {
            score += SearchScore.TAG;
        }
        if (entry.parent_lower.includes(queryLower)) {
            score += SearchScore.PARENT;
        }
        if (entry.body_lower.includes(queryLower)) {
            score += SearchScore.BODY;
        }

        return score;
    },

    /**
     * Collect and rank all matching entries from the search index.
     * @param {object[]} searchIndex — the full index with lowercase fields.
     * @param {string} query — the user's search query.
     * @returns {Array<{entry: object, score: number}>} results sorted by relevance.
     */
    collectSearchResults(searchIndex, query) {
        const queryLower = query.toLowerCase();
        const scoredResults = [];

        for (const entry of searchIndex) {
            const score = this.calcEntryScore(entry, queryLower);
            if (score > 0) {
                scoredResults.push({ entry, score });
            }
        }

        // Sort by score descending, then by title alphabetically.
        scoredResults.sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title));
        return scoredResults;
    },

    /**
     * Create a link element for a search result.
     * @param {object} entry — search index entry.
     * @returns {HTMLAnchorElement} link element.
     */
    createResultLink(entry) {
        const link = document.createElement("a");
        link.href = entry.url;
        link.textContent = entry.title;
        return link;
    },

    /**
     * Create a parent element if entry has a parent.
     * @param {object} entry — search index entry.
     * @returns {HTMLDivElement|null} parent element or null.
     */
    createParentElement(entry) {
        if (!entry.parent) {
            return null;
        }
        const parent = document.createElement("div");
        parent.className = "parent-article-name";
        parent.textContent = entry.parent;
        return parent;
    },

    /**
     * Create a snippet element if there is a match in the body.
     * @param {object} entry — search index entry.
     * @param {string} query — search query.
     * @returns {HTMLDivElement|null} snippet element or null.
     */
    createSnippetElement(entry, query) {
        const bodySnippet = this.makeSnippet(entry.body || "", query);
        if (!bodySnippet) {
            return null;
        }
        const snippet = document.createElement("div");
        snippet.className = "snippet";
        snippet.innerHTML = bodySnippet;
        return snippet;
    },

    /**
     * Create a DOM element for a single search result card.
     * @param {object} entry — the matched search index entry.
     * @param {string} query — the user's search query (for snippet highlighting).
     * @returns {HTMLDivElement} a .search-result div ready to append.
     */
    createResultCard(entry, query) {
        const resultCard = document.createElement("div");
        resultCard.className = "search-result";

        resultCard.appendChild(this.createResultLink(entry));

        const parent = this.createParentElement(entry);
        if (parent) {
            resultCard.appendChild(parent);
        }

        const snippet = this.createSnippetElement(entry, query);
        if (snippet) {
            resultCard.appendChild(snippet);
        }

        return resultCard;
    },

    /**
     * Run a search and render results into the DOM.
     * @param {HTMLInputElement} searchInput — the search input element.
     * @param {object[]} searchIndex — the loaded search index.
     * @param {HTMLElement} searchResults — container for result cards.
     * @param {HTMLElement} searchStatus — element for the result count text.
     */
    performSearch(searchInput, searchIndex, searchResults, searchStatus) {
        const query = searchInput.value.trim();
        this.setQueryInUrl(query);

        if (!searchIndex) {
            searchStatus.textContent = "Loading search index...";
            return;
        }

        searchResults.innerHTML = "";

        if (!query) {
            searchStatus.textContent = "";
            return;
        }

        const scoredResults = this.collectSearchResults(searchIndex, query);

        if (scoredResults.length === 0) {
            searchStatus.textContent = "No results found.";
            return;
        }

        searchStatus.textContent = `${scoredResults.length} ${scoredResults.length === 1 ? "result" : "results"}`;

        for (const { entry } of scoredResults.slice(0, SearchConfig.MAX_DISPLAYED_RESULTS)) {
            searchResults.appendChild(this.createResultCard(entry, query));
        }

        if (scoredResults.length > SearchConfig.MAX_DISPLAYED_RESULTS) {
            searchStatus.textContent += ` (showing first ${SearchConfig.MAX_DISPLAYED_RESULTS})`;
        }
    },

    /**
     * Read the search query from the URL hash (e.g., #q=some+query).
     * @returns {string} the decoded query, or "" if absent.
     */
    getQueryFromUrl() {
        return new URLSearchParams(window.location.hash.slice(1)).get("q") || "";
    },

    /**
     * Write the search query to the URL hash so it persists across reloads.
     * @param {string} query — the query to store, or "" to clear the hash.
     */
    setQueryInUrl(query) {
        if (query) {
            window.location.hash = `q=${encodeURIComponent(query)}`;
        } else {
            // Remove the hash without triggering a scroll to top.
            history.replaceState(null, "", window.location.pathname + window.location.search);
        }
    },

    /**
     * Return a new array with lowercase copies of searchable fields added to each entry.
     * @param {object[]} data — raw search index entries from the JSON file.
     * @returns {object[]} new array of entries, each with added lowercase fields.
     */
    buildLowercaseIndex(data) {
        return data.map(entry => ({
            ...entry,
            title_lower: (entry.title || "").toLowerCase(),
            body_lower: (entry.body || "").toLowerCase(),
            tags_lower: (entry.tags || []).join(" ").toLowerCase(),
            parent_lower: (entry.parent || "").toLowerCase(),
        }));
    },

    /**
     * Initialize the search UI. No-op on pages without #search-input.
     * This function has side effects (DOM manipulation, fetch, event listeners)
     * because it bootstraps an interactive search UI.
     */
    init() {
        const searchInput = document.getElementById("search-input");
        const searchResults = document.getElementById("search-results");
        const searchStatus = document.getElementById("number-results-found");

        if (!searchInput) {
            return;
        }

        let searchIndex = null;
        let debounceTimer = null;

        // Restore the query from the URL hash if present.
        const initialQuery = this.getQueryFromUrl();
        if (initialQuery) {
            searchInput.value = initialQuery;
        }

        // Run a search and update the URL hash.
        const doSearch = () => {
            this.performSearch(searchInput, searchIndex, searchResults, searchStatus);
        };

        // Fetch the search index JSON. The URL must be set via data-index-url
        // on #search-container in the template.
        const indexUrl = document.getElementById("search-container")?.getAttribute("data-index-url");
        if (!indexUrl) {
            console.error("Search: missing data-index-url attribute on #search-container.");
            searchStatus.textContent = "Search is misconfigured.";
            return;
        }

        fetch(indexUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                searchIndex = this.buildLowercaseIndex(data);
                // If the input already has a query (from URL hash or user typing
                // while the index was loading), run the search now.
                if (searchInput.value.trim()) {
                    doSearch();
                }
            })
            .catch(error => {
                searchStatus.textContent = "Failed to load search index.";
                console.error("Failed to load search index:", error);
            });

        searchInput.addEventListener("input", () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(doSearch, SearchConfig.DEBOUNCE_MS);
        });

        // Handle browser back/forward navigation changing the hash.
        window.addEventListener("hashchange", () => {
            const query = this.getQueryFromUrl();
            if (query !== searchInput.value.trim()) {
                searchInput.value = query;
                doSearch();
            }
        });
    },
});

/* Entry point */

document.addEventListener("DOMContentLoaded", () => SearchApp.init(), false);
