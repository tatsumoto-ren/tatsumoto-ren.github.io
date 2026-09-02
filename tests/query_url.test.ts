// Copyright: Ajatt-Tools and contributors; https://github.com/Ajatt-Tools
// License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html

import { describe, expect, test } from "vitest";
import type { DOMWindow } from "jsdom";

import { bootSearch, makeEntry, resultTitles, typeQuery, type SearchEntry } from "./helpers.ts";

type ClearingScenario = Readonly<{ hash: string; input: string; name: string; expectedHash: string }>;
type ResultStatusScenario = Readonly<{
    expectedHash: string;
    expectedStatus: string;
    expectedTitles: readonly string[];
    index: readonly SearchEntry[];
    name: string;
    query: string;
}>;

/**
 * Set a window hash and synchronously dispatch its change event.
 * When hash is omitted, the current hash is redispatched without changing it.
 * @param win - JSDOM window receiving the hash change.
 * @param hash - New hash, or the current hash when omitted.
 * @returns Nothing.
 */
function dispatchHashChange(win: DOMWindow, hash: string = win.location.hash): void {
    win.history.replaceState(null, "", hash || win.location.pathname);
    win.dispatchEvent(new win.HashChangeEvent("hashchange"));
}

/** Assert one query-clearing URL scenario. */
async function assertQueryClearing(scenario: ClearingScenario): Promise<void> {
    const { input, status, results, win } = await bootSearch({ hash: scenario.hash });
    expect(results?.children).toHaveLength(1);
    await typeQuery(input as HTMLInputElement, scenario.input);
    expect(status?.textContent).toBe("");
    expect(results?.children).toHaveLength(0);
    expect(win.location.hash).toBe(scenario.expectedHash);
}

/** Assert one rendered query status and URL scenario. */
async function assertResultStatus(scenario: ResultStatusScenario): Promise<void> {
    const { input, status, results, win } = await bootSearch({ index: scenario.index });
    await typeQuery(input as HTMLInputElement, scenario.query);
    expect(status?.textContent).toBe(scenario.expectedStatus);
    expect(resultTitles(results as HTMLElement)).toEqual(scenario.expectedTitles);
    expect(win.location.hash).toBe(scenario.expectedHash);
}

describe("query clearing", (): void => {
    test.each([
        { name: "clears an empty query and hash", hash: "#q=search", input: "   ", expectedHash: "" },
        {
            name: "removes only q from a multi-parameter hash",
            hash: "#view=advanced&q=search",
            input: "",
            expectedHash: "#view=advanced",
        },
    ] satisfies readonly ClearingScenario[])("$name", assertQueryClearing);
});

describe("plain fragment preservation", (): void => {
    test("round-trips a plain fragment while adding and clearing a query", async (): Promise<void> => {
        const { input, results, status, win } = await bootSearch({ hash: "#section" });
        expect(win.location.hash).toBe("#section");
        expect(status?.textContent).toBe("");
        expect(results?.children).toHaveLength(0);
        await typeQuery(input as HTMLInputElement, "search");
        expect(win.location.hash).toBe("#section&q=search");
        await typeQuery(input as HTMLInputElement, "");
        expect(win.location.hash).toBe("#section");
    });
});

describe("removed hash query navigation", (): void => {
    test("clears rendered results when browser navigation removes q", async (): Promise<void> => {
        const { input, results, status, win } = await bootSearch({ hash: "#q=search" });
        dispatchHashChange(win, "");
        expect(input?.value).toBe("");
        expect(status?.textContent).toBe("");
        expect(results?.children).toHaveLength(0);
    });
});

describe("query result status", (): void => {
    test.each([
        {
            name: "shows no-results status for an unmatched query",
            index: [makeEntry()],
            query: "missing",
            expectedStatus: "No results found.",
            expectedTitles: [],
            expectedHash: "#q=missing",
        },
        {
            name: "formats status for multiple matches",
            index: [makeEntry({ title: "Alpha" }), makeEntry({ title: "Beta" })],
            query: "search",
            expectedStatus: "Results: 2",
            expectedTitles: ["Alpha", "Beta"],
            expectedHash: "#q=search",
        },
        {
            name: "encodes reserved and Unicode query characters",
            index: [makeEntry({ title: "Encoded", body: "a & 日本" })],
            query: "a & 日本",
            expectedStatus: "Results: 1",
            expectedTitles: ["Encoded"],
            expectedHash: "#q=a+%26+%E6%97%A5%E6%9C%AC",
        },
    ] satisfies readonly ResultStatusScenario[])("$name", assertResultStatus);
});

describe("changed hash query navigation", (): void => {
    test("responds to changed hash queries and ignores unchanged hash queries", async (): Promise<void> => {
        const { input, status, results, win } = await bootSearch({
            index: [makeEntry({ title: "Alpha", body: "alpha" }), makeEntry({ title: "Beta", body: "beta" })],
        });
        dispatchHashChange(win, "#q=alpha");
        expect(input?.value).toBe("alpha");
        expect(status?.textContent).toBe("Results: 1");
        expect(resultTitles(results as HTMLElement)).toEqual(["Alpha"]);
        (results as HTMLElement).innerHTML = "<p>unchanged</p>";
        dispatchHashChange(win);
        expect(results?.innerHTML).toBe("<p>unchanged</p>");
    });
});
