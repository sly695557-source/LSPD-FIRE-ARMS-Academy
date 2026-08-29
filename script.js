```javascript
// ======================================================
// LSPD ACADEMY - COMPLETE SCRIPT
// Firebase Authentication + Realtime Database
// ======================================================

// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
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


// ======================================================
// FIREBASE CONFIG
// ======================================================

const firebaseConfig = {
    apiKey: "AIzaSyBF6MC3yN-vaTyVDrB2ACe69NLKVEe67KU",
    authDomain: "lspd-firearms-academy.firebaseapp.com",
    databaseURL: "https://lspd-firearms-academy-default-rtdb.firebaseio.com",
    projectId: "lspd-firearms-academy",
    storageBucket: "lspd-firearms-academy.firebasestorage.app",
    messagingSenderId: "699387767180",
    appId: "1:699387767180:web:0b17c5d8078636dacecea9",
    measurementId: "G-LW965BY152"
};


// ======================================================
// INITIALIZE FIREBASE
// ======================================================

let app;
let auth;
let database;

try {

    app = initializeApp(firebaseConfig);

    auth = getAuth(app);

    database = getDatabase(app);

    console.log("Firebase connected successfully.");

} catch (error) {

    console.error("Firebase initialization error:", error);

    showGlobalMessage(
        "اتصال به Firebase برقرار نشد. Console را بررسی کنید.",
        "error"
    );
}


// ======================================================
// PAGE NAVIGATION
// ======================================================

function showPage(pageId) {

    const pages = document.querySelectorAll(".page-section");

    pages.forEach(page => {
        page.classList.remove("active");
    });

    const target = document.getElementById(pageId);

    if (target) {
        target.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        console.log("Opened page:", pageId);
    } else {
        console.error("Page not found:", pageId);
    }
}


// ======================================================
// ALL BUTTONS WITH data-page
// ======================================================

function setupNavigation() {

    const buttons = document.querySelectorAll("[data-page]");

    buttons.forEach(button => {

        button.addEventListener("click", function () {

            const page = this.getAttribute("data-page");

            if (page) {
                showPage(page);
            }

        });

    });

    console.log("Navigation buttons:", buttons.length);
}


// ======================================================
// HANDBOOK ACCORDION
// ======================================================

function setupHandbook() {

    const cards = document.querySelectorAll(".handbook-card");

    cards.forEach(card => {

        const title = card.querySelector("h3");
        const content = card.querySelector(".handbook-content");

        if (!title || !content) return;

        // Initial state
        content.style.display = "none";

        title.style.cursor = "pointer";

        title.addEventListener("click", function () {

            const isOpen = content.style.display === "block";

            // Close all sections
            cards.forEach(otherCard => {

                const otherContent =
                    otherCard.querySelector(".handbook-content");

                if (otherContent) {
                    otherContent.style.display = "none";
                }

            });

            // Open selected section
            if (!isOpen) {

                content.style.display = "block";

                console.log(
                    "Handbook section opened:",
                    title.innerText
                );

            }

        });

    });

    console.log("Handbook sections:", cards.length);
}


// ======================================================
// CIVILIAN QUESTIONS
// ======================================================

const civilianQuestions = [

    {
        question: "هدف اصلی Firearms Safety چیست؟",
        options: [
            "استفاده نمایشی از تجهیزات",
            "حفظ ایمنی و مسئولیت‌پذیری",
            "استفاده بدون Authorization",
            "نادیده گرفتن قوانین"
        ]
    },

    {
        question: "آیا Rank به تنهایی اجازه استفاده از تمام تجهیزات را می‌دهد؟",
        options: [
            "بله",
            "خیر",
            "همیشه",
            "فقط در شرایط خاص"
        ]
    },

    {
        question: "قبل از استفاده از تجهیزات چه چیزی باید بررسی شود؟",
        options: [
            "Rank + Training + Authorization",
            "فقط Rank",
            "فقط سن Officer",
            "هیچ چیز"
        ]
    },

    {
        question: "در یک موقعیت Roleplay مناسب، اولین قدم چیست؟",
        options: [
            "اقدام شدید",
            "Communication",
            "استفاده فوری از تجهیزات",
            "ترک موقعیت"
        ]
    },

    {
        question: "Incident مهم باید چگونه مدیریت شود؟",
        options: [
            "نادیده گرفته شود",
            "طبق سیستم Department گزارش شود",
            "در شبکه اجتماعی منتشر شود",
            "حذف شود"
        ]
    }

];


function loadCivilianQuestions() {

    const container =
        document.getElementById("civilianQuestions");

    if (!container) return;

    container.innerHTML = "";

    civilianQuestions.forEach((item, index) => {

        const question = document.createElement("div");

        question.className = "question";

        let html = `
            <p>
                ${index + 1}. ${item.question}
            </p>
        `;

        item.options.forEach((option, optionIndex) => {

            html += `
                <label>
                    <input
                        type="radio"
                        name="civilian_${index}"
                        value="${optionIndex}">
                    ${option}
                </label>
            `;

        });

        question.innerHTML = html;

        container.appendChild(question);

    });

}


// ======================================================
// CIVILIAN FORM SUBMIT
// ======================================================

async function submitCivilianForm() {

    const name =
        document.getElementById("civilianName")?.value.trim();

    const examiner =
        document.getElementById("civilianExaminer")?.value.trim();

    const result =
        document.getElementById("civilianResult");


    if (!name) {

        if (result) {
            result.innerHTML =
                "لطفاً نام متقاضی را وارد کنید.";
        }

        return;
    }


    let answers = {};

    civilianQuestions.forEach((item, index) => {

        const selected =
            document.querySelector(
                `input[name="civilian_${index}"]:checked`
            );

        answers[index + 1] =
            selected ? selected.value : null;

    });


    try {

        if (!database) {
            throw new Error("Firebase Database is not initialized.");
        }


        const resultRef =
            push(ref(database, "civilianApplications"));


        await set(resultRef, {

            applicantName: name,

            examiner: examiner || "Not specified",

            answers: answers,

            questionCount: civilianQuestions.length,

            submittedAt: serverTimestamp()

        });


        if (result) {

            result.innerHTML =
                "✅ فرم با موفقیت ثبت شد.";

        }

        console.log(
            "Civilian application saved:",
            resultRef.key
        );


    } catch (error) {

        console.error(
            "Civilian submission error:",
            error
        );

        if (result) {

            result.innerHTML =
                "❌ ذخیره اطلاعات انجام نشد.<br>" +
                error.message;

        }

    }

}


// ======================================================
// OFFICER EXAM QUESTIONS
// ======================================================

const officerQuestions = [

    {
        question: "LEVEL 0 به چه معناست؟",
        options: [
            "Basic Equipment",
            "Patrol Authorization",
            "بدون دسترسی",
            "Restricted Equipment"
        ],
        answer: 2
    },

    {
        question: "LEVEL 1 چیست؟",
        options: [
            "Basic Equipment",
            "Special Authorization",
            "Restricted Equipment",
            "بدون دسترسی"
        ],
        answer: 0
    },

    {
        question: "LEVEL 2 نشان‌دهنده چیست؟",
        options: [
            "بدون دسترسی",
            "Patrol Authorization",
            "Restricted Equipment",
            "Training"
        ],
        answer: 1
    },

    {
        question: "LEVEL 3 چیست؟",
        options: [
            "Basic Equipment",
            "Patrol Authorization",
            "Special Authorization",
            "بدون دسترسی"
        ],
        answer: 2
    },

    {
        question: "LEVEL 4 چیست؟",
        options: [
            "Basic Equipment",
            "Restricted Equipment",
            "Patrol Authorization",
            "Standard Equipment"
        ],
        answer: 1
    },

    {
        question: "آیا Rank به تنهایی برای دسترسی به تجهیزات کافی است؟",
        options: [
            "بله",
            "خیر",
            "همیشه",
            "فقط برای Officerهای جدید"
        ],
        answer: 1
    },

    {
        question: "فرمول صحیح Equipment Access چیست؟",
        options: [
            "Rank فقط",
            "Training فقط",
            "Rank + Training + Authorization",
            "Officer + Vehicle"
        ],
        answer: 2
    },

    {
        question: "مهم‌ترین اصل در Firearms Division چیست؟",
        options: [
            "Speed",
            "Safety",
            "Appearance",
            "Patrol"
        ],
        answer: 1
    },

    {
        question: "استفاده نمایشی یا غیرضروری از تجهیزات چگونه است؟",
        options: [
            "مجاز است",
            "توصیه می‌شود",
            "باید از آن خودداری شود",
            "اجباری است"
        ],
        answer: 2
    },

    {
        question: "در صورت مشاهده مشکل تجهیزات چه باید کرد؟",
        options: [
            "نادیده گرفت",
            "گزارش کرد",
            "مخفی کرد",
            "به Civilian داد"
        ],
        answer: 1
    },

    {
        question: "ترتیب مناسب Escalation چیست؟",
        options: [
            "Weapon → Control → Communication",
            "Communication → De-escalation → Control → Appropriate Response",
            "Control → Weapon → Communication",
            "Weapon → Weapon → Weapon"
        ],
        answer: 1
    },

    {
        question: "Weapon در Escalation Policy چه جایگاهی دارد؟",
        options: [
            "First Option",
            "Weapon ≠ First Option",
            "همیشه اجباری",
            "تنها روش کنترل"
        ],
        answer: 1
    },

    {
        question: "Incident Report باید شامل چه چیزی باشد؟",
        options: [
            "فقط نام Officer",
            "فقط زمان",
            "اطلاعات کامل Incident",
            "هیچ اطلاعاتی"
        ],
        answer: 2
    },

    {
        question: "کدام مورد بخشی از Incident Report است؟",
        options: [
            "Incident ID",
            "Favorite Color",
            "Game Level",
            "Personal Hobby"
        ],
        answer: 0
    },

    {
        question: "Officer قبل از استفاده از Authorization خاص باید چه داشته باشد؟",
        options: [
            "Training مناسب",
            "فقط Rank",
            "فقط Vehicle",
            "هیچ چیز"
        ],
        answer: 0
    },

    {
        question: "Certification Exam برای چیست؟",
        options: [
            "بررسی آمادگی Officer",
            "سرگرمی",
            "افزایش Rank به صورت خودکار",
            "حذف قوانین"
        ],
        answer: 0
    },

    {
        question: "کدام مورد نقض قوانین Department محسوب می‌شود؟",
        options: [
            "رعایت Chain of Command",
            "رفتار حرفه‌ای",
            "عدم رعایت قوانین Department",
            "گزارش صحیح Incident"
        ],
        answer: 2
    },

    {
        question: "Chain of Command باید رعایت شود؟",
        options: [
            "بله",
            "خیر",
            "فقط در مواقع خاص",
            "فقط توسط Instructor"
        ],
        answer: 0
    },

    {
        question: "Officer باید در موقعیت‌ها چه کاری انجام دهد؟",
        options: [
            "شرایط را ارزیابی کند",
            "بدون بررسی اقدام کند",
            "قوانین را نادیده بگیرد",
            "Incident را حذف کند"
        ],
        answer: 0
    },

    {
        question: "نقض قوانین Firearms Division ممکن است چه نتیجه‌ای داشته باشد؟",
        options: [
            "هیچ نتیجه‌ای ندارد",
            "بررسی داخلی و اقدامات انضباطی",
            "افزایش Rank",
            "دریافت Authorization بیشتر"
        ],
        answer: 1
    }

];


// ======================================================
// LOAD OFFICER EXAM
// ======================================================

function loadOfficerExam() {

    const container =
        document.getElementById("assessmentQuestions");

    if (!container) return;

    container.innerHTML = "";


    officerQuestions.forEach((item, index) => {

        const question =
            document.createElement("div");

        question.className = "question";


        let html = `
            <p>
                ${index + 1}. ${item.question}
            </p>
        `;


        item.options.forEach((option, optionIndex) => {

            html += `
                <label>
                    <input
                        type="radio"
                        name="officer_${index}"
                        value="${optionIndex}">
                    ${option}
                </label>
            `;

        });


        question.innerHTML = html;

        container.appendChild(question);

    });


    console.log(
        "Officer exam loaded:",
        officerQuestions.length,
        "questions"
    );

}


// ======================================================
// SUBMIT OFFICER EXAM
// ======================================================

async function submitOfficerExam() {

    const result =
        document.getElementById("examResult");


    if (!auth?.currentUser) {

        if (result) {
            result.innerHTML =
                "❌ ابتدا باید وارد Officer Portal شوید.";
        }

        showPage("login");

        return;
    }


    let score = 0;

    let answers = {};

    let unanswered = 0;


    officerQuestions.forEach((item, index) => {

        const selected =
            document.querySelector(
                `input[name="officer_${index}"]:checked`
            );


        if (!selected) {

            unanswered++;

            answers[index + 1] = null;

            return;

        }


        const selectedAnswer =
            Number(selected.value);


        answers[index + 1] =
            selectedAnswer;


        if (selectedAnswer === item.answer) {
            score++;
        }

    });


    const total =
        officerQuestions.length;


    const percentage =
        Math.round((score / total) * 100);


    try {

        if (!database) {
            throw new Error(
                "Firebase Database is not initialized."
            );
        }


        const user =
            auth.currentUser;


        const resultRef =
            push(ref(database, "officerExams"));


        await set(resultRef, {

            officerUid: user.uid,

            officerEmail: user.email,

            score: score,

            total: total,

            percentage: percentage,

            unanswered: unanswered,

            answers: answers,

            submittedAt: serverTimestamp()

        });


        if (result) {

            result.innerHTML = `
                <strong>آزمون ثبت شد.</strong>
                <br><br>
                امتیاز: ${score} / ${total}
                <br>
                درصد: ${percentage}%
                <br>
                بدون پاسخ: ${unanswered}
            `;

        }


        console.log(
            "Officer exam saved:",
            resultRef.key
        );


    } catch (error) {

        console.error(
            "Officer exam error:",
            error
        );


        if (result) {

            result.innerHTML =
                "❌ خطا در ذخیره آزمون:<br>" +
                error.message;

        }

    }

}


// ======================================================
// LOGIN
// ======================================================

async function loginOfficer(event) {

    event.preventDefault();


    const email =
        document.getElementById("officerEmail")
            ?.value
            .trim();


    const password =
        document.getElementById("officerPassword")
            ?.value;


    const result =
        document.getElementById("loginResult");


    if (!email || !password) {

        if (result) {
            result.innerHTML =
                "لطفاً Email و Password را وارد کنید.";
        }

        return;

    }


    try {

        if (!auth) {
            throw new Error(
                "Firebase Authentication is not initialized."
            );
        }


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


        if (result) {
            result.innerHTML =
                "✅ ورود موفق بود.";
        }


        const loggedEmail =
            document.getElementById(
                "loggedOfficerEmail"
            );


        if (loggedEmail) {
            loggedEmail.textContent =
                credential.user.email;
        }


        showPage("officerPanelPage");


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

        } else if (
            error.code ===
            "auth/invalid-email"
        ) {

            message =
                "❌ فرمت Email صحیح نیست.";

        } else if (
            error.code ===
            "auth/user-not-found"
        ) {

            message =
                "❌ این حساب وجود ندارد.";

        } else if (
            error.code ===
            "auth/wrong-password"
        ) {

            message =
                "❌ Password اشتباه است.";

        }


        if (result) {
            result.innerHTML =
                message;
        }

    }

}


// ======================================================
// LOGOUT
// ======================================================

async function logoutOfficer() {

    try {

        await signOut(auth);

        console.log("Officer logged out.");

        showPage("home");

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );

    }

}


// ======================================================
// AUTH STATE
// ======================================================

function setupAuthListener() {

    if (!auth) return;


    onAuthStateChanged(
        auth,
        user => {

            const loggedEmail =
                document.getElementById(
                    "loggedOfficerEmail"
                );


            if (user) {

                console.log(
                    "Authenticated:",
                    user.email
                );


                if (loggedEmail) {
                    loggedEmail.textContent =
                        user.email;
                }


            } else {

                console.log(
                    "No authenticated user."
                );

            }

        }
    );

}


// ======================================================
// GLOBAL ERROR MESSAGE
// ======================================================

function showGlobalMessage(message, type) {

    const box =
        document.createElement("div");


    box.style.position = "fixed";
    box.style.top = "20px";
    box.style.left = "20px";
    box.style.right = "20px";
    box.style.zIndex = "99999";
    box.style.padding = "15px";
    box.style.borderRadius = "8px";
    box.style.textAlign = "center";
    box.style.fontWeight = "bold";


    if (type === "error") {

        box.style.background =
            "#7a1f1f";

        box.style.color =
            "white";

    } else {

        box.style.background =
            "#1f7a3a";

        box.style.color =
            "white";

    }


    box.textContent =
        message;


    document.body.appendChild(box);


    setTimeout(() => {

        box.remove();

    }, 6000);

}


// ======================================================
// INITIALIZE EVERYTHING
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "LSPD Academy script started."
        );


        setupNavigation();

        setupHandbook();

        loadCivilianQuestions();

        loadOfficerExam();

        setupAuthListener();


        // Civilian submit
        const civilianSubmit =
            document.getElementById(
                "civilianSubmit"
            );


        if (civilianSubmit) {

            civilianSubmit.addEventListener(
                "click",
                submitCivilianForm
            );

        }


        // Officer exam submit
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


        console.log(
            "LSPD Academy initialized successfully."
        );

    }
);
```
