```javascript
// ============================================
// LSPD FIREARMS ACADEMY
// COMPLETE SCRIPT.JS
// ============================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("LSPD Academy script loaded successfully");

    // --------------------------------------------
    // PAGE NAVIGATION
    // --------------------------------------------

    const pages = document.querySelectorAll(".page-section");

    function showPage(pageId) {

        console.log("Opening page:", pageId);

        pages.forEach(page => {
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

    // --------------------------------------------
    // ALL BUTTONS WITH data-page
    // --------------------------------------------

    document.addEventListener("click", (event) => {

        const button = event.target.closest("[data-page]");

        if (!button) return;

        const pageId = button.getAttribute("data-page");

        if (!pageId) return;

        showPage(pageId);
    });

    // --------------------------------------------
    // HANDBOOK ACCORDION
    // --------------------------------------------

    const handbookCards =
        document.querySelectorAll(".handbook-card");

    handbookCards.forEach(card => {

        const title = card.querySelector("h3");
        const content = card.querySelector(".handbook-content");

        if (!title || !content) return;

        // حالت اولیه
        content.style.display = "none";
        title.style.cursor = "pointer";

        title.addEventListener("click", () => {

            const isOpen =
                content.style.display === "block";

            // بستن همه بخش‌ها
            handbookCards.forEach(otherCard => {

                const otherContent =
                    otherCard.querySelector(".handbook-content");

                const otherTitle =
                    otherCard.querySelector("h3");

                if (otherContent) {
                    otherContent.style.display = "none";
                }

                if (otherTitle) {
                    otherTitle.textContent =
                        otherTitle.textContent.replace("▲", "▼");
                }
            });

            // باز کردن بخش انتخاب‌شده
            if (!isOpen) {

                content.style.display = "block";

                if (!title.textContent.includes("▲")) {
                    title.textContent =
                        title.textContent.replace("▼", "▲");
                }

            }

        });

    });

    // --------------------------------------------
    // CIVILIAN QUESTIONS
    // --------------------------------------------

    const civilianQuestions =
        document.getElementById("civilianQuestions");

    const civilianResult =
        document.getElementById("civilianResult");

    const civilianSubmit =
        document.getElementById("civilianSubmit");


    const civilianData = [

        {
            question: "قوانین Roleplay چیست و چرا باید رعایت شود؟",
            options: [
                "برای حفظ کیفیت و نظم Roleplay",
                "برای محدود کردن بازیکنان",
                "اهمیتی ندارد",
                "فقط برای Officerها است"
            ]
        },

        {
            question: "Metagaming به چه معناست؟",
            options: [
                "استفاده از اطلاعات خارج از Roleplay",
                "رانندگی سریع",
                "صحبت با Officer",
                "استفاده از Radio"
            ]
        },

        {
            question: "Powergaming چیست؟",
            options: [
                "تحمیل اقدامات غیرمنطقی به بازیکن دیگر",
                "استفاده از تجهیزات",
                "Roleplay عادی",
                "گزارش Incident"
            ]
        },

        {
            question: "اگر با Officer در Roleplay مشکل داشتید چه کاری مناسب است؟",
            options: [
                "استفاده از سیستم گزارش Department/Server",
                "دعوا کردن",
                "ترک فوری Server",
                "نادیده گرفتن قوانین"
            ]
        },

        {
            question: "آیا باید قوانین Server را مطالعه کنید؟",
            options: [
                "بله",
                "خیر",
                "فقط هنگام Ban",
                "فقط Officerها"
            ]
        },

        {
            question: "هدف اصلی Roleplay چیست؟",
            options: [
                "ایجاد یک تجربه منطقی و منصفانه",
                "بردن به هر روش",
                "نادیده گرفتن قوانین",
                "ایجاد مشکل برای دیگران"
            ]
        }

    ];


    function loadCivilianQuestions() {

        if (!civilianQuestions) return;

        civilianQuestions.innerHTML = "";

        civilianData.forEach((item, index) => {

            const question = document.createElement("div");

            question.className = "question";

            question.innerHTML = `
                <p>
                    ${index + 1}. ${item.question}
                </p>

                ${item.options.map((option, optionIndex) => `
                    <label>
                        <input
                            type="radio"
                            name="civilianQuestion${index}"
                            value="${optionIndex}">
                        ${option}
                    </label>
                `).join("")}
            `;

            civilianQuestions.appendChild(question);

        });

    }

    loadCivilianQuestions();


    // --------------------------------------------
    // CIVILIAN SUBMIT
    // --------------------------------------------

    if (civilianSubmit) {

        civilianSubmit.addEventListener("click", () => {

            const name =
                document.getElementById("civilianName")?.value.trim();

            const examiner =
                document.getElementById("civilianExaminer")?.value.trim();


            if (!name) {

                showResult(
                    civilianResult,
                    "لطفاً نام متقاضی را وارد کنید.",
                    "error"
                );

                return;
            }


            let answered = 0;

            civilianData.forEach((_, index) => {

                const answer =
                    document.querySelector(
                        `input[name="civilianQuestion${index}"]:checked`
                    );

                if (answer) {
                    answered++;
                }

            });


            if (answered < civilianData.length) {

                showResult(
                    civilianResult,
                    `لطفاً به تمام سوالات پاسخ دهید. (${answered}/${civilianData.length})`,
                    "error"
                );

                return;
            }


            showResult(
                civilianResult,
                `فرم ${name} با موفقیت تکمیل شد.
                ${examiner ? ` Examiner: ${examiner}` : ""}`,
                "success"
            );

        });

    }


    // --------------------------------------------
    // OFFICER ASSESSMENT QUESTIONS
    // --------------------------------------------

    const assessmentQuestions =
        document.getElementById("assessmentQuestions");

    const officerExamSubmit =
        document.getElementById("officerExamSubmit");

    const examResult =
        document.getElementById("examResult");


    const assessmentData = [

        {
            question: "Level 1 Authorization شامل چه چیزی است؟",
            options: [
                "Basic Equipment",
                "Restricted Equipment",
                "Special Authorization",
                "No Access"
            ],
            answer: 0
        },

        {
            question: "آیا Rank به تنهایی اجازه استفاده از تمام تجهیزات را می‌دهد؟",
            options: [
                "بله",
                "خیر",
                "فقط برای Instructor",
                "فقط در Patrol"
            ],
            answer: 1
        },

        {
            question: "قبل از استفاده از تجهیزات خاص چه چیزی باید بررسی شود؟",
            options: [
                "Rank + Training + Authorization",
                "فقط Rank",
                "فقط زمان",
                "فقط نظر Officer"
            ],
            answer: 0
        },

        {
            question: "اولین مرحله مناسب در کنترل یک موقعیت چیست؟",
            options: [
                "Communication",
                "Weapon",
                "Force",
                "Arrest"
            ],
            answer: 0
        },

        {
            question: "Weapon باید چه زمانی استفاده شود؟",
            options: [
                "به عنوان اولین گزینه",
                "برای نمایش",
                "مطابق شرایط و قوانین Server",
                "در هر موقعیت"
            ],
            answer: 2
        },

        {
            question: "Incident Report بهتر است شامل چه مواردی باشد؟",
            options: [
                "Incident ID و Officer و Date/Time و Location و Description و Outcome",
                "فقط اسم Officer",
                "فقط Location",
                "فقط Outcome"
            ],
            answer: 0
        },

        {
            question: "آیا Officer بدون Training مناسب می‌تواند از تجهیزات دارای Authorization خاص استفاده کند؟",
            options: [
                "بله",
                "خیر",
                "همیشه",
                "فقط شب"
            ],
            answer: 1
        },

        {
            question: "یکی از اصول اصلی Code of Conduct چیست؟",
            options: [
                "Professionalism",
                "Powergaming",
                "Metagaming",
                "Combat Logging"
            ],
            answer: 0
        },

        {
            question: "Level 0 به چه معناست؟",
            options: [
                "Basic Equipment",
                "Patrol Authorization",
                "بدون دسترسی",
                "Restricted Equipment"
            ],
            answer: 2
        },

        {
            question: "Level 2 چیست؟",
            options: [
                "No Access",
                "Basic Equipment",
                "Patrol Authorization",
                "Restricted Equipment"
            ],
            answer: 2
        },

        {
            question: "Level 3 چیست؟",
            options: [
                "Special Authorization",
                "No Access",
                "Basic Equipment",
                "Standard Equipment"
            ],
            answer: 0
        },

        {
            question: "Level 4 چیست؟",
            options: [
                "Basic Equipment",
                "Restricted Equipment",
                "No Access",
                "Patrol Authorization"
            ],
            answer: 1
        },

        {
            question: "اگر تجهیزات مشکل داشته باشند چه کاری مناسب است؟",
            options: [
                "نادیده گرفتن مشکل",
                "گزارش مشکل",
                "استفاده نمایشی",
                "دادن تجهیزات به فرد دیگر"
            ],
            answer: 1
        },

        {
            question: "Chain of Command برای چه چیزی استفاده می‌شود؟",
            options: [
                "ساختار فرماندهی و مسئولیت",
                "افزایش سرعت",
                "انتخاب تجهیزات",
                "تغییر قوانین Server"
            ],
            answer: 0
        },

        {
            question: "Certification Exam برای چیست؟",
            options: [
                "بررسی آمادگی Officer",
                "سرگرمی",
                "تغییر Rank",
                "حذف قوانین"
            ],
            answer: 0
        },

        {
            question: "کدام مورد یک تخلف Roleplay محسوب می‌شود؟",
            options: [
                "Metagaming",
                "Professionalism",
                "Teamwork",
                "Accountability"
            ],
            answer: 0
        },

        {
            question: "تجهیزات باید مطابق چه چیزی استفاده شوند؟",
            options: [
                "Server Rules و Department Rules",
                "سلیقه شخصی",
                "فقط Rank",
                "هیچ قانونی"
            ],
            answer: 0
        },

        {
            question: "De-escalation چه هدفی دارد؟",
            options: [
                "کاهش تنش و کنترل مناسب موقعیت",
                "افزایش تنش",
                "استفاده فوری از Weapon",
                "ترک Roleplay"
            ],
            answer: 0
        },

        {
            question: "مسئولیت‌پذیری Officer به چه معناست؟",
            options: [
                "پذیرش مسئولیت رفتار و تصمیمات",
                "نادیده گرفتن قوانین",
                "انتقال مسئولیت به دیگران",
                "عدم گزارش Incident"
            ],
            answer: 0
        },

        {
            question: "کدام مورد برای Training Academy مهم است؟",
            options: [
                "شناخت Handbook",
                "نادیده گرفتن Server Rules",
                "استفاده بدون Authorization",
                "عدم شرکت در Certification"
            ],
            answer: 0
        }

    ];


    function loadAssessment() {

        if (!assessmentQuestions) return;

        assessmentQuestions.innerHTML = "";

        assessmentData.forEach((item, index) => {

            const question =
                document.createElement("div");

            question.className = "question";

            question.innerHTML = `
                <p>
                    ${index + 1}. ${item.question}
                </p>

                ${item.options.map((option, optionIndex) => `
                    <label>
                        <input
                            type="radio"
                            name="assessmentQuestion${index}"
                            value="${optionIndex}">
                        ${option}
                    </label>
                `).join("")}
            `;

            assessmentQuestions.appendChild(question);

        });

    }

    loadAssessment();


    // --------------------------------------------
    // OFFICER EXAM SUBMIT
    // --------------------------------------------

    if (officerExamSubmit) {

        officerExamSubmit.addEventListener("click", () => {

            let score = 0;
            let answered = 0;


            assessmentData.forEach((item, index) => {

                const selected =
                    document.querySelector(
                        `input[name="assessmentQuestion${index}"]:checked`
                    );


                if (selected) {

                    answered++;

                    if (
                        Number(selected.value) ===
                        item.answer
                    ) {

                        score++;

                    }

                }

            });


            if (answered < assessmentData.length) {

                showResult(
                    examResult,
                    `لطفاً به تمام سوالات پاسخ دهید. (${answered}/${assessmentData.length})`,
                    "error"
                );

                return;
            }


            const percentage =
                Math.round(
                    (score / assessmentData.length) * 100
                );


            let message = "";

            if (percentage >= 80) {

                message =
                    `PASS — نمره شما ${score}/${assessmentData.length} (${percentage}%) است.`;

            } else {

                message =
                    `FAIL — نمره شما ${score}/${assessmentData.length} (${percentage}%) است.`;

            }


            showResult(
                examResult,
                message,
                percentage >= 80 ? "success" : "error"
            );

        });

    }


    // --------------------------------------------
    // LOGIN
    // --------------------------------------------

    const loginForm =
        document.getElementById("loginForm");

    const loginResult =
        document.getElementById("loginResult");


    if (loginForm) {

        loginForm.addEventListener("submit", (event) => {

            event.preventDefault();


            const email =
                document.getElementById("officerEmail")
                    ?.value.trim();

            const password =
                document.getElementById("officerPassword")
                    ?.value;


            if (!email || !password) {

                showResult(
                    loginResult,
                    "لطفاً Email و Password را وارد کنید.",
                    "error"
                );

                return;
            }


            /*
             * فعلاً Login نمایشی است.
             * بعداً می‌توان Firebase Authentication
             * را به همین بخش وصل کرد.
             */

            localStorage.setItem(
                "lspdOfficerEmail",
                email
            );


            const loggedOfficerEmail =
                document.getElementById(
                    "loggedOfficerEmail"
                );


            if (loggedOfficerEmail) {
                loggedOfficerEmail.textContent = email;
            }


            showPage("officerPanelPage");

        });

    }


    // --------------------------------------------
    // RESTORE LOGIN
    // --------------------------------------------

    const savedEmail =
        localStorage.getItem("lspdOfficerEmail");


    if (savedEmail) {

        const loggedOfficerEmail =
            document.getElementById(
                "loggedOfficerEmail"
            );

        if (loggedOfficerEmail) {
            loggedOfficerEmail.textContent =
                savedEmail;
        }

    }


    // --------------------------------------------
    // LOGOUT
    // --------------------------------------------

    const logoutButton =
        document.getElementById("logoutButton");


    if (logoutButton) {

        logoutButton.addEventListener("click", () => {

            localStorage.removeItem(
                "lspdOfficerEmail"
            );

            const emailInput =
                document.getElementById("officerEmail");

            const passwordInput =
                document.getElementById("officerPassword");


            if (emailInput) {
                emailInput.value = "";
            }

            if (passwordInput) {
                passwordInput.value = "";
            }


            showResult(
                loginResult,
                "با موفقیت Logout شدید.",
                "success"
            );


            showPage("login");

        });

    }


    // --------------------------------------------
    // RESULT HELPER
    // --------------------------------------------

    function showResult(element, message, type) {

        if (!element) return;

        element.textContent = message;

        element.className =
            "result-box " + type;

    }


    // --------------------------------------------
    // START PAGE
    // --------------------------------------------

    showPage("home");

});
```
