```javascript
/* =====================================================
   WEBSITE SCRIPT - COMPLETE VERSION
   ===================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

    console.log("SCRIPT.JS LOADED SUCCESSFULLY");


    /* =====================================================
       PAGE NAVIGATION
       ===================================================== */

    function showPage(pageId) {

        if (!pageId) {
            console.error("No page ID");
            return;
        }

        const pages =
            document.querySelectorAll(".page-section");

        pages.forEach(function (page) {
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

        console.log(
            "PAGE OPENED:",
            pageId
        );
    }


    /* قابل استفاده از HTML */
    window.showPage = showPage;


    /* =====================================================
       NAVIGATION BUTTONS
       ===================================================== */

    const pageButtons =
        document.querySelectorAll(
            "[data-page]"
        );

    pageButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                const pageId =
                    this.getAttribute("data-page");

                showPage(pageId);

            }
        );

    });


    /* =====================================================
       HANDBOOK ACCORDION
       ===================================================== */

    const handbookCards =
        document.querySelectorAll(
            ".handbook-card"
        );

    handbookCards.forEach(function (card) {

        const title =
            card.querySelector("h3");

        if (!title) {
            return;
        }

        title.style.cursor = "pointer";

        /* پیدا کردن محتوای کارت */

        const children =
            Array.from(card.children);

        const content =
            document.createElement("div");

        content.className =
            "handbook-toggle-content";

        content.style.display = "none";

        content.style.marginTop = "15px";

        children.forEach(function (child) {

            if (child !== title) {

                content.appendChild(child);

            }

        });

        card.appendChild(content);


        /* کلیک روی عنوان */

        title.addEventListener(
            "click",
            function () {

                const isOpen =
                    content.style.display !== "none";

                if (isOpen) {

                    content.style.display =
                        "none";

                    title.setAttribute(
                        "data-open",
                        "false"
                    );

                } else {

                    content.style.display =
                        "block";

                    title.setAttribute(
                        "data-open",
                        "true"
                    );

                }

            }
        );

    });


    /* =====================================================
       CIVILIAN QUESTIONS
       ===================================================== */

    const civilianQuestions = [

        "دلیل درخواست شما برای استفاده از این فرم چیست؟",

        "مسئولیت‌های شما در قبال قوانین چیست؟",

        "در صورت تغییر شرایط چه اقدامی انجام می‌دهید؟",

        "اگر مجوز یا دسترسی شما تعلیق شود چه می‌کنید؟",

        "چگونه یک موقعیت عادی می‌تواند به موقعیت خطرناک تبدیل شود؟",

        "برای جلوگیری از تشدید یک موقعیت چه تصمیمی می‌گیرید؟",

        "اگر فرد مقابل عصبانی باشد چگونه شرایط را آرام می‌کنید؟",

        "اگر فرد دیگری اطلاعات یا مجوز شما را درخواست کند چه می‌کنید؟",

        "اگر شاهد تخلف باشید چه اقدامی انجام می‌دهید؟",

        "آیا اطلاعات یا مجوز شخصی را در اختیار دیگران قرار می‌دهید؟ چرا؟",

        "اگر درباره اعتبار اطلاعات خود مطمئن نباشید از چه کسی سؤال می‌کنید؟",

        "در یک موقعیت عمومی پرتنش اولویت شما چیست؟",

        "تفاوت بین داشتن مجوز و داشتن اختیار نامحدود چیست؟",

        "چرا مسئولیت‌پذیری اهمیت دارد؟",

        "اگر شخص دیگری عمداً شما را وارد درگیری کند چه رویکردی دارید؟",

        "اگر متوجه اشتباه خود شوید چه کاری انجام می‌دهید؟",

        "آیا داشتن مجوز به معنی استفاده بدون محدودیت است؟ چرا؟",

        "چه چیزی باعث می‌شود یک فرد قابل اعتماد باشد؟",

        "آیا با بررسی و نظارت در صورت نقض قوانین موافق هستید؟",

        "مهم‌ترین اصل شما هنگام قرار گرفتن در یک موقعیت حساس چیست؟"

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
                    document.createElement("div");

                box.className =
                    "scenario-question";

                const number =
                    document.createElement("p");

                number.textContent =
                    (index + 1) +
                    ". " +
                    question;

                const textarea =
                    document.createElement(
                        "textarea"
                    );

                textarea.placeholder =
                    "پاسخ متقاضی...";

                textarea.rows = 4;

                box.appendChild(number);

                box.appendChild(textarea);

                container.appendChild(box);

            }
        );

    }


    loadCivilianQuestions();


    /* =====================================================
       CIVILIAN FORM
       ===================================================== */

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
                        "لطفاً اطلاعات موردنیاز را وارد کنید.";

                    return;
                }

                result.className =
                    "result-box show success";

                result.textContent =
                    "فرم با موفقیت ثبت شد.";

            }
        );

    }


    /* =====================================================
       NORMAL FORM LOGIN
       ===================================================== */

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

                if (!email || !password || !result) {
                    return;
                }

                if (
                    email.value.trim() === "" ||
                    password.value.trim() === ""
                ) {

                    result.className =
                        "result-box show danger";

                    result.textContent =
                        "لطفاً ایمیل و رمز عبور را وارد کنید.";

                    return;
                }

                /*
                   این Login فقط نمایشی است.
                   برای اتصال واقعی باید Backend/Auth
                   جداگانه تنظیم شود.
                */

                result.className =
                    "result-box show success";

                result.textContent =
                    "ورود با موفقیت انجام شد.";

                const loggedEmail =
                    document.getElementById(
                        "loggedOfficerEmail"
                    );

                if (loggedEmail) {

                    loggedEmail.textContent =
                        email.value.trim();

                }

                showPage(
                    "officerPanelPage"
                );

            }
        );

    }


    /* =====================================================
       LOGOUT
       ===================================================== */

    const logoutButton =
        document.getElementById(
            "logoutButton"
        );

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            function () {

                const loggedEmail =
                    document.getElementById(
                        "loggedOfficerEmail"
                    );

                if (loggedEmail) {
                    loggedEmail.textContent = "";
                }

                showPage("home");

            }
        );

    }


    /* =====================================================
       OFFICER EXAM
       ===================================================== */

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

                let total =
                    Object.keys(
                        answers
                    ).length;

                Object.keys(
                    answers
                ).forEach(
                    function (question) {

                        const selected =
                            document.querySelector(
                                'input[name="' +
                                question +
                                '"]:checked'
                            );

                        if (
                            selected &&
                            selected.value ===
                            answers[question]
                        ) {

                            score++;

                        }

                    }
                );

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


    /* =====================================================
       DEFAULT PAGE
       ===================================================== */

    const activePage =
        document.querySelector(
            ".page-section.active"
        );

    if (!activePage) {

        const home =
            document.getElementById(
                "home"
            );

        if (home) {
            home.classList.add("active");
        }

    }


    /* =====================================================
       FINAL CHECK
       ===================================================== */

    console.log(
        "All website buttons initialized."
    );

});
```
