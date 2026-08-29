```javascript
document.addEventListener("DOMContentLoaded", function () {

    console.log("LSPD Academy loaded successfully");


    // =========================================
    // PAGE NAVIGATION
    // =========================================

    var buttons = document.querySelectorAll("[data-page]");
    var pages = document.querySelectorAll(".page-section");


    function showPage(pageId) {

        pages.forEach(function (page) {
            page.classList.remove("active");
        });


        var target = document.getElementById(pageId);


        if (!target) {
            console.error("Page not found:", pageId);
            return;
        }


        target.classList.add("active");

        window.scrollTo(0, 0);
    }


    buttons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            var pageId =
                button.getAttribute("data-page");


            if (pageId) {
                showPage(pageId);
            }

        });

    });


    // =========================================
    // HANDBOOK
    // =========================================

    var handbookCards =
        document.querySelectorAll(".handbook-card");


    handbookCards.forEach(function (card) {

        var title =
            card.querySelector("h3");

        var content =
            card.querySelector(".handbook-content");


        if (!title || !content) {
            return;
        }


        title.addEventListener("click", function () {

            if (content.style.display === "block") {

                content.style.display = "none";

            } else {

                content.style.display = "block";

            }

        });

    });


    // =========================================
    // CIVILIAN SUBMIT
    // =========================================

    var civilianButton =
        document.getElementById("civilianSubmit");


    if (civilianButton) {

        civilianButton.addEventListener("click", function () {

            var result =
                document.getElementById("civilianResult");

            var name =
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
                "فرم با موفقیت آماده شد.";

        });

    }


    // =========================================
    // LOGOUT
    // =========================================

    var logoutButton =
        document.getElementById("logoutButton");


    if (logoutButton) {

        logoutButton.addEventListener("click", function () {

            showPage("home");

        });

    }


    // =========================================
    // START
    // =========================================

    showPage("home");

});
```
