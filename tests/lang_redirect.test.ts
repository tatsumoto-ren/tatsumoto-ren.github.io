// Copyright: Ajatt-Tools and contributors; https://github.com/Ajatt-Tools
// License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

import { JSDOM } from "jsdom";
import { describe, expect, test } from "vitest";

import { closeDomAfterTest, evaluateBrowserScript, loadScript } from "./helpers.ts";

const redirectScript = loadScript("res/lang-redirect.js");
type LanguageOption = Readonly<{
    language: string;
    url: string;
}>;

type ChangeListener = (event: Readonly<{ currentTarget: LanguageSelectorElement }>) => void;
type StorageLike = Readonly<{
    getItem: (key: string) => string | null;
    setItem: (key: string, value: string) => void;
}>;
type ControlledLocation = { href: string; replace: (url: string) => void };
type RedirectContext = Readonly<{
    console: Console;
    document: Readonly<{
        documentElement: Readonly<{ lang: string }>;
        addEventListener: (type: "DOMContentLoaded", listener: () => void, options?: boolean) => void;
        querySelector: (selector: ".lang-switch") => LanguageSelectorElement;
    }>;
    HTMLSelectElement: typeof LanguageSelectorElement;
    location: ControlledLocation;
    navigator: Readonly<{ language: string }>;
    sessionStorage: StorageLike;
}>;
type RedirectOptions = Readonly<{
    pageLanguage: string;
    browserLanguage: string;
    chosenLanguage: string | null;
    defaultLanguage: string | null;
    storageReadable: boolean;
    storageWritable: boolean;
    languageOptions: readonly LanguageOption[];
}>;
type RedirectExecution = Readonly<{
    location: ControlledLocation;
    replacedUrls: readonly string[];
    selector: LanguageSelectorElement;
    operations: readonly string[];
    domReadyRegistrations: number;
}>;
type RedirectCase = Readonly<{
    description: string;
    options: Partial<RedirectOptions>;
    expectedUrl: string | null;
    expectedOperations: readonly string[];
}>;
type GeneratedLandingCase = Readonly<{
    fileName: string;
    pageLanguage: string;
}>;

const defaultLanguageOptions: readonly LanguageOption[] = [
    { language: "en", url: "index.html" },
    { language: "ru", url: "ru.html" },
];

/**
 * Return a landing-page document with a language selector.
 * @param pageLanguage - Language declared by the page.
 * @param languageOptions - Selector language and URL mappings.
 * @returns Landing-page HTML markup.
 */
function landingMarkup(
    pageLanguage: string,
    languageOptions: readonly LanguageOption[] = defaultLanguageOptions,
): string {
    const options = languageOptions
        .map(option => `<option value="${option.url}" data-prefers-language="${option.language}"></option>`)
        .join("");
    return `<html lang="${pageLanguage}"><body><select class="lang-switch" data-default-language="en"><option value=""></option>${options}</select></body></html>`;
}

/**
 * Create and initialize a registered landing-page DOM fixture.
 * @param pageLanguage - Language declared by the page.
 * @param browserLanguage - Language exposed by the browser.
 * @returns The initialized DOM fixture.
 */
async function loadLandingPage(pageLanguage: string, browserLanguage: string): Promise<JSDOM> {
    const dom = closeDomAfterTest(
        new JSDOM(landingMarkup(pageLanguage, [{ language: "ru", url: "#ru" }]), {
            runScripts: "outside-only",
            url: "https://example.test/index.html",
        }),
    );
    Object.defineProperty(dom.window.navigator, "language", { configurable: true, value: browserLanguage });
    await evaluateBrowserScript(dom.window, redirectScript);
    return dom;
}

/** Provide selector behavior required by the redirect script's automatic path. */
class LanguageSelectorElement {
    readonly options: ReadonlyArray<Readonly<{ dataset: Readonly<{ prefersLanguage: string }>; value: string }>>;
    readonly dataset: Readonly<{ defaultLanguage?: string }>;
    value = "";
    listenerRegistrations = 0;
    private changeListener: ChangeListener | undefined;

    /**
     * Create selector options and the configured fallback language.
     * @param languageOptions - Selector language and URL mappings.
     * @param defaultLanguage - Configured fallback language, or null when absent.
     */
    constructor(languageOptions: readonly LanguageOption[], defaultLanguage: string | null) {
        this.options = languageOptions.map(({ language, url }) => ({
            dataset: { prefersLanguage: language },
            value: url,
        }));
        this.dataset = defaultLanguage === null ? {} : { defaultLanguage };
    }

    /**
     * Register the selector's change listener.
     * @param type - Event type accepted by the selector.
     * @param listener - Change listener to register.
     * @param _options - Optional browser listener settings.
     * @returns Nothing.
     */
    addEventListener(type: "change", listener: ChangeListener, _options?: boolean | AddEventListenerOptions): void {
        if (type === "change") {
            this.listenerRegistrations += 1;
            this.changeListener = listener;
        }
    }

    /**
     * Invoke the registered change listener with this selector as the current target.
     * @returns Nothing.
     */
    dispatchChange(): void {
        this.changeListener?.({ currentTarget: this });
    }
}

/**
 * Return controlled session storage that records successful writes.
 * @param options - Storage behavior configuration.
 * @param operations - Destination for ordered storage and navigation effects.
 * @returns Controlled storage used by the browser-like VM context.
 */
function controlledStorage(options: RedirectOptions, operations: string[]): StorageLike {
    return {
        getItem: () => {
            if (!options.storageReadable) {
                throw new Error("storage unavailable");
            }
            return options.chosenLanguage;
        },
        setItem: (key: string, value: string) => {
            if (!options.storageWritable) {
                throw new Error("storage unavailable");
            }
            operations.push(`store:${key}=${value}`);
        },
    };
}

/**
 * Return controlled browser globals used by the redirect script.
 * @param options - Redirect fixture configuration.
 * @param selector - Controlled language selector.
 * @param location - Controlled browser location.
 * @param operations - Destination for ordered storage and navigation effects.
 * @param domReadyListeners - Destination for DOM-ready listeners.
 * @returns A precise browser-like VM context.
 */
function redirectContext(
    options: RedirectOptions,
    selector: LanguageSelectorElement,
    location: ControlledLocation,
    operations: string[],
    domReadyListeners: Array<() => void>,
): RedirectContext {
    return {
        console,
        document: {
            documentElement: { lang: options.pageLanguage },
            addEventListener: (_type: "DOMContentLoaded", listener: () => void, _options?: boolean) =>
                domReadyListeners.push(listener),
            querySelector: (_selector: ".lang-switch") => selector,
        },
        HTMLSelectElement: LanguageSelectorElement,
        location,
        navigator: { language: options.browserLanguage },
        sessionStorage: controlledStorage(options, operations),
    };
}

/**
 * Execute the redirect script once with controlled browser globals.
 * @param options - Redirect fixture configuration.
 * @returns Observable redirect-script effects.
 */
function executeRedirect(options: RedirectOptions): RedirectExecution {
    const selector = new LanguageSelectorElement(options.languageOptions, options.defaultLanguage);
    const replacedUrls: string[] = [];
    const operations: string[] = [];
    const domReadyListeners: Array<() => void> = [];
    const location = {
        href: "https://example.test/index.html?source=test#old",
        replace: (url: string): void => {
            replacedUrls.push(url);
            operations.push(`replace:${url}`);
        },
    };
    vm.runInNewContext(
        redirectScript.source,
        redirectContext(options, selector, location, operations, domReadyListeners),
        { filename: redirectScript.filePath },
    );
    domReadyListeners[0]?.();
    return { location, replacedUrls, selector, operations, domReadyRegistrations: domReadyListeners.length };
}

/**
 * Run the automatic redirect path with controlled browser globals.
 * @param options - Partial redirect configuration overrides.
 * @returns Observable redirect-script effects.
 */
function automaticRedirect(options: Partial<RedirectOptions> = {}): RedirectExecution {
    return executeRedirect({
        pageLanguage: "en",
        browserLanguage: "ru-RU",
        chosenLanguage: null,
        defaultLanguage: "en",
        storageReadable: true,
        storageWritable: true,
        languageOptions: defaultLanguageOptions,
        ...options,
    });
}

/**
 * Assert the automatic redirect result for one browser and storage configuration.
 * @param scenario - Named redirect inputs and expected observable effects.
 * @returns Nothing.
 */
function assertAutomaticRedirect({ options, expectedUrl, expectedOperations }: RedirectCase): void {
    const execution = automaticRedirect(options);
    expect(execution.replacedUrls).toEqual(expectedUrl === null ? [] : [expectedUrl]);
    expect(execution.operations).toEqual(expectedOperations);
    expect(execution.location.href).toBe("https://example.test/index.html?source=test#old");
}

/**
 * Parse and assert one generated landing page's language-switch integration.
 * @param scenario - Generated file and expected page language.
 * @returns Nothing.
 */
function assertGeneratedLandingPage({ fileName, pageLanguage }: GeneratedLandingCase): void {
    const filePath = path.join(import.meta.dirname, "..", fileName);
    const dom = closeDomAfterTest(new JSDOM(fs.readFileSync(filePath, "utf8")));
    const selector = dom.window.document.querySelector(".lang-switch") as HTMLSelectElement | null;
    const options = [...(selector?.options ?? [])]
        .filter(option => option.dataset.prefersLanguage)
        .map(option => ({ language: option.dataset.prefersLanguage, url: option.value }));
    expect(dom.window.document.documentElement.lang).toBe(pageLanguage);
    expect(dom.window.document.querySelector('script[src="res/lang-redirect.js"]')).not.toBeNull();
    expect(selector?.dataset.defaultLanguage).toBe("en");
    expect(options).toEqual(defaultLanguageOptions);
}

describe("language redirect DOM startup", (): void => {
    test("does nothing when the page has no language selector", async (): Promise<void> => {
        const dom = closeDomAfterTest(
            new JSDOM('<html lang="en"><body></body></html>', { runScripts: "outside-only" }),
        );

        await expect(evaluateBrowserScript(dom.window, redirectScript)).resolves.toBeUndefined();
    });

    test("does nothing when the language switch is not a select element", async (): Promise<void> => {
        const dom = closeDomAfterTest(
            new JSDOM('<html lang="en"><body><div class="lang-switch"></div></body></html>', {
                runScripts: "outside-only",
            }),
        );

        await expect(evaluateBrowserScript(dom.window, redirectScript)).resolves.toBeUndefined();
    });

    test("does not navigate for an empty manual selection", async (): Promise<void> => {
        const dom = await loadLandingPage("en", "en-US");
        const select = dom.window.document.querySelector(".lang-switch") as HTMLSelectElement;
        select.value = "";
        select.dispatchEvent(new dom.window.Event("change", { bubbles: true }));

        expect(dom.window.location.hash).toBe("");
        expect(dom.window.sessionStorage.getItem("lang-chosen")).toBeNull();
    });
});

describe("manual language selection", (): void => {
    test("stores the choice and assigns the exact bare URL without replacement", (): void => {
        const execution = automaticRedirect({ browserLanguage: "en-US" });
        execution.selector.value = "ru.html";
        execution.selector.dispatchChange();

        expect(execution.operations).toEqual(["store:lang-chosen=1"]);
        expect(execution.location.href).toBe("ru.html");
        expect(execution.replacedUrls).toEqual([]);
        expect(execution.selector.listenerRegistrations).toBe(1);
        expect(execution.domReadyRegistrations).toBe(1);
    });
});

describe("manual selection without storage", (): void => {
    test("does not throw when session storage is unavailable", async (): Promise<void> => {
        const dom = await loadLandingPage("en", "en-US");
        Object.defineProperty(dom.window, "sessionStorage", {
            configurable: true,
            get: () => {
                throw new dom.window.DOMException("blocked", "SecurityError");
            },
        });
        const select = dom.window.document.querySelector(".lang-switch") as HTMLSelectElement;

        expect(() => {
            select.value = "#ru";
            select.dispatchEvent(new dom.window.Event("change", { bubbles: true }));
        }).not.toThrow();
        expect(dom.window.location.hash).toBe("#ru");
    });
});

describe("automatic language choice", (): void => {
    test.each([
        {
            description: "regional browser language uses its supported base language",
            options: { browserLanguage: "ru-RU" },
            expectedUrl: "ru.html",
            expectedOperations: ["store:lang-chosen=1", "replace:ru.html"],
        },
        {
            description: "an explicit non-default page suppresses automatic switching",
            options: { pageLanguage: "ru", browserLanguage: "en-US" },
            expectedUrl: null,
            expectedOperations: [],
        },
        {
            description: "a stored choice suppresses automatic switching",
            options: { chosenLanguage: "1" },
            expectedUrl: null,
            expectedOperations: [],
        },
        {
            description: "a storage read failure suppresses automatic switching",
            options: { storageReadable: false },
            expectedUrl: null,
            expectedOperations: [],
        },
        {
            description: "a storage write failure suppresses automatic switching",
            options: { storageWritable: false },
            expectedUrl: null,
            expectedOperations: [],
        },
        {
            description: "an exact locale wins over a competing base locale",
            options: {
                browserLanguage: "pt-BR",
                languageOptions: [
                    ...defaultLanguageOptions,
                    { language: "pt", url: "pt.html" },
                    { language: "pt-br", url: "pt-br.html" },
                ],
            },
            expectedUrl: "pt-br.html",
            expectedOperations: ["store:lang-chosen=1", "replace:pt-br.html"],
        },
        {
            description: "underscore locale declarations are normalized",
            options: {
                browserLanguage: "pt_BR",
                languageOptions: [...defaultLanguageOptions, { language: "pt_BR", url: "pt-br.html" }],
            },
            expectedUrl: "pt-br.html",
            expectedOperations: ["store:lang-chosen=1", "replace:pt-br.html"],
        },
        {
            description: "an unsupported browser language falls back to the current default page",
            options: { browserLanguage: "de-DE" },
            expectedUrl: null,
            expectedOperations: [],
        },
        {
            description: "malformed options are ignored",
            options: {
                browserLanguage: "ru-RU",
                languageOptions: [
                    { language: "en", url: "index.html" },
                    { language: "ru", url: "" },
                    { language: "", url: "ru.html" },
                ],
            },
            expectedUrl: null,
            expectedOperations: [],
        },
        {
            description: "a missing default language suppresses automatic switching",
            options: { defaultLanguage: null },
            expectedUrl: null,
            expectedOperations: [],
        },
    ] satisfies readonly RedirectCase[])("$description", assertAutomaticRedirect);
});

describe("automatic redirect storage", (): void => {
    test.each([
        ["read", false, true, "Language redirect: unable to read the language choice."],
        ["write", true, false, "Language redirect: unable to store the language choice."],
    ])("reports a %s storage failure", (_, storageReadable, storageWritable, message): void => {
        automaticRedirect({ storageReadable, storageWritable });

        expect(console.error).toHaveBeenCalledWith(message, expect.any(Error));
    });
});

describe("generated landing page integration", (): void => {
    test.each([
        { fileName: "index.html", pageLanguage: "en" },
        { fileName: "ru.html", pageLanguage: "ru" },
    ] satisfies readonly GeneratedLandingCase[])("configures $fileName", assertGeneratedLandingPage);
});
