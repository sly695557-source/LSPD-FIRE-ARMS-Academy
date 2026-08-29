```javascript
// ==========================================================
// LSPD FIREARMS DIVISION
// MAIN SITE SCRIPT
// NO FIREBASE
// ==========================================================


// ==========================================================
// PAGE NAVIGATION
// ==========================================================

function showPage(pageId) {

    const pages = document.querySelectorAll(
        ".page-section"
    );

    pages.forEach(function (page) {

        page.classList.remove("active");

    });


    const target = document.getElementById(pageId);


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


// Make it available for other files
window.showPage = showPage;



// ==========================================================
// NAVIGATION BUTTONS
// ==========================================================

function initializeNavigation() {

    const buttons = document.querySelectorAll(
        "[data-page]"
    );


    console.log(
        "Navigation buttons found:",
        buttons.length
    );


    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const pageId =
                    button.getAttribute(
                        "data-page"
                    );


                console.log(
                    "Opening page:",
                    pageId
                );


                if (!pageId) {
                    return;
                }


                showPage(pageId);

            }
        );

    });

}



// ==========================================================
// HANDBOOK
// ==========================================================

function initializeHandbook() {

    const cards =
        document.querySelectorAll(
            ".handbook-card"
        );


    console.log(
        "Handbook cards found:",
        cards.length
    );


    cards.forEach(function (card) {

        const title =
            card.querySelector("h3");


        const content =
            card.querySelector(
                ".handbook-content"
            );


        if (!title || !content) {
            return;
        }


        content.style.display = "none";


        title.style.cursor = "pointer";


        title.addEventListener(
            "click",
            function () {

                const isOpen =
                    content.style.display ===
                    "block";


                // Close all
                cards.forEach(
                    function (otherCard) {

                        const otherContent =
                            otherCard.querySelector(
                                ".handbook-content"
                            );


                        if (otherContent) {

                            otherContent.style.display =
                                "none";

                        }

                    }
                );


                // Open selected
                if (!isOpen) {

                    content.style.display =
                        "block";

                }

            }
        );

    });

}



// ==========================================================
// CIVILIAN QUESTIONS
// ==========================================================

const civilianQuestions = [

    {
        question:
            "هدف اصلی Firearms Academy چیست؟",

        options: [
            "استفاده نمایشی از تجهیزات",
            "آموزش، ایمنی و مسئولیت‌پذیری",
            "نادیده گرفتن قوانین",
            "افزایش خودکار Rank"
        ]
    },

    {
        question:
            "آیا Rank به تنهایی دسترسی به تمام تجهیزات را ایجاد می‌کند؟",

        options: [
            "بله",
            "خیر",
            "همیشه",
            "فقط برای Officer جدید"
        ]
    },

    {
        question:
            "Equipment Access باید بر اساس چه چیزی باشد؟",

        options: [
            "Rank فقط",
            "Training فقط",
            "Rank + Training + Authorization",
            "Vehicle + Rank"
        ]
    },

    {
        question:
            "LEVEL 0 به چه معناست؟",

        options: [
            "Basic Equipment",
            "Patrol",
            "بدون دسترسی",
            "Special Authorization"
        ]
    },

    {
        question:
            "LEVEL 1 چیست؟",

        options: [
            "Basic Equipment",
            "Restricted Equipment",
            "Special Authorization",
            "بدون دسترسی"
        ]
    },

    {
        question:
            "LEVEL 2 چیست؟",

        options: [
            "Patrol Authorization",
            "بدون دسترسی",
            "Basic Equipment",
            "Restricted Equipment"
        ]
    },

    {
        question:
            "مهم‌ترین اصل Firearms Safety چیست؟",

        options: [
            "Speed",
            "Safety",
            "Appearance",
            "Rank"
        ]
    },

    {
        question:
            "آیا استفاده نمایشی یا غیرضروری از تجهیزات مناسب است؟",

        options: [
            "بله",
            "خیر",
            "همیشه",
            "فقط در Patrol"
        ]
    },

    {
        question:
            "در صورت مشاهده مشکل تجهیزات چه باید کرد؟",

        options: [
            "نادیده گرفت",
            "گزارش کرد",
            "مخفی کرد",
            "به فرد دیگری داد"
        ]
    },

    {
        question:
            "اولین مرحله در Escalation مناسب چیست؟",

        options: [
            "Weapon",
            "Communication",
            "اقدام شدید",
            "ترک موقعیت"
        ]
    }

];



// ==========================================================
// LOAD CIVILIAN QUESTIONS
// ==========================================================

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
                "question";


            let html = "";


            html +=
                "<p>" +
                (index + 1) +
                ". " +
                question.question +
                "</p>";


            question.options.forEach(
                function (option, optionIndex) {

                    html +=
                        "<label>" +

                        '<input type="radio" ' +
                        'name="civilian_' +
                        index +
                        '" ' +
                        'value="' +
                        optionIndex +
                        '">' +

                        option +

                        "</label>";

                }
            );


            box.innerHTML = html;


            container.appendChild(box);

        }
    );

}



// ==========================================================
// CIVILIAN SUBMIT
// ==========================================================

function submitCivilian() {

    const nameElement =
        document.getElementById(
            "civilianName"
        );


    const examinerElement =
        document.getElementById(
            "civilianExaminer"
        );


    const result =
        document.getElementById(
            "civilianResult"
        );


    const name =
        nameElement
            ? nameElement.value.trim()
            : "";


    const examiner =
        examinerElement
            ? examinerElement.value.trim()
            : "";


    if (!result) {
        return;
    }


    if (!name) {

        result.className =
            "result-box show danger";


        result.innerHTML =
            "❌ لطفاً نام متقاضی را وارد کنید.";


        return;

    }


    let answered = 0;


    civilianQuestions.forEach(
        function (question, index) {

            const selected =
                document.querySelector(
                    'input[name="civilian_' +
                    index +
                    '"]:checked'
                );


            if (selected) {
                answered++;
            }

        }
    );


    result.className =
        "result-box show success";


    result.innerHTML =
        "✅ فرم آماده ثبت است." +
        "<br><br>" +
        "نام متقاضی: " +
        name +
        "<br>" +
        "Examiner: " +
        (examiner || "مشخص نشده") +
        "<br>" +
        "پاسخ داده شده: " +
        answered +
        " / " +
        civilianQuestions.length;

}



// ==========================================================
// OFFICER QUESTIONS
// ==========================================================

const officerQuestions = [

    {
        question:
            "LEVEL 0 به چه معناست؟",

        options: [
            "Basic Equipment",
            "Patrol Authorization",
            "بدون دسترسی",
            "Restricted Equipment"
        ],

        answer: 2
    },

    {
        question:
            "LEVEL 1 چیست؟",

        options: [
            "Basic Equipment",
            "Special Authorization",
            "Restricted Equipment",
            "بدون دسترسی"
        ],

        answer: 0
    },

    {
        question:
            "LEVEL 2 چیست؟",

        options: [
            "بدون دسترسی",
            "Patrol Authorization",
            "Restricted Equipment",
            "Special Authorization"
        ],

        answer: 1
    },

    {
        question:
            "LEVEL 3 چیست؟",

        options: [
            "Basic Equipment",
            "Patrol Authorization",
            "Special Authorization",
            "بدون دسترسی"
        ],

        answer: 2
    },

    {
        question:
            "LEVEL 4 چیست؟",

        options: [
            "Basic Equipment",
            "Restricted Equipment",
            "Patrol Authorization",
            "Standard Equipment"
        ],

        answer: 1
    },

    {
        question:
            "آیا Rank به تنهایی برای دسترسی به تمام تجهیزات کافی است؟",

        options: [
            "بله",
            "خیر",
            "همیشه",
            "فقط برای Senior Officer"
        ],

        answer: 1
    },

    {
        question:
            "فرمول صحیح Equipment Access چیست؟",

        options: [
            "Rank",
            "Training",
            "Rank + Training + Authorization",
            "Officer + Vehicle"
        ],

        answer: 2
    },

    {
        question:
            "مهم‌ترین اصل Firearms Division چیست؟",

        options: [
            "Speed",
            "Safety",
            "Appearance",
            "Patrol"
        ],

        answer: 1
    },

    {
        question:
            "استفاده نمایشی یا غیرضروری از تجهیزات چگونه است؟",

        options: [
            "مجاز است",
            "توصیه می‌شود",
            "باید از آن خودداری شود",
            "اجباری است"
        ],

        answer: 2
    },

    {
        question:
            "در صورت مشاهده مشکل تجهیزات چه باید کرد؟",

        options: [
            "نادیده گرفت",
            "گزارش کرد",
            "مخفی کرد",
            "حذف کرد"
        ],

        answer: 1
    },

    {
        question:
            "ترتیب مناسب Escalation کدام است؟",

        options: [
            "Weapon → Control → Communication",
            "Communication → De-escalation → Control → Appropriate Response",
            "Control → Weapon → Communication",
            "Weapon → Weapon → Weapon"
        ],

        answer: 1
    },

    {
        question:
            "Weapon در Escalation Policy چه جایگاهی دارد؟",

        options: [
            "First Option",
            "Weapon ≠ First Option",
            "همیشه اجباری",
            "تنها روش کنترل"
        ],

        answer: 1
    },

    {
        question:
            "Incident Report برای چیست؟",

        options: [
            "ثبت و گزارش Incident",
            "افزایش Rank",
            "سرگرمی",
            "حذف قوانین"
        ],

        answer: 0
    },

    {
        question:
            "کدام مورد باید در Incident Report ثبت شود؟",

        options: [
            "Incident ID",
            "Favorite Color",
            "Game Level",
            "Personal Hobby"
        ],

        answer: 0
    },

    {
        question:
            "Officer برای استفاده از Authorization خاص چه چیزی لازم دارد؟",

        options: [
            "Training مناسب",
            "فقط Rank",
            "فقط Vehicle",
            "هیچ چیز"
        ],

        answer: 0
    },

    {
        question:
            "Certification Exam برای چه انجام می‌شود؟",

        options: [
            "بررسی آمادگی Officer",
            "سرگرمی",
            "افزایش خودکار Rank",
            "حذف Training"
        ],

        answer: 0
    },

    {
        question:
            "کدام مورد مسئولیت Officer است؟",

        options: [
            "رعایت قوانین Department",
            "نادیده گرفتن Chain of Command",
            "استفاده بدون Authorization",
            "عدم گزارش Incident"
        ],

        answer: 0
    },

    {
        question:
            "آیا Chain of Command باید رعایت شود؟",

        options: [
            "بله",
            "خیر",
            "فقط در مواقع خاص",
            "فقط توسط Instructor"
        ],

        answer: 0
    },

    {
        question:
            "قبل از یک تصمیم مهم Officer باید چه کند؟",

        options: [
            "شرایط موقعیت را ارزیابی کند",
            "بدون بررسی اقدام کند",
            "قوانین را نادیده بگیرد",
            "Incident را حذف کند"
        ],

        answer: 0
    },

    {
        question:
            "نقض قوانین Firearms Division ممکن است چه نتیجه‌ای داشته باشد؟",

        options: [
            "هیچ نتیجه‌ای ندارد",
            "بررسی داخلی و اقدامات انضباطی",
            "افزایش Rank",
            "Authorization بیشتر"
        ],

        answer: 1
    },

    {
        question:
            "آیا Officer می‌تواند بدون Training مناسب از تجهیزات دارای Authorization خاص استفاده کند؟",

        options: [
            "بله",
            "خیر",
            "همیشه",
            "فقط در صورت عجله"
        ],

        answer: 1
    },

    {
        question:
            "Professionalism در Academy به چه معناست؟",

        options: [
            "رفتار مسئولانه و حرفه‌ای",
            "نادیده گرفتن قوانین",
            "استفاده نمایشی",
            "عدم پاسخگویی"
        ],

        answer: 0
    }

];



// ==========================================================
// LOAD OFFICER EXAM
// ==========================================================

function loadOfficerExam() {

    const container =
        document.getElementById(
            "assessmentQuestions"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    officerQuestions.forEach(
        function (question, index) {

            const box =
                document.createElement(
                    "div"
                );


            box.className =
                "question";


            let html =
                "<p>" +
                (index + 1) +
                ". " +
                question.question +
                "</p>";


            question.options.forEach(
                function (option, optionIndex) {

                    html +=
                        "<label>" +

                        '<input type="radio" ' +
                        'name="officer_' +
                        index +
                        '" ' +
                        'value="' +
                        optionIndex +
                        '">' +

                        option +

                        "</label>";

                }
            );


            box.innerHTML = html;


            container.appendChild(box);

        }
    );

}



// ==========================================================
// OFFICER EXAM
// ==========================================================

function submitOfficerExam() {

    const result =
        document.getElementById(
            "examResult"
        );


    if (!result) {
        return;
    }


    let score = 0;

    let unanswered = 0;


    officerQuestions.forEach(
        function (question, index) {

            const selected =
                document.querySelector(
                    'input[name="officer_' +
                    index +
                    '"]:checked'
                );


            if (!selected) {

                unanswered++;

                return;

            }


            if (
                Number(selected.value) ===
                question.answer
            ) {

                score++;

            }

        }
    );


    const total =
        officerQuestions.length;


    const percentage =
        Math.round(
            (score / total) * 100
        );


    if (percentage >= 80) {

        result.className =
            "result-box show success";


        result.innerHTML =
            "✅ PASS" +
            "<br><br>" +
            "Score: " +
            score +
            " / " +
            total +
            "<br>" +
            "Percentage: " +
            percentage +
            "%";

    } else {

        result.className =
            "result-box show danger";


        result.innerHTML =
            "❌ FAIL" +
            "<br><br>" +
            "Score: " +
            score +
            " / " +
            total +
            "<br>" +
            "Percentage: " +
            percentage +
            "%" +
            "<br><br>" +
            "حداقل نمره قبولی 80% است.";

    }

}



// ==========================================================
// BUTTON EVENTS
// ==========================================================

function initializeButtons() {


    const civilianButton =
        document.getElementById(
            "civilianSubmit"
        );


    if (civilianButton) {

        civilianButton.addEventListener(
            "click",
            submitCivilian
        );

    }


    const officerButton =
        document.getElementById(
            "officerExamSubmit"
        );


    if (officerButton) {

        officerButton.addEventListener(
            "click",
            submitOfficerExam
        );

    }

}



// ==========================================================
// START SITE
// ==========================================================

function startSite() {

    console.log(
        "================================="
    );

    console.log(
        "LSPD ACADEMY STARTED"
    );

    console.log(
        "================================="
    );


    initializeNavigation();

    initializeHandbook();

    loadCivilianQuestions();

    loadOfficerExam();

    initializeButtons();


    // Always start on Home
    showPage("home");


    console.log(
        "LSPD ACADEMY READY"
    );

}



// ==========================================================
// DOM READY
// ==========================================================

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        startSite
    );

} else {

    startSite();

}
```
