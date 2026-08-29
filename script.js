"use strict";


/* =====================================================
   LSPD FIREARMS ACADEMY
   MAIN JAVASCRIPT
===================================================== */


console.log("LSPD SCRIPT LOADED");


/* =====================================================
   OFFICER ACCOUNT
===================================================== */

var officerLoggedIn = false;

var DEMO_EMAIL = "officer@lspd.local";

var DEMO_PASSWORD = "LSPD123";


/* =====================================================
   PAGE SYSTEM
===================================================== */

function showPage(pageId) {


    var protectedPages = [
        "officerPanelPage",
        "officerExam"
    ];


    if (
        protectedPages.indexOf(pageId) !== -1 &&
        !officerLoggedIn
    ) {

        pageId = "login";

    }


    var pages =
        document.querySelectorAll(
            ".page-section"
        );


    for (
        var i = 0;
        i < pages.length;
        i++
    ) {

        pages[i].classList.remove(
            "active"
        );

    }


    var target =
        document.getElementById(
            pageId
        );


    if (!target) {

        console.error(
            "PAGE NOT FOUND:",
            pageId
        );

        return;

    }


    target.classList.add(
        "active"
    );


    updateNavigation();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


window.showPage =
    showPage;


/* =====================================================
   NAVIGATION
===================================================== */

function setupNavigation() {


    var buttons =
        document.querySelectorAll(
            "[data-page]"
        );


    console.log(
        "NAVIGATION BUTTONS:",
        buttons.length
    );


    for (
        var i = 0;
        i < buttons.length;
        i++
    ) {


        buttons[i].addEventListener(
            "click",
            function (event) {


                event.preventDefault();


                var pageId =
                    this.getAttribute(
                        "data-page"
                    );


                if (!pageId) {

                    return;

                }


                console.log(
                    "NAVIGATE:",
                    pageId
                );


                showPage(
                    pageId
                );

            }
        );

    }

}


/* =====================================================
   NAV STATUS
===================================================== */

function updateNavigation() {


    var status =
        document.getElementById(
            "navOfficerStatus"
        );


    if (!status) {

        return;

    }


    if (officerLoggedIn) {

        status.textContent =
            "● ONLINE";

        status.classList.add(
            "online"
        );

    }

    else {

        status.textContent =
            "OFFLINE";

        status.classList.remove(
            "online"
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
        "HANDBOOK CARDS:",
        cards.length
    );


    for (
        var i = 0;
        i < cards.length;
        i++
    ) {


        var card =
            cards[i];


        var title =
            card.querySelector(
                "h3"
            );


        var content =
            card.querySelector(
                ".handbook-content"
            );


        if (
            !title ||
            !content
        ) {

            continue;

        }


        content.style.display =
            "none";


        title.addEventListener(
            "click",
            function () {


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
                    currentCard.classList.contains(
                        "open"
                    );


                var allCards =
                    document.querySelectorAll(
                        ".handbook-card"
                    );


                for (
                    var j = 0;
                    j < allCards.length;
                    j++
                ) {


                    allCards[j].classList.remove(
                        "open"
                    );


                    var otherContent =
                        allCards[j].querySelector(
                            ".handbook-content"
                        );


                    if (otherContent) {

                        otherContent.style.display =
                            "none";

                    }

                }


                if (!isOpen) {


                    currentCard.classList.add(
                        "open"
                    );


                    currentContent.style.display =
                        "block";


                    setTimeout(
                        function () {

                            currentCard.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });

                        },
                        50
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


    var form =
        document.getElementById(
            "loginForm"
        );


    if (!form) {

        console.error(
            "LOGIN FORM NOT FOUND"
        );

        return;

    }


    form.addEventListener(
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


            if (!email || !password) {


                showResult(
                    result,
                    "لطفاً Email و Password را وارد کنید.",
                    false
                );


                return;

            }


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


                showResult(
                    result,
                    "✓ Authentication Successful",
                    true
                );


                updateNavigation();


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


                officerLoggedIn =
                    false;


                updateNavigation();


                showResult(
                    result,
                    "✕ Email یا Password اشتباه است.",
                    false
                );

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


            updateNavigation();


            showPage(
                "home"
            );

        }
    );

}


/* =====================================================
   CIVILIAN APPLICATION
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
                document.getElementById(
                    "civilianName"
                );


            var examiner =
                document.getElementById(
                    "civilianExaminer"
                );


            var result =
                document.getElementById(
                    "civilianResult"
                );


            if (
                !name ||
                !examiner ||
                !result
            ) {

                return;

            }


            var nameValue =
                name.value.trim();


            var examinerValue =
                examiner.value.trim();


            if (
                !nameValue ||
                !examinerValue
            ) {


                showResult(
                    result,
                    "لطفاً نام متقاضی و Examiner را وارد کنید.",
                    false
                );


                return;

            }


            var answers =
                document.querySelectorAll(
                    "#civilianQuestions textarea"
                );


            var answered =
                0;


            for (
                var i = 0;
                i < answers.length;
                i++
            ) {


                if (
                    answers[i].value.trim()
                ) {

                    answered++;

                }

            }


            if (
                answered < answers.length
            ) {


                showResult(
                    result,
                    "لطفاً به تمام 20 سؤال پاسخ دهید. " +
                    "پاسخ داده شده: " +
                    answered +
                    " / " +
                    answers.length,
                    false
                );


                return;

            }


            showResult(
                result,
                "✓ Application با موفقیت ثبت شد. " +
                "تمام 20 پاسخ دریافت شد.",
                true
            );

        }
    );

}


/* =====================================================
   OFFICER EXAM
===================================================== */

function setupOfficerExam() {


    var button =
        document.getElementById(
            "officerExamSubmit"
        );


    if (!button) {

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


    button.addEventListener(
        "click",
        function () {


            if (!officerLoggedIn) {

                showPage(
                    "login"
                );

                return;

            }


            var total =
                Object.keys(
                    correctAnswers
                ).length;


            var score = 0;

            var answered = 0;


            for (
                var question in correctAnswers
            ) {


                var selected =
                    document.querySelector(
                        'input[name="' +
                        question +
                        '"]:checked'
                    );


                if (selected) {

                    answered++;


                    if (
                        selected.value
                        ===
                        correctAnswers[
                            question
                        ]
                    ) {

                        score++;

                    }

                }

            }


            var result =
                document.getElementById(
                    "examResult"
                );


            if (!result) {

                return;

            }


            if (
                answered < total
            ) {


                result.className =
                    "exam-result show danger";


                result.innerHTML =
                    "⚠ لطفاً به تمام سوالات پاسخ دهید." +
                    "<br>" +
                    "پاسخ داده شده: " +
                    answered +
                    " / " +
                    total;


                result.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });


                return;

            }


            var percentage =
                Math.round(
                    (
                        score /
                        total
                    ) *
                    100
                );


            if (
                percentage >= 80
            ) {


                result.className =
                    "exam-result show success";


                result.innerHTML =
                    "<strong>PASS ✓</strong>" +
                    "<br>" +
                    "Score: " +
                    percentage +
                    "%" +
                    "<br>" +
                    score +
                    " / " +
                    total;


            }

            else {


                result.className =
                    "exam-result show danger";


                result.innerHTML =
                    "<strong>FAIL ✕</strong>" +
                    "<br>" +
                    "Score: " +
                    percentage +
                    "%" +
                    "<br>" +
                    score +
                    " / " +
                    total +
                    "<br>" +
                    "<small>" +
                    "حداقل نمره قبولی 80% است." +
                    "</small>";

            }


            result.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }
    );

}


/* =====================================================
   RESULT HELPER
===================================================== */

function showResult(
    element,
    message,
    success
) {


    if (!element) {

        return;

    }


    element.className =
        success
            ? "result-box show success"
            : "result-box show danger";


    element.textContent =
        message;

}


/* =====================================================
   DATE
===================================================== */

function setupDate() {


    var date =
        document.getElementById(
            "civilianDate"
        );


    if (!date) {

        return;

    }


    var today =
        new Date();


    var year =
        today.getFullYear();


    var month =
        String(
            today.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    var day =
        String(
            today.getDate()
        ).padStart(
            2,
            "0"
        );


    date.value =
        year +
        "-" +
        month +
        "-" +
        day;

}


/* =====================================================
   INITIALIZE
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


        setupDate();


        updateNavigation();


        showPage(
            "home"
        );


        console.log(
            "LSPD WEBSITE READY"
        );

    }
);
```
