/**
 *
 * @licstart  The following is the entire license notice for the
 *  JavaScript code in this page.
 *
 * Copyright (C) 2021  Ren Tatsumoto
 *
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */

/**
 * Auto-redirect visitors to the landing page matching their browser language.
 * sessionStorage prevents redirect loops after a manual switch. If storage is
 * unavailable, automatic redirects are disabled so manual switching still works.
 * @returns {void}
 */
(function languageRedirectModule() {
    "use strict";

    const LANGUAGE_CHOSEN_KEY = "lang-chosen";

    /**
     * Return whether a language choice is stored.
     * @returns {boolean|null} choice state, or null when reading fails.
     */
    function languageWasChosen() {
        try {
            return sessionStorage.getItem(LANGUAGE_CHOSEN_KEY) !== null;
        } catch (error) {
            console.error("Language redirect: unable to read the language choice.", error);
            return null;
        }
    }

    /**
     * Store the visitor's language choice.
     * @returns {boolean} true when the choice was stored.
     */
    function rememberLanguageChoice() {
        try {
            sessionStorage.setItem(LANGUAGE_CHOSEN_KEY, "1");
            return true;
        } catch (error) {
            console.error("Language redirect: unable to store the language choice.", error);
            return false;
        }
    }

    /**
     * Return every language code and landing-page URL declared by the selector.
     * @param {HTMLSelectElement} langSelectorElement — language selector containing mapped options.
     * @returns {Map<string, string>} supported language codes and their URLs.
     */
    function readAvailableLanguages(langSelectorElement) {
        // The selector is the source of truth, so adding a language needs no routing change here.
        return new Map(
            [...langSelectorElement.options]
                .filter(option => option.dataset.prefersLanguage && option.value)
                .map(option => [normalizeLanguageCode(option.dataset.prefersLanguage), option.value]),
        );
    }

    /**
     * Normalize a BCP-47 language code for matching selector option attributes.
     * @param {string} language — browser or page language code.
     * @returns {string} lowercase code with underscores converted to hyphens.
     */
    function normalizeLanguageCode(language) {
        return language.toLowerCase().replaceAll("_", "-");
    }

    /**
     * Return the most specific supported language code, or the configured default.
     * @param {string} browserLanguage — browser-preferred language code.
     * @param {Map<string, string>} availableLanguages — supported language codes and URLs.
     * @param {string} defaultLanguage — fallback language code from the selector.
     * @returns {string|undefined} supported language code, if one is available.
     */
    function preferredLanguageCode(browserLanguage, availableLanguages, defaultLanguage) {
        return [browserLanguage, browserLanguage.split("-", 1)[0], defaultLanguage].find(language => {
            return availableLanguages.has(language);
        });
    }

    /**
     * Return the alternate landing-page URL for the browser-preferred language.
     * @param {string} pageLanguage — language of the current landing page.
     * @param {string} browserLanguage — browser-preferred language code.
     * @param {Map<string, string>} availableLanguages — supported language codes and URLs.
     * @param {string} defaultLanguage — fallback language code from the selector.
     * @returns {string|null} alternate page URL, or null when no redirect is needed.
     */
    function preferredLanguageUrl(pageLanguage, browserLanguage, availableLanguages, defaultLanguage) {
        const normalizedPageLanguage = normalizeLanguageCode(pageLanguage);
        // A non-default landing URL is an explicit language choice, even without storage.
        if (normalizedPageLanguage !== defaultLanguage) {
            return null;
        }
        const language = preferredLanguageCode(browserLanguage, availableLanguages, defaultLanguage);
        if (!language || language === normalizedPageLanguage) {
            return null;
        }
        // readAvailableLanguages only inserts non-empty URLs, and `language`
        // was selected from this map, so the lookup is guaranteed to succeed.
        return availableLanguages.get(language);
    }

    /**
     * Redirect to the browser-preferred landing page only when loop prevention works.
     * @param {HTMLSelectElement} langSelectorElement — language selector containing mapped options.
     * @returns {void}
     */
    function redirectToPreferredLanguage(langSelectorElement) {
        if (languageWasChosen() !== false) {
            return;
        }
        const target = preferredLanguageUrl(
            document.documentElement.lang,
            normalizeLanguageCode(navigator.language ?? ""),
            readAvailableLanguages(langSelectorElement),
            normalizeLanguageCode(langSelectorElement.dataset.defaultLanguage ?? ""),
        );
        if (target && rememberLanguageChoice()) {
            // Automatic redirects must not leave an unwanted history entry.
            location.replace(target);
        }
    }

    /**
     * Navigate after a visitor explicitly selects another landing-page language.
     * @param {Event} event — select element change event.
     * @returns {void}
     */
    function switchLanguage(event) {
        const select = event.currentTarget;
        if (!(select instanceof HTMLSelectElement) || !select.value) {
            return;
        }
        rememberLanguageChoice();
        // Manual choices retain history so Back returns to the previous language.
        // Navigate to the bare configured URL rather than carrying unrelated URL state.
        location.href = select.value;
    }

    /**
     * Register manual language switching.
     * @param {HTMLSelectElement} langSelectorElement — language selector containing mapped options.
     * @returns {void}
     */
    function registerLanguageSwitch(langSelectorElement) {
        langSelectorElement.addEventListener("change", switchLanguage);
    }

    /**
     * Initialize manual switching and safe automatic language redirection.
     * @returns {void}
     */
    function init() {
        const langSelectorElement = document.querySelector(".lang-switch");
        if (!(langSelectorElement instanceof HTMLSelectElement)) {
            return;
        }
        registerLanguageSwitch(langSelectorElement);
        redirectToPreferredLanguage(langSelectorElement);
    }

    document.addEventListener("DOMContentLoaded", init, false);
})();
