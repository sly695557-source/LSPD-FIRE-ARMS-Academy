```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ================================
// LSPD FIREARMS — FIREBASE CONFIG
// ================================

const firebaseConfig = {
  apiKey: "AIzaSyBF6MC3yN-vaTyVDrB2ACe69NLKVEe67KU",
  authDomain: "lspd-firearms-academy.firebaseapp.com",
  projectId: "lspd-firearms-academy",
  storageBucket: "lspd-firearms-academy.firebasestorage.app",
  messagingSenderId: "699387767180",
  appId: "1:699387767180:web:53e815b3ae2f818fcecea9",
  measurementId: "G-JGQTYH8WX1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// ================================
// ELEMENTS
// ================================

const loginForm = document.getElementById("officerLoginForm");
const loginPanel = document.getElementById("loginPanel");
const officerPanel = document.getElementById("officerPanel");
const loginMessage = document.getElementById("loginMessage");


// ================================
// OFFICER LOGIN
// ================================

if (loginForm) {
  loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const emailInput = document.getElementById("officerEmail");
    const passwordInput = document.getElementById("officerPassword");

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
      loginMessage.textContent = "لطفاً Email و Password را وارد کنید.";
      return;
    }

    loginMessage.textContent = "در حال ورود...";

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      loginMessage.textContent = "";

    } catch (error) {

      console.error("Firebase Login Error:", error);

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {

        loginMessage.textContent =
          "❌ Email یا Password اشتباه است.";

      } else if (error.code === "auth/too-many-requests") {

        loginMessage.textContent =
          "⚠️ تعداد تلاش‌ها زیاد است. کمی بعد دوباره امتحان کنید.";

      } else {

        loginMessage.textContent =
          "❌ خطا در ورود. دوباره تلاش کنید.";

      }
    }
  });
}


// ================================
// LOGOUT
// ================================

const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {

  logoutButton.addEventListener("click", async function () {

    try {

      await signOut(auth);

    } catch (error) {

      console.error("Logout Error:", error);

    }

  });

}


// ================================
// AUTH STATE
// ================================

onAuthStateChanged(auth, function (user) {

  if (user) {

    // Officer logged in

    if (loginPanel) {
      loginPanel.classList.add("hidden");
    }

    if (officerPanel) {
      officerPanel.classList.remove("hidden");
    }

    const officerEmail =
      document.getElementById("loggedOfficerEmail");

    if (officerEmail) {

      officerEmail.textContent =
        user.email;

    }

  } else {

    // No officer logged in

    if (loginPanel) {
      loginPanel.classList.remove("hidden");
    }

    if (officerPanel) {
      officerPanel.classList.add("hidden");
    }

  }

});
```
