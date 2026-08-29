"use strict";

/*
========================================================
 LSPD FIREARMS ACADEMY
 STABLE JAVASCRIPT
========================================================
*/

console.log("LSPD SCRIPT START");


/* =====================================================
   CONFIG
===================================================== */

const OFFICER_EMAIL = "officer@lspd.local";
const OFFICER_PASSWORD = "LSPD123";

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
    اگر صفحه Officer باشد و Login نکرده باشیم
    */

    if (
        protectedPages.includes(pageId) &&
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


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


window.showPage = showPage;


/* =====================================================
   NAVIGATION
   مهم:
   Event Delegation
   بنابراین حتی اگر دکمه‌ها بعداً تغییر کنند
   باز هم کار می‌کنند.
===================================================== */

function setupNavigation() {

    document.addEventListener(
        "click",
        function(event) {

            const button =
                event.target.closest("[data-page]");


            if (!button) {
                return;
            }


            event.preventDefault();
            event.stopPropagation();


            const pageId =
                button.getAttribute("data-page");


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
   HANDBOOK
===================================================== */

function setupHandbook() {

    /*
    Event Delegation برای Handbook
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
            بستن همه
            */

            document
                .querySelectorAll(
                    ".handbook-card"
                )
                .forEach(function(item) {

                    item.classList.remove(
                        "open"
                    );

                    const itemContent =
                        item.querySelector(
                            ".handbook-content"
                        );


                    if (itemContent) {

                        itemContent.style.display =
                            "none";

                    }

                });


            /*
            اگر بسته بوده بازش کن
            */

            if (!isOpen) {

                card.classList.add(
                    "open"
                );

                content.style.display =
                    "block";


                setTimeout(function() {

                    card.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest"
                    });

                }, 80);

            }

        },
        false
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
            "LOGIN FORM NOT FOUND"
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
                emailInput.value
                    .trim()
                    .toLowerCase();


            const password =
                passwordInput.value;


            /*
            خالی بودن
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
            بررسی اطلاعات Demo
            */

            if (
                email ===
                OFFICER_EMAIL.toLowerCase()
                &&
                password ===
                OFFICER_PASSWORD
            ) {

                /*
                LOGIN SUCCESS
                */

                officerLoggedIn = true;


                const loggedOfficer =
                    document.getElementById(
                        "loggedOfficerEmail"
                    );


                if (loggedOfficer) {

                    loggedOfficer.textContent =
                        OFFICER_EMAIL;

                }


                updateNavigation();


                showResult(
                    result,
                    "✓ Authentication Successful",
                    true
                );


                /*
                مستقیماً Portal
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

                /*
                LOGIN FAILED
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


            const loggedOfficer =
                document.getElementById(
                    "loggedOfficerEmail"
                );


            if (loggedOfficer) {

                loggedOfficer.textContent =
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
                document.querySelectorAll(
                    "#civilianQuestions textarea"
                );


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


            if (
                answered !== answers.length
            ) {

                showResult(
                    result,
                    "لطفاً به تمام 20 سؤال پاسخ دهید. " +
                    answered +
                    " / " +
                    answers.length +
                    " پاسخ داده شده است.",
                    false
                );

                return;

            }


            showResult(
                result,
                "✓ Application با موفقیت ثبت شد. تمام پاسخ‌ها دریافت شد.",
                true
            );

        },
        false
    );

}


/* =====================================================
   OFFICER EXAM
===================================================== */

function setupOfficerExam() {

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


            /*
            Security check
            */

            if (!officerLoggedIn) {

                showPage("login");

                return;

            }


            let score = 0;
            let answered = 0;


            const total =
                Object.keys(
                    correctAnswers
                ).length;


            for (
                const question
                in correctAnswers
            ) {

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


            const result =
                document.getElementById(
                    "examResult"
                );


            if (!result) {
                return;
            }


            /*
            همه سوالات باید جواب داده شوند
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
        ).padStart(2, "0");


    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


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

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "LSPD DOM READY"
        );


        try {
            setupNavigation();
        }
        catch (error) {
            console.error(
                "Navigation Error:",
                error
            );
        }


        try {
            setupHandbook();
        }
        catch (error) {
            console.error(
                "Handbook Error:",
                error
            );
        }


        try {
            setupLogin();
        }
        catch (error) {
            console.error(
                "Login Error:",
                error
            );
        }


        try {
            setupLogout();
        }
        catch (error) {
            console.error(
                "Logout Error:",
                error
            );
        }


        try {
            setupCivilian();
        }
        catch (error) {
            console.error(
                "Civilian Error:",
                error
            );
        }


        try {
            setupOfficerExam();
        }
        catch (error) {
            console.error(
                "Exam Error:",
                error
            );
        }


        try {
            setupDate();
        }
        catch (error) {
            console.error(
                "Date Error:",
                error
            );
        }


        updateNavigation();


        showPage("home");


        console.log(
            "LSPD WEBSITE READY ✓"
        );

    },
    false
);
```
