
"use strict";

/*
=========================================================
 LSPD FIREARMS ACADEMY
 CLEAN / STABLE SCRIPT
 NO FIREBASE
 DEMO LOGIN
=========================================================
*/


/* =====================================================
   CONFIG
===================================================== */

const DEMO_EMAIL = "officer@lspd.local";
const DEMO_PASSWORD = "LSPD123";

let officerLoggedIn = false;


/* =====================================================
   HELPERS
===================================================== */

function $(id) {
    return document.getElementById(id);
}


function all(selector) {
    return document.querySelectorAll(selector);
}


function scrollTopPage() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


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
     * Officer pages require login
     */

    if (
        protectedPages.includes(pageId) &&
        !officerLoggedIn
    ) {
        pageId = "login";
    }


    const pages = all(".page-section");


    pages.forEach(function(page) {

        page.classList.remove("active");

        page.style.display = "none";

    });


    const target = $(pageId);


    if (!target) {

        console.error(
            "Page does not exist:",
            pageId
        );

        return;

    }


    target.classList.add("active");

    /*
     * Important:
     * The CSS normally controls display.
     * We only force block for the active page.
     */

    target.style.display = "block";


    updateNavigation();

    scrollTopPage();

}


/* Make available globally */

window.showPage = showPage;


/* =====================================================
   NAVIGATION
===================================================== */

function setupNavigation() {

    console.log("SETTING UP NAVIGATION");


    /*
     * Event delegation.
     *
     * This is more reliable than attaching a listener
     * to every individual button.
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


    console.log(
        "NAVIGATION READY:",
        all("[data-page]").length,
        "buttons"
    );

}


/* =====================================================
   NAVIGATION STATUS
===================================================== */

function updateNavigation() {

    const status =
        $("navOfficerStatus");


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
   HANDBOOK
===================================================== */

function setupHandbook() {

    console.log("SETTING UP HANDBOOK");


    /*
     * Event delegation again.
     * This prevents handbook clicks from breaking
     * if the content is changed later.
     */

    document.addEventListener(
        "click",
        function(event) {

            const title =
                event.target.closest(
                    ".handbook-card h3"
                );


            if (!title) {
                return;
            }


            const card =
                title.closest(
                    ".handbook-card"
                );


            if (!card) {
                return;
            }


            const content =
                card.querySelector(
                    ".handbook-content"
                );


            if (!content) {
                return;
            }


            event.preventDefault();


            const wasOpen =
                card.classList.contains(
                    "open"
                );


            /*
             * Close every card
             */

            all(".handbook-card").forEach(
                function(otherCard) {

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

                }
            );


            /*
             * Open selected card
             */

            if (!wasOpen) {

                card.classList.add(
                    "open"
                );

                content.style.display =
                    "block";

            }

        },
        false
    );


    console.log(
        "HANDBOOK READY:",
        all(".handbook-card").length
    );

}


/* =====================================================
   LOGIN
===================================================== */

function setupLogin() {

    const form =
        $("loginForm");


    if (!form) {

        console.error(
            "LOGIN FORM NOT FOUND"
        );

        return;

    }


    console.log(
        "LOGIN FORM FOUND"
    );


    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            event.stopPropagation();


            const emailInput =
                $("officerEmail");


            const passwordInput =
                $("officerPassword");


            const result =
                $("loginResult");


            if (
                !emailInput ||
                !passwordInput
            ) {

                console.error(
                    "LOGIN INPUTS NOT FOUND"
                );

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
                email === "" ||
                password === ""
            ) {

                showResult(
                    result,
                    "لطفاً Email و Password را وارد کنید.",
                    false
                );

                return;

            }


            console.log(
                "LOGIN ATTEMPT:",
                email
            );


            /*
             * EXACT DEMO LOGIN
             */

            if (
                email.toLowerCase() ===
                DEMO_EMAIL.toLowerCase()
                &&
                password ===
                DEMO_PASSWORD
            ) {

                /*
                 * LOGIN SUCCESS
                 */

                officerLoggedIn = true;


                const loggedEmail =
                    $("loggedOfficerEmail");


                if (loggedEmail) {

                    loggedEmail.textContent =
                        DEMO_EMAIL;

                }


                const portalStatus =
                    $("portalStatus");


                if (portalStatus) {

                    portalStatus.textContent =
                        "● AUTHENTICATED";

                }


                updateNavigation();


                showResult(
                    result,
                    "✓ ورود موفق بود. در حال ورود به Officer Portal...",
                    true
                );


                /*
                 * Small delay so user sees success
                 */

                setTimeout(
                    function() {

                        showPage(
                            "officerPanelPage"
                        );

                    },
                    500
                );


            }

            else {

                /*
                 * WRONG LOGIN
                 */

                officerLoggedIn = false;

                updateNavigation();


                showResult(
                    result,
                    "✕ Email یا Password اشتباه است.",
                    false
                );

            }

        },
        false
    );

}


/* =====================================================
   LOGOUT
===================================================== */

function setupLogout() {

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


            console.log(
                "OFFICER LOGOUT"
            );


            officerLoggedIn =
                false;


            const email =
                $("officerEmail");


            const password =
                $("officerPassword");


            if (email) {
                email.value = "";
            }


            if (password) {
                password.value = "";
            }


            const loggedEmail =
                $("loggedOfficerEmail");


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

    document.addEventListener(
        "click",
        function(event) {

            const button =
                event.target.closest(
                    "#civilianSubmit"
                );


            if (!button) {
                return;
            }


            event.preventDefault();

            event.stopPropagation();


            const name =
                $("civilianName");


            const examiner =
                $("civilianExaminer");


            const result =
                $("civilianResult");


            if (
                !name ||
                !examiner ||
                !result
            ) {

                console.error(
                    "CIVILIAN FORM ELEMENTS MISSING"
                );

                return;

            }


            const nameValue =
                name.value.trim();


            const examinerValue =
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


            const answers =
                all(
                    "#civilianQuestions textarea"
                );


            let answered = 0;


            answers.forEach(
                function(answer) {

                    if (
                        answer.value.trim() !== ""
                    ) {

                        answered++;

                    }

                }
            );


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


            showResult(
                result,
                "✓ درخواست با موفقیت ثبت شد. تمام پاسخ‌ها دریافت شدند.",
                true
            );


            result.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        },
        false
    );

}


/* =====================================================
   OFFICER EXAM
===================================================== */

function setupOfficerExam() {

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


    document.addEventListener(
        "click",
        function(event) {

            const button =
                event.target.closest(
                    "#officerExamSubmit"
                );


            if (!button) {
                return;
            }


            event.preventDefault();

            event.stopPropagation();


            /*
             * Must be logged in
             */

            if (!officerLoggedIn) {

                showPage("login");

                return;

            }


            const result =
                $("examResult");


            if (!result) {

                console.error(
                    "EXAM RESULT NOT FOUND"
                );

                return;

            }


            let score = 0;

            let answered = 0;


            const total =
                Object.keys(
                    correctAnswers
                ).length;


            Object.keys(
                correctAnswers
            ).forEach(
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
                            correctAnswers[question]
                        ) {

                            score++;

                        }

                    }

                }
            );


            /*
             * Require all questions
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
                    "<br>" +
                    "Score: " +
                    percentage +
                    "%" +
                    "<br>" +
                    score +
                    " / " +
                    total +
                    "<br>" +
                    "<small>حداقل نمره قبولی 80% است.</small>";

            }


            result.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        },
        false
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
        $("civilianDate");


    if (!date) {
        return;
    }


    const now =
        new Date();


    const year =
        now.getFullYear();


    const month =
        String(
            now.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            now.getDate()
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
   INITIALIZATION
===================================================== */

function initialize() {

    console.log(
        "================================"
    );

    console.log(
        "LSPD ACADEMY INITIALIZING"
    );

    console.log(
        "================================"
    );


    /*
     * Setup everything
     */

    setupNavigation();

    setupHandbook();

    setupLogin();

    setupLogout();

    setupCivilian();

    setupOfficerExam();

    setupDate();


    updateNavigation();


    /*
     * Start on HOME
     */

    showPage("home");


    console.log(
        "================================"
    );

    console.log(
        "LSPD ACADEMY READY"
    );

    console.log(
        "================================"
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
        initialize
    );

}

else {

    initialize();

}
```
