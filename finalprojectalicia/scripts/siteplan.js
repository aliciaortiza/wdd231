/* scripts/siteplan.js */


document.addEventListener('DOMContentLoaded', () => {
    // --- MOBILE NAVIGATION CONTROLLER ---
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');

    const toggleMenu = () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navToggle.classList.toggle('active');
        mainNav.classList.toggle('open');

        // Toggle body scroll locking when mobile menu is active
        if (!isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    navToggle.addEventListener('click', toggleMenu);

    // Close navigation menu after selecting a specific section link on mobile viewports
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // --- COPIABLE BRAND COLORS FEATURE ---
    const swatches = document.querySelectorAll('.swatch');

    swatches.forEach(swatch => {
        swatch.addEventListener('click', async () => {
            const hexText = swatch.querySelector('.hex-label').textContent;
            try {
                await navigator.clipboard.writeText(hexText);

                // Show interactive copy notification toast
                const notification = document.createElement('div');
                notification.className = 'copy-toast';
                notification.textContent = `Copied ${hexText}!`;
                notification.style.position = 'fixed';
                notification.style.bottom = '20px';
                notification.style.right = '20px';
                notification.style.background = '#D4A017';
                notification.style.color = '#121212';
                notification.style.padding = '10px 20px';
                notification.style.borderRadius = '4px';
                notification.style.fontFamily = 'Inter, sans-serif';
                notification.style.fontSize = '0.9rem';
                notification.style.fontWeight = 'bold';
                notification.style.zIndex = '2000';
                notification.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';

                document.body.appendChild(notification);

                setTimeout(() => {
                    notification.style.opacity = '0';
                    notification.style.transition = 'opacity 0.5s ease';
                    setTimeout(() => notification.remove(), 500);
                }, 2000);
            } catch (err) {
                console.warn('Unable to execute clipboard copy execution. ', err);
            }
        });
    });

    // --- FOOTER DYNAMIC METADATA CONTROLLER ---
    const currentYearSpan = document.getElementById('current-year');
    const lastModifiedSpan = document.getElementById('last-modified');

    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }
});