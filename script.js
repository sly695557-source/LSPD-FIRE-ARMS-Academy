function showPage(pageId) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.remove("active");
    });

    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.add("active");
        window.scrollTo(0, 0);
    }
}


function submitTest() {

    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');

    if (!q1 || !q2) {

        document.getElementById("testResult").innerHTML =
            "<div>لطفاً به تمام سؤالات پاسخ دهید.</div>";

        return;
    }

    let score = 0;

    if (q1.value === "b") {
        score++;
    }

    if (q2.value === "a") {
        score++;
    }

    const percent = (score / 2) * 100;

    document.getElementById("testResult").innerHTML =
        `<div class="success">
            آزمون ثبت شد<br>
            امتیاز: ${percent}%
        </div>`;
}


function loginUser(event) {

    event.preventDefault();

    const email = document.getElementById("email").value;

    document.getElementById("loginResult").innerHTML =
        `<div class="success">
            درخواست ورود برای ${email} ثبت شد.
        </div>`;
}


document.addEventListener("DOMContentLoaded", function() {

    showPage("home");

});
