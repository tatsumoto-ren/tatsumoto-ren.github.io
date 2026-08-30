// Copyright: Ajatt-Tools and contributors; https://github.com/Ajatt-Tools
// License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { JSDOM, type DOMWindow } from "jsdom";
import { onTestFinished, vi } from "vitest";

export type LoadedScript = Readonly<{
    filePath: string;
    sourceUrl: string;
    source: string;
}>;

/**
 * Load a browser script relative to the repository root.
 * @param relativePath - Script path relative to the repository root.
 * @returns The script source and its filesystem and URL identifiers.
 */
export function loadScript(relativePath: string): LoadedScript {
    const filePath = path.join(import.meta.dirname, "..", relativePath);
    return { filePath, sourceUrl: pathToFileURL(filePath).href, source: fs.readFileSync(filePath, "utf8") };
}

const searchScript = loadScript("blog/res/search.js");

export const indexUrl = "/search_index.json";

export type SearchEntry = Readonly<{
    title?: string;
    url: string;
    body?: string;
    tags?: readonly string[];
    parent?: string;
}>;

type SearchDomOptions = Readonly<{
    hash?: string;
    inputTagName?: "div" | "input";
    withInput?: boolean;
    withIndexUrl?: boolean;
    withContainer?: boolean;
    withResults?: boolean;
    withStatus?: boolean;
    messages?: Readonly<Record<string, string>>;
}>;

type FetchResponse = Readonly<{
    ok: boolean;
    status?: number;
    statusText?: string;
    json?: () => Promise<readonly SearchEntry[]>;
}>;

type BootSearchOptions = SearchDomOptions &
    Readonly<{
        index?: readonly SearchEntry[];
        fetchImpl?: ReturnType<typeof vi.fn>;
        waitForLoad?: boolean;
    }>;

type SearchFixture = Readonly<{
    dom: JSDOM;
    win: DOMWindow;
    fetchMock: ReturnType<typeof vi.fn>;
    input: HTMLInputElement | null;
    status: HTMLElement | null;
    results: HTMLElement | null;
}>;

/**
 * Evaluate a browser script and initialize it on exactly one DOM-ready event.
 * @param win - JSDOM window in which to evaluate the script.
 * @param script - Loaded browser script to evaluate.
 * @returns A promise that resolves after DOM-ready initialization.
 */
export async function evaluateBrowserScript(win: DOMWindow, script: LoadedScript): Promise<void> {
    const waitsForDomReady = win.document.readyState === "loading";
    const domReady = waitsForDomReady
        ? new Promise<void>(resolve =>
              win.document.addEventListener("DOMContentLoaded", () => resolve(), { once: true }),
          )
        : Promise.resolve();
    win.eval(`${script.source}\n//# sourceURL=${script.sourceUrl}`);
    if (!waitsForDomReady) {
        win.document.dispatchEvent(new win.Event("DOMContentLoaded"));
    }
    await domReady;
}

/**
 * Close a JSDOM window after the current Vitest test finishes.
 * @param dom - DOM fixture owned by the current test.
 * @returns The registered DOM fixture.
 */
export function closeDomAfterTest(dom: JSDOM): JSDOM {
    onTestFinished(() => dom.window.close());
    return dom;
}

/**
 * Load one generated HTML page into an automatically closed DOM.
 * @param relativePath - Generated page path relative to the repository root.
 * @returns Parsed generated-page DOM registered for test teardown.
 */
export function loadGeneratedPage(relativePath: string): JSDOM {
    const filePath = path.join(import.meta.dirname, "..", relativePath);
    return closeDomAfterTest(new JSDOM(fs.readFileSync(filePath, "utf8")));
}

/**
 * Create externally controlled Promise callbacks for asynchronous fixture tests.
 * @template T - Value produced by the promise.
 * @returns The promise and its external resolve and reject callbacks.
 */
export function deferred<T>(): PromiseWithResolvers<T> {
    return Promise.withResolvers<T>();
}

/**
 * Create a representative search-index entry with optional field overrides.
 * @param overrides - Search-entry fields to replace.
 * @returns A complete representative search entry.
 */
export function makeEntry(overrides: Partial<SearchEntry> = {}): SearchEntry {
    return {
        title: "Search Guide",
        url: "/search-guide.html",
        body: "This page explains the search guide.",
        tags: ["guide"],
        parent: "Docs",
        ...overrides,
    };
}

/**
 * Return configurable search-page markup.
 * @param options - Elements to include in the fixture.
 * @returns Search-page HTML markup.
 */
function searchMarkup({ inputTagName, withInput, withContainer, withResults, withStatus }: SearchDomOptions): string {
    return withInput
        ? `
            ${withContainer ? '<div id="search-container"></div>' : ""}
            ${inputTagName === "input" ? '<input id="search-input">' : '<div id="search-input"></div>'}
            ${withStatus ? '<div id="number-results-found"></div>' : ""}
            ${withResults ? '<div id="search-results"></div>' : ""}
        `
        : "";
}

/**
 * Configure index and localized-message attributes on the search container.
 * @param dom - Search-page DOM fixture.
 * @param options - Index and localized-message configuration.
 * @returns Nothing.
 */
function configureSearchContainer(dom: JSDOM, options: SearchDomOptions): void {
    const container = dom.window.document.getElementById("search-container");
    if (container && options.withIndexUrl) {
        container.setAttribute("data-index-url", indexUrl);
    }
    for (const [name, value] of Object.entries(options.messages ?? {})) {
        container?.setAttribute(`data-${name}`, value);
    }
}

/**
 * Create a configurable search-page DOM fixture.
 * @param options - Search fixture configuration.
 * @returns A registered search-page DOM fixture.
 */
function makeSearchDom({
    hash = "",
    inputTagName = "input",
    withInput = true,
    withIndexUrl = true,
    withContainer = true,
    withResults = true,
    withStatus = true,
    messages = {},
}: SearchDomOptions = {}): JSDOM {
    const options = { inputTagName, withInput, withIndexUrl, withContainer, withResults, withStatus, messages };
    const dom = closeDomAfterTest(
        new JSDOM(searchMarkup(options), { runScripts: "outside-only", url: `https://example.test/${hash}` }),
    );
    configureSearchContainer(dom, options);
    return dom;
}

/**
 * Wait until a started search-index request leaves its visible loading state.
 * @param dom - Search-page DOM fixture.
 * @param fetchMock - Fetch mock used by the fixture.
 * @returns A promise that resolves when initialization has visibly settled.
 */
async function waitForSearchLoad(dom: JSDOM, fetchMock: ReturnType<typeof vi.fn>): Promise<void> {
    if (fetchMock.mock.calls.length === 0) {
        return;
    }
    const container = dom.window.document.getElementById("search-container");
    const status = dom.window.document.getElementById("number-results-found");
    const loadingMessage = container?.dataset.loadingMessage ?? "Loading search index...";
    await vi.waitFor(() => {
        if (status?.textContent === loadingMessage) {
            throw new Error("search index is still loading");
        }
    });
}

/**
 * Return a successful fetch mock for a search index.
 * @param index - Search entries returned by the mock.
 * @returns A successful fetch mock.
 */
function successfulFetch(index: readonly SearchEntry[]): ReturnType<typeof vi.fn> {
    return vi.fn((): Promise<FetchResponse> => Promise.resolve({ ok: true, json: () => Promise.resolve(index) }));
}

/**
 * Return the observable search elements from a booted DOM fixture.
 * @param dom - Booted search-page DOM fixture.
 * @param fetchMock - Fetch mock installed on the fixture window.
 * @returns The fixture's observable window, elements, and fetch mock.
 */
function searchFixture(dom: JSDOM, fetchMock: ReturnType<typeof vi.fn>): SearchFixture {
    const win = dom.window;
    return {
        dom,
        win,
        fetchMock,
        input: win.document.getElementById("search-input") as HTMLInputElement | null,
        status: win.document.getElementById("number-results-found"),
        results: win.document.getElementById("search-results"),
    };
}

/**
 * Boot the search script in a DOM fixture and return its observable elements.
 * @param options - Search DOM and fetch configuration.
 * @returns The initialized search fixture.
 */
export async function bootSearch({
    hash = "",
    inputTagName = "input",
    index = [makeEntry()],
    withInput = true,
    withIndexUrl = true,
    withContainer = true,
    withResults = true,
    withStatus = true,
    messages,
    fetchImpl,
    waitForLoad = true,
}: BootSearchOptions = {}): Promise<SearchFixture> {
    const dom = makeSearchDom({
        hash,
        inputTagName,
        withInput,
        withIndexUrl,
        withContainer,
        withResults,
        withStatus,
        ...(messages === undefined ? {} : { messages }),
    });
    const win = dom.window;
    const fetchMock = fetchImpl ?? successfulFetch(index);
    Object.defineProperty(win, "fetch", { configurable: true, value: fetchMock, writable: true });
    win.console = console;
    await evaluateBrowserScript(win, searchScript);
    if (waitForLoad) {
        await waitForSearchLoad(dom, fetchMock);
    }
    return searchFixture(dom, fetchMock);
}

/**
 * Update an attached input and dispatch its browser input event.
 * @param input - Attached search input.
 * @param value - Query value to enter.
 * @returns Nothing.
 */
function dispatchInput(input: HTMLInputElement, value: string): void {
    const win = input.ownerDocument.defaultView as DOMWindow | null;
    if (!win) {
        throw new Error("input is not attached to a window");
    }
    input.value = value;
    input.dispatchEvent(new win.Event("input", { bubbles: true }));
}

/**
 * Enter a query and run its debounce timer and queued Promise work.
 * @param input - Attached search input.
 * @param value - Query value to enter.
 * @returns A promise that resolves after rendering settles.
 */
export async function typeQuery(input: HTMLInputElement, value: string): Promise<void> {
    dispatchInput(input, value);
    await vi.runOnlyPendingTimersAsync();
}

// Dispatch an "input" event without advancing timers or flushing promises. This
// lets a test queue several keystrokes inside the debounce window and observe
// that only the final one triggers a search.
/**
 * Enter a query without advancing its debounce timer or queued Promise work.
 * @param input - Attached search input.
 * @param value - Query value to enter.
 * @returns Nothing.
 */
export function typeQueryNoFlush(input: HTMLInputElement, value: string): void {
    dispatchInput(input, value);
}

/**
 * Return search-result link text in displayed order.
 * @param results - Search-results container.
 * @returns Displayed result titles.
 */
export function resultTitles(results: HTMLElement): string[] {
    return [...results.querySelectorAll(".search-result > a")].map(link => link.textContent ?? "");
}

/**
 * Return rendered snippet markup in displayed order.
 * @param results - Search-results container.
 * @returns Displayed snippet markup.
 */
export function snippets(results: HTMLElement): string[] {
    return [...results.querySelectorAll(".snippet")].map(snippet => snippet.innerHTML);
}
