```javascript
import { initializeApp }
    from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


/* ==============================
   FIREBASE
================================= */

const firebaseConfig = {
    apiKey: "AIzaSyBF6MC3yN-vaTyVDrB2ACe69NLKVEe67KU",
    authDomain: "lspd-firearms-academy.firebaseapp.com",
    projectId: "lspd-firearms-academy",
    storageBucket: "lspd-firearms-academy.firebasestorage.app",
    messagingSenderId: "699387767180",
    appId: "1:699387767180:web:53e815b3ae2f818fcecea9"
};

let app;
let auth;

try {

    app = initializeApp(firebaseConfig);
    auth = getAuth(app);

    console.log("Firebase initialized successfully.");

} catch (error) {

    console.error("Firebase initialization error:", error);

}


/* ==============================
   PAGE NAVIGATION
================================= */

function showPage(pageId) {

    const protectedPages = [
        "officerPanelPage",
        "officerExam"
    ];

    if (
        protectedPages.includes(pageId) &&
        (!auth || !auth.currentUser)
    ) {
        pageId = "login";
    }

    document
        .querySelectorAll(".page-section")
        .forEach(function(page) {
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
}

window.showPage = showPage;


/* ==============================
   NAVIGATION BUTTONS
================================= */

function setupNavigation() {

    document
        .querySelectorAll("[data-page]")
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const page =
                        button.getAttribute("data-page");

                    showPage(page);

                }
            );

        });
}


/* ==============================
   CIVILIAN QUESTIONS
================================= */

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


function loadCivilianQuestions() {

    const container =
        document.getElementById("civilianQuestions");

    if (!container) return;

    container.innerHTML = "";

    civilianQuestions.forEach(function(question, index) {

        const box =
            document.createElement("div");

        box.className =
            "scenario-question";

        const title =
            document.createElement("p");

        title.textContent =
            `${index + 1}. ${question}`;

        const textarea =
            document.createElement("textarea");

        textarea.placeholder =
            "پاسخ متقاضی...";

        box.appendChild(title);
        box.appendChild(textarea);

        container.appendChild(box);

    });
}


/* ==============================
   CIVILIAN SUBMIT
================================= */

function submitCivilian() {

    const name =
        document.getElementById("civilianName");

    const examiner =
        document.getElementById("civilianExaminer");

    if (!name || !examiner) return;

    if (
        !name.value.trim() ||
        !examiner.value.trim()
    ) {

        showResult(
            "civilianResult",
            "لطفاً نام متقاضی و Examiner را وارد کنید.",
            false
        );

        return;
    }

    showResult(
        "civilianResult",
        "مصاحبه با موفقیت ثبت شد.",
        true
    );
}

window.submitCivilian =
    submitCivilian;


/* ==============================
   LOGIN
================================= */

function setupLogin() {

    const form =
        document.getElementById("loginForm");

    if (!form) return;

    form.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const email =
                document
                    .getElementById("officerEmail")
                    ?.value
                    .trim();

            const password =
                document
                    .getElementById("officerPassword")
                    ?.value;

            if (!email || !password) {

                showResult(
                    "loginResult",
                    "ایمیل و رمز عبور را وارد کنید.",
                    false
                );

                return;
            }

            if (!auth) {

                showResult(
                    "loginResult",
                    "Firebase به درستی بارگذاری نشده است. صفحه را Refresh کنید.",
                    false
                );

                return;
            }

            showResult(
                "loginResult",
                "در حال اتصال به Firebase...",
                true
            );

            try {

                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                showPage(
                    "officerPanelPage"
                );

            } catch (error) {

                console.error(
                    "Firebase error:",
                    error
                );

                let message =
                    "ورود ناموفق بود.";

                switch (error.code) {

                    case "auth/invalid-credential":

                        message =
                            "ایمیل یا رمز عبور اشتباه است.";

                        break;

                    case "auth/user-not-found":

                        message =
                            "این Officer در Firebase وجود ندارد.";

                        break;

                    case "auth/wrong-password":

                        message =
                            "رمز عبور اشتباه است.";

                        break;

                    case "auth/invalid-email":

                        message =
                            "فرمت ایمیل صحیح نیست.";

                        break;

                    case "auth/user-disabled":

                        message =
                            "این حساب غیرفعال شده است.";

                        break;

                    case "auth/too-many-requests":

                        message =
                            "تعداد تلاش‌ها زیاد است. کمی بعد دوباره امتحان کنید.";

                        break;

                    case "auth/network-request-failed":

                        message =
                            "ارتباط شبکه با Firebase برقرار نشد.";

                        break;

                    case "auth/operation-not-allowed":

                        message =
                            "ورود با Email/Password در Firebase فعال نشده است.";

                        break;

                    default:

                        message =
                            "Firebase Error: " +
                            error.code;

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


/* ==============================
   AUTH STATE
================================= */

function setupAuth() {

    if (!auth) return;

    onAuthStateChanged(
        auth,
        function(user) {

            const email =
                document.getElementById(
                    "loggedOfficerEmail"
                );

            if (user) {

                console.log(
                    "Officer logged in:",
                    user.email
                );

                if (email) {

                    email.textContent =
                        user.email || "";

                }

            } else {

                if (email) {
                    email.textContent = "";
                }

            }

        }
    );
}


/* ==============================
   LOGOUT
================================= */

function setupLogout() {

    const button =
        document.getElementById(
            "logoutButton"
        );

    if (!button) return;

    button.addEventListener(
        "click",
        async function() {

            if (!auth) return;

            try {

                await signOut(auth);

                showPage("home");

            } catch (error) {

                console.error(
                    "Logout error:",
                    error
                );

            }

        }
    );
}


/* ==============================
   OFFICER EXAM
================================= */

function submitOfficerExam() {

    if (!auth || !auth.currentUser) {

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

    for (const question in answers) {

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

}


/* ==============================
   RESULT
================================= */

function showResult(
    elementId,
    message,
    success
) {

    const element =
        document.getElementById(
            elementId
        );

    if (!element) return;

    element.className =
        success
            ? "result-box show success"
            : "result-box show danger";

    element.innerHTML =
        message;

}


/* ==============================
   START
================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        setupNavigation();

        loadCivilianQuestions();

        setupLogin();

        setupAuth();

        setupLogout();

        const examButton =
            document.getElementById(
                "officerExamSubmit"
            );

        if (examButton) {

            examButton.addEventListener(
                "click",
                submitOfficerExam
            );

        }

        showPage("home");

        console.log(
            "LSPD Firearms Academy loaded."
        );

    }
);
```
