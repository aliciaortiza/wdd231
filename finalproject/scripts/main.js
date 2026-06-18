/**
 * Humo y Sabor - Premium Colombian Smokehouse
 * Author: Alicia Ortiz
 */

document.addEventListener('DOMContentLoaded', () => {
    // Execute performance welcome log
    console.log('--- Humo y Sabor: Premium Colombian Smokehouse Client Active ---');

    // 1. Dynamic Current Year Insertion
    const updateFooterYear = () => {
        const yearContainer = document.getElementById('current-year');
        if (yearContainer) {
            yearContainer.textContent = new Date().getFullYear();
        }
    };

    // 2. Mobile Responsive Navigation & Hamburger Toggle
    const initMobileNavigation = () => {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
                menuToggle.setAttribute('aria-expanded', !isExpanded);
                menuToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close navigation menu when users select single item anchor links
            const navLinks = document.querySelectorAll('.hs-nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    menuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                });
            });
        }
    };

    // 3. Active Navigation Item Highlighting
    const highlightActiveLink = () => {
        const navLinks = document.querySelectorAll('.hs-nav-link');
        const currentURL = window.location.pathname;

        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');

            // Strict layout matching
            if (currentURL.endsWith(linkHref) ||
                (currentURL === '/' && linkHref === 'index.html') ||
                (currentURL.slice(-1) === '/' && linkHref === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    // 4. Client-side Form Validation and Accessible Alert Handling
    const initFormValidation = () => {
        const contactForm = document.getElementById('smokehouse-contact-form');
        if (!contactForm) return;

        const nameInput = document.getElementById('user-name');
        const emailInput = document.getElementById('user-email');
        const phoneInput = document.getElementById('user-phone');
        const messageInput = document.getElementById('user-message');

        const successAlert = document.getElementById('form-success-alert');
        const errorAlert = document.getElementById('form-error-alert');

        const resetAlerts = () => {
            successAlert.style.display = 'none';
            successAlert.textContent = '';
            errorAlert.style.display = 'none';
            errorAlert.textContent = '';
        };

        const validateField = (input, errorId, validationMessage) => {
            const errorElement = document.getElementById(errorId);
            if (!input.validity.valid) {
                errorElement.textContent = validationMessage || input.validationMessage;
                errorElement.classList.add('active');
                input.setAttribute('aria-invalid', 'true');
                return false;
            } else {
                errorElement.textContent = '';
                errorElement.classList.remove('active');
                input.removeAttribute('aria-invalid');
                return true;
            }
        };

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            resetAlerts();

            // Check validation constraints
            const isNameValid = validateField(nameInput, 'name-error', 'Full Name is required (minimum 3 characters).');
            const isEmailValid = validateField(emailInput, 'email-error', 'Please enter a valid email address.');
            const isPhoneValid = validateField(phoneInput, 'phone-error', 'Please provide a valid 10-digit format (e.g. 555-123-4567).');
            const isMessageValid = validateField(messageInput, 'message-error', 'Please provide message details.');

            if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
                // Mock success database simulation payload
                const clientData = {
                    name: nameInput.value,
                    email: emailInput.value,
                    phone: phoneInput.value,
                    message: messageInput.value
                };

                // Render Success Response
                successAlert.textContent = `Thank you, ${clientData.name}! Your inquiry has been sent. Our master smoker will contact you soon.`;
                successAlert.style.display = 'block';
                successAlert.focus();

                // Reset form
                contactForm.reset();
            } else {
                // Render Error Banner Response
                errorAlert.textContent = 'Please correct the invalid field data highlighted below before submitting.';
                errorAlert.style.display = 'block';
                errorAlert.focus();
            }
        });

        // Clean inline styling states on interactive input change
        const clearErrorOnInput = (input, errorId) => {
            input.addEventListener('input', () => {
                if (input.validity.valid) {
                    const errorElement = document.getElementById(errorId);
                    errorElement.textContent = '';
                    errorElement.classList.remove('active');
                    input.removeAttribute('aria-invalid');
                }
            });
        };

        clearErrorOnInput(nameInput, 'name-error');
        clearErrorOnInput(emailInput, 'email-error');
        clearErrorOnInput(phoneInput, 'phone-error');
        clearErrorOnInput(messageInput, 'message-error');
    };

    // 5. Scroll Elevation - IntersectionObserver API
    const initRevealOnScroll = () => {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');

        if ('IntersectionObserver' in window) {
            const revealCallback = (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target); // Optimize resources after loading
                    }
                });
            };

            const revealObserver = new IntersectionObserver(revealCallback, {
                root: null, // Viewport scope
                threshold: 0.1, // Element visibility ratio triggers
                rootMargin: '0px 0px -40px 0px' // Offset triggers before rendering inside viewport bounds
            });

            animatedElements.forEach(element => {
                revealObserver.observe(element);
            });
        } else {
            // Fallback for older browsers
            animatedElements.forEach(element => {
                element.classList.add('revealed');
            });
        }
    };

    // 6. Progressive Image Lazy Load enhancements
    const optimizeLazyRendering = () => {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
        });
    };

    // Run initialization routines
    updateFooterYear();
    initMobileNavigation();
    highlightActiveLink();
    initFormValidation();
    initRevealOnScroll();
    optimizeLazyRendering();
});