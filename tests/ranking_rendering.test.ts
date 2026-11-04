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
    const fixture = await bootSearch({ index: scenario.index });
    await typeQuery(fixture.input as HTMLInputElement, scenario.query);
    expect(resultTitles(fixture.results as HTMLElement)).toEqual(scenario.expectedTitles);
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
        {
            name: "preserves input order when tied titles differ only in case",
            index: [
                makeEntry({ title: "ALPHA", body: "needle", tags: [], parent: "" }),
                makeEntry({ title: "alpha", body: "needle", tags: [], parent: "" }),
                makeEntry({ title: "Alpha", body: "needle", tags: [], parent: "" }),
            ],
            query: "needle",
            expectedTitles: ["ALPHA", "alpha", "Alpha"],
        },
        {
            name: "retains accent differences in tied titles while ignoring case",
            index: [
                makeEntry({ title: "éclair", body: "needle", tags: [], parent: "" }),
                makeEntry({ title: "Eclair", body: "needle", tags: [], parent: "" }),
                makeEntry({ title: "eclair", body: "needle", tags: [], parent: "" }),
                makeEntry({ title: "Éclair", body: "needle", tags: [], parent: "" }),
            ],
            query: "needle",
            expectedTitles: ["Eclair", "eclair", "éclair", "Éclair"],
        },
        {
            name: "scores every distinct matching query word using the same field weight",
            index: [
                makeEntry({ title: "A Group", body: "", parent: "alpha and beta", tags: [] }),
                makeEntry({ title: "B Split", body: "beta", parent: "alpha", tags: [] }),
            ],
            query: "alpha beta",
            expectedTitles: ["A Group", "B Split"],
        },
        {
            name: "adds field contributions even when the same query word matched another field",
            index: [
                makeEntry({ title: "A Single", body: "alpha and beta", parent: "", tags: [] }),
                makeEntry({ title: "Z Repeated Fields", body: "alpha and beta", parent: "alpha", tags: [] }),
            ],
            query: "alpha beta",
            expectedTitles: ["Z Repeated Fields", "A Single"],
        },
        {
            name: "retains a later field's score when all whole-word counts are already known",
            index: [
                makeEntry({ title: "A Parent Once", body: "", parent: "alpha and beta", tags: [] }),
                makeEntry({ title: "Z Parent And Body", body: "alpha with beta", parent: "alpha and beta", tags: [] }),
            ],
            query: "alpha beta",
            expectedTitles: ["Z Parent And Body", "A Parent Once"],
        },
        {
            name: "retains a later field's phrase match when whole-word counts are already known",
            index: [
                makeEntry({ title: "A Separated", body: "alpha and beta", parent: "alpha and beta", tags: [] }),
                makeEntry({ title: "Z Later Phrase", body: "alpha beta", parent: "alpha and beta", tags: [] }),
            ],
            query: "alpha beta",
            expectedTitles: ["Z Later Phrase", "A Separated"],
        },
        {
            name: "does not multiply a field contribution by repeated occurrences of a query word",
            index: [
                makeEntry({ title: "A Repeated", body: `${"alpha ".repeat(10)}and beta`, parent: "", tags: [] }),
                makeEntry({ title: "Z Higher Field", body: "beta", parent: "alpha", tags: [] }),
            ],
            query: "alpha beta",
            expectedTitles: ["Z Higher Field", "A Repeated"],
        },
        {
            name: "scores every distinct exact tag match with the tag weight",
            index: [
                makeEntry({ title: "A Tag Group", body: "", parent: "", tags: ["alpha", "beta"] }),
                makeEntry({ title: "Z Parent Group", body: "", parent: "alpha and beta", tags: [] }),
            ],
            query: "alpha beta",
            expectedTitles: ["A Tag Group", "Z Parent Group"],
        },
        {
            name: "ranks a whole-word body match above substring title matches without hiding them",
            index: [
                makeEntry({ title: "Function Reference", body: "" }),
                makeEntry({ title: "Funds Overview", body: "" }),
                makeEntry({ title: "Leisure", body: "Have fun doing something fun." }),
            ],
            query: "fun",
            expectedTitles: ["Leisure", "Function Reference", "Funds Overview"],
        },
        {
            name: "recognizes whole words in tags and parent titles as well as bodies",
            index: [
                makeEntry({ title: "Function Guide", body: "", tags: [], parent: "" }),
                makeEntry({ title: "Body Result", body: "fun", tags: [], parent: "" }),
                makeEntry({ title: "Parent Result", body: "", tags: [], parent: "fun" }),
                makeEntry({ title: "Tag Result", body: "", tags: ["fun"], parent: "" }),
            ],
            query: "fun",
            expectedTitles: ["Tag Result", "Parent Result", "Body Result", "Function Guide"],
        },
        {
            name: "treats quotes and punctuation as boundaries and ignores case",
            index: [
                makeEntry({ title: "A Substring", body: "function funds" }),
                makeEntry({ title: "Z Quoted", body: "'FUN', (fun), \"fun\"." }),
            ],
            query: "FUN",
            expectedTitles: ["Z Quoted", "A Substring"],
        },
        {
            name: "keeps Unicode letters, combining marks, numbers, and internal punctuation within tokens",
            index: [
                makeEntry({
                    title: "A Embedded",
                    body: "éfun funé fun2 2fun fun\u0301 \u{10400}fun snake_fun_token fun-filled fun,game",
                }),
                makeEntry({ title: "Z Whole", body: "'fun'!" }),
            ],
            query: "fun",
            expectedTitles: ["Z Whole", "A Embedded"],
        },
        {
            name: "strips punctuation at token edges when recognizing whole words",
            index: [
                makeEntry({ title: "A Substring", body: "function funds" }),
                makeEntry({ title: "Z Wrapped", body: "_fun_ (fun) 'fun' fun!" }),
            ],
            query: "fun",
            expectedTitles: ["Z Wrapped", "A Substring"],
        },
        {
            name: "preserves dotted I as an exact whole query word",
            index: [
                makeEntry({ title: "A Plain", body: "i" }),
                makeEntry({ title: "B Embedded", body: "İstanbul" }),
                makeEntry({ title: "Z Exact", body: "İ" }),
            ],
            query: "İ",
            expectedTitles: ["Z Exact", "B Embedded"],
        },
        {
            name: "preserves decomposed accents in whole query words",
            index: [
                makeEntry({ title: "A Plain", body: "cafe" }),
                makeEntry({ title: "B Embedded", body: "cafe\u0301teria" }),
                makeEntry({ title: "Z Exact", body: "CAFE\u0301" }),
            ],
            query: "'cafe\u0301'",
            expectedTitles: ["Z Exact", "B Embedded"],
        },
        {
            name: "matches each canonical tag using case-insensitive full-token matching",
            index: [
                makeEntry({ title: "A Partial", body: "", tags: ["function", "funds", "fun-tools"] }),
                makeEntry({ title: "Z Exact", body: "", tags: ["fun"] }),
                makeEntry({ title: "Function Guide", body: "", tags: ["funds"] }),
            ],
            query: "FUN",
            expectedTitles: ["Z Exact", "Function Guide"],
        },
        {
            name: "does not synthesize a phrase across separate tags",
            index: [
                makeEntry({ title: "A Separate Tags", body: "", tags: ["fun", "tips"] }),
                makeEntry({ title: "Hyphenated Tag", body: "", tags: ["fun-tips"] }),
                makeEntry({ title: "Z Phrase", body: "fun tips", tags: [] }),
            ],
            query: "fun tips",
            expectedTitles: ["Z Phrase", "A Separate Tags"],
        },
        {
            name: "looks past an earlier embedded occurrence to find a later whole word",
            index: [
                makeEntry({ title: "A Substring", body: "function funds" }),
                makeEntry({ title: "Z Whole Later", body: "function first, then have fun" }),
            ],
            query: "fun",
            expectedTitles: ["Z Whole Later", "A Substring"],
        },
        {
            name: "ranks more distinct whole words before an embedded full-phrase match",
            index: [
                makeEntry({ title: "A Embedded Phrase", body: "fun games" }),
                makeEntry({ title: "B Whole Words", body: "game and fun" }),
                makeEntry({ title: "C Substrings", body: "function gamely" }),
            ],
            query: "fun game",
            expectedTitles: ["B Whole Words", "A Embedded Phrase", "C Substrings"],
        },
        {
            name: "counts each whole query word once across occurrences and fields",
            index: [
                makeEntry({ title: "Fun", body: "fun fun fun", tags: ["fun"], parent: "fun" }),
                makeEntry({ title: "Both Words", body: "fun and game", tags: [], parent: "" }),
            ],
            query: "fun game",
            expectedTitles: ["Both Words", "Fun"],
        },
        {
            name: "keeps phrase priority and field weights within the same whole-word count",
            index: [
                makeEntry({ title: "Alpha Separated", body: "game and fun" }),
                makeEntry({ title: "Zulu Phrase", body: "fun game" }),
                makeEntry({ title: "Fun Game", body: "" }),
            ],
            query: "fun game",
            expectedTitles: ["Fun Game", "Zulu Phrase", "Alpha Separated"],
        },
        {
            name: "treats a dot inside the query as a literal character",
            index: [
                makeEntry({ title: "A Impostor", body: "nodeXjs; node.jsSuffix" }),
                makeEntry({ title: "Z Literal Whole", body: "node.js" }),
            ],
            query: "node.js",
            expectedTitles: ["Z Literal Whole", "A Impostor"],
        },
        {
            name: "escapes regex operators inside query words",
            index: [
                makeEntry({ title: "A Impostor", body: "aaab; a+bSuffix" }),
                makeEntry({ title: "Z Literal Whole", body: "a+b" }),
            ],
            query: "a+b",
            expectedTitles: ["Z Literal Whole", "A Impostor"],
        },
        {
            name: "keeps an escaped pipe literal when anchoring an exact word",
            index: [
                makeEntry({ title: "A Impostor", body: "a or b and a|bSuffix" }),
                makeEntry({ title: "Z Literal Whole", body: "a|b" }),
            ],
            query: "a|b",
            expectedTitles: ["Z Literal Whole", "A Impostor"],
        },
    ] satisfies readonly RankingScenario[])("$name", assertRankingScenario);

    test.each(["s", "S", "ſ", "ſ s", "s ſ", "ſ S", "S ſ", "ſ s ſ"])(
        "keeps tag matches and distinct-word counts consistent for %s",
        async (query): Promise<void> => {
            const fixture = await bootSearch({
                index: [
                    makeEntry({ title: "Tagged", body: "", parent: "", tags: ["s"] }),
                    makeEntry({ title: "Body", body: "s", parent: "", tags: [] }),
                ],
            });
            await typeQuery(fixture.input as HTMLInputElement, query);
            expect(resultTitles(fixture.results as HTMLElement)).toEqual(["Tagged", "Body"]);
        },
    );
});

describe("result rendering", (): void => {
    test("renders links, optional parents, and optional snippets", async (): Promise<void> => {
        const fixture = await bootSearch({
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

        await typeQuery(fixture.input as HTMLInputElement, "shared");

        expectRenderedCards(fixture.results as HTMLElement);
    });

    test("limits rendered results to the configured maximum", async (): Promise<void> => {
        const index = Array.from({ length: 101 }, (_value: undefined, idx: number) =>
            makeEntry({ title: `Result ${String(idx).padStart(3, "0")}`, body: "needle" }),
        );
        const fixture = await bootSearch({ index });

        await typeQuery(fixture.input as HTMLInputElement, "needle");

        expect(fixture.status?.textContent).toBe("Results: 101 (showing first 100)");
        expect((fixture.results as HTMLElement).querySelectorAll(".search-result")).toHaveLength(100);
    });
});
