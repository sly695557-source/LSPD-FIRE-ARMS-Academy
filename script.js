"use strict";

/* =====================================================
   LSPD FIREARMS ACADEMY
   STABLE OFFLINE / DEMO VERSION
===================================================== */

console.log("LSPD SCRIPT STARTED");


/* =====================================================
   DEMO OFFICER ACCOUNT
===================================================== */

const DEMO_EMAIL = "officer@lspd.local";
const DEMO_PASSWORD = "LSPD123";

let officerLoggedIn = false;


/* =====================================================
   CIVILIAN QUESTIONS
===================================================== */

const civilianQuestions = [

    "دلیل شما برای درخواست Permit چیست؟",

    "مسئولیت‌های یک دارنده Permit را چگونه تعریف می‌کنید؟",

    "اگر شرایط دریافت Permit را دیگر نداشته باشید چه اقدامی می‌کنید؟",

    "اگر Permit شما تعلیق شود، چه واکنشی نشان می‌دهید؟",

    "چه شرایطی می‌تواند یک موقعیت عادی را به یک موقعیت خطرناک تبدیل کند؟",

    "برای جلوگیری از تشدید یک موقعیت تنش‌زا چه تصمیمی می‌گیرید؟",

    "اگر فرد مقابل عصبانی باشد چگونه شرایط را آرام می‌کنید؟",

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

    "چه چیزی باعث می‌شود LSPD به یک دارنده Permit اعتماد کند؟",

    "آیا حاضرید در صورت نقض قوانین، Permit شما بررسی یا تعلیق شود؟",

    "از نظر شما مهم‌ترین اصل برای یک دارنده Permit چیست؟"

];


/* =====================================================
   OFFICER QUESTIONS
===================================================== */

const officerQuestions = [

    {
        question: "مهم‌ترین اصول Firearms Academy کدام هستند؟",
        options: [
            "Speed و Power",
            "Professionalism, Safety & Accountability",
            "Rank و Authority"
        ],
        answer: "B"
    },

    {
        question: "آیا Rank به تنهایی اجازه دسترسی به تمام Equipment را می‌دهد؟",
        options: [
            "بله",
            "خیر",
            "همیشه"
        ],
        answer: "B"
    },

    {
        question: "برای Equipment دارای Authorization چه چیزی لازم است؟",
        options: [
            "فقط Rank",
            "Training و Authorization مناسب",
            "هیچ‌چیز"
        ],
        answer: "B"
    },

    {
        question: "اولین رویکرد مناسب برای کاهش تنش چیست؟",
        options: [
            "Escalation",
            "Communication و De-escalation",
            "نادیده گرفتن"
        ],
        answer: "B"
    },

    {
        question: "Missing شدن Equipment باید چگونه مدیریت شود؟",
        options: [
            "پنهان شود",
            "گزارش شود",
            "نادیده گرفته شود"
        ],
        answer: "B"
    },

    {
        question: "Chain of Command چه اهمیتی دارد؟",
        options: [
            "هیچ اهمیتی ندارد",
            "باید رعایت شود",
            "فقط برای Trainee است"
        ],
        answer: "B"
    },

    {
        question: "حداقل نمره قبولی Assessment چند درصد است؟",
        options: [
            "50%",
            "70%",
            "80%"
        ],
        answer: "C"
    },

    {
        question: "آیا Officer باید Training Requirements را رعایت کند؟",
        options: [
            "بله",
            "خیر",
            "فقط گاهی"
        ],
        answer: "A"
    },

    {
        question: "استفاده از Equipment بدون Authorization چه وضعیتی دارد؟",
        options: [
            "مجاز است",
            "مجاز نیست",
            "بستگی به Officer دارد"
        ],
        answer: "B"
    },

    {
        question: "Professionalism در Department به چه معناست؟",
        options: [
            "رفتار حرفه‌ای و مسئولانه",
            "استفاده از Rank",
            "نادیده گرفتن قوانین"
        ],
        answer: "A"
    },

    {
        question: "Incident مهم باید چه کاری شود؟",
        options: [
            "Report شود",
            "حذف شود",
            "پنهان شود"
        ],
        answer: "A"
    },

    {
        question: "آیا انتقال Equipment به فرد غیرمجاز مجاز است؟",
        options: [
            "بله",
            "خیر",
            "همیشه"
        ],
        answer: "B"
    },

    {
        question: "کدام مورد بخشی از Code of Conduct است؟",
        options: [
            "Integrity",
            "بی‌نظمی",
            "نادیده گرفتن Supervisor"
        ],
        answer: "A"
    },

    {
        question: "Equipment access باید بر چه اساسی باشد؟",
        options: [
            "Rank + Training + Authorization",
            "فقط Rank",
            "نظر شخصی Officer"
        ],
        answer: "A"
    },

    {
        question: "Officer در صورت وجود مشکل باید از چه مسیری اقدام کند؟",
        options: [
            "Chain of Command",
            "هیچ مسیری لازم نیست",
            "افراد خارج از Department"
        ],
        answer: "A"
    },

    {
        question: "هدف Training چیست؟",
        options: [
            "افزایش مسئولیت‌پذیری و آمادگی",
            "حذف قوانین",
            "افزایش Rank"
        ],
        answer: "A"
    },

    {
        question: "آیا استفاده نمایشی یا غیرضروری از Equipment مناسب است؟",
        options: [
            "بله",
            "خیر",
            "همیشه"
        ],
        answer: "B"
    },

    {
        question: "Accountability به چه معناست؟",
        options: [
            "پذیرش مسئولیت تصمیمات",
            "نادیده گرفتن مسئولیت",
            "انتقال مسئولیت به دیگران"
        ],
        answer: "A"
    },

    {
        question: "در یک موقعیت تنش‌زا چه رویکردی مناسب‌تر است؟",
        options: [
            "De-escalation و پاسخ متناسب",
            "افزایش بی‌دلیل تنش",
            "نادیده گرفتن شرایط"
        ],
        answer: "A"
    },

    {
        question: "Officer در Firearms Division مسئول چه چیزی است؟",
        options: [
            "فقط Rank خودش",
            "رعایت قوانین، Training و Accountability",
            "هیچ مسئولیتی ندارد"
        ],
        answer: "B"
    }

];


/* =====================================================
   PAGE SYSTEM
===================================================== */

function showPage(pageId) {

    const protectedPages = [
        "officerPanelPage",
        "officerExam"
    ];

    if (
        protectedPages.includes(pageId) &&
        !officerLoggedIn
    ) {
        pageId = "login";
    }

    const pages = document.querySelectorAll(
        ".page-section"
    );

    pages.forEach(function(page) {
        page.classList.remove("active");
    });

    const target = document.getElementById(pageId);

    if (!target) {
        console.error(
            "Page not found:",
            pageId
        );
        return;
    }

    target.classList.add("active");

    updateNavigation();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


window.showPage = showPage;


/* =====================================================
   UNIVERSAL BUTTON SYSTEM
===================================================== */

function setupNavigation() {

    document.addEventListener(
        "click",
        function(event) {

            const button =
                event.target.closest(
                    "[data-page]"
                );

            if (!button) {
                return;
            }

            event.preventDefault();

            const pageId =
                button.getAttribute(
                    "data-page"
                );

            if (!pageId) {
                return;
            }

            console.log(
                "NAVIGATION:",
                pageId
            );

            showPage(pageId);

        }
    );

}


/* =====================================================
   NAV STATUS
===================================================== */

function updateNavigation() {

    const status =
        document.getElementById(
            "navOfficerStatus"
        );

    if (!status) {
        return;
    }

    if (officerLoggedIn) {

        status.textContent =
            "● ONLINE";

        status.classList.add(
            "online"
        );

    } else {

        status.textContent =
            "OFFLINE";

        status.classList.remove(
            "online"
        );

    }

}


/* =====================================================
   HANDBOOK
===================================================== */

function setupHandbook() {

    document.addEventListener(
        "click",
        function(event) {

            const title =
                event.target.closest(
                    ".handbook-card h3"
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

            const content =
                card.querySelector(
                    ".handbook-content"
                );

            if (!content) {
                return;
            }

            const alreadyOpen =
                card.classList.contains(
                    "open"
                );

            document
                .querySelectorAll(
                    ".handbook-card"
                )
                .forEach(function(otherCard) {

                    otherCard.classList.remove(
                        "open"
                    );

                });


            if (!alreadyOpen) {

                card.classList.add(
                    "open"
                );

                setTimeout(
                    function() {

                        card.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    },
                    80
                );

            }

        }
    );

}


/* =====================================================
   CREATE CIVILIAN QUESTIONS
===================================================== */

function loadCivilianQuestions() {

    const container =
        document.getElementById(
            "civilianQuestions"
        );

    if (!container) {
        console.error(
            "civilianQuestions not found"
        );
        return;
    }

    container.innerHTML = "";

    civilianQuestions.forEach(
        function(question, index) {

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "open-question";

            item.innerHTML = `

                <div class="question-number">
                    ${String(index + 1).padStart(2, "0")}
                </div>

                <div class="question-body">

                    <p>
                        ${question}
                    </p>

                    <textarea
                        class="civilian-answer"
                        data-question="${index + 1}"
                        placeholder="پاسخ متقاضی...">
                    </textarea>

                </div>

            `;

            container.appendChild(
                item
            );

        }
    );

}


/* =====================================================
   CIVILIAN SUBMIT
===================================================== */

function setupCivilian() {

    const button =
        document.getElementById(
            "civilianSubmit"
        );

    if (!button) {
        console.error(
            "civilianSubmit not found"
        );
        return;
    }

    button.addEventListener(
        "click",
        function() {

            const name =
                document.getElementById(
                    "civilianName"
                );

            const examiner =
                document.getElementById(
                    "civilianExaminer"
                );

            const result =
                document.getElementById(
                    "civilianResult"
                );

            if (
                !name ||
                !examiner ||
                !result
            ) {
                return;
            }

            const nameValue =
                name.value.trim();

            const examinerValue =
                examiner.value.trim();

            if (
                !nameValue ||
                !examinerValue
            ) {

                showResult(
                    result,
                    "لطفاً نام متقاضی و Examiner را وارد کنید.",
                    false
                );

                return;
            }


            const answers =
                document.querySelectorAll(
                    ".civilian-answer"
                );

            let answered = 0;

            answers.forEach(
                function(answer) {

                    if (
                        answer.value.trim()
                    ) {
                        answered++;
                    }

                }
            );


            if (
                answered !== answers.length
            ) {

                showResult(
                    result,
                    "لطفاً به تمام 20 سؤال پاسخ دهید. " +
                    "پاسخ داده شده: " +
                    answered +
                    " / " +
                    answers.length,
                    false
                );

                return;
            }


            showResult(
                result,
                "✓ Application با موفقیت ثبت شد. " +
                "هر 20 پاسخ دریافت شد.",
                true
            );

        }
    );

}


/* =====================================================
   CREATE OFFICER EXAM
===================================================== */

function loadOfficerExam() {

    const container =
        document.getElementById(
            "assessmentQuestions"
        );

    if (!container) {
        console.error(
            "assessmentQuestions not found"
        );
        return;
    }

    container.innerHTML = "";

    officerQuestions.forEach(
        function(item, index) {

            const number =
                String(index + 1)
                .padStart(2, "0");

            const question =
                document.createElement(
                    "div"
                );

            question.className =
                "exam-question";

            question.innerHTML = `

                <p>
                    ${number}. ${item.question}
                </p>

                <label>
                    <input
                        type="radio"
                        name="q${index + 1}"
                        value="A">
                    A) ${item.options[0]}
                </label>

                <label>
                    <input
                        type="radio"
                        name="q${index + 1}"
                        value="B">
                    B) ${item.options[1]}
                </label>

                <label>
                    <input
                        type="radio"
                        name="q${index + 1}"
                        value="C">
                    C) ${item.options[2]}
                </label>

            `;

            container.appendChild(
                question
            );

        }
    );

}


/* =====================================================
   OFFICER LOGIN
===================================================== */

function setupLogin() {

    const form =
        document.getElementById(
            "loginForm"
        );

    if (!form) {
        console.error(
            "loginForm not found"
        );
        return;
    }


    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            event.stopPropagation();


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


            if (
                !emailInput ||
                !passwordInput ||
                !result
            ) {
                return;
            }


            const email =
                emailInput.value
                    .trim()
                    .toLowerCase();

            const password =
                passwordInput.value;


            console.log(
                "LOGIN ATTEMPT:",
                email
            );


            if (
                email ===
                DEMO_EMAIL.toLowerCase()
                &&
                password ===
                DEMO_PASSWORD
            ) {

                officerLoggedIn =
                    true;


                const loggedEmail =
                    document.getElementById(
                        "loggedOfficerEmail"
                    );


                if (loggedEmail) {

                    loggedEmail.textContent =
                        emailInput.value.trim();

                }


                updateNavigation();


                showResult(
                    result,
                    "✓ ورود موفق بود. در حال انتقال به Officer Portal...",
                    true
                );


                setTimeout(
                    function() {

                        showPage(
                            "officerPanelPage"
                        );

                    },
                    500
                );


            } else {

                officerLoggedIn =
                    false;

                updateNavigation();


                showResult(
                    result,
                    "✕ Email یا Password اشتباه است.",
                    false
                );

            }

        }
    );

}


/* =====================================================
   LOGOUT
===================================================== */

function setupLogout() {

    const button =
        document.getElementById(
            "logoutButton"
        );

    if (!button) {
        console.error(
            "logoutButton not found"
        );
        return;
    }


    button.addEventListener(
        "click",
        function(event) {

            event.preventDefault();


            officerLoggedIn =
                false;


            const email =
                document.getElementById(
                    "officerEmail"
                );

            const password =
                document.getElementById(
                    "officerPassword"
                );


            if (email) {
                email.value = "";
            }

            if (password) {
                password.value = "";
            }


            updateNavigation();


            showPage(
                "home"
            );

        }
    );

}


/* =====================================================
   OFFICER EXAM SUBMIT
===================================================== */

function setupOfficerExam() {

    const button =
        document.getElementById(
            "officerExamSubmit"
        );

    if (!button) {
        console.error(
            "officerExamSubmit not found"
        );
        return;
    }


    button.addEventListener(
        "click",
        function(event) {

            event.preventDefault();


            if (!officerLoggedIn) {

                showPage(
                    "login"
                );

                return;

            }


            let score = 0;
            let answered = 0;


            officerQuestions.forEach(
                function(item, index) {

                    const selected =
                        document.querySelector(
                            `input[name="q${index + 1}"]:checked`
                        );


                    if (selected) {

                        answered++;


                        if (
                            selected.value ===
                            item.answer
                        ) {

                            score++;

                        }

                    }

                }
            );


            const total =
                officerQuestions.length;


            const result =
                document.getElementById(
                    "examResult"
                );


            if (!result) {
                return;
            }


            if (
                answered < total
            ) {

                result.className =
                    "exam-result show danger";

                result.innerHTML =
                    "⚠ لطفاً به تمام سوالات پاسخ دهید." +
                    "<br>" +
                    "پاسخ داده شده: " +
                    answered +
                    " / " +
                    total;

                result.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

                return;

            }


            const percentage =
                Math.round(
                    (
                        score /
                        total
                    ) * 100
                );


            if (
                percentage >= 80
            ) {

                result.className =
                    "exam-result show success";

                result.innerHTML =
                    "<strong>PASS ✓</strong>" +
                    "<br>" +
                    "Score: " +
                    percentage +
                    "%" +
                    "<br>" +
                    score +
                    " / " +
                    total;

            } else {

                result.className =
                    "exam-result show danger";

                result.innerHTML =
                    "<strong>FAIL ✕</strong>" +
                    "<br>" +
                    "Score: " +
                    percentage +
                    "%" +
                    "<br>" +
                    score +
                    " / " +
                    total +
                    "<br>" +
                    "<small>حداقل نمره قبولی 80% است.</small>";

            }


            result.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }
    );

}


/* =====================================================
   RESULT
===================================================== */

function showResult(
    element,
    message,
    success
) {

    if (!element) {
        return;
    }


    element.className =
        success
            ? "result-box show success"
            : "result-box show danger";


    element.textContent =
        message;

}


/* =====================================================
   DATE
===================================================== */

function setupDate() {

    const date =
        document.getElementById(
            "civilianDate"
        );

    if (!date) {
        return;
    }


    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            today.getDate()
        ).padStart(
            2,
            "0"
        );


    date.value =
        `${year}-${month}-${day}`;

}


/* =====================================================
   START
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "LSPD DOM READY"
        );


        loadCivilianQuestions();

        loadOfficerExam();

        setupNavigation();

        setupHandbook();

        setupLogin();

        setupLogout();

        setupCivilian();

        setupOfficerExam();

        setupDate();

        updateNavigation();

        showPage(
            "home"
        );


        console.log(
            "LSPD WEBSITE READY"
        );

    }
);
```
