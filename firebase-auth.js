
```javascript
// ==========================================================
// LSPD FIREARMS DIVISION
// FIREBASE AUTH ONLY
// Navigation is NOT controlled by this file
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
// FIREBASE START
// ==========================================================

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// ==========================================================
// ELEMENTS
// ==========================================================

function get(id) {
    return document.getElementById(id);
}


// ==========================================================
// SHOW / HIDE OFFICER AREA
// ==========================================================

function updateOfficerAccess(user) {

    const officerButton =
        get("officerPortalButton");

    const officerPanel =
        get("officerPanelPage");

    const officerExam =
        get("officerExam");


    if (user) {

        console.log(
            "Officer authenticated:",
            user.email
        );


        // نمایش دکمه Officer Portal

        if (officerButton) {
            officerButton.style.display = "";
        }


        // اطلاعات Officer

        const email =
            get("loggedOfficerEmail");

        if (email) {
            email.textContent =
                user.email || "";
        }


    } else {

        console.log(
            "No Officer authenticated."
        );


        // مخفی کردن دکمه Officer Portal

        if (officerButton) {
            officerButton.style.display = "none";
        }


        // مخفی کردن صفحات Officer

        if (officerPanel) {
            officerPanel.classList.remove("active");
        }

        if (officerExam) {
            officerExam.classList.remove("active");
        }

    }
}


// ==========================================================
// LOGIN
// ==========================================================

function initializeLogin() {

    const loginForm =
        get("loginForm");


    if (!loginForm) {

        console.warn(
            "loginForm not found."
        );

        return;
    }


    loginForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const emailInput =
                get("officerEmail");

            const passwordInput =
                get("officerPassword");

            const result =
                get("loginResult");


            const email =
                emailInput
                    ? emailInput.value.trim()
                    : "";

            const password =
                passwordInput
                    ? passwordInput.value
                    : "";


            if (!email || !password) {

                if (result) {
                    result.innerHTML =
                        "❌ Email و Password را وارد کنید.";
                }

                return;
            }


            if (result) {

                result.className =
                    "result-box show";

                result.innerHTML =
                    "⏳ در حال ورود...";
            }


            try {

                const credential =
                    await signInWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );


                console.log(
                    "Login successful:",
                    credential.user.email
                );


                if (result) {

                    result.className =
                        "result-box show success";

                    result.innerHTML =
                        "✅ ورود با موفقیت انجام شد.";
                }


                // رفتن به Officer Portal
                // بدون استفاده از Navigation سیستم

                setTimeout(function() {

                    if (
                        typeof window.showPage ===
                        "function"
                    ) {

                        window.showPage(
                            "officerPanelPage"
                        );

                    }

                }, 300);


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


                    case "auth/user-disabled":

                        message =
                            "❌ این حساب غیرفعال شده است.";

                        break;


                    case "auth/too-many-requests":

                        message =
                            "❌ تلاش‌های ورود بیش از حد مجاز بوده است.";

                        break;


                    case "auth/network-request-failed":

                        message =
                            "❌ اتصال به Firebase برقرار نشد.";

                        break;

                }


                if (result) {

                    result.className =
                        "result-box show danger";

                    result.innerHTML =
                        message;

                }

            }

        }
    );

}


// ==========================================================
// LOGOUT
// ==========================================================

function initializeLogout() {

    const logoutButton =
        get("logoutButton");


    if (!logoutButton) {

        console.warn(
            "logoutButton not found."
        );

        return;
    }


    logoutButton.addEventListener(
        "click",
        async function() {

            try {

                await signOut(auth);


                console.log(
                    "Officer logged out."
                );


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
                    "Logout Error:",
                    error
                );

            }

        }
    );

}


// ==========================================================
// AUTH STATE
// ==========================================================

onAuthStateChanged(
    auth,
    function(user) {

        updateOfficerAccess(user);

    }
);


// ==========================================================
// START
// ==========================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initializeLogin();

        initializeLogout();

        console.log(
            "LSPD Firebase Auth ready."
        );

    }
);
```
