// Copyright: Ajatt-Tools and contributors; https://github.com/Ajatt-Tools
// License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html

import { describe, expect, test } from "vitest";

import { bootSearch, makeEntry, snippets, typeQuery } from "./helpers.ts";

describe("matching substrings and highlighting", (): void => {
    test.each([
        {
            name: "displays surrounding context without highlighting it",
            body: "have fun today",
            query: "fun",
            expected: ["have <mark>fun</mark> today"],
        },
        {
            name: "includes an earlier word match as well as a later full phrase",
            body: `alpha ${"x".repeat(130)} Alpha Beta ${"x".repeat(130)}`,
            query: "alpha beta",
            expected: [
                `<mark>alpha</mark> ${"x".repeat(130)} <mark>Alpha</mark> <mark>Beta</mark> ${"x".repeat(119)}...`,
            ],
        },
        {
            name: "merges overlapping context windows without repeating text",
            body: "alpha middle alpha",
            query: "alpha",
            expected: ["<mark>alpha</mark> middle <mark>alpha</mark>"],
        },
        {
            name: "merges touching context windows without adding an ellipsis",
            body: `alpha${"x".repeat(240)}alpha`,
            query: "alpha",
            expected: [`<mark>alpha</mark>${"x".repeat(240)}<mark>alpha</mark>`],
        },
        {
            name: "separates distant occurrences with an ellipsis",
            body: `alpha${"x".repeat(300)}alpha`,
            query: "alpha",
            expected: [`<mark>alpha</mark>${"x".repeat(120)}...${"x".repeat(120)}<mark>alpha</mark>`],
        },
        {
            name: "clips both edges while including every distinct query word",
            body: `${"x".repeat(130)}alpha${"y".repeat(300)}beta${"z".repeat(130)}`,
            query: "beta alpha",
            expected: [
                `...${"x".repeat(120)}<mark>alpha</mark>${"y".repeat(120)}...${"y".repeat(120)}<mark>beta</mark>${"z".repeat(120)}...`,
            ],
        },
        {
            name: "escapes HTML and merges overlapping highlight ranges",
            body: "Use <alpha&beta> safely.",
            query: "alpha alpha&beta",
            expected: ["Use &lt;<mark>alpha&amp;beta</mark>&gt; safely."],
        },
        {
            name: "highlights original text without lowercase offset conversion",
            body: "İxy",
            query: "x",
            expected: ["İ<mark>x</mark>y"],
        },
        {
            name: "finds a later match after characters that expand when lowercased",
            body: `${"İ".repeat(200)} needle end`,
            query: "needle",
            expected: [`...${"İ".repeat(119)} <mark>needle</mark> end`],
        },
        {
            name: "keeps the complete emoji at the end of a context window",
            body: `needle${"a".repeat(119)}😀${"b".repeat(10)}`,
            query: "needle",
            expected: [`<mark>needle</mark>${"a".repeat(119)}😀...`],
        },
        {
            name: "keeps the complete emoji at the start of a context window",
            body: `${"a".repeat(10)}😀${"b".repeat(119)}needle`,
            query: "needle",
            expected: [`...😀${"b".repeat(119)}<mark>needle</mark>`],
        },
        {
            name: "retains overlapping literal word occurrences",
            body: "banana",
            query: "ana",
            expected: ["b<mark>anana</mark>"],
        },
        {
            name: "keeps two-part letters intact when finding overlapping matches",
            body: "\u{10400}\u{10400}\u{10400}",
            query: "\u{10428}\u{10428}",
            expected: ["<mark>\u{10400}\u{10400}\u{10400}</mark>"],
        },
        {
            name: "uses case-insensitive Unicode matching for both sigma forms",
            body: "ΟΣ ος οσ",
            query: "οσ",
            expected: ["<mark>ΟΣ</mark> <mark>ος</mark> <mark>οσ</mark>"],
        },
        {
            name: "keeps dotted I literal under Unicode case-insensitive matching",
            body: "i İ i\u0307",
            query: "İ",
            expected: ["i <mark>İ</mark> i\u0307"],
        },
        {
            name: "preserves combining accents in literal queries",
            body: "CAFE\u0301",
            query: "cafe\u0301",
            expected: ["<mark>CAFE\u0301</mark>"],
        },
    ])("$name", async (scenario): Promise<void> => {
        const fixture = await bootSearch({ index: [makeEntry({ title: "Snippet", body: scenario.body })] });
        await typeQuery(fixture.input as HTMLInputElement, scenario.query);
        expect(snippets(fixture.results as HTMLElement)).toEqual(scenario.expected);
    });

    test.each([
        { name: "title", entry: makeEntry({ title: "Needle Title", body: "No body-field occurrences." }) },
        { name: "tag", entry: makeEntry({ title: "Tag Match", body: "No body-field occurrences.", tags: ["needle"] }) },
    ])("keeps a $name-only result without a body substring", async (scenario): Promise<void> => {
        const fixture = await bootSearch({ index: [scenario.entry] });
        await typeQuery(fixture.input as HTMLInputElement, "needle");
        expect(fixture.results?.querySelectorAll(".search-result")).toHaveLength(1);
        expect(snippets(fixture.results as HTMLElement)).toEqual([]);
    });

    test.each(["compelling", "'compelling'", "COMPELLING"])(
        "shows the later definition when searching for %s",
        async (query): Promise<void> => {
            // This real passage used to show only the first occurrence, hiding the later definition.
            const body =
                'To be able to immerse for hours and hours every day, the content must be "compelling", ' +
                "as Steven Krashen often calls it. You have a long journey of learning ahead of you, " +
                "so it's essential to have a strong passion and enthusiasm for something in the language. " +
                "Only compelling content will be able to captivate you and hold your attention. " +
                "'Compelling' means that the input is so interesting you forget that it is in another language.";
            const fixture = await bootSearch({ index: [makeEntry({ title: "Starting to immerse", body })] });
            await typeQuery(fixture.input as HTMLInputElement, query);
            expect(fixture.results?.querySelector(".snippet")?.textContent).toContain(
                "'Compelling' means that the input is so interesting you forget that it is in another language.",
            );
            expect(fixture.results?.querySelectorAll(".snippet mark")).toHaveLength(3);
        },
    );
});
