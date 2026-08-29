/* =====================================================
   LSPD FIREARMS ACADEMY
   FINAL SCRIPT
===================================================== */

/* =====================================================
   FIREBASE COMPAT
===================================================== */

(function loadFirebase() {

    const scripts = [
        "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js",
        "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js"
    ];

    let loaded = 0;

    scripts.forEach(function (src) {

        const script = document.createElement("script");

        script.src = src;

        script.onload = function () {

            loaded++;

            if (loaded === scripts.length) {
                initializeLSPD();
            }

        };

        script.onerror = function () {

            console.error("Firebase failed to load:", src);

            initializeLSPD(false);

        };

        document.head.appendChild(script);

    });

})();


/* =====================================================
   MAIN APPLICATION
===================================================== */

function initializeLSPD(firebaseAvailable = true) {

    console.log("LSPD Firearms Academy starting...");


    /* =================================================
       FIREBASE
    ================================================= */

    let auth = null;

    if (firebaseAvailable && typeof firebase !== "undefined") {

        const firebaseConfig = {

            apiKey:
                "AIzaSyBF6MC3yN-vaTyVDrB2ACe69NLKVEe67KU",

            authDomain:
                "lspd-firearms-academy.firebaseapp.com",

            projectId:
                "lspd-firearms-academy",

            storageBucket:
                "lspd-firearms-academy.firebasestorage.app",

            messagingSenderId:
                "699387767180",

            appId:
                "1:699387767180:web:53e815b3ae2f818fcecea9",

            measurementId:
                "G-JGQTYH8WX1"
        };


        try {

            if (!firebase.apps.length) {

                firebase.initializeApp(firebaseConfig);

            }

            auth = firebase.auth();

            console.log("Firebase connected successfully.");

        }

        catch (error) {

            console.error(
                "Firebase initialization error:",
                error
            );

        }

    }


    /* =================================================
       PAGE NAVIGATION
    ================================================= */

    window.showPage = function (pageId) {

        const protectedPages = [
            "officerPanelPage",
            "officerExam"
        ];


        if (
            protectedPages.includes(pageId) &&
            (!auth || !auth.currentUser)
        ) {

            pageId = "login";

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

    };


    /* =================================================
       CIVILIAN QUESTIONS
    ================================================= */

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


    /* =================================================
       LOAD CIVILIAN QUESTIONS
    ================================================= */

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
                    (index + 1) + ". " + question;


                const textarea =
                    document.createElement("textarea");


                textarea.placeholder =
                    "پاسخ متقاضی...";


                box.appendChild(number);

                box.appendChild(textarea);

                container.appendChild(box);

            }
        );

    }


    /* =================================================
       CIVILIAN SUBMIT
    ================================================= */

    const civilianSubmit =
        document.getElementById(
            "civilianSubmit"
        );


    if (civilianSubmit) {

        civilianSubmit.addEventListener(
            "click",
            function () {

                const nameElement =
                    document.getElementById(
                        "civilianName"
                    );


                const examinerElement =
                    document.getElementById(
                        "civilianExaminer"
                    );


                if (!nameElement || !examinerElement) {
                    return;
                }


                const name =
                    nameElement.value.trim();


                const examiner =
                    examinerElement.value.trim();


                if (!name || !examiner) {

                    showResult(
                        "civilianResult",
                        "لطفاً نام متقاضی و Examiner را وارد کنید.",
                        false
                    );

                    return;

                }


                showResult(
                    "civilianResult",
                    "مصاحبه با موفقیت ثبت شد. Examiner می‌تواند نتیجه را بررسی کند.",
                    true
                );

            }
        );

    }


    /* =================================================
       NAVIGATION BUTTONS
    ================================================= */

    const navigationButtons =
        document.querySelectorAll(
            "[data-page]"
        );


    navigationButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const page =
                        button.getAttribute(
                            "data-page"
                        );


                    if (page) {

                        window.showPage(page);

                    }

                }
            );

        }
    );


    /* =================================================
       LOGIN
    ================================================= */

    const loginForm =
        document.getElementById(
            "loginForm"
        );


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const emailElement =
                    document.getElementById(
                        "officerEmail"
                    );


                const passwordElement =
                    document.getElementById(
                        "officerPassword"
                    );


                if (!emailElement ||
                    !passwordElement) {

                    return;

                }


                const email =
                    emailElement.value.trim();


                const password =
                    passwordElement.value;


                if (!email || !password) {

                    showResult(
                        "loginResult",
                        "لطفاً Email و Password را وارد کنید.",
                        false
                    );

                    return;

                }


                if (!auth) {

                    showResult(
                        "loginResult",
                        "اتصال Firebase برقرار نیست.",
                        false
                    );

                    return;

                }


                showResult(
                    "loginResult",
                    "در حال ورود...",
                    true
                );


                try {

                    await auth.signInWithEmailAndPassword(
                        email,
                        password
                    );


                    showPage(
                        "officerPanelPage"
                    );


                }

                catch (error) {

                    console.error(
                        "Login Error:",
                        error
                    );


                    let message =
                        "ورود ناموفق بود.";


                    switch (error.code) {

                        case "auth/invalid-login-credentials":

                        case "auth/invalid-credential":

                        case "auth/wrong-password":

                            message =
                                "ایمیل یا رمز عبور اشتباه است.";

                            break;


                        case "auth/user-not-found":

                            message =
                                "این Officer در Firebase وجود ندارد.";

                            break;


                        case "auth/too-many-requests":

                            message =
                                "تعداد تلاش‌های ورود بیش از حد مجاز است.";

                            break;


                        case "auth/network-request-failed":

                            message =
                                "اتصال به Firebase برقرار نشد.";

                            break;


                        case "auth/user-disabled":

                            message =
                                "این حساب Officer غیرفعال شده است.";

                            break;


                        default:

                            message =
                                "خطای ورود: " +
                                error.code;

                    }


                    showResult(
                        "loginResult",
                        message,
                        false
                    );

                }

            }
        );

    }


    /* =================================================
       AUTH STATE
    ================================================= */

    if (auth) {

        auth.onAuthStateChanged(
            function (user) {

                const emailElement =
                    document.getElementById(
                        "loggedOfficerEmail"
                    );


                if (user) {

                    console.log(
                        "Officer logged in:",
                        user.email
                    );


                    if (emailElement) {

                        emailElement.textContent =
                            user.email || "";

                    }

                }

                else {

                    if (emailElement) {

                        emailElement.textContent =
                            "";

                    }


                    const currentPage =
                        document.querySelector(
                            ".page-section.active"
                        );


                    if (
                        currentPage &&
                        (
                            currentPage.id ===
                            "officerPanelPage" ||

                            currentPage.id ===
                            "officerExam"
                        )
                    ) {

                        showPage("home");

                    }

                }

            }
        );

    }


    /* =================================================
       LOGOUT
    ================================================= */

    const logoutButton =
        document.getElementById(
            "logoutButton"
        );


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            async function () {

                if (!auth) {

                    showPage("home");

                    return;

                }


                try {

                    await auth.signOut();

                    showPage("home");

                }

                catch (error) {

                    console.error(
                        "Logout error:",
                        error
                    );

                }

            }
        );

    }


    /* =================================================
       OFFICER EXAM
    ================================================= */

    const examSubmit =
        document.getElementById(
            "officerExamSubmit"
        );


    if (examSubmit) {

        examSubmit.addEventListener(
            "click",
            function () {

                if (!auth || !auth.currentUser) {

                    showPage("login");

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


                const total =
                    Object.keys(answers).length;


                for (
                    const question in answers
                ) {

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


                const percentage =
                    Math.round(
                        (score / total) * 100
                    );


                if (percentage >= 80) {

                    showResult(
                        "examResult",
                        "PASS ✅<br>Score: " +
                        percentage +
                        "%",
                        true
                    );

                }

                else {

                    showResult(
                        "examResult",
                        "FAIL ❌<br>Score: " +
                        percentage +
                        "%<br>" +
                        "<small>حداقل نمره قبولی 80% است.</small>",
                        false
                    );

                }

            }
        );

    }


    /* =================================================
       RESULT
    ================================================= */

    function showResult(
        elementId,
        message,
        success
    ) {

        const element =
            document.getElementById(
                elementId
            );


        if (!element) {
            return;
        }


        element.className =
            success
                ? "result-box show success"
                : "result-box show danger";


        element.innerHTML =
            message;

    }


    /* =================================================
       START
    ================================================= */

    loadCivilianQuestions();

    window.showPage("home");


    console.log(
        "LSPD Firearms Academy loaded successfully."
    );

}
