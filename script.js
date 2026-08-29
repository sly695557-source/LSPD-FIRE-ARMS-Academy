```javascript
// ==========================================================
// LSPD FIREARMS ACADEMY
// COMPLETE FIREBASE SCRIPT
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
// FIREBASE INITIALIZATION
// ==========================================================

let app = null;
let auth = null;
let database = null;

try {

    app = initializeApp(firebaseConfig);

    auth = getAuth(app);

    database = getDatabase(app);

    console.log(
        "LSPD Firebase initialized successfully."
    );

} catch (error) {

    console.error(
        "Firebase initialization failed:",
        error
    );

}


// ==========================================================
// PAGE SYSTEM
// ==========================================================

function showPage(pageId) {

    const pages =
        document.querySelectorAll(".page-section");


    pages.forEach(page => {

        page.classList.remove("active");

    });


    const target =
        document.getElementById(pageId);


    if (!target) {

        console.error(
            "Page does not exist:",
            pageId
        );

        return;

    }


    target.classList.add("active");


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
        document.querySelectorAll("[data-page]");


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const pageId =
                    button.getAttribute(
                        "data-page"
                    );


                if (pageId) {

                    showPage(pageId);

                }

            }
        );

    });


    console.log(
        "Navigation initialized:",
        buttons.length
    );

}


// ==========================================================
// HANDBOOK ACCORDION
// ==========================================================

function initializeHandbook() {

    const cards =
        document.querySelectorAll(
            ".handbook-card"
        );


    cards.forEach(card => {

        const title =
            card.querySelector("h3");


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
            () => {

                const currentlyOpen =
                    content.style.display ===
                    "block";


                cards.forEach(otherCard => {

                    const otherContent =
                        otherCard.querySelector(
                            ".handbook-content"
                        );


                    if (otherContent) {

                        otherContent.style.display =
                            "none";

                    }

                });


                if (!currentlyOpen) {

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

    {
        question:
            "هدف اصلی Firearms Academy چیست؟",

        options: [
            "استفاده نمایشی از تجهیزات",
            "آموزش، ایمنی و مسئولیت‌پذیری",
            "نادیده گرفتن قوانین",
            "افزایش خودکار Rank"
        ]
    },


    {
        question:
            "آیا Rank به تنهایی دسترسی به تمام تجهیزات را ایجاد می‌کند؟",

        options: [
            "بله",
            "خیر",
            "همیشه",
            "فقط برای Officer جدید"
        ]
    },


    {
        question:
            "Equipment Access باید بر اساس چه چیزی باشد؟",

        options: [
            "Rank فقط",
            "Training فقط",
            "Rank + Training + Authorization",
            "Vehicle + Rank"
        ]
    },


    {
        question:
            "LEVEL 0 به چه معناست؟",

        options: [
            "Basic Equipment",
            "Patrol",
            "بدون دسترسی",
            "Special Authorization"
        ]
    },


    {
        question:
            "LEVEL 1 چیست؟",

        options: [
            "Basic Equipment",
            "Restricted Equipment",
            "Special Authorization",
            "بدون دسترسی"
        ]
    },


    {
        question:
            "LEVEL 2 چیست؟",

        options: [
            "Patrol Authorization",
            "بدون دسترسی",
            "Basic Equipment",
            "Restricted Equipment"
        ]
    },


    {
        question:
            "مهم‌ترین اصل Firearms Safety چیست؟",

        options: [
            "Speed",
            "Safety",
            "Appearance",
            "Rank"
        ]
    },


    {
        question:
            "آیا استفاده نمایشی یا غیرضروری از تجهیزات مناسب است؟",

        options: [
            "بله",
            "خیر",
            "همیشه",
            "فقط در Patrol"
        ]
    },


    {
        question:
            "در صورت مشاهده مشکل تجهیزات چه باید کرد؟",

        options: [
            "نادیده گرفت",
            "گزارش کرد",
            "مخفی کرد",
            "به فرد دیگری داد"
        ]
    },


    {
        question:
            "اولین مرحله در Escalation مناسب چیست؟",

        options: [
            "Weapon",
            "Communication",
            "اقدام شدید",
            "ترک موقعیت"
        ]
    }

];


// ==========================================================
// LOAD CIVILIAN QUESTIONS
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
                                name="civilian_${index}"
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
// SUBMIT CIVILIAN
// ==========================================================

async function submitCivilian() {

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


    if (!name) {

        result.innerHTML =
            "❌ لطفاً نام متقاضی را وارد کنید.";

        return;

    }


    const answers = {};


    civilianQuestions.forEach(
        (question, index) => {

            const selected =
                document.querySelector(
                    `input[name="civilian_${index}"]:checked`
                );


            answers[
                `question_${index + 1}`
            ] =
                selected
                    ? Number(selected.value)
                    : null;

        }
    );


    try {

        if (!database) {

            throw new Error(
                "Firebase Database is not initialized."
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


        result.innerHTML = `
            <div class="success">
                ✅ فرم با موفقیت ثبت شد.
                <br>
                Application ID:
                ${applicationRef.key}
            </div>
        `;


        console.log(
            "Civilian application saved:",
            applicationRef.key
        );


    } catch (error) {

        console.error(
            "Civilian Firebase error:",
            error
        );


        result.innerHTML = `
            <div class="danger">
                ❌ ذخیره فرم انجام نشد.
                <br><br>
                ${error.message}
            </div>
        `;

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
            "Restricted Equipment",
            "Special Authorization"
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
            "فرمول صحیح Equipment Access چیست؟",

        options: [
            "Rank",
            "Training",
            "Rank + Training + Authorization",
            "Officer + Vehicle"
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
            "ترتیب مناسب Escalation کدام است؟",

        options: [
            "Weapon → Control → Communication",
            "Communication → De-escalation → Control → Appropriate Response",
            "Control → Weapon → Communication",
            "Weapon → Weapon → Weapon"
        ],

        answer: 1
    },


    {
        question:
            "Weapon در Escalation Policy چه جایگاهی دارد؟",

        options: [
            "First Option",
            "Weapon ≠ First Option",
            "همیشه اجباری",
            "تنها روش کنترل"
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
            "Officer برای استفاده از Authorization خاص چه چیزی لازم دارد؟",

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
            "آیا Officer می‌تواند بدون Training مناسب از تجهیزات دارای Authorization خاص استفاده کند؟",

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


    console.log(
        "Officer exam questions:",
        officerQuestions.length
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


    if (!auth || !auth.currentUser) {

        result.innerHTML =
            "❌ ابتدا وارد Officer Portal شوید.";

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
                "Firebase Database is not initialized."
            );

        }


        const user =
            auth.currentUser;


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
                    user.uid,

                officerEmail:
                    user.email,

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


        result.innerHTML = `

            <div class="success">

                ✅ آزمون با موفقیت ثبت شد.

                <br><br>

                امتیاز:
                ${score} / ${total}

                <br>

                درصد:
                ${percentage}%

                <br>

                بدون پاسخ:
                ${unanswered}

                <br><br>

                Exam ID:
                ${examRef.key}

            </div>

        `;


        console.log(
            "Officer exam saved:",
            examRef.key
        );


    } catch (error) {

        console.error(
            "Officer exam save error:",
            error
        );


        result.innerHTML = `

            <div class="danger">

                ❌ ذخیره آزمون انجام نشد.

                <br><br>

                ${error.message}

            </div>

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

        result.innerHTML =
            "❌ Email و Password را وارد کنید.";

        return;

    }


    try {

        const credential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


        document.getElementById(
            "loggedOfficerEmail"
        ).textContent =
            credential.user.email;


        result.innerHTML =
            "✅ ورود موفق بود.";


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


        result.innerHTML =
            message;

    }

}


// ==========================================================
// LOGOUT
// ==========================================================

async function logoutOfficer() {

    try {

        await signOut(auth);

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

    if (!auth) {
        return;
    }


    onAuthStateChanged(
        auth,
        user => {

            if (user) {

                const email =
                    document.getElementById(
                        "loggedOfficerEmail"
                    );


                if (email) {

                    email.textContent =
                        user.email;

                }


                console.log(
                    "Authenticated:",
                    user.email
                );

            } else {

                console.log(
                    "No authenticated officer."
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

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "================================"
        );

        console.log(
            "LSPD Academy starting..."
        );

        console.log(
            "================================"
        );


        initializeNavigation();

        initializeHandbook();

        loadCivilianQuestions();

        loadOfficerExam();

        initializeEvents();

        initializeAuth();


        console.log(
            "LSPD Academy is ready."
        );

    }
);
```
