"use strict";


/* =====================================================
   LSPD FIREARMS ACADEMY
   MAIN JAVASCRIPT
   NO FIREBASE
===================================================== */


console.log("LSPD SCRIPT LOADED");



/* =====================================================
   DEMO OFFICER ACCOUNT
===================================================== */

var DEMO_EMAIL = "officer@lspd.local";

var DEMO_PASSWORD = "LSPD123";

var officerLoggedIn = false;



/* =====================================================
   PAGE SYSTEM
===================================================== */

function showPage(pageId) {

    var pages =
        document.querySelectorAll(".page-section");


    for (
        var i = 0;
        i < pages.length;
        i++
    ) {

        pages[i].classList.remove("active");

    }


    var target =
        document.getElementById(pageId);


    if (!target) {

        console.error(
            "Page not found:",
            pageId
        );

        return;

    }


    /*
       Officer pages require demo login.
    */

    if (
        (
            pageId === "officerPanelPage" ||
            pageId === "officerExam"
        ) &&
        !officerLoggedIn
    ) {

        pageId = "login";

        target =
            document.getElementById("login");

    }


    if (target) {

        target.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

}


window.showPage = showPage;



/* =====================================================
   NAVIGATION BUTTONS
===================================================== */

function setupNavigation() {

    var buttons =
        document.querySelectorAll(
            "[data-page]"
        );


    console.log(
        "LSPD BUTTONS FOUND:",
        buttons.length
    );


    for (
        var i = 0;
        i < buttons.length;
        i++
    ) {

        buttons[i].addEventListener(
            "click",
            function () {

                var pageId =
                    this.getAttribute(
                        "data-page"
                    );


                showPage(pageId);

            }
        );

    }

}



/* =====================================================
   LOGIN
===================================================== */

function setupLogin() {

    var form =
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


            var email =
                document
                    .getElementById(
                        "officerEmail"
                    )
                    .value
                    .trim();


            var password =
                document.getElementById(
                    "officerPassword"
                ).value;


            var result =
                document.getElementById(
                    "loginResult"
                );


            if (
                email === DEMO_EMAIL &&
                password === DEMO_PASSWORD
            ) {

                officerLoggedIn = true;


                document.getElementById(
                    "loggedOfficerEmail"
                ).textContent =
                    email;


                result.className =
                    "result-box show success";


                result.textContent =
                    "✅ ورود موفق بود.";


                setTimeout(
                    function () {

                        showPage(
                            "officerPanelPage"
                        );

                    },
                    400
                );


            }

            else {

                officerLoggedIn = false;


                result.className =
                    "result-box show danger";


                result.textContent =
                    "❌ Email یا Password اشتباه است.";

            }

        }
    );

}



/* =====================================================
   LOGOUT
===================================================== */

function setupLogout() {

    var button =
        document.getElementById(
            "logoutButton"
        );


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        function () {

            officerLoggedIn = false;


            var email =
                document.getElementById(
                    "officerEmail"
                );


            var password =
                document.getElementById(
                    "officerPassword"
                );


            if (email) {
                email.value = "";
            }


            if (password) {
                password.value = "";
            }


            showPage("home");

        }
    );

}



/* =====================================================
   CIVILIAN FORM
===================================================== */

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
                document
                    .getElementById(
                        "civilianName"
                    )
                    .value
                    .trim();


            var examiner =
                document
                    .getElementById(
                        "civilianExaminer"
                    )
                    .value
                    .trim();


            var result =
                document.getElementById(
                    "civilianResult"
                );


            if (!name || !examiner) {

                result.className =
                    "result-box show danger";


                result.textContent =
                    "لطفاً نام متقاضی و Examiner را وارد کنید.";


                return;

            }


            result.className =
                "result-box show success";


            result.textContent =
                "✅ فرم با موفقیت ثبت شد.";

        }
    );

}



/* =====================================================
   OFFICER TEST
===================================================== */

function setupOfficerExam() {

    var button =
        document.getElementById(
            "officerExamSubmit"
        );


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        function () {


            if (!officerLoggedIn) {

                showPage("login");

                return;

            }


            var correctAnswers = {

                q1: "B",
                q2: "B",
                q3: "B",
                q4: "B",
                q5: "B",
                q6: "B",
                q7: "C",
                q8: "A"

            };


            var score = 0;

            var total = 8;


            for (
                var question in correctAnswers
            ) {

                var selected =
                    document.querySelector(
                        'input[name="' +
                        question +
                        '"]:checked'
                    );


                if (
                    selected &&
                    selected.value ===
                    correctAnswers[question]
                ) {

                    score++;

                }

            }


            var percentage =
                Math.round(
                    (score / total) * 100
                );


            var result =
                document.getElementById(
                    "examResult"
                );


            if (
                percentage >= 80
            ) {

                result.className =
                    "result-box show success";


                result.innerHTML =
                    "✅ PASS<br>" +
                    "Score: " +
                    percentage +
                    "%";


            }

            else {

                result.className =
                    "result-box show danger";


                result.innerHTML =
                    "❌ FAIL<br>" +
                    "Score: " +
                    percentage +
                    "%<br>" +
                    "<small>Minimum Passing Score: 80%</small>";

            }

        }
    );

}



/* =====================================================
   START WEBSITE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        setupNavigation();

        setupLogin();

        setupLogout();

        setupCivilian();

        setupOfficerExam();


        showPage("home");


        console.log(
            "LSPD WEBSITE READY"
        );

    }
);
```
