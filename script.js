```javascript
// ==========================================================
// LSPD FIREARMS ACADEMY
// COMPLETE SCRIPT
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
    push,
    set,
    serverTimestamp
} from
"https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";


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

let app;
let auth;
let database;

try {

    app = initializeApp(firebaseConfig);

    auth = getAuth(app);

    database = getDatabase(app);

    console.log(
        "Firebase initialized successfully."
    );

} catch (error) {

    console.error(
        "Firebase initialization error:",
        error
    );

}


// ==========================================================
// PAGE NAVIGATION
// ==========================================================

function showPage(pageId) {

    const target =
        document.getElementById(pageId);

    if (!target) {

        console.error(
            "Page not found:",
            pageId
        );

        return;
    }


    document
        .querySelectorAll(".page-section")
        .forEach(function(page) {

            page.classList.remove("active");

        });


    target.classList.add("active");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    console.log(
        "Opened page:",
        pageId
    );
}


// Make available globally if needed
window.showPage = showPage;


// ==========================================================
// NAVIGATION BUTTONS
// ==========================================================

function initializeNavigation() {

    const buttons =
        document.querySelectorAll(
            "[data-page]"
        );


    buttons.forEach(function(button) {

        button.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                const pageId =
                    button.dataset.page;

                if (!pageId) {
                    return;
                }

                showPage(pageId);

            }
        );

    });


    console.log(
        "Navigation buttons:",
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


    console.log(
        "Handbook cards:",
        cards.length
    );
}


// ==========================================================
// CIVILIAN QUESTIONS
// ==========================================================

const civilianQuestions = [

    "هدف اصلی Firearms Academy چیست؟",

    "مسئولیت دارنده Permit چیست؟",

    "اگر شرایط دریافت Permit را دیگر نداشته باشید چه می‌کنید؟",

    "اگر Permit شما تعلیق شود چه واکنشی دارید؟",

    "چه چیزی می‌تواند یک موقعیت عادی را خطرناک کند؟",

    "برای جلوگیری از تشدید یک موقعیت تنش‌زا چه می‌کنید؟",

    "اگر فرد مقابل عصبانی باشد چگونه شرایط را آرام می‌کنید؟",

    "اگر شخص دیگری Permit شما را بخواهد چه می‌کنید؟",

    "اگر شاهد رفتار غیرقانونی مرتبط با Permit باشید چه می‌کنید؟",

    "اگر دوست یا خانواده بخواهد از Permit شما استفاده کند چه می‌گویید؟",

    "اگر درباره اعتبار Permit مطمئن نباشید از چه کسی سؤال می‌کنید؟",

    "اگر در مکان عمومی شرایط خطرناک شود اولویت شما چیست؟",

    "تفاوت داشتن Permit با اختیار نامحدود چیست؟",

    "چرا دارنده Permit باید مسئولیت‌پذیر باشد؟",

    "اگر شخصی عمداً شما را وارد درگیری کند چه می‌کنید؟"

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
        function(question, index) {

            const box =
                document.createElement("div");


            box.className =
                "scenario-question";


            box.innerHTML = `

                <p>
                    ${index + 1}. ${question}
                </p>

                <textarea
                    name="civilian_question_${index + 1}"
                    placeholder="پاسخ متقاضی..."
                ></textarea>

            `;


            container.appendChild(box);

        }
    );
}


// ==========================================================
// CIVILIAN SUBMIT
// ==========================================================

async function submitCivilian() {

    const nameElement =
        document.getElementById(
            "civilianName"
        );

    const examinerElement =
        document.getElementById(
            "civilianExaminer"
        );

    const result =
        document.getElementById(
            "civilianResult"
        );


    if (!nameElement || !examinerElement || !result) {
        return;
    }


    const name =
        nameElement.value.trim();

    const examiner =
        examinerElement.value.trim();


    if (!name) {

        result.className =
            "result-box show danger";

        result.textContent =
            "لطفاً نام متقاضی را وارد کنید.";

        return;
    }


    const answers = {};


    civilianQuestions.forEach(
        function(question, index) {

            const textarea =
                document.querySelector(
                    `[name="civilian_question_${index + 1}"]`
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

        if (!database) {
            throw new Error(
                "Firebase Database آماده نیست."
            );
        }


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


        result.className =
            "result-box show success";


        result.innerHTML = `
            ✅ فرم با موفقیت ذخیره شد.
            <br><br>
            Application ID:
            ${applicationRef.key}
        `;


    } catch (error) {

        console.error(
            "Civilian save error:",
            error
        );


        result.className =
            "result-box show danger";


        result.innerHTML = `
            ❌ ذخیره فرم انجام نشد.
            <br><br>
            ${error.message}
        `;

    }

}


// ==========================================================
// OFFICER QUESTIONS
// ==========================================================

const officerQuestions = [

    {
        q: "LEVEL 0 به چه معناست؟",
        options: [
            "Basic Equipment",
            "Patrol Equipment",
            "بدون دسترسی",
            "Restricted Equipment"
        ],
        answer: 2
    },

    {
        q: "LEVEL 1 چیست؟",
        options: [
            "Basic Equipment",
            "Special Equipment",
            "Restricted Equipment",
            "بدون دسترسی"
        ],
        answer: 0
    },

    {
        q: "LEVEL 2 چیست؟",
        options: [
            "بدون دسترسی",
            "Patrol Equipment",
            "Restricted Equipment",
            "Special Equipment"
        ],
        answer: 1
    },

    {
        q: "LEVEL 3 چیست؟",
        options: [
            "Basic Equipment",
            "Patrol Equipment",
            "Specialized Equipment",
            "بدون دسترسی"
        ],
        answer: 2
    },

    {
        q: "LEVEL 4 چیست؟",
        options: [
            "Basic Equipment",
            "Restricted Equipment",
            "Patrol Equipment",
            "Standard Equipment"
        ],
        answer: 1
    },

    {
        q: "آیا Rank به تنهایی دسترسی به تمام تجهیزات می‌دهد؟",
        options: [
            "بله",
            "خیر",
            "همیشه",
            "فقط برای Senior Officer"
        ],
        answer: 1
    },

    {
        q: "Equipment Access باید بر چه اساسی باشد؟",
        options: [
            "Rank فقط",
            "Training فقط",
            "Rank + Training + Authorization",
            "Vehicle + Rank"
        ],
        answer: 2
    },

    {
        q: "مهم‌ترین اصل Firearms Division چیست؟",
        options: [
            "Speed",
            "Safety",
            "Appearance",
            "Patrol"
        ],
        answer: 1
    },

    {
        q: "استفاده نمایشی و غیرضروری از تجهیزات چگونه است؟",
        options: [
            "مجاز است",
            "توصیه می‌شود",
            "باید از آن خودداری شود",
            "اجباری است"
        ],
        answer: 2
    },

    {
        q: "در صورت مشکل تجهیزات چه باید کرد؟",
        options: [
            "نادیده گرفت",
            "به Supervisor گزارش کرد",
            "مخفی کرد",
            "به فرد دیگر داد"
        ],
        answer: 1
    },

    {
        q: "ترتیب مناسب Escalation چیست؟",
        options: [
            "Weapon → Control → Communication",
            "Communication → De-escalation → Control → Appropriate Response",
            "Control → Weapon → Communication",
            "Weapon → Weapon → Weapon"
        ],
        answer: 1
    },

    {
        q: "Weapon در Escalation Policy چه جایگاهی دارد؟",
        options: [
            "First Option",
            "Weapon ≠ First Option",
            "همیشه اجباری",
            "تنها روش کنترل"
        ],
        answer: 1
    },

    {
        q: "Incident Report برای چیست؟",
        options: [
            "ثبت و گزارش Incident",
            "افزایش Rank",
            "سرگرمی",
            "حذف قوانین"
        ],
        answer: 0
    },

    {
        q: "کدام مورد باید در Incident Report باشد؟",
        options: [
            "Incident ID",
            "Favorite Color",
            "Game Level",
            "Personal Hobby"
        ],
        answer: 0
    },

    {
        q: "برای Authorization خاص چه چیزی لازم است؟",
        options: [
            "Training مناسب",
            "فقط Rank",
            "فقط Vehicle",
            "هیچ چیز"
        ],
        answer: 0
    },

    {
        q: "Minimum Certification Score چند درصد است؟",
        options: [
            "50%",
            "60%",
            "70%",
            "80%"
        ],
        answer: 3
    },

    {
        q: "کدام مورد مسئولیت Officer است؟",
        options: [
            "رعایت قوانین Department",
            "نادیده گرفتن Chain of Command",
            "استفاده بدون Authorization",
            "عدم گزارش Incident"
        ],
        answer: 0
    },

    {
        q: "آیا Chain of Command باید رعایت شود؟",
        options: [
            "بله",
            "خیر",
            "فقط گاهی",
            "فقط توسط Instructor"
        ],
        answer: 0
    },

    {
        q: "قبل از تصمیم مهم Officer باید چه کند؟",
        options: [
            "شرایط موقعیت را ارزیابی کند",
            "بدون بررسی اقدام کند",
            "قوانین را نادیده بگیرد",
            "Incident را حذف کند"
        ],
        answer: 0
    },

    {
        q: "نقض قوانین Firearms Division ممکن است چه نتیجه‌ای داشته باشد؟",
        options: [
            "هیچ نتیجه‌ای ندارد",
            "بررسی داخلی و اقدامات انضباطی",
            "افزایش Rank",
            "Authorization بیشتر"
        ],
        answer: 1
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
        function(question, index) {

            const box =
                document.createElement("div");


            box.className =
                "question";


            let html = `
                <p>
                    ${index + 1}.
                    ${question.q}
                </p>
            `;


            question.options.forEach(
                function(option, optionIndex) {

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


            container.appendChild(box);

        }
    );

}


// ==========================================================
// SUBMIT OFFICER EXAM
// ==========================================================

async function submitOfficerExam() {

    const result =
        document.getElementById(
            "examResult"
        );


    let score = 0;

    let unanswered = 0;

    const answers = {};


    officerQuestions.forEach(
        function(question, index) {

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

        if (!database) {

            throw new Error(
                "Firebase Database آماده نیست."
            );

        }


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
                    serverTimestamp(),

                officerEmail:
                    auth && auth.currentUser
                        ? auth.currentUser.email
                        : "Public Test"

            }
        );


        if (percentage >= 80) {

            result.className =
                "result-box show success";


            result.innerHTML = `
                ✅ PASS
                <br><br>
                Score:
                ${score} / ${total}
                <br>
                Percentage:
                ${percentage}%
                <br><br>
                آزمون با موفقیت ثبت شد.
            `;

        } else {

            result.className =
                "result-box show danger";


            result.innerHTML = `
                ❌ FAIL
                <br><br>
                Score:
                ${score} / ${total}
                <br>
                Percentage:
                ${percentage}%
                <br><br>
                حداقل نمره قبولی 80% است.
            `;

        }


    } catch (error) {

        console.error(
            "Exam save error:",
            error
        );


        result.className =
            "result-box show danger";


        result.innerHTML = `
            ❌ ذخیره آزمون انجام نشد.
            <br><br>
            ${error.message}
        `;

    }

}


// ==========================================================
// LOGIN
// ==========================================================

async function loginOfficer(event) {

    event.preventDefault();


    const email =
        document.getElementById(
            "officerEmail"
        ).value.trim();


    const password =
        document.getElementById(
            "officerPassword"
        ).value;


    const result =
        document.getElementById(
            "loginResult"
        );


    if (!email || !password) {

        result.className =
            "result-box show danger";

        result.textContent =
            "Email و Password را وارد کنید.";

        return;
    }


    result.className =
        "result-box show";

    result.textContent =
        "در حال ورود...";


    try {

        const credential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


        const emailElement =
            document.getElementById(
                "loggedOfficerEmail"
            );


        if (emailElement) {

            emailElement.textContent =
                credential.user.email;

        }


        result.className =
            "result-box show success";


        result.textContent =
            "ورود موفق بود.";


        showPage(
            "officerPanelPage"
        );


    } catch (error) {

        console.error(
            "Login error:",
            error
        );


        let message =
            "ورود ناموفق بود.";


        if (
            error.code ===
            "auth/invalid-credential"
        ) {

            message =
                "Email یا Password اشتباه است.";

        }


        else if (
            error.code ===
            "auth/invalid-email"
        ) {

            message =
                "فرمت Email صحیح نیست.";

        }


        result.className =
            "result-box show danger";


        result.textContent =
            message;

    }

}


// ==========================================================
// LOGOUT
// ==========================================================

async function logoutOfficer() {

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

            }

        }
    );

}


// ==========================================================
// EVENT LISTENERS
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
            submitOfficerExam
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
// START
// ==========================================================

function startApplication() {

    console.log(
        "LSPD Firearms Academy starting..."
    );


    initializeNavigation();

    initializeHandbook();

    loadCivilianQuestions();

    loadOfficerExam();

    initializeEvents();

    initializeAuth();


    showPage("home");


    console.log(
        "LSPD Firearms Academy ready."
    );

}


if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        startApplication
    );

} else {

    startApplication();

}
```
