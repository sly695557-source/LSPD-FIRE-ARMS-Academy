console.log("LSPD SCRIPT LOADED");

function showPage(pageId) {

    var pages = document.querySelectorAll(".page-section");

    for (var i = 0; i < pages.length; i++) {
        pages[i].classList.remove("active");
    }

    var target = document.getElementById(pageId);

    if (target) {
        target.classList.add("active");
    }
}

window.showPage = showPage;


document.addEventListener("DOMContentLoaded", function () {

    var buttons = document.querySelectorAll("[data-page]");

    console.log("LSPD BUTTONS FOUND:", buttons.length);

    for (var i = 0; i < buttons.length; i++) {

        buttons[i].addEventListener("click", function () {

            var pageId = this.getAttribute("data-page");

            showPage(pageId);

        });

    }

    showPage("home");

});
```
