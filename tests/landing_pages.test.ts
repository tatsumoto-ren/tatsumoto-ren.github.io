// Copyright: Ajatt-Tools and contributors; https://github.com/Ajatt-Tools
// License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html

import { describe, expect, test } from "vitest";

import { loadGeneratedPage } from "./helpers.ts";

type LandingPage = Readonly<{
    fileName: string;
    url: string;
    languageLabel: string;
    donateLabel: string;
}>;

/**
 * Verify page-specific metadata and localized controls for a landing page.
 *
 * @param page - Landing page and its expected localized values.
 * @returns Nothing.
 */
function assertLandingPage(page: LandingPage): void {
    const document = loadGeneratedPage(page.fileName).window.document;

    expect(document.querySelector('meta[property="og:url"]')?.getAttribute("content")).toBe(page.url);
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(page.url);
    expect(
        [...document.querySelectorAll<HTMLScriptElement>("script[src]")].map((script): string | null =>
            script.getAttribute("src"),
        ),
    ).toEqual(["res/canonical-redirect.js", "res/lang-redirect.js"]);
    expect(document.querySelector(".lang-switch")?.getAttribute("aria-label")).toBe(page.languageLabel);
    expect(document.querySelector(".donate")?.textContent).toBe(page.donateLabel);
}

describe("generated landing page metadata and controls", () => {
    test.each([
        {
            fileName: "index.html",
            url: "https://ajatt.top/index.html",
            languageLabel: "Switch language",
            donateLabel: "Donate",
        },
        {
            fileName: "ru.html",
            url: "https://ajatt.top/ru.html",
            languageLabel: "Сменить язык",
            donateLabel: "Поддержать",
        },
    ] satisfies readonly LandingPage[])(
        "sets page-specific metadata and localized controls for $fileName",
        assertLandingPage,
    );
});

describe("generated Russian search page", () => {
    test("renders localized Russian search messages", (): void => {
        const document = loadGeneratedPage("ru/search.html").window.document;
        const container = document.getElementById("search-container");
        const input = document.getElementById("search-input");
        const status = document.getElementById("number-results-found");

        expect(container?.getAttribute("data-no-results-message")).toBe("Ничего не найдено.");
        expect(container?.getAttribute("data-results-message")).toBe("Результатов: {count}");
        expect(document.querySelector(".no-js-msg")?.textContent?.trim()).toContain("Для поиска требуется");
        expect(input?.getAttribute("aria-label")).toBe("Поиск статей...");
        expect(status?.getAttribute("role")).toBe("status");
        expect(status?.getAttribute("aria-live")).toBe("polite");
    });
});

describe("generated Russian content", () => {
    test("renders the Russian description with Cyrillic characters", (): void => {
        const document = loadGeneratedPage("ru.html").window.document;

        expect(document.querySelector('meta[name="description"]')?.getAttribute("content")).toContain("языке");
    });

    test("localizes updated post metadata in Russian", (): void => {
        const document = loadGeneratedPage("ru/anki-japanese-support.html").window.document;
        const subtitle = document.querySelector(".subtitle")?.textContent;

        expect(subtitle).toContain("(обновлено ");
        expect(subtitle).not.toContain("(updated ");
    });
});
