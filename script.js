/* =====================================================
LSPD FIREARMS ACADEMY
SCRIPT.JS
===================================================== */

/* =====================================================
FIREBASE
===================================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth,
onAuthStateChanged,
signInWithEmailAndPassword,
signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
apiKey: "AIzaSyBF6MC3yN-vaTyVDrB2ACe69NLKVEe67KU",
authDomain: "lspd-firearms-academy.firebaseapp.com",
projectId: "lspd-firearms-academy",
storageBucket: "lspd-firearms-academy.firebasestorage.app",
messagingSenderId: "699387767180",
appId: "1:699387767180:web:0b17c5d8078636dacecea9",
measurementId: "G-LW965BY152"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

/* =====================================================
PAGE NAVIGATION
===================================================== */

window.showPage = function(pageId) {

/*
   Officer-only pages
*/

const officerPages = [
    "officerPanelPage",
    "officerExam"
];


if (officerPages.includes(pageId)) {

    if (!auth.currentUser) {

        alert("دسترسی غیرمجاز! ابتدا باید به عنوان Officer وارد شوید.");

        pageId = "login";
    }
}


/*
   Hide every page
*/

document
    .querySelectorAll(".page-section")
    .forEach(page => {

        page.classList.remove("active");

    });


/*
   Show requested page
*/

const selectedPage =
    document.getElementById(pageId);


if (selectedPage) {

    selectedPage.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

};

/* =====================================================
CIVILIAN QUESTIONS
===================================================== */

const civilianQuestions = [

"دلیل شما برای درخواست مجوز چیست؟",

"چرا فکر می‌کنید داشتن این مجوز برای شخصیت شما ضروری است؟",

"مسئولیت‌های یک دارنده مجوز را چگونه تعریف می‌کنید؟",

"اگر شرایط دریافت مجوز را دیگر نداشته باشید، چه اقدامی انجام می‌دهید؟",

"اگر مجوز شما تعلیق شود، واکنش شما چه خواهد بود؟",

"چه شرایطی می‌تواند یک موقعیت عادی را به یک موقعیت خطرناک تبدیل کند؟",

"اگر در یک موقعیت تنش‌زا باشید، برای جلوگیری از تشدید آن چه تصمیمی می‌گیرید؟",

"اگر فرد مقابل شما عصبانی باشد، چطور سعی می‌کنید شرایط را آرام کنید؟",

"اگر شخص دیگری از شما بخواهد Permit شما را در اختیارش قرار دهید، چه می‌کنید؟",

"اگر شاهد رفتار غیرقانونی مرتبط با یک Permit باشید، چه اقدامی انجام می‌دهید؟",

"اگر یکی از دوستان یا اعضای خانواده بخواهد از Permit شما استفاده کند، چه پاسخی می‌دهید؟",

"اگر درباره اعتبار Permit خود مطمئن نباشید، از چه کسی سؤال می‌کنید؟",

"اگر در یک مکان عمومی احساس کنید شرایط در حال خطرناک‌شدن است، اولویت شما چیست؟",

"تفاوت بین داشتن Permit و داشتن اختیار نامحدود چیست؟",

"چرا دارنده Permit باید در رفتار خود مسئولیت‌پذیر باشد؟",

"اگر شخص دیگری عمداً سعی کند شما را وارد درگیری کند، چه رویکردی دارید؟",

"اگر بعداً متوجه شوید تصمیمی که گرفته‌اید اشتباه بوده، چه کاری انجام می‌دهید؟",

"آیا داشتن Permit به معنی استفاده از آن در هر شرایطی است؟ چرا؟",

"چه چیزی باعث می‌شود LSPD به شما به عنوان یک دارنده Permit مسئول اعتماد کند؟",

"آیا حاضرید در صورت نقض شرایط Permit، مجوز شما طبق قوانین سرور بررسی یا تعلیق شود؟"

];

const civilianContainer =
document.getElementById("civilianQuestions");

if (civilianContainer) {

civilianQuestions.forEach(
    (question, index) => {

        const box =
            document.createElement("div");

        box.className =
            "question";


        box.innerHTML = `

            <p>
                ${index + 1}. ${question}
            </p>

            <textarea
                placeholder="پاسخ متقاضی..."
            ></textarea>

        `;


        civilianContainer.appendChild(box);

    }
);

}

/* =====================================================
CIVILIAN SUBMIT
===================================================== */

window.submitCivilian = function() {

const name =
    document.getElementById("civilianName")?.value.trim();


const examiner =
    document.getElementById("civilianExaminer")?.value.trim();


const result =
    document.getElementById("civilianResult");


if (!name) {

    alert("لطفاً نام متقاضی را وارد کنید.");

    return;

}


if (!examiner) {

    alert("لطفاً نام Examiner را وارد کنید.");

    return;

}


if (result) {

    result.innerHTML = `

        <strong>CIVILIAN INTERVIEW SUBMITTED</strong>

        <br><br>

        Applicant:
        ${name}

        <br>

        Examiner:
        ${examiner}

        <br><br>

        APPROVED / DENIED / FURTHER REVIEW

    `;

    result.classList.add("show");

}

};

/* =====================================================
OFFICER LOGIN
===================================================== */

const loginForm =
document.getElementById("loginForm");

if (loginForm) {

loginForm.addEventListener(
    "submit",
    async function(event) {

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


        const loginResult =
            document.getElementById("loginResult");


        if (loginResult) {

            loginResult.innerHTML =
                "در حال ورود...";

        }


        try {

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


            if (loginResult) {

                loginResult.innerHTML =
                    "ورود موفق بود.";

            }


        } catch (error) {

            console.error(error);


            let message =
                "ورود ناموفق بود.";


            if (
                error.code ===
                "auth/invalid-credential"
            ) {

                message =
                    "ایمیل یا رمز عبور اشتباه است.";

            }


            if (
                error.code ===
                "auth/user-not-found"
            ) {

                message =
                    "این Officer در Firebase وجود ندارد.";

            }


            if (
                error.code ===
                "auth/wrong-password"
            ) {

                message =
                    "رمز عبور اشتباه است.";

            }


            if (
                error.code ===
                "auth/invalid-email"
            ) {

                message =
                    "فرمت ایمیل صحیح نیست.";

            }


            if (loginResult) {

                loginResult.innerHTML = `
                    <div class="warning-box">
                        ${message}
                    </div>
                `;

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
function(user) {

    const loginPage =
        document.getElementById("login");


    const officerPanel =
        document.getElementById(
            "officerPanelPage"
        );


    const loggedEmail =
        document.getElementById(
            "loggedOfficerEmail"
        );


    if (user) {

        /*
           Officer is logged in
        */


        if (loggedEmail) {

            loggedEmail.textContent =
                user.email;

        }


    } else {

        /*
           Nobody is logged in
        */


        if (loggedEmail) {

            loggedEmail.textContent = "";

        }


        /*
           If user somehow reaches officer page,
           send them back to login.
        */

        if (
            officerPanel &&
            officerPanel.classList.contains("active")
        ) {

            window.showPage("login");

        }

    }

}

);

/* =====================================================
LOGOUT
===================================================== */

window.logoutOfficer = async function() {

try {

    await signOut(auth);

    alert("با موفقیت خارج شدید.");

    window.showPage("home");

} catch (error) {

    console.error(error);

    alert("خطا هنگام خروج.");

}

};

/* =====================================================
OFFICER EXAM
===================================================== */

window.submitOfficerExam = function() {

if (!auth.currentUser) {

    alert(
        "برای شرکت در آزمون ابتدا باید Officer Login کنید."
    );

    window.showPage("login");

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


const result =
    document.getElementById(
        "examResult"
    );


if (!result) return;


if (percentage >= 80) {

    result.innerHTML = `

        <strong>PASS ✅</strong>

        <br><br>

        Score:
        ${percentage}%

        <br><br>

        Certification Exam Passed.

    `;

} else {

    result.innerHTML = `

        <strong>FAIL ❌</strong>

        <br><br>

        Score:
        ${percentage}%

        <br><br>

        Minimum passing score: 80%

    `;

}


result.classList.add("show");

};

/* =====================================================
START PAGE
===================================================== */

window.addEventListener(
"DOMContentLoaded",
function() {

    window.showPage("home");

}

);
