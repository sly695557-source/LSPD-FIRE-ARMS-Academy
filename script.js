```javascript
// ============================================================
// LSPD ACADEMY — FIREBASE LOGIN
// ============================================================

// Firebase
import { initializeApp } from
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ============================================================
// FIREBASE CONFIG
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyBF6MC3yN-vaTyVDrB2ACe69NLKVEe67KU",
  authDomain: "lspd-firearms-academy.firebaseapp.com",
  projectId: "lspd-firearms-academy",
  storageBucket: "lspd-firearms-academy.firebasestorage.app",
  messagingSenderId: "699387767180",
  appId: "1:699387767180:web:53e815b3ae2f818fcecea9",
  measurementId: "G-JGQTYH8WX1"
};


// ============================================================
// INITIALIZE FIREBASE
// ============================================================

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// ============================================================
// PAGE NAVIGATION
// ============================================================

window.showPage = function (pageId) {

  document
    .querySelectorAll(".page")
    .forEach(page => {
      page.classList.remove("active");
    });

  const page = document.getElementById(pageId);

  if (page) {
    page.classList.add("active");
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

};


// ============================================================
// OFFICER LOGIN
// ============================================================

const loginForm =
  document.getElementById("officerLoginForm");

const loginMessage =
  document.getElementById("loginMessage");


if (loginForm) {

  loginForm.addEventListener("submit", async (event) => {

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


    if (!email || !password) {

      if (loginMessage) {
        loginMessage.innerHTML =
          `<div class="danger">
            ایمیل و رمز عبور را وارد کنید.
          </div>`;
      }

      return;
    }


    if (loginMessage) {

      loginMessage.innerHTML =
        `<div class="notice">
          در حال بررسی اطلاعات ورود...
        </div>`;

    }


    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    }

    catch (error) {

      console.error(
        "Firebase Login Error:",
        error
      );


      let message =
        "ورود انجام نشد. اطلاعات ورود را بررسی کنید.";


      switch (error.code) {

        case "auth/invalid-credential":
          message =
            "ایمیل یا رمز عبور اشتباه است.";
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
            "تعداد تلاش‌ها زیاد است. کمی بعد دوباره امتحان کنید.";
          break;

        case "auth/network-request-failed":
          message =
            "اتصال اینترنت یا ارتباط با Firebase مشکل دارد.";
          break;

      }


      if (loginMessage) {

        loginMessage.innerHTML =
          `<div class="danger">
            ${message}
          </div>`;

      }

    }

  });

}


// ============================================================
// AUTH STATE
// ============================================================

onAuthStateChanged(auth, (user) => {

  const loginPanel =
    document.getElementById("loginPanel");

  const officerPanel =
    document.getElementById("officerPanel");

  const loggedOfficerEmail =
    document.getElementById("loggedOfficerEmail");


  if (user) {

    console.log(
      "Officer logged in:",
      user.email
    );


    // Hide Login
    if (loginPanel) {
      loginPanel.classList.add("hidden");
    }


    // Show Officer Panel
    if (officerPanel) {
      officerPanel.classList.remove("hidden");
    }


    // Show email
    if (loggedOfficerEmail) {
      loggedOfficerEmail.textContent =
        user.email || "Officer";
    }


    // Clear login message
    if (loginMessage) {
      loginMessage.innerHTML = "";
    }

  }

  else {

    console.log(
      "No Officer logged in."
    );


    // Show Login
    if (loginPanel) {
      loginPanel.classList.remove("hidden");
    }


    // Hide Officer Panel
    if (officerPanel) {
      officerPanel.classList.add("hidden");
    }


    if (loggedOfficerEmail) {
      loggedOfficerEmail.textContent = "";
    }

  }

});


// ============================================================
// LOGOUT
// ============================================================

const logoutButton =
  document.getElementById("logoutButton");


if (logoutButton) {

  logoutButton.addEventListener(
    "click",
    async () => {

      try {

        await signOut(auth);

        window.showPage("home");

      }

      catch (error) {

        console.error(
          "Logout Error:",
          error
        );

      }

    }
  );

}


// ============================================================
// CIVILIAN QUESTIONS
// ============================================================

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


const civilianContainer =
  document.getElementById(
    "civilianQuestions"
  );


if (civilianContainer) {

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
          placeholder="پاسخ متقاضی..."
        ></textarea>
      `;

      civilianContainer.appendChild(box);

    }
  );

}


// ============================================================
// CIVILIAN SUBMIT
// ============================================================

window.submitCivilian = function () {

  const result =
    document.getElementById(
      "civilianResult"
    );


  if (!result) return;


  result.innerHTML = `
    <div class="notice">
      مصاحبه ثبت شد.
      <br><br>
      نتیجه توسط Examiner بررسی خواهد شد.
    </div>
  `;

};


// ============================================================
// OFFICER EXAM
// ============================================================

window.submitOfficerExam = function () {

  const answers = {

    q1: "B",
    q2: "C",
    q3: "B",
    q4: "C",
    q5: "B",
    q6: "B",
    q7: "B",
    q8: "B",
    q9: "B",
    q10: "B",
    q11: "B",
    q12: "B",
    q13: "B"

  };


  let score = 0;

  const total =
    Object.keys(answers).length;


  for (
    const question in answers
  ) {

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
    document.getElementById(
      "examResult"
    );


  if (!result) return;


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
      <div class="danger">
        FAIL ❌
        <br>
        Score: ${percentage}%
      </div>
    `;

  }

};


// ============================================================
// INITIAL PAGE
// ============================================================

window.addEventListener(
  "DOMContentLoaded",
  () => {

    window.showPage("home");

  }
);
```
