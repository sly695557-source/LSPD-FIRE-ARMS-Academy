console.log("LSPD SCRIPT LOADED");


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showPage(pageId) {

    var pages =
        document.querySelectorAll(".page-section");


    for (var i = 0; i < pages.length; i++) {

        pages[i].classList.remove("active");

    }


    var target =
        document.getElementById(pageId);


    if (!target) {

        console.error(
            "PAGE NOT FOUND:",
            pageId
        );

        return;

    }


    target.classList.add("active");

    window.scrollTo(0, 0);

}


window.showPage = showPage;



/* =====================================================
   NAVIGATION BUTTONS
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "DOM LOADED"
        );


        var buttons =
            document.querySelectorAll(
                "[data-page]"
            );


        console.log(
            "LSPD BUTTONS FOUND:",
            buttons.length
        );


        for (
            var i = 0;
            i < buttons.length;
            i++
        ) {

            buttons[i].addEventListener(
                "click",
                function () {

                    var pageId =
                        this.getAttribute(
                            "data-page"
                        );


                    console.log(
                        "BUTTON CLICK:",
                        pageId
                    );


                    showPage(pageId);

                }
            );

        }


        showPage("home");

    }
);



/* =====================================================
   CIVILIAN QUESTIONS
===================================================== */

var civilianQuestions = [

    "دلیل شما برای درخواست مجوز چیست؟",

    "مسئولیت‌های یک دارنده مجوز را چگونه تعریف می‌کنید؟",

    "اگر شرایط دریافت مجوز را دیگر نداشته باشید چه می‌کنید؟",

    "اگر مجوز شما تعلیق شود چه واکنشی دارید؟",

    "چه شرایطی می‌تواند یک موقعیت عادی را خطرناک کند؟",

    "برای جلوگیری از تشدید یک موقعیت تنش‌زا چه می‌کنید؟",

    "اگر فرد مقابل عصبانی باشد چگونه شرایط را آرام می‌کنید؟",

    "اگر شخص دیگری بخواهد از Permit شما استفاده کند چه می‌کنید؟",

    "اگر شاهد رفتار غیرقانونی مرتبط با Permit باشید چه می‌کنید؟",

    "اگر دوست یا عضو خانواده بخواهد از Permit شما استفاده کند چه می‌گویید؟",

    "اگر درباره اعتبار Permit مطمئن نباشید از چه کسی سؤال می‌کنید؟",

    "اگر در یک مکان عمومی شرایط خطرناک شود اولویت شما چیست؟",

    "تفاوت داشتن Permit و داشتن اختیار نامحدود چیست؟",

    "چرا دارنده Permit باید مسئولیت‌پذیر باشد؟",

    "اگر شخص دیگری عمداً شما را وارد درگیری کند چه می‌کنید؟",

    "اگر متوجه شوید تصمیمی که گرفته‌اید اشتباه بوده چه می‌کنید؟",

    "آیا داشتن Permit به معنی استفاده از آن در هر شرایطی است؟ چرا؟",

    "چه چیزی باعث می‌شود LSPD به شما اعتماد کند؟",

    "آیا حاضرید در صورت نقض قوانین Permit شما بررسی یا تعلیق شود؟"

];



/* =====================================================
   LOAD CIVILIAN QUESTIONS
===================================================== */

function loadCivilianQuestions() {

    var container =
        document.getElementById(
            "civilianQuestions"
        );


    if (!container) {

        console.log(
            "Civilian questions container not found."
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
            document.createElement(
                "div"
            );


        box.className =
            "scenario-question";


        box.innerHTML =

            "<p>" +
            (i + 1) +
            ". " +
            civilianQuestions[i] +
            "</p>" +

            "<textarea " +
            "placeholder=\"پاسخ متقاضی...\">" +
            "</textarea>";


        container.appendChild(box);

    }

}



/* =====================================================
   CIVILIAN SUBMIT
===================================================== */

function submitCivilian() {

    var name =
        document
            .getElementById("civilianName")
            .value
            .trim();


    var examiner =
        document
            .getElementById("civilianExaminer")
            .value
            .trim();


    var result =
        document.getElementById(
            "civilianResult"
        );


    if (!name || !examiner) {

        result.className =
            "result-box show danger";

        result.textContent =
            "لطفاً نام متقاضی و Examiner را وارد کنید.";

        return;

    }


    result.className =
        "result-box show success";


    result.textContent =
        "✅ فرم با موفقیت ثبت شد.";

}


window.submitCivilian =
    submitCivilian;



/* =====================================================
   OFFICER ASSESSMENT
===================================================== */

function submitOfficerExam() {

    var correctAnswers = {

        q1: "B",
        q2: "B",
        q3: "B",
        q4: "B",
        q5: "B",
        q6: "B",
        q7: "D",
        q8: "A"

    };


    var score = 0;

    var total =
        Object.keys(
            correctAnswers
        ).length;


    for (
        var question in correctAnswers
    ) {

        var selected =
            document.querySelector(
                'input[name="' +
                question +
                '"]:checked'
            );


        if (
            selected &&
            selected.value ===
            correctAnswers[question]
        ) {

            score++;

        }

    }


    var percentage =
        Math.round(
            (score / total) * 100
        );


    var result =
        document.getElementById(
            "examResult"
        );


    if (percentage >= 80) {

        result.className =
            "result-box show success";


        result.innerHTML =
            "✅ PASS<br>" +
            "Score: " +
            percentage +
            "%";

    }

    else {

        result.className =
            "result-box show danger";


        result.innerHTML =
            "❌ FAIL<br>" +
            "Score: " +
            percentage +
            "%<br>" +
            "<small>Minimum passing score: 80%</small>";

    }

}



/* =====================================================
   LOGOUT BUTTON
===================================================== */

function setupLogout() {

    var logoutButton =
        document.getElementById(
            "logoutButton"
        );


    if (!logoutButton) {

        console.log(
            "Logout button not found."
        );

        return;

    }


    logoutButton.addEventListener(
        "click",
        function () {

            if (
                typeof window.logoutOfficerFirebase ===
                "function"
            ) {

                window.logoutOfficerFirebase();

            }

            else {

                showPage("home");

            }

        }
    );

}



/* =====================================================
   START
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadCivilianQuestions();

        setupLogout();


        var civilianSubmit =
            document.getElementById(
                "civilianSubmit"
            );


        if (civilianSubmit) {

            civilianSubmit.addEventListener(
                "click",
                submitCivilian
            );

        }


        var officerExamSubmit =
            document.getElementById(
                "officerExamSubmit"
            );


        if (officerExamSubmit) {

            officerExamSubmit.addEventListener(
                "click",
                submitOfficerExam
            );

        }


        console.log(
            "LSPD SCRIPT READY"
        );

    }
);
```
