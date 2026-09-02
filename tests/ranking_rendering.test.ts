// Copyright: Ajatt-Tools and contributors; https://github.com/Ajatt-Tools
// License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html

import { describe, expect, test } from "vitest";

import { bootSearch, makeEntry, resultTitles, typeQuery, type SearchEntry } from "./helpers.ts";

type RankingScenario = Readonly<{
    expectedTitles: readonly string[];
    index: readonly SearchEntry[];
    name: string;
    query: string;
}>;

/**
 * Assert the optional content rendered for result cards with and without parents.
 * @param results - Search results container populated by the browser script.
 * @returns Nothing.
 */
function expectRenderedCards(results: HTMLElement): void {
    const cards = results.querySelectorAll(".search-result");
    expect(cards).toHaveLength(2);
    const withParent = cards.item(0);
    const withoutParent = cards.item(1);
    expect(withParent.querySelector("a")?.getAttribute("href")).toBe("/with.html");
    expect(withParent.querySelector(".parent-article-name")?.textContent).toBe("Docs");
    expect(withParent.querySelector(".snippet")?.innerHTML).toContain("<mark>shared</mark>");
    expect(withoutParent.querySelector("a")?.getAttribute("href")).toBe("/without.html");
    expect(withoutParent.querySelector(".parent-article-name")).toBeNull();
    expect(withoutParent.querySelector(".snippet")).toBeNull();
}

/** Assert one search-result ranking scenario. */
async function assertRankingScenario(scenario: RankingScenario): Promise<void> {
    const { input, results } = await bootSearch({ index: scenario.index });
    await typeQuery(input as HTMLInputElement, scenario.query);
    expect(resultTitles(results as HTMLElement)).toEqual(scenario.expectedTitles);
}

describe("ranking", (): void => {
    test.each([
        {
            name: "ranks distinct words, weights, and titles deterministically",
            index: [
                makeEntry({ title: "Alpha Beta Phrase", body: "alpha beta" }),
                makeEntry({ title: "Zulu Split", body: "alpha elsewhere beta" }),
                makeEntry({ title: "Alpha Title", body: "only filler" }),
                makeEntry({ title: "A Body Tie", body: "alpha" }),
                makeEntry({ title: "B Body Tie", body: "alpha" }),
            ],
            query: "alpha beta",
            expectedTitles: ["Alpha Beta Phrase", "Zulu Split", "Alpha Title", "A Body Tie", "B Body Tie"],
        },
        {
            name: "deduplicates repeated query words before scoring",
            index: [
                makeEntry({ title: "Parent Match", body: "", tags: [], parent: "alpha" }),
                makeEntry({ title: "Tag Match", body: "", tags: ["beta"], parent: "" }),
            ],
            query: "alpha alpha beta",
            expectedTitles: ["Tag Match", "Parent Match"],
        },
        {
            name: "applies field weights in descending order",
            index: [
                makeEntry({ title: "Body Match", body: "needle", tags: [], parent: "" }),
                makeEntry({ title: "Parent Match", body: "", tags: [], parent: "needle" }),
                makeEntry({ title: "Tag Match", body: "", tags: ["needle"], parent: "" }),
                makeEntry({ title: "Needle Title", body: "", tags: [], parent: "" }),
            ],
            query: "needle",
            expectedTitles: ["Needle Title", "Tag Match", "Parent Match", "Body Match"],
        },
    ] satisfies readonly RankingScenario[])("$name", assertRankingScenario);
});

describe("result rendering", (): void => {
    test("renders links, optional parents, and optional snippets", async (): Promise<void> => {
        const { input, results } = await bootSearch({
            index: [
                makeEntry({ title: "Shared With Parent", url: "/with.html", parent: "Docs", body: "shared in body" }),
                makeEntry({
                    title: "Shared Without Parent",
                    url: "/without.html",
                    parent: "",
                    body: "body text",
                    tags: [],
                }),
            ],
        });

        await typeQuery(input as HTMLInputElement, "shared");

        expectRenderedCards(results as HTMLElement);
    });

    test("limits rendered results to the configured maximum", async (): Promise<void> => {
        const index = Array.from({ length: 101 }, (_value: undefined, idx: number) =>
            makeEntry({ title: `Result ${String(idx).padStart(3, "0")}`, body: "needle" }),
        );
        const { input, status, results } = await bootSearch({ index });

        await typeQuery(input as HTMLInputElement, "needle");

        expect(status?.textContent).toBe("Results: 101 (showing first 100)");
        expect((results as HTMLElement).querySelectorAll(".search-result")).toHaveLength(100);
    });
});
