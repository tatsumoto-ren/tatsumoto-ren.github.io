/**
 *
 * @licstart  The following is the entire license notice for the
 *  JavaScript code in this page.
 *
 * Copyright (C) 2026  Ren Tatsumoto
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version. The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU GPL for more details.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */

/**
 * Redirect public mirror pages to their configured canonical domain.
 * @returns {void}
 */
(function canonicalRedirectModule() {
    "use strict";

    const IPV4_LOOPBACK_HOSTNAME_PATTERN = /^127(?:\.(?:25[0-5]|2[0-4]\d|1?\d?\d)){3}$/;

    /**
     * Return whether a hostname represents a local development server.
     * @param {string} hostname — hostname from the current page URL.
     * @returns {boolean} true for localhost and loopback hostnames.
     */
    function isLocalHostname(hostname) {
        return (
            hostname === "localhost" ||
            hostname.endsWith(".localhost") ||
            IPV4_LOOPBACK_HOSTNAME_PATTERN.test(hostname) ||
            hostname === "::1" ||
            hostname === "[::1]"
        );
    }

    /**
     * Redirect a public mirror page to the domain declared by its canonical link.
     * Preserve query parameters and fragments because this changes only the host,
     * while leaving local and file previews accessible. Pages already on the
     * canonical hostname are left to the server to normalize protocols and ports.
     * @returns {void}
     */
    function redirectToCanonicalDomain() {
        if (location.protocol === "file:" || isLocalHostname(location.hostname)) {
            return;
        }
        const canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!(canonicalLink instanceof HTMLLinkElement)) {
            return;
        }
        const canonicalUrl = new URL(canonicalLink.href);
        if (location.hostname === canonicalUrl.hostname) {
            return;
        }
        canonicalUrl.search = location.search;
        canonicalUrl.hash = location.hash;
        // Replace history so Back does not return to the mirror and redirect again.
        location.replace(canonicalUrl.href);
    }

    document.addEventListener("DOMContentLoaded", redirectToCanonicalDomain, false);
})();
