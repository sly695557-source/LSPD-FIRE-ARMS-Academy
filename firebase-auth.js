```javascript
// ==========================================================
// LSPD FIREARMS DIVISION
// FIREBASE AUTH ONLY
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

    apiKey:
        "AIzaSyBF6MC3yN-vaTyVDrB2ACe69NLKVEe67KU",

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
// INITIALIZE FIREBASE
// ==========================================================

let firebaseApp;

let auth;


try {

    firebaseApp =
        initializeApp(firebaseConfig);

    auth =
        getAuth(firebaseApp);

    console.log(
        "LSPD Firebase Auth initialized."
    );

} catch (error) {

    console.error(
        "Firebase initialization error:",
        error
    );

}


// ==========================================================
// HELPER
// ==========================================================

function getElement(id) {

    return document.getElementById(id);

}


// ==========================================================
// SHOW RESULT
// ==========================================================

function showLoginResult(
    message,
    success = false
) {

    const result =
        getElement("loginResult");


    if (!result) {
        return;
    }


    result.className =
        success
            ? "result-box show success"
            : "result-box show danger";


    result.innerHTML =
        message;

}


// ==========================================================
// LOGIN
// ==========================================================

async function loginOfficer(event) {

    event.preventDefault();


    if (!auth) {

        showLoginResult(
            "❌ Firebase به درستی راه‌اندازی نشده است."
        );

        return;

    }


    const emailInput =
        getElement("officerEmail");


    const passwordInput =
        getElement("officerPassword");


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

        showLoginResult(
            "❌ Email و Password را وارد کنید."
        );

        return;

    }


    showLoginResult(
        "⏳ در حال ورود..."
    );


    try {

        const credential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


        const user =
            credential.user;


        console.log(
            "Officer login successful:",
            user.email
        );


        const loggedEmail =
            getElement(
                "loggedOfficerEmail"
            );


        if (loggedEmail) {

            loggedEmail.textContent =
                user.email;

        }


        showLoginResult(
            "✅ ورود با موفقیت انجام شد.",
            true
        );


        /*
         * مهم:
         * اینجا از Firebase برای Navigation استفاده نمی‌کنیم.
         * فقط بعد از Login موفق، اگر showPage وجود داشت
         * صفحه Officer Portal باز می‌شود.
         */

        if (
            typeof window.showPage ===
            "function"
        ) {

            window.showPage(
                "officerPanelPage"
            );

        }


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
                    "❌ این Officer در Firebase وجود ندارد.";

                break;


            case "auth/wrong-password":

                message =
                    "❌ Password اشتباه است.";

                break;


            case "auth/invalid-email":

                message =
                    "❌ فرمت Email صحیح نیست.";

                break;


            case "auth/too-many-requests":

                message =
                    "❌ تلاش‌های ورود بیش از حد مجاز بوده است.";

                break;


            case "auth/network-request-failed":

                message =
                    "❌ اتصال به Firebase برقرار نشد.";

                break;


            case "auth/user-disabled":

                message =
                    "❌ این حساب Officer غیرفعال شده است.";

                break;


            default:

                message =
                    "❌ خطای Firebase:<br>" +
                    error.message;

                break;

        }


        showLoginResult(
            message
        );

    }

}


// ==========================================================
// LOGOUT
// ==========================================================

async function logoutOfficer() {

    if (!auth) {
        return;
    }


    try {

        await signOut(auth);


        console.log(
            "Officer logged out."
        );


        const loggedEmail =
            getElement(
                "loggedOfficerEmail"
            );


        if (loggedEmail) {

            loggedEmail.textContent =
                "";

        }


        const loginForm =
            getElement(
                "loginForm"
            );


        if (loginForm) {

            loginForm.reset();

        }


        showLoginResult(
            "✅ با موفقیت خارج شدید.",
            true
        );


        /*
         * Navigation همچنان مستقل است.
         */

        if (
            typeof window.showPage ===
            "function"
        ) {

            window.showPage(
                "home"
            );

        }


    } catch (error) {

        console.error(
            "Firebase Logout Error:",
            error
        );


        showLoginResult(
            "❌ خروج از حساب انجام نشد.<br>" +
            error.message
        );

    }

}


// ==========================================================
// AUTH STATE
// ==========================================================

function initializeAuthState() {

    if (!auth) {
        return;
    }


    onAuthStateChanged(
        auth,
        function(user) {

            const loggedEmail =
                getElement(
                    "loggedOfficerEmail"
                );


            if (user) {

                console.log(
                    "Firebase Auth State: LOGGED IN",
                    user.email
                );


                if (loggedEmail) {

                    loggedEmail.textContent =
                        user.email;

                }


            } else {

                console.log(
                    "Firebase Auth State: LOGGED OUT"
                );


                if (loggedEmail) {

                    loggedEmail.textContent =
                        "";

                }

            }

        }
    );

}


// ==========================================================
// INITIALIZE
// ==========================================================

function initializeFirebaseAuth() {

    const loginForm =
        getElement(
            "loginForm"
        );


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            loginOfficer
        );

    } else {

        console.warn(
            "loginForm not found."
        );

    }


    const logoutButton =
        getElement(
            "logoutButton"
        );


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            logoutOfficer
        );

    }


    initializeAuthState();


    console.log(
        "LSPD Firebase Auth ready."
    );

}


// ==========================================================
// START
// ==========================================================

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeFirebaseAuth
    );

} else {

    initializeFirebaseAuth();

}
```
