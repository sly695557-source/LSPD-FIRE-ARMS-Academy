```javascript
// ==========================================================
// LSPD FIREARMS ACADEMY
// FIREBASE OFFICER LOGIN + NAVIGATION + HANDBOOK
// ==========================================================

import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from
"https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";


// ==========================================================
// FIREBASE CONFIG
// ==========================================================

const firebaseConfig = {
    apiKey: "AIzaSyBF6MC3yN-vaTyVDrB2ACe69NLKVEe67KU",

    authDomain:
        "lspd-firearms-academy.firebaseapp.com",

    databaseURL:
        "https://lspd-firearms-academy-default-rtdb.firebaseio.com",

    projectId:
        "lspd-firearms-academy",

    storageBucket:
        "lspd-firearms-academy.firebasestorage.app",

    messagingSenderId:
        "699387767180",

    appId:
        "1:699387767180:web:0b17c5d8078636dacecea9",

    measurementId:
        "G-LW965BY152"
};


// ==========================================================
// FIREBASE INITIALIZE
// ==========================================================

let auth;

try {

    const app = initializeApp(firebaseConfig);

    auth = getAuth(app);

    console.log("Firebase Authentication connected.");

} catch (error) {

    console.error(
        "Firebase initialization error:",
        error
    );

}


// ==========================================================
// PAGE NAVIGATION
// ==========================================================

function showPage(pageId) {

    const pages =
        document.querySelectorAll(".page-section");

    pages.forEach(page => {
        page.classList.remove("active");
    });

    const target =
        document.getElementById(pageId);

    if (!target) {

        console.error(
            "Page not found:",
            pageId
        );

        return;
    }

    target.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    console.log(
        "Opened page:",
        pageId
    );
}


// ==========================================================
// NAVIGATION BUTTONS
// ==========================================================

function setupNavigation() {

    const buttons =
        document.querySelectorAll("[data-page]");

    buttons.forEach(button => {

        button.addEventListener("click", function () {

            const page =
                this.getAttribute("data-page");

            if (page) {
                showPage(page);
            }

        });

    });

    console.log(
        "Navigation buttons:",
        buttons.length
    );
}


// ==========================================================
// HANDBOOK ACCORDION
// ==========================================================

function setupHandbook() {

    const cards =
        document.querySelectorAll(".handbook-card");

    cards.forEach(card => {

        const title =
            card.querySelector("h3");

        const content =
            card.querySelector(".handbook-content");

        if (!title || !content) {
            return;
        }

        content.style.display = "none";

        title.style.cursor = "pointer";

        title.addEventListener("click", function () {

            const isOpen =
                content.style.display === "block";

            // Close all
            cards.forEach(otherCard => {

                const otherContent =
                    otherCard.querySelector(
                        ".handbook-content"
                    );

                if (otherContent) {
                    otherContent.style.display = "none";
                }

            });

            // Open selected
            if (!isOpen) {

                content.style.display = "block";

            }

        });

    });

    console.log(
        "Handbook sections:",
        cards.length
    );
}


// ==========================================================
// FIREBASE OFFICER LOGIN
// ==========================================================

async function officerLogin(event) {

    event.preventDefault();

    const emailInput =
        document.getElementById("officerEmail");

    const passwordInput =
        document.getElementById("officerPassword");

    const result =
        document.getElementById("loginResult");

    if (!emailInput || !passwordInput) {

        console.error(
            "Login inputs not found."
        );

        return;
    }

    const email =
        emailInput.value.trim();

    const password =
        passwordInput.value;

    if (!email || !password) {

        if (result) {

            result.innerHTML =
                '<div class="danger">❌ Email و Password را وارد کنید.</div>';

        }

        return;
    }

    if (!auth) {

        if (result) {

            result.innerHTML =
                '<div class="danger">❌ اتصال Firebase برقرار نشده است.</div>';

        }

        return;
    }

    try {

        if (result) {

            result.innerHTML =
                "⏳ در حال ورود...";

        }

        const credential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

        const user =
            credential.user;

        console.log(
            "Officer logged in:",
            user.email
        );

        const officerEmail =
            document.getElementById(
                "loggedOfficerEmail"
            );

        if (officerEmail) {

            officerEmail.textContent =
                user.email;

        }

        if (result) {

            result.innerHTML =
                '<div class="success">✅ ورود موفق بود.</div>';

        }

        // Open officer portal
        showPage("officerPanelPage");

    } catch (error) {

        console.error(
            "Firebase Login Error:",
            error
        );

        let message =
            "❌ ورود ناموفق بود.";

        switch (error.code) {

            case "auth/invalid-credential":

                message =
                    "❌ Email یا Password اشتباه است.";

                break;

            case "auth/user-not-found":

                message =
                    "❌ این حساب Officer در Firebase وجود ندارد.";

                break;

            case "auth/wrong-password":

                message =
                    "❌ Password اشتباه است.";

                break;

            case "auth/invalid-email":

                message =
                    "❌ Email واردشده معتبر نیست.";

                break;

            case "auth/user-disabled":

                message =
                    "❌ این حساب توسط Firebase غیرفعال شده است.";

                break;

            case "auth/too-many-requests":

                message =
                    "❌ تلاش‌های ورود بیش از حد بوده. کمی بعد دوباره امتحان کنید.";

                break;

            case "auth/network-request-failed":

                message =
                    "❌ اتصال اینترنت یا Firebase مشکل دارد.";

                break;

            default:

                message =
                    "❌ خطا در ورود: " +
                    error.message;

        }

        if (result) {

            result.innerHTML =
                `<div class="danger">${message}</div>`;

        }

    }

}


// ==========================================================
// FIREBASE AUTH STATE
// ==========================================================

function setupAuthState() {

    if (!auth) {
        return;
    }

    onAuthStateChanged(
        auth,
        user => {

            const emailElement =
                document.getElementById(
                    "loggedOfficerEmail"
                );

            if (user) {

                console.log(
                    "Current Officer:",
                    user.email
                );

                if (emailElement) {

                    emailElement.textContent =
                        user.email;

                }

            } else {

                console.log(
                    "No Officer logged in."
                );

                if (emailElement) {

                    emailElement.textContent =
                        "";
                }

            }

        }
    );

}


// ==========================================================
// LOGOUT
// ==========================================================

async function officerLogout() {

    if (!auth) {
        return;
    }

    try {

        await signOut(auth);

        console.log(
            "Officer logged out."
        );

        showPage("home");

        const result =
            document.getElementById(
                "loginResult"
            );

        if (result) {

            result.innerHTML =
                '<div class="success">✅ با موفقیت خارج شدید.</div>';

        }

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );

    }

}


// ==========================================================
// LOGIN FORM EVENT
// ==========================================================

function setupLogin() {

    const loginForm =
        document.getElementById(
            "loginForm"
        );

    if (!loginForm) {

        console.error(
            "loginForm not found."
        );

        return;
    }

    loginForm.addEventListener(
        "submit",
        officerLogin
    );

    console.log(
        "Officer Login connected."
    );

}


// ==========================================================
// LOGOUT BUTTON
// ==========================================================

function setupLogout() {

    const logoutButton =
        document.getElementById(
            "logoutButton"
        );

    if (!logoutButton) {
        return;
    }

    logoutButton.addEventListener(
        "click",
        officerLogout
    );

}


// ==========================================================
// START WEBSITE
// ==========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "================================"
        );

        console.log(
            "LSPD FIREARMS ACADEMY"
        );

        console.log(
            "Starting..."
        );

        console.log(
            "================================"
        );

        setupNavigation();

        setupHandbook();

        setupLogin();

        setupLogout();

        setupAuthState();

        console.log(
            "LSPD Academy ready."
        );

    }
);
```
