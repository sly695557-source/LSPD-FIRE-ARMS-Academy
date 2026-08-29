```javascript
// ==========================================================
// LSPD FIREARMS ACADEMY
// FIREBASE LOGIN ONLY
// Navigation سایت به این فایل وابسته نیست.
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

let auth = null;

try {

    const app = initializeApp(firebaseConfig);

    auth = getAuth(app);

    console.log("Firebase Auth connected.");

} catch (error) {

    console.error(
        "Firebase Auth initialization error:",
        error
    );

}


// ==========================================================
// LOGIN
// ==========================================================

async function firebaseLogin(event) {

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

            result.textContent =
                "❌ Email و Password را وارد کنید.";

            result.className =
                "result-box show danger";
        }

        return;
    }


    if (!auth) {

        if (result) {

            result.textContent =
                "❌ Firebase متصل نشده است.";

            result.className =
                "result-box show danger";
        }

        return;
    }


    if (result) {

        result.textContent =
            "در حال ورود...";

        result.className =
            "result-box show";
    }


    try {

        const credential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


        console.log(
            "Officer login successful:",
            credential.user.email
        );


        if (result) {

            result.textContent =
                "✅ ورود موفق بود.";

            result.className =
                "result-box show success";
        }


        // صفحه Officer فقط بعد از Login
        if (typeof window.showPage === "function") {

            window.showPage(
                "officerPanelPage"
            );

        } else {

            console.warn(
                "showPage function is not available."
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


            case "auth/invalid-email":

                message =
                    "❌ فرمت Email صحیح نیست.";

                break;


            case "auth/user-not-found":

                message =
                    "❌ این Officer در Firebase وجود ندارد.";

                break;


            case "auth/wrong-password":

                message =
                    "❌ Password اشتباه است.";

                break;


            case "auth/too-many-requests":

                message =
                    "❌ تعداد تلاش‌های ورود بیش از حد مجاز است.";

                break;


            case "auth/network-request-failed":

                message =
                    "❌ اتصال به Firebase برقرار نشد.";

                break;


            default:

                message =
                    "❌ خطای Firebase: " +
                    error.code;

        }


        if (result) {

            result.textContent =
                message;

            result.className =
                "result-box show danger";
        }

    }

}


// ==========================================================
// LOGOUT
// ==========================================================

async function firebaseLogout() {

    if (!auth) {
        return;
    }


    try {

        await signOut(auth);

        console.log(
            "Officer logged out."
        );


        if (typeof window.showPage === "function") {

            window.showPage(
                "home"
            );

        }

    } catch (error) {

        console.error(
            "Logout error:",
            error
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

            const emailElement =
                document.getElementById(
                    "loggedOfficerEmail"
                );


            if (user) {

                console.log(
                    "Authenticated Officer:",
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
// START FIREBASE AUTH
// ==========================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const loginForm =
            document.getElementById(
                "loginForm"
            );


        if (loginForm) {

            loginForm.addEventListener(
                "submit",
                firebaseLogin
            );

        }


        const logoutButton =
            document.getElementById(
                "logoutButton"
            );


        if (logoutButton) {

            logoutButton.addEventListener(
                "click",
                firebaseLogout
            );

        }


        initializeAuthState();


        console.log(
            "LSPD Firebase Login module ready."
        );

    }
);
```
