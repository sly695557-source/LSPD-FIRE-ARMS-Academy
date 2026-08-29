```javascript
(function () {

    "use strict";

    /* =================================================
       PAGE NAVIGATION
    ================================================= */

    function showPage(pageId) {

        var pages = document.querySelectorAll(".page-section");

        for (var i = 0; i < pages.length; i++) {
            pages[i].classList.remove("active");
        }

        var target = document.getElementById(pageId);

        if (!target) {
            console.error("Page not found: " + pageId);
            return;
        }

        target.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    window.showPage = showPage;


    /* =================================================
       NAVIGATION BUTTONS
    ================================================= */

    function setupNavigation() {

        var buttons = document.querySelectorAll("[data-page]");

        console.log(
            "Navigation buttons:",
            buttons.length
        );

        for (var i = 0; i < buttons.length; i++) {

            buttons[i].addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    var pageId =
                        this.getAttribute("data-page");

                    if (pageId) {
                        showPage(pageId);
                    }

                }
            );
        }
    }


    /* =================================================
       HANDBOOK
    ================================================= */

    function setupHandbook() {

        var cards =
            document.querySelectorAll(".handbook-card");

        for (var i = 0; i < cards.length; i++) {

            var title =
                cards[i].querySelector("h3");

            var content =
                cards[i].querySelector(".handbook-content");

            if (!title || !content) {
                continue;
            }

            content.style.display = "none";

            title.style.cursor = "pointer";

            title.addEventListener(
                "click",
                function () {

                    var content =
                        this.parentElement.querySelector(
                            ".handbook-content"
                        );

                    if (!content) {
                        return;
                    }

                    if (
                        content.style.display === "none"
                    ) {

                        content.style.display = "block";

                    } else {

                        content.style.display = "none";

                    }

                }
            );
        }
    }


    /* =================================================
       CIVILIAN QUESTIONS
    ================================================= */

    var civilianQuestions = [

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


    /* =================================================
       LOAD CIVILIAN QUESTIONS
    ================================================= */

    function loadCivilianQuestions() {

        var container =
            document.getElementById("civilianQuestions");

        if (!container) {
            console.warn(
                "civilianQuestions element not found."
            );
            return;
        }

        container.innerHTML = "";

        for (
            var i = 0;
            i < civilianQuestions.length;
            i++
        ) {

            var box =
                document.createElement("div");

            box.className =
                "scenario-question";


            var question =
                document.createElement("p");

            question.textContent =
                (i + 1) +
                ". " +
                civilianQuestions[i];


            var textarea =
                document.createElement("textarea");

            textarea.placeholder =
                "پاسخ متقاضی...";


            box.appendChild(question);

            box.appendChild(textarea);

            container.appendChild(box);
        }
    }


    /* =================================================
       CIVILIAN SUBMIT
    ================================================= */

    function setupCivilianSubmit() {

        var button =
            document.getElementById("civilianSubmit");

        if (!button) {
            return;
        }

        button.addEventListener(
            "click",
            function () {

                var nameElement =
                    document.getElementById("civilianName");

                var examinerElement =
                    document.getElementById("civilianExaminer");

                var result =
                    document.getElementById("civilianResult");


                var name =
                    nameElement
                        ? nameElement.value.trim()
                        : "";


                var examiner =
                    examinerElement
                        ? examinerElement.value.trim()
                        : "";


                if (!name || !examiner) {

                    if (result) {

                        result.className =
                            "result-box show danger";

                        result.textContent =
                            "لطفاً نام متقاضی و Examiner را وارد کنید.";

                    }

                    return;
                }


                if (result) {

                    result.className =
                        "result-box show success";

                    result.textContent =
                        "فرم با موفقیت آماده ثبت شد.";

                }

            }
        );
    }


    /* =================================================
       LOGOUT BUTTON
    ================================================= */

    function setupLogout() {

        var button =
            document.getElementById("logoutButton");

        if (!button) {
            return;
        }

        button.addEventListener(
            "click",
            function () {

                if (
                    typeof window.logoutOfficer ===
                    "function"
                ) {

                    window.logoutOfficer();

                } else {

                    showPage("home");

                }

            }
        );
    }


    /* =================================================
       START
    ================================================= */

    function startSite() {

        setupNavigation();

        setupHandbook();

        loadCivilianQuestions();

        setupCivilianSubmit();

        setupLogout();

        showPage("home");

        console.log(
            "LSPD Firearms Division loaded successfully."
        );
    }


    /* =================================================
       DOM READY
    ================================================= */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            startSite
        );

    } else {

        startSite();

    }

})();
```
