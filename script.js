"use strict";

/*
=========================================================
 LSPD FIREARMS ACADEMY
 CLEAN / STABLE JAVASCRIPT
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
   OFFICER EXAM ANSWERS
===================================================== */

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


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showPage(pageId) {

    const protectedPages = [
        "officerPanelPage",
        "officerExam"
    ];

    /*
       اگر Officer Login نکرده باشد،
       اجازه ورود به صفحات محافظت‌شده داده نمی‌شود.
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


    updateNavigation();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/*
   برای سازگاری با HTMLهای قدیمی
*/

window.showPage = showPage;


/* =====================================================
   NAVIGATION
===================================================== */

function setupNavigation() {

    /*
       Event Delegation

       به جای اینکه برای تک تک buttonها
       Event جدا بسازیم، روی document گوش می‌دهیم.

       بنابراین تمام data-page ها کار خواهند کرد.
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


            const pageId =
                button.getAttribute(
                    "data-page"
                );


            if (!pageId) {
                return;
            }


            console.log(
                "LSPD NAVIGATION:",
                pageId
            );


            showPage(pageId);

        }
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
   HANDBOOK
===================================================== */

function setupHandbook() {

    /*
       Event Delegation برای Handbook

       هر h3 داخل handbook-card کلیک شود،
       همان بخش باز می‌شود.
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


            const isOpen =
                card.classList.contains(
                    "open"
                );


            /*
               همه بخش‌ها بسته شوند
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
               اگر قبلاً بسته بود،
               بازش کن.
            */

            if (!isOpen) {

                card.classList.add(
                    "open"
                );


                content.style.display =
                    "block";


                setTimeout(
                    function() {

                        card.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    },
                    100
                );

            }

        }
    );

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
            "LSPD: loginForm not found."
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

                console.error(
                    "LSPD: Login inputs not found."
                );

                return;

            }


            const email =
                emailInput.value.trim();


            const password =
                passwordInput.value;


            /*
               خالی بودن اطلاعات
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
               بررسی Demo Account
            */

            if (
                email.toLowerCase() ===
                OFFICER_EMAIL.toLowerCase()
                &&
                password ===
                OFFICER_PASSWORD
            ) {

                officerLoggedIn =
                    true;


                const loggedEmail =
                    document.getElementById(
                        "loggedOfficerEmail"
                    );


                if (loggedEmail) {

                    loggedEmail.textContent =
                        OFFICER_EMAIL;

                }


                const portalStatus =
                    document.getElementById(
                        "portalStatus"
                    );


                if (portalStatus) {

                    portalStatus.textContent =
                        "● AUTHENTICATED";

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

    /*
       Event Delegation
       بنابراین logout حتی اگر DOM تغییر کند
       باز هم کار می‌کند.
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


            officerLoggedIn =
                false;


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
                    "LSPD: Civilian elements missing."
                );

                return;

            }


            const nameValue =
                name.value.trim();


            const examinerValue =
                examiner.value.trim();


            /*
               بررسی اطلاعات اولیه
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
               تمام textarea ها
            */

            const answers =
                document.querySelectorAll(
                    "#civilianQuestions textarea"
                );


            const total =
                answers.length;


            let answered = 0;


            answers.forEach(
                function(answer) {

                    if (
                        answer.value.trim()
                    ) {

                        answered++;

                    }

                }
            );


            /*
               اگر هیچ سوالی وجود نداشت
            */

            if (total === 0) {

                showResult(
                    result,
                    "سؤالات Civilian پیدا نشدند.",
                    false
                );

                return;

            }


            /*
               همه سوالات باید پاسخ داده شوند
            */

            if (
                answered < total
            ) {

                showResult(
                    result,
                    "⚠ لطفاً به تمام سوالات پاسخ دهید. " +
                    "پاسخ داده شده: " +
                    answered +
                    " / " +
                    total,
                    false
                );

                result.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

                return;

            }


            /*
               موفقیت
            */

            showResult(
                result,
                "✓ Application با موفقیت ثبت شد. " +
                "تمام " +
                total +
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


            /*
               اگر Officer Login نکرده
            */

            if (!officerLoggedIn) {

                showPage(
                    "login"
                );

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
               بررسی سوالات
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


            const result =
                document.getElementById(
                    "examResult"
                );


            if (!result) {

                console.error(
                    "LSPD: examResult not found."
                );

                return;

            }


            /*
               سوال ناقص
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
               محاسبه نمره
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
   RESULT
===================================================== */

function showResult(
    element,
    message,
    success
) {

    if (!element) {

        console.error(
            "LSPD: Result element not found."
        );

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
   RESET HANDBOOK
===================================================== */

function resetHandbook() {

    const cards =
        document.querySelectorAll(
            ".handbook-card"
        );


    cards.forEach(
        function(card) {

            card.classList.remove(
                "open"
            );


            const content =
                card.querySelector(
                    ".handbook-content"
                );


            if (content) {

                content.style.display =
                    "none";

            }

        }
    );

}


/* =====================================================
   PROTECTION
===================================================== */

function protectOfficerPages() {

    /*
       اگر کاربر با روش‌هایی مثل تغییر DOM
       بخواهد مستقیم صفحه Officer را باز کند،
       وضعیت Login بررسی می‌شود.
    */

    const current =
        document.querySelector(
            ".page-section.active"
        );


    if (!current) {
        return;
    }


    if (
        (
            current.id ===
            "officerPanelPage"
            ||
            current.id ===
            "officerExam"
        )
        &&
        !officerLoggedIn
    ) {

        showPage(
            "login"
        );

    }

}


/* =====================================================
   INITIALIZE
===================================================== */

function initializeLSPD() {

    console.log(
        "LSPD: Initializing..."
    );


    setupNavigation();

    setupHandbook();

    setupLogin();

    setupLogout();

    setupCivilian();

    setupOfficerExam();

    setupDate();

    resetHandbook();

    updateNavigation();

    showPage(
        "home"
    );


    /*
       تست وجود صفحات مهم
    */

    const requiredPages = [
        "home",
        "civilian",
        "handbook",
        "login",
        "officerPanelPage",
        "officerExam"
    ];


    requiredPages.forEach(
        function(pageId) {

            if (
                !document.getElementById(
                    pageId
                )
            ) {

                console.warn(
                    "LSPD: Missing page:",
                    pageId
                );

            }

        }
    );


    console.log(
        "LSPD: WEBSITE READY"
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
