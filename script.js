/* =========================================
   LSPD FIREARMS ACADEMY
   FINAL SCRIPT
========================================= */


/* =========================================
   PAGE NAVIGATION
========================================= */

function showPage(pageId) {

    document.querySelectorAll(".page-section").forEach(function(page) {
        page.classList.remove("active");
    });

    const target = document.getElementById(pageId);

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


/* =========================================
   CIVILIAN QUESTIONS
========================================= */

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


/* =========================================
   LOAD CIVILIAN QUESTIONS
========================================= */

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

        box.innerHTML = `
            <p>${index + 1}. ${question}</p>

            <textarea
                placeholder="پاسخ متقاضی..."
            ></textarea>
        `;

        container.appendChild(box);
    });
}


/* =========================================
   CIVILIAN SUBMIT
========================================= */

function submitCivilian() {

    const name =
        document.getElementById("civilianName");

    const examiner =
        document.getElementById("civilianExaminer");

    const result =
        document.getElementById("civilianResult");

    if (!name || !examiner || !result) return;

    if (
        name.value.trim() === "" ||
        examiner.value.trim() === ""
    ) {

        result.className =
            "result-box show danger";

        result.innerHTML =
            "لطفاً نام متقاضی و Examiner را وارد کنید.";

        return;
    }

    result.className =
        "result-box show success";

    result.innerHTML =
        "مصاحبه با موفقیت ثبت شد.";
}


/* =========================================
   OFFICER EXAM
========================================= */

function submitOfficerExam() {

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
            selected.value === answers[question]
        ) {
            score++;
        }
    }

    const percentage =
        Math.round((score / total) * 100);

    const result =
        document.getElementById("examResult");

    if (!result) return;

    if (percentage >= 80) {

        result.className =
            "result-box show success";

        result.innerHTML =
            `PASS ✅<br>Score: ${percentage}%`;

    } else {

        result.className =
            "result-box show danger";

        result.innerHTML =
            `FAIL ❌<br>Score: ${percentage}%<br>
             <small>حداقل نمره قبولی 80% است.</small>`;
    }
}


/* =========================================
   FIREBASE
   LOADED SEPARATELY
========================================= */

let auth = null;

async function loadFirebase() {

    try {

        const firebaseApp =
            await import(
                "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
            );

        const firebaseAuth =
            await import(
                "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"
            );

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
                "1:699387767180:web:53e815b3ae2f818fcecea9",

            measurementId:
                "G-JGQTYH8WX1"
        };

        const app =
            firebaseApp.initializeApp(firebaseConfig);

        auth =
            firebaseAuth.getAuth(app);

        firebaseAuth.onAuthStateChanged(
            auth,
            function(user) {

                const email =
                    document.getElementById(
                        "loggedOfficerEmail"
                    );

                if (email) {
                    email.textContent =
                        user ? (user.email || "") : "";
                }

            }
        );

        console.log("Firebase loaded.");

    }

    catch (error) {

        console.error(
            "Firebase failed:",
            error
        );

    }
}


/* =========================================
   LOGIN
========================================= */

async function loginOfficer() {

    const email =
        document.getElementById("officerEmail");

    const password =
        document.getElementById("officerPassword");

    const result =
        document.getElementById("loginResult");

    if (!email || !password || !result) return;

    result.className =
        "result-box show";

    result.innerHTML =
        "در حال اتصال به Firebase...";

    if (!auth) {

        await loadFirebase();
    }

    if (!auth) {

        result.className =
            "result-box show danger";

        result.innerHTML =
            "Firebase بارگذاری نشد. دامنه سایت را در Firebase بررسی کنید.";

        return;
    }


    try {

        const firebaseAuth =
            await import(
                "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"
            );

        await firebaseAuth.signInWithEmailAndPassword(
            auth,
            email.value.trim(),
            password.value
        );

        result.className =
            "result-box show success";

        result.innerHTML =
            "ورود موفق بود.";

        showPage("officerPanelPage");

    }

    catch (error) {

        console.error(error);

        let message =
            "ورود ناموفق بود.";

        if (error.code === "auth/invalid-credential") {
            message =
                "ایمیل یا رمز عبور اشتباه است.";
        }

        else if (error.code === "auth/user-not-found") {
            message =
                "این Officer در Firebase وجود ندارد.";
        }

        else if (error.code === "auth/wrong-password") {
            message =
                "رمز عبور اشتباه است.";
        }

        else if (error.code === "auth/too-many-requests") {
            message =
                "تعداد تلاش‌های ورود بیش از حد مجاز است.";
        }

        else if (error.code === "auth/network-request-failed") {
            message =
                "اتصال به Firebase برقرار نشد.";
        }

        result.className =
            "result-box show danger";

        result.innerHTML =
            message;
    }
}


/* =========================================
   LOGOUT
========================================= */

async function logoutOfficer() {

    if (!auth) {
        showPage("home");
        return;
    }

    try {

        const firebaseAuth =
            await import(
                "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"
            );

        await firebaseAuth.signOut(auth);

        showPage("home");

    }

    catch (error) {

        console.error(error);

        showPage("home");
    }
}


/* =========================================
   START
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        /* Navigation */

        document
            .querySelectorAll("[data-page]")
            .forEach(function(button) {

                button.addEventListener(
                    "click",
                    function() {

                        const page =
                            button.getAttribute("data-page");

                        if (page) {
                            showPage(page);
                        }

                    }
                );

            });


        /* Civilian */

        const civilianButton =
            document.getElementById("civilianSubmit");

        if (civilianButton) {

            civilianButton.addEventListener(
                "click",
                submitCivilian
            );
        }


        /* Officer Exam */

        const examButton =
            document.getElementById("officerExamSubmit");

        if (examButton) {

            examButton.addEventListener(
                "click",
                submitOfficerExam
            );
        }


        /* Logout */

        const logoutButton =
            document.getElementById("logoutButton");

        if (logoutButton) {

            logoutButton.addEventListener(
                "click",
                logoutOfficer
            );
        }


        /* Login */

        const loginForm =
            document.getElementById("loginForm");

        if (loginForm) {

            loginForm.addEventListener(
                "submit",
                function(event) {

                    event.preventDefault();

                    loginOfficer();

                }
            );
        }


        /* Civilian questions */

        loadCivilianQuestions();


        /* Home */

        showPage("home");


        /* Firebase in background */

        loadFirebase();


        console.log(
            "LSPD Firearms Academy READY"
        );

    }
);
