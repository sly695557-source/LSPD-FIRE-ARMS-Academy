```javascript
// ==========================================================
// ACADEMY PORTAL - COMPLETE SCRIPT
// Firebase Authentication + Realtime Database
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

import {
    getDatabase,
    ref,
    set,
    serverTimestamp
} from
"https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";


// ==========================================================
// FIREBASE CONFIG
// ==========================================================

const firebaseConfig = {
    apiKey: "AIzaSyBF6MC3yN-vaTyVDrB2ACe69NLKVEe67KU",
    authDomain: "lspd-firearms-academy.firebaseapp.com",
    databaseURL: "https://lspd-firearms-academy-default-rtdb.firebaseio.com",
    projectId: "lspd-firearms-academy",
    storageBucket: "lspd-firearms-academy.firebasestorage.app",
    messagingSenderId: "699387767180",
    appId: "1:699387767180:web:0b17c5d8078636dacecea9",
    measurementId: "G-LW965BY152"
};


// ==========================================================
// INITIALIZE FIREBASE
// ==========================================================

let app;
let auth;
let database;

try {

    app = initializeApp(firebaseConfig);

    auth = getAuth(app);

    database = getDatabase(app);

    console.log("Firebase connected.");

} catch (error) {

    console.error("Firebase initialization error:", error);

}


// ==========================================================
// PAGE NAVIGATION
// ==========================================================

function showPage(pageId) {

    const pages =
        document.querySelectorAll(".page-section");

    pages.forEach(function(page) {
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

}


// ==========================================================
// NAVIGATION BUTTONS
// ==========================================================

function initializeNavigation() {

    const buttons =
        document.querySelectorAll("[data-page]");

    console.log(
        "Navigation buttons:",
        buttons.length
    );

    buttons.forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                const page =
                    button.getAttribute("data-page");

                if (!page) {
                    return;
                }

                // Officer portal is protected
                if (
                    page === "officerPanelPage" ||
                    page === "officerExam"
                ) {

                    if (
                        !auth ||
                        !auth.currentUser
                    ) {

                        showPage("login");

                        return;
                    }
                }

                showPage(page);

            }
        );

    });

}


// ==========================================================
// HANDBOOK ACCORDION
// ==========================================================

function initializeHandbook() {

    const cards =
        document.querySelectorAll(
            ".handbook-card"
        );

    cards.forEach(function(card) {

        const title =
            card.querySelector("h3");

        const content =
            card.querySelector(
                ".handbook-content"
            );

        if (!title || !content) {
            return;
        }

        content.style.display = "none";

        title.style.cursor = "pointer";

        title.addEventListener(
            "click",
            function() {

                const isOpen =
                    content.style.display === "block";

                // Close every other section
                cards.forEach(function(otherCard) {

                    const otherContent =
                        otherCard.querySelector(
                            ".handbook-content"
                        );

                    if (otherContent) {
                        otherContent.style.display =
                            "none";
                    }

                });

                // Open selected section
                if (!isOpen) {

                    content.style.display =
                        "block";

                }

            }
        );

    });

}


// ==========================================================
// GENERAL ACADEMY QUESTIONS
// ==========================================================

const academyQuestions = [

    {
        question:
            "هدف اصلی Academy چیست؟",

        options: [
            "سرگرمی",
            "آموزش و ارزیابی",
            "افزایش خودکار Rank",
            "نادیده گرفتن قوانین"
        ],

        answer: 1
    },

    {
        question:
            "Professionalism به چه معناست؟",

        options: [
            "رفتار مسئولانه و حرفه‌ای",
            "نادیده گرفتن قوانین",
            "عدم پاسخگویی",
            "رفتار غیرحرفه‌ای"
        ],

        answer: 0
    },

    {
        question:
            "آیا قوانین Academy باید رعایت شوند؟",

        options: [
            "بله",
            "خیر",
            "فقط بعضی اوقات",
            "فقط توسط Instructor"
        ],

        answer: 0
    },

    {
        question:
            "در صورت وجود مشکل، بهترین کار چیست؟",

        options: [
            "نادیده گرفتن",
            "گزارش مشکل",
            "پنهان کردن",
            "حذف اطلاعات"
        ],

        answer: 1
    },

    {
        question:
            "Chain of Command چه کاربردی دارد؟",

        options: [
            "ایجاد ساختار مسئولیت",
            "حذف مسئولیت",
            "افزایش خودکار Rank",
            "حذف قوانین"
        ],

        answer: 0
    },

    {
        question:
            "Accountability به چه معناست؟",

        options: [
            "پاسخگویی در برابر عملکرد",
            "نادیده گرفتن اشتباه",
            "عدم گزارش",
            "انتقال مسئولیت به دیگران"
        ],

        answer: 0
    },

    {
        question:
            "قبل از یک تصمیم مهم چه کاری مناسب است؟",

        options: [
            "تصمیم بدون بررسی",
            "ارزیابی شرایط",
            "نادیده گرفتن قوانین",
            "حذف گزارش"
        ],

        answer: 1
    },

    {
        question:
            "Certification Exam برای چیست؟",

        options: [
            "بررسی آمادگی",
            "سرگرمی",
            "افزایش خودکار Rank",
            "حذف Training"
        ],

        answer: 0
    },

    {
        question:
            "حداقل نمره قبولی این آزمون چند درصد است؟",

        options: [
            "50%",
            "60%",
            "70%",
            "80%"
        ],

        answer: 3
    },

    {
        question:
            "در صورت عدم قبولی چه اقدامی مناسب است؟",

        options: [
            "Retraining و Re-Test",
            "نادیده گرفتن نتیجه",
            "حذف آزمون",
            "افزایش خودکار دسترسی"
        ],

        answer: 0
    }

];


// ==========================================================
// LOAD EXAM
// ==========================================================

function loadExam() {

    const container =
        document.getElementById(
            "assessmentQuestions"
        );

    if (!container) {
        console.warn(
            "assessmentQuestions not found."
        );

        return;
    }

    container.innerHTML = "";

    academyQuestions.forEach(
        function(item, index) {

            const questionBox =
                document.createElement("div");

            questionBox.className =
                "question";

            let html = `
                <p>
                    ${index + 1}.
                    ${item.question}
                </p>
            `;

            item.options.forEach(
                function(option, optionIndex) {

                    html += `
                        <label>
                            <input
                                type="radio"
                                name="academy_${index}"
                                value="${optionIndex}">
                            ${option}
                        </label>
                    `;

                }
            );

            questionBox.innerHTML =
                html;

            container.appendChild(
                questionBox
            );

        }
    );

}


// ==========================================================
// SUBMIT EXAM
// ==========================================================

async function submitExam() {

    const result =
        document.getElementById(
            "examResult"
        );

    if (!auth || !auth.currentUser) {

        if (result) {

            result.innerHTML =
                "❌ ابتدا وارد حساب شوید.";

        }

        showPage("login");

        return;
    }

    let score = 0;

    let unanswered = 0;

    const answers = {};

    academyQuestions.forEach(
        function(item, index) {

            const selected =
                document.querySelector(
                    `input[name="academy_${index}"]:checked`
                );

            if (!selected) {

                unanswered++;

                answers[
                    `question_${index + 1}`
                ] = null;

                return;
            }

            const selectedAnswer =
                Number(selected.value);

            answers[
                `question_${index + 1}`
            ] =
                selectedAnswer;

            if (
                selectedAnswer ===
                item.answer
            ) {

                score++;

            }

        }
    );


    const total =
        academyQuestions.length;

    const percentage =
        Math.round(
            (score / total) * 100
        );


    // ======================================================
    // SAVE TO FIREBASE
    // ======================================================

    try {

        const user =
            auth.currentUser;

        if (!user) {
            throw new Error(
                "User is not authenticated."
            );
        }

        if (!database) {
            throw new Error(
                "Firebase Database is not initialized."
            );
        }


        /*
         * Each user gets their own submission.
         *
         * Path:
         * examSubmissions/
         *     USER_UID/
         */

        const submissionRef =
            ref(
                database,
                "examSubmissions/" +
                user.uid
            );


        await set(
            submissionRef,
            {

                userId:
                    user.uid,

                email:
                    user.email || "",

                answers:
                    answers,

                score:
                    score,

                total:
                    total,

                percentage:
                    percentage,

                unanswered:
                    unanswered,

                submittedAt:
                    serverTimestamp()

            }
        );


        // ==================================================
        // SHOW RESULT
        // ==================================================

        if (result) {

            if (percentage >= 80) {

                result.className =
                    "result-box show success";

                result.innerHTML = `
                    <strong>✅ PASS</strong>
                    <br><br>
                    Score:
                    ${score} / ${total}
                    <br>
                    Percentage:
                    ${percentage}%
                    <br><br>
                    پاسخ آزمون با موفقیت در Firebase ذخیره شد.
                `;

            } else {

                result.className =
                    "result-box show danger";

                result.innerHTML = `
                    <strong>❌ FAIL</strong>
                    <br><br>
                    Score:
                    ${score} / ${total}
                    <br>
                    Percentage:
                    ${percentage}%
                    <br><br>
                    حداقل نمره قبولی 80% است.
                    <br>
                    پاسخ آزمون در Firebase ذخیره شد.
                `;

            }

        }


        console.log(
            "Exam saved successfully."
        );


    } catch (error) {

        console.error(
            "Exam save error:",
            error
        );


        if (result) {

            result.className =
                "result-box show danger";

            result.innerHTML = `
                ❌ ذخیره آزمون انجام نشد.
                <br><br>
                ${error.message}
            `;

        }

    }

}


// ==========================================================
// LOGIN
// ==========================================================

async function loginOfficer(event) {

    event.preventDefault();

    const emailElement =
        document.getElementById(
            "officerEmail"
        );

    const passwordElement =
        document.getElementById(
            "officerPassword"
        );

    const result =
        document.getElementById(
            "loginResult"
        );


    if (!emailElement || !passwordElement) {

        console.error(
            "Login fields not found."
        );

        return;
    }


    const email =
        emailElement.value.trim();

    const password =
        passwordElement.value;


    if (!email || !password) {

        if (result) {

            result.className =
                "result-box show danger";

            result.innerHTML =
                "❌ Email و Password را وارد کنید.";

        }

        return;
    }


    if (result) {

        result.className =
            "result-box show";

        result.innerHTML =
            "در حال ورود...";

    }


    try {

        const credential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


        const loggedEmail =
            document.getElementById(
                "loggedOfficerEmail"
            );


        if (loggedEmail) {

            loggedEmail.textContent =
                credential.user.email;

        }


        if (result) {

            result.className =
                "result-box show success";

            result.innerHTML =
                "✅ ورود موفق بود.";

        }


        showPage(
            "officerPanelPage"
        );


    } catch (error) {

        console.error(
            "Login error:",
            error
        );


        let message =
            "❌ ورود ناموفق بود.";


        if (
            error.code ===
            "auth/invalid-credential"
        ) {

            message =
                "❌ Email یا Password اشتباه است.";

        } else if (
            error.code ===
            "auth/invalid-email"
        ) {

            message =
                "❌ فرمت Email صحیح نیست.";

        } else if (
            error.code ===
            "auth/too-many-requests"
        ) {

            message =
                "❌ تلاش‌های ورود بیش از حد مجاز بوده است.";

        } else if (
            error.code ===
            "auth/network-request-failed"
        ) {

            message =
                "❌ اتصال به Firebase برقرار نشد.";

        }


        if (result) {

            result.className =
                "result-box show danger";

            result.innerHTML =
                message;

        }

    }

}


// ==========================================================
// LOGOUT
// ==========================================================

async function logoutUser() {

    try {

        await signOut(auth);

        showPage("home");

        console.log(
            "User logged out."
        );

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

function initializeAuth() {

    if (!auth) {
        return;
    }


    onAuthStateChanged(
        auth,
        function(user) {

            const email =
                document.getElementById(
                    "loggedOfficerEmail"
                );


            if (user) {

                console.log(
                    "Authenticated:",
                    user.email
                );


                if (email) {

                    email.textContent =
                        user.email;

                }


            } else {

                console.log(
                    "No authenticated user."
                );


                if (email) {

                    email.textContent =
                        "";

                }

            }

        }
    );

}


// ==========================================================
// EVENT LISTENERS
// ==========================================================

function initializeEvents() {

    const loginForm =
        document.getElementById(
            "loginForm"
        );

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            loginOfficer
        );

    }


    const examButton =
        document.getElementById(
            "officerExamSubmit"
        );

    if (examButton) {

        examButton.addEventListener(
            "click",
            submitExam
        );

    }


    const logoutButton =
        document.getElementById(
            "logoutButton"
        );

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            logoutUser
        );

    }

}


// ==========================================================
// START APPLICATION
// ==========================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "================================"
        );

        console.log(
            "Academy Portal Starting..."
        );

        console.log(
            "================================"
        );


        initializeNavigation();

        initializeHandbook();

        loadExam();

        initializeEvents();

        initializeAuth();


        // Make sure home opens first
        showPage("home");


        console.log(
            "Academy Portal Ready."
        );

    }
);
```
