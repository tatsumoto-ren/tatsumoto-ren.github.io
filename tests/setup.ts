// Copyright: Ajatt-Tools and contributors; https://github.com/Ajatt-Tools
// License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html

import { afterEach, beforeEach, vi } from "vitest";

/**
 * Enable deterministic timers for browser scripts that debounce input.
 * @returns Nothing.
 */
function prepareTestEnvironment(): void {
    vi.useFakeTimers();
    // Preserve console output while recording calls for explicit error-path assertions.
    vi.spyOn(console, "error");
}

/**
 * Restore process-wide test doubles so each test starts independently.
 * @returns Nothing.
 */
function restoreTestEnvironment(): void {
    vi.useRealTimers();
    vi.restoreAllMocks();
}

beforeEach(prepareTestEnvironment);
afterEach(restoreTestEnvironment);
