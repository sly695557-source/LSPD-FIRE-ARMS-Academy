"use strict";

/* =====================================================
   LSPD FIREARMS ACADEMY
   COMPLETE SCRIPT
   NO FIREBASE
===================================================== */


/* =====================================================
   DEMO OFFICER ACCOUNT
===================================================== */

const DEMO_EMAIL = "officer@lspd.local";
const DEMO_PASSWORD = "LSPD123";


/* =====================================================
   LOGIN STATE
===================================================== */

let officerLoggedIn =
    sessionStorage.getItem("officerLoggedIn") === "true";

let savedOfficerEmail =
    sessionStorage.getItem("officerEmail") ||
    DEMO_EMAIL;


/* =====================================================
   PAGE SYSTEM
===================================================== */

function showPage(pageId) {

    /*
     * Officer pages are protected.
     */

    if (
        (pageId === "officerPanelPage" ||
         pageId === "officerExam") &&
        !officerLoggedIn
    ) {
        pageId = "login";
    }


    const pages =
        document.querySelectorAll(".page-section");


    pages.forEach(function(page) {

        page.classList.remove("active");

    });


    const target =
        document.getElementById(pageId);


    if (!target) {

        console.error(
            "PAGE NOT FOUND:",
            pageId
        );

        return;

    }


    target.classList.add("active");


    updateNavigation();


    /*
     * Scroll to top.
     */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


window.showPage = showPage;


/* =====================================================
   NAVIGATION
===================================================== */

function setupNavigation() {

    const buttons =
        document.querySelectorAll(
            "[data-page]"
        );


    console.log(
        "Navigation buttons:",
        buttons.length
    );


    buttons.forEach(function(button) {

        button.addEventListener(
            "click",
            function(event) {

                event.preventDefault();
                event.stopPropagation();


                const pageId =
                    button.getAttribute(
                        "data-page"
                    );


                if (!pageId) {

                    return;

                }


                showPage(pageId);

            }
        );

    });

}


/* =====================================================
   NAVIGATION STATUS
===================================================== */

function updateNavigation() {

    const status =
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
   RESTORE OFFICER SESSION
===================================================== */

function restoreOfficerSession() {

    if (!officerLoggedIn) {

        return;

    }


    const email =
        document.getElementById(
            "loggedOfficerEmail"
        );


    if (email) {

        email.textContent =
            savedOfficerEmail;

    }


    updateNavigation();

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
        "Handbook cards:",
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
         * Initial state
         */

        content.style.display =
            "none";


        title.setAttribute(
            "role",
            "button"
        );


        title.setAttribute(
            "tabindex",
            "0"
        );


        function toggleCard() {

            const isOpen =
                card.classList.contains(
                    "open"
                );


            /*
             * Close every other card.
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

                });


            /*
             * Open current card.
             */

            if (!isOpen) {

                card.classList.add(
                    "open"
                );


                content.style.display =
                    "block";

            }

        }


        title.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                toggleCard();

            }
        );


        title.addEventListener(
            "keydown",
            function(event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    toggleCard();

                }

            }
        );

    });

}


/* =====================================================
   LOGIN
===================================================== */

function setupLogin() {

    const form =
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
        function(event) {

            event.preventDefault();


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


            if (
                !emailInput ||
                !passwordInput
            ) {

                return;

            }


            const email =
                emailInput.value.trim();


            const password =
                passwordInput.value;


            /*
             * Empty fields
             */

            if (
                !email ||
                !password
            ) {

                showResult(
                    result,
                    "لطفاً Email و Password را وارد کنید.",
                    false
                );

                return;

            }


            /*
             * Correct Login
             */

            if (
                email.toLowerCase() ===
                    DEMO_EMAIL.toLowerCase()
                &&
                password ===
                    DEMO_PASSWORD
            ) {


                officerLoggedIn =
                    true;


                /*
                 * Save session
                 */

                sessionStorage.setItem(
                    "officerLoggedIn",
                    "true"
                );


                sessionStorage.setItem(
                    "officerEmail",
                    email
                );


                savedOfficerEmail =
                    email;


                /*
                 * Put email inside Portal
                 */

                const loggedEmail =
                    document.getElementById(
                        "loggedOfficerEmail"
                    );


                if (loggedEmail) {

                    loggedEmail.textContent =
                        email;

                }


                /*
                 * Update navbar
                 */

                updateNavigation();


                /*
                 * Success message
                 */

                showResult(
                    result,
                    "✓ Authentication Successful",
                    true
                );


                /*
                 * IMPORTANT:
                 * Go directly to Officer Portal.
                 */

                setTimeout(
                    function() {

                        showPage(
                            "officerPanelPage"
                        );

                    },
                    300
                );

            }

            else {


                officerLoggedIn =
                    false;


                sessionStorage.removeItem(
                    "officerLoggedIn"
                );


                sessionStorage.removeItem(
                    "officerEmail"
                );


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

    const button =
        document.getElementById(
            "logoutButton"
        );


    if (!button) {

        console.warn(
            "LOGOUT BUTTON NOT FOUND"
        );

        return;

    }


    button.addEventListener(
        "click",
        function(event) {

            event.preventDefault();


            /*
             * Clear session
             */

            officerLoggedIn =
                false;


            sessionStorage.removeItem(
                "officerLoggedIn"
            );


            sessionStorage.removeItem(
                "officerEmail"
            );


            /*
             * Clear login fields
             */

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


            /*
             * Reset portal email
             */

            const loggedEmail =
                document.getElementById(
                    "loggedOfficerEmail"
                );


            if (loggedEmail) {

                loggedEmail.textContent =
                    "Officer";

            }


            updateNavigation();


            /*
             * Return home
             */

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

    const button =
        document.getElementById(
            "civilianSubmit"
        );


    if (!button) {

        console.warn(
            "CIVILIAN SUBMIT BUTTON NOT FOUND"
        );

        return;

    }


    button.addEventListener(
        "click",
        function(event) {

            event.preventDefault();


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


            if (
                !name ||
                !examiner ||
                !result
            ) {

                return;

            }


            const nameValue =
                name.value.trim();


            const examinerValue =
                examiner.value.trim();


            /*
             * Applicant information
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
             * Check all civilian answers
             */

            const answers =
                document.querySelectorAll(
                    "#civilianQuestions textarea"
                );


            let answered =
                0;


            answers.forEach(function(answer) {

                if (
                    answer.value.trim()
                ) {

                    answered++;

                }

            });


            /*
             * Make sure all questions
             * are answered.
             */

            if (
                answered < answers.length
            ) {

                showResult(
                    result,
                    "لطفاً به تمام سوالات پاسخ دهید. " +
                    "پاسخ داده شده: " +
                    answered +
                    " / " +
                    answers.length,
                    false
                );

                return;

            }


            /*
             * Success
             */

            showResult(
                result,
                "✓ Application با موفقیت ثبت شد. " +
                "تمام " +
                answers.length +
                " پاسخ دریافت شد.",
                true
            );


            result.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

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

        console.error(
            "OFFICER EXAM BUTTON NOT FOUND"
        );

        return;

    }


    /*
     * Correct answers
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


            /*
             * Must be logged in.
             */

            if (!officerLoggedIn) {

                showPage(
                    "login"
                );

                return;

            }


            let score =
                0;


            let answered =
                0;


            const total =
                Object.keys(
                    correctAnswers
                ).length;


            /*
             * Check answers
             */

            Object.keys(
                correctAnswers
            ).forEach(function(question) {

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
                        correctAnswers[question]
                    ) {

                        score++;

                    }

                }

            });


            const result =
                document.getElementById(
                    "examResult"
                );


            if (!result) {

                return;

            }


            /*
             * Not all questions answered
             */

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


            /*
             * Calculate percentage
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
             * PASS
             */

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
```
