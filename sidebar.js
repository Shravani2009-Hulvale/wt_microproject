// sidebar.js
// Common SkillHub Sidebar

document.addEventListener("DOMContentLoaded", function () {

    const sidebarContainer = document.getElementById("sidebar");

    if (!sidebarContainer) {
        return;
    }

    sidebarContainer.innerHTML = `
        <div class="skillhub-sidebar">

            <div class="skillhub-logo">
                <div class="logo-box">S</div>
                <span>SkillHub</span>
            </div>

            <div class="sidebar-menu">

                <a href="index.html" class="sidebar-item" data-page="index.html">
                    <span class="sidebar-icon">🏠</span>
                    <span>Dashboard</span>
                </a>

                <a href="students.html" class="sidebar-item" data-page="students.html">
                    <span class="sidebar-icon">👨‍🎓</span>
                    <span>Students</span>
                </a>

                <a href="skills.html" class="sidebar-item" data-page="skills.html">
                    <span class="sidebar-icon">💡</span>
                    <span>Skills</span>
                </a>

                <a href="my-skills.html" class="sidebar-item" data-page="my-skills.html">
                    <span class="sidebar-icon">⭐</span>
                    <span>My Skills</span>
                </a>

                <a href="find-skills.html" class="sidebar-item" data-page="find-skills.html">
                    <span class="sidebar-icon">🔍</span>
                    <span>Find Skills</span>
                </a>

                <a href="requests.html" class="sidebar-item" data-page="requests.html">
                    <span class="sidebar-icon">📩</span>
                    <span>Requests</span>
                </a>

                <a href="profile.html" class="sidebar-item" data-page="profile.html">
                    <span class="sidebar-icon">👤</span>
                    <span>Profile</span>
                </a>

                <a href="reports.html" class="sidebar-item" data-page="reports.html">
                    <span class="sidebar-icon">📊</span>
                    <span>Reports</span>
                </a>

                <a href="xml-skills.html" class="sidebar-item" data-page="xml-skills.html">
                    <span class="sidebar-icon">📄</span>
                    <span>XML Skills</span>
                </a>

            </div>

        </div>
    `;

    const style = document.createElement("style");

    style.textContent = `
        .skillhub-sidebar {
            width: 250px;
            height: 100vh;
            background: #111827;
            color: white;
            position: fixed;
            left: 0;
            top: 0;
            z-index: 1000;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }

        .skillhub-logo {
            height: 80px;
            display: flex;
            align-items: center;
            padding: 0 24px;
            gap: 12px;
            box-sizing: border-box;
            font-size: 22px;
            font-weight: 700;
            border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .logo-box {
            width: 38px;
            height: 38px;
            border-radius: 10px;
            background: linear-gradient(135deg, #7c3aed, #a855f7);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            font-weight: 800;
            color: white;
            box-shadow: 0 5px 15px rgba(124,58,237,0.35);
        }

        .sidebar-menu {
            padding: 18px 12px;
        }

        .sidebar-item {
            display: flex;
            align-items: center;
            gap: 13px;
            width: 100%;
            height: 42px;
            padding: 0 15px;
            margin-bottom: 4px;
            box-sizing: border-box;
            border-radius: 9px;
            color: #d1d5db;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.2s ease;
        }

        .sidebar-icon {
            width: 24px;
            text-align: center;
            font-size: 17px;
        }

        .sidebar-item:hover {
            background: rgba(124,58,237,0.15);
            color: white;
        }

        .sidebar-item.active {
            background: linear-gradient(
                90deg,
                rgba(124,58,237,0.95),
                rgba(139,92,246,0.85)
            );
            color: white;
            box-shadow: 0 5px 15px rgba(124,58,237,0.20);
        }
    `;

    document.head.appendChild(style);


    // Highlight current page
    let currentPage = window.location.pathname.split("/").pop();

    if (currentPage === "") {
        currentPage = "index.html";
    }

    const menuItems = document.querySelectorAll(".sidebar-item");

    menuItems.forEach(function (item) {

        if (item.getAttribute("data-page") === currentPage) {
            item.classList.add("active");
        }

    });

});