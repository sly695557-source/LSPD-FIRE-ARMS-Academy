"use strict";

/* =====================================================
   LSPD FIREARMS ACADEMY
   STABLE / NO FIREBASE VERSION
===================================================== */

console.log("LSPD SCRIPT START");


/* =====================================================
   OFFICER LOGIN
===================================================== */

const DEMO_EMAIL = "officer@lspd.local";
const DEMO_PASSWORD = "LSPD123";

let officerLoggedIn = false;


/* =====================================================
   PAGE SYSTEM
===================================================== */

function showPage(pageId) {

    console.log("SHOW PAGE:", pageId);

    const protectedPages = [
        "officerPanelPage",
        "officerExam"
    ];

    /*
     * Officer-only pages
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
            "PAGE NOT FOUND:",
            pageId
        );

        return;

    }


    target.classList.add("active");


    updateNavigation();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/*
 * Make showPage available globally
 */

window.showPage = showPage;


/* =====================================================
   NAVIGATION
===================================================== */

function setupNavigation() {

    /*
     * Event delegation
     * This catches every button containing data-page,
     * even if elements are added later.
     */

    document.addEventListener(
        "click",
        function(event) {

            const button =
                event.target.closest(
                    "[data-page]"
                );


            if (!button) {

                return;

            }


            event.preventDefault();
            event.stopPropagation();


            const pageId =
                button.getAttribute(
                    "data-page"
                );


            if (!pageId) {

                return;

            }


            console.log(
                "BUTTON CLICK:",
                pageId
            );


            showPage(pageId);

        },
        false
    );

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
   HANDBOOK ACCORDION
===================================================== */

function setupHandbook() {

    const cards =
        document.querySelectorAll(
            ".handbook-card"
        );


    console.log(
        "HANDBOOK CARDS:",
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

        content.style.display = "none";


        /*
         * Make title clickable
         */

        title.style.cursor = "pointer";


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
                 * Close all cards
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
                 * Open selected card
                 */

                if (!isOpen) {

                    card.classList.add(
                        "open"
                    );


                    content.style.display =
                        "block";

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

            if (!email || !password) {

                showResult(
                    result,
                    "لطفاً Email و Password را وارد کنید.",
                    false
                );

                return;

            }


            /*
             * Check demo account
             */

            if (
                email.toLowerCase() ===
                DEMO_EMAIL.toLowerCase()
                &&
                password ===
                DEMO_PASSWORD
            ) {

                officerLoggedIn = true;


                /*
                 * Save login locally
                 */

                try {

                    localStorage.setItem(
                        "lspdOfficerLoggedIn",
                        "true"
                    );

                    localStorage.setItem(
                        "lspdOfficerEmail",
                        email
                    );

                }

                catch(error) {

                    console.warn(
                        "LocalStorage unavailable"
                    );

                }


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


                updateNavigation();


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

                officerLoggedIn = false;


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
   RESTORE LOGIN
===================================================== */

function restoreLogin() {

    try {

        const saved =
            localStorage.getItem(
                "lspdOfficerLoggedIn"
            );


        const savedEmail =
            localStorage.getItem(
                "lspdOfficerEmail"
            );


        if (
            saved === "true" &&
            savedEmail
        ) {

            officerLoggedIn = true;


            const loggedEmail =
                document.getElementById(
                    "loggedOfficerEmail"
                );


            if (loggedEmail) {

                loggedEmail.textContent =
                    savedEmail;

            }

        }

    }

    catch(error) {

        console.warn(
            "Could not restore login"
        );

    }

}


/* =====================================================
   LOGOUT
===================================================== */

function setupLogout() {

    /*
     * Event delegation
     * So logout still works even if the portal changes.
     */

    document.addEventListener(
        "click",
        function(event) {

            const button =
                event.target.closest(
                    "#logoutButton"
                );


            if (!button) {

                return;

            }


            event.preventDefault();
            event.stopPropagation();


            officerLoggedIn = false;


            try {

                localStorage.removeItem(
                    "lspdOfficerLoggedIn"
                );

                localStorage.removeItem(
                    "lspdOfficerEmail"
                );

            }

            catch(error) {

                console.warn(
                    "Could not clear localStorage"
                );

            }


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


            updateNavigation();


            showPage("home");

        },
        false
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

        console.error(
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

                console.error(
                    "Civilian elements missing"
                );

                return;

            }


            const nameValue =
                name.value.trim();


            const examinerValue =
                examiner.value.trim();


            /*
             * Check applicant information
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
             * Find all civilian answers
             */

            const answers =
                document.querySelectorAll(
                    "#civilianQuestions textarea"
                );


            let answered = 0;


            answers.forEach(
                function(textarea) {

                    if (
                        textarea.value.trim()
                    ) {

                        answered++;

                    }

                }
            );


            /*
             * All questions must be answered
             */

            if (
                answers.length > 0 &&
                answered < answers.length
            ) {

                showResult(
                    result,
                    "لطفاً به تمام سوالات پاسخ دهید. " +
                    answered +
                    " / " +
                    answers.length +
                    " پاسخ تکمیل شده است.",
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
                "تمام پاسخ‌ها دریافت شدند.",
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
             * Officer must be logged in
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


            /*
             * Check every question
             */

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
             * Incomplete exam
             */

            if (answered < total) {

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
             * Calculate score
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

            if (percentage >= 80) {

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
             * FAIL
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
   RESULT
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
   BACKGROUND CLICK FIX
===================================================== */

function fixBackgroundLayers() {

    const backgroundElements = [
        ".background-grid",
        ".background-glow"
    ];


    backgroundElements.forEach(
        function(selector) {

            document
                .querySelectorAll(selector)
                .forEach(
                    function(element) {

                        element.style.pointerEvents =
                            "none";

                    }
                );

        }
    );

}


/* =====================================================
   BUTTON SAFETY
===================================================== */

function fixButtons() {

    document
        .querySelectorAll("button")
        .forEach(
            function(button) {

                button.style.pointerEvents =
                    "auto";

                button.style.cursor =
                    "pointer";

            }
        );

}


/* =====================================================
   INITIALIZATION
===================================================== */

function initializeLSPD() {

    console.log(
        "LSPD INITIALIZING..."
    );


    /*
     * Fix background overlays FIRST
     */

    fixBackgroundLayers();


    /*
     * Make buttons clickable
     */

    fixButtons();


    /*
     * Restore officer login
     */

    restoreLogin();


    /*
     * Setup all systems
     */

    setupNavigation();

    setupHandbook();

    setupLogin();

    setupLogout();

    setupCivilian();

    setupOfficerExam();

    setupDate();


    /*
     * Update status
     */

    updateNavigation();


    /*
     * Start on home
     */

    showPage("home");


    console.log(
        "LSPD WEBSITE READY ✓"
    );

}


/* =====================================================
   START
===================================================== */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeLSPD
    );

}

else {

    initializeLSPD();

}
```
