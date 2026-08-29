"use strict";


/* =====================================================
   CONFIG
===================================================== */

const LOGIN_EMAIL =
    "officer@example.local";

const LOGIN_PASSWORD =
    "Academy123";


const STORAGE_LOGIN =
    "academy_logged_in";

const STORAGE_EMAIL =
    "academy_email";


/* =====================================================
   STATE
===================================================== */

let loggedIn =
    sessionStorage.getItem(
        STORAGE_LOGIN
    ) === "true";


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showPage(pageId) {

    /*
     * Protected pages
     */

    const protectedPages = [
        "dashboard",
        "test"
    ];


    /*
     * Prevent unauthorized access
     */

    if (
        protectedPages.includes(pageId) &&
        !loggedIn
    ) {

        pageId = "login";

    }


    /*
     * Hide all pages
     */

    document
        .querySelectorAll(".page-section")
        .forEach(function(page) {

            page.classList.remove("active");

        });


    /*
     * Find target
     */

    const target =
        document.getElementById(pageId);


    if (!target) {

        console.error(
            "Page not found:",
            pageId
        );

        return;

    }


    /*
     * Show target
     */

    target.classList.add("active");


    /*
     * Scroll
     */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    updateStatus();

}


window.showPage = showPage;


/* =====================================================
   NAVIGATION BUTTONS
===================================================== */

function setupNavigation() {

    const buttons =
        document.querySelectorAll(
            "[data-page]"
        );


    console.log(
        "Buttons found:",
        buttons.length
    );


    buttons.forEach(function(button) {

        button.addEventListener(
            "click",
            function(event) {

                event.preventDefault();


                const page =
                    button.dataset.page;


                if (!page) {

                    return;

                }


                showPage(page);

            }
        );

    });

}


/* =====================================================
   STATUS
===================================================== */

function updateStatus() {

    const status =
        document.getElementById(
            "status"
        );


    if (!status) {

        return;

    }


    if (loggedIn) {

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
   LOGIN
===================================================== */

function setupLogin() {

    const form =
        document.getElementById(
            "loginForm"
        );


    if (!form) {

        console.error(
            "Login form not found."
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


            const email =
                emailInput.value.trim();


            const password =
                passwordInput.value;


            /*
             * Check credentials
             */

            if (
                email.toLowerCase() ===
                    LOGIN_EMAIL.toLowerCase()
                &&
                password ===
                    LOGIN_PASSWORD
            ) {

                loggedIn = true;


                sessionStorage.setItem(
                    STORAGE_LOGIN,
                    "true"
                );


                sessionStorage.setItem(
                    STORAGE_EMAIL,
                    email
                );


                /*
                 * Update dashboard email
                 */

                const loggedEmail =
                    document.getElementById(
                        "loggedEmail"
                    );


                if (loggedEmail) {

                    loggedEmail.textContent =
                        email;

                }


                showMessage(
                    result,
                    "✓ ورود موفق بود.",
                    true
                );


                updateStatus();


                /*
                 * IMPORTANT:
                 * Go directly to dashboard.
                 */

                setTimeout(
                    function() {

                        showPage(
                            "dashboard"
                        );

                    },
                    250
                );

            }

            else {

                loggedIn = false;


                sessionStorage.removeItem(
                    STORAGE_LOGIN
                );


                sessionStorage.removeItem(
                    STORAGE_EMAIL
                );


                showMessage(
                    result,
                    "✕ Email یا Password اشتباه است.",
                    false
                );


                updateStatus();

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

        return;

    }


    button.addEventListener(
        "click",
        function(event) {

            event.preventDefault();


            loggedIn = false;


            sessionStorage.removeItem(
                STORAGE_LOGIN
            );


            sessionStorage.removeItem(
                STORAGE_EMAIL
            );


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


            updateStatus();


            showPage(
                "home"
            );

        }
    );

}


/* =====================================================
   RESTORE SESSION
===================================================== */

function restoreSession() {

    if (!loggedIn) {

        return;

    }


    const savedEmail =
        sessionStorage.getItem(
            STORAGE_EMAIL
        );


    const loggedEmail =
        document.getElementById(
            "loggedEmail"
        );


    if (
        loggedEmail &&
        savedEmail
    ) {

        loggedEmail.textContent =
            savedEmail;

    }


    updateStatus();

}


/* =====================================================
   APPLICATION
===================================================== */

function setupApplication() {

    const button =
        document.getElementById(
            "applicationSubmit"
        );


    if (!button) {

        return;

    }


    button.addEventListener(
        "click",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "appName"
                );


            const message =
                document.getElementById(
                    "appMessage"
                );


            const result =
                document.getElementById(
                    "applicationResult"
                );


            if (
                !name.value.trim() ||
                !message.value.trim()
            ) {

                showMessage(
                    result,
                    "لطفاً تمام اطلاعات را وارد کنید.",
                    false
                );

                return;

            }


            showMessage(
                result,
                "✓ Application با موفقیت ثبت شد.",
                true
            );

        }
    );

}


/* =====================================================
   HANDBOOK
===================================================== */

function setupHandbook() {

    const cards =
        document.querySelectorAll(
            ".handbook-card"
        );


    cards.forEach(function(card) {

        const button =
            card.querySelector(
                ".handbook-title"
            );


        const content =
            card.querySelector(
                ".handbook-content"
            );


        if (
            !button ||
            !content
        ) {

            return;

        }


        /*
         * Initial state
         */

        content.style.display =
            "none";


        button.addEventListener(
            "click",
            function(event) {

                event.preventDefault();


                const isOpen =
                    card.classList.contains(
                        "open"
                    );


                /*
                 * Close all
                 */

                document
                    .querySelectorAll(
                        ".handbook-card"
                    )
                    .forEach(function(other) {

                        other.classList.remove(
                            "open"
                        );


                        const otherContent =
                            other.querySelector(
                                ".handbook-content"
                            );


                        if (otherContent) {

                            otherContent.style.display =
                                "none";

                        }

                    });


                /*
                 * Open selected
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
   TEST
===================================================== */

function setupTest() {

    const button =
        document.getElementById(
            "testSubmit"
        );


    if (!button) {

        return;

    }


    const answers = {

        q1: "B",
        q2: "B",
        q3: "A",
        q4: "C",
        q5: "B"

    };


    button.addEventListener(
        "click",
        function(event) {

            event.preventDefault();


            /*
             * Login required
             */

            if (!loggedIn) {

                showPage(
                    "login"
                );

                return;

            }


            let score = 0;

            let answered = 0;


            const total =
                Object.keys(
                    answers
                ).length;


            Object.keys(
                answers
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
                        answers[question]
                    ) {

                        score++;

                    }

                }

            });


            const result =
                document.getElementById(
                    "testResult"
                );


            /*
             * Incomplete
             */

            if (
                answered < total
            ) {

                showMessage(
                    result,
                    "لطفاً به تمام سوالات پاسخ دهید. " +
                    answered +
                    " / " +
                    total,
                    false
                );

                return;

            }


            const percentage =
                Math.round(
                    score /
                    total *
                    100
                );


            /*
             * Result
             */

            if (
                percentage >= 80
            ) {

                showMessage(
                    result,
                    "✓ PASS — Score: " +
                    percentage +
                    "% (" +
                    score +
                    "/" +
                    total +
                    ")",
                    true
                );

            }

            else {

                showMessage(
                    result,
                    "✕ FAIL — Score: " +
                    percentage +
                    "% (" +
                    score +
                    "/" +
                    total +
                    ")",
                    false
                );

            }


            result.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }
    );

}


/* =====================================================
   MESSAGE
===================================================== */

function showMessage(
    element,
    message,
    success
) {

    if (!element) {

        return;

    }


    element.textContent =
        message;


    element.classList.add(
        "show"
    );


    element.classList.remove(
        "success",
        "danger"
    );


    element.classList.add(
        success
            ? "success"
            : "danger"
    );

}


/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "ACADEMY SCRIPT STARTED"
        );


        setupNavigation();

        setupLogin();

        setupLogout();

        setupApplication();

        setupHandbook();

        setupTest();

        restoreSession();

        updateStatus();


        /*
         * Start page
         */

        if (loggedIn) {

            showPage(
                "dashboard"
            );

        }

        else {

            showPage(
                "home"
            );

        }


        console.log(
            "ACADEMY READY"
        );

    }
);
```
