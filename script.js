import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


// ======================================================
// FIREBASE CONFIG
// ======================================================

const firebaseConfig = {

    apiKey: "AIzaSyBF6MC3yN-vaTyVDrB2ACe69NLKVEe67KU",

    authDomain: "lspd-firearms-academy.firebaseapp.com",

    projectId: "lspd-firearms-academy",

    storageBucket: "lspd-firearms-academy.firebasestorage.app",

    messagingSenderId: "699387767180",

    appId: "1:699387767180:web:0b17c5d8078636dacecea9",

    measurementId: "G-LW965BY152"

};


// ======================================================
// INITIALIZE FIREBASE
// ======================================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


// ======================================================
// GLOBAL STATE
// ======================================================

let currentUser = null;


// ======================================================
// PAGE NAVIGATION
// ======================================================

window.showPage = function (pageId) {

    // Officer pages are protected
    if (
        (pageId === "officerPanelPage" ||
         pageId === "officerExam") &&
        !currentUser
    ) {

        showPage("login");

        showLoginMessage(
            "برای ورود به بخش Officer ابتدا باید Login کنید.",
            "error"
        );

        return;
    }


    const pages =
        document.querySelectorAll(".page-section");


    pages.forEach(page => {

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


// ======================================================
// OPEN OFFICER PORTAL
// ======================================================

window.openOfficerPortal = function () {

    if (currentUser) {

        showPage("officerPanelPage");

        return;
    }


    showPage("login");

};


// ======================================================
// FIREBASE AUTH STATE
// ======================================================

onAuthStateChanged(auth, (user) => {

    currentUser = user;


    const officerPanel =
        document.getElementById("officerPanelPage");


    const officerExam =
        document.getElementById("officerExam");


    const loginPage =
        document.getElementById("login");


    const loggedEmail =
        document.getElementById("loggedOfficerEmail");


    if (user) {

        // User is logged in

        if (loggedEmail) {

            loggedEmail.textContent =
                user.email || "Officer";

        }


        // Hide login page from normal navigation

        if (loginPage) {

            loginPage.classList.remove("active");

        }

    } else {

        // User logged out

        if (officerPanel) {

            officerPanel.classList.remove("active");

        }

        if (officerExam) {

            officerExam.classList.remove("active");

        }

        if (loggedEmail) {

            loggedEmail.textContent =
                "Officer";

        }

    }

});


// ======================================================
// LOGIN
// ======================================================

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const email =
                document
                    .getElementById("officerEmail")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("officerPassword")
                    .value;


            const loginButton =
                loginForm.querySelector("button");


            loginButton.disabled = true;

            loginButton.textContent =
                "LOGGING IN...";


            clearLoginMessage();


            try {

                const credential =
                    await signInWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );


                currentUser =
                    credential.user;


                document
                    .getElementById("officerEmail")
                    .value = "";


                document
                    .getElementById("officerPassword")
                    .value = "";


                const loggedEmail =
                    document
                        .getElementById("loggedOfficerEmail");


                if (loggedEmail) {

                    loggedEmail.textContent =
                        currentUser.email;

                }


                showPage(
                    "officerPanelPage"
                );


            } catch (error) {

                console.error(
                    "Firebase Login Error:",
                    error
                );


                let message =
                    "ورود ناموفق بود.";


                if (
                    error.code ===
                    "auth/invalid-credential"
                ) {

                    message =
                        "ایمیل یا رمز عبور اشتباه است.";

                }


                else if (
                    error.code ===
                    "auth/user-not-found"
                ) {

                    message =
                        "این Officer در Firebase وجود ندارد.";

                }


                else if (
                    error.code ===
                    "auth/wrong-password"
                ) {

                    message =
                        "رمز عبور اشتباه است.";

                }


                else if (
                    error.code ===
                    "auth/invalid-email"
                ) {

                    message =
                        "فرمت ایمیل صحیح نیست.";

                }


                else if (
                    error.code ===
                    "auth/too-many-requests"
                ) {

                    message =
                        "تعداد تلاش‌ها زیاد است. کمی بعد دوباره امتحان کنید.";

                }


                showLoginMessage(
                    message,
                    "error"
                );

            }


            loginButton.disabled = false;

            loginButton.textContent =
                "LOGIN";

        }
    );

}


// ======================================================
// LOGIN MESSAGE
// ======================================================

function showLoginMessage(
    message,
    type = "error"
) {

    const element =
        document.getElementById("loginResult");


    if (!element) return;


    element.className =
        "login-result " + type;


    element.textContent =
        message;

}


function clearLoginMessage() {

    const element =
        document.getElementById("loginResult");


    if (!element) return;


    element.className =
        "login-result";


    element.textContent =
        "";

}


// ======================================================
// LOGOUT
// ======================================================

window.logoutOfficer = async function () {

    try {

        await signOut(auth);

        currentUser = null;

        showPage("home");

    } catch (error) {

        console.error(
            "Logout Error:",
            error
        );

    }

};


// ======================================================
// CIVILIAN QUESTIONS
// ======================================================

const civilianQuestions = [

    "دلیل شما برای درخواست مجوز چیست؟",

    "چرا فکر می‌کنید داشتن این مجوز برای شخصیت شما ضروری است؟",

    "مسئولیت‌های یک دارنده مجوز را چگونه تعریف می‌کنید؟",

    "اگر متوجه شوید شرایط دریافت مجوز را دیگر ندارید، چه اقدامی انجام می‌دهید؟",

    "اگر مجوز شما تعلیق شود، واکنش شما چه خواهد بود؟",

    "چه شرایطی می‌تواند یک موقعیت عادی را به یک موقعیت خطرناک تبدیل کند؟",

    "اگر در یک موقعیت تنش‌زا باشید، برای جلوگیری از تشدید آن چه تصمیمی می‌گیرید؟",

    "اگر فرد مقابل شما عصبانی باشد، چطور سعی می‌کنید شرایط را آرام کنید؟",

    "اگر شخص دیگری از شما بخواهد Permit یا تجهیزات مجاز شما را در اختیارش قرار دهید، چه می‌کنید؟",

    "اگر شاهد رفتار غیرقانونی مرتبط با یک Permit باشید، چه اقدامی انجام می‌دهید؟",

    "اگر یکی از دوستان یا اعضای خانواده بخواهد از Permit شما استفاده کند، چه پاسخی می‌دهید؟",

    "اگر درباره اعتبار یا شرایط Permit خود مطمئن نباشید، از چه کسی سؤال می‌کنید؟",

    "اگر در یک موقعیت عمومی احساس کنید شرایط در حال خطرناک‌شدن است، اولویت شما چیست؟",

    "تفاوت بین داشتن Permit و داشتن اختیار نامحدود چیست؟",

    "چرا دارنده Permit باید در رفتار خود مسئولیت‌پذیر باشد؟",

    "اگر شخص دیگری عمداً سعی کند شما را وارد درگیری کند، چه رویکردی دارید؟",

    "اگر بعداً متوجه شوید تصمیمی که در یک موقعیت گرفته‌اید اشتباه بوده، چه کاری انجام می‌دهید؟",

    "آیا هر فردی صرفاً به دلیل داشتن Permit می‌تواند در هر شرایطی از آن استفاده کند؟ چرا؟",

    "چه چیزی باعث می‌شود LSPD به شما به‌عنوان یک دارنده Permit مسئول اعتماد کند؟",

    "آیا حاضرید در صورت نقض شرایط Permit، مجوز شما طبق قوانین سرور بررسی یا تعلیق شود؟"

];


// ======================================================
// BUILD CIVILIAN QUESTIONS
// ======================================================

const civilianContainer =
    document.getElementById(
        "civilianQuestions"
    );


if (civilianContainer) {

    civilianQuestions.forEach(
        (question, index) => {

            const box =
                document.createElement("div");


            box.className =
                "scenario-question";


            box.innerHTML = `

                <p>
                    ${index + 1}. ${question}
                </p>

                <textarea
                    class="civilian-answer"
                    placeholder="پاسخ متقاضی...">
                </textarea>

            `;


            civilianContainer.appendChild(
                box
            );

        }
    );

}


// ======================================================
// CIVILIAN SUBMIT
// ======================================================

window.submitCivilian = function () {

    const name =
        document
            .getElementById("civilianName")
            .value
            .trim();


    const examiner =
        document
            .getElementById("civilianExaminer")
            .value
            .trim();


    const result =
        document.getElementById(
            "civilianResult"
        );


    if (!name) {

        result.className =
            "result-box show error-result";


        result.textContent =
            "لطفاً نام متقاضی را وارد کنید.";


        return;
    }


    if (!examiner) {

        result.className =
            "result-box show error-result";


        result.textContent =
            "لطفاً نام Examiner را وارد کنید.";


        return;
    }


    const answers =
        document.querySelectorAll(
            ".civilian-answer"
        );


    let answered = 0;


    answers.forEach(answer => {

        if (
            answer.value.trim().length > 0
        ) {

            answered++;

        }

    });


    if (answered < civilianQuestions.length) {

        result.className =
            "result-box show error-result";


        result.textContent =
            `لطفاً تمام ${civilianQuestions.length} سوال را پاسخ دهید. (${answered}/${civilianQuestions.length})`;


        return;
    }


    result.className =
        "result-box show success-result";


    result.innerHTML = `

        <strong>
            مصاحبه آماده بررسی است ✅
        </strong>

        <br><br>

        متقاضی:
        ${escapeHTML(name)}

        <br>

        Examiner:
        ${escapeHTML(examiner)}

        <br><br>

        وضعیت:
        <strong>
            PENDING REVIEW
        </strong>

    `;

};


// ======================================================
// OFFICER EXAM ANSWERS
// ======================================================

const correctAnswers = {

    q1: "B",

    q2: "C",

    q3: "B",

    q4: "B",

    q5: "A",

    q6: "A",

    q7: "A",

    q8: "A"

};


// ======================================================
// OFFICER EXAM SUBMIT
// ======================================================

window.submitOfficerExam = function () {

    if (!currentUser) {

        showPage("login");

        showLoginMessage(
            "برای شرکت در آزمون باید وارد Officer Portal شوید.",
            "error"
        );

        return;
    }


    const candidateName =
        document
            .getElementById("candidateName")
            .value
            .trim();


    const candidateRank =
        document
            .getElementById("candidateRank")
            .value
            .trim();


    const candidateBadge =
        document
            .getElementById("candidateBadge")
            .value
            .trim();


    const result =
        document.getElementById(
            "examResult"
        );


    if (!candidateName) {

        showExamResult(
            "لطفاً Candidate Name را وارد کنید.",
            "error-result"
        );

        return;
    }


    if (!candidateRank) {

        showExamResult(
            "لطفاً Rank را وارد کنید.",
            "error-result"
        );

        return;
    }


    if (!candidateBadge) {

        showExamResult(
            "لطفاً Badge Number را وارد کنید.",
            "error-result"
        );

        return;
    }


    let score = 0;

    let total =
        Object.keys(
            correctAnswers
        ).length;


    Object.keys(
        correctAnswers
    ).forEach(question => {

        const selected =
            document.querySelector(
                `input[name="${question}"]:checked`
            );


        if (
            selected &&
            selected.value ===
            correctAnswers[question]
        ) {

            score++;

        }

    });


    const scenarioIds = [

        "scenario9",

        "scenario10",

        "scenario11",

        "scenario12"

    ];


    let scenariosAnswered = true;


    scenarioIds.forEach(id => {

        const field =
            document.getElementById(id);


        if (
            !field ||
            !field.value.trim()
        ) {

            scenariosAnswered = false;

        }

    });


    if (!scenariosAnswered) {

        showExamResult(
            "لطفاً به تمام Scenario ها پاسخ دهید.",
            "error-result"
        );

        return;
    }


    const percentage =
        Math.round(
            (score / total) * 100
        );


    if (percentage >= 80) {

        showExamResultHTML(

            `

            <strong>
                PASS ✅
            </strong>

            <br><br>

            Score:
            ${percentage}%

            <br>

            Candidate:
            ${escapeHTML(candidateName)}

            <br>

            Status:
            CERTIFICATION REVIEW

            `,

            "success-result"

        );

    } else {

        showExamResultHTML(

            `

            <strong>
                FAIL ❌
            </strong>

            <br><br>

            Score:
            ${percentage}%

            <br>

            Passing Score:
            80%

            `,

            "error-result"

        );

    }

};


// ======================================================
// EXAM RESULT
// ======================================================

function showExamResult(
    message,
    className
) {

    const result =
        document.getElementById(
            "examResult"
        );


    result.className =
        "result-box show " +
        className;


    result.textContent =
        message;

}


function showExamResultHTML(
    html,
    className
) {

    const result =
        document.getElementById(
            "examResult"
        );


    result.className =
        "result-box show " +
        className;


    result.innerHTML =
        html;

}


// ======================================================
// HTML ESCAPE
// ======================================================

function escapeHTML(value) {

    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


// ======================================================
// INITIAL PAGE
// ======================================================

showPage("home");
