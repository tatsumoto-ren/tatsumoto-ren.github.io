// Copyright: Ajatt-Tools and contributors; https://github.com/Ajatt-Tools
// License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html

import { describe, expect, test } from "vitest";

import { bootSearch, resultTitles, typeQuery, type SearchEntry } from "./helpers.ts";

type NormalizationScenario = Readonly<{
    expectedTitles: readonly string[];
    index: readonly SearchEntry[];
    name: string;
    query: string;
}>;

/** Run one search-index normalization scenario through rendered results. */
async function assertNormalizationScenario(scenario: NormalizationScenario): Promise<void> {
    const { input, status, results } = await bootSearch({ index: scenario.index });
    await typeQuery(input as HTMLInputElement, scenario.query);
    expect(status?.textContent).toBe(`Results: ${scenario.expectedTitles.length}`);
    expect(resultTitles(results as HTMLElement)).toEqual(scenario.expectedTitles);
}

describe("index normalization", (): void => {
    test.each([
        {
            name: "searches joined tags and tolerates missing optional fields",
            index: [{ title: "Tag Only", url: "/tag.html", tags: ["first", "second"] }],
            query: "second",
            expectedTitles: ["Tag Only"],
        },
        {
            name: "tolerates missing title and tags fields",
            index: [{ url: "/untitled.html", body: "untitled body", parent: "Docs" }],
            query: "untitled",
            expectedTitles: [""],
        },
        {
            // Matching the same field forces the normalized-title tie-breaker,
            // which must remain safe when both titles are absent.
            name: "sorts tied title-less entries without throwing",
            index: [
                { url: "/first.html", body: "needle body" },
                { url: "/second.html", body: "needle body" },
            ],
            query: "needle",
            expectedTitles: ["", ""],
        },
    ] satisfies readonly NormalizationScenario[])("$name", assertNormalizationScenario);
});
