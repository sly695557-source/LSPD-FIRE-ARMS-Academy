"use strict";

document.addEventListener("DOMContentLoaded", function () {

    console.log("=================================");
    console.log("SCRIPT.JS LOADED");
    console.log("=================================");


    /* =========================================
       PAGE NAVIGATION
    ========================================= */

    function showPage(pageId) {

        console.log("Opening page:", pageId);

        const pages =
            document.querySelectorAll(".page-section");

        pages.forEach(function (page) {
            page.classList.remove("active");
        });

        const target =
            document.getElementById(pageId);

        if (!target) {

            console.error(
                "PAGE NOT FOUND:",
                pageId
            );

            return;
        }

        target.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    window.showPage = showPage;


    /* =========================================
       NAVIGATION BUTTONS
    ========================================= */

    const pageButtons =
        document.querySelectorAll("[data-page]");

    console.log(
        "Navigation buttons:",
        pageButtons.length
    );


    pageButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const pageId =
                    this.getAttribute("data-page");

                showPage(pageId);

            }
        );

    });


    /* =========================================
       HANDBOOK ACCORDION
    ========================================= */

    const handbookCards =
        document.querySelectorAll(
            ".handbook-card"
        );


    console.log(
        "Handbook cards:",
        handbookCards.length
    );


    handbookCards.forEach(function (card) {

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
            function () {

                const closed =
                    content.style.display === "none";


                if (closed) {

                    content.style.display =
                        "block";

                    title.textContent =
                        title.textContent
                            .replace("▼", "▲");

                } else {

                    content.style.display =
                        "none";

                    title.textContent =
                        title.textContent
                            .replace("▲", "▼");

                }

            }
        );

    });


    /* =========================================
       GENERAL QUESTIONS
    ========================================= */

    const civilianQuestions = [

        "هدف شما از تکمیل این فرم چیست؟",

        "مسئولیت‌پذیری را چگونه تعریف می‌کنید؟",

        "در صورت تغییر شرایط چه اقدامی انجام می‌دهید؟",

        "اگر با یک موقعیت پرتنش مواجه شوید چه می‌کنید؟",

        "چگونه از تشدید یک اختلاف جلوگیری می‌کنید؟",

        "اگر فرد مقابل عصبانی باشد چه رویکردی دارید؟",

        "اگر شاهد تخلف باشید چه اقدامی انجام می‌دهید؟",

        "چرا رعایت قوانین اهمیت دارد؟",

        "اگر متوجه اشتباه خود شوید چه می‌کنید؟",

        "چگونه یک تصمیم مسئولانه می‌گیرید؟",

        "چرا گزارش صحیح Incident اهمیت دارد؟",

        "تفاوت بین اختیار و مسئولیت چیست؟",

        "چگونه با یک دستور نادرست برخورد می‌کنید؟",

        "اگر درباره یک قانون مطمئن نباشید چه می‌کنید؟",

        "رفتار حرفه‌ای از نظر شما چیست؟",

        "چگونه با سایر اعضای Department همکاری می‌کنید؟",

        "چرا Chain of Command اهمیت دارد؟",

        "در یک موقعیت حساس اولویت اصلی شما چیست؟",

        "چرا آموزش و Certification اهمیت دارند؟",

        "مهم‌ترین اصل شما هنگام انجام وظیفه چیست؟"

    ];


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
            function (question, index) {

                const box =
                    document.createElement(
                        "div"
                    );

                box.className =
                    "scenario-question";


                const title =
                    document.createElement(
                        "p"
                    );

                title.textContent =
                    (index + 1) +
                    ". " +
                    question;


                const textarea =
                    document.createElement(
                        "textarea"
                    );

                textarea.placeholder =
                    "پاسخ خود را بنویسید...";

                textarea.rows = 4;


                box.appendChild(title);

                box.appendChild(textarea);

                container.appendChild(box);

            }
        );

    }


    loadCivilianQuestions();


    /* =========================================
       GENERAL FORM
    ========================================= */

    const civilianSubmit =
        document.getElementById(
            "civilianSubmit"
        );


    if (civilianSubmit) {

        civilianSubmit.addEventListener(
            "click",
            function () {

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


                if (!name ||
                    !examiner ||
                    !result) {

                    return;
                }


                if (
                    name.value.trim() === "" ||
                    examiner.value.trim() === ""
                ) {

                    result.className =
                        "result-box show danger";

                    result.textContent =
                        "لطفاً اطلاعات متقاضی و Examiner را وارد کنید.";

                    return;
                }


                result.className =
                    "result-box show success";

                result.textContent =
                    "فرم با موفقیت ثبت شد.";

            }
        );

    }


    /* =========================================
       LOGIN
    ========================================= */

    const loginForm =
        document.getElementById(
            "loginForm"
        );


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const email =
                    document.getElementById(
                        "officerEmail"
                    );

                const password =
                    document.getElementById(
                        "officerPassword"
                    );

                const result =
                    document.getElementById(
                        "loginResult"
                    );


                if (!email ||
                    !password ||
                    !result) {

                    return;
                }


                if (
                    email.value.trim() === "" ||
                    password.value.trim() === ""
                ) {

                    result.className =
                        "result-box show danger";

                    result.textContent =
                        "لطفاً اطلاعات ورود را کامل کنید.";

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


                setTimeout(
                    function () {

                        showPage(
                            "officerPanelPage"
                        );

                    },
                    500
                );

            }
        );

    }


    /* =========================================
       LOGOUT
    ========================================= */

    const logoutButton =
        document.getElementById(
            "logoutButton"
        );


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            function () {

                const email =
                    document.getElementById(
                        "loggedOfficerEmail"
                    );


                if (email) {
                    email.textContent = "";
                }


                showPage("home");

            }
        );

    }


    /* =========================================
       ASSESSMENT QUESTIONS
    ========================================= */

    const assessmentQuestions = [

        {
            question:
                "هدف اصلی Academy چیست؟",

            options: [
                ["A", "افزایش درگیری"],
                ["B", "آموزش و استانداردسازی"],
                ["C", "نادیده گرفتن قوانین"]
            ],

            answer: "B"
        },


        {
            question:
                "Chain of Command به چه معناست؟",

            options: [
                ["A", "ساختار فرماندهی"],
                ["B", "سیستم مالی"],
                ["C", "سیستم ارتباطی"]
            ],

            answer: "A"
        },


        {
            question:
                "در صورت مشاهده یک مشکل مهم چه کاری مناسب است؟",

            options: [
                ["A", "نادیده گرفتن"],
                ["B", "گزارش صحیح"],
                ["C", "پنهان کردن"]
            ],

            answer: "B"
        },


        {
            question:
                "Professionalism یعنی چه؟",

            options: [
                ["A", "رفتار مسئولانه و حرفه‌ای"],
                ["B", "نادیده گرفتن قوانین"],
                ["C", "ایجاد تنش"]
            ],

            answer: "A"
        },


        {
            question:
                "Training چه اهمیتی دارد؟",

            options: [
                ["A", "هیچ اهمیتی ندارد"],
                ["B", "برای آمادگی و استانداردسازی لازم است"],
                ["C", "فقط برای ظاهر است"]
            ],

            answer: "B"
        },


        {
            question:
                "Metagaming چیست؟",

            options: [
                ["A", "استفاده از اطلاعات OOC در IC"],
                ["B", "رعایت Roleplay"],
                ["C", "گزارش Incident"]
            ],

            answer: "A"
        },


        {
            question:
                "Powergaming چیست؟",

            options: [
                ["A", "تحمیل اقدامات غیرمنطقی به دیگران"],
                ["B", "کار تیمی"],
                ["C", "آموزش"]
            ],

            answer: "A"
        },


        {
            question:
                "چرا Incident Report اهمیت دارد؟",

            options: [
                ["A", "برای ثبت و بررسی اتفاقات"],
                ["B", "برای حذف اطلاعات"],
                ["C", "برای سرگرمی"]
            ],

            answer: "A"
        },


        {
            question:
                "اگر درباره یک قانون مطمئن نباشید چه می‌کنید؟",

            options: [
                ["A", "حدس می‌زنید"],
                ["B", "از مسئول مربوطه سؤال می‌کنید"],
                ["C", "قانون را نادیده می‌گیرید"]
            ],

            answer: "B"
        },


        {
            question:
                "هدف Certification چیست؟",

            options: [
                ["A", "بررسی آمادگی فرد"],
                ["B", "حذف Training"],
                ["C", "لغو قوانین"]
            ],

            answer: "A"
        }

    ];


    function loadAssessment() {

        const container =
            document.getElementById(
                "assessmentQuestions"
            );


        if (!container) {
            return;
        }


        container.innerHTML = "";


        assessmentQuestions.forEach(
            function (item, index) {

                const question =
                    document.createElement(
                        "div"
                    );

                question.className =
                    "question";


                const title =
                    document.createElement(
                        "p"
                    );

                title.textContent =
                    (index + 1) +
                    ". " +
                    item.question;


                question.appendChild(title);


                item.options.forEach(
                    function (option) {

                        const label =
                            document.createElement(
                                "label"
                            );


                        const radio =
                            document.createElement(
                                "input"
                            );


                        radio.type =
                            "radio";

                        radio.name =
                            "assessment" +
                            index;

                        radio.value =
                            option[0];


                        label.appendChild(
                            radio
                        );


                        label.appendChild(
                            document.createTextNode(
                                " " +
                                option[1]
                            )
                        );


                        question.appendChild(
                            label
                        );

                    }
                );


                container.appendChild(
                    question
                );

            }
        );

    }


    loadAssessment();


    /* =========================================
       SUBMIT ASSESSMENT
    ========================================= */

    const examSubmit =
        document.getElementById(
            "officerExamSubmit"
        );


    if (examSubmit) {

        examSubmit.addEventListener(
            "click",
            function () {

                const result =
                    document.getElementById(
                        "examResult"
                    );


                if (!result) {
                    return;
                }


                let score = 0;


                assessmentQuestions.forEach(
                    function (item, index) {

                        const selected =
                            document.querySelector(
                                'input[name="assessment' +
                                index +
                                '"]:checked'
                            );


                        if (
                            selected &&
                            selected.value ===
                            item.answer
                        ) {

                            score++;

                        }

                    }
                );


                const total =
                    assessmentQuestions.length;


                const percentage =
                    Math.round(
                        (score / total) * 100
                    );


                if (percentage >= 80) {

                    result.className =
                        "result-box show success";

                    result.innerHTML =
                        "PASS ✅<br>" +
                        "Score: " +
                        percentage +
                        "%";

                } else {

                    result.className =
                        "result-box show danger";

                    result.innerHTML =
                        "FAIL ❌<br>" +
                        "Score: " +
                        percentage +
                        "%<br>" +
                        "<small>" +
                        "حداقل نمره قبولی 80% است." +
                        "</small>";

                }

            }
        );

    }


    /* =========================================
       START
    ========================================= */

    const home =
        document.getElementById("home");


    if (home) {

        document
            .querySelectorAll(
                ".page-section"
            )
            .forEach(
                function (page) {
                    page.classList.remove("active");
                }
            );

        home.classList.add("active");

    }


    console.log(
        "ALL BUTTONS INITIALIZED SUCCESSFULLY"
    );

});
