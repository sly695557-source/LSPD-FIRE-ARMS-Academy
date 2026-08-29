```javascript
// ==========================================================
// ACADEMY PORTAL
// Navigation مستقل از Firebase
// Firebase فقط برای Login و ذخیره آزمون
// ==========================================================


// ==========================================================
// FIREBASE IMPORTS
// ==========================================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import {
    getDatabase,
    ref,
    set,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";


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
// FIREBASE VARIABLES
// ==========================================================

let auth = null;
let database = null;


// ==========================================================
// FIREBASE START
// ==========================================================

try {

    const app =
        initializeApp(firebaseConfig);

    auth =
        getAuth(app);

    database =
        getDatabase(app);

    console.log(
        "Firebase initialized."
    );

} catch (error) {

    console.error(
        "Firebase error:",
        error
    );

}


// ==========================================================
// PAGE NAVIGATION
// ==========================================================
// IMPORTANT:
// این قسمت هیچ وابستگی به Firebase ندارد.
// ==========================================================

function showPage(pageId) {

    const pages =
        document.querySelectorAll(
            ".page-section"
        );


    pages.forEach(function(page) {

        page.classList.remove(
            "active"
        );

    });


    const target =
        document.getElementById(
            pageId
        );


    if (!target) {

        console.error(
            "Page not found:",
            pageId
        );

        return;

    }


    target.classList.add(
        "active"
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ==========================================================
// NAVIGATION
// ==========================================================

function setupNavigation() {

    const buttons =
        document.querySelectorAll(
            "[data-page]"
        );


    console.log(
        "Navigation buttons found:",
        buttons.length
    );


    buttons.forEach(function(button) {

        button.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                const pageId =
                    button.getAttribute(
                        "data-page"
                    );


                if (!pageId) {
                    return;
                }


                // فقط Officer Portal و Exam نیاز
                // به Login دارند.

                if (
                    pageId ===
                    "officerPanelPage"
                    ||
                    pageId ===
                    "officerExam"
                ) {

                    if (
                        !auth ||
                        !auth.currentUser
                    ) {

                        showPage(
                            "login"
                        );

                        return;

                    }

                }


                showPage(
                    pageId
                );

            }
        );

    });

}


// ==========================================================
// HANDBOOK
// ==========================================================

function setupHandbook() {

    const cards =
        document.querySelectorAll(
            ".handbook-card"
        );


    cards.forEach(function(card) {

        const title =
            card.querySelector(
                "h3"
            );


        const content =
            card.querySelector(
                ".handbook-content"
            );


        if (!title || !content) {
            return;
        }


        content.style.display =
            "none";


        title.style.cursor =
            "pointer";


        title.addEventListener(
            "click",
            function(event) {

                event.preventDefault();


                const isOpen =
                    content.style.display ===
                    "block";


                // Close all
                cards.forEach(
                    function(otherCard) {

                        const otherContent =
                            otherCard.querySelector(
                                ".handbook-content"
                            );


                        if (otherContent) {

                            otherContent.style.display =
                                "none";

                        }

                    }
                );


                // Open selected
                if (!isOpen) {

                    content.style.display =
                        "block";

                }

            }
        );

    });

}


// ==========================================================
// EXAM QUESTIONS
// ==========================================================

const examQuestions = [

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
            "در صورت وجود مشکل بهترین کار چیست؟",

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
            "انتقال مسئولیت"
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
            "حداقل نمره قبولی چند درصد است؟",

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
            "افزایش دسترسی"
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

        console.log(
            "Assessment container not found."
        );

        return;

    }


    container.innerHTML =
        "";


    examQuestions.forEach(
        function(item, index) {

            const box =
                document.createElement(
                    "div"
                );


            box.className =
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
                                name="exam_${index}"
                                value="${optionIndex}"
                            >

                            ${option}

                        </label>

                    `;

                }
            );


            box.innerHTML =
                html;


            container.appendChild(
                box
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


    if (
        !auth ||
        !auth.currentUser
    ) {

        if (result) {

            result.className =
                "result-box show danger";

            result.innerHTML =
                "❌ ابتدا وارد حساب شوید.";

        }


        showPage(
            "login"
        );

        return;

    }


    let score = 0;

    let unanswered = 0;

    const answers = {};


    examQuestions.forEach(
        function(item, index) {

            const selected =
                document.querySelector(
                    `input[name="exam_${index}"]:checked`
                );


            if (!selected) {

                unanswered++;


                answers[
                    `question_${index + 1}`
                ] =
                    null;


                return;

            }


            const selectedAnswer =
                Number(
                    selected.value
                );


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
        examQuestions.length;


    const percentage =
        Math.round(
            (
                score /
                total
            ) *
            100
        );


    // ======================================================
    // FIREBASE SAVE
    // ======================================================

    try {

        if (!database) {

            throw new Error(
                "Firebase Database initialized نشده است."
            );

        }


        const user =
            auth.currentUser;


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

                score:
                    score,

                total:
                    total,

                percentage:
                    percentage,

                unanswered:
                    unanswered,

                answers:
                    answers,

                submittedAt:
                    serverTimestamp()

            }
        );


        if (result) {

            result.className =
                "result-box show " +
                (
                    percentage >= 80
                        ? "success"
                        : "danger"
                );


            result.innerHTML = `

                <strong>
                    ${
                        percentage >= 80
                            ? "✅ PASS"
                            : "❌ FAIL"
                    }
                </strong>

                <br><br>

                Score:
                ${score} / ${total}

                <br>

                Percentage:
                ${percentage}%

                <br><br>

                نتیجه با موفقیت ذخیره شد.

            `;

        }


        console.log(
            "Exam saved."
        );


    } catch (error) {

        console.error(
            "Database error:",
            error
        );


        if (result) {

            result.className =
                "result-box show danger";


            result.innerHTML = `

                ❌ ذخیره نتیجه انجام نشد.

                <br><br>

                ${error.message}

            `;

        }

    }

}


// ==========================================================
// LOGIN
// ==========================================================

async function loginUser(event) {

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


    if (!emailInput || !passwordInput) {

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

        }


        if (
            error.code ===
            "auth/invalid-email"
        ) {

            message =
                "❌ فرمت Email صحیح نیست.";

        }


        if (
            error.code ===
            "auth/too-many-requests"
        ) {

            message =
                "❌ تلاش‌های ورود بیش از حد مجاز بوده است.";

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

    if (!auth) {
        return;
    }


    try {

        await signOut(
            auth
        );


        showPage(
            "home"
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

function setupAuth() {

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

                if (email) {

                    email.textContent =
                        user.email;

                }


                console.log(
                    "User logged in:",
                    user.email
                );


            } else {

                if (email) {

                    email.textContent =
                        "";

                }


                console.log(
                    "User logged out."
                );

            }

        }
    );

}


// ==========================================================
// EVENTS
// ==========================================================

function setupEvents() {

    // Login

    const loginForm =
        document.getElementById(
            "loginForm"
        );


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            loginUser
        );

    }


    // Exam

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


    // Logout

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
// START
// ==========================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "Academy starting..."
        );


        // Navigation first
        // completely independent from Firebase

        setupNavigation();


        // Handbook
        setupHandbook();


        // Exam
        loadExam();


        // Login / Logout / Submit
        setupEvents();


        // Firebase authentication
        setupAuth();


        // Home
        showPage(
            "home"
        );


        console.log(
            "Academy ready."
        );

    }
);
```
