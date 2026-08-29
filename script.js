```javascript
// ==========================================================
// LSPD ACADEMY - NAVIGATION TEST / STABLE VERSION
// Firebase is NOT loaded here.
// ==========================================================

(function () {

    "use strict";

    console.log("LSPD script loaded.");

    // ------------------------------------------------------
    // PAGE SYSTEM
    // ------------------------------------------------------

    function showPage(pageId) {

        console.log("Opening page:", pageId);

        const pages =
            document.querySelectorAll(".page-section");

        pages.forEach(function (page) {
            page.classList.remove("active");
        });

        const target =
            document.getElementById(pageId);

        if (!target) {

            console.error(
                "Page not found:",
                pageId
            );

            return;
        }

        target.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    // ------------------------------------------------------
    // NAVIGATION
    // ------------------------------------------------------

    function setupNavigation() {

        const buttons =
            document.querySelectorAll("[data-page]");

        console.log(
            "Navigation buttons found:",
            buttons.length
        );


        buttons.forEach(function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();
                    event.stopPropagation();

                    const pageId =
                        button.getAttribute("data-page");

                    if (!pageId) {
                        return;
                    }

                    showPage(pageId);

                },
                false
            );

        });

    }


    // ------------------------------------------------------
    // HANDBOOK
    // ------------------------------------------------------

    function setupHandbook() {

        const cards =
            document.querySelectorAll(".handbook-card");

        console.log(
            "Handbook sections found:",
            cards.length
        );


        cards.forEach(function (card) {

            const title =
                card.querySelector("h3");

            const content =
                card.querySelector(
                    ".handbook-content"
                );

            if (!title || !content) {
                return;
            }


            title.style.cursor = "pointer";


            title.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();
                    event.stopPropagation();


                    const isOpen =
                        content.classList.contains(
                            "handbook-open"
                        );


                    // Close all sections

                    cards.forEach(
                        function (otherCard) {

                            const otherContent =
                                otherCard.querySelector(
                                    ".handbook-content"
                                );

                            if (otherContent) {

                                otherContent.classList.remove(
                                    "handbook-open"
                                );

                                otherContent.style.display =
                                    "none";

                            }

                        }
                    );


                    // Open selected section

                    if (!isOpen) {

                        content.classList.add(
                            "handbook-open"
                        );

                        content.style.display =
                            "block";

                    }

                },
                false
            );

        });

    }


    // ------------------------------------------------------
    // CIVILIAN FORM
    // ------------------------------------------------------

    function setupCivilian() {

        const button =
            document.getElementById(
                "civilianSubmit"
            );

        if (!button) {
            return;
        }


        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "civilianName"
                    );


                const examiner =
                    document.getElementById(
                        "civilianExaminer"
                    );


                const result =
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

                    result.innerHTML =
                        "❌ لطفاً نام متقاضی را وارد کنید.";

                    return;

                }


                result.className =
                    "result-box show success";


                result.innerHTML = `
                    ✅ فرم با موفقیت آماده ثبت شد.
                    <br>
                    متقاضی:
                    ${name.value.trim()}
                    <br>
                    Examiner:
                    ${
                        examiner
                            ? examiner.value.trim()
                            : "Not specified"
                    }
                `;

            },
            false
        );

    }


    // ------------------------------------------------------
    // LOGIN TEST
    // ------------------------------------------------------

    function setupLogin() {

        const form =
            document.getElementById(
                "loginForm"
            );

        if (!form) {
            return;
        }


        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const result =
                    document.getElementById(
                        "loginResult"
                    );


                if (result) {

                    result.className =
                        "result-box show success";

                    result.innerHTML =
                        "صفحه Login فعال است.";

                }

            },
            false
        );

    }


    // ------------------------------------------------------
    // LOGOUT TEST
    // ------------------------------------------------------

    function setupLogout() {

        const button =
            document.getElementById(
                "logoutButton"
            );

        if (!button) {
            return;
        }


        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                showPage("home");

            },
            false
        );

    }


    // ------------------------------------------------------
    // START
    // ------------------------------------------------------

    function start() {

        console.log(
            "Starting LSPD Academy..."
        );


        setupNavigation();

        setupHandbook();

        setupCivilian();

        setupLogin();

        setupLogout();


        showPage("home");


        console.log(
            "LSPD Academy navigation ready."
        );

    }


    // ------------------------------------------------------
    // DOM READY
    // ------------------------------------------------------

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
