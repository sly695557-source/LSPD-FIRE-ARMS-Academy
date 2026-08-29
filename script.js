"use strict";

document.addEventListener("DOMContentLoaded", () => {

    console.log("LSPD SCRIPT LOADED");

    /* =========================
       PAGE SYSTEM
    ========================= */

    function showPage(pageId) {

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

    window.showPage = showPage;


    /* =========================
       ALL PAGE BUTTONS
    ========================= */

    document.querySelectorAll("[data-page]").forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            const page =
                button.getAttribute("data-page");

            console.log("Opening:", page);

            showPage(page);

        });

    });


    /* =========================
       HANDBOOK ACCORDION
    ========================= */

    document.querySelectorAll(".handbook-card").forEach(card => {

        const title =
            card.querySelector("h3");

        const content =
            card.querySelector(".handbook-content");

        if (!title || !content) {
            return;
        }

        content.style.display = "none";

        title.addEventListener("click", () => {

            const isClosed =
                content.style.display === "none";

            content.style.display =
                isClosed ? "block" : "none";

            title.textContent =
                title.textContent
                    .replace("▼", "")
                    .replace("▲", "")
                    .trim()
                +
                (isClosed ? " ▲" : " ▼");

        });

    });


    /* =========================
       CIVILIAN QUESTIONS
    ========================= */

    const civilianQuestions = [

        "هدف شما از تکمیل این فرم چیست؟",

        "مسئولیت‌پذیری را چگونه تعریف می‌کنید؟",

        "در یک موقعیت پرتنش چه رویکردی دارید؟",

        "چگونه از تشدید یک اختلاف جلوگیری می‌کنید؟",

        "اگر فرد مقابل عصبانی باشد چه می‌کنید؟",

        "اگر شاهد تخلف باشید چه اقدامی انجام می‌دهید؟",

        "چرا رعایت قوانین اهمیت دارد؟",

        "اگر متوجه اشتباه خود شوید چه می‌کنید؟",

        "اگر درباره یک قانون مطمئن نباشید چه می‌کنید؟",

        "رفتار حرفه‌ای را چگونه تعریف می‌کنید؟",

        "چرا گزارش صحیح Incident اهمیت دارد؟",

        "Chain of Command چه اهمیتی دارد؟",

        "Training چه نقشی در عملکرد یک عضو دارد؟",

        "در شرایط حساس اولویت شما چیست؟",

        "چگونه با سایر اعضای تیم همکاری می‌کنید؟",

        "چگونه یک تصمیم مسئولانه می‌گیرید؟",

        "چرا احترام در محیط کاری اهمیت دارد؟",

        "چگونه یک مشکل را به مسئول مربوطه گزارش می‌کنید؟",

        "چرا Accountability اهمیت دارد؟",

        "مهم‌ترین اصل شما هنگام انجام وظیفه چیست؟"

    ];


    const civilianContainer =
        document.getElementById("civilianQuestions");


    if (civilianContainer) {

        civilianQuestions.forEach((question, index) => {

            const box =
                document.createElement("div");

            box.className =
                "scenario-question";

            box.innerHTML = `
                <p>${index + 1}. ${question}</p>

                <textarea
                    rows="4"
                    placeholder="پاسخ خود را بنویسید...">
                </textarea>
            `;

            civilianContainer.appendChild(box);

        });

    }


    /* =========================
       CIVILIAN SUBMIT
    ========================= */

    const civilianSubmit =
        document.getElementById("civilianSubmit");


    if (civilianSubmit) {

        civilianSubmit.addEventListener("click", () => {

            const name =
                document.getElementById("civilianName");

            const examiner =
                document.getElementById("civilianExaminer");

            const result =
                document.getElementById("civilianResult");


            if (!name.value.trim() ||
                !examiner.value.trim()) {

                result.className =
                    "result-box show danger";

                result.textContent =
                    "لطفاً نام متقاضی و Examiner را وارد کنید.";

                return;
            }


            result.className =
                "result-box show success";

            result.textContent =
                "فرم با موفقیت ثبت شد.";

        });

    }


    /* =========================
       LOGIN
    ========================= */

    const loginForm =
        document.getElementById("loginForm");


    if (loginForm) {

        loginForm.addEventListener("submit", event => {

            event.preventDefault();


            const email =
                document.getElementById("officerEmail");

            const password =
                document.getElementById("officerPassword");

            const result =
                document.getElementById("loginResult");


            if (!email.value.trim() ||
                !password.value.trim()) {

                result.className =
                    "result-box show danger";

                result.textContent =
                    "ایمیل و رمز عبور را وارد کنید.";

                return;
            }


            const loggedEmail =
                document.getElementById(
                    "loggedOfficerEmail"
                );


            if (loggedEmail) {

                loggedEmail.textContent =
                    email.value.trim();

            }


            result.className =
                "result-box show success";

            result.textContent =
                "ورود موفق بود.";


            setTimeout(() => {

                showPage(
                    "officerPanelPage"
                );

            }, 400);

        });

    }


    /* =========================
       LOGOUT
    ========================= */

    const logoutButton =
        document.getElementById("logoutButton");


    if (logoutButton) {

        logoutButton.addEventListener("click", () => {

            showPage("home");

        });

    }


    /* =========================
       OFFICER ASSESSMENT
    ========================= */

    const questions = [

        {
            text: "هدف اصلی Academy چیست؟",
            options: {
                A: "افزایش تنش",
                B: "آموزش و استانداردسازی",
                C: "نادیده گرفتن قوانین"
            },
            answer: "B"
        },

        {
            text: "Chain of Command چیست؟",
            options: {
                A: "ساختار فرماندهی",
                B: "سیستم مالی",
                C: "سیستم ارتباطی"
            },
            answer: "A"
        },

        {
            text: "در صورت مشاهده مشکل مهم چه کاری مناسب است؟",
            options: {
                A: "نادیده گرفتن",
                B: "گزارش صحیح",
                C: "پنهان کردن"
            },
            answer: "B"
        },

        {
            text: "Professionalism یعنی چه؟",
            options: {
                A: "رفتار حرفه‌ای و مسئولانه",
                B: "نادیده گرفتن قوانین",
                C: "ایجاد تنش"
            },
            answer: "A"
        },

        {
            text: "Training چه اهمیتی دارد؟",
            options: {
                A: "هیچ اهمیتی ندارد",
                B: "آمادگی و استانداردسازی",
                C: "فقط برای ظاهر"
            },
            answer: "B"
        },

        {
            text: "Metagaming چیست؟",
            options: {
                A: "استفاده از اطلاعات خارج از نقش در نقش",
                B: "رعایت Roleplay",
                C: "گزارش Incident"
            },
            answer: "A"
        },

        {
            text: "Powergaming چیست؟",
            options: {
                A: "تحمیل اقدامات غیرمنطقی",
                B: "کار تیمی",
                C: "Training"
            },
            answer: "A"
        },

        {
            text: "Incident Report چه کاربردی دارد؟",
            options: {
                A: "ثبت و بررسی اتفاقات",
                B: "حذف اطلاعات",
                C: "سرگرمی"
            },
            answer: "A"
        },

        {
            text: "اگر درباره یک قانون مطمئن نباشید چه می‌کنید؟",
            options: {
                A: "حدس می‌زنید",
                B: "از مسئول مربوطه سؤال می‌کنید",
                C: "قانون را نادیده می‌گیرید"
            },
            answer: "B"
        },

        {
            text: "هدف Certification چیست؟",
            options: {
                A: "بررسی آمادگی",
                B: "حذف Training",
                C: "لغو قوانین"
            },
            answer: "A"
        }

    ];


    /* =========================
       LOAD EXAM
    ========================= */

    const examContainer =
        document.getElementById(
            "assessmentQuestions"
        );


    if (examContainer) {

        questions.forEach((question, index) => {

            const box =
                document.createElement("div");

            box.className =
                "question";


            let html = `
                <p>
                    ${index + 1}. ${question.text}
                </p>
            `;


            Object.entries(question.options)
                .forEach(([letter, text]) => {

                    html += `
                        <label>
                            <input
                                type="radio"
                                name="question${index}"
                                value="${letter}">
                            ${letter}) ${text}
                        </label>
                    `;

                });


            box.innerHTML = html;

            examContainer.appendChild(box);

        });

    }


    /* =========================
       EXAM SUBMIT
    ========================= */

    const examSubmit =
        document.getElementById(
            "officerExamSubmit"
        );


    if (examSubmit) {

        examSubmit.addEventListener("click", () => {

            let score = 0;


            questions.forEach((question, index) => {

                const selected =
                    document.querySelector(
                        `input[name="question${index}"]:checked`
                    );


                if (
                    selected &&
                    selected.value === question.answer
                ) {

                    score++;

                }

            });


            const percentage =
                Math.round(
                    (score / questions.length) * 100
                );


            const result =
                document.getElementById(
                    "examResult"
                );


            if (percentage >= 80) {

                result.className =
                    "result-box show success";

                result.innerHTML =
                    `
                    PASS ✅
                    <br>
                    Score: ${percentage}%
                    `;

            } else {

                result.className =
                    "result-box show danger";

                result.innerHTML =
                    `
                    FAIL ❌
                    <br>
                    Score: ${percentage}%
                    <br>
                    حداقل نمره قبولی 80% است.
                    `;

            }

        });

    }


    /* =========================
       INITIAL PAGE
    ========================= */

    showPage("home");


    console.log(
        "LSPD APPLICATION READY"
    );

});
