// Copyright: Ajatt-Tools and contributors; https://github.com/Ajatt-Tools
// License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html

import { describe, expect, test, vi } from "vitest";

import { bootSearch, deferred, indexUrl, makeEntry, resultTitles, typeQuery } from "./helpers.ts";

type SearchFixture = Awaited<ReturnType<typeof bootSearch>>;

type PendingSearchFixture = Readonly<{
    pendingIndex: PromiseWithResolvers<unknown>;
    fixture: SearchFixture;
}>;

type FalsyFailureCase = Readonly<{
    reason: null | undefined | "" | 0;
    loggedDetail: null | "" | 0;
}>;

type JsonFailureCase = readonly [string, () => Promise<never> | Promise<{ entries: never[] }>];
type MarkupValidationCase = Readonly<{
    description: string;
    options: NonNullable<Parameters<typeof bootSearch>[0]>;
    expectedError: string | null;
    expectedStatus?: string;
}>;

/**
 * Boot search with an externally controlled pending index request.
 * @param hash - Optional initial URL hash for the search page.
 * @returns The pending index controls and initialized search fixture.
 */
async function bootPendingSearch(hash: string = ""): Promise<PendingSearchFixture> {
    const pendingIndex = deferred<unknown>();
    const fixture = await bootSearch({
        hash,
        fetchImpl: vi.fn(() => pendingIndex.promise),
        waitForLoad: false,
    });
    return { pendingIndex, fixture };
}

/**
 * Verify one absent or malformed search-markup scenario.
 * @param testCase - Fixture options and expected initialization outcome.
 * @returns A promise that resolves after the assertions complete.
 */
async function assertMarkupValidation(testCase: MarkupValidationCase): Promise<void> {
    const { status, fetchMock } = await bootSearch(testCase.options);
    expect(fetchMock).not.toHaveBeenCalled();
    if (testCase.expectedError === null) {
        expect(console.error).not.toHaveBeenCalled();
    } else {
        expect(console.error).toHaveBeenCalledWith(testCase.expectedError);
    }
    if (testCase.expectedStatus !== undefined) {
        expect(status?.textContent).toBe(testCase.expectedStatus);
    }
}

/**
 * Verify that an initial hash query runs after the index loads.
 * @returns A promise that resolves after the assertions complete.
 */
async function assertInitialHashQueryIsRestored(): Promise<void> {
    const { input, status, results, fetchMock } = await bootSearch({ hash: "#q=search" });

    expect(fetchMock).toHaveBeenCalledWith(indexUrl);
    expect(input?.value).toBe("search");
    expect(status?.textContent).toBe("Results: 1");
    expect(resultTitles(results as HTMLElement)).toEqual(["Search Guide"]);
}

/**
 * Verify that searching an empty index renders the no-results state.
 * @returns A promise that resolves after the assertions complete.
 */
async function assertEmptyIndexShowsNoResults(): Promise<void> {
    const { input, status, results } = await bootSearch({ index: [] });

    await typeQuery(input as HTMLInputElement, "search");

    expect(status?.textContent).toBe("No results found.");
    expect(results?.children).toHaveLength(0);
}

/**
 * Verify that a query entered during index loading shows loading and then results.
 * @returns A promise that resolves after the assertions complete.
 */
async function assertPendingSearchShowsLoading(): Promise<void> {
    const { pendingIndex, fixture } = await bootPendingSearch();

    await typeQuery(fixture.input as HTMLInputElement, "search");
    expect(fixture.status?.textContent).toBe("Loading search index...");

    pendingIndex.resolve({ ok: true, json: () => Promise.resolve([makeEntry()]) });
    await vi.waitFor(() => expect(fixture.status?.textContent).toBe("Results: 1"));

    expect(fixture.status?.textContent).toBe("Results: 1");
    expect(resultTitles(fixture.results as HTMLElement)).toEqual(["Search Guide"]);
}

/**
 * Verify that search receives focus before the index request settles.
 * @returns A promise that resolves after the pending request is settled.
 */
async function assertSearchInputIsFocusedImmediately(): Promise<void> {
    const { pendingIndex, fixture } = await bootPendingSearch();

    expect(fixture.win.document.activeElement).toBe(fixture.input);

    pendingIndex.resolve({ ok: true, json: () => Promise.resolve([makeEntry()]) });
    await vi.waitFor(() => expect(fixture.status?.textContent).toBe(""));
}

/**
 * Verify that user input supersedes an initial hash query while loading.
 * @returns A promise that resolves after the assertions complete.
 */
async function assertUserInputSupersedesHash(): Promise<void> {
    const { pendingIndex, fixture } = await bootPendingSearch("#q=search");
    (fixture.input as HTMLInputElement).value = "custom";

    pendingIndex.resolve({
        ok: true,
        json: () => Promise.resolve([makeEntry({ title: "Custom", body: "custom" })]),
    });
    await vi.waitFor(() => expect(fixture.status?.textContent).toBe("Results: 1"));

    expect(fixture.input?.value).toBe("custom");
    expect(fixture.status?.textContent).toBe("Results: 1");
    expect(resultTitles(fixture.results as HTMLElement)).toEqual(["Custom"]);
}

/**
 * Verify that clearing a pending query retains loading until the index resolves.
 * @returns A promise that resolves after the assertions complete.
 */
async function assertClearedPendingQueryKeepsLoading(): Promise<void> {
    const { pendingIndex, fixture } = await bootPendingSearch();

    await typeQuery(fixture.input as HTMLInputElement, "search");
    await typeQuery(fixture.input as HTMLInputElement, "");
    expect(fixture.status?.textContent).toBe("Loading search index...");
    expect(fixture.results?.children).toHaveLength(0);

    pendingIndex.resolve({ ok: true, json: () => Promise.resolve([makeEntry()]) });
    await vi.waitFor(() => expect(fixture.status?.textContent).toBe(""));

    expect(fixture.status?.textContent).toBe("");
    expect(fixture.results?.children).toHaveLength(0);
}

/**
 * Verify that a pending rejection is reported after the query is cleared.
 * @returns A promise that resolves after the assertion completes.
 */
async function assertClearedPendingQueryReportsFailure(): Promise<void> {
    const { pendingIndex, fixture } = await bootPendingSearch();

    await typeQuery(fixture.input as HTMLInputElement, "search");
    await typeQuery(fixture.input as HTMLInputElement, "");
    pendingIndex.reject(new Error("network down"));
    await vi.waitFor(() => expect(fixture.status?.textContent).toBe("Failed to load search index."));

    expect(fixture.status?.textContent).toBe("Failed to load search index.");
}

/**
 * Verify that an unsuccessful HTTP response is reported with response details.
 * @returns A promise that resolves after the assertions complete.
 */
async function assertHttpFailureIsReported(): Promise<void> {
    const { status } = await bootSearch({
        fetchImpl: vi.fn(() => Promise.resolve({ ok: false, status: 500, statusText: "Server Error" })),
    });

    expect(status?.textContent).toBe("Failed to load search index.");
    expect(console.error).toHaveBeenCalledWith(
        "Failed to load search index:",
        expect.objectContaining({ message: "HTTP 500: Server Error" }),
    );
}

/**
 * Verify that a rejected fetch is reported with its original error.
 * @returns A promise that resolves after the assertions complete.
 */
async function assertRejectedFetchIsReported(): Promise<void> {
    const error = new Error("network down");
    const { status } = await bootSearch({ fetchImpl: vi.fn(() => Promise.reject(error)) });

    expect(status?.textContent).toBe("Failed to load search index.");
    expect(console.error).toHaveBeenCalledWith("Failed to load search index:", error);
}

/**
 * Verify that a falsy fetch rejection reason still produces a failure.
 * @param failureCase - Rejection reason and normalized console detail.
 * @returns A promise that resolves after the assertions complete.
 */
async function assertFalsyRejectionIsReported({ reason, loggedDetail }: FalsyFailureCase): Promise<void> {
    const { input, status } = await bootSearch({ fetchImpl: vi.fn(() => Promise.reject(reason)) });

    await typeQuery(input as HTMLInputElement, "search");

    expect(status?.textContent).toBe("Failed to load search index.");
    expect(console.error).toHaveBeenCalledWith("Failed to load search index:", loggedDetail);
}

/**
 * Verify that malformed or rejected index JSON produces a failure.
 * @param _description - Human-readable malformed JSON scenario.
 * @param json - JSON body implementation under test.
 * @returns A promise that resolves after the assertion completes.
 */
async function assertJsonFailureIsReported(_description: string, json: JsonFailureCase[1]): Promise<void> {
    const { status } = await bootSearch({ fetchImpl: vi.fn(() => Promise.resolve({ ok: true, json })) });

    expect(status?.textContent).toBe("Failed to load search index.");
}

/**
 * Verify that input after a loading failure cannot replace the failure state.
 * @returns A promise that resolves after the assertion completes.
 */
async function assertFailureSurvivesLaterInput(): Promise<void> {
    const { input, status } = await bootSearch({
        fetchImpl: vi.fn(() => Promise.resolve({ ok: false, status: 500, statusText: "Server Error" })),
    });

    await typeQuery(input as HTMLInputElement, "search");

    expect(status?.textContent).toBe("Failed to load search index.");
}

describe("search page markup and configuration validation", (): void => {
    test.each([
        { description: "missing input", options: { withInput: false }, expectedError: null },
        {
            description: "non-input search element",
            options: { inputTagName: "div" },
            expectedError: "Search: #search-input must be an input element.",
        },
        {
            description: "missing results container",
            options: { withResults: false },
            expectedError: "Search: missing required element for initialization.",
        },
        {
            description: "missing status element",
            options: { withStatus: false },
            expectedError: "Search: missing required element for initialization.",
        },
        {
            description: "missing index URL",
            options: { withIndexUrl: false },
            expectedError: "Search: missing data-index-url attribute on #search-container.",
            expectedStatus: "Search is misconfigured.",
        },
        {
            description: "missing search container",
            options: { withContainer: false },
            expectedError: "Search: missing data-index-url attribute on #search-container.",
            expectedStatus: "Search is misconfigured.",
        },
    ] satisfies readonly MarkupValidationCase[])("handles $description", assertMarkupValidation);
});

describe("successful search index loading", (): void => {
    test("restores an initial hash query after loading the index", assertInitialHashQueryIsRestored);
    test("shows no results for an empty index", assertEmptyIndexShowsNoResults);
});

describe("pending search index loading", (): void => {
    test("focuses the search input before the index loads", assertSearchInputIsFocusedImmediately);
    test("shows a loading message when searching before the index resolves", assertPendingSearchShowsLoading);
    test("preserves user input over an initial hash query while loading", assertUserInputSupersedesHash);
    test(
        "keeps the loading status when the query is cleared before the index resolves",
        assertClearedPendingQueryKeepsLoading,
    );
    test(
        "reports a failure when the pending index request rejects after the query is cleared",
        assertClearedPendingQueryReportsFailure,
    );
});

describe("search index loading failures", (): void => {
    test("reports HTTP failures while loading the index", assertHttpFailureIsReported);
    test("reports rejected fetches while loading the index", assertRejectedFetchIsReported);
    test.each([
        { reason: null, loggedDetail: null },
        { reason: undefined, loggedDetail: null },
        { reason: "", loggedDetail: "" },
        { reason: 0, loggedDetail: 0 },
    ] satisfies readonly FalsyFailureCase[])(
        "reports a failure for the falsy rejection reason $reason",
        assertFalsyRejectionIsReported,
    );
    test.each([
        ["a rejected JSON body", (): Promise<never> => Promise.reject(new Error("invalid JSON"))],
        ["a non-array JSON body", (): Promise<{ entries: never[] }> => Promise.resolve({ entries: [] })],
    ] satisfies readonly JsonFailureCase[])("reports a failure for %s", assertJsonFailureIsReported);
    test("keeps the failure status after later input", assertFailureSurvivesLaterInput);
});
