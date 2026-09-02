// Copyright: Ajatt-Tools and contributors; https://github.com/Ajatt-Tools
// License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html

import vm from "node:vm";

import { describe, expect, test } from "vitest";

import { loadScript } from "./helpers.ts";

const canonicalRedirectScript = loadScript("res/canonical-redirect.js");

type CanonicalDocument = Readonly<{
    addEventListener: (event: string, listener: () => void, options?: boolean) => void;
    querySelector: (selector: string) => CanonicalLink | null;
}>;
type DomReadyRegistration = Readonly<{ event: string; listener: () => void; options: boolean | undefined }>;

type RedirectLocation = Readonly<{
    protocol: string;
    hostname: string;
    search: string;
    hash: string;
    replace: (url: string) => void;
}>;

/** Represent the canonical link properties read by the canonical redirect script. */
class CanonicalLink {
    readonly href: string;

    /**
     * Create a link element with the absolute canonical URL.
     * @param href - Absolute canonical URL.
     */
    constructor(href: string) {
        this.href = href;
    }
}

/**
 * Return the minimal document API used to read a canonical link.
 * @param canonicalUrl - Absolute canonical URL, or null when it is absent.
 * @param registrations - Mutable destination for DOM-ready registrations.
 * @returns Minimal document implementation used by the redirect script.
 */
function canonicalDocument(canonicalUrl: string | null, registrations: DomReadyRegistration[]): CanonicalDocument {
    return {
        addEventListener: (event: string, listener: () => void, options?: boolean): void => {
            registrations.push({ event, listener, options });
        },
        querySelector: (selector: string): CanonicalLink | null =>
            selector === 'link[rel="canonical"]' && canonicalUrl ? new CanonicalLink(canonicalUrl) : null,
    };
}

/**
 * Return the minimal location API used to calculate and record a redirect.
 * @param current - Current page URL.
 * @param redirects - Mutable destination log populated by `location.replace`.
 * @returns Minimal location implementation used by the redirect script.
 */
function redirectLocation(current: URL, redirects: string[]): RedirectLocation {
    return {
        protocol: current.protocol,
        hostname: current.hostname,
        search: current.search,
        hash: current.hash,
        replace: (url: string): void => {
            redirects.push(url);
        },
    };
}

/**
 * Execute the canonical redirect and return any URL passed to `location.replace`.
 * @param scenario - Named current and canonical URLs for one redirect case.
 * @returns Redirect destination, or null when no redirect occurs.
 */
function redirectedUrl(scenario: RedirectCase): string | null {
    const current = new URL(scenario.currentUrl);
    const redirects: string[] = [];
    const registrations: DomReadyRegistration[] = [];
    vm.runInNewContext(
        canonicalRedirectScript.source,
        {
            CanonicalLink,
            HTMLLinkElement: CanonicalLink,
            URL,
            document: canonicalDocument(scenario.canonicalUrl, registrations),
            location: redirectLocation(current, redirects),
        },
        { filename: canonicalRedirectScript.filePath },
    );
    expect(registrations).toHaveLength(1);
    expect(registrations[0]?.event).toBe("DOMContentLoaded");
    expect(registrations[0]?.options).toBe(false);
    registrations[0]?.listener();
    return redirects[0] ?? null;
}

type RedirectCase = Readonly<{
    canonicalUrl: string | null;
    currentUrl: string;
    expectedUrl: string | null;
    name: string;
}>;

/** Assert the redirect destination for one current and canonical URL pair. */
function assertRedirectCase(scenario: RedirectCase): void {
    expect(redirectedUrl(scenario)).toBe(scenario.expectedUrl);
}

describe("canonical domain redirect destinations", (): void => {
    test.each([
        {
            name: "preserves mirror query parameters and fragments",
            currentUrl: "https://tatsumoto.neocities.org/ru/guide.html?source=mirror#step",
            canonicalUrl: "https://ajatt.top/ru/guide.html",
            expectedUrl: "https://ajatt.top/ru/guide.html?source=mirror#step",
        },
        {
            name: "redirects the GitHub mirror",
            currentUrl: "https://tatsumoto-ren.github.io/blog/guide.html",
            canonicalUrl: "https://ajatt.top/blog/guide.html",
            expectedUrl: "https://ajatt.top/blog/guide.html",
        },
        {
            name: "redirects an arbitrary public mirror",
            currentUrl: "https://example-mirror.invalid/blog/guide.html",
            canonicalUrl: "https://ajatt.top/blog/guide.html",
            expectedUrl: "https://ajatt.top/blog/guide.html",
        },
        {
            name: "does not treat a 127 subdomain as loopback",
            currentUrl: "https://127.example.com/blog/guide.html",
            canonicalUrl: "https://ajatt.top/blog/guide.html",
            expectedUrl: "https://ajatt.top/blog/guide.html",
        },
    ] satisfies readonly RedirectCase[])("$name", assertRedirectCase);
});

describe("canonical domain redirect bypasses", (): void => {
    test.each([
        {
            name: "canonical hostname with URL state",
            currentUrl: "https://ajatt.top/blog/guide.html?source=main#step",
            canonicalUrl: "https://ajatt.top/blog/guide.html",
            expectedUrl: null,
        },
        {
            name: "canonical hostname over HTTP",
            currentUrl: "http://ajatt.top/blog/guide.html",
            canonicalUrl: "https://ajatt.top/blog/guide.html",
            expectedUrl: null,
        },
        {
            name: "canonical hostname on a custom port",
            currentUrl: "https://ajatt.top:8443/blog/guide.html",
            canonicalUrl: "https://ajatt.top/blog/guide.html",
            expectedUrl: null,
        },
        {
            name: "localhost preview",
            currentUrl: "http://localhost:8000/blog/guide.html",
            canonicalUrl: "https://ajatt.top/blog/guide.html",
            expectedUrl: null,
        },
        {
            name: "localhost subdomain preview",
            currentUrl: "http://preview.localhost/blog/guide.html",
            canonicalUrl: "https://ajatt.top/blog/guide.html",
            expectedUrl: null,
        },
        {
            name: "IPv4 loopback preview",
            currentUrl: "http://127.0.0.1:8000/blog/guide.html",
            canonicalUrl: "https://ajatt.top/blog/guide.html",
            expectedUrl: null,
        },
        {
            name: "IPv6 loopback preview",
            currentUrl: "http://[::1]:8000/blog/guide.html",
            canonicalUrl: "https://ajatt.top/blog/guide.html",
            expectedUrl: null,
        },
        {
            name: "local file preview",
            currentUrl: "file:///tmp/blog/guide.html",
            canonicalUrl: "https://ajatt.top/blog/guide.html",
            expectedUrl: null,
        },
        {
            name: "page without a canonical link",
            currentUrl: "https://mirror.invalid/blog/guide.html",
            canonicalUrl: null,
            expectedUrl: null,
        },
    ] satisfies readonly RedirectCase[])("$name bypasses canonical redirect", assertRedirectCase);
});
