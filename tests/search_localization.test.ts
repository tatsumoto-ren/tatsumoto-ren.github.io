// Copyright: Ajatt-Tools and contributors; https://github.com/Ajatt-Tools
// License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html

import { describe, expect, test, vi } from "vitest";

import { bootSearch, deferred, makeEntry, typeQuery } from "./helpers.ts";

const russianMessages = Object.freeze({
    "loading-message": "Загрузка поискового индекса...",
    "no-results-message": "Ничего не найдено.",
    "misconfigured-message": "Поиск настроен неправильно.",
    "failed-message": "Не удалось загрузить поисковый индекс.",
    "results-message": "Результатов: {count}",
    "showing-first": "(показаны первые {count})",
});

type SettledState = "empty" | "failed" | "misconfigured";

/**
 * Assert one localized search state that settles during fixture initialization.
 * @param state - Search state to initialize.
 * @param expected - Expected localized status text.
 * @returns A promise that resolves after the assertion completes.
 */
async function assertLocalizedState(state: SettledState, expected: string): Promise<void> {
    const fixture = await bootSearch({
        messages: russianMessages,
        ...(state === "empty" ? { index: [] } : {}),
        ...(state === "misconfigured" ? { withIndexUrl: false } : {}),
        ...(state === "failed"
            ? { fetchImpl: vi.fn(() => Promise.resolve({ ok: false, status: 500, statusText: "Server Error" })) }
            : {}),
    });
    if (state === "empty") {
        await typeQuery(fixture.input as HTMLInputElement, "search");
    }
    expect(fixture.status?.textContent).toBe(expected);
}

describe("localized search result formatting", (): void => {
    test.each([
        [1, "Результатов: 1"],
        [21, "Результатов: 21"],
        [101, "Результатов: 101 (показаны первые 100)"],
    ])("formats %i Russian search results", async (count: number, expected: string): Promise<void> => {
        const index = Array.from({ length: count }, (_value: undefined, number: number) =>
            makeEntry({ title: `Search ${number}` }),
        );
        const { input, status } = await bootSearch({ index, messages: russianMessages });

        await typeQuery(input as HTMLInputElement, "search");

        expect(status?.textContent).toBe(expected);
    });
});

describe("localized search states", (): void => {
    test.each([
        ["empty", "Ничего не найдено."],
        ["misconfigured", "Поиск настроен неправильно."],
        ["failed", "Не удалось загрузить поисковый индекс."],
    ] satisfies ReadonlyArray<readonly [SettledState, string]>)("localizes the %s state", assertLocalizedState);

    test("localizes loading and settles its pending request", async (): Promise<void> => {
        const pendingIndex = deferred<unknown>();
        const loading = await bootSearch({
            messages: russianMessages,
            fetchImpl: vi.fn(() => pendingIndex.promise),
            waitForLoad: false,
        });
        await typeQuery(loading.input as HTMLInputElement, "search");
        expect(loading.status?.textContent).toBe("Загрузка поискового индекса...");

        pendingIndex.resolve({ ok: true, json: () => Promise.resolve([makeEntry()]) });
        await vi.waitFor(() => expect(loading.status?.textContent).toBe("Результатов: 1"));
    });
});
