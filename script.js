"use strict";

/*
=========================================================
 LSPD FIREARMS ACADEMY
 CLEAN MAIN SCRIPT
 NO FIREBASE
=========================================================
*/


/* =====================================================
   CONFIG
===================================================== */

const OFFICER_EMAIL = "officer@lspd.local";
const OFFICER_PASSWORD = "LSPD123";

let officerLoggedIn = false;


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showPage(pageId) {

    const protectedPages = [
        "officerPanelPage",
        "officerExam"
    ];

    /*
    Officer pages require login
    */

    if (
        protectedPages.includes(pageId) &&
        !officerLoggedIn
    ) {
        pageId = "login";
    }


    const pages = document.querySelectorAll(
        ".page-section"
    );


    pages.forEach(function(page) {

        page.classList.remove("active");

    });


    const target = document.getElementById(pageId);


    if (!target) {

        console.error(
            "LSPD: Page not found:",
            pageId
        );

        return;

    }


    target.classList.add("active");


    updateOfficerStatus();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/*
Make available globally
*/

window.showPage = showPage;


/* =====================================================
   NAVIGATION BUTTONS
===================================================== */

function setupNavigation() {

    const buttons = document.querySelectorAll(
        "[data-page]"
    );


    console.log(
        "LSPD: Navigation buttons:",
        buttons.length
    );


    buttons.forEach(function(button) {

        button.addEventListener(
            "click",
            function(event) {

                event.preventDefault();
                event.stopPropagation();


                const pageId =
                    button.getAttribute("data-page");


                if (!pageId) {

                    console.warn(
                        "LSPD: Button has no data-page"
                    );

                    return;

                }


                console.log(
                    "LSPD: Opening page:",
                    pageId
                );


                showPage(pageId);

            }
        );

    });

}


/* =====================================================
   OFFICER STATUS
===================================================== */

function updateOfficerStatus() {

    const navStatus =
        document.getElementById(
            "navOfficerStatus"
        );


    if (navStatus) {

        if (officerLoggedIn) {

            navStatus.textContent =
                "● ONLINE";

            navStatus.classList.add(
                "online"
            );

        }

        else {

            navStatus.textContent =
                "OFFLINE";

            navStatus.classList.remove(
                "online"
            );

        }

    }


    const portalStatus =
        document.getElementById(
            "portalStatus"
        );


    if (portalStatus) {

        if (officerLoggedIn) {

            portalStatus.textContent =
                "● AUTHENTICATED";

        }

        else {

            portalStatus.textContent =
                "● OFFLINE";

        }

    }

}


/* =====================================================
   HANDBOOK ACCORDION
===================================================== */

function setupHandbook() {

    const cards =
        document.querySelectorAll(
            ".handbook-card"
        );


    console.log(
        "LSPD: Handbook cards:",
        cards.length
    );


    cards.forEach(function(card) {

        const title =
            card.querySelector("h3");


        const content =
            card.querySelector(
                ".handbook-content"
            );


        if (!title || !content) {

            return;

        }


        /*
        Start closed
        */

        content.style.display = "none";


        title.addEventListener(
            "click",
            function(event) {

                event.preventDefault();
                event.stopPropagation();


                const isOpen =
                    card.classList.contains(
                        "open"
                    );


                /*
                Close all cards
                */

                document
                    .querySelectorAll(
                        ".handbook-card"
                    )
                    .forEach(function(otherCard) {

                        otherCard.classList.remove(
                            "open"
                        );


                        const otherContent =
                            otherCard.querySelector(
                                ".handbook-content"
                            );


                        if (otherContent) {

                            otherContent.style.display =
                                "none";

                        }


                        const icon =
                            otherCard.querySelector(
                                "h3 b"
                            );


                        if (icon) {

                            icon.textContent =
                                "+";

                        }

                    });


                /*
                Open selected card
                */

                if (!isOpen) {

                    card.classList.add(
                        "open"
                    );


                    content.style.display =
                        "block";


                    const icon =
                        card.querySelector(
                            "h3 b"
                        );


                    if (icon) {

                        icon.textContent =
                            "−";

                    }

                }

            }
        );

    });

}


/* =====================================================
   OFFICER LOGIN
===================================================== */

function setupLogin() {

    const form =
        document.getElementById(
            "loginForm"
        );


    if (!form) {

        console.error(
            "LSPD: loginForm not found"
        );

        return;

    }


    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();
            event.stopPropagation();


            const emailInput =
                document.getElementById(
                    "officerEmail"
                );


            const passwordInput =
                document.getElementById(
                    "officerPassword"
                );


            const result =
                document.getElementById(
                    "loginResult"
                );


            if (!emailInput || !passwordInput) {

                return;

            }


            const email =
                emailInput.value.trim();


            const password =
                passwordInput.value;


            /*
            Empty fields
            */

            if (!email || !password) {

                showResult(
                    result,
                    "لطفاً Email و Password را وارد کنید.",
                    false
                );

                return;

            }


            /*
            Correct login
            */

            if (
                email.toLowerCase() ===
                OFFICER_EMAIL.toLowerCase()
                &&
                password ===
                OFFICER_PASSWORD
            ) {

                officerLoggedIn = true;


                const loggedEmail =
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


                updateOfficerStatus();


                /*
                Open Officer Portal
                */

                setTimeout(
                    function() {

                        showPage(
                            "officerPanelPage"
                        );

                    },
                    350
                );


            }

            else {

                officerLoggedIn = false;


                updateOfficerStatus();


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

    const button =
        document.getElementById(
            "logoutButton"
        );


    if (!button) {

        console.warn(
            "LSPD: logoutButton not found"
        );

        return;

    }


    button.addEventListener(
        "click",
        function(event) {

            event.preventDefault();
            event.stopPropagation();


            officerLoggedIn = false;


            const email =
                document.getElementById(
                    "officerEmail"
                );


            const password =
                document.getElementById(
                    "officerPassword"
                );


            if (email) {

                email.value = "";

            }


            if (password) {

                password.value = "";

            }


            const loggedEmail =
                document.getElementById(
                    "loggedOfficerEmail"
                );


            if (loggedEmail) {

                loggedEmail.textContent =
                    "Officer";

            }


            updateOfficerStatus();


            showPage("home");

        }
    );

}


/* =====================================================
   CIVILIAN APPLICATION
===================================================== */

function setupCivilian() {

    const button =
        document.getElementById(
            "civilianSubmit"
        );


    if (!button) {

        console.warn(
            "LSPD: civilianSubmit not found"
        );

        return;

    }


    button.addEventListener(
        "click",
        function(event) {

            event.preventDefault();
            event.stopPropagation();


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


            if (!name || !examiner || !result) {

                console.error(
                    "LSPD: Civilian form elements missing"
                );

                return;

            }


            const nameValue =
                name.value.trim();


            const examinerValue =
                examiner.value.trim();


            /*
            Check applicant information
            */

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


            /*
            Check all answers
            */

            const textareas =
                document.querySelectorAll(
                    "#civilianQuestions textarea"
                );


            let answered = 0;


            textareas.forEach(function(textarea) {

                if (
                    textarea.value.trim() !== ""
                ) {

                    answered++;

                }

            });


            const total =
                textareas.length;


            if (
                total > 0 &&
                answered < total
            ) {

                showResult(
                    result,
                    "لطفاً به تمام سوالات پاسخ دهید. " +
                    "پاسخ داده شده: " +
                    answered +
                    " / " +
                    total,
                    false
                );

                return;

            }


            /*
            Successful application
            */

            showResult(
                result,
                "✓ Application با موفقیت ثبت شد. " +
                "تمام پاسخ‌ها دریافت شدند.",
                true
            );

        }
    );

}


/* =====================================================
   OFFICER EXAM
===================================================== */

function setupOfficerExam() {

    const button =
        document.getElementById(
            "officerExamSubmit"
        );


    if (!button) {

        console.warn(
            "LSPD: officerExamSubmit not found"
        );

        return;

    }


    /*
    Correct answers
    */

    const correctAnswers = {

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
        function(event) {

            event.preventDefault();
            event.stopPropagation();


            /*
            Login protection
            */

            if (!officerLoggedIn) {

                showPage("login");

                return;

            }


            const result =
                document.getElementById(
                    "examResult"
                );


            if (!result) {

                return;

            }


            const questions =
                Object.keys(
                    correctAnswers
                );


            const total =
                questions.length;


            let score = 0;
            let answered = 0;


            questions.forEach(
                function(question) {


                    const selected =
                        document.querySelector(
                            'input[name="' +
                            question +
                            '"]:checked'
                        );


                    if (selected) {

                        answered++;


                        if (
                            selected.value ===
                            correctAnswers[
                                question
                            ]
                        ) {

                            score++;

                        }

                    }

                }
            );


            /*
            Not all questions answered
            */

            if (
                answered < total
            ) {

                result.className =
                    "exam-result show danger";


                result.innerHTML =
                    "⚠ لطفاً به تمام سوالات پاسخ دهید." +
                    "<br><br>" +
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


            /*
            Calculate score
            */

            const percentage =
                Math.round(
                    (
                        score /
                        total
                    ) *
                    100
                );


            /*
            PASS
            */

            if (
                percentage >= 80
            ) {

                result.className =
                    "exam-result show success";


                result.innerHTML =
                    "<strong>PASS ✓</strong>" +
                    "<br><br>" +
                    "Score: " +
                    percentage +
                    "%" +
                    "<br>" +
                    score +
                    " / " +
                    total;

            }


            /*
            FAIL
            */

            else {

                result.className =
                    "exam-result show danger";


                result.innerHTML =
                    "<strong>FAIL ✕</strong>" +
                    "<br><br>" +
                    "Score: " +
                    percentage +
                    "%" +
                    "<br>" +
                    score +
                    " / " +
                    total +
                    "<br><br>" +
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
   RESULT MESSAGE
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

    const date =
        document.getElementById(
            "civilianDate"
        );


    if (!date) {

        return;

    }


    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
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
   START WEBSITE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "LSPD: DOM READY"
        );


        setupNavigation();


        setupHandbook();


        setupLogin();


        setupLogout();


        setupCivilian();


        setupOfficerExam();


        setupDate();


        updateOfficerStatus();


        showPage("home");


        console.log(
            "LSPD: WEBSITE READY"
        );

    }
);
```
