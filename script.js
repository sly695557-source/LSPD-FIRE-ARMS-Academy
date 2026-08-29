```javascript
/* =========================================================
   LSPD FIREARMS ACADEMY
   COMPLETE SCRIPT
========================================================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


/* =========================================================
   FIREBASE
========================================================= */

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


/* =========================================================
   PAGE NAVIGATION
========================================================= */

window.showPage = function (pageId) {

    const protectedPages = [
        "officerPanelPage",
        "officerExam"
    ];

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
};


/* =========================================================
   CIVILIAN QUESTIONS
========================================================= */

const civilianQuestions = [

    "دلیل شما برای درخواست Civilian Firearms Permit چیست؟",

    "مسئولیت‌های یک دارنده Firearms Permit را چگونه تعریف می‌کنید؟",

    "چرا رعایت قوانین Server برای دارنده Permit اهمیت دارد؟",

    "اگر شرایط دریافت Permit را دیگر نداشته باشید چه اقدامی انجام می‌دهید؟",

    "اگر Permit شما تعلیق شود چه واکنشی نشان می‌دهید؟",

    "چه عواملی می‌توانند یک موقعیت عادی را به یک موقعیت خطرناک تبدیل کنند؟",

    "برای جلوگیری از تشدید یک موقعیت تنش‌زا چه رویکردی دارید؟",

    "اگر فرد مقابل عصبانی باشد چگونه شرایط را مدیریت می‌کنید؟",

    "اگر شخص دیگری از شما بخواهد Permit شما را در اختیارش قرار دهید چه می‌کنید؟",

    "آیا اجازه دارید Permit خود را در اختیار شخص دیگری قرار دهید؟ چرا؟",

    "اگر شاهد استفاده غیرمجاز از Permit باشید چه اقدامی انجام می‌دهید؟",

    "اگر دوست یا عضو خانواده بخواهد از Permit شما استفاده کند چه پاسخی می‌دهید؟",

    "اگر درباره اعتبار Permit خود مطمئن نباشید از چه کسی سؤال می‌کنید؟",

    "اگر در یک مکان عمومی شرایط خطرناک شود اولویت شما چیست؟",

    "تفاوت بین داشتن Permit و داشتن اختیار نامحدود چیست؟",

    "چرا دارنده Permit باید مسئولیت‌پذیر باشد؟",

    "اگر فردی عمداً سعی کند شما را وارد درگیری کند چه رویکردی دارید؟",

    "اگر متوجه شوید تصمیمی که گرفته‌اید اشتباه بوده چه کاری انجام می‌دهید؟",

    "آیا داشتن Permit به معنی استفاده از آن در هر شرایطی است؟ چرا؟",

    "چه چیزی باعث می‌شود LSPD به یک Civilian Permit Holder اعتماد کند؟",

    "آیا در صورت نقض قوانین حاضر به بررسی یا تعلیق Permit خود هستید؟",

    "چگونه می‌توانید از ایجاد FailRP در یک موقعیت مرتبط با Permit جلوگیری کنید؟",

    "اگر قوانین Server با برداشت شخصی شما متفاوت باشد کدام را رعایت می‌کنید؟",

    "چرا De-escalation در موقعیت‌های تنش‌زا اهمیت دارد؟",

    "در یک موقعیت خطرناک اولین اولویت شما چیست؟"
];


/* =========================================================
   LOAD CIVILIAN QUESTIONS
========================================================= */

function loadCivilianQuestions() {

    const container =
        document.getElementById("civilianQuestions");

    if (!container) return;

    container.innerHTML = "";

    civilianQuestions.forEach((question, index) => {

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


/* =========================================================
   CIVILIAN SUBMIT
========================================================= */

window.submitCivilian = function () {

    const nameElement =
        document.getElementById("civilianName");

    const examinerElement =
        document.getElementById("civilianExaminer");

    if (!nameElement || !examinerElement) {
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

    showResult(
        "civilianResult",
        "مصاحبه با موفقیت ثبت شد.",
        true
    );
};


/* =========================================================
   LOGIN
========================================================= */

function setupLogin() {

    const loginForm =
        document.getElementById("loginForm");

    if (!loginForm) return;

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const emailElement =
                document.getElementById("officerEmail");

            const passwordElement =
                document.getElementById("officerPassword");

            const result =
                document.getElementById("loginResult");

            if (!emailElement || !passwordElement) {
                return;
            }

            const email =
                emailElement.value.trim();

            const password =
                passwordElement.value;

            if (result) {

                result.className =
                    "result-box show";

                result.innerHTML =
                    "در حال ورود...";
            }

            try {

                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                showPage("officerPanelPage");

            } catch (error) {

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

                    case "auth/too-many-requests":
                        message =
                            "تعداد تلاش‌های ورود بیش از حد مجاز است.";
                        break;

                    case "auth/network-request-failed":
                        message =
                            "اتصال به Firebase برقرار نشد.";
                        break;

                    case "auth/invalid-api-key":
                        message =
                            "Firebase API Key مشکل دارد.";
                        break;

                    case "auth/user-disabled":
                        message =
                            "این حساب Officer غیرفعال شده است.";
                        break;

                    default:
                        message =
                            "خطای ورود: " + error.code;
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


/* =========================================================
   AUTH STATE
========================================================= */

onAuthStateChanged(
    auth,
    function (user) {

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
                    user.email || "";
            }

        } else {

            if (emailElement) {
                emailElement.textContent = "";
            }

            const currentPage =
                document.querySelector(
                    ".page-section.active"
                );

            if (
                currentPage &&
                (
                    currentPage.id === "officerPanelPage" ||
                    currentPage.id === "officerExam"
                )
            ) {

                showPage("home");
            }
        }
    }
);


/* =========================================================
   LOGOUT
========================================================= */

window.logoutOfficer = async function () {

    try {

        await signOut(auth);

        showPage("home");

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );
    }
};


/* =========================================================
   OFFICER EXAM
========================================================= */

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
};


/* =========================================================
   HANDBOOK ACCORDION
========================================================= */

const handbookDetails = {

    "05": {
        title: "WEAPON AUTHORIZATION",
        text: `
            <p>
                دسترسی به تجهیزات Firearms باید بر اساس
                Rank، Training و Authorization تعیین‌شده باشد.
            </p>

            <div class="hb-level">
                <strong>LEVEL 0</strong>
                <span>بدون دسترسی</span>
            </div>

            <div class="hb-level">
                <strong>LEVEL 1</strong>
                <span>Basic Equipment</span>
            </div>

            <div class="hb-level">
                <strong>LEVEL 2</strong>
                <span>Patrol Authorization</span>
            </div>

            <div class="hb-level">
                <strong>LEVEL 3</strong>
                <span>Special Authorization</span>
            </div>

            <div class="hb-level">
                <strong>LEVEL 4</strong>
                <span>Restricted Equipment</span>
            </div>

            <h4>قانون کلی</h4>

            <p>
                داشتن Rank به‌تنهایی به معنی دسترسی به تمام
                تجهیزات نیست. Officer باید Training و
                Authorization لازم را نیز داشته باشد.
            </p>
        `
    },


    "06": {
        title: "BASIC & PATROL EQUIPMENT",
        text: `
            <h4>Basic Equipment</h4>

            <p>
                تجهیزات پایه برای انجام وظایف معمول Officer
                و Patrol استفاده می‌شوند.
            </p>

            <ul>
                <li>Radio</li>
                <li>Standard Duty Equipment</li>
                <li>تجهیزات ارتباطی مجاز</li>
                <li>تجهیزات شناسایی مجاز</li>
            </ul>

            <h4>Patrol Authorization</h4>

            <p>
                تجهیزات سطح Patrol تنها زمانی قابل استفاده
                هستند که Officer مجوز و Training مربوطه را
                داشته باشد.
            </p>

            <div class="hb-policy">
                Equipment Access =
                Rank + Training + Authorization
            </div>
        `
    },


    "07": {
        title: "FIREARMS SAFETY",
        text: `
            <p>
                ایمنی مهم‌ترین اصل در Firearms Division است.
                Officer باید همیشه قوانین Department و Server
                را رعایت کند.
            </p>

            <ul>
                <li>تجهیزات باید تحت کنترل Officer باشند.</li>
                <li>از استفاده نمایشی یا غیرضروری خودداری شود.</li>
                <li>هرگونه مشکل تجهیزات باید گزارش شود.</li>
                <li>شرایط موقعیت باید قبل از هر اقدام ارزیابی شود.</li>
                <li>استفاده از تجهیزات باید با Authorization مطابقت داشته باشد.</li>
            </ul>

            <div class="hb-warning">
                Safety First — Professional RP Always
            </div>
        `
    },


    "08": {
        title: "ESCALATION POLICY",
        text: `
            <p>
                هدف Escalation Policy مدیریت صحیح موقعیت و
                جلوگیری از تشدید غیرضروری آن است.
            </p>

            <div class="hb-flow">
                <span>Communication</span>
                <b>→</b>
                <span>De-escalation</span>
                <b>→</b>
                <span>Control</span>
                <b>→</b>
                <span>Appropriate Response</span>
            </div>

            <div class="hb-policy">
                Weapon ≠ First Option
            </div>

            <p>
                نوع پاسخ باید متناسب با شرایط Roleplay،
                قوانین Server و سطح خطر موقعیت باشد.
            </p>
        `
    },


    "09": {
        title: "INCIDENT REPORT",
        text: `
            <p>
                Incidentهای مهم باید طبق سیستم داخلی
                Department ثبت و گزارش شوند.
            </p>

            <h4>گزارش باید شامل موارد زیر باشد:</h4>

            <ul>
                <li>Incident ID</li>
                <li>Officer</li>
                <li>Rank</li>
                <li>Date / Time</li>
                <li>Location</li>
                <li>Incident Type</li>
                <li>Description</li>
                <li>Persons Involved</li>
                <li>Evidence</li>
                <li>Outcome</li>
            </ul>

            <p>
                گزارش باید واضح، دقیق و قابل بررسی توسط
                مسئول مربوطه باشد.
            </p>
        `
    },


    "10": {
        title: "TRAINING & CERTIFICATION",
        text: `
            <p>
                هیچ Officer نباید بدون Training مناسب از
                تجهیزات دارای Authorization خاص استفاده کند.
            </p>

            <h4>Training شامل:</h4>

            <ul>
                <li>آشنایی کامل با Handbook</li>
                <li>آشنایی با Equipment Authorization</li>
                <li>آشنایی با Server Rules</li>
                <li>شناخت مسئولیت‌های Officer</li>
                <li>آشنایی با Chain of Command</li>
                <li>Certification Exam</li>
            </ul>

            <div class="hb-policy">
                Training → Evaluation → Certification → Authorization
            </div>
        `
    },


    "11": {
        title: "VIOLATIONS & DISCIPLINE",
        text: `
            <p>
                نقض قوانین Firearms Division می‌تواند باعث
                بررسی داخلی و اقدامات انضباطی شود.
            </p>

            <h4>نمونه تخلفات:</h4>

            <ul>
                <li>استفاده از تجهیزات بدون Authorization</li>
                <li>عدم رعایت Server Rules</li>
                <li>استفاده غیرضروری از تجهیزات</li>
                <li>عدم گزارش Incidentهای مهم</li>
                <li>عدم رعایت Chain of Command</li>
                <li>رفتار غیرحرفه‌ای در Roleplay</li>
            </ul>

            <h4>اقدامات احتمالی Department</h4>

            <ul>
                <li>Warning</li>
                <li>Retraining</li>
                <li>Review of Authorization</li>
                <li>Suspension</li>
                <li>اقدامات داخلی مطابق قوانین Department</li>
            </ul>

            <div class="hb-warning">
                تمام اقدامات انضباطی باید مطابق قوانین
                Department و Server انجام شوند.
            </div>
        `
    }

};


/* =========================================================
   CREATE HANDBOOK STYLE
========================================================= */

function addHandbookStyles() {

    if (document.getElementById("dynamicHandbookStyle")) {
        return;
    }

    const style =
        document.createElement("style");

    style.id =
        "dynamicHandbookStyle";

    style.textContent = `

        .handbook-clickable {
            cursor: pointer !important;
            user-select: none;
            transition: opacity .2s ease;
        }

        .handbook-clickable:hover {
            opacity: .8;
        }

        .handbook-clickable::after {
            content: "  ▼";
            font-size: 12px;
        }

        .handbook-clickable.open::after {
            content: "  ▲";
        }

        .dynamic-handbook-details {
            display: none;
            margin-top: 18px;
            padding: 18px;
            border-radius: 12px;
            line-height: 2;
            background: rgba(255,255,255,.04);
            border: 1px solid rgba(255,255,255,.10);
        }

        .dynamic-handbook-details.open {
            display: block;
        }

        .dynamic-handbook-details h4 {
            margin-top: 15px;
            margin-bottom: 8px;
        }

        .dynamic-handbook-details ul {
            padding-right: 22px;
        }

        .hb-level {
            display: flex;
            justify-content: space-between;
            gap: 20px;
            padding: 10px 14px;
            margin: 7px 0;
            border-radius: 8px;
            background: rgba(255,255,255,.05);
        }

        .hb-flow {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            gap: 10px;
            margin: 20px 0;
        }

        .hb-flow span {
            padding: 8px 12px;
            border-radius: 8px;
            background: rgba(255,255,255,.06);
        }

        .hb-policy {
            margin-top: 18px;
            padding: 14px;
            text-align: center;
            border-radius: 10px;
            font-weight: bold;
            background: rgba(255,255,255,.06);
        }

        .hb-warning {
            margin-top: 18px;
            padding: 14px;
            border-radius: 10px;
            font-weight: bold;
            background: rgba(255,255,255,.06);
        }

    `;

    document.head.appendChild(style);
}


/* =========================================================
   SETUP HANDBOOK
========================================================= */

function setupHandbook() {

    addHandbookStyles();

    const cards =
        document.querySelectorAll(
            ".handbook-card"
        );

    cards.forEach(card => {

        const heading =
            card.querySelector("h3");

        if (!heading) return;

        const headingText =
            heading.textContent.trim();

        const match =
            headingText.match(/^(\d+)/);

        if (!match) return;

        const sectionNumber =
            match[1];

        /*
         * فقط بخش‌هایی که توضیح بازشونده دارند
         */
        if (!handbookDetails[sectionNumber]) {
            return;
        }

        /*
         * جلوگیری از ساخت دوباره
         */
        if (
            card.querySelector(
                ".dynamic-handbook-details"
            )
        ) {
            return;
        }

        heading.classList.add(
            "handbook-clickable"
        );

        heading.setAttribute(
            "role",
            "button"
        );

        heading.setAttribute(
            "tabindex",
            "0"
        );

        const details =
            document.createElement("div");

        details.className =
            "dynamic-handbook-details";

        details.innerHTML =
            handbookDetails[
                sectionNumber
            ].text;

        /*
         * توضیحات را بعد از عنوان قرار می‌دهیم
         */
        heading.insertAdjacentElement(
            "afterend",
            details
        );

        function toggle() {

            const isOpen =
                details.classList.contains("open");

            /*
             * بستن همه بخش‌های دیگر
             */
            card
                .parentElement
                ?.querySelectorAll(
                    ".dynamic-handbook-details.open"
                )
                .forEach(other => {

                    if (other !== details) {
                        other.classList.remove("open");
                    }
                });

            card
                .parentElement
                ?.querySelectorAll(
                    ".handbook-clickable.open"
                )
                .forEach(other => {

                    if (other !== heading) {
                        other.classList.remove("open");
                    }
                });

            if (isOpen) {

                details.classList.remove("open");
                heading.classList.remove("open");

            } else {

                details.classList.add("open");
                heading.classList.add("open");
            }
        }

        heading.addEventListener(
            "click",
            toggle
        );

        heading.addEventListener(
            "keydown",
            function(event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    toggle();
                }
            }
        );
    });

    console.log(
        "Handbook accordion initialized."
    );
}


/* =========================================================
   RESULT
========================================================= */

function showResult(
    elementId,
    message,
    success
) {

    const element =
        document.getElementById(elementId);

    if (!element) {
        return;
    }

    element.className =
        success
            ? "result-box show success"
            : "result-box show danger";

    element.innerHTML =
        message;
}


/* =========================================================
   NAVIGATION BUTTONS
========================================================= */

function setupNavigation() {

    document.addEventListener(
        "click",
        function(event) {

            const button =
                event.target.closest(
                    "[data-page]"
                );

            if (!button) return;

            const page =
                button.getAttribute(
                    "data-page"
                );

            if (!page) return;

            showPage(page);
        }
    );
}


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadCivilianQuestions();

        setupLogin();

        setupNavigation();

        setupHandbook();

        showPage("home");

        console.log(
            "LSPD Firearms Academy loaded successfully."
        );
    }
);
```
