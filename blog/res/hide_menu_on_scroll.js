var prevScrollpos = window.pageYOffset;
function hideMenuBar() {
    document.getElementById("headerholder").style.top = "-52px";
    document.getElementById("menu-btn").checked = false;
}
function showMenuBar() {
    document.getElementById("headerholder").style.top = "0";
}
window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        showMenuBar()
    } else {
        hideMenuBar()
    }
    prevScrollpos = currentScrollPos;
}
document.addEventListener('DOMContentLoaded', (event) => {
    if (window.pageYOffset > 0) {
        hideMenuBar()
    }
});
