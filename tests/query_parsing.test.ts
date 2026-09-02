// Copyright: Ajatt-Tools and contributors; https://github.com/Ajatt-Tools
// License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html

import { describe, expect, test } from "vitest";

import { bootSearch, makeEntry, resultTitles, typeQuery, type SearchEntry } from "./helpers.ts";

type InternalPunctuationCase = Readonly<{
    expectedTitle: string;
    index: readonly SearchEntry[];
    name: string;
    query: string;
}>;

/**
 * Verify that punctuation inside a query word remains significant.
 * @param scenario - Query, index, and expected result for one punctuation form.
 * @returns A promise that resolves after the assertion completes.
 */
async function assertInternalPunctuationPreserved(scenario: InternalPunctuationCase): Promise<void> {
    const { input, results } = await bootSearch({ index: scenario.index });
    await typeQuery(input as HTMLInputElement, scenario.query);
    expect(resultTitles(results as HTMLElement)).toEqual([scenario.expectedTitle]);
}

describe("query parsing: phrase normalization", (): void => {
    test("ranks literal phrase matches before word-only matches", async (): Promise<void> => {
        const { input, results } = await bootSearch({
            index: [
                makeEntry({ title: "Zulu Literal Phrase", body: "alpha, beta" }),
                makeEntry({ title: "Aardvark Split Words", body: "alpha and beta" }),
            ],
        });

        await typeQuery(input as HTMLInputElement, "alpha, beta");

        expect(resultTitles(results as HTMLElement)).toEqual(["Zulu Literal Phrase", "Aardvark Split Words"]);
    });

    test("normalizes whitespace before ranking phrase matches", async (): Promise<void> => {
        const { input, results } = await bootSearch({
            index: [
                makeEntry({ title: "Zulu Phrase", body: "alpha beta" }),
                makeEntry({ title: "Alpha Split", body: "alpha and beta" }),
            ],
        });

        await typeQuery(input as HTMLInputElement, "alpha\t\tbeta");

        expect(resultTitles(results as HTMLElement)).toEqual(["Zulu Phrase", "Alpha Split"]);
    });
});

describe("query parsing: edge punctuation", (): void => {
    test("strips punctuation from both edges of individual words", async (): Promise<void> => {
        const { input, results } = await bootSearch({
            index: [makeEntry({ title: "Edge Punctuation", body: "alpha" })],
        });

        await typeQuery(input as HTMLInputElement, "!!alpha!!");

        expect(resultTitles(results as HTMLElement)).toEqual(["Edge Punctuation"]);
    });

    test("treats all-punctuation words as an empty query", async (): Promise<void> => {
        const { input, status, results, win } = await bootSearch();

        await typeQuery(input as HTMLInputElement, "!!!   ???");

        expect(status?.textContent).toBe("");
        expect(results?.children).toHaveLength(0);
        expect(win.location.hash).toBe("");
    });
});

describe("query parsing: internal punctuation", (): void => {
    test.each([
        {
            name: "apostrophes",
            index: [
                makeEntry({ title: "Contraction", body: "I don't know." }),
                makeEntry({ title: "Degraded", body: "the word dont appears" }),
            ],
            query: "don't",
            expectedTitle: "Contraction",
        },
        {
            name: "underscores",
            index: [
                makeEntry({ title: "Snake", body: "the file_name token" }),
                makeEntry({ title: "Split", body: "file and name apart" }),
            ],
            query: "file_name",
            expectedTitle: "Snake",
        },
        {
            name: "hyphens",
            index: [
                makeEntry({ title: "Hyphen", body: "a well-known fact" }),
                makeEntry({ title: "Split", body: "well and known apart" }),
            ],
            query: "well-known",
            expectedTitle: "Hyphen",
        },
    ] satisfies readonly InternalPunctuationCase[])(
        "preserves $name inside query words",
        assertInternalPunctuationPreserved,
    );
});
