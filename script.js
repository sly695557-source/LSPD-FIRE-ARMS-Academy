```javascript
document.addEventListener("DOMContentLoaded", function () {

    console.log("LSPD SCRIPT STARTED");

    // ==============================
    // PAGE NAVIGATION
    // ==============================

    const buttons = document.querySelectorAll("[data-page]");
    const pages = document.querySelectorAll(".page-section");

    console.log("Buttons:", buttons.length);
    console.log("Pages:", pages.length);

    function openPage(pageId) {

        console.log("Opening:", pageId);

        pages.forEach(function (page) {
            page.classList.remove("active");
            page.style.display = "none";
        });

        const selectedPage =
            document.getElementById(pageId);

        if (!selectedPage) {
            console.error("Page not found:", pageId);
            return;
        }

        selectedPage.classList.add("active");
        selectedPage.style.display = "block";

        window.scrollTo(0, 0);
    }


    // ==============================
    // NAVIGATION BUTTONS
    // ==============================

    buttons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            const pageId =
                button.getAttribute("data-page");

            if (!pageId) {
                return;
            }

            openPage(pageId);

        });

    });


    // ==============================
    // HANDBOOK ACCORDION
    // ==============================

    const handbookCards =
        document.querySelectorAll(".handbook-card");

    handbookCards.forEach(function (card) {

        const title =
            card.querySelector("h3");

        const content =
            card.querySelector(".handbook-content");

        if (!title || !content) {
            return;
        }

        title.addEventListener("click", function (event) {

            event.preventDefault();

            if (content.style.display === "block") {

                content.style.display = "none";

            } else {

                content.style.display = "block";

            }

        });

    });


    // ==============================
    // CIVILIAN BUTTON
    // ==============================

    const civilianButton =
        document.getElementById("civilianSubmit");

    if (civilianButton) {

        civilianButton.addEventListener("click", function () {

            const result =
                document.getElementById("civilianResult");

            const name =
                document.getElementById("civilianName");

            if (!result) {
                return;
            }

            if (!name || !name.value.trim()) {

                result.className =
                    "result-box show danger";

                result.innerHTML =
                    "لطفاً نام متقاضی را وارد کنید.";

                return;
            }

            result.className =
                "result-box show success";

            result.innerHTML =
                "فرم آماده ثبت است.";

        });

    }


    // ==============================
    // LOGOUT BUTTON
    // ==============================

    const logoutButton =
        document.getElementById("logoutButton");

    if (logoutButton) {

        logoutButton.addEventListener("click", function () {

            openPage("home");

        });

    }


    // ==============================
    // START PAGE
    // ==============================

    openPage("home");

});
```
