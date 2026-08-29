"use strict";

/*
=========================================================
GENERIC PAGE NAVIGATION
این فایل به Firebase یا کتابخانه خارجی نیاز ندارد.
=========================================================
*/

(function () {

    let currentPage = "home";

    /*
    ---------------------------------------------------------
    PAGE NAVIGATION
    ---------------------------------------------------------
    */

    function showPage(pageId) {

        if (!pageId) {
            return;
        }

        const pages = document.querySelectorAll(
            ".page-section"
        );

        const target = document.getElementById(pageId);

        if (!target) {
            console.error(
                "Page not found:",
                pageId
            );
            return;
        }

        pages.forEach(function (page) {

            page.classList.remove("active");

            page.setAttribute(
                "aria-hidden",
                "true"
            );

        });

        target.classList.add("active");

        target.setAttribute(
            "aria-hidden",
            "false"
        );

        currentPage = pageId;

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });

        console.log(
            "PAGE:",
            currentPage
        );
    }


    window.showPage = showPage;


    /*
    ---------------------------------------------------------
    GLOBAL CLICK HANDLER
    ---------------------------------------------------------
    
    به جای اینکه برای تک‌تک دکمه‌ها listener جدا بسازیم،
    تمام کلیک‌های data-page از اینجا مدیریت می‌شوند.
    ---------------------------------------------------------
    */

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest("[data-page]");

            if (!button) {
                return;
            }

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


    /*
    ---------------------------------------------------------
    ACCORDION
    ---------------------------------------------------------
    */

    document.addEventListener(
        "click",
        function (event) {

            const title =
                event.target.closest(
                    ".handbook-card h3"
                );

            if (!title) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            const card =
                title.closest(".handbook-card");

            if (!card) {
                return;
            }

            const content =
                card.querySelector(
                    ".handbook-content"
                );

            if (!content) {
                return;
            }

            const wasOpen =
                card.classList.contains("open");

            document
                .querySelectorAll(".handbook-card")
                .forEach(function (item) {

                    item.classList.remove("open");

                });

            if (!wasOpen) {

                card.classList.add("open");

            }

        },
        false
    );


    /*
    ---------------------------------------------------------
    LOGOUT BUTTON
    ---------------------------------------------------------
    */

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest("#logoutButton");

            if (!button) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            try {

                localStorage.removeItem(
                    "academyLoggedIn"
                );

                localStorage.removeItem(
                    "academyUser"
                );

            } catch (error) {

                console.warn(
                    "Storage unavailable:",
                    error
                );

            }

            showPage("home");

        },
        false
    );


    /*
    ---------------------------------------------------------
    NORMAL FORM HANDLING
    ---------------------------------------------------------
    */

    document.addEventListener(
        "submit",
        function (event) {

            const form = event.target;

            if (!form || form.id !== "loginForm") {
                return;
            }

            event.preventDefault();

            const email =
                document.getElementById(
                    "officerEmail"
                );

            const password =
                document.getElementById(
                    "officerPassword"
                );

            const result =
                document.getElementById(
                    "loginResult"
                );

            if (!email || !password || !result) {
                return;
            }

            /*
            فقط نمونه ورود دمو برای تست ناوبری.
            */

            const correctEmail =
                "demo@example.local";

            const correctPassword =
                "DEMO123";

            if (
                email.value.trim().toLowerCase() ===
                    correctEmail &&
                password.value ===
                    correctPassword
            ) {

                localStorage.setItem(
                    "academyLoggedIn",
                    "true"
                );

                localStorage.setItem(
                    "academyUser",
                    email.value.trim()
                );

                result.className =
                    "result-box show success";

                result.textContent =
                    "ورود موفق بود.";

                setTimeout(
                    function () {

                        showPage(
                            "officerPanelPage"
                        );

                    },
                    300
                );

            } else {

                result.className =
                    "result-box show danger";

                result.textContent =
                    "اطلاعات ورود صحیح نیست.";

            }

        },
        false
    );


    /*
    ---------------------------------------------------------
    DOM READY
    ---------------------------------------------------------
    */

    function initialize() {

        console.log(
            "Academy interface initialized."
        );

        const pages =
            document.querySelectorAll(
                ".page-section"
            );

        pages.forEach(function (page) {

            page.setAttribute(
                "aria-hidden",
                page.id === "home"
                    ? "false"
                    : "true"
            );

        });

        showPage("home");

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initialize,
            {
                once: true
            }
        );

    } else {

        initialize();

    }

})();
```
