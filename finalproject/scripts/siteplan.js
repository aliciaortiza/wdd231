/**
 * Humo y Sabor - Site Plan Interactive Script
 * Course Project Blueprint
 */

document.addEventListener("DOMContentLoaded", () => {
    // Inject current copyright year dynamically
    initCopyrightYear();

    // Initialize mobile responsive menu logic
    initMobileNavigation();

    // Log project definition values to terminal
    logProjectMetadata();
});

/**
 * Automatically captures current year and appends to footer layout
 */
function initCopyrightYear() {
    const yearElement = document.getElementById("current-year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Handles toggling mobile menu views when user interacts with burger trigger
 */
function initMobileNavigation() {
    const toggleBtn = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener("click", () => {
            // Toggle CSS visibility rules
            const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
            toggleBtn.setAttribute("aria-expanded", !isExpanded);
            toggleBtn.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Close mobile menu if standard anchor link elements are clicked
        const links = navMenu.querySelectorAll("a");
        links.forEach(link => {
            link.addEventListener("click", () => {
                toggleBtn.classList.remove("active");
                navMenu.classList.remove("active");
                toggleBtn.setAttribute("aria-expanded", "false");
            });
        });
    }
}

/**
 * Prints high-level development tracking data regarding project requirements
 */
function logProjectMetadata() {
    const projectProfile = {
        siteName: "Humo y Sabor",
        academicScope: "WDD 131/231 Web Frontend Development",
        designMethodology: "Mobile-First, Responsive Grid Architecture",
        brandColors: {
            primaryBlack: "#121212",
            smokedBrown: "#5C2E1F",
            premiumGold: "#D4A017",
            warmCream: "#F9EAC8",
            lightCream: "#FDF8ED",
            colombianAccentRed: "#CA0F25",
            colombianAccentBlue: "#003893",
            colombianAccentYellow: "#FCD116"
        },
        primaryTypography: {
            headings: "Cormorant Garamond (Serif)",
            body: "Inter (Sans-Serif)"
        }
    };

    console.log("=== SITE PLAN METADATA INITIALIZED ===");
    console.log(`Project: ${projectProfile.siteName}`);
    console.log(`Academic Target: ${projectProfile.academicScope}`);
    console.log("Typography Matrix Assigned:", projectProfile.primaryTypography);
    console.log("Color Mapping Palette Configured:", projectProfile.brandColors);
    console.log("Status: Blueprint Wireframes Active. Vanilla Architecture Loaded.");
    console.log("=======================================");
}