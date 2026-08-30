// Copyright: Ajatt-Tools and contributors; https://github.com/Ajatt-Tools
// License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html

import { describe, expect, test } from "vitest";

import { bootSearch, makeEntry, snippets, typeQuery } from "./helpers.ts";

describe("snippet anchoring and highlighting", (): void => {
    test("prefers a phrase match over an earlier individual word", async (): Promise<void> => {
        const filler = "x".repeat(130);
        const { input, results } = await bootSearch({
            // The first alpha is outside the phrase-centered window. Anchoring on
            // that word instead would omit the later complete phrase entirely.
            index: [makeEntry({ title: "Snippet", body: `alpha ${filler} Alpha Beta ${filler}` })],
        });

        await typeQuery(input as HTMLInputElement, "alpha beta");

        expect(snippets(results as HTMLElement)).toEqual([
            `...${"x".repeat(119)} <mark>Alpha</mark> <mark>Beta</mark> ${"x".repeat(119)}...`,
        ]);
    });
});

describe("snippet clipping and escaping", (): void => {
    test("falls back to the earliest word match and clips long snippets with ellipses", async (): Promise<void> => {
        const prefix = "x".repeat(130);
        const suffix = "y".repeat(130);
        const { input, results } = await bootSearch({
            index: [makeEntry({ title: "Long", body: `${prefix}alpha${suffix} beta` })],
        });

        await typeQuery(input as HTMLInputElement, "beta alpha");

        const [snippet] = snippets(results as HTMLElement);
        expect(snippet?.startsWith("...")).toBe(true);
        expect(snippet?.endsWith("...")).toBe(true);
        expect(snippet).toContain("<mark>alpha</mark>");
        expect(snippet).not.toContain("beta");
    });

    test("escapes HTML and merges overlapping highlight ranges", async (): Promise<void> => {
        const { input, results } = await bootSearch({
            index: [makeEntry({ title: "Escaped", body: "Use <alpha&beta> safely." })],
        });

        await typeQuery(input as HTMLInputElement, "alpha alpha&beta");

        expect(snippets(results as HTMLElement)).toEqual(["Use &lt;<mark>alpha&amp;beta</mark>&gt; safely."]);
    });

    test("omits highlighting when Unicode lowercasing changes text length", async (): Promise<void> => {
        const { input, results } = await bootSearch({
            index: [makeEntry({ title: "Unicode", body: "İxy" })],
        });

        await typeQuery(input as HTMLInputElement, "x");

        expect(snippets(results as HTMLElement)).toEqual(["İxy"]);
    });
});
