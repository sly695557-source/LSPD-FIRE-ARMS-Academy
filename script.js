```javascript
/* =========================================================
   LSPD FIREARMS DIVISION
   Website Script
   Officer: Henry Fernandez
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       NAVIGATION
    ========================= */

    const sections = document.querySelectorAll(".page-section");
    const navButtons = document.querySelectorAll("[data-section]");

    function showSection(sectionId) {

        sections.forEach(section => {
            section.classList.remove("active");
        });

        const target = document.getElementById(sectionId);

        if (target) {
            target.classList.add("active");
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }

    navButtons.forEach(button => {
        button.addEventListener("click", () => {
            const section = button.dataset.section;

            if (section) {
                showSection(section);
            }
        });
    });


    /* =========================
       HOME CARD BUTTONS
       ========================= */

    document.querySelectorAll("[data-go]").forEach(button => {

        button.addEventListener("click", () => {

            const target = button.dataset.go;

            if (target) {
                showSection(target);
            }

        });

    });


    /* =========================
       OFFICER CERTIFICATION EXAM
       ========================= */

    const officerExam = document.getElementById("officerExam");

    if (officerExam) {

        officerExam.addEventListener("submit", function (event) {

            event.preventDefault();

            const formData = new FormData(officerExam);

            let theoryScore = 0;
            let totalTheory = 14;

            /*
                Correct answers:
                1 B
                2 C
                3 B
                4 C
                5 B
                6 B
                7 B
                8 C
                9 B
                10 B
                11 C
                12 C
                13 B
                14 C
            */

            const correctAnswers = {
                q1: "B",
                q2: "C",
                q3: "B",
                q4: "C",
                q5: "B",
                q6: "B",
                q7: "B",
                q8: "C",
                q9: "B",
                q10: "B",
                q11: "C",
                q12: "C",
                q13: "B",
                q14: "C"
            };


            Object.keys(correctAnswers).forEach(question => {

                const answer = formData.get(question);

                if (answer === correctAnswers[question]) {
                    theoryScore++;
                }

            });


            /* =========================
               SCENARIO QUESTIONS
               ========================= */

            const scenarioQuestions = [
                "scenario1",
                "scenario2",
                "scenario3",
                "scenario4"
            ];

            let scenarioScore = 0;

            scenarioQuestions.forEach(question => {

                const answer = formData.get(question);

                if (answer && answer.trim().length >= 20) {
                    scenarioScore++;
                }

            });


            const finalScore =
                theoryScore + scenarioScore;

            const totalScore =
                totalTheory + scenarioQuestions.length;

            const percentage =
                Math.round((finalScore / totalScore) * 100);


            /* =========================
               RESULT
               ========================= */

            let result = "";

            if (percentage >= 80) {

                result = "PASS";

            } else if (percentage >= 65) {

                result = "RETRAINING REQUIRED";

            } else {

                result = "FAIL";

            }


            const resultBox =
                document.getElementById("officerResult");

            if (resultBox) {

                resultBox.classList.add("show");

                resultBox.innerHTML = `
                    <div>
                        <strong>LSPD FIREARMS DIVISION</strong>
                    </div>

                    <br>

                    <div>
                        Theory Score:
                        <strong>${theoryScore} / 14</strong>
                    </div>

                    <div>
                        Scenario Score:
                        <strong>${scenarioScore} / 4</strong>
                    </div>

                    <div>
                        Final Score:
                        <strong>${finalScore} / ${totalScore}</strong>
                    </div>

                    <div>
                        Percentage:
                        <strong>${percentage}%</strong>
                    </div>

                    <br>

                    <div>
                        RESULT:
                        <strong>${result}</strong>
                    </div>
                `;

                resultBox.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }

        });

    }


    /* =========================
       CIVILIAN FIREARMS PERMIT
       ========================= */

    const civilianForm =
        document.getElementById("civilianPermitForm");

    if (civilianForm) {

        civilianForm.addEventListener("submit", function (event) {

            event.preventDefault();


            const answers =
                civilianForm.querySelectorAll("textarea");

            let answered = 0;

            answers.forEach(answer => {

                if (answer.value.trim().length >= 15) {
                    answered++;
                }

            });


            const total =
                answers.length;


            let result = "";


            /*
                This interview is not automatically
                approved based only on text length.

                The Examiner makes the final decision.
            */

            if (answered === total && total > 0) {

                result =
                    "INTERVIEW COMPLETED — EXAMINER REVIEW REQUIRED";

            } else {

                result =
                    "PLEASE COMPLETE ALL QUESTIONS";

            }


            const resultBox =
                document.getElementById("civilianResult");


            if (resultBox) {

                resultBox.classList.add("show");

                resultBox.innerHTML = `
                    <strong>LSPD CIVILIAN FIREARMS PERMIT</strong>
                    <br><br>
                    Answered:
                    ${answered} / ${total}
                    <br><br>
                    <strong>${result}</strong>
                `;

                resultBox.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }

        });

    }


    /* =========================
       RESET BUTTONS
       ========================= */

    document.querySelectorAll(".reset-form").forEach(button => {

        button.addEventListener("click", () => {

            const form =
                button.closest("form");

            if (form) {

                form.reset();

                const result =
                    form.querySelector(".result-box");

                if (result) {
                    result.classList.remove("show");
                    result.innerHTML = "";
                }

            }

        });

    });


    /* =========================
       CURRENT YEAR
       ========================= */

    document.querySelectorAll(".current-year").forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =========================
       DEFAULT PAGE
       ========================= */

    const firstSection =
        document.querySelector(".page-section");

    if (firstSection) {
        firstSection.classList.add("active");
    }

});
```
