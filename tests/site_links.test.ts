// Copyright: Ajatt-Tools and contributors; https://github.com/Ajatt-Tools
// License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html

import fs from "node:fs";
import path from "node:path";

import { JSDOM } from "jsdom";
import { describe, expect, test } from "vitest";

const rootDir = path.join(import.meta.dirname, "..");
const siteOrigin = "https://generated-site.invalid";

type LocalLinkTarget = Readonly<{ file: string; fragment: string; pathname: string }>;
// Retaining hundreds of JSDOM documents consumes gigabytes; keep only the
// rendered strings and IDs needed for cross-page validation.
type GeneratedPage = Readonly<{ hrefs: readonly string[]; ids: ReadonlySet<string> }>;

/**
 * Return generated site files that participate in local-link validation.
 * @returns Absolute paths to generated HTML files.
 */
function generatedSiteFiles(): readonly string[] {
    return fs
        .globSync(["index.html", "not_found.html", "ru.html", "blog/**/*.html", "ru/**/*.html"], {
            cwd: rootDir,
            exclude: ["blog/templates/**"],
        })
        .map((file: string): string => path.join(rootDir, file));
}

/**
 * Extract compact link data from one generated page and close its DOM immediately.
 * @param file - Absolute path to a generated HTML file.
 * @returns Rendered links and element IDs from the generated page.
 */
function readGeneratedPage(file: string): GeneratedPage {
    const dom = new JSDOM(fs.readFileSync(file, "utf8"));
    try {
        return {
            hrefs: [...dom.window.document.querySelectorAll<HTMLAnchorElement>("a[href]")].map(
                link => link.getAttribute("href") ?? "",
            ),
            ids: new Set(
                [...dom.window.document.querySelectorAll("[id]")].map(element => element.getAttribute("id") ?? ""),
            ),
        };
    } finally {
        // Closing each window releases JSDOM's document graph before the next page is parsed.
        dom.window.close();
    }
}

/**
 * Parse generated pages into compact records for cross-document validation.
 * @returns Generated file paths mapped to rendered links and element IDs.
 */
function generatedPages(): ReadonlyMap<string, GeneratedPage> {
    return new Map(generatedSiteFiles().map(file => [file, readGeneratedPage(file)]));
}

/**
 * Return the synthetic site URL corresponding to one generated HTML file.
 * @param file - Absolute path to a generated HTML file.
 * @returns Synthetic site URL for the generated file.
 */
function siteUrlForFile(file: string): URL {
    const pathname = path.relative(rootDir, file).split(path.sep).join("/");
    return new URL(`/${pathname}`, siteOrigin);
}

/**
 * Return a local target file and fragment, or null for an external URL.
 * @param file - Absolute path to the page containing the link.
 * @param href - Link destination as written in the generated page.
 * @returns Resolved local target, or null for an external URL.
 */
function localLinkTarget(file: string, href: string): LocalLinkTarget | null {
    const targetUrl = new URL(href, siteUrlForFile(file));
    if (targetUrl.origin !== siteOrigin) {
        return null;
    }
    return {
        file: path.join(rootDir, ...decodeURIComponent(targetUrl.pathname).split("/").filter(Boolean)),
        fragment: decodeURIComponent(targetUrl.hash.slice(1)),
        pathname: targetUrl.pathname,
    };
}

/**
 * Validate one generated page link, ignoring non-HTML local resources.
 * @param file - Absolute path to the page containing the link.
 * @param href - Link destination as rendered in the generated page.
 * @param pages - Generated file paths mapped to compact page records.
 * @returns A diagnostic for an invalid link, or null for a valid or ignored link.
 */
function validateLink(file: string, href: string, pages: ReadonlyMap<string, GeneratedPage>): string | null {
    try {
        const target = localLinkTarget(file, href);
        if (!target) {
            return null;
        }
        if (target.pathname.endsWith(".md")) {
            return `${file}: ${href}: links to Markdown source`;
        }
        if (!target.pathname.endsWith(".html")) {
            return null;
        }
        const targetPage = pages.get(target.file);
        if (!targetPage) {
            return `${file}: ${href}: generated HTML target is missing`;
        }
        return target.fragment && !targetPage.ids.has(target.fragment)
            ? `${file}: ${href}: fragment is missing from generated HTML target`
            : null;
    } catch (error) {
        return `${file}: ${href}: cannot resolve link: ${String(error)}`;
    }
}

/**
 * Return every invalid local link in one generated HTML page.
 * @param file - Absolute path to the generated page.
 * @param page - Compact generated-page record.
 * @param pages - Generated file paths mapped to compact page records.
 * @returns Diagnostics for invalid links in the page.
 */
function invalidPageLinks(
    file: string,
    page: GeneratedPage,
    pages: ReadonlyMap<string, GeneratedPage>,
): readonly string[] {
    return page.hrefs.map(href => validateLink(file, href, pages)).filter(diagnostic => diagnostic !== null);
}

describe("generated internal links", (): void => {
    test("use rendered HTML pages and existing fragments", (): void => {
        const pages = generatedPages();
        // An empty corpus would make the broken-link assertion pass without checking anything.
        expect(pages.size).toBeGreaterThan(0);
        // Report the complete repair list instead of stopping at the first broken article link.
        const invalidLinks = [...pages].flatMap(([file, page]) => invalidPageLinks(file, page, pages));
        expect(invalidLinks).toEqual([]);
    }, 30_000);
});
