```javascript
console.log("LSPD SCRIPT LOADED");

function showPage(pageId) {

    var pages = document.querySelectorAll(".page-section");

    pages.forEach(function (page) {
        page.classList.remove("active");
    });

    var target = document.getElementById(pageId);

    if (target) {
        target.classList.add("active");
        window.scrollTo(0, 0);
    }

}

window.showPage = showPage;


document.addEventListener("DOMContentLoaded", function () {

    var buttons = document.querySelectorAll("[data-page]");

    console.log(
        "LSPD BUTTONS FOUND:",
        buttons.length
    );

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            var page =
                button.getAttribute("data-page");

            showPage(page);

        });

    });

    showPage("home");

});
```
