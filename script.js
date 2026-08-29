```javascript
// ==========================================================
// LSPD FIREARMS DIVISION
// COMPLETE FIREBASE AUTH + NAVIGATION
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
// FIREBASE
// ==========================================================

const app =
    initializeApp(firebaseConfig);

const auth =
    getAuth(app);


// ==========================================================
// AUTH CHECK
// ==========================================================

function isOfficerLoggedIn() {

    return !!auth.currentUser;

}


// ==========================================================
// PAGE SYSTEM
// ==========================================================

function showPage(pageId) {

    // ------------------------------------------------------
    // PROTECTED PAGES
    // ------------------------------------------------------

    const protectedPages = [
        "officerPanelPage",
        "officerExam"
    ];


    // ------------------------------------------------------
    // BLOCK UNAUTHORIZED ACCESS
    // ------------------------------------------------------

    if (
        protectedPages.includes(pageId) &&
        !isOfficerLoggedIn()
    ) {

        console.log(
            "Unauthorized page access blocked."
        );

        pageId = "login";

    }


    // ------------------------------------------------------
    // HIDE ALL PAGES
    // ------------------------------------------------------

    const pages =
        document.querySelectorAll(
            ".page-section"
        );


    pages.forEach(page => {

        page.classList.remove(
            "active"
        );

    });


    // ------------------------------------------------------
    // SHOW TARGET
    // ------------------------------------------------------

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


    console.log(
        "Page opened:",
        pageId
    );

}


// ==========================================================
// NAVIGATION
// ==========================================================

function initializeNavigation() {

    const buttons =
        document.querySelectorAll(
            "[data-page]"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const page =
                    this.getAttribute(
                        "data-page"
                    );


                if (!page) {
                    return;
                }


                showPage(page);

            }
        );

    });


    console.log(
        "Navigation initialized:",
        buttons.length
    );

}


// ==========================================================
// HANDBOOK
// ==========================================================

function initializeHandbook() {

    const cards =
        document.querySelectorAll(
            ".handbook-card"
        );


    cards.forEach(card => {

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


        // Initial state

        content.style.display =
            "none";


        title.style.cursor =
            "pointer";


        title.addEventListener(
            "click",
            function () {

                const isOpen =
                    content.style.display ===
                    "block";


                // Close all

                cards.forEach(
                    otherCard => {

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


                // Open clicked

                if (!isOpen) {

                    content.style.display =
                        "block";

                }

            }
        );

    });


    console.log(
        "Handbook initialized:",
        cards.length
    );

}


// ==========================================================
// CIVILIAN QUESTIONS
// ==========================================================

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


// ==========================================================
// LOAD CIVILIAN
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
        (question, index) => {

            const box =
                document.createElement(
                    "div"
                );


            box.className =
                "scenario-question";


            box.innerHTML = `

                <p>
                    ${index + 1}.
                    ${question}
                </p>

                <textarea
                    placeholder="پاسخ متقاضی..."
                ></textarea>

            `;


            container.appendChild(
                box
            );

        }
    );

}


// ==========================================================
// CIVILIAN SUBMIT
// ==========================================================

function submitCivilian() {

    const name =
        document.getElementById(
            "civilianName"
        )?.value.trim();


    const examiner =
        document.getElementById(
            "civilianExaminer"
        )?.value.trim();


    const result =
        document.getElementById(
            "civilianResult"
        );


    if (!result) {
        return;
    }


    if (!name) {

        result.innerHTML =
            '<div class="danger">❌ لطفاً نام متقاضی را وارد کنید.</div>';

        return;
    }


    if (!examiner) {

        result.innerHTML =
            '<div class="danger">❌ لطفاً نام Examiner را وارد کنید.</div>';

        return;
    }


    result.innerHTML = `

        <div class="success">

            ✅ فرم آماده بررسی است.

            <br><br>

            Applicant:
            ${name}

            <br>

            Examiner:
            ${examiner}

        </div>

    `;

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
            "Patrol Equipment",
            "بدون Authorization",
            "Restricted Equipment"
        ],

        answer: 2
    },


    {
        question:
            "LEVEL 1 چیست؟",

        options: [
            "Equipment پایه",
            "Restricted Equipment",
            "Specialized Equipment",
            "بدون دسترسی"
        ],

        answer: 0
    },


    {
        question:
            "LEVEL 2 چیست؟",

        options: [
            "Patrol Equipment",
            "بدون دسترسی",
            "Basic Equipment",
            "Restricted Equipment"
        ],

        answer: 0
    },


    {
        question:
            "LEVEL 3 چیست؟",

        options: [
            "Basic Equipment",
            "Patrol Equipment",
            "Specialized Equipment با مجوز",
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
            "Patrol Equipment",
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
            "یک Officer برای تجهیزات خاص باید چه چیزی داشته باشد؟",

        options: [
            "فقط Rank",
            "Training و Authorization مناسب",
            "فقط Vehicle",
            "هیچ چیزی"
        ],

        answer: 1
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
            "Weapon در RP چه جایگاهی دارد؟",

        options: [
            "First Option",
            "Weapon is not the first option",
            "همیشه اجباری",
            "تنها روش کنترل"
        ],

        answer: 1
    },


    {
        question:
            "اولین مرحله Escalation مناسب چیست؟",

        options: [
            "Weapon",
            "Communication",
            "Control",
            "Immediate Force"
        ],

        answer: 1
    },


    {
        question:
            "پس از Communication چه مرحله‌ای قرار دارد؟",

        options: [
            "Weapon",
            "De-escalation",
            "Removal",
            "Arrest"
        ],

        answer: 1
    },


    {
        question:
            "تجهیزات Lost یا Missing باید چه زمانی گزارش شوند؟",

        options: [
            "هرگز",
            "در پایان ماه",
            "بلافاصله به Supervisor",
            "فقط اگر کسی پرسید"
        ],

        answer: 2
    },


    {
        question:
            "آیا استفاده شخصی از تجهیزات LSPD مجاز است؟",

        options: [
            "بله",
            "خیر",
            "همیشه",
            "فقط خارج از شهر"
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
            "Minimum Score برای Certification چند درصد است؟",

        options: [
            "50%",
            "60%",
            "70%",
            "80%"
        ],

        answer: 3
    }

];


// ==========================================================
// LOAD OFFICER EXAM
// ==========================================================

function loadOfficerExam() {

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
// OPEN ASSESSMENT
// ==========================================================

function openAssessment() {

    if (!isOfficerLoggedIn()) {

        showPage(
            "login"
        );

        return;
    }


    showPage(
        "officerExam"
    );

}


// ==========================================================
// OFFICER EXAM SUBMIT
// ==========================================================

function submitOfficerExam() {

    const result =
        document.getElementById(
            "examResult"
        );


    if (!isOfficerLoggedIn()) {

        if (result) {

            result.innerHTML =
                '<div class="danger">❌ ابتدا وارد Officer Portal شوید.</div>';

        }

        showPage(
            "login"
        );

        return;
    }


    let score = 0;


    let unanswered = 0;


    officerQuestions.forEach(
        (question, index) => {

            const selected =
                document.querySelector(
                    `input[name="officer_${index}"]:checked`
                );


            if (!selected) {

                unanswered++;

                return;

            }


            if (
                Number(
                    selected.value
                ) ===
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


    if (percentage >= 80) {

        result.innerHTML = `

            <div class="success">

                ✅ PASS

                <br><br>

                Score:
                ${score} / ${total}

                <br>

                Percentage:
                ${percentage}%

                <br>

                Unanswered:
                ${unanswered}

            </div>

        `;

    } else {

        result.innerHTML = `

            <div class="danger">

                ❌ FAIL

                <br><br>

                Score:
                ${score} / ${total}

                <br>

                Percentage:
                ${percentage}%

                <br>

                Minimum passing score:
                80%

            </div>

        `;

    }

}


// ==========================================================
// LOGIN
// ==========================================================

async function loginOfficer(event) {

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


    const email =
        emailInput.value.trim();


    const password =
        passwordInput.value;


    if (!email || !password) {

        result.innerHTML =
            '<div class="danger">❌ Email و Password را وارد کنید.</div>';

        return;
    }


    try {

        result.innerHTML =
            "⏳ در حال ورود...";


        const credential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


        const user =
            credential.user;


        const officerEmail =
            document.getElementById(
                "loggedOfficerEmail"
            );


        if (officerEmail) {

            officerEmail.textContent =
                user.email;

        }


        result.innerHTML =
            '<div class="success">✅ ورود موفق بود.</div>';


        showPage(
            "officerPanelPage"
        );


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


            case "auth/user-not-found":

                message =
                    "❌ این Officer در Firebase وجود ندارد.";

                break;


            case "auth/wrong-password":

                message =
                    "❌ Password اشتباه است.";

                break;


            case "auth/invalid-email":

                message =
                    "❌ Email معتبر نیست.";

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


        result.innerHTML =
            `<div class="danger">${message}</div>`;

    }

}


// ==========================================================
// LOGOUT
// ==========================================================

async function logoutOfficer() {

    try {

        await signOut(
            auth
        );


        showPage(
            "home"
        );


        console.log(
            "Officer logged out."
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

    onAuthStateChanged(
        auth,
        user => {

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
                        user.email;

                }

            } else {

                console.log(
                    "No Officer authenticated."
                );


                if (emailElement) {

                    emailElement.textContent =
                        "";

                }


                // If user logs out while
                // viewing a protected page

                const activePage =
                    document.querySelector(
                        ".page-section.active"
                    );


                if (
                    activePage &&
                    (
                        activePage.id ===
                        "officerPanelPage" ||

                        activePage.id ===
                        "officerExam"
                    )
                ) {

                    showPage(
                        "home"
                    );

                }

            }

        }
    );

}


// ==========================================================
// EVENTS
// ==========================================================

function initializeEvents() {

    // Civilian

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


    // Login

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


    // Assessment button

    const assessmentButton =
        document.getElementById(
            "openAssessmentButton"
        );


    if (assessmentButton) {

        assessmentButton.addEventListener(
            "click",
            openAssessment
        );

    }


    // Assessment submit

    const examSubmit =
        document.getElementById(
            "officerExamSubmit"
        );


    if (examSubmit) {

        examSubmit.addEventListener(
            "click",
            submitOfficerExam
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
            logoutOfficer
        );

    }

}


// ==========================================================
// START
// ==========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "===================================="
        );

        console.log(
            "LSPD FIREARMS DIVISION ACADEMY"
        );

        console.log(
            "Firebase Authentication Enabled"
        );

        console.log(
            "===================================="
        );


        initializeNavigation();

        initializeHandbook();

        loadCivilianQuestions();

        loadOfficerExam();

        initializeEvents();

        initializeAuth();


        // Always start at home

        showPage(
            "home"
        );


        console.log(
            "LSPD Academy is ready."
        );

    }
);
```
