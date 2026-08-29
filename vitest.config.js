// Copyright: Ajatt-Tools and contributors; https://github.com/Ajatt-Tools
// License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html

import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        // Tests create isolated JSDOM instances with controlled URLs and browser APIs.
        environment: "node",
        include: ["tests/**/*.test.ts"],
        setupFiles: ["tests/setup.ts"],
        coverage: {
            provider: "v8",
            include: ["blog/res/**/*.js", "res/**/*.js"],
            // Coverage is diagnostic; do not turn the current legacy baseline into a required threshold.
            reporter: ["text"],
        },
    },
});
