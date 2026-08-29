```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>LSPD Firearms Academy</title>

    <link rel="stylesheet" href="style.css">
</head>

<body>

<header class="main-header">

    <div class="brand">

        <div class="badge-logo">
            LSPD
        </div>

        <div class="brand-text">
            <h1>LOS SANTOS POLICE DEPARTMENT</h1>
            <p>FIREARMS ACADEMY</p>
        </div>

    </div>

    <div class="officer-info">
        <span>HEAD OF FIREARMS</span>
        <strong>Henry Fernandez</strong>
    </div>

</header>


<nav class="navigation">

    <button type="button" data-page="home">
        🏠 خانه
    </button>

    <button type="button" data-page="civilian">
        🧑 Civilian Test
    </button>

    <button type="button" data-page="handbook">
        📖 Officer Handbook
    </button>

    <button type="button" data-page="login">
        🔐 Officer Login
    </button>

</nav>


<main>


<!-- =====================================================
     HOME
===================================================== -->

<section id="home" class="page-section active">

    <div class="hero">

        <div class="hero-badge">
            LSPD
        </div>

        <h2>
            FIREARMS ACADEMY
        </h2>

        <p>
            Professionalism • Safety • Accountability
        </p>

        <p class="sub-text">
            Los Santos Police Department
        </p>

    </div>


    <div class="cards">

        <div class="menu-card">

            <div class="card-icon">
                🧑
            </div>

            <h3>
                Civilian
            </h3>

            <p>
                آزمون و مصاحبه دریافت Civilian Firearms Permit
            </p>

            <button
                type="button"
                data-page="civilian">

                ورود به تست

            </button>

        </div>


        <div class="menu-card">

            <div class="card-icon">
                📖
            </div>

            <h3>
                Officer Handbook
            </h3>

            <p>
                قوانین، استانداردها، مسئولیت‌ها و سیاست‌های Firearms Division
            </p>

            <button
                type="button"
                data-page="handbook">

                مطالعه قوانین

            </button>

        </div>


        <div class="menu-card">

            <div class="card-icon">
                🔐
            </div>

            <h3>
                Officer Portal
            </h3>

            <p>
                بخش اختصاصی Officers و Certification Exam
            </p>

            <button
                type="button"
                data-page="login">

                ورود Officer

            </button>

        </div>

    </div>

</section>



<!-- =====================================================
     CIVILIAN TEST
===================================================== -->

<section id="civilian" class="page-section">

    <div class="section-title">

        <span>🧑</span>

        <div>

            <h2>
                CIVILIAN FIREARMS PERMIT
            </h2>

            <p>
                LSPD Civilian Permit Interview & Evaluation
            </p>

        </div>

    </div>


    <div class="evaluation-card">

        <h3>
            مشخصات متقاضی
        </h3>


        <label>

            نام متقاضی

            <input
                type="text"
                id="civilianName"
                placeholder="نام متقاضی">

        </label>


        <label>

            Examiner

            <input
                type="text"
                id="civilianExaminer"
                placeholder="نام Examiner">

        </label>


        <h3>
            سوالات مصاحبه
        </h3>


        <div id="civilianQuestions"></div>


        <button
            type="button"
            class="submit-exam"
            id="civilianSubmit">

            ثبت مصاحبه

        </button>


        <div
            id="civilianResult"
            class="result-box">
        </div>

    </div>

</section>



<!-- =====================================================
     OFFICER HANDBOOK
===================================================== -->

<section id="handbook" class="page-section">

    <div class="section-title">

        <span>📖</span>

        <div>

            <h2>
                FIREARMS DIVISION HANDBOOK
            </h2>

            <p>
                Official Department Rules & Standards
            </p>

        </div>

    </div>


    <div class="handbook-container">


        <!-- 01 -->

        <div class="handbook-card">

            <h3>
                01 — PURPOSE & MISSION
            </h3>

            <p>
                Firearms Division مسئول ایجاد، مدیریت و نظارت بر
                استانداردهای مربوط به آموزش، تجهیزات و استفاده
                مسئولانه از تجهیزات Firearms در Los Santos Police Department است.
            </p>

            <h4>
                اهداف اصلی
            </h4>

            <ul>

                <li>
                    ایجاد RP حرفه‌ای و واقع‌گرایانه
                </li>

                <li>
                    افزایش کیفیت آموزش Officers
                </li>

                <li>
                    جلوگیری از استفاده غیرضروری از تجهیزات
                </li>

                <li>
                    حفظ امنیت Civilians و Officers
                </li>

                <li>
                    جلوگیری از FailRP و Powergaming
                </li>

                <li>
                    کنترل Authorization
                </li>

                <li>
                    ثبت و مدیریت تجهیزات
                </li>

                <li>
                    ایجاد استاندارد واحد برای Officers
                </li>

            </ul>

            <div class="policy-box">

                Firearms برای افزایش کیفیت RP است،
                نه افزایش تعداد درگیری‌ها.

            </div>

        </div>



        <!-- 02 -->

        <div class="handbook-card">

            <h3>
                02 — CHAIN OF COMMAND
            </h3>


            <h4>
                Head of Firearms
            </h4>

            <ul>

                <li>
                    بالاترین مقام Firearms Division
                </li>

                <li>
                    تعیین سیاست‌های داخلی Division
                </li>

                <li>
                    تأیید آموزش‌ها و Certification
                </li>

                <li>
                    بررسی تخلفات مهم
                </li>

                <li>
                    مدیریت کلی Division
                </li>

            </ul>


            <h4>
                Assistant / Deputy Head
            </h4>

            <ul>

                <li>
                    کمک به Head of Firearms
                </li>

                <li>
                    نظارت بر Instructors
                </li>

                <li>
                    پیگیری عملکرد Officers
                </li>

            </ul>


            <h4>
                Firearms Instructor
            </h4>

            <ul>

                <li>
                    آموزش قوانین Firearms
                </li>

                <li>
                    برگزاری آزمون‌ها
                </li>

                <li>
                    ارزیابی Officers
                </li>

                <li>
                    آموزش استفاده مسئولانه از تجهیزات
                </li>

            </ul>


            <h4>
                Firearms Officer
            </h4>

            <ul>

                <li>
                    رعایت کامل Handbook
                </li>

                <li>
                    نگهداری مسئولانه تجهیزات
                </li>

                <li>
                    رعایت Authorization
                </li>

                <li>
                    گزارش حوادث
                </li>

                <li>
                    رعایت Chain of Command
                </li>

            </ul>

        </div>



        <!-- 03 -->

        <div class="handbook-card">

            <h3>
                03 — OFFICER RESPONSIBILITIES
            </h3>

            <ul>

                <li>
                    رعایت Server Rules
                </li>

                <li>
                    رعایت Department Rules
                </li>

                <li>
                    رعایت Firearms Division Rules
                </li>

                <li>
                    رعایت Chain of Command
                </li>

                <li>
                    نگهداری صحیح تجهیزات تحویل‌گرفته‌شده
                </li>

                <li>
                    استفاده فقط در محدوده Authorization
                </li>

                <li>
                    گزارش فوری تجهیزات گمشده یا آسیب‌دیده
                </li>

                <li>
                    گزارش Incidentهای مهم
                </li>

                <li>
                    حفظ رفتار حرفه‌ای در تمامی شرایط
                </li>

                <li>
                    همکاری با Supervisors و Instructors
                </li>

            </ul>

        </div>



        <!-- 04 -->

        <div class="handbook-card">

            <h3>
                04 — CODE OF CONDUCT
            </h3>

            <ul>

                <li>
                    Professional بودن
                </li>

                <li>
                    حفظ خونسردی
                </li>

                <li>
                    رفتار محترمانه با Civilians
                </li>

                <li>
                    جلوگیری از درگیری غیرضروری
                </li>

                <li>
                    اجرای دستورات قانونی Chain of Command
                </li>

                <li>
                    عدم سوءاستفاده از Rank
                </li>

                <li>
                    عدم سوءاستفاده از تجهیزات
                </li>

                <li>
                    عدم استفاده از اطلاعات OOC برای تصمیمات IC
                </li>

            </ul>


            <div class="warning-box">

                RDM، FailRP، Powergaming، Metagaming
                و Combat Logging ممنوع است.

            </div>

        </div>



        <!-- 05 -->

        <div class="handbook-card">

            <h3>
                05 — WEAPON AUTHORIZATION
            </h3>

            <p>
                دسترسی به تجهیزات باید مطابق Rank،
                Authorization و سیاست‌های Department باشد.
            </p>


            <div class="authorization">

                <div>
                    <strong>LEVEL 0</strong>
                    <span>بدون دسترسی</span>
                </div>

                <div>
                    <strong>LEVEL 1</strong>
                    <span>تجهیزات پایه</span>
                </div>

                <div>
                    <strong>LEVEL 2</strong>
                    <span>Patrol Authorization</span>
                </div>

                <div>
                    <strong>LEVEL 3</strong>
                    <span>Special Authorization</span>
                </div>

                <div>
                    <strong>LEVEL 4</strong>
                    <span>Restricted Equipment</span>
                </div>

            </div>


            <div class="policy-box">

                داشتن Rank به معنی داشتن دسترسی نامحدود
                به تمام تجهیزات نیست.

            </div>

        </div>



        <!-- 06 -->

        <div class="handbook-card">

            <h3>
                06 — ESCALATION POLICY
            </h3>

            <p>
                Officers باید در مدیریت موقعیت‌ها از کم‌تنش‌ترین
                روش منطقی شروع کرده و متناسب با شرایط تصمیم بگیرند.
            </p>


            <div class="flow">

                <span>
                    Communication
                </span>

                <b>→</b>

                <span>
                    De-escalation
                </span>

                <b>→</b>

                <span>
                    Control
                </span>

                <b>→</b>

                <span>
                    Appropriate Response
                </span>

            </div>


            <h4>
                اصول مهم
            </h4>

            <ul>

                <li>
                    حفظ آرامش
                </li>

                <li>
                    برقراری ارتباط
                </li>

                <li>
                    جلوگیری از تشدید غیرضروری
                </li>

                <li>
                    ارزیابی شرایط
                </li>

                <li>
                    انتخاب پاسخ متناسب با موقعیت
                </li>

            </ul>


            <div class="policy-box">

                Weapon ≠ First Option

            </div>

        </div>



        <!-- 07 -->

        <div class="handbook-card">

            <h3>
                07 — INCIDENT REPORT
            </h3>

            <p>
                گزارش Incident باید دقیق، واضح و بدون اطلاعات ساختگی باشد.
            </p>

            <h4>
                اطلاعات مورد نیاز
            </h4>

            <ul>

                <li>Incident ID</li>

                <li>Officer Name</li>

                <li>Rank</li>

                <li>Date / Time</li>

                <li>Location</li>

                <li>Incident Type</li>

                <li>Description</li>

                <li>Persons Involved</li>

                <li>Witnesses</li>

                <li>Evidence</li>

                <li>Actions Taken</li>

                <li>Outcome</li>

                <li>Supervisor Notification</li>

            </ul>

        </div>



        <!-- 08 -->

        <div class="handbook-card">

            <h3>
                08 — EQUIPMENT MANAGEMENT
            </h3>

            <ul>

                <li>
                    تجهیزات فقط برای استفاده مجاز هستند.
                </li>

                <li>
                    Officer مسئول تجهیزات تحویل‌گرفته‌شده است.
                </li>

                <li>
                    تجهیزات نباید بدون Authorization در اختیار فرد دیگری قرار بگیرد.
                </li>

                <li>
                    تجهیزات گمشده باید گزارش شوند.
                </li>

                <li>
                    تجهیزات آسیب‌دیده باید گزارش شوند.
                </li>

                <li>
                    استفاده خارج از Policy می‌تواند منجر به بررسی داخلی شود.
                </li>

            </ul>


            <div class="warning-box">

                Never transfer authorized equipment
                to an unauthorized person.

            </div>

        </div>



        <!-- 09 -->

        <div class="handbook-card">

            <h3>
                09 — TRAINING & CERTIFICATION
            </h3>

            <p>
                هیچ Officer نباید بدون آموزش و Certification لازم
                مسئولیت‌هایی را که نیازمند Authorization ویژه هستند بر عهده بگیرد.
            </p>

            <h4>
                مراحل کلی
            </h4>

            <div class="flow">

                <span>
                    Training
                </span>

                <b>→</b>

                <span>
                    Evaluation
                </span>

                <b>→</b>

                <span>
                    Certification
                </span>

                <b>→</b>

                <span>
                    Authorization
                </span>

            </div>

            <ul>

                <li>
                    شرکت در آموزش
                </li>

                <li>
                    مطالعه Handbook
                </li>

                <li>
                    قبولی در Certification Exam
                </li>

                <li>
                    دریافت Authorization مربوطه
                </li>

            </ul>

        </div>



        <!-- 10 -->

        <div class="handbook-card">

            <h3>
                10 — PROFESSIONAL RP
            </h3>

            <ul>

                <li>
                    تصمیمات باید با شرایط RP هماهنگ باشند.
                </li>

                <li>
                    Officer نباید از تجهیزات برای ایجاد درگیری غیرضروری استفاده کند.
                </li>

                <li>
                    استفاده از اطلاعات OOC برای تصمیمات IC ممنوع است.
                </li>

                <li>
                    Powergaming ممنوع است.
                </li>

                <li>
                    FailRP ممنوع است.
                </li>

                <li>
                    Metagaming ممنوع است.
                </li>

                <li>
                    رفتار Officer باید باعث حفظ کیفیت RP شود.
                </li>

            </ul>

        </div>



        <!-- 11 -->

        <div class="handbook-card">

            <h3>
                11 — POLICY VIOLATIONS
            </h3>

            <p>
                تخلف از قوانین می‌تواند بسته به شدت و شرایط،
                توسط Chain of Command بررسی شود.
            </p>

            <h4>
                نمونه تخلفات
            </h4>

            <ul>

                <li>
                    استفاده غیرمجاز از Equipment
                </li>

                <li>
                    انتقال Equipment به فرد غیرمجاز
                </li>

                <li>
                    عدم گزارش Incident
                </li>

                <li>
                    نقض Chain of Command
                </li>

                <li>
                    سوءاستفاده از Rank
                </li>

                <li>
                    نقض Server Rules
                </li>

                <li>
                    رفتار غیرحرفه‌ای
                </li>

            </ul>

        </div>



        <!-- 12 -->

        <div class="handbook-card">

            <h3>
                12 — OFFICER EXPECTATIONS
            </h3>

            <ul>

                <li>
                    Know the Rules
                </li>

                <li>
                    Follow Authorization
                </li>

                <li>
                    Maintain Professionalism
                </li>

                <li>
                    Respect Chain of Command
                </li>

                <li>
                    Protect RP Quality
                </li>

                <li>
                    Report Incidents
                </li>

                <li>
                    Accept Accountability
                </li>

                <li>
                    Continue Learning
                </li>

            </ul>

            <div class="policy-box">

                Professionalism • Safety • Accountability

            </div>

        </div>



        <!-- 13 -->

        <div class="handbook-card oath-card">

            <h3>
                13 — OFFICER OATH
            </h3>

            <p class="oath">

                من، <strong>Henry Fernandez</strong>،
                متعهد می‌شوم قوانین Server،
                Department و Firearms Division را
                رعایت کنم و مسئولیت رفتار،
                تصمیمات و تجهیزات خود را بپذیرم.

            </p>

            <div class="policy-box">

                I understand that authorization
                is a responsibility, not a privilege without limits.

            </div>

        </div>


    </div>

</section>



<!-- =====================================================
     LOGIN
===================================================== -->

<section id="login" class="page-section">

    <div class="login-card">

        <div class="login-logo">
            LSPD
        </div>

        <h2>
            OFFICER PORTAL
        </h2>

        <p>
            Authorized Personnel Only
        </p>


        <form id="loginForm">

            <label>

                Email

                <input
                    type="email"
                    id="officerEmail"
                    placeholder="Officer Email"
                    required>

            </label>


            <label>

                Password

                <input
                    type="password"
                    id="officerPassword"
                    placeholder="Password"
                    required>

            </label>


            <button type="submit">

                LOGIN

            </button>

        </form>


        <div
            id="loginResult"
            class="result-box">
        </div>

    </div>

</section>



<!-- =====================================================
     OFFICER PANEL
===================================================== -->

<section id="officerPanelPage" class="page-section">

    <div class="section-title">

        <span>🔐</span>

        <div>

            <h2>
                OFFICER PORTAL
            </h2>

            <p>
                Authorized Firearms Personnel
            </p>

        </div>

    </div>


    <div class="evaluation-card">

        <h3>
            Welcome, Officer
        </h3>

        <p>

            Logged in as:

            <strong id="loggedOfficerEmail"></strong>

        </p>


        <div class="cards">


            <div class="menu-card">

                <div class="card-icon">
                    📖
                </div>

                <h3>
                    Officer Handbook
                </h3>

                <p>
                    مطالعه کامل قوانین Firearms Division
                </p>

                <button
                    type="button"
                    data-page="handbook">

                    Handbook

                </button>

            </div>



            <div class="menu-card">

                <div class="card-icon">
                    📝
                </div>

                <h3>
                    Certification Exam
                </h3>

                <p>
                    آزمون Certification Officer
                </p>

                <button
                    type="button"
                    data-page="officerExam">

                    Start Exam

                </button>

            </div>


        </div>


        <button
            type="button"
            class="logout-button"
            id="logoutButton">

            LOGOUT

        </button>

    </div>

</section>



<!-- =====================================================
     OFFICER CERTIFICATION EXAM
===================================================== -->

<section id="officerExam" class="page-section">

    <div class="section-title">

        <span>📝</span>

        <div>

            <h2>
                FIREARMS CERTIFICATION EXAM
            </h2>

            <p>
                Passing Score: 80% — 20 Questions
            </p>

        </div>

    </div>


    <div class="evaluation-card">


        <label>

            Candidate Name

            <input
                type="text"
                id="candidateName"
                placeholder="Candidate Name">

        </label>


        <label>

            Rank

            <input
                type="text"
                id="candidateRank"
                placeholder="Rank">

        </label>



        <!-- Q1 -->

        <div class="question">

            <p>
                1. هدف اصلی Firearms Division چیست؟
            </p>

            <label>
                <input type="radio" name="q1" value="A">
                افزایش تعداد درگیری‌ها
            </label>

            <label>
                <input type="radio" name="q1" value="B">
                افزایش کیفیت RP و استانداردسازی تجهیزات
            </label>

            <label>
                <input type="radio" name="q1" value="C">
                دادن تجهیزات بیشتر به همه Officers
            </label>

            <label>
                <input type="radio" name="q1" value="D">
                حذف Chain of Command
            </label>

        </div>



        <!-- Q2 -->

        <div class="question">

            <p>
                2. بالاترین مقام Firearms Division چیست؟
            </p>

            <label>
                <input type="radio" name="q2" value="A">
                Trainee
            </label>

            <label>
                <input type="radio" name="q2" value="B">
                Firearms Officer
            </label>

            <label>
                <input type="radio" name="q2" value="C">
                Head of Firearms
            </label>

            <label>
                <input type="radio" name="q2" value="D">
                Recruit
            </label>

        </div>



        <!-- Q3 -->

        <div class="question">

            <p>
                3. استفاده از Restricted Equipment بدون Authorization:
            </p>

            <label>
                <input type="radio" name="q3" value="A">
                مجاز است
            </label>

            <label>
                <input type="radio" name="q3" value="B">
                ممنوع است
            </label>

            <label>
                <input type="radio" name="q3" value="C">
                همیشه آزاد است
            </label>

            <label>
                <input type="radio" name="q3" value="D">
                فقط در صورت تمایل Officer مجاز است
            </label>

        </div>



        <!-- Q4 -->

        <div class="question">

            <p>
                4. در صورت گم‌شدن تجهیزات چه باید کرد؟
            </p>

            <label>
                <input type="radio" name="q4" value="A">
                مخفی کردن موضوع
            </label>

            <label>
                <input type="radio" name="q4" value="B">
                گزارش فوری
            </label>

            <label>
                <input type="radio" name="q4" value="C">
                تحویل ندادن گزارش
            </label>

            <label>
                <input type="radio" name="q4" value="D">
                دادن تجهیزات به فرد دیگر
            </label>

        </div>



        <!-- Q5 -->

        <div class="question">

            <p>
                5. Metagaming چیست؟
            </p>

            <label>
                <input type="radio" name="q5" value="A">
                استفاده از اطلاعات OOC برای تصمیم‌گیری IC
            </label>

            <label>
                <input type="radio" name="q5" value="B">
                استفاده از اطلاعات داخل RP
            </label>

            <label>
                <input type="radio" name="q5" value="C">
                رعایت Chain of Command
            </label>

            <label>
                <input type="radio" name="q5" value="D">
                گزارش Incident
            </label>

        </div>



        <!-- Q6 -->

        <div class="question">

            <p>
                6. Weapon Is Not The First Option یعنی چه؟
            </p>

            <label>
                <input type="radio" name="q6" value="A">
                استفاده از تجهیزات باید متناسب با موقعیت باشد
            </label>

            <label>
                <input type="radio" name="q6" value="B">
                Officer نباید تجهیزات داشته باشد
            </label>

            <label>
                <input type="radio" name="q6" value="C">
                Officer همیشه باید از تجهیزات استفاده کند
            </label>

            <label>
                <input type="radio" name="q6" value="D">
                هیچ قانونی برای استفاده وجود ندارد
            </label>

        </div>



        <!-- Q7 -->

        <div class="question">

            <p>
                7. ترتیب صحیح مدیریت موقعیت چیست؟
            </p>

            <label>
                <input type="radio" name="q7" value="A">
                Communication → De-escalation → Control → Appropriate Response
            </label>

            <label>
                <input type="radio" name="q7" value="B">
                Response → Communication
            </label>

            <label>
                <input type="radio" name="q7" value="C">
                Weapon → Response → Communication
            </label>

            <label>
                <input type="radio" name="q7" value="D">
                Control → Weapon → Communication
            </label>

        </div>



        <!-- Q8 -->

        <div class="question">

            <p>
                8. Officer مسئول تجهیزات تحویل‌گرفته‌شده است؟
            </p>

            <label>
                <input type="radio" name="q8" value="A">
                بله
            </label>

            <label>
                <input type="radio" name="q8" value="B">
                خیر
            </label>

            <label>
                <input type="radio" name="q8" value="C">
                فقط Head مسئول است
            </label>

            <label>
                <input type="radio" name="q8" value="D">
                هیچ‌کس مسئول نیست
            </label>

        </div>



        <!-- Q9 -->

        <div class="question">

            <p>
                9. Chain of Command برای چیست؟
            </p>

            <label>
                <input type="radio" name="q9" value="A">
                ایجاد ساختار فرماندهی و مسئولیت
            </label>

            <label>
                <input type="radio" name="q9" value="B">
                حذف Supervisors
            </label>

            <label>
                <input type="radio" name="q9" value="C">
                افزایش درگیری
            </label>

            <label>
                <input type="radio" name="q9" value="D">
                دادن دسترسی نامحدود
            </label>

        </div>



        <!-- Q10 -->

        <div class="question">

            <p>
                10. Powergaming چیست؟
            </p>

            <label>
                <input type="radio" name="q10" value="A">
                مجبور کردن RP یا انجام اقدامات غیرمنطقی خارج از محدودیت RP
            </label>

            <label>
                <input type="radio" name="q10" value="B">
                رعایت قوانین
            </label>

            <label>
                <input type="radio" name="q10" value="C">
                گزارش حادثه
            </label>

            <label>
                <input type="radio" name="q10" value="D">
                آموزش Officer
            </label>

        </div>



        <!-- Q11 -->

        <div class="question">

            <p>
                11. در صورت مشاهده تخلف مهم بهترین اقدام چیست؟
            </p>

            <label>
                <input type="radio" name="q11" value="A">
                نادیده گرفتن آن
            </label>

            <label>
                <input type="radio" name="q11" value="B">
                گزارش از مسیر مناسب Chain of Command
            </label>

            <label>
                <input type="radio" name="q11" value="C">
                انتشار عمومی
            </label>

            <label>
                <input type="radio" name="q11" value="D">
                مخفی کردن موضوع
            </label>

        </div>



        <!-- Q12 -->

        <div class="question">

            <p>
                12. تجهیزات Restricted چه زمانی قابل استفاده هستند؟
            </p>

            <label>
                <input type="radio" name="q12" value="A">
                هر زمان که Officer بخواهد
            </label>

            <label>
                <input type="radio" name="q12" value="B">
                زمانی که Authorization لازم وجود داشته باشد
            </label>

            <label>
                <input type="radio" name="q12" value="C">
                همیشه
            </label>

            <label>
                <input type="radio" name="q12" value="D">
                فقط خارج از RP
            </label>

        </div>



        <!-- Q13 -->

        <div class="question">

            <p>
                13. کدام مورد جزء Professional Conduct است؟
            </p>

            <label>
                <input type="radio" name="q13" value="A">
                رفتار محترمانه و حرفه‌ای
            </label>

            <label>
                <input type="radio" name="q13" value="B">
                سوءاستفاده از Rank
            </label>

            <label>
                <input type="radio" name="q13" value="C">
                ایجاد درگیری غیرضروری
            </label>

            <label>
                <input type="radio" name="q13" value="D">
                نادیده گرفتن قوانین
            </label>

        </div>



        <!-- Q14 -->

        <div class="question">

            <p>
                14. Incident Report باید چگونه باشد؟
            </p>

            <label>
                <input type="radio" name="q14" value="A">
                دقیق و واقعی
            </label>

            <label>
                <input type="radio" name="q14" value="B">
                ساختگی
            </label>

            <label>
                <input type="radio" name="q14" value="C">
                بدون اطلاعات
            </label>

            <label>
                <input type="radio" name="q14" value="D">
                فقط شامل نام Officer
            </label>

        </div>



        <!-- Q15 -->

        <div class="question">

            <p>
                15. آیا Rank به معنی دسترسی نامحدود به تجهیزات است؟
            </p>

            <label>
                <input type="radio" name="q15" value="A">
                بله
            </label>

            <label>
                <input type="radio" name="q15" value="B">
                خیر، Authorization نیز لازم است
            </label>

            <label>
                <input type="radio" name="q15" value="C">
                فقط برای Trainee
            </label>

            <label>
                <input type="radio" name="q15" value="D">
                همیشه
            </label>

        </div>



        <!-- Q16 -->

        <div class="question">

            <p>
                16. FailRP به چه معناست؟
            </p>

            <label>
                <input type="radio" name="q16" value="A">
                رفتار خارج از منطق و استاندارد RP
            </label>

            <label>
                <input type="radio" name="q16" value="B">
                رعایت قوانین
            </label>

            <label>
                <input type="radio" name="q16" value="C">
                آموزش
            </label>

            <label>
                <input type="radio" name="q16" value="D">
                گزارش Incident
            </label>

        </div>



        <!-- Q17 -->

        <div class="question">

            <p>
                17. اولین مرحله در مدیریت یک موقعیت تنش‌زا چیست؟
            </p>

            <label>
                <input type="radio" name="q17" value="A">
                Communication
            </label>

            <label>
                <input type="radio" name="q17" value="B">
                Immediate escalation
            </label>

            <label>
                <input type="radio" name="q17" value="C">
                Ignore
            </label>

            <label>
                <input type="radio" name="q17" value="D">
                استفاده فوری از تجهیزات
            </label>

        </div>



        <!-- Q18 -->

        <div class="question">

            <p>
                18. انتقال Equipment به فرد بدون Authorization:
            </p>

            <label>
                <input type="radio" name="q18" value="A">
                مجاز است
            </label>

            <label>
                <input type="radio" name="q18" value="B">
                ممنوع است
            </label>

            <label>
                <input type="radio" name="q18" value="C">
                همیشه مجاز است
            </label>

            <label>
                <input type="radio" name="q18" value="D">
                نیازی به گزارش ندارد
            </label>

        </div>



        <!-- Q19 -->

        <div class="question">

            <p>
                19. هدف Certification چیست؟
            </p>

            <label>
                <input type="radio" name="q19" value="A">
                اطمینان از آشنایی Officer با قوانین و استانداردها
            </label>

            <label>
                <input type="radio" name="q19" value="B">
                افزایش Rank فوری
            </label>

            <label>
                <input type="radio" name="q19" value="C">
                حذف Training
            </label>

            <label>
                <input type="radio" name="q19" value="D">
                دادن تجهیزات بدون محدودیت
            </label>

        </div>



        <!-- Q20 -->

        <div class="question">

            <p>
                20. مهم‌ترین اصل Firearms Division کدام است؟
            </p>

            <label>
                <input type="radio" name="q20" value="A">
                Professionalism • Safety • Accountability
            </label>

            <label>
                <input type="radio" name="q20" value="B">
                Maximum Conflict
            </label>

            <label>
                <input type="radio" name="q20" value="C">
                No Rules
            </label>

            <label>
                <input type="radio" name="q20" value="D">
                Unlimited Authorization
            </label>

        </div>



        <button
            type="button"
            class="submit-exam"
            id="officerExamSubmit">

            SUBMIT EXAM

        </button>


        <div
            id="examResult"
            class="result-box">
        </div>

    </div>

</section>


</main>



<footer>

    <strong>
        LSPD FIREARMS ACADEMY
    </strong>

    <br>

    Professionalism • Safety • Accountability

    <br>

    Head of Firearms:

    <strong>
        Henry Fernandez
    </strong>

</footer>



<script
    type="module"
    src="script.js">
</script>

</body>

</html>
```
