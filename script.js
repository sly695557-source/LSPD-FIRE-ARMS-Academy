"use strict";

console.log("LSPD SCRIPT LOADED");

var officerLoggedIn = false;

var DEMO_EMAIL = "officer@lspd.local";
var DEMO_PASSWORD = "LSPD123";


function showPage(pageId) {

    var pages = document.querySelectorAll(".page-section");

    for (var i = 0; i < pages.length; i++) {
        pages[i].classList.remove("active");
    }

    var target = document.getElementById(pageId);

    if (!target) {
        console.log("Page not found:", pageId);
        return;
    }

    if (
        (pageId === "officerPanelPage" ||
         pageId === "officerExam") &&
        !officerLoggedIn
    ) {
        target = document.getElementById("login");
    }

    target.classList.add("active");

    window.scrollTo(0, 0);
}


window.showPage = showPage;


document.addEventListener("DOMContentLoaded", function () {

    console.log("DOM READY");


    /* =========================
       ALL PAGE BUTTONS
    ========================= */

    var buttons = document.querySelectorAll("[data-page]");

    console.log("BUTTONS:", buttons.length);

    for (var i = 0; i < buttons.length; i++) {

        buttons[i].addEventListener("click", function () {

            var page = this.getAttribute("data-page");

            console.log("CLICK:", page);

            showPage(page);

        });

    }


    /* =========================
       LOGIN
    ========================= */

    var loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            var email =
                document.getElementById("officerEmail").value.trim();

            var password =
                document.getElementById("officerPassword").value;

            var result =
                document.getElementById("loginResult");


            console.log("LOGIN EMAIL:", email);


            if (
                email.toLowerCase() === DEMO_EMAIL.toLowerCase() &&
                password === DEMO_PASSWORD
            ) {

                officerLoggedIn = true;


                var loggedEmail =
                    document.getElementById("loggedOfficerEmail");

                if (loggedEmail) {
                    loggedEmail.textContent = email;
                }


                if (result) {

                    result.className =
                        "result-box show success";

                    result.textContent =
                        "ورود موفق بود.";

                }


                showPage("officerPanelPage");

            }

            else {

                officerLoggedIn = false;


                if (result) {

                    result.className =
                        "result-box show danger";

                    result.textContent =
                        "Email یا Password اشتباه است.";

                }

            }

        });

    }


    /* =========================
       LOGOUT
    ========================= */

    var logoutButton =
        document.getElementById("logoutButton");

    if (logoutButton) {

        logoutButton.addEventListener("click", function () {

            officerLoggedIn = false;

            showPage("home");

        });

    }


    /* =========================
       CIVILIAN SUBMIT
    ========================= */

    var civilianSubmit =
        document.getElementById("civilianSubmit");

    if (civilianSubmit) {

        civilianSubmit.addEventListener("click", function () {

            var name =
                document.getElementById("civilianName").value.trim();

            var examiner =
                document.getElementById("civilianExaminer").value.trim();

            var result =
                document.getElementById("civilianResult");


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
                "فرم با موفقیت ثبت شد.";

        });

    }


    /* =========================
       OFFICER TEST
    ========================= */

    var examButton =
        document.getElementById("officerExamSubmit");

    if (examButton) {

        examButton.addEventListener("click", function () {

            if (!officerLoggedIn) {

                showPage("login");

                return;

            }


            var answers = {

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


            for (var q in answers) {

                var selected =
                    document.querySelector(
                        'input[name="' + q + '"]:checked'
                    );


                if (
                    selected &&
                    selected.value === answers[q]
                ) {

                    score++;

                }

            }


            var percentage =
                Math.round((score / total) * 100);


            var result =
                document.getElementById("examResult");


            if (percentage >= 80) {

                result.className =
                    "result-box show success";

                result.innerHTML =
                    "PASS<br>Score: " +
                    percentage +
                    "%";

            }

            else {

                result.className =
                    "result-box show danger";

                result.innerHTML =
                    "FAIL<br>Score: " +
                    percentage +
                    "%<br>" +
                    "Minimum Passing Score: 80%";

            }

        });

    }


    /* =========================
       START HOME
    ========================= */

    showPage("home");

});
