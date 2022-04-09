document.addEventListener("DOMContentLoaded", function() {
    const menuBurger = document.getElementById("js-menuBurger"),
        menu = document.getElementById("js-menu");

    menuBurger.addEventListener("click", function() {
        menuBurger.classList.toggle("-open");
        menu.classList.toggle("-open");
    });
});
