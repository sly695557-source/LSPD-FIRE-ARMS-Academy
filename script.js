```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


/* =========================
   FIREBASE
========================= */

const firebaseConfig = {
    apiKey: "AIzaSyBF6MC3yN-vaTyVDrB2ACe69NLKVEe67KU",
    authDomain: "lspd-firearms-academy.firebaseapp.com",
    projectId: "lspd-firearms-academy",
    storageBucket: "lspd-firearms-academy.firebasestorage.app",
    messagingSenderId: "699387767180",
    appId: "1:699387767180:web:53e815b3ae2f818fcecea9",
    measurementId: "G-JGQTYH8WX1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


/* =========================
   PAGE SYSTEM
========================= */

window.showPage = function(pageId) {

    const protectedPages = [
        "officerPanelPage",
        "officerExam"
    ];

    if (
        protectedPages.includes(pageId) &&
        !auth.currentUser
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
        console.error("Page not found:", pageId);
        return;
    }

    target.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};


/* =========================
   CIVILIAN QUESTIONS
========================= */

const civilianQuestions = [

    "دلیل شما برای درخواست مجوز چیست؟",

    "مسئولیت‌های یک دارنده مجوز را چگونه تعریف می‌کنید؟",

    "اگر شرایط دریافت مجوز را دیگر نداشته باشید، چه اقدامی انجام می‌دهید؟",

    "اگر مجوز شما تعلیق شود، واکنش شما چیست؟",

    "چه شرایطی می‌تواند یک موقعیت عادی را به یک موقعیت خطرناک تبدیل کند؟",

    "برای جلوگیری از تشدید یک موقعیت تنش‌زا چه تصمیمی می‌گیرید؟",

    "اگر فرد مقابل عصبانی باشد، چگونه شرایط را آرام می‌کنید؟",

    "اگر شخص دیگری از شما بخواهد Permit شما را در اختیارش قرار دهید چه می‌کنید؟",

    "اگر شاهد رفتار غیرقانونی مرتبط با Permit باشید چه اقدامی انجام می‌دهید؟",

    "اگر دوست یا عضو خانواده بخواهد از Permit شما استفاده کند چه پاسخی می‌دهید؟",

    "اگر درباره اعتبار Permit خود مطمئن نباشید از چه کسی سؤال می‌کنید؟",

    "اگر در یک مکان عمومی شرایط خطرناک شود اولویت شما چیست؟",

    "تفاوت بین داشتن Permit و داشتن اختیار نامحدود چیست؟",

    "چرا دارنده Permit باید مسئولیت‌پذیر باشد؟",

    "اگر شخص دیگری عمداً سعی کند شما را وارد درگیری کند چه رویکردی دارید؟",

    "اگر متوجه شوید تصمیمی که گرفته‌اید اشتباه بوده چه کاری انجام می‌دهید؟",

    "آیا داشتن Permit به معنی استفاده از آن در هر شرایطی است؟ چرا؟",

    "چه چیزی باعث می‌شود LSPD به شما اعتماد کند؟",

    "آیا حاضرید در صورت نقض قوانین، Permit شما بررسی یا تعلیق شود؟"

];


/* =========================
   LOAD CIVILIAN QUESTIONS
========================= */

function loadCivilianQuestions() {

    const container =
        document.getElementById("civilianQuestions");

    if (!container) {
        console.warn("civilianQuestions container not found.");
        return;
    }

    container.innerHTML = "";

    civilianQuestions.forEach(function(question, index) {

        const box =
            document.createElement("div");

        box.className =
            "scenario-question";

        box.innerHTML = `
            <p>${index + 1}. ${question}</p>

            <textarea
                placeholder="پاسخ متقاضی..."
            ></textarea>
        `;

        container.appendChild(box);
    });
}


/* =========================
   CIVILIAN SUBMIT
========================= */

window.submitCivilian = function() {

    const nameElement =
        document.getElementById("civilianName");

    const examinerElement =
        document.getElementById("civilianExaminer");

    if (!nameElement || !examinerElement) {
        console.error("Civilian form elements not found.");
        return;
    }

    const name =
        nameElement.value.trim();

    const examiner =
        examinerElement.value.trim();

    if (!name || !examiner) {

        showResult(
            "civilianResult",
            "لطفاً نام متقاضی و Examiner را وارد کنید.",
            false
        );

        return;
    }

    showResult(
        "civilianResult",
        "مصاحبه با موفقیت ثبت شد. Examiner می‌تواند نتیجه را بررسی کند.",
        true
    );
};


/* =========================
   LOGIN
========================= */

function setupLogin() {

    const loginForm =
        document.getElementById("loginForm");

    if (!loginForm) {
        console.error("loginForm not found.");
        return;
    }

    loginForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const emailElement =
                document.getElementById("officerEmail");

            const passwordElement =
                document.getElementById("officerPassword");

            const result =
                document.getElementById("loginResult");

            if (!emailElement || !passwordElement) {
                return;
            }

            const email =
                emailElement.value.trim();

            const password =
                passwordElement.value;

            if (!email || !password) {
                return;
            }

            if (result) {
                result.className =
                    "result-box show";

                result.innerHTML =
                    "در حال ورود...";
            }

            try {

                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                showPage("officerPanelPage");

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
                        "این Officer در سیستم وجود ندارد.";
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
                    "auth/invalid-api-key"
                ) {
                    message =
                        "Firebase API Key مشکل دارد.";
                }

                else if (
                    error.code ===
                    "auth/network-request-failed"
                ) {
                    message =
                        "اتصال به Firebase برقرار نشد.";
                }

                showResult(
                    "loginResult",
                    message,
                    false
                );
            }
        }
    );
}


/* =========================
   AUTH STATE
========================= */

onAuthStateChanged(
    auth,
    function(user) {

        const emailElement =
            document.getElementById(
                "loggedOfficerEmail"
            );

        if (user) {

            console.log(
                "Officer logged in:",
                user.email
            );

            if (emailElement) {
                emailElement.textContent =
                    user.email;
            }

        } else {

            console.log(
                "No officer logged in."
            );

            if (emailElement) {
                emailElement.textContent = "";
            }

            const currentPage =
                document.querySelector(
                    ".page-section.active"
                );

            if (
                currentPage &&
                (
                    currentPage.id ===
                    "officerPanelPage" ||

                    currentPage.id ===
                    "officerExam"
                )
            ) {

                showPage("home");
            }
        }
    }
);


/* =========================
   LOGOUT
========================= */

window.logoutOfficer = async function() {

    try {

        await signOut(auth);

        showPage("home");

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );
    }
};


/* =========================
   OFFICER EXAM
========================= */

window.submitOfficerExam = function() {

    if (!auth.currentUser) {

        showPage("login");

        return;
    }

    const answers = {

        q1: "B",
        q2: "C",
        q3: "B",
        q4: "B",
        q5: "A",
        q6: "A",
        q7: "A",
        q8: "A"

    };

    let score = 0;

    const total =
        Object.keys(answers).length;

    for (
        const question in answers
    ) {

        const selected =
            document.querySelector(
                `input[name="${question}"]:checked`
            );

        if (
            selected &&
            selected.value ===
            answers[question]
        ) {

            score++;
        }
    }

    const percentage =
        Math.round(
            (score / total) * 100
        );

    if (percentage >= 80) {

        showResult(
            "examResult",
            `PASS ✅<br>Score: ${percentage}%`,
            true
        );

    } else {

        showResult(
            "examResult",
            `FAIL ❌<br>Score: ${percentage}%<br>
            <small>حداقل نمره قبولی 80% است.</small>`,
            false
        );
    }
};


/* =========================
   RESULT
========================= */

function showResult(
    elementId,
    message,
    success
) {

    const element =
        document.getElementById(elementId);

    if (!element) {
        console.error(
            "Result element not found:",
            elementId
        );

        return;
    }

    element.className =
        success
            ? "result-box show success"
            : "result-box show danger";

    element.innerHTML =
        message;
}


/* =========================
   START
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadCivilianQuestions();

        setupLogin();

        showPage("home");

    }
);
```
