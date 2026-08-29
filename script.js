```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


/* =====================================================
   FIREBASE CONFIG
===================================================== */

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

const db = getFirestore(app);


/* =====================================================
   PAGE NAVIGATION
===================================================== */

window.showPage = function (pageId) {

    const protectedPages = [
        "officerPanelPage",
        "officerExam"
    ];

    if (
        protectedPages.includes(pageId) &&
        !auth.currentUser
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
        console.error("Page not found:", pageId);
        return;
    }

    target.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};


/* =====================================================
   GENERAL FORM QUESTIONS
===================================================== */

const generalQuestions = [

    "لطفاً هدف خود از تکمیل این فرم را توضیح دهید.",

    "مهم‌ترین مسئولیتی که در این زمینه دارید چیست؟",

    "اگر با یک موقعیت غیرمنتظره روبه‌رو شوید، چه رویکردی خواهید داشت؟",

    "چگونه از تصمیم‌گیری عجولانه جلوگیری می‌کنید؟",

    "اگر متوجه اشتباه خود شوید، چه اقدامی انجام می‌دهید؟",

    "در صورت وجود اختلاف نظر، چگونه آن را مدیریت می‌کنید؟",

    "چگونه مطمئن می‌شوید که قوانین و دستورالعمل‌های مربوطه را رعایت می‌کنید؟",

    "به نظر شما مسئولیت‌پذیری چه اهمیتی دارد؟",

    "اگر اطلاعات کافی برای تصمیم‌گیری نداشته باشید چه می‌کنید؟",

    "آیا نکته یا توضیح دیگری دارید؟"

];


/* =====================================================
   LOAD GENERAL QUESTIONS
===================================================== */

function loadGeneralQuestions() {

    const container =
        document.getElementById("civilianQuestions");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    generalQuestions.forEach(function (question, index) {

        const box =
            document.createElement("div");

        box.className =
            "scenario-question";

        box.innerHTML = `
            <p>
                ${index + 1}. ${question}
            </p>

            <textarea
                class="general-answer"
                data-question="${index + 1}"
                placeholder="پاسخ خود را وارد کنید..."
            ></textarea>
        `;

        container.appendChild(box);
    });
}


/* =====================================================
   SAVE GENERAL FORM TO FIRESTORE
===================================================== */

async function saveGeneralForm() {

    const nameElement =
        document.getElementById("civilianName");

    const examinerElement =
        document.getElementById("civilianExaminer");

    const result =
        document.getElementById("civilianResult");

    if (!nameElement || !examinerElement) {

        console.error(
            "Form fields not found."
        );

        return;
    }

    const name =
        nameElement.value.trim();

    const examiner =
        examinerElement.value.trim();


    if (!name || !examiner) {

        showResult(
            "civilianResult",
            "لطفاً نام و مسئول بررسی را وارد کنید.",
            false
        );

        return;
    }


    const answerElements =
        document.querySelectorAll(
            ".general-answer"
        );


    const answers = [];


    answerElements.forEach(
        function (element) {

            answers.push({

                question:
                    element.dataset.question,

                answer:
                    element.value.trim()

            });
        }
    );


    /*
       بررسی می‌کنیم حداقل پاسخ‌ها
       خالی نباشند.
    */

    const emptyAnswers =
        answers.filter(
            function (item) {
                return !item.answer;
            }
        );


    if (emptyAnswers.length > 0) {

        showResult(
            "civilianResult",
            "لطفاً به تمام سوالات پاسخ دهید.",
            false
        );

        return;
    }


    if (result) {

        result.className =
            "result-box show";

        result.innerHTML =
            "در حال ذخیره اطلاعات...";
    }


    try {

        /*
           ذخیره در Collection به نام:
           formSubmissions
        */

        const docRef =
            await addDoc(
                collection(
                    db,
                    "formSubmissions"
                ),
                {

                    name: name,

                    reviewer: examiner,

                    answers: answers,

                    submittedAt:
                        serverTimestamp()

                }
            );


        console.log(
            "Form saved:",
            docRef.id
        );


        showResult(
            "civilianResult",
            "فرم با موفقیت ثبت و در Firebase ذخیره شد. ✅",
            true
        );


    } catch (error) {

        console.error(
            "Firestore Error:",
            error
        );


        let message =
            "ذخیره اطلاعات انجام نشد.";


        if (
            error.code ===
            "permission-denied"
        ) {

            message =
                "دسترسی Firebase برای ذخیره اطلاعات مجاز نیست.";

        } else if (
            error.code ===
            "unavailable"
        ) {

            message =
                "Firebase موقتاً در دسترس نیست.";

        }


        showResult(
            "civilianResult",
            message,
            false
        );
    }
}


/* =====================================================
   SUBMIT BUTTON
===================================================== */

function setupGeneralForm() {

    const button =
        document.getElementById(
            "civilianSubmit"
        );

    if (!button) {
        return;
    }

    button.addEventListener(
        "click",
        saveGeneralForm
    );
}


/* =====================================================
   LOGIN
===================================================== */

function setupLogin() {

    const form =
        document.getElementById(
            "loginForm"
        );

    if (!form) {
        return;
    }

    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const email =
                document
                    .getElementById(
                        "officerEmail"
                    )
                    ?.value
                    .trim();

            const password =
                document
                    .getElementById(
                        "officerPassword"
                    )
                    ?.value;


            if (!email || !password) {

                showResult(
                    "loginResult",
                    "ایمیل و رمز عبور را وارد کنید.",
                    false
                );

                return;
            }


            showResult(
                "loginResult",
                "در حال ورود...",
                false
            );


            try {

                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


                showResult(
                    "loginResult",
                    "ورود موفق بود. ✅",
                    true
                );


                setTimeout(
                    function () {

                        showPage(
                            "officerPanelPage"
                        );

                    },
                    500
                );


            } catch (error) {

                console.error(
                    "Login Error:",
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
                            "کاربر پیدا نشد.";

                        break;


                    case "auth/wrong-password":

                        message =
                            "رمز عبور اشتباه است.";

                        break;


                    case "auth/too-many-requests":

                        message =
                            "تلاش‌های ورود بیش از حد مجاز است.";

                        break;


                    case "auth/network-request-failed":

                        message =
                            "اتصال به Firebase برقرار نشد.";

                        break;


                    case "auth/operation-not-allowed":

                        message =
                            "Email/Password در Firebase فعال نیست.";

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
}


/* =====================================================
   AUTH STATE
===================================================== */

onAuthStateChanged(
    auth,
    function (user) {

        const emailElement =
            document.getElementById(
                "loggedOfficerEmail"
            );


        if (user) {

            console.log(
                "Logged in:",
                user.email
            );


            if (emailElement) {

                emailElement.textContent =
                    user.email || "";
            }

        } else {

            if (emailElement) {

                emailElement.textContent =
                    "";
            }

        }
    }
);


/* =====================================================
   LOGOUT
===================================================== */

function setupLogout() {

    const button =
        document.getElementById(
            "logoutButton"
        );

    if (!button) {
        return;
    }

    button.addEventListener(
        "click",
        async function () {

            try {

                await signOut(auth);

                showPage("home");

            } catch (error) {

                console.error(
                    "Logout Error:",
                    error
                );
            }
        }
    );
}


/* =====================================================
   OFFICER EXAM
===================================================== */

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

            if (!auth.currentUser) {

                showPage("login");

                return;
            }


            const questions =
                document.querySelectorAll(
                    'input[type="radio"][name]'
                );


            const questionNames =
                [...questions]
                    .map(
                        function (input) {
                            return input.name;
                        }
                    );


            const uniqueNames =
                [...new Set(questionNames)];


            let answered = 0;


            uniqueNames.forEach(
                function (name) {

                    const selected =
                        document.querySelector(
                            `input[name="${name}"]:checked`
                        );

                    if (selected) {
                        answered++;
                    }
                }
            );


            const total =
                uniqueNames.length;


            if (answered < total) {

                showResult(
                    "examResult",
                    "لطفاً به تمام سوالات پاسخ دهید.",
                    false
                );

                return;
            }


            showResult(
                "examResult",
                "آزمون با موفقیت تکمیل شد. ✅",
                true
            );
        }
    );
}


/* =====================================================
   NAVIGATION
===================================================== */

function setupNavigation() {

    const buttons =
        document.querySelectorAll(
            "[data-page]"
        );


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const page =
                        button.dataset.page;

                    if (page) {

                        showPage(page);
                    }
                }
            );
        }
    );
}


/* =====================================================
   RESULT
===================================================== */

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


/* =====================================================
   START
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "Application starting..."
        );


        loadGeneralQuestions();

        setupNavigation();

        setupLogin();

        setupLogout();

        setupGeneralForm();

        setupOfficerExam();

        showPage("home");


        console.log(
            "Application ready. ✅"
        );
    }
);
```
