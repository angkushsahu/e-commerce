const getClass = className => document.getElementsByClassName(className)[0];

const hamburgerOpen = getClass("hamburger_open");
const hamburgerClose = getClass("hamburger_close");
const nav = getClass("nav");
const mainBodyTitle = getClass("main_body__title");

hamburgerOpen.style.display = "flex";
hamburgerClose.style.display = "none";

hamburgerOpen.addEventListener("click", function() {
    hamburgerOpen.style.display = "none";
    hamburgerClose.style.display = "flex";
    nav.classList.add("right");
    mainBodyTitle.classList.add("push_down");
});

hamburgerClose.addEventListener("click", function() {
    hamburgerOpen.style.display = "flex";
    hamburgerClose.style.display = "none";
    nav.classList.remove("right");
    mainBodyTitle.classList.remove("push_down");
});