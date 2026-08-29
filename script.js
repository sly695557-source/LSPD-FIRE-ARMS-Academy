```javascript
"use strict";

/* =====================================================
   LSPD ACADEMY
   COMPLETE SCRIPT
   Compatible with current index.html
===================================================== */

console.log("LSPD script loaded");


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showPage(pageId) {

    console.log("Opening page:", pageId);

    const pages = document.querySelectorAll(".page-section");

    pages.forEach(function (page) {
        page.classList.remove("active");
    });

    const target = document.getElementById(pageId);

    if (!target) {
        console.error("Page does not exist:", pageId);
        return;
    }

    target.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

window.showPage = showPage;


/* =====================================================
   GLOBAL BUTTON HANDLER
===================================================== */

document.addEventListener("click", function (event) {

    const button = event.target.closest("[data-page]");

    if (!button) {
        return;
    }

    event.preventDefault();

    const pageId = button.getAttribute("data-page");

    if (!pageId) {
        return;
    }

    console.log("Button clicked:", pageId);

    showPage(pageId);

});


/* =====================================================
   HANDBOOK ACCORDION
===================================================== */

function setupHandbook() {

    const cards =
        document.querySelectorAll(".handbook-card");

    console.log(
        "Handbook sections:",
        cards.length
    );

    cards.forEach(function (card) {

        const title =
            card.querySelector("h3");

        const content =
            card.querySelector(".handbook-content");

        if (!title || !content) {
            return;
        }

        /* ابتدا بسته */

        content.style.display = "none";

        title.style.cursor = "pointer";

        title.addEventListener("click", function () {

            const closed =
                content.style.display === "none";

            if (closed) {

                content.style.display = "block";

                title.textContent =
                    title.textContent
                        .replace("▼", "")
                        .replace("▲", "")
                        .trim() + " ▲";

            } else {

                content.style.display = "none";

                title.textContent =
                    title.textContent
                        .replace("▼", "")
                        .replace("▲", "")
                        .trim() + " ▼";

            }

        });

    });

}


/* =====================================================
   CIVILIAN QUESTIONS
===================================================== */

const civilianQuestions = [

    "هدف شما از درخواست و تکمیل این فرم چیست؟",

    "مسئولیت‌پذیری را چگونه تعریف می‌کنید؟",

    "در یک موقعیت پرتنش چه رویکردی دارید؟",

    "چگونه از تشدید یک اختلاف جلوگیری می‌کنید؟",

    "اگر فرد مقابل عصبانی باشد چگونه شرایط را مدیریت می‌کنید؟",

    "اگر شاهد تخلف باشید چه اقدامی انجام می‌دهید؟",

    "اگر درباره یک قانون مطمئن نباشید چه می‌کنید؟",

    "چرا رعایت قوانین Server اهمیت دارد؟",

    "رفتار حرفه‌ای را چگونه تعریف می‌کنید؟",

    "اگر متوجه اشتباه خود شوید چه اقدامی انجام می‌دهید؟",

    "چرا گزارش صحیح یک Incident اهمیت دارد؟",

    "Chain of Command چه کاربردی دارد؟",

    "Training چه نقشی در عملکرد یک عضو دارد؟",

    "در یک شرایط حساس اولویت شما چیست؟",

    "چگونه با سایر اعضای تیم همکاری می‌کنید؟",

    "چگونه یک تصمیم مسئولانه می‌گیرید؟",

    "چرا احترام در محیط کاری اهمیت دارد؟",

    "چگونه یک مشکل را به مسئول مربوطه گزارش می‌کنید؟",

    "Accountability چه اهمیتی دارد؟",

    "مهم‌ترین اصل شما هنگام انجام وظیفه چیست؟"

];


/* =====================================================
   LOAD CIVILIAN QUESTIONS
===================================================== */

function loadCivilianQuestions() {

    const container =
        document.getElementById("civilianQuestions");

    if (!container) {
        console.error(
            "civilianQuestions container not found"
        );
        return;
    }

    container.innerHTML = "";

    civilianQuestions.forEach(function (question, index) {

        const box =
            document.createElement("div");

        box.className =
            "scenario-question";

        box.innerHTML = `
            <p>
                ${index + 1}. ${question}
            </p>

            <textarea
                rows="4"
                placeholder="پاسخ متقاضی..."></textarea>
        `;

        container.appendChild(box);

    });

}


/* =====================================================
   CIVILIAN SUBMIT
===================================================== */

function setupCivilian() {

    const button =
        document.getElementById("civilianSubmit");

    if (!button) {
        return;
    }

    button.addEventListener("click", function () {

        const name =
            document.getElementById("civilianName");

        const examiner =
            document.getElementById("civilianExaminer");

        const result =
            document.getElementById("civilianResult");


        if (!name || !examiner || !result) {
            return;
        }


        if (
            name.value.trim() === "" ||
            examiner.value.trim() === ""
        ) {

            result.className =
                "result-box show danger";

            result.textContent =
                "لطفاً نام متقاضی و Examiner را وارد کنید.";

            return;

        }


        result.className =
            "result-box show success";

        result.textContent =
            "فرم با موفقیت آماده بررسی شد.";

    });

}


/* =====================================================
   OFFICER ASSESSMENT QUESTIONS
===================================================== */

const officerQuestions = [

    {
        question:
            "هدف اصلی Academy چیست؟",

        options: {
            A: "افزایش تنش",
            B: "آموزش و استانداردسازی",
            C: "نادیده گرفتن قوانین",
            D: "حذف Training"
        },

        answer: "B"
    },

    {
        question:
            "Chain of Command به چه معناست؟",

        options: {
            A: "ساختار فرماندهی",
            B: "سیستم مالی",
            C: "سیستم تجهیزات",
            D: "سیستم گزارش عمومی"
        },

        answer: "A"
    },

    {
        question:
            "Professionalism چیست؟",

        options: {
            A: "رفتار حرفه‌ای و مسئولانه",
            B: "نادیده گرفتن قوانین",
            C: "ایجاد تنش",
            D: "عدم پاسخگویی"
        },

        answer: "A"
    },

    {
        question:
            "Training چه اهمیتی دارد؟",

        options: {
            A: "هیچ اهمیتی ندارد",
            B: "ایجاد آمادگی و استانداردسازی",
            C: "فقط برای ظاهر است",
            D: "اختیاری در همه شرایط است"
        },

        answer: "B"
    },

    {
        question:
            "Incident Report برای چه استفاده می‌شود؟",

        options: {
            A: "ثبت و بررسی اتفاقات",
            B: "حذف اطلاعات",
            C: "سرگرمی",
            D: "جایگزین قوانین"
        },

        answer: "A"
    },

    {
        question:
            "در صورت مشاهده تخلف چه اقدامی مناسب است؟",

        options: {
            A: "نادیده گرفتن",
            B: "گزارش از مسیر مناسب",
            C: "پنهان کردن",
            D: "ایجاد درگیری"
        },

        answer: "B"
    },

    {
        question:
            "Metagaming چیست؟",

        options: {
            A: "استفاده از اطلاعات خارج از نقش در نقش",
            B: "رعایت Roleplay",
            C: "گزارش Incident",
            D: "Training"
        },

        answer: "A"
    },

    {
        question:
            "Powergaming چیست؟",

        options: {
            A: "تحمیل اقدامات غیرمنطقی در Roleplay",
            B: "کار تیمی",
            C: "Training",
            D: "گزارش نویسی"
        },

        answer: "A"
    },

    {
        question:
            "اگر درباره یک قانون مطمئن نباشید چه می‌کنید؟",

        options: {
            A: "حدس می‌زنید",
            B: "از مسئول مربوطه سؤال می‌کنید",
            C: "قانون را نادیده می‌گیرید",
            D: "قانون جدید می‌سازید"
        },

        answer: "B"
    },

    {
        question:
            "Accountability یعنی چه؟",

        options: {
            A: "پذیرش مسئولیت اقدامات",
            B: "نادیده گرفتن اشتباه",
            C: "انتقال مسئولیت به دیگران",
            D: "عدم پاسخگویی"
        },

        answer: "A"
    },

    {
        question:
            "هدف Certification چیست؟",

        options: {
            A: "بررسی آمادگی",
            B: "حذف Training",
            C: "لغو قوانین",
            D: "افزایش Rank خودکار"
        },

        answer: "A"
    },

    {
        question:
            "دسترسی به Equipment باید بر اساس چه چیزی باشد؟",

        options: {
            A: "فقط Rank",
            B: "Rank + Training + Authorization",
            C: "سن Officer",
            D: "نظر شخصی"
        },

        answer: "B"
    },

    {
        question:
            "در یک موقعیت حساس اولویت چیست؟",

        options: {
            A: "ارزیابی شرایط",
            B: "ایجاد تنش",
            C: "نادیده گرفتن شرایط",
            D: "اقدام بدون بررسی"
        },

        answer: "A"
    },

    {
        question:
            "رعایت Server Rules برای Officer چگونه است؟",

        options: {
            A: "اختیاری",
            B: "الزامی",
            C: "فقط برای Civilian",
            D: "فقط هنگام Training"
        },

        answer: "B"
    },

    {
        question:
            "اگر Officer مرتکب اشتباه شود چه رویکردی مناسب است؟",

        options: {
            A: "پذیرش و گزارش صحیح",
            B: "پنهان کردن",
            C: "سرزنش دیگران",
            D: "نادیده گرفتن"
        },

        answer: "A"
    },

    {
        question:
            "چرا Respect اهمیت دارد؟",

        options: {
            A: "برای حفظ محیط حرفه‌ای",
            B: "برای افزایش Rank",
            C: "برای حذف قوانین",
            D: "هیچ دلیلی ندارد"
        },

        answer: "A"
    },

    {
        question:
            "چه کسی باید Authorization مربوط به Equipment را رعایت کند؟",

        options: {
            A: "فقط Instructor",
            B: "تمام Officerها",
            C: "فقط Command",
            D: "هیچ‌کس"
        },

        answer: "B"
    },

    {
        question:
            "هدف اصلی Incident Documentation چیست؟",

        options: {
            A: "ثبت دقیق اطلاعات مربوط به Incident",
            B: "حذف Incident",
            C: "تنبیه خودکار",
            D: "افزایش Rank"
        },

        answer: "A"
    },

    {
        question:
            "اگر دستورالعملی با Server Rules مغایرت داشته باشد چه می‌کنید؟",

        options: {
            A: "Server Rules را نادیده می‌گیرید",
            B: "موضوع را از مسیر مناسب بررسی می‌کنید",
            C: "خودتان قانون جدید می‌سازید",
            D: "هیچ کاری نمی‌کنید"
        },

        answer: "B"
    },

    {
        question:
            "رفتار حرفه‌ای Officer شامل چیست؟",

        options: {
            A: "Discipline + Respect + Accountability",
            B: "بی‌توجهی به قوانین",
            C: "اقدام بدون هماهنگی",
            D: "نادیده گرفتن Training"
        },

        answer: "A"
    }

];


/* =====================================================
   LOAD OFFICER EXAM
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

    officerQuestions.forEach(function (item, index) {

        const question =
            document.createElement("div");

        question.className =
            "question";

        let html = `
            <p>
                ${index + 1}. ${item.question}
            </p>
        `;


        Object.entries(item.options)
            .forEach(function ([letter, text]) {

                html += `
                    <label>
                        <input
                            type="radio"
                            name="officerQuestion${index}"
                            value="${letter}">
                        ${letter}) ${text}
                    </label>
                `;

            });


        question.innerHTML = html;

        container.appendChild(question);

    });

}


/* =====================================================
   EXAM SUBMIT
===================================================== */

function setupExam() {

    const button =
        document.getElementById(
            "officerExamSubmit"
        );

    if (!button) {
        return;
    }


    button.addEventListener("click", function () {

        let score = 0;


        officerQuestions.forEach(
            function (item, index) {

                const selected =
                    document.querySelector(
                        `input[name="officerQuestion${index}"]:checked`
                    );


                if (
                    selected &&
                    selected.value === item.answer
                ) {

                    score++;

                }

            }
        );


        const percentage =
            Math.round(
                (score / officerQuestions.length) * 100
            );


        const result =
            document.getElementById(
                "examResult"
            );


        if (!result) {
            return;
        }


        if (percentage >= 80) {

            result.className =
                "result-box show success";

            result.innerHTML = `
                PASS ✅
                <br>
                Score: ${percentage}%
                <br>
                <small>
                    ${score} / ${officerQuestions.length}
                    پاسخ صحیح
                </small>
            `;

        } else {

            result.className =
                "result-box show danger";

            result.innerHTML = `
                FAIL ❌
                <br>
                Score: ${percentage}%
                <br>
                <small>
                    حداقل نمره قبولی 80% است.
                </small>
            `;

        }

    });

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
        return;
    }


    button.addEventListener("click", function () {

        showPage("home");

    });

}


/* =====================================================
   START
===================================================== */

function startApplication() {

    loadCivilianQuestions();

    loadOfficerExam();

    setupHandbook();

    setupCivilian();

    setupExam();

    setupLogout();

    showPage("home");

    console.log(
        "LSPD Academy is ready."
    );

}


/* =====================================================
   DOM READY
===================================================== */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        startApplication
    );

} else {

    startApplication();

}
```
