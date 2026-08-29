```javascript id="k2q7mt"
(function () {

    "use strict";


    // ==========================================
    // PAGE NAVIGATION
    // ==========================================

    function showPage(pageId) {

        var pages =
            document.querySelectorAll(".page-section");

        pages.forEach(function (page) {

            page.classList.remove("active");

        });


        var target =
            document.getElementById(pageId);


        if (!target) {

            console.error(
                "Page not found:",
                pageId
            );

            return;

        }


        target.classList.add("active");

        window.scrollTo(0, 0);

    }


    // ==========================================
    // NAVIGATION BUTTONS
    // ==========================================

    function setupNavigation() {

        var buttons =
            document.querySelectorAll("[data-page]");


        buttons.forEach(function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    var pageId =
                        button.getAttribute("data-page");


                    if (pageId) {

                        showPage(pageId);

                    }

                }
            );

        });

    }


    // ==========================================
    // HANDBOOK ACCORDION
    // ==========================================

    function setupHandbook() {

        var cards =
            document.querySelectorAll(
                ".handbook-card"
            );


        cards.forEach(function (card) {

            var title =
                card.querySelector("h3");

            var content =
                card.querySelector(
                    ".handbook-content"
                );


            if (!title || !content) {

                return;

            }


            content.style.display = "none";

            title.style.cursor = "pointer";


            title.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    if (
                        content.style.display ===
                        "block"
                    ) {

                        content.style.display =
                            "none";

                    } else {

                        content.style.display =
                            "block";

                    }

                }
            );

        });

    }


    // ==========================================
    // CIVILIAN FORM
    // ==========================================

    function setupCivilian() {

        var button =
            document.getElementById(
                "civilianSubmit"
            );


        if (!button) {

            return;

        }


        button.addEventListener(
            "click",
            function () {

                var name =
                    document.getElementById(
                        "civilianName"
                    );


                var result =
                    document.getElementById(
                        "civilianResult"
                    );


                if (!result) {

                    return;

                }


                if (
                    !name ||
                    !name.value.trim()
                ) {

                    result.className =
                        "result-box show danger";

                    result.textContent =
                        "لطفاً نام متقاضی را وارد کنید.";

                    return;

                }


                result.className =
                    "result-box show success";

                result.textContent =
                    "فرم با موفقیت آماده شد.";

            }
        );

    }


    // ==========================================
    // START
    // ==========================================

    function start() {

        console.log(
            "LSPD Academy JavaScript loaded."
        );


        setupNavigation();

        setupHandbook();

        setupCivilian();


        showPage("home");

    }


    // ==========================================
    // DOM READY
    // ==========================================

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            start
        );

    } else {

        start();

    }


})();
```
