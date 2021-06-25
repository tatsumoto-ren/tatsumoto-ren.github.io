document.addEventListener('DOMContentLoaded', (event) => {
    let prev_scroll_pos = window.pageYOffset;

    function hide_menu_bar() {
        document.getElementById("headerholder").style.top = "-52px";
        document.getElementById("menu-btn").checked = false;
    }

    function show_menu_bar() {
        document.getElementById("headerholder").style.top = "0";
    }

    if (window.pageYOffset > 0) {
        hide_menu_bar()
    }

    window.onscroll = function () {
        const cur_scroll_pos = window.pageYOffset;
        if (prev_scroll_pos > cur_scroll_pos) {
            show_menu_bar()
        } else {
            hide_menu_bar()
        }
        prev_scroll_pos = cur_scroll_pos;
    }
});
