// Copyright: Ajatt-Tools and contributors; https://github.com/Ajatt-Tools
// License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html

import { describe, expect, test, vi } from "vitest";

import { bootSearch, makeEntry, resultTitles, typeQueryNoFlush } from "./helpers.ts";

// DEBOUNCE_MS in blog/res/search.js. Kept in sync manually because search.js
// intentionally does not export its internals.
const DEBOUNCE_MS = 200;

const searchIndex = Object.freeze([
    makeEntry({ title: "Alpha", body: "alpha" }),
    makeEntry({ title: "Beta", body: "beta" }),
]);

describe("search debounce", (): void => {
    test("collapses rapid keystrokes into a single search for the final query", async (): Promise<void> => {
        const { input, status, results, win } = await bootSearch({ index: searchIndex });

        // Three keystrokes, each less than DEBOUNCE_MS apart, so every pending
        // timer is cleared before it can fire.
        typeQueryNoFlush(input as HTMLInputElement, "a");
        vi.advanceTimersByTime(DEBOUNCE_MS / 2);
        typeQueryNoFlush(input as HTMLInputElement, "al");
        vi.advanceTimersByTime(DEBOUNCE_MS / 2);
        typeQueryNoFlush(input as HTMLInputElement, "alpha");

        // No search has run yet: the debounce timer is still pending.
        expect(status?.textContent).toBe("");
        expect(results?.children).toHaveLength(0);
        expect(win.location.hash).toBe("");

        // Let the final debounce elapse; only the last query should search.
        vi.advanceTimersByTime(DEBOUNCE_MS);

        expect(win.location.hash).toBe("#q=alpha");
        expect(status?.textContent).toBe("Results: 1");
        expect(resultTitles(results as HTMLElement)).toEqual(["Alpha"]);
    });

    test("cancels a pending debounce when hash navigation supplies a query", async (): Promise<void> => {
        const { input, results, status, win } = await bootSearch({ index: searchIndex });

        typeQueryNoFlush(input as HTMLInputElement, "alpha");
        expect(vi.getTimerCount()).toBe(1);

        win.history.replaceState(null, "", "#q=beta");
        win.dispatchEvent(new win.HashChangeEvent("hashchange"));

        // Hash navigation must cancel, not merely supersede, the stale search.
        expect(vi.getTimerCount()).toBe(0);
        expect(status?.textContent).toBe("Results: 1");
        expect(resultTitles(results as HTMLElement)).toEqual(["Beta"]);

        vi.advanceTimersByTime(DEBOUNCE_MS);

        expect(resultTitles(results as HTMLElement)).toEqual(["Beta"]);
    });

    test("clears immediately and cancels a pending debounce for empty input", async (): Promise<void> => {
        const { input, results, status, win } = await bootSearch({ hash: "#q=alpha", index: searchIndex });
        expect(resultTitles(results as HTMLElement)).toEqual(["Alpha"]);

        typeQueryNoFlush(input as HTMLInputElement, "beta");
        expect(vi.getTimerCount()).toBe(1);

        typeQueryNoFlush(input as HTMLInputElement, "");

        expect(vi.getTimerCount()).toBe(0);
        expect(status?.textContent).toBe("");
        expect(results?.children).toHaveLength(0);
        expect(win.location.hash).toBe("");

        vi.advanceTimersByTime(DEBOUNCE_MS);

        expect(results?.children).toHaveLength(0);
    });
});
