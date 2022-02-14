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

const $ = (id) => {
    return document.getElementById(id);
}
const insertAfter = (newNode, existingNode) => {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

const Utils = Object.freeze({
    is_index() {
        const path = window.location.pathname;
        return (path.endsWith('index') || path.endsWith('index.html'))
    },
    filename() {
        return window.location.pathname.split('/').slice(-1).join('')
    },
    is_tags_page() {
        return this.filename().startsWith('tag_')
    },
    query_headers(parent) {
        const headers = parent.querySelectorAll(':is(h1, h2, h3, h4, h5, h6)')
        const parsed = []
        for (const header of headers) {
            parsed.push(
                {
                    id: header.id,
                    level: parseInt(/\d$/.exec(header.tagName).join()),
                    text: header.innerText,
                }
            )
        }
        return parsed
    },
    maybe_toggle_attr(item, attribute, force) {
        if (item !== undefined) {
            if (force !== undefined) {
                item.toggleAttribute(attribute, force)
            } else {
                item.toggleAttribute(attribute)
            }
        }
    },
})

const Sidebar = Object.freeze({
    id: 'sidebar',
    btn_id: 'show_sidebar_button',
    open_inline_svg: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32.055 32.055" xml:space="preserve"><path d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967 C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967 s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967 c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z"/></svg>`,
    up_inline_svg: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve"><path d="M64.8,554.8l102.8-102.9l259.7,259.8V10h145.4v701.7l259.7-259.8l102.8,102.9L500.1,990L64.8,554.8z"/></svg>`,
    make_sidebar_header() {
        return [
            `<div class="sidebar_header">`,
            `<a href="table-of-contents.html" class="to_toc" title="Open Table of Contents">Table of Contents</a>`,
            `<a href="#" onclick="Sidebar.close()" class="jump_top_button" title="Go to top">${this.up_inline_svg}</a>`,
            `<a href="javascript:void(0)" onclick="Sidebar.close()" class="close_button" title="Close">×</a>`,
            `</div>`
        ].join('');
    },
    make_list(headers) {
        let prev_level = 0
        let list = ''

        list += headers.map(
            (header) => {
                let part = ''
                part += function () {
                    if (header.level > prev_level) {
                        return "<ol>".repeat(header.level - prev_level)
                    } else if (header.level < prev_level) {
                        return "</ol>".repeat(prev_level - header.level)
                    } else {
                        return ''
                    }
                }();
                prev_level = header.level
                part += `<li><a href="#${header.id}" onclick="Sidebar.close()">${header.text}</a></li>`
                return part
            }
        ).join('')
        list += prev_level ? "</ol>".repeat(prev_level) : ''

        return list
    },
    make_open_button() {
        const btn = document.createElement('button')
        btn.onclick = this.toggle.bind(this)
        btn.id = this.btn_id
        btn.title = "Open sidebar"
        btn.innerHTML = this.open_inline_svg
        return btn
    },
    create(headers) {
        const div = document.createElement('div')
        div.id = this.id
        div.innerHTML = this.make_sidebar_header() + this.make_list(headers)
        return div
    },
    close() {
        Utils.maybe_toggle_attr($(this.id), 'open', false)
        Utils.maybe_toggle_attr($(this.btn_id), 'open', false)
    },
    toggle() {
        Utils.maybe_toggle_attr($(this.id), 'open')
        Utils.maybe_toggle_attr($(this.btn_id), 'open')
        $('menu-btn').checked = false
    },
    init() {
        if (!Utils.is_index() && !Utils.is_tags_page()) {
            const headers = Utils.query_headers($('divbody')).filter(h => Boolean(h.id))
            if (headers.length > 0) {
                document.body.append(this.create(headers))
                document.querySelector('header>.logoholder').append(this.make_open_button())
                document.querySelector('label.menu').addEventListener('click', this.close.bind(this))
                $('divbody').addEventListener('click', this.close.bind(this))
            }
        }
    }
})

const Toc = Object.freeze({
    order: [
        "foreword.html",
        "introduction-to-learning-japanese.html",
        "how-to-type-in-japanese.html",
        "setting-up-anki.html",
        "useful-anki-add-ons-for-japanese.html",
        "discussing-various-card-templates.html",
        "japanese-fonts.html",
        "learning-kana-in-two-days.html",
        "learning-kanji.html",
        "jp1k-anki-deck.html",
        "basic-vocabulary.html",
        "setting-up-yomichan.html",
        "setting-up-qolibri.html",
        "yomichan-and-epwing-dictionaries.html",
        "one-target-sentences.html",
        "sentence-mining.html",
        "how-to-review.html",
        "our-immersion-learning-toolset.html",
        "mining-from-movies-and-tv-shows.html",
        "mining-from-manga.html",
        "passive-listening.html",
        "retiming-subtitles.html",
        "writing-japanese.html",
        "resources.html",
        "faq.html",
        "understanding-monolingual-definitions.html",
        "random-anime-ranked-easiest-to-hardest.html",
        "ankidrone-sentence-pack.html",
        "join-our-community.html",
        "donating-to-tatsumoto.html",
    ],
    make_link(to, next) {
        const a = document.createElement('a')
        a.href = to
        a.className = next ? "md-button next" : "md-button prev"
        a.innerText = next ? "Next" : "Previous"
        return a
    },
    make_nav_container() {
        const div = document.createElement("div")
        div.className = "toc_navigation"
        return div
    },
    link_adjacent() {
        const i = this.order.indexOf(Utils.filename())
        const outer = document.querySelector('div#divbody')
        if (i >= 0 && outer) {
            const container = outer.appendChild(this.make_nav_container())
            const [prev, next] = [this.order[i - 1], this.order[i + 1]]
            if (prev !== undefined) {
                container.appendChild(this.make_link(prev, false))
            }
            if (next !== undefined) {
                container.appendChild(this.make_link(next, true))
            }
        }
    }
})

const MegaTags = Object.freeze({
    make_tag() {
        const mega_tag = document.createElement('a')
        mega_tag.target = "_blank"
        mega_tag.title = "Use megatools"
        mega_tag.style = "margin-left: 4px;"
        mega_tag.href = "https://aur.archlinux.org/packages/megatools"
        mega_tag.innerHTML = '<img alt="mega" style="vertical-align: -0.125em; height: 1em;" src="https://avatars.githubusercontent.com/u/4920706?s=200&v=4">'
        return mega_tag
    },
    mark_links() {
        const anchors = document.querySelectorAll('article a')
        for (const anchor of anchors) {
            if (anchor.href.startsWith('https://mega.nz/')) {
                insertAfter(this.make_tag(), anchor)
            }
        }
    }
})

/* Entry point */

document.addEventListener('DOMContentLoaded', () => {
    Sidebar.init()
    Toc.link_adjacent()
    MegaTags.mark_links()
}, false)
