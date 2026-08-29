"use strict";

console.log("LSPD SCRIPT LOADED");


/* =====================================================
   DEMO OFFICER LOGIN
===================================================== */

var officerLoggedIn = false;

var DEMO_EMAIL = "officer@lspd.local";

var DEMO_PASSWORD = "LSPD123";


/* =====================================================
   PAGE SYSTEM
===================================================== */

function showPage(pageId) {

    var pages =
        document.querySelectorAll(".page-section");


    for (var i = 0; i < pages.length; i++) {

        pages[i].classList.remove("active");

    }


    var target =
        document.getElementById(pageId);


    if (!target) {

        console.error(
            "PAGE NOT FOUND:",
            pageId
        );

        return;

    }


    /*
       Officer pages require login.
    */

    if (
        (
            pageId === "officerPanelPage" ||
            pageId === "officerExam"
        )
        &&
        !officerLoggedIn
    ) {

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
   PAGE NAVIGATION
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


                console.log(
                    "PAGE BUTTON CLICK:",
                    pageId
                );


                showPage(pageId);

            }
        );

    }

}


/* =====================================================
   HANDBOOK ACCORDION
===================================================== */

function setupHandbook() {

    var cards =
        document.querySelectorAll(
            ".handbook-card"
        );


    console.log(
        "HANDBOOK CARDS FOUND:",
        cards.length
    );


    for (
        var i = 0;
        i < cards.length;
        i++
    ) {

        var card = cards[i];

        var title =
            card.querySelector("h3");

        var content =
            card.querySelector(
                ".handbook-content"
            );


        if (!title || !content) {

            continue;

        }


        /*
           Initially closed.
        */

        content.style.display =
            "none";


        title.style.cursor =
            "pointer";


        title.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                var currentCard =
                    this.parentElement;


                var currentContent =
                    currentCard.querySelector(
                        ".handbook-content"
                    );


                if (!currentContent) {

                    return;

                }


                var isOpen =
                    currentContent.style.display
                    ===
                    "block";


                /*
                   Close every other section.
                */

                var allCards =
                    document.querySelectorAll(
                        ".handbook-card"
                    );


                for (
                    var j = 0;
                    j < allCards.length;
                    j++
                ) {

                    var otherContent =
                        allCards[j].querySelector(
                            ".handbook-content"
                        );


                    if (
                        otherContent &&
                        allCards[j] !== currentCard
                    ) {

                        otherContent.style.display =
                            "none";


                        allCards[j].classList.remove(
                            "open"
                        );

                    }

                }


                /*
                   Open / close selected section.
                */

                if (isOpen) {

                    currentContent.style.display =
                        "none";


                    currentCard.classList.remove(
                        "open"
                    );

                }

                else {

                    currentContent.style.display =
                        "block";


                    currentCard.classList.add(
                        "open"
                    );

                }

            }
        );

    }

}


/* =====================================================
   LOGIN
===================================================== */

function setupLogin() {

    var loginForm =
        document.getElementById(
            "loginForm"
        );


    if (!loginForm) {

        console.error(
            "LOGIN FORM NOT FOUND"
        );

        return;

    }


    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            var emailInput =
                document.getElementById(
                    "officerEmail"
                );


            var passwordInput =
                document.getElementById(
                    "officerPassword"
                );


            var result =
                document.getElementById(
                    "loginResult"
                );


            if (
                !emailInput ||
                !passwordInput
            ) {

                return;

            }


            var email =
                emailInput.value.trim();


            var password =
                passwordInput.value;


            /*
               Demo login.
            */

            if (
                email.toLowerCase()
                ===
                DEMO_EMAIL.toLowerCase()
                &&
                password
                ===
                DEMO_PASSWORD
            ) {


                officerLoggedIn =
                    true;


                var loggedEmail =
                    document.getElementById(
                        "loggedOfficerEmail"
                    );


                if (loggedEmail) {

                    loggedEmail.textContent =
                        email;

                }


                if (result) {

                    result.className =
                        "result-box show success";


                    result.textContent =
                        "✅ ورود موفق بود.";

                }


                showPage(
                    "officerPanelPage"
                );


            }

            else {


                officerLoggedIn =
                    false;


                if (result) {

                    result.className =
                        "result-box show danger";


                    result.textContent =
                        "❌ Email یا Password اشتباه است.";

                }

            }

        }
    );

}


/* =====================================================
   LOGOUT
===================================================== */

function setupLogout() {

    var logoutButton =
        document.getElementById(
            "logoutButton"
        );


    if (!logoutButton) {

        console.warn(
            "LOGOUT BUTTON NOT FOUND"
        );

        return;

    }


    logoutButton.addEventListener(
        "click",
        function () {


            officerLoggedIn =
                false;


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

    var submitButton =
        document.getElementById(
            "civilianSubmit"
        );


    if (!submitButton) {

        console.warn(
            "CIVILIAN SUBMIT BUTTON NOT FOUND"
        );

        return;

    }


    submitButton.addEventListener(
        "click",
        function () {


            var nameInput =
                document.getElementById(
                    "civilianName"
                );


            var examinerInput =
                document.getElementById(
                    "civilianExaminer"
                );


            var result =
                document.getElementById(
                    "civilianResult"
                );


            if (
                !nameInput ||
                !examinerInput ||
                !result
            ) {

                return;

            }


            var name =
                nameInput.value.trim();


            var examiner =
                examinerInput.value.trim();


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
   OFFICER ASSESSMENT
===================================================== */

function setupOfficerExam() {

    var examButton =
        document.getElementById(
            "officerExamSubmit"
        );


    if (!examButton) {

        console.warn(
            "OFFICER EXAM BUTTON NOT FOUND"
        );

        return;

    }


    examButton.addEventListener(
        "click",
        function () {


            if (!officerLoggedIn) {

                showPage("login");

                return;

            }


            /*
               Correct answers.
               Total = 20 questions.
            */

            var answers = {

                q1: "B",
                q2: "B",
                q3: "B",
                q4: "B",
                q5: "B",
                q6: "B",
                q7: "C",
                q8: "A",
                q9: "B",
                q10: "A",
                q11: "A",
                q12: "B",
                q13: "A",
                q14: "A",
                q15: "A",
                q16: "A",
                q17: "B",
                q18: "A",
                q19: "A",
                q20: "B"

            };


            var score = 0;


            var total =
                Object.keys(
                    answers
                ).length;


            /*
               Check answers.
            */

            for (
                var question in answers
            ) {


                var selected =
                    document.querySelector(
                        'input[name="' +
                        question +
                        '"]:checked'
                    );


                if (
                    selected &&
                    selected.value
                    ===
                    answers[question]
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


            if (!result) {

                return;

            }


            /*
               PASS
            */

            if (
                percentage >= 80
            ) {


                result.className =
                    "result-box show success";


                result.innerHTML =
                    "PASS ✅<br>" +
                    "Score: " +
                    percentage +
                    "%<br>" +
                    score +
                    " / " +
                    total;


            }


            /*
               FAIL
            */

            else {


                result.className =
                    "result-box show danger";


                result.innerHTML =
                    "FAIL ❌<br>" +
                    "Score: " +
                    percentage +
                    "%<br>" +
                    score +
                    " / " +
                    total +
                    "<br>" +
                    "<small>" +
                    "حداقل نمره قبولی 80٪ است." +
                    "</small>";

            }

        }
    );

}


/* =====================================================
   INITIALIZE WEBSITE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        console.log(
            "LSPD DOM READY"
        );


        setupNavigation();


        setupHandbook();


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
