```javascript
/* =========================================================
   LSPD ACADEMY - SCRIPT.JS
   نسخه کامل
========================================================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


/* =========================================================
   FIREBASE
========================================================= */

const firebaseConfig = {
    apiKey: "AIzaSyBF6MC3yN-vaTyVDrB2ACe69NLKVEe67KU",
    authDomain: "lspd-firearms-academy.firebaseapp.com",
    projectId: "lspd-firearms-academy",
    storageBucket: "lspd-firearms-academy.firebasestorage.app",
    messagingSenderId: "699387767180",
    appId: "1:699387767180:web:53e815b3ae2f818fcecea9",
    measurementId: "G-JGQTYH8WX1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


/* =========================================================
   PAGE SYSTEM
========================================================= */

const protectedPages = [
    "officerPanelPage",
    "officerExam"
];


function showPage(pageId) {

    if (
        protectedPages.includes(pageId) &&
        !auth.currentUser
    ) {
        pageId = "login";
    }

    const pages = document.querySelectorAll(".page-section");

    pages.forEach(function(page) {
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


/* اجازه استفاده از showPage در HTML */

window.showPage = showPage;


/* =========================================================
   NAVIGATION BUTTONS
========================================================= */

function setupNavigation() {

    const buttons = document.querySelectorAll("[data-page]");

    buttons.forEach(function(button) {

        button.addEventListener("click", function(event) {

            event.preventDefault();

            const pageId =
                button.getAttribute("data-page");

            if (!pageId) {
                return;
            }

            showPage(pageId);

        });

    });

    console.log(
        "Navigation buttons:",
        buttons.length
    );
}


/* =========================================================
   CIVILIAN QUESTIONS
========================================================= */

const civilianQuestions = [

    "دلیل شما برای درخواست ورود به این برنامه چیست؟",

    "مسئولیت‌پذیری در محیط Roleplay را چگونه تعریف می‌کنید؟",

    "اگر متوجه شوید یک قانون را اشتباه متوجه شده‌اید چه می‌کنید؟",

    "اگر شرایط یک موقعیت تنش‌زا شود، چه رویکردی دارید؟",

    "چگونه می‌توانید از تشدید غیرضروری یک موقعیت جلوگیری کنید؟",

    "اگر فرد مقابل عصبانی باشد چگونه با او صحبت می‌کنید؟",

    "اگر با تصمیم یک Officer مخالف باشید چه می‌کنید؟",

    "اگر شاهد نقض قوانین Server باشید چه اقدامی انجام می‌دهید؟",

    "تفاوت IC و OOC چیست؟",

    "Metagaming چیست؟",

    "FailRP چیست؟",

    "Powergaming چیست؟",

    "Combat Logging چیست؟",

    "چرا رعایت قوانین Server اهمیت دارد؟",

    "Professionalism در Roleplay به چه معناست؟",

    "چرا احترام به سایر بازیکنان مهم است؟",

    "اگر تصمیم اشتباهی بگیرید چه واکنشی نشان می‌دهید؟",

    "اگر از قوانین مطمئن نباشید از چه روشی اطلاعات درست را پیدا می‌کنید؟",

    "آیا حاضر هستید مسئولیت تصمیمات خود را بپذیرید؟ چرا؟"

];


/* =========================================================
   LOAD CIVILIAN QUESTIONS
========================================================= */

function loadCivilianQuestions() {

    const container =
        document.getElementById("civilianQuestions");

    if (!container) {
        console.warn(
            "civilianQuestions element not found."
        );

        return;
    }

    container.innerHTML = "";

    civilianQuestions.forEach(function(question, index) {

        const box =
            document.createElement("div");

        box.className =
            "scenario-question";

        const number =
            index + 1;

        box.innerHTML = `

            <p>
                ${number}. ${question}
            </p>

            <textarea
                class="civilian-answer"
                data-question="${number}"
                placeholder="پاسخ متقاضی..."
            ></textarea>

        `;

        container.appendChild(box);

    });

    console.log(
        "Civilian questions loaded:",
        civilianQuestions.length
    );
}


/* =========================================================
   CIVILIAN SUBMIT
========================================================= */

function submitCivilian() {

    const nameElement =
        document.getElementById("civilianName");

    const examinerElement =
        document.getElementById("civilianExaminer");

    if (!nameElement || !examinerElement) {

        console.error(
            "Civilian form elements not found."
        );

        return;
    }

    const name =
        nameElement.value.trim();

    const examiner =
        examinerElement.value.trim();

    if (!name) {

        showResult(
            "civilianResult",
            "لطفاً نام متقاضی را وارد کنید.",
            false
        );

        return;
    }

    if (!examiner) {

        showResult(
            "civilianResult",
            "لطفاً نام Examiner را وارد کنید.",
            false
        );

        return;
    }


    const answerElements =
        document.querySelectorAll(
            ".civilian-answer"
        );

    let answered = 0;

    answerElements.forEach(function(answer) {

        if (
            answer.value.trim().length > 0
        ) {

            answered++;

        }

    });


    showResult(
        "civilianResult",
        `
        فرم با موفقیت ثبت شد. ✅
        <br>
        متقاضی: ${escapeHTML(name)}
        <br>
        Examiner: ${escapeHTML(examiner)}
        <br>
        تعداد پاسخ‌های ثبت‌شده:
        ${answered} / ${civilianQuestions.length}
        `,
        true
    );

}


/* اجازه استفاده از تابع در صورت نیاز */

window.submitCivilian = submitCivilian;


/* =========================================================
   LOGIN
========================================================= */

function setupLogin() {

    const loginForm =
        document.getElementById("loginForm");

    if (!loginForm) {

        console.error(
            "loginForm پیدا نشد."
        );

        return;
    }


    loginForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const emailElement =
                document.getElementById(
                    "officerEmail"
                );

            const passwordElement =
                document.getElementById(
                    "officerPassword"
                );


            const result =
                document.getElementById(
                    "loginResult"
                );


            if (
                !emailElement ||
                !passwordElement
            ) {

                console.error(
                    "Login input پیدا نشد."
                );

                return;
            }


            const email =
                emailElement.value.trim();

            const password =
                passwordElement.value;


            if (!email || !password) {

                showResult(
                    "loginResult",
                    "ایمیل و رمز عبور را وارد کنید.",
                    false
                );

                return;
            }


            if (result) {

                result.className =
                    "result-box show";

                result.innerHTML =
                    "در حال ورود...";

            }


            try {

                const credential =
                    await signInWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );


                console.log(
                    "Login successful:",
                    credential.user.email
                );


                showResult(
                    "loginResult",
                    "ورود موفق بود. در حال انتقال...",
                    true
                );


                setTimeout(
                    function() {

                        showPage(
                            "officerPanelPage"
                        );

                    },
                    400
                );


            } catch (error) {

                console.error(
                    "Firebase Login Error:",
                    error
                );


                let message =
                    "ورود ناموفق بود.";


                switch (error.code) {

                    case "auth/invalid-credential":

                        message =
                            "ایمیل یا رمز عبور اشتباه است.";

                        break;


                    case "auth/user-not-found":

                        message =
                            "این حساب Officer در Firebase وجود ندارد.";

                        break;


                    case "auth/wrong-password":

                        message =
                            "رمز عبور اشتباه است.";

                        break;


                    case "auth/invalid-email":

                        message =
                            "فرمت ایمیل صحیح نیست.";

                        break;


                    case "auth/user-disabled":

                        message =
                            "این حساب غیرفعال شده است.";

                        break;


                    case "auth/too-many-requests":

                        message =
                            "تعداد تلاش‌های ورود بیش از حد مجاز شده است. کمی بعد دوباره تلاش کنید.";

                        break;


                    case "auth/network-request-failed":

                        message =
                            "اتصال شبکه برقرار نشد. اینترنت و دسترسی به Firebase را بررسی کنید.";

                        break;


                    case "auth/invalid-api-key":

                        message =
                            "Firebase API Key مشکل دارد.";

                        break;


                    default:

                        message =
                            "خطای Firebase: " +
                            error.code;

                        break;

                }


                showResult(
                    "loginResult",
                    message,
                    false
                );

            }

        }
    );


    console.log(
        "Login system ready."
    );
}


/* =========================================================
   AUTH STATE
========================================================= */

function setupAuthState() {

    onAuthStateChanged(
        auth,
        function(user) {

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


            } else {

                console.log(
                    "No Officer logged in."
                );


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


/* =========================================================
   LOGOUT
========================================================= */

async function logoutOfficer() {

    try {

        await signOut(auth);

        console.log(
            "Officer logged out."
        );

        showPage("home");

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );

        showResult(
            "loginResult",
            "خروج از حساب با خطا مواجه شد.",
            false
        );

    }

}


window.logoutOfficer =
    logoutOfficer;


/* =========================================================
   LOGOUT BUTTON
========================================================= */

function setupLogoutButton() {

    const button =
        document.getElementById(
            "logoutButton"
        );


    if (!button) {

        console.warn(
            "logoutButton پیدا نشد."
        );

        return;
    }


    button.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            logoutOfficer();

        }
    );


    console.log(
        "Logout button ready."
    );
}


/* =========================================================
   HANDBOOK DETAILS
========================================================= */

function setupHandbookDetails() {

    const buttons =
        document.querySelectorAll(
            "[data-details]"
        );


    buttons.forEach(function(button) {

        button.addEventListener(
            "click",
            function(event) {

                event.preventDefault();


                const targetId =
                    button.getAttribute(
                        "data-details"
                    );


                if (!targetId) {
                    return;
                }


                const target =
                    document.getElementById(
                        targetId
                    );


                if (!target) {

                    console.error(
                        "Details element not found:",
                        targetId
                    );

                    return;
                }


                const isOpen =
                    target.classList.contains(
                        "show"
                    );


                target.classList.toggle(
                    "show"
                );


                if (isOpen) {

                    button.textContent =
                        "مشاهده جزئیات";

                } else {

                    button.textContent =
                        "بستن جزئیات";

                }

            }
        );

    });


    console.log(
        "Handbook detail buttons:",
        buttons.length
    );
}


/* =========================================================
   OFFICER EXAM ANSWERS
========================================================= */

const officerExamAnswers = {

    q1: "B",
    q2: "A",
    q3: "A",
    q4: "B",
    q5: "A",
    q6: "A",
    q7: "A",
    q8: "A",
    q9: "A",
    q10: "A",
    q11: "A",
    q12: "A",
    q13: "A",
    q14: "A",
    q15: "A",
    q16: "A",
    q17: "A",
    q18: "A",
    q19: "A",
    q20: "A"

};


/* =========================================================
   OFFICER EXAM
========================================================= */

function submitOfficerExam() {

    if (!auth.currentUser) {

        showPage("login");

        return;
    }


    const candidateNameElement =
        document.getElementById(
            "candidateName"
        );


    const candidateRankElement =
        document.getElementById(
            "candidateRank"
        );


    if (
        !candidateNameElement ||
        !candidateRankElement
    ) {

        console.error(
            "Candidate fields not found."
        );

        return;
    }


    const candidateName =
        candidateNameElement.value.trim();

    const candidateRank =
        candidateRankElement.value.trim();


    if (!candidateName) {

        showResult(
            "examResult",
            "لطفاً نام Candidate را وارد کنید.",
            false
        );

        return;
    }


    if (!candidateRank) {

        showResult(
            "examResult",
            "لطفاً Rank را وارد کنید.",
            false
        );

        return;
    }


    let score = 0;

    let answered = 0;


    const total =
        Object.keys(
            officerExamAnswers
        ).length;


    for (
        const question
        in officerExamAnswers
    ) {

        const selected =
            document.querySelector(
                `input[name="${question}"]:checked`
            );


        if (selected) {

            answered++;


            if (
                selected.value ===
                officerExamAnswers[question]
            ) {

                score++;

            }

        }

    }


    const percentage =
        Math.round(
            (score / total) * 100
        );


    if (percentage >= 80) {

        showResult(
            "examResult",
            `
            PASS ✅
            <br>
            Candidate:
            ${escapeHTML(candidateName)}
            <br>
            Score:
            ${score} / ${total}
            (${percentage}%)
            `,
            true
        );

    } else {

        showResult(
            "examResult",
            `
            FAIL ❌
            <br>
            Candidate:
            ${escapeHTML(candidateName)}
            <br>
            Score:
            ${score} / ${total}
            (${percentage}%)
            <br>
            پاسخ داده‌شده:
            ${answered} / ${total}
            <br>
            <small>
            حداقل نمره قبولی 80% است.
            </small>
            `,
            false
        );

    }

}


window.submitOfficerExam =
    submitOfficerExam;


/* =========================================================
   EXAM BUTTON
========================================================= */

function setupExamButton() {

    const button =
        document.getElementById(
            "officerExamSubmit"
        );


    if (!button) {

        console.warn(
            "officerExamSubmit پیدا نشد."
        );

        return;
    }


    button.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            submitOfficerExam();

        }
    );


    console.log(
        "Exam button ready."
    );
}


/* =========================================================
   RESULT BOX
========================================================= */

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

        console.error(
            "Result element not found:",
            elementId
        );

        return;
    }


    element.className =
        success
            ? "result-box show success"
            : "result-box show danger";


    element.innerHTML =
        message;

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   CIVILIAN BUTTON
========================================================= */

function setupCivilianButton() {

    const button =
        document.getElementById(
            "civilianSubmit"
        );


    if (!button) {

        console.warn(
            "civilianSubmit پیدا نشد."
        );

        return;
    }


    button.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            submitCivilian();

        }
    );


    console.log(
        "Civilian submit button ready."
    );
}


/* =========================================================
   APPLICATION START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "================================"
        );

        console.log(
            "LSPD Academy starting..."
        );

        console.log(
            "================================"
        );


        loadCivilianQuestions();

        setupNavigation();

        setupLogin();

        setupAuthState();

        setupLogoutButton();

        setupHandbookDetails();

        setupExamButton();

        setupCivilianButton();


        /*
           صفحه شروع
        */

        showPage("home");


        console.log(
            "LSPD Academy loaded successfully."
        );

    }
);
```
