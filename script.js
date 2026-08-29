```javascript
"use strict";


// =====================================================
// LSPD FIREARMS DIVISION
// SIMPLE VERSION
// NO FIREBASE
// =====================================================


document.addEventListener("DOMContentLoaded", function () {

    console.log("LSPD SCRIPT LOADED");


    // =================================================
    // NAVIGATION
    // =================================================

    const navigationButtons =
        document.querySelectorAll("[data-page]");


    navigationButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const pageId =
                this.getAttribute("data-page");


            const allPages =
                document.querySelectorAll(".page-section");


            allPages.forEach(function (page) {

                page.classList.remove("active");

            });


            const selectedPage =
                document.getElementById(pageId);


            if (selectedPage) {

                selectedPage.classList.add("active");

                window.scrollTo(0, 0);

                console.log(
                    "Opened page:",
                    pageId
                );

            }

        });

    });



    // =================================================
    // HANDBOOK
    // =================================================

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


        content.style.display = "none";


        title.addEventListener("click", function () {

            if (
                content.style.display ===
                "none"
            ) {

                content.style.display = "block";

            } else {

                content.style.display = "none";

            }

        });

    });



    // =================================================
    // CIVILIAN FORM
    // =================================================

    const civilianButton =
        document.getElementById(
            "civilianSubmit"
        );


    if (civilianButton) {

        civilianButton.addEventListener(
            "click",
            function () {

                const nameInput =
                    document.getElementById(
                        "civilianName"
                    );


                const result =
                    document.getElementById(
                        "civilianResult"
                    );


                if (
                    !nameInput ||
                    !result
                ) {
                    return;
                }


                const name =
                    nameInput.value.trim();


                if (!name) {

                    result.className =
                        "result-box show danger";

                    result.textContent =
                        "لطفاً نام متقاضی را وارد کنید.";

                    return;

                }


                result.className =
                    "result-box show success";

                result.textContent =
                    "فرم با موفقیت ثبت شد.";

            }
        );

    }



    // =================================================
    // DEMO LOGIN
    // =================================================

    const demoLogin =
        document.getElementById(
            "demoLogin"
        );


    if (demoLogin) {

        demoLogin.addEventListener(
            "click",
            function () {

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


                if (
                    !email ||
                    !password ||
                    !result
                ) {
                    return;
                }


                if (
                    !email.value.trim() ||
                    !password.value
                ) {

                    result.className =
                        "result-box show danger";

                    result.textContent =
                        "Email و Password را وارد کنید.";

                    return;

                }


                result.className =
                    "result-box show success";

                result.textContent =
                    "ورود آزمایشی موفق بود.";

            }
        );

    }


});
```
