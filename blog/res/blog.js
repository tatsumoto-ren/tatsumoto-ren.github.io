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

(function () {
    "use strict";

    const $ = id => document.getElementById(id);
    const strip_ext = filename => filename.replace(/\.html$/gi, "");

    const insert_after = (new_node, existing_node) => {
        return existing_node.parentNode.insertBefore(new_node, existing_node.nextSibling);
    };

    const is_external = anchor => {
        return anchor.host && anchor.host !== window.location.host;
    };

    const copy_to_clipboard = str => {
        if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(str);
        } else {
            return Promise.reject("The Clipboard API is not available.");
        }
    };

    const select_text = text_node => {
        const [range, sel] = [document.createRange(), window.getSelection()];
        range.selectNodeContents(text_node);
        sel.removeAllRanges();
        sel.addRange(range);
    };

    const create_code_select_button = text_node => {
        return Object.assign(document.createElement("button"), {
            type: "button",
            className: "code_select_button",
            value: "select",
            title: "Copy to clipboard",
            onclick: click => {
                copy_to_clipboard(text_node.innerText)
                    .then(() => {
                        click.target.setAttribute("status", "copied");
                    })
                    .catch(() => {
                        select_text(text_node);
                        click.target.setAttribute("status", "selected");
                    })
                    .finally(() => {
                        setTimeout(() => click.target.removeAttribute("status"), "800");
                    });
            },
        });
    };

    /**
     * Handles sorting of articles on tag_*.html pages.
     *
     * Tatsublog renders articles sorted by position (curated order).
     * This module adds client-side sort buttons so the user can re-sort
     * by date, title, or position without a page reload.
     *
     * Each <article> element carries `timestamp` and `position` attributes
     * set by the tag.html Jinja2 template.
     */
    const ReorderTags = Object.freeze({
        /**
         * Extract the numeric position attribute from an article element.
         * @param {HTMLElement} element — an <article> with a position attribute.
         * @returns {number} the position value.
         */
        getPosition(element) {
            return Number(element.getAttribute("position") || "0");
        },

        /**
         * Extract the numeric timestamp attribute from an article element.
         * @param {HTMLElement} element — an <article> with a timestamp attribute.
         * @returns {number} the Unix timestamp.
         */
        getTimestamp(element) {
            return Number(element.getAttribute("timestamp") || "0");
        },

        /**
         * Extract the title text from the first heading inside an article.
         * @param {HTMLElement} element — an <article> containing an h1/h2/h3.
         * @returns {string} the title text, lowercased for comparison.
         */
        getTitle(element) {
            const heading = element.querySelector("h1, h2, h3");
            return heading ? heading.textContent.toLowerCase() : "";
        },

        /**
         * Compare two articles by the given sort key.
         * @param {string} sortBy — one of "position", "date", "title".
         * @returns {function} comparator function for Array.sort().
         */
        articlesSortComparator(sortBy) {
            switch (sortBy) {
                case "date":
                    return (a, b) => this.getTimestamp(b) - this.getTimestamp(a);
                case "title":
                    return (a, b) => this.getTitle(a).localeCompare(this.getTitle(b));
                case "position":
                default:
                    return (a, b) => this.getPosition(a) - this.getPosition(b);
            }
        },

        /**
         * Sort articles in <main> by the given sort key and direction.
         * Inserts sorted articles after #tag-sort-bar using a moving cursor,
         * so that #all_posts stays at the bottom.
         * @param {string} sortBy — one of "position", "date", "title".
         * @param {boolean} reverse — if true, reverse the sort order.
         */
        sortArticles(sortBy, reverse) {
            const main = document.querySelector("main");
            if (!main) {
                return;
            }
            const articles = [...main.querySelectorAll("article")];
            const cmp = this.articlesSortComparator(sortBy);
            articles.sort(reverse ? (a, b) => cmp(b, a) : cmp);

            // Insert all sorted articles after #tag-sort-bar in one call.
            main.prepend(...articles);
        },

        /**
         * Set the active state on the clicked sort button and update its
         * direction arrow indicator.
         * @param {HTMLElement} activeButton — the button that was clicked.
         * @param {boolean} reverse — whether the sort is reversed.
         */
        setActiveButton(activeButton, reverse) {
            for (const btn of document.querySelectorAll(".tag-sort-btn")) {
                btn.toggleAttribute("active", btn === activeButton);
                btn.removeAttribute("data-direction");
            }
            activeButton.setAttribute("data-direction", reverse ? "asc" : "desc");
        },

        /**
         * Initialize sort buttons on tag pages. No-op on other pages.
         *
         * Tracks the current sort key and direction. Clicking the same
         * button again reverses the sort order.
         */
        init() {
            if (!Utils.is_tags()) {
                return;
            }
            let currentSort = "position";
            let reversed = false;

            for (const button of document.querySelectorAll(".tag-sort-btn")) {
                button.addEventListener("click", () => {
                    const sortBy = button.getAttribute("data-sort");
                    if (sortBy === currentSort) {
                        reversed = !reversed;
                    } else {
                        currentSort = sortBy;
                        reversed = false;
                    }
                    this.sortArticles(sortBy, reversed);
                    this.setActiveButton(button, reversed);
                });
            }
        },
    });

    const Utils = Object.freeze({
        filename() {
            return window.location.pathname.split("/").slice(-1).join("");
        },
        filename_noext() {
            return this.filename().split(".").slice(0, -1).join(".");
        },
        is_index() {
            return this.filename_noext() == "index";
        },
        is_tags() {
            return this.filename().startsWith("tag_");
        },
        maybe_toggle_attr(item, attribute, force) {
            if (item !== undefined) {
                if (force !== undefined) {
                    item.toggleAttribute(attribute, force);
                } else {
                    item.toggleAttribute(attribute);
                }
            }
        },
    });

    const MegaTags = Object.freeze({
        make_tag() {
            const mega_tag = document.createElement("a");
            mega_tag.classList.add("mega_link");
            mega_tag.target = "_blank";
            mega_tag.title = "Use megatools";
            mega_tag.href = "https://xff.cz/megatools/";
            mega_tag.innerHTML = "";
            return mega_tag;
        },
        mark_links() {
            document
                .querySelectorAll('article a[href^="https://mega.nz/"]')
                .forEach(anchor => insert_after(this.make_tag(), anchor));
        },
    });

    const ThemePicker = Object.freeze({
        key: "blog-theme",
        set_onclick_handlers() {
            document.querySelectorAll(`input[name="${this.key}"]`).forEach(input_element => {
                input_element.addEventListener("click", () => {
                    localStorage.setItem(this.key, input_element.id);
                    // fallback for no :has() support
                    document.documentElement.className = input_element.id;
                });
            });
        },
        restore_theme_on_load() {
            const user_selected_theme = localStorage.getItem(this.key) || "light";
            document.querySelector(`input[name="${this.key}"]#${user_selected_theme}`).checked = true;
            document.documentElement.className = user_selected_theme;
        },
        init() {
            this.restore_theme_on_load();
            this.set_onclick_handlers();
        },
    });

    function close_sidebar() {
        $("menu-btn").checked = false;
    }

    function make_images_expand_on_click() {
        document.querySelectorAll("article img:not(a>img)").forEach(img => {
            img.onclick = () => {
                window.open(img.src, "_blank", "Expanded image");
            };
            img.style.cursor = "pointer";
            img.title = "Click to open image in a new tab.";
            console.log(img.src, img.height, img.clientHeight, img.naturalHeight);
        });
    }

    function open_all_external_links_in_a_new_tab() {
        Array.from(document.getElementsByTagName("a"))
            .filter(is_external)
            .forEach(a => (a.target = "_blank"));
    }

    function remove_no_js_elements() {
        document.querySelectorAll(".no-js").forEach(el => el.classList.remove("no-js"));
        document.querySelectorAll(".no-js-msg").forEach(el => el.remove());
    }

    /* Entry point */

    document.addEventListener(
        "DOMContentLoaded",
        () => {
            remove_no_js_elements();
            ThemePicker.init();
            MegaTags.mark_links();
            open_all_external_links_in_a_new_tab();
            document.querySelectorAll("main pre").forEach(pre => pre.append(create_code_select_button(pre)));
            ReorderTags.init();
            $("divbody")?.addEventListener("click", close_sidebar);
            make_images_expand_on_click();
        },
        false,
    );
})();
