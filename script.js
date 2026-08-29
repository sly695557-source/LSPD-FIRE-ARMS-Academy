```javascript
"use strict";


// ==========================================================
// LSPD FIREARMS DIVISION
// STABLE OFFLINE JAVASCRIPT
// NO FIREBASE
// ==========================================================


document.addEventListener("DOMContentLoaded", function () {


    console.log("LSPD Academy JS Loaded");


    // ======================================================
    // LOGIN STATE
    // ======================================================

    let officerLoggedIn = false;



    // ======================================================
    // PAGE NAVIGATION
    // ======================================================

    function showPage(pageId) {

        /*
         * Officer Exam و Officer Panel
         * فقط بعد از Login قابل مشاهده هستند.
         */

        if (
            pageId === "officerExam" ||
            pageId === "officerPanel"
        ) {

            if (!officerLoggedIn) {

                pageId = "login";

            }

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
            "Page:",
            pageId
        );

    }



    // ======================================================
    // ALL NAVIGATION BUTTONS
    // ======================================================

    function setupNavigation() {

        const buttons =
            document.querySelectorAll("[data-page]");


        buttons.forEach(function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    const pageId =
                        button.getAttribute(
                            "data-page"
                        );


                    if (!pageId) {
                        return;
                    }


                    showPage(pageId);

                }
            );

        });


        console.log(
            "Navigation buttons:",
            buttons.length
        );

    }



    // ======================================================
    // HANDBOOK ACCORDION
    // ======================================================

    function setupHandbook() {

        const cards =
            document.querySelectorAll(
                ".handbook-card"
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


            content.style.display =
                "none";


            title.style.cursor =
                "pointer";


            title.addEventListener(
                "click",
                function () {


                    const isOpen =
                        content.style.display ===
                        "block";


                    /*
                     * همه بسته شوند
                     */

                    cards.forEach(function (otherCard) {

                        const otherContent =
                            otherCard.querySelector(
                                ".handbook-content"
                            );


                        if (otherContent) {

                            otherContent.style.display =
                                "none";

                        }

                    });


                    /*
                     * اگر بسته بوده باز شود
                     */

                    if (!isOpen) {

                        content.style.display =
                            "block";

                    }

                }
            );

        });


        console.log(
            "Handbook cards:",
            cards.length
        );

    }



    // ======================================================
    // CIVILIAN FORM
    // ======================================================

    function setupCivilian() {

        const button =
            document.getElementById(
                "civilianSubmit"
            );


        if (!button) {
            return;
        }


        button.addEventListener(
            "click",
            function () {


                const nameInput =
                    document.getElementById(
                        "civilianName"
                    );


                const examinerInput =
                    document.getElementById(
                        "civilianExaminer"
                    );


                const result =
                    document.getElementById(
                        "civilianResult"
                    );


                if (!result) {
                    return;
                }


                const name =
                    nameInput
                        ? nameInput.value.trim()
                        : "";


                const examiner =
                    examinerInput
                        ? examinerInput.value.trim()
                        : "";


                if (!name) {

                    result.className =
                        "result-box show danger";

                    result.textContent =
                        "لطفاً نام متقاضی را وارد کنید.";

                    return;

                }


                if (!examiner) {

                    result.className =
                        "result-box show danger";

                    result.textContent =
                        "لطفاً نام Examiner را وارد کنید.";

                    return;

                }


                result.className =
                    "result-box show success";


                result.innerHTML =
                    "✅ فرم با موفقیت ثبت شد.<br>" +
                    "Applicant: " +
                    name +
                    "<br>" +
                    "Examiner: " +
                    examiner;

            }
        );

    }



    // ======================================================
    // OFFICER LOGIN
    // ======================================================

    function setupLogin() {

        const loginButton =
            document.getElementById(
                "demoLogin"
            );


        if (!loginButton) {
            return;
        }


        loginButton.addEventListener(
            "click",
            function () {


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


                if (!emailInput ||
                    !passwordInput ||
                    !result) {

                    return;

                }


                const email =
                    emailInput.value.trim();


                const password =
                    passwordInput.value;


                if (!email) {

                    result.className =
                        "result-box show danger";

                    result.textContent =
                        "لطفاً Email را وارد کنید.";

                    return;

                }


                if (!password) {

                    result.className =
                        "result-box show danger";

                    result.textContent =
                        "لطفاً Password را وارد کنید.";

                    return;

                }


                /*
                 * Login نمایشی
                 * Firebase در این نسخه وجود ندارد.
                 */

                officerLoggedIn =
                    true;


                const officerName =
                    document.getElementById(
                        "officerName"
                    );


                if (officerName) {

                    officerName.textContent =
                        email;

                }


                result.className =
                    "result-box show success";


                result.textContent =
                    "✅ Login موفق بود.";


                setTimeout(
                    function () {

                        showPage(
                            "officerPanel"
                        );

                    },
                    400
                );

            }
        );

    }



    // ======================================================
    // LOGOUT
    // ======================================================

    function setupLogout() {

        const logoutButton =
            document.getElementById(
                "logoutButton"
            );


        if (!logoutButton) {
            return;
        }


        logoutButton.addEventListener(
            "click",
            function () {


                officerLoggedIn =
                    false;


                const emailInput =
                    document.getElementById(
                        "officerEmail"
                    );


                const passwordInput =
                    document.getElementById(
                        "officerPassword"
                    );


                if (emailInput) {
                    emailInput.value = "";
                }


                if (passwordInput) {
                    passwordInput.value = "";
                }


                showPage("home");

            }
        );

    }



    // ======================================================
    // OFFICER QUESTIONS
    // ======================================================

    const officerQuestions = [

        {
            q: "LEVEL 0 به چه معناست؟",
            options: [
                "Basic Equipment",
                "Patrol Authorization",
                "بدون Authorization",
                "Restricted Equipment"
            ],
            answer: 2
        },


        {
            q: "LEVEL 1 چیست؟",
            options: [
                "Basic Equipment",
                "Special Authorization",
                "Restricted Equipment",
                "بدون دسترسی"
            ],
            answer: 0
        },


        {
            q: "LEVEL 2 چیست؟",
            options: [
                "بدون دسترسی",
                "Patrol Equipment",
                "Basic Equipment",
                "Restricted Equipment"
            ],
            answer: 1
        },


        {
            q: "LEVEL 3 چیست؟",
            options: [
                "Basic Equipment",
                "Patrol Equipment",
                "Specialized Equipment",
                "بدون دسترسی"
            ],
            answer: 2
        },


        {
            q: "LEVEL 4 چیست؟",
            options: [
                "Basic Equipment",
                "Restricted Equipment",
                "Patrol Equipment",
                "Standard Equipment"
            ],
            answer: 1
        },


        {
            q: "آیا Rank به تنهایی برای دسترسی به تمام تجهیزات کافی است؟",
            options: [
                "بله",
                "خیر",
                "همیشه",
                "فقط برای Senior Officer"
            ],
            answer: 1
        },


        {
            q: "Equipment Access باید بر اساس چه چیزی باشد؟",
            options: [
                "Rank فقط",
                "Training فقط",
                "Rank + Training + Authorization",
                "Vehicle + Rank"
            ],
            answer: 2
        },


        {
            q: "مهم‌ترین اصل Firearms Division چیست؟",
            options: [
                "Speed",
                "Safety",
                "Appearance",
                "Patrol"
            ],
            answer: 1
        },


        {
            q: "آیا استفاده نمایشی یا غیرضروری از تجهیزات مناسب است؟",
            options: [
                "بله",
                "خیر",
                "همیشه",
                "فقط در Patrol"
            ],
            answer: 1
        },


        {
            q: "در صورت مشاهده مشکل تجهیزات چه باید کرد؟",
            options: [
                "نادیده گرفت",
                "گزارش کرد",
                "مخفی کرد",
                "حذف کرد"
            ],
            answer: 1
        },


        {
            q: "ترتیب صحیح Escalation کدام است؟",
            options: [
                "Weapon → Control → Communication",
                "Communication → De-escalation → Control → Appropriate Response",
                "Control → Weapon → Communication",
                "Weapon → Weapon → Weapon"
            ],
            answer: 1
        },


        {
            q: "Weapon در Escalation Policy چه جایگاهی دارد؟",
            options: [
                "First Option",
                "Weapon ≠ First Option",
                "همیشه اجباری",
                "تنها روش کنترل"
            ],
            answer: 1
        },


        {
            q: "Incident Report برای چیست؟",
            options: [
                "ثبت و گزارش Incident",
                "افزایش Rank",
                "سرگرمی",
                "حذف قوانین"
            ],
            answer: 0
        },


        {
            q: "کدام مورد باید در Incident Report ثبت شود؟",
            options: [
                "Incident ID",
                "Favorite Color",
                "Game Level",
                "Personal Hobby"
            ],
            answer: 0
        },


        {
            q: "Officer برای Authorization خاص چه چیزی لازم دارد؟",
            options: [
                "Training مناسب",
                "فقط Rank",
                "فقط Vehicle",
                "هیچ چیز"
            ],
            answer: 0
        },


        {
            q: "Certification Exam برای چه انجام می‌شود؟",
            options: [
                "بررسی آمادگی Officer",
                "سرگرمی",
                "افزایش خودکار Rank",
                "حذف Training"
            ],
            answer: 0
        },


        {
            q: "کدام مورد مسئولیت Officer است؟",
            options: [
                "رعایت قوانین Department",
                "نادیده گرفتن Chain of Command",
                "استفاده بدون Authorization",
                "عدم گزارش Incident"
            ],
            answer: 0
        },


        {
            q: "آیا Chain of Command باید رعایت شود؟",
            options: [
                "بله",
                "خیر",
                "فقط در مواقع خاص",
                "فقط توسط Instructor"
            ],
            answer: 0
        },


        {
            q: "قبل از یک تصمیم مهم Officer باید چه کند؟",
            options: [
                "شرایط موقعیت را ارزیابی کند",
                "بدون بررسی اقدام کند",
                "قوانین را نادیده بگیرد",
                "Incident را حذف کند"
            ],
            answer: 0
        },


        {
            q: "نقض قوانین Firearms Division ممکن است چه نتیجه‌ای داشته باشد؟",
            options: [
                "هیچ نتیجه‌ای ندارد",
                "بررسی داخلی و اقدامات انضباطی",
                "افزایش Rank",
                "Authorization بیشتر"
            ],
            answer: 1
        },


        {
            q: "آیا Officer می‌تواند بدون Training مناسب از Authorization خاص استفاده کند؟",
            options: [
                "بله",
                "خیر",
                "همیشه",
                "فقط در صورت عجله"
            ],
            answer: 1
        },


        {
            q: "Professionalism در Academy به چه معناست؟",
            options: [
                "رفتار مسئولانه و حرفه‌ای",
                "نادیده گرفتن قوانین",
                "استفاده نمایشی",
                "عدم پاسخگویی"
            ],
            answer: 0
        }

    ];



    // ======================================================
    // LOAD OFFICER EXAM
    // ======================================================

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


                const title =
                    document.createElement(
                        "p"
                    );


                title.textContent =
                    (index + 1) +
                    ". " +
                    question.q;


                box.appendChild(title);


                question.options.forEach(
                    function (option, optionIndex) {


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
                            "officer_" +
                            index;


                        radio.value =
                            optionIndex;


                        label.appendChild(
                            radio
                        );


                        label.appendChild(
                            document.createTextNode(
                                " " + option
                            )
                        );


                        box.appendChild(
                            label
                        );

                    }
                );


                container.appendChild(
                    box
                );

            }
        );

    }



    // ======================================================
    // SUBMIT OFFICER EXAM
    // ======================================================

    function setupOfficerExam() {

        const button =
            document.getElementById(
                "officerExamSubmit"
            );


        if (!button) {
            return;
        }


        button.addEventListener(
            "click",
            function () {


                if (!officerLoggedIn) {

                    showPage("login");

                    return;

                }


                let score =
                    0;


                let unanswered =
                    0;


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
                            Number(
                                selected.value
                            ) ===
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
                        "%" +
                        "<br>" +
                        "Unanswered: " +
                        unanswered;

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
                        "<br>" +
                        "حداقل نمره قبولی 80% است.";

                }

            }
        );

    }



    // ======================================================
    // INITIALIZE EVERYTHING
    // ======================================================

    setupNavigation();

    setupHandbook();

    setupCivilian();

    setupLogin();

    setupLogout();

    loadOfficerExam();

    setupOfficerExam();


    // شروع در Home

    showPage("home");


    console.log(
        "LSPD Academy READY"
    );

});
```
