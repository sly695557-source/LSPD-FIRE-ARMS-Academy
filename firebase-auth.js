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

    authDomain:
        "lspd-firearms-academy.firebaseapp.com",

    projectId:
        "lspd-firearms-academy",

    storageBucket:
        "lspd-firearms-academy.firebasestorage.app",

    messagingSenderId:
        "699387767180",

    appId:
        "1:699387767180:web:53e815b3ae2f818fcecea9",

    measurementId:
        "G-JGQTYH8WX1"
};


/* =====================================================
   INITIALIZE FIREBASE
===================================================== */

const app =
    initializeApp(firebaseConfig);

const auth =
    getAuth(app);


/* =====================================================
   LOGIN
===================================================== */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const email =
                document
                    .getElementById("officerEmail")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("officerPassword")
                    .value;


            const result =
                document.getElementById(
                    "loginResult"
                );


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
                    "در حال ورود...";

            }


            try {

                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


                if (result) {

                    result.className =
                        "result-box show success";

                    result.textContent =
                        "✅ ورود موفق بود.";

                }


                /*
                 * Navigation is handled by index.html.
                 * Firebase only handles authentication.
                 */

                if (
                    typeof window.firebaseLoginSuccess ===
                    "function"
                ) {

                    window.firebaseLoginSuccess(
                        email
                    );

                }


            } catch (error) {

                console.error(
                    "Firebase Login Error:",
                    error
                );


                let message =
                    "ورود ناموفق بود.";


                if (
                    error.code ===
                    "auth/invalid-credential"
                ) {

                    message =
                        "ایمیل یا رمز عبور اشتباه است.";

                }

                else if (
                    error.code ===
                    "auth/user-not-found"
                ) {

                    message =
                        "این Officer در Firebase وجود ندارد.";

                }

                else if (
                    error.code ===
                    "auth/wrong-password"
                ) {

                    message =
                        "رمز عبور اشتباه است.";

                }

                else if (
                    error.code ===
                    "auth/too-many-requests"
                ) {

                    message =
                        "تلاش‌های ورود بیش از حد مجاز بوده است.";

                }

                else if (
                    error.code ===
                    "auth/network-request-failed"
                ) {

                    message =
                        "اتصال به Firebase برقرار نشد.";

                }


                if (result) {

                    result.className =
                        "result-box show danger";

                    result.textContent =
                        message;

                }

            }

        }
    );

}


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
                "Firebase Officer Logged In:",
                user.email
            );


            if (emailElement) {

                emailElement.textContent =
                    user.email;

            }


            /*
             * Tell index.html that Firebase login
             * was successful.
             */

            if (
                typeof window.firebaseLoginSuccess ===
                "function"
            ) {

                window.firebaseLoginSuccess(
                    user.email
                );

            }

        }

        else {

            console.log(
                "No Firebase Officer Logged In."
            );


            if (emailElement) {

                emailElement.textContent =
                    "Officer";

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
                "Firebase Officer Logged Out."
            );


            if (
                typeof window.firebaseLogoutSuccess ===
                "function"
            ) {

                window.firebaseLogoutSuccess();

            }


        } catch (error) {

            console.error(
                "Firebase Logout Error:",
                error
            );

        }

    };


console.log(
    "FIREBASE AUTH MODULE LOADED"
);
```
