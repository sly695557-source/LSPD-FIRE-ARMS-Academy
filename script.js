import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
getAuth,
signInWithEmailAndPassword,
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

window.showPage = function (pageId) {

const protectedPages = [
    "officerPanelPage",
    "officerExam"
];

if (protectedPages.includes(pageId) && !auth.currentUser) {
    pageId = "login";
}

document.querySelectorAll(".page-section").forEach(page => {
    page.classList.remove("active");
});

const page = document.getElementById(pageId);

if (page) {
    page.classList.add("active");
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

};

/* =========================
CIVILIAN QUESTIONS
========================= */

const civilianQuestions = [
"دلیل شما برای درخواست مجوز چیست؟",
"چرا فکر می‌کنید داشتن این مجوز برای شخصیت شما ضروری است؟",
"مسئولیت‌های یک دارنده مجوز را چگونه تعریف می‌کنید؟",
"اگر متوجه شوید شرایط دریافت مجوز را دیگر ندارید، چه اقدامی انجام می‌دهید؟",
"اگر مجوز شما تعلیق شود، واکنش شما چه خواهد بود؟",
"چه شرایطی می‌تواند یک موقعیت عادی را به یک موقعیت خطرناک تبدیل کند؟",
"اگر در یک موقعیت تنش‌زا باشید، برای جلوگیری از تشدید آن چه تصمیمی می‌گیرید؟",
"اگر فرد مقابل شما عصبانی باشد، چطور سعی می‌کنید شرایط را آرام کنید؟",
"اگر شخص دیگری از شما بخواهد Permit یا تجهیزات مجاز شما را در اختیارش قرار دهید، چه می‌کنید؟",
"اگر شاهد رفتار غیرقانونی مرتبط با یک Permit باشید، چه اقدامی انجام می‌دهید؟",
"اگر یکی از دوستان یا اعضای خانواده بخواهد از Permit شما استفاده کند، چه پاسخی می‌دهید؟",
"اگر درباره اعتبار یا شرایط Permit خود مطمئن نباشید، از چه کسی سؤال می‌کنید؟",
"اگر در یک موقعیت عمومی احساس کنید شرایط در حال خطرناک‌شدن است، اولویت شما چیست؟",
"تفاوت بین داشتن Permit و داشتن اختیار نامحدود چیست؟",
"چرا دارنده Permit باید در رفتار خود مسئولیت‌پذیر باشد؟",
"اگر شخص دیگری عمداً سعی کند شما را وارد درگیری کند، چه رویکردی دارید؟",
"اگر بعداً متوجه شوید تصمیمی که در یک موقعیت گرفته‌اید اشتباه بوده، چه کاری انجام می‌دهید؟",
"آیا هر فردی صرفاً به دلیل داشتن Permit می‌تواند در هر شرایطی از آن استفاده کند؟ چرا؟",
"چه چیزی باعث می‌شود LSPD به شما به‌عنوان یک دارنده Permit مسئول اعتماد کند؟",
"آیا حاضرید در صورت نقض شرایط Permit، مجوز شما طبق قوانین سرور بررسی یا تعلیق شود؟"
];

const civilianContainer =
document.getElementById("civilianQuestions");

if (civilianContainer) {

civilianQuestions.forEach((question, index) => {

    const box = document.createElement("div");

    box.className = "scenario-question";

    box.innerHTML = `
        <p>${index + 1}. ${question}</p>
        <textarea placeholder="پاسخ متقاضی..."></textarea>
    `;

    civilianContainer.appendChild(box);
});

}

/* =========================
CIVILIAN SUBMIT
========================= */

window.submitCivilian = function () {

const name =
    document.getElementById("civilianName").value.trim();

if (!name) {
    alert("لطفاً نام متقاضی را وارد کنید.");
    return;
}

const result =
    document.getElementById("civilianResult");

result.innerHTML = `
    مصاحبه با موفقیت ثبت شد.
    <br><br>
    Examiner می‌تواند نتیجه نهایی را بررسی کند.
`;

result.classList.add("show");

};

/* =========================
OFFICER LOGIN
========================= */

const loginForm =
document.getElementById("loginForm");

if (loginForm) {

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email =
        document.getElementById("officerEmail").value.trim();

    const password =
        document.getElementById("officerPassword").value;

    const result =
        document.getElementById("loginResult");

    result.className = "login-message";
    result.textContent = "در حال بررسی اطلاعات...";

    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        result.className = "login-message success-message";
        result.textContent = "ورود موفق بود.";

    } catch (error) {

        result.className = "login-message error-message";

        if (
            error.code === "auth/invalid-credential" ||
            error.code === "auth/wrong-password" ||
            error.code === "auth/user-not-found"
        ) {
            result.textContent =
                "ایمیل یا رمز عبور اشتباه است.";
        } else {
            result.textContent =
                "ورود انجام نشد. تنظیمات Firebase را بررسی کنید.";
        }
    }
});

}

/* =========================
AUTH STATE
========================= */

onAuthStateChanged(auth, (user) => {

const loginPage =
    document.getElementById("login");

const officerPanel =
    document.getElementById("officerPanelPage");

const emailText =
    document.getElementById("loggedOfficerEmail");

if (user) {

    if (emailText) {
        emailText.textContent = user.email;
    }

    if (loginPage) {
        loginPage.classList.remove("active");
    }

} else {

    if (officerPanel) {
        officerPanel.classList.remove("active");
    }

    if (document.getElementById("officerExam")) {
        document
            .getElementById("officerExam")
            .classList.remove("active");
    }
}

});

/* =========================
LOGOUT
========================= */

window.logoutOfficer = async function () {

try {

    await signOut(auth);

    showPage("home");

} catch (error) {

    console.error(error);
}

};

/* =========================
OFFICER EXAM
========================= */

window.submitOfficerExam = function () {

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
const total = Object.keys(answers).length;

for (const question in answers) {

    const selected =
        document.querySelector(
            `input[name="${question}"]:checked`
        );

    if (
        selected &&
        selected.value === answers[question]
    ) {
        score++;
    }
}

const percentage =
    Math.round((score / total) * 100);

const result =
    document.getElementById("examResult");

if (percentage >= 80) {

    result.className =
        "result-box show exam-pass";

    result.innerHTML = `
        PASS ✅
        <br>
        Score: ${percentage}%
    `;

} else {

    result.className =
        "result-box show exam-fail";

    result.innerHTML = `
        FAIL ❌
        <br>
        Score: ${percentage}%
    `;
}

};

/* =========================
INITIAL PAGE
========================= */

showPage("home");
