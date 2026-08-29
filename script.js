import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


/* =========================
   FIREBASE CONFIG
========================= */

const firebaseConfig = {

    apiKey: "AIzaSyBF6MC3yN-vaTyVDrB2ACe69NLKVEe67KU",

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


/* =========================
   FIREBASE
========================= */

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);


/* =========================
   PAGE SYSTEM
========================= */

window.showPage = function(pageId) {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove("active");

        });


    const page =
        document.getElementById(pageId);


    if (page) {

        page.classList.add("active");

        window.scrollTo(0, 0);

    }

};


/* =========================
   CIVILIAN QUESTIONS
========================= */

const civilianQuestions = [

    "دلیل شما برای درخواست این آزمون چیست؟",

    "مسئولیت‌پذیری یک Civilian در RP را چگونه تعریف می‌کنید؟",

    "اگر با یک موقعیت تنش‌زا مواجه شوید چه رویکردی دارید؟",

    "اگر فرد دیگری سعی کند شما را وارد درگیری کند چه می‌کنید؟",

    "اگر شرایط یک مجوز یا قانون را ندانید از چه کسی سؤال می‌کنید؟",

    "اگر متوجه شوید شرایط قانونی خود را از دست داده‌اید چه اقدامی می‌کنید؟",

    "چرا رعایت قوانین Server برای یک Civilian مهم است؟",

    "اگر تصمیمی در RP اشتباه باشد چه مسئولیتی دارید؟",

    "تفاوت بین داشتن مجوز و اختیار نامحدود چیست؟",

    "چرا باید از Escalation غیرضروری جلوگیری کرد؟"

];


const civilianContainer =
    document.getElementById("civilianQuestions");


civilianQuestions.forEach(
    (question, index) => {

        const box =
            document.createElement("div");

        box.className = "scenario";

        box.innerHTML = `

            <p>
                ${index + 1}. ${question}
            </p>

            <textarea
                placeholder="پاسخ خود را بنویسید..."
            ></textarea>

        `;

        civilianContainer.appendChild(box);

    }
);


/* =========================
   CIVILIAN SUBMIT
========================= */

window.submitCivilian = function() {

    const name =
        document
            .getElementById("civilianName")
            .value
            .trim();


    if (!name) {

        document
            .getElementById("civilianResult")
            .innerHTML = `

                <div class="error">
                    لطفاً نام متقاضی را وارد کنید.
                </div>

            `;

        return;

    }


    document
        .getElementById("civilianResult")
        .innerHTML = `

            <div class="success">

                آزمون با موفقیت آماده ثبت شد.

                <br>

                Examiner می‌تواند نتیجه را بررسی کند.

            </div>

        `;

};


/* =========================
   OFFICER ACCESS
========================= */

let currentOfficer = false;


/*
    بررسی می‌کند که کاربر داخل
    Firestore به عنوان Officer ثبت شده یا نه.
*/

async function checkOfficer(uid) {

    try {

        const officerRef =
            doc(db, "users", uid);

        const officerSnap =
            await getDoc(officerRef);


        if (!officerSnap.exists()) {

            return false;

        }


        const data =
            officerSnap.data();


        return data.role === "officer";

    }

    catch (error) {

        console.error(error);

        return false;

    }

}


/* =========================
   LOGIN
========================= */

const loginForm =
    document.getElementById("loginForm");


loginForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        const email =
            document
                .getElementById("email")
                .value
                .trim();


        const password =
            document
                .getElementById("password")
                .value;


        const message =
            document
                .getElementById("loginMessage");


        message.innerHTML = "";


        try {

            const credential =
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


            const officer =
                await checkOfficer(
                    credential.user.uid
                );


            if (!officer) {

                await signOut(auth);


                message.innerHTML = `

                    <div class="error">

                        این حساب دسترسی Officer ندارد.

                    </div>

                `;

                return;

            }


            currentOfficer = true;


            document
                .getElementById("officerEmail")
                .textContent =
                credential.user.email;


            showPage("officerDashboard");

        }

        catch (error) {

            console.error(error);


            message.innerHTML = `

                <div class="error">

                    Email یا Password اشتباه است.

                </div>

            `;

        }

    }
);


/* =========================
   OFFICER TEST ACCESS
========================= */

window.openOfficerTest = async function() {

    const user = auth.currentUser;


    if (!user) {

        showPage("login");

        document
            .getElementById("loginMessage")
            .innerHTML = `

                <div class="error">

                    برای ورود به Officer Test
                    ابتدا باید Login کنید.

                </div>

            `;

        return;

    }


    const officer =
        await checkOfficer(user.uid);


    if (!officer) {

        showPage("login");

        return;

    }


    showPage("officerTest");

};


/* =========================
   OFFICER EXAM
========================= */

window.submitOfficerExam = function() {

    const answers = {

        q1: "B",
        q2: "C",
        q3: "B",
        q4: "B",
        q5: "A",
        q6: "A",
        q7: "A",
        q8: "B",
        q9: "A",
        q10: "B"

    };


    let score = 0;

    const total =
        Object.keys(answers).length;


    for (const question in answers) {

        const selected =
            document.querySelector(
                `input[name="${question}"]:checked`
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


    const result =
        document.getElementById("examResult");


    if (percentage >= 80) {

        result.innerHTML = `

            <div class="success">

                PASS ✅

                <br>

                Score: ${percentage}%

            </div>

        `;

    }

    else {

        result.innerHTML = `

            <div class="error">

                FAIL ❌

                <br>

                Score: ${percentage}%

            </div>

        `;

    }

};


/* =========================
   LOGOUT
========================= */

window.logoutOfficer = async function() {

    await signOut(auth);

    currentOfficer = false;

    showPage("home");

};


/* =========================
   AUTH STATE
========================= */

onAuthStateChanged(
    auth,
    async user => {

        if (!user) {

            currentOfficer = false;

            return;

        }


        const officer =
            await checkOfficer(user.uid);


        if (!officer) {

            await signOut(auth);

            return;

        }


        currentOfficer = true;


        const officerEmail =
            document.getElementById(
                "officerEmail"
            );


        if (officerEmail) {

            officerEmail.textContent =
                user.email;

        }

    }
);


/* =========================
   START
========================= */

showPage("home");
