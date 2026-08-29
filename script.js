```javascript
(function () {

    "use strict";

    function showPage(pageId) {

        const pages = document.querySelectorAll(".page-section");

        pages.forEach(function (page) {
            page.classList.remove("active");
        });

        const target = document.getElementById(pageId);

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


    function initializeNavigation() {

        const buttons = document.querySelectorAll("[data-page]");

        buttons.forEach(function (button) {

            button.addEventListener("click", function (event) {

                event.preventDefault();

                const pageId =
                    button.getAttribute("data-page");

                if (pageId) {
                    showPage(pageId);
                }

            });

        });

    }


    function initializeHandbook() {

        const cards =
            document.querySelectorAll(".handbook-card");

        cards.forEach(function (card) {

            const title =
                card.querySelector("h3");

            const content =
                card.querySelector(".handbook-content");

            if (!title || !content) {
                return;
            }

            content.style.display = "none";

            title.style.cursor = "pointer";

            title.addEventListener("click", function () {

                if (content.style.display === "block") {
                    content.style.display = "none";
                } else {
                    content.style.display = "block";
                }

            });

        });

    }


    const civilianQuestions = [

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


    function loadCivilianQuestions() {

        const container =
            document.getElementById("civilianQuestions");

        if (!container) {
            return;
        }

        container.innerHTML = "";

        civilianQuestions.forEach(function (question, index) {

            const box =
                document.createElement("div");

            box.className = "scenario-question";

            box.innerHTML = `
                <p>${index + 1}. ${question}</p>

                <textarea
                    placeholder="پاسخ متقاضی..."
                ></textarea>
            `;

            container.appendChild(box);

        });

    }


    function initializeCivilianSubmit() {

        const button =
            document.getElementById("civilianSubmit");

        if (!button) {
            return;
        }

        button.addEventListener("click", function () {

            const nameElement =
                document.getElementById("civilianName");

            const examinerElement =
                document.getElementById("civilianExaminer");

            const result =
                document.getElementById("civilianResult");

            const name =
                nameElement ?
                nameElement.value.trim() :
                "";

            const examiner =
                examinerElement ?
                examinerElement.value.trim() :
                "";

            if (!name || !examiner) {

                if (result) {

                    result.className =
                        "result-box show danger";

                    result.innerHTML =
                        "لطفاً نام متقاضی و Examiner را وارد کنید.";

                }

                return;
            }

            if (result) {

                result.className =
                    "result-box show success";

                result.innerHTML =
                    "مصاحبه با موفقیت ثبت شد.";

            }

        });

    }


    function initializeLogout() {

        const button =
            document.getElementById("logoutButton");

        if (!button) {
            return;
        }

        button.addEventListener("click", function () {

            if (typeof window.logoutOfficer === "function") {

                window.logoutOfficer();

            } else {

                showPage("home");

            }

        });

    }


    function startSite() {

        initializeNavigation();

        initializeHandbook();

        loadCivilianQuestions();

        initializeCivilianSubmit();

        initializeLogout();

        showPage("home");

        console.log(
            "LSPD Firearms Division loaded successfully."
        );

    }


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
