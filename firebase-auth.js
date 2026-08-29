import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


/* =====================================================
   FIREBASE CONFIG
===================================================== */

const firebaseConfig = {
    apiKey: "AIzaSyBF6MC3yN-vaTyVDrB2ACe69NLKVEe67KU",
    authDomain: "lspd-firearms-academy.firebaseapp.com",
    projectId: "lspd-firearms-academy",
    storageBucket: "lspd-firearms-academy.firebasestorage.app",
    messagingSenderId: "699387767180",
    appId: "1:699387767180:web:53e815b3ae2f818fcecea9",
    measurementId: "G-JGQTYH8WX1"
};


/* =====================================================
   INITIALIZE
===================================================== */

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log("FIREBASE AUTH STARTED");


/* =====================================================
   LOGIN FORM
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const loginForm =
        document.getElementById("loginForm");

    if (!loginForm) {
        console.error("loginForm NOT FOUND");
        return;
    }


    /*
     * Capture the submit event before old
     * site handlers can redirect the user.
     */

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();


            const emailInput =
                document.getElementById("officerEmail");

            const passwordInput =
                document.getElementById("officerPassword");

            const result =
                document.getElementById("loginResult");


            if (!emailInput || !passwordInput) {
                console.error(
                    "Login inputs NOT FOUND"
                );
                return;
            }


            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;


            if (!email || !password) {

                if (result) {

                    result.className =
                        "result-box show danger";

                    result.textContent =
                        "لطفاً Email و Password را وارد کنید.";

                }

                return;
            }


            if (result) {

                result.className =
                    "result-box show";

                result.textContent =
                    "در حال بررسی اطلاعات ورود...";

            }


            try {

                /*
                 * Firebase checks the credentials here.
                 */

                const userCredential =
                    await signInWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );


                const user =
                    userCredential.user;


                console.log(
                    "FIREBASE LOGIN SUCCESS:",
                    user.email
                );


                if (result) {

                    result.className =
                        "result-box show success";

                    result.textContent =
                        "✅ ورود موفق بود.";

                }


                /*
                 * Only AFTER Firebase accepts the
                 * credentials do we open Officer Portal.
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
                    "FIREBASE LOGIN FAILED:",
                    error
                );


                /*
                 * Make absolutely sure the user
                 * stays on the Login page.
                 */

                if (
                    typeof window.showPage ===
                    "function"
                ) {

                    window.showPage("login");

                }


                let message =
                    "ورود ناموفق بود.";


                if (
                    error.code ===
                    "auth/invalid-credential"
                ) {

                    message =
                        "❌ ایمیل یا رمز عبور اشتباه است.";

                }

                else if (
                    error.code ===
                    "auth/user-not-found"
                ) {

                    message =
                        "❌ این Officer در Firebase وجود ندارد.";

                }

                else if (
                    error.code ===
                    "auth/wrong-password"
                ) {

                    message =
                        "❌ رمز عبور اشتباه است.";

                }

                else if (
                    error.code ===
                    "auth/too-many-requests"
                ) {

                    message =
                        "⚠️ تعداد تلاش‌های ورود بیش از حد مجاز است.";

                }

                else if (
                    error.code ===
                    "auth/network-request-failed"
                ) {

                    message =
                        "❌ اتصال به Firebase برقرار نشد.";

                }


                if (result) {

                    result.className =
                        "result-box show danger";

                    result.textContent =
                        message;

                }

            }

        },
        true
    );

});


/* =====================================================
   AUTH STATE
===================================================== */

onAuthStateChanged(
    auth,
    function (user) {

        const emailElement =
            document.getElementById(
                "loggedOfficerEmail"
            );


        if (user) {

            console.log(
                "AUTH STATE: LOGGED IN",
                user.email
            );


            if (emailElement) {

                emailElement.textContent =
                    user.email;

            }

        }

        else {

            console.log(
                "AUTH STATE: LOGGED OUT"
            );


            if (emailElement) {

                emailElement.textContent =
                    "";

            }

        }

    }
);


/* =====================================================
   LOGOUT
===================================================== */

window.logoutOfficerFirebase =
    async function () {

        try {

            await signOut(auth);

            console.log(
                "FIREBASE LOGOUT SUCCESS"
            );


            if (
                typeof window.showPage ===
                "function"
            ) {

                window.showPage("home");

            }

        } catch (error) {

            console.error(
                "LOGOUT ERROR:",
                error
            );

        }

    };


console.log(
    "FIREBASE AUTH MODULE LOADED"
);
```
