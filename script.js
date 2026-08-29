import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


/* =====================================================
   FIREBASE
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


/* =====================================================
   PAGE NAVIGATION
===================================================== */

const protectedPages = [
    "officerPanelPage",
    "officerExam"
];


function showPage(pageId) {

    /* صفحات Officer فقط بعد از Login */
    if (
        protectedPages.includes(pageId) &&
        !auth.currentUser
    ) {
        pageId = "login";
    }

    const pages =
        document.querySelectorAll(".page-section");

    pages.forEach(page => {
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


/* برای استفاده از onclick احتمالی */
window.showPage = showPage;


/* =====================================================
   ALL NAVIGATION BUTTONS
===================================================== */

function setupNavigation() {

    const buttons =
        document.querySelectorAll("[data-page]");

    buttons.forEach(button => {

        button.addEventListener("click", function () {

            const page =
                this.getAttribute("data-page");

            if (!page) {
                return;
            }

            showPage(page);
        });

    });

    console.log(
        "Navigation buttons connected:",
        buttons.length
    );
}


/* =====================================================
   CIVILIAN QUESTIONS
===================================================== */

const civilianQuestions = [

    "دلیل شما برای درخواست Civilian Firearms Permit چیست؟",

    "مسئولیت‌های یک دارنده Permit را چگونه تعریف می‌کنید؟",

    "چرا قوانین مربوط به Permit باید رعایت شوند؟",

    "اگر شرایط دریافت Permit را دیگر نداشته باشید چه اقدامی می‌کنید؟",

    "اگر Permit شما تعلیق شود چه واکنشی نشان می‌دهید؟",

    "در یک موقعیت تنش‌زا چگونه از تشدید شرایط جلوگیری می‌کنید؟",

    "اگر فرد مقابل عصبانی باشد چگونه شرایط را کنترل می‌کنید؟",

    "اگر شخص دیگری درخواست کند Permit خود را در اختیار او قرار دهید چه می‌کنید؟",

    "اگر دوست یا عضو خانواده بخواهد از Permit شما استفاده کند چه پاسخی می‌دهید؟",

    "اگر شاهد تخلف مرتبط با Permit باشید چه اقدامی انجام می‌دهید؟",

    "اگر درباره اعتبار Permit خود مطمئن نباشید از چه مرجعی سؤال می‌کنید؟",

    "اگر در یک مکان عمومی شرایط خطرناک شود اولویت شما چیست؟",

    "تفاوت بین داشتن Permit و داشتن اختیار نامحدود چیست؟",

    "چرا دارنده Permit باید مسئولیت‌پذیر باشد؟",

    "اگر شخصی عمداً تلاش کند شما را وارد درگیری کند چه رویکردی دارید؟",

    "اگر متوجه شوید تصمیمی که گرفته‌اید اشتباه بوده چه می‌کنید؟",

    "آیا داشتن Permit به معنی استفاده از آن در هر شرایطی است؟ چرا؟",

    "چه عواملی باعث می‌شود LSPD به یک دارنده Permit اعتماد کند؟",

    "آیا حاضر هستید در صورت نقض قوانین، Permit شما بررسی یا تعلیق شود؟ چرا؟",

    "در صورت مشاهده یک موقعیت مشکوک، قبل از هر اقدامی چه نکاتی را در نظر می‌گیرید؟",

    "چگونه می‌توان از ایجاد یک موقعیت غیرضروری و خطرناک جلوگیری کرد؟",

    "مسئولیت یک Civilian در قبال قوانین Server چیست؟",

    "اگر فردی از شما بخواهد برخلاف قوانین Permit عمل کنید چه می‌کنید؟",

    "چرا تصمیم‌گیری مسئولانه در شرایط پراسترس اهمیت دارد؟",

    "اگر درباره یک قانون مطمئن نباشید آیا حدس می‌زنید یا ابتدا سؤال می‌کنید؟ توضیح دهید.",

    "چگونه می‌توان بین دفاع از خود و ایجاد یک درگیری غیرضروری تفاوت قائل شد؟",

    "اگر متوجه شوید فردی از Permit خود سوءاستفاده می‌کند چه اقدامی انجام می‌دهید؟",

    "چرا رعایت قوانین حتی زمانی که کسی نظارت نمی‌کند اهمیت دارد؟",

    "به نظر شما مهم‌ترین ویژگی یک دارنده مسئول Permit چیست؟"

];


/* =====================================================
   LOAD CIVILIAN QUESTIONS
===================================================== */

function loadCivilianQuestions() {

    const container =
        document.getElementById("civilianQuestions");

    if (!container) {
        console.warn(
            "civilianQuestions container not found."
        );
        return;
    }

    container.innerHTML = "";

    civilianQuestions.forEach(
        (question, index) => {

            const box =
                document.createElement("div");

            box.className =
                "scenario-question";

            const number =
                index + 1;

            box.innerHTML = `
                <p>
                    <strong>${number}.</strong>
                    ${question}
                </p>

                <textarea
                    class="civilian-answer"
                    data-question="${number}"
                    placeholder="پاسخ متقاضی..."
                ></textarea>
            `;

            container.appendChild(box);
        }
    );

    console.log(
        "Civilian questions loaded:",
        civilianQuestions.length
    );
}


/* =====================================================
   CIVILIAN SUBMIT
===================================================== */

function submitCivilian() {

    const nameElement =
        document.getElementById("civilianName");

    const examinerElement =
        document.getElementById("civilianExaminer");

    const resultElement =
        document.getElementById("civilianResult");

    if (!nameElement || !examinerElement) {
        console.error(
            "Civilian form elements missing."
        );
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

    const textareas =
        document.querySelectorAll(
            "#civilianQuestions textarea"
        );

    let answered = 0;

    textareas.forEach(textarea => {

        if (textarea.value.trim()) {
            answered++;
        }

    });

    if (answered < textareas.length) {

        showResult(
            "civilianResult",
            `لطفاً به تمام ${textareas.length} سؤال پاسخ دهید.`,
            false
        );

        return;
    }

    showResult(
        "civilianResult",
        "مصاحبه با موفقیت ثبت شد. Examiner می‌تواند پاسخ‌ها را بررسی کند.",
        true
    );

    console.log(
        "Civilian interview submitted:",
        {
            name,
            examiner,
            answered
        }
    );
}


window.submitCivilian =
    submitCivilian;


/* =====================================================
   LOGIN
===================================================== */

function setupLogin() {

    const loginForm =
        document.getElementById("loginForm");

    if (!loginForm) {
        console.error(
            "loginForm not found."
        );
        return;
    }

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const emailElement =
                document.getElementById("officerEmail");

            const passwordElement =
                document.getElementById("officerPassword");

            if (!emailElement || !passwordElement) {
                return;
            }

            const email =
                emailElement.value.trim();

            const password =
                passwordElement.value;

            if (!email || !password) {

                showResult(
                    "loginResult",
                    "ایمیل و رمز عبور را وارد کنید.",
                    false
                );

                return;
            }

            showResult(
                "loginResult",
                "در حال ورود...",
                true
            );

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

                /*
                   خیلی مهم:
                   اینجا مستقیماً officerPanel را باز می‌کنیم.
                */

                showPage("officerPanelPage");

            }

            catch (error) {

                console.error(
                    "Firebase Login Error:",
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
                            "این حساب Officer غیرفعال شده است.";

                        break;


                    case "auth/too-many-requests":

                        message =
                            "تعداد تلاش‌های ورود بیش از حد مجاز شده است. کمی بعد دوباره امتحان کنید.";

                        break;


                    case "auth/network-request-failed":

                        message =
                            "اتصال اینترنت یا ارتباط با Firebase مشکل دارد.";

                        break;


                    default:

                        message =
                            "خطای Firebase: " +
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
                "Officer authenticated:",
                user.email
            );

            if (emailElement) {

                emailElement.textContent =
                    user.email || "";
            }

        }
        else {

            console.log(
                "No Officer authenticated."
            );

            if (emailElement) {

                emailElement.textContent =
                    "";
            }

            /*
               اگر کاربر Logout کرد،
               فقط اگر داخل صفحات Officer باشد
               به Home برگردد.
            */

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


/* =====================================================
   LOGOUT
===================================================== */

async function logoutOfficer() {

    try {

        await signOut(auth);

        showPage("home");

    }
    catch (error) {

        console.error(
            "Logout error:",
            error
        );

        showResult(
            "loginResult",
            "خروج از حساب انجام نشد.",
            false
        );
    }
}


window.logoutOfficer =
    logoutOfficer;


/* =====================================================
   OFFICER EXAM
===================================================== */

/*
   فعلاً پاسخ‌ها برای تست سیستم هستند.
   بعداً می‌توانیم تعداد سؤالات را خیلی بیشتر کنیم.
*/

const officerAnswers = {

    q1: "B",
    q2: "C",
    q3: "B",
    q4: "B",
    q5: "A",
    q6: "A",
    q7: "A",
    q8: "A"

};


function submitOfficerExam() {

    if (!auth.currentUser) {

        showPage("login");

        return;
    }

    let score = 0;

    const total =
        Object.keys(officerAnswers).length;

    Object.entries(officerAnswers)
        .forEach(
            ([question, correctAnswer]) => {

                const selected =
                    document.querySelector(
                        `input[name="${question}"]:checked`
                    );

                if (
                    selected &&
                    selected.value ===
                    correctAnswer
                ) {

                    score++;
                }

            }
        );


    const percentage =
        Math.round(
            (score / total) * 100
        );


    if (percentage >= 80) {

        showResult(
            "examResult",
            `
            <strong>PASS ✅</strong>
            <br>
            Score: ${percentage}%
            <br>
            ${score} / ${total}
            `,
            true
        );

    }
    else {

        showResult(
            "examResult",
            `
            <strong>FAIL ❌</strong>
            <br>
            Score: ${percentage}%
            <br>
            ${score} / ${total}
            <br>
            <small>
                حداقل نمره قبولی 80% است.
            </small>
            `,
            false
        );

    }

}


window.submitOfficerExam =
    submitOfficerExam;


/* =====================================================
   RESULT
===================================================== */

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


/* =====================================================
   START
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "LSPD Firearms Academy starting..."
        );

        /*
           اول محتوا
        */

        loadCivilianQuestions();

        /*
           بعد Navigation
        */

        setupNavigation();

        /*
           Login
        */

        setupLogin();

        /*
           دکمه Civilian
        */

        const civilianSubmit =
            document.getElementById(
                "civilianSubmit"
            );

        if (civilianSubmit) {

            civilianSubmit.addEventListener(
                "click",
                submitCivilian
            );
        }


        /*
           دکمه Officer Exam
        */

        const officerExamSubmit =
            document.getElementById(
                "officerExamSubmit"
            );

        if (officerExamSubmit) {

            officerExamSubmit.addEventListener(
                "click",
                submitOfficerExam
            );
        }


        /*
           صفحه اولیه
           
           فقط زمانی Home را نشان بده
           که هیچ Officer لاگین نکرده باشد.
        */

        if (auth.currentUser) {

            showPage(
                "officerPanelPage"
            );

        }
        else {

            showPage("home");
        }


        console.log(
            "LSPD Firearms Academy loaded successfully."
        );

    }
);
