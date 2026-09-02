// Copyright: Ajatt-Tools and contributors; https://github.com/Ajatt-Tools
// License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html

import { describe, expect, test } from "vitest";

import { loadGeneratedPage } from "./helpers.ts";

/** Verify generated search configuration and accessibility markup. */
function assertGeneratedSearchPage(): void {
    const document = loadGeneratedPage("blog/search.html").window.document;
    const container = document.getElementById("search-container");
    const input = document.getElementById("search-input");
    const status = document.getElementById("number-results-found");

    expect(container?.dataset).toMatchObject({
        indexUrl: "search_index.json",
        loadingMessage: "Loading search index...",
        noResultsMessage: "No results found.",
        misconfiguredMessage: "Search is misconfigured.",
        failedMessage: "Failed to load search index.",
        resultsMessage: "Results: {count}",
        showingFirst: "(showing first {count})",
    });
    expect(input?.getAttribute("aria-label")).toBe("Search articles...");
    expect(status?.getAttribute("role")).toBe("status");
    expect(status?.getAttribute("aria-live")).toBe("polite");
}

/** Verify every localized search message rendered on the generated Russian page. */
function assertGeneratedRussianSearchMessages(): void {
    const document = loadGeneratedPage("ru/search.html").window.document;
    expect(document.getElementById("search-container")?.dataset).toMatchObject({
        loadingMessage: "Загрузка поискового индекса...",
        noResultsMessage: "Ничего не найдено.",
        misconfiguredMessage: "Поиск настроен неправильно.",
        failedMessage: "Не удалось загрузить поисковый индекс.",
        resultsMessage: "Результатов: {count}",
        showingFirst: "(показаны первые {count})",
    });
}

/** Verify the post-template translation key still renders its literal colon. */
function assertGeneratedTagsLabel(): void {
    const document = loadGeneratedPage("blog/faq-about.html").window.document;
    expect(document.querySelector(".blog_tags_text_before")?.textContent).toBe("Tags:");
}

describe("generated pages", (): void => {
    test("keeps search configuration and accessibility markup synchronized", assertGeneratedSearchPage);
    test("renders every localized Russian search message", assertGeneratedRussianSearchMessages);
    test("renders the translated tags label with punctuation", assertGeneratedTagsLabel);
});
