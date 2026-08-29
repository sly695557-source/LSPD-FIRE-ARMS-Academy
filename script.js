alert("LSPD SCRIPT LOADED");

document.addEventListener("DOMContentLoaded", function () {

    alert("DOM READY");

    document.querySelectorAll("[data-page]").forEach(function (button) {

        button.addEventListener("click", function () {

            var page = button.getAttribute("data-page");

            document.querySelectorAll(".page-section").forEach(function (section) {
                section.classList.remove("active");
            });

            var target = document.getElementById(page);

            if (target) {
                target.classList.add("active");
            }

        });

    });

});
