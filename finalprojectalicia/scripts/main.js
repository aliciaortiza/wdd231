/**
 * Humo y Sabor - Premium Colombian Smokehouse
 * Main Shared Client Script (ES6 Module Orchestrator)
 * Author: Alicia Ortiz
 */

import { initMobileNavigation } from './modules/menu.js';
import { initCatalog } from './modules/catalog.js';
import { initModalControllers } from './modules/modal.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('--- Humo y Sabor: Dynamic ES Modules Active ---');

    // Dynamic Year in footer
    const updateFooterYear = () => {
        const yearContainer = document.getElementById('current-year');
        if (yearContainer) {
            yearContainer.textContent = new Date().getFullYear();
        }
    };

    // Form Validation Logic
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

            const isNameValid = validateField(nameInput, 'name-error', 'Full Name is required.');
            const isEmailValid = validateField(emailInput, 'email-error', 'Please enter a valid email.');
            const isPhoneValid = validateField(phoneInput, 'phone-error', 'Provide a valid 10-digit number.');
            const isMessageValid = validateField(messageInput, 'message-error', 'Write message details.');

            if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
                successAlert.textContent = `Thank you, ${nameInput.value}! Your inquiry has been sent. Our master smoker will contact you soon.`;
                successAlert.style.display = 'block';
                successAlert.focus();
                contactForm.reset();
            } else {
                errorAlert.textContent = 'Please correct the invalid field data before submitting.';
                errorAlert.style.display = 'block';
                errorAlert.focus();
            }
        });
    };

    // Reveal-on-scroll using IntersectionObserver
    const initRevealOnScroll = () => {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        if ('IntersectionObserver' in window) {
            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            animatedElements.forEach(el => revealObserver.observe(el));
        } else {
            animatedElements.forEach(el => el.classList.add('revealed'));
        }
    };

    // Orchestrate executions
    updateFooterYear();
    initMobileNavigation();
    initFormValidation();
    initRevealOnScroll();

    // Dynamic Catalog & Modals activation
    initCatalog();
    initModalControllers();
});