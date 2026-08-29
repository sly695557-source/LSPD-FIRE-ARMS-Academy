// ==========================================================
// LSPD FIREARMS DIVISION
// COMPLETE FIREBASE SCRIPT
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
    push,
    set,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";


// ==========================================================
// FIREBASE CONFIG
// ==========================================================

const firebaseConfig = {

    apiKey:
        "AIzaSyBF6MC3yN-vaTyVDrB2ACe69NLKVEe67KU",

    authDomain:
        "lspd-firearms-academy.firebaseapp.com",

    databaseURL:
        "https://lspd-firearms-academy-default-rtdb.firebaseio.com",

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
// FIREBASE INITIALIZATION
// ==========================================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const database = getDatabase(app);


// ==========================================================
// GLOBAL STATE
// ==========================================================

let currentUser = null;


// ==========================================================
// PAGE SYSTEM
// ==========================================================

function showPage(pageId) {

    const protectedPages = [
        "officerPortal",
        "officerAssessment"
    ];


    // ---------------------------------------------
    // Prevent unauthorized access
    // ---------------------------------------------

    if (
        protectedPages.includes(pageId) &&
        !currentUser
    ) {

        pageId = "login";

    }


    const pages =
        document.querySelectorAll(".page");


    pages.forEach(page => {

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


    // ---------------------------------------------
    // If officer assessment opens
    // ---------------------------------------------

    if (
        pageId === "officerAssessment"
    ) {

        if (!currentUser) {

            showPage("login");

            return;

        }

        loadOfficerAssessment();

    }

}


// ==========================================================
// NAVIGATION
// ==========================================================

function initializeNavigation() {

    document.addEventListener(
        "click",
        function(event) {

            const button =
                event.target.closest("[data-page]");


            if (!button) {
                return;
            }


            const pageId =
                button.getAttribute("data-page");


            if (!pageId) {
                return;
            }


            showPage(pageId);

        }
    );

}


// ==========================================================
// HANDBOOK
// ==========================================================

function initializeHandbook() {

    document.addEventListener(
        "click",
        function(event) {

            const title =
                event.target.closest(
                    ".handbook-title"
                );


            if (!title) {
                return;
            }


            const card =
                title.closest(
                    ".handbook-card"
                );


            if (!card) {
                return;
            }


            const wasOpen =
                card.classList.contains(
                    "open"
                );


            document
                .querySelectorAll(
                    ".handbook-card"
                )
                .forEach(
                    otherCard => {

                        otherCard.classList.remove(
                            "open"
                        );

                    }
                );


            if (!wasOpen) {

                card.classList.add(
                    "open"
                );

            }

        }
    );

}


// ==========================================================
// CIVILIAN QUESTIONS
// ==========================================================

const civilianQuestions = [

    {
        question:
            "دلیل شما برای درخواست مجوز چیست؟"
    },

    {
        question:
            "مسئولیت‌های یک دارنده Permit را چگونه تعریف می‌کنید؟"
    },

    {
        question:
            "اگر شرایط دریافت Permit را دیگر نداشته باشید چه اقدامی انجام می‌دهید؟"
    },

    {
        question:
            "اگر Permit شما تعلیق شود واکنش شما چیست؟"
    },

    {
        question:
            "چه شرایطی می‌تواند یک موقعیت عادی را به یک موقعیت خطرناک تبدیل کند؟"
    },

    {
        question:
            "برای جلوگیری از تشدید یک موقعیت تنش‌زا چه تصمیمی می‌گیرید؟"
    },

    {
        question:
            "اگر فرد مقابل عصبانی باشد چگونه شرایط را آرام می‌کنید؟"
    },

    {
        question:
            "اگر شخص دیگری از شما بخواهد Permit شما را در اختیارش قرار دهید چه می‌کنید؟"
    },

    {
        question:
            "اگر شاهد رفتار غیرقانونی مرتبط با Permit باشید چه اقدامی انجام می‌دهید؟"
    },

    {
        question:
            "اگر دوست یا عضو خانواده بخواهد از Permit شما استفاده کند چه پاسخی می‌دهید؟"
    },

    {
        question:
            "اگر درباره اعتبار Permit خود مطمئن نباشید از چه کسی سؤال می‌کنید؟"
    },

    {
        question:
            "اگر در یک مکان عمومی شرایط خطرناک شود اولویت شما چیست؟"
    },

    {
        question:
            "تفاوت بین داشتن Permit و داشتن اختیار نامحدود چیست؟"
    },

    {
        question:
            "چرا دارنده Permit باید مسئولیت‌پذیر باشد؟"
    },

    {
        question:
            "اگر شخص دیگری عمداً سعی کند شما را وارد درگیری کند چه رویکردی دارید؟"
    },

    {
        question:
            "اگر متوجه شوید تصمیمی که گرفته‌اید اشتباه بوده چه کاری انجام می‌دهید؟"
    },

    {
        question:
            "آیا داشتن Permit به معنی استفاده از آن در هر شرایطی است؟ چرا؟"
    },

    {
        question:
            "چه چیزی باعث می‌شود LSPD به شما اعتماد کند؟"
    },

    {
        question:
            "آیا حاضرید در صورت نقض قوانین Permit شما بررسی یا تعلیق شود؟"
    }

];


// ==========================================================
// LOAD CIVILIAN FORM
// ==========================================================

function loadCivilianQuestions() {

    const container =
        document.getElementById(
            "civilianQuestions"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    civilianQuestions.forEach(
        (item, index) => {

            const box =
                document.createElement(
                    "div"
                );


            box.className =
                "question";


            box.innerHTML = `

                <p>
                    ${index + 1}. ${item.question}
                </p>

                <textarea
                    name="civilian_question_${index}"
                    placeholder="پاسخ متقاضی..."></textarea>

            `;


            container.appendChild(
                box
            );

        }
    );

}


// ==========================================================
// SHOW RESULT
// ==========================================================

function showResult(
    elementId,
    message,
    success
) {

    const element =
        document.getElementById(
            elementId
        );


    if (!element) {
        return;
    }


    element.className =
        success
            ? "result show success"
            : "result show danger";


    element.innerHTML =
        message;

}


// ==========================================================
// CIVILIAN SUBMIT
// ==========================================================

async function submitCivilian() {

    const name =
        document
            .getElementById(
                "civilianName"
            )
            ?.value
            .trim();


    const examiner =
        document
            .getElementById(
                "civilianExaminer"
            )
            ?.value
            .trim();


    if (!name) {

        showResult(
            "civilianResult",
            "❌ لطفاً نام متقاضی را وارد کنید.",
            false
        );

        return;

    }


    const answers = {};


    civilianQuestions.forEach(
        (item, index) => {

            const textarea =
                document.querySelector(
                    `[name="civilian_question_${index}"]`
                );


            answers[
                `question_${index + 1}`
            ] =
                textarea
                    ? textarea.value.trim()
                    : "";

        }
    );


    try {

        const applicationRef =
            push(
                ref(
                    database,
                    "civilianApplications"
                )
            );


        await set(
            applicationRef,
            {

                applicantName:
                    name,

                examiner:
                    examiner || "Not specified",

                answers:
                    answers,

                questionCount:
                    civilianQuestions.length,

                submittedAt:
                    serverTimestamp()

            }
        );


        showResult(
            "civilianResult",
            `
                ✅ فرم با موفقیت ثبت شد.
                <br><br>
                Application ID:
                ${applicationRef.key}
            `,
            true
        );


    } catch (error) {

        console.error(
            "Civilian submit error:",
            error
        );


        showResult(
            "civilianResult",
            `
                ❌ ذخیره فرم انجام نشد.
                <br><br>
                ${error.message}
            `,
            false
        );

    }

}


// ==========================================================
// OFFICER QUESTIONS
// ==========================================================

const officerQuestions = [

    {
        question:
            "LEVEL 0 به چه معناست؟",

        options: [
            "Basic Equipment",
            "Patrol Authorization",
            "بدون دسترسی",
            "Restricted Equipment"
        ],

        answer: 2
    },


    {
        question:
            "LEVEL 1 چیست؟",

        options: [
            "Basic Equipment",
            "Special Authorization",
            "Restricted Equipment",
            "بدون دسترسی"
        ],

        answer: 0
    },


    {
        question:
            "LEVEL 2 چیست؟",

        options: [
            "بدون دسترسی",
            "Patrol Authorization",
            "Basic Equipment",
            "Restricted Equipment"
        ],

        answer: 1
    },


    {
        question:
            "LEVEL 3 چیست؟",

        options: [
            "Basic Equipment",
            "Patrol Authorization",
            "Special Authorization",
            "بدون دسترسی"
        ],

        answer: 2
    },


    {
        question:
            "LEVEL 4 چیست؟",

        options: [
            "Basic Equipment",
            "Restricted Equipment",
            "Patrol Authorization",
            "Standard Equipment"
        ],

        answer: 1
    },


    {
        question:
            "آیا Rank به تنهایی برای دسترسی به تمام تجهیزات کافی است؟",

        options: [
            "بله",
            "خیر",
            "همیشه",
            "فقط برای Senior Officer"
        ],

        answer: 1
    },


    {
        question:
            "Equipment Access باید بر اساس چه چیزی باشد؟",

        options: [
            "Rank",
            "Training",
            "Rank + Training + Authorization",
            "Vehicle"
        ],

        answer: 2
    },


    {
        question:
            "مهم‌ترین اصل Firearms Division چیست؟",

        options: [
            "Speed",
            "Safety",
            "Appearance",
            "Patrol"
        ],

        answer: 1
    },


    {
        question:
            "استفاده نمایشی یا غیرضروری از تجهیزات چگونه است؟",

        options: [
            "مجاز است",
            "توصیه می‌شود",
            "باید از آن خودداری شود",
            "اجباری است"
        ],

        answer: 2
    },


    {
        question:
            "در صورت مشاهده مشکل تجهیزات چه باید کرد؟",

        options: [
            "نادیده گرفت",
            "گزارش کرد",
            "مخفی کرد",
            "حذف کرد"
        ],

        answer: 1
    },


    {
        question:
            "اولویت اصلی Escalation Policy چیست؟",

        options: [
            "Escalation سریع",
            "جلوگیری از Escalation غیرضروری",
            "استفاده فوری از تجهیزات",
            "نادیده گرفتن موقعیت"
        ],

        answer: 1
    },


    {
        question:
            "Incident Report برای چیست؟",

        options: [
            "ثبت و گزارش Incident",
            "افزایش Rank",
            "سرگرمی",
            "حذف قوانین"
        ],

        answer: 0
    },


    {
        question:
            "کدام مورد باید در Incident Report ثبت شود؟",

        options: [
            "Incident ID",
            "Favorite Color",
            "Game Level",
            "Personal Hobby"
        ],

        answer: 0
    },


    {
        question:
            "Officer برای Authorization خاص چه چیزی لازم دارد؟",

        options: [
            "Training مناسب",
            "فقط Rank",
            "فقط Vehicle",
            "هیچ چیز"
        ],

        answer: 0
    },


    {
        question:
            "Certification Exam برای چه انجام می‌شود؟",

        options: [
            "بررسی آمادگی Officer",
            "سرگرمی",
            "افزایش خودکار Rank",
            "حذف Training"
        ],

        answer: 0
    },


    {
        question:
            "کدام مورد مسئولیت Officer است؟",

        options: [
            "رعایت قوانین Department",
            "نادیده گرفتن Chain of Command",
            "استفاده بدون Authorization",
            "عدم گزارش Incident"
        ],

        answer: 0
    },


    {
        question:
            "آیا Chain of Command باید رعایت شود؟",

        options: [
            "بله",
            "خیر",
            "فقط در مواقع خاص",
            "فقط توسط Instructor"
        ],

        answer: 0
    },


    {
        question:
            "قبل از یک تصمیم مهم Officer باید چه کند؟",

        options: [
            "شرایط موقعیت را ارزیابی کند",
            "بدون بررسی اقدام کند",
            "قوانین را نادیده بگیرد",
            "Incident را حذف کند"
        ],

        answer: 0
    },


    {
        question:
            "نقض قوانین Firearms Division ممکن است چه نتیجه‌ای داشته باشد؟",

        options: [
            "هیچ نتیجه‌ای ندارد",
            "بررسی داخلی و اقدامات انضباطی",
            "افزایش Rank",
            "Authorization بیشتر"
        ],

        answer: 1
    },


    {
        question:
            "آیا Officer می‌تواند بدون Training مناسب از Authorization خاص استفاده کند؟",

        options: [
            "بله",
            "خیر",
            "همیشه",
            "فقط در صورت عجله"
        ],

        answer: 1
    },


    {
        question:
            "Professionalism در Academy به چه معناست؟",

        options: [
            "رفتار مسئولانه و حرفه‌ای",
            "نادیده گرفتن قوانین",
            "استفاده نمایشی",
            "عدم پاسخگویی"
        ],

        answer: 0
    }

];


// ==========================================================
// LOAD OFFICER ASSESSMENT
// ==========================================================

function loadOfficerAssessment() {

    const container =
        document.getElementById(
            "assessmentQuestions"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    officerQuestions.forEach(
        (question, index) => {

            const box =
                document.createElement(
                    "div"
                );


            box.className =
                "question";


            let html = `

                <p>
                    ${index + 1}.
                    ${question.question}
                </p>

            `;


            question.options.forEach(
                (option, optionIndex) => {

                    html += `

                        <label>

                            <input
                                type="radio"
                                name="officer_${index}"
                                value="${optionIndex}">

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
// OFFICER ASSESSMENT SUBMIT
// ==========================================================

async function submitOfficerAssessment() {

    const result =
        document.getElementById(
            "examResult"
        );


    // ---------------------------------------------
    // SECURITY CHECK
    // ---------------------------------------------

    if (!currentUser) {

        showPage("login");

        return;

    }


    let score = 0;

    let unanswered = 0;

    const answers = {};


    officerQuestions.forEach(
        (question, index) => {

            const selected =
                document.querySelector(
                    `input[name="officer_${index}"]:checked`
                );


            if (!selected) {

                unanswered++;

                answers[
                    `question_${index + 1}`
                ] = null;

                return;

            }


            const value =
                Number(
                    selected.value
                );


            answers[
                `question_${index + 1}`
            ] = value;


            if (
                value ===
                question.answer
            ) {

                score++;

            }

        }
    );


    const total =
        officerQuestions.length;


    const percentage =
        Math.round(
            (score / total) * 100
        );


    try {

        const examRef =
            push(
                ref(
                    database,
                    "officerExams"
                )
            );


        await set(
            examRef,
            {

                officerUid:
                    currentUser.uid,

                officerEmail:
                    currentUser.email,

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


        if (percentage >= 80) {

            showResult(
                "examResult",
                `
                    ✅ PASS
                    <br><br>
                    Score:
                    ${score}/${total}
                    <br>
                    Percentage:
                    ${percentage}%
                    <br><br>
                    Exam ID:
                    ${examRef.key}
                `,
                true
            );

        } else {

            showResult(
                "examResult",
                `
                    ❌ FAIL
                    <br><br>
                    Score:
                    ${score}/${total}
                    <br>
                    Percentage:
                    ${percentage}%
                    <br><br>
                    Minimum passing score: 80%
                    <br><br>
                    Exam ID:
                    ${examRef.key}
                `,
                false
            );

        }


    } catch (error) {

        console.error(
            "Assessment save error:",
            error
        );


        showResult(
            "examResult",
            `
                ❌ ذخیره آزمون انجام نشد.
                <br><br>
                ${error.message}
            `,
            false
        );

    }

}


// ==========================================================
// LOGIN
// ==========================================================

async function loginOfficer(event) {

    event.preventDefault();


    const email =
        document
            .getElementById(
                "officerEmail"
            )
            .value
            .trim();


    const password =
        document
            .getElementById(
                "officerPassword"
            )
            .value;


    if (!email || !password) {

        showResult(
            "loginResult",
            "❌ Email و Password را وارد کنید.",
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


        currentUser =
            credential.user;


        document
            .getElementById(
                "loggedOfficerEmail"
            )
            .textContent =
            currentUser.email;


        document
            .getElementById(
                "loginForm"
            )
            .reset();


        showPage(
            "officerPortal"
        );


    } catch (error) {

        console.error(
            "Login error:",
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


            case "auth/user-not-found":

                message =
                    "❌ این Officer در Firebase وجود ندارد.";

                break;


            case "auth/wrong-password":

                message =
                    "❌ Password اشتباه است.";

                break;


            case "auth/too-many-requests":

                message =
                    "❌ تعداد تلاش‌های ورود بیش از حد مجاز است.";

                break;


            case "auth/network-request-failed":

                message =
                    "❌ اتصال به Firebase برقرار نشد.";

                break;

        }


        showResult(
            "loginResult",
            message,
            false
        );

    }

}


// ==========================================================
// LOGOUT
// ==========================================================

async function logoutOfficer() {

    try {

        await signOut(auth);

        currentUser = null;

        showPage("home");


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

    onAuthStateChanged(
        auth,
        user => {

            currentUser =
                user || null;


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
                    "Officer authenticated:",
                    user.email
                );

            } else {

                console.log(
                    "No authenticated officer."
                );


                if (email) {

                    email.textContent =
                        "-";

                }


                // -----------------------------------------
                // If someone somehow reaches protected page
                // -----------------------------------------

                const activePage =
                    document.querySelector(
                        ".page.active"
                    );


                if (
                    activePage &&
                    (
                        activePage.id ===
                        "officerPortal" ||

                        activePage.id ===
                        "officerAssessment"
                    )
                ) {

                    showPage("home");

                }

            }

        }
    );

}


// ==========================================================
// EVENTS
// ==========================================================

function initializeEvents() {

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


    const examSubmit =
        document.getElementById(
            "officerExamSubmit"
        );


    if (examSubmit) {

        examSubmit.addEventListener(
            "click",
            submitOfficerAssessment
        );

    }


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


    const logoutButton =
        document.getElementById(
            "logoutButton"
        );


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            logoutOfficer
        );

    }

}


// ==========================================================
// START APPLICATION
// ==========================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "LSPD Firearms Academy starting..."
        );


        initializeNavigation();

        initializeHandbook();

        loadCivilianQuestions();

        initializeEvents();

        initializeAuth();


        console.log(
            "LSPD Firearms Academy ready."
        );

    }
);
