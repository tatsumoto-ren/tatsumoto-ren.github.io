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

const $ = id => document.getElementById(id);

const insert_after = (new_node, existing_node) =>
    existing_node.parentNode.insertBefore(new_node, existing_node.nextSibling);

const is_external = anchor => anchor.host && anchor.host !== window.location.host;

const copy_to_clipboard = str => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(str);
    } else {
        return Promise.reject("The Clipboard API is not available.");
    }
};

const strip_ext = filename => filename.replace(/\.html$/gi, "");

const select_text = text_node => {
    const [range, sel] = [document.createRange(), window.getSelection()];
    range.selectNodeContents(text_node);
    sel.removeAllRanges();
    sel.addRange(range);
};

const create_copy_select_button = text_node => {
    return Object.assign(document.createElement("button"), {
        type: "button",
        className: "select_button",
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

const ReorderTags = Object.freeze({
    get_pos(element) {
        return element.getAttribute("position");
    },
    init() {
        if (Utils.is_tags()) {
            const main = document.querySelector("main");
            const articles = [...main.children];
            articles.sort((prev, next) => this.get_pos(prev) - this.get_pos(next));
            main.prepend(...articles.filter(element => this.get_pos(element) < 0));
            main.append(...articles.filter(element => this.get_pos(element) > 0));
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
    query_headers(parent) {
        const parsed = [];
        if (parent) {
            for (const header of parent.querySelectorAll(":is(h1, h2, h3, h4, h5, h6)")) {
                parsed.push({
                    id: header.id,
                    level: parseInt(/\d$/.exec(header.tagName).join()),
                    text: header.innerText,
                });
            }
        }
        return parsed;
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

const PageContents = Object.freeze({
    make_list(headers) {
        let prev_level = 0;
        let list = "";

        list += headers
            .map(header => {
                let part = "";
                part += (function () {
                    if (header.level > prev_level) {
                        return "<ol>".repeat(header.level - prev_level);
                    } else if (header.level < prev_level) {
                        return "</ol>".repeat(prev_level - header.level);
                    } else {
                        return "";
                    }
                })();
                prev_level = header.level;
                part += `<li><a href="#${header.id}" onclick="close_sidebar()">${header.text}</a></li>`;
                return part;
            })
            .join("");
        list += prev_level ? "</ol>".repeat(prev_level) : "";

        return list;
    },
    init() {
        const headers = Utils.query_headers($("divbody")).filter(h => Boolean(h.id));
        if (headers.length > 0) {
            $("sidebar").querySelector(".page-contents").innerHTML += this.make_list(headers);
        }
    },
});

const Toc = Object.freeze({
    link_regex: /\[(?<name>[^\]\[\)\(]+)\]\((?<path>[^\]\[\)\(]+)\)/g,
    make_link(to, next) {
        const a = document.createElement("a");
        a.href = to.groups.path;
        a.title = to.groups.name;
        a.className = next ? "md-button next" : "md-button prev";
        a.innerText = next ? "Next" : "Previous";
        return a;
    },
    make_nav_container() {
        const div = document.createElement("div");
        div.className = "toc_navigation";
        return div;
    },
    find_toc_path() {
        return window.location.hostname.endsWith("github.io")
            ? "https://raw.githubusercontent.com/tatsumoto-ren/tatsumoto-ren.github.io/main/blog/table-of-contents.md"
            : "table-of-contents.md";
    },
    init() {
        fetch(this.find_toc_path())
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error("Couldn't fetch table of contents.");
                }
            })
            .then(text => this.link_adjacent([...text.matchAll(this.link_regex)]))
            .catch(error => console.error(error));
    },
    link_adjacent(matches_list) {
        const outer = document.querySelector("div#divbody");
        if (outer.querySelector(".toc_navigation") === null) {
            const i = matches_list.findIndex(match => strip_ext(match.groups.path) === strip_ext(Utils.filename()));
            if (i >= 0 && outer) {
                const container = outer.appendChild(this.make_nav_container());
                const [prev, next] = [matches_list[i - 1], matches_list[i + 1]];
                if (prev !== undefined) {
                    container.appendChild(this.make_link(prev, false));
                }
                if (next !== undefined) {
                    container.appendChild(this.make_link(next, true));
                }
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
        mega_tag.href = "https://archlinux.org/packages/extra/x86_64/megatools/";
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

/* Entry point */

document.addEventListener(
    "DOMContentLoaded",
    () => {
        ThemePicker.init();
        PageContents.init();
        Toc.init();
        MegaTags.mark_links();
        open_all_external_links_in_a_new_tab();
        document.querySelectorAll("main pre").forEach(pre => pre.append(create_copy_select_button(pre)));
        ReorderTags.init();
        $("divbody")?.addEventListener("click", close_sidebar);
        make_images_expand_on_click();
    },
    false,
);
