```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

const loginForm = document.getElementById("officerLoginForm");
const emailInput = document.getElementById("officerEmail");
const passwordInput = document.getElementById("officerPassword");
const loginMessage = document.getElementById("loginMessage");

const officerPanel = document.getElementById("officerPanel");
const loginPanel = document.getElementById("loginPanel");

loginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  loginMessage.textContent = "در حال ورود...";

  try {
    await signInWithEmailAndPassword(auth, email, password);
    loginMessage.textContent = "ورود موفق بود.";
  } catch (error) {
    console.error(error);

    switch (error.code) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        loginMessage.textContent = "ایمیل یا رمز عبور اشتباه است.";
        break;

      case "auth/too-many-requests":
        loginMessage.textContent = "تعداد تلاش‌ها زیاد است. کمی بعد دوباره امتحان کنید.";
        break;

      default:
        loginMessage.textContent = "خطا در ورود. دوباره تلاش کنید.";
    }
  }
});

document.getElementById("logoutButton")?.addEventListener("click", async () => {
  await signOut(auth);
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    loginPanel?.classList.add("hidden");
    officerPanel?.classList.remove("hidden");

    const officerEmail = document.getElementById("loggedOfficerEmail");
    if (officerEmail) {
      officerEmail.textContent = user.email;
    }
  } else {
    loginPanel?.classList.remove("hidden");
    officerPanel?.classList.add("hidden");
  }
});
```
