```javascript
/* ================================
   SIMPLE WEBSITE SCRIPT
================================ */

document.addEventListener("DOMContentLoaded", () => {

    console.log("Website script loaded.");

    /* ================================
       PAGE NAVIGATION
    ================================= */

    function showPage(pageId) {

        const pages =
            document.querySelectorAll(".page-section");

        pages.forEach(page => {
            page.classList.remove("active");
        });

        const target =
            document.getElementById(pageId);

        if (!target) {
            console.error("Page not found:", pageId);
            return;
        }

        target.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    /* برای استفاده از onclick در HTML */
    window.showPage = showPage;


    /* ================================
       ALL DATA-PAGE BUTTONS
    ================================= */

    const buttons =
        document.querySelectorAll("[data-page]");

    buttons.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            const pageId =
                button.getAttribute("data-page");

            if (pageId) {
                showPage(pageId);
            }

        });

    });


    /* ================================
       ACCORDION / HANDBOOK
    ================================= */

    const handbookTitles =
        document.querySelectorAll(
            ".handbook-card h3"
        );

    handbookTitles.forEach(title => {

        const card =
            title.closest(".handbook-card");

        if (!card) return;

        const content =
            document.createElement("div");

        content.className =
            "handbook-extra";

        content.style.display = "none";
        content.style.marginTop = "15px";

        title.style.cursor = "pointer";

        title.addEventListener("click", () => {

            if (
                content.style.display === "none"
            ) {

                content.style.display = "block";

            } else {

                content.style.display = "none";
            }

        });

    });


    /* ================================
       NORMAL BUTTON SAFETY
    ================================= */

    document
        .querySelectorAll("button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    console.log(
                        "Button clicked:",
                        button.textContent.trim()
                    );

                }
            );

        });


    /* ================================
       DEFAULT PAGE
    ================================= */

    const activePage =
        document.querySelector(
            ".page-section.active"
        );

    if (!activePage) {

        const home =
            document.getElementById("home");

        if (home) {
            home.classList.add("active");
        }

    }

});
```
