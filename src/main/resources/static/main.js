document.addEventListener('DOMContentLoaded', () => {
    // Logo Tooltip
    const logoButton = document.getElementById('logo-button');
    const logoTooltip = document.getElementById('logo-tooltip');
    logoButton.addEventListener('mouseenter', () => logoTooltip.classList.add('opacity-100'));
    logoButton.addEventListener('mouseleave', () => logoTooltip.classList.remove('opacity-100'));

    // Logo Dropdown
    const logoDropdown = document.getElementById('logo-dropdown');
    logoButton.addEventListener('click', () => logoDropdown.classList.toggle('hidden'));

    // Mobile Menu Dropdown
    const menuButton = document.getElementById('menu-button');
    const menuDropdown = document.getElementById('menu-dropdown');
    menuButton.addEventListener('click', () => {
        menuDropdown.classList.toggle('hidden');
        menuDropdown.classList.toggle('opacity-0');
        menuDropdown.classList.toggle('scale-95');
    });

    // Typewriter Effect
    const typewriterText = document.querySelector('.typewriter-text');
    if (typewriterText) {
        const text = typewriterText.textContent;
        typewriterText.textContent = '';
        let i = 0;
        const type = () => {
            if (i < text.length) {
                typewriterText.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        };
        type();
    }

    // Age Placeholder
    const agePlaceholder = document.getElementById('age-placeholder');
    if (agePlaceholder) {
        const birthDate = new Date('2007-01-01');
        const today = new Date('2025-09-27T17:18:00+04:00'); // Cari vaxt: 05:18 PM +04
        const ageDifMs = today - birthDate;
        const ageDate = new Date(ageDifMs);
        agePlaceholder.textContent = Math.abs(ageDate.getUTCFullYear() - 1970); // 18 il
    }

    // Skill Modals
    const skillCards = document.querySelectorAll('.skill-card');
    const skillModals = document.querySelectorAll('.skill-modal');
    const closeModals = document.querySelectorAll('.close-modal');
    skillCards.forEach(card => {
        card.addEventListener('click', () => {
            const skill = card.dataset.skill;
            const modal = document.getElementById(`${skill}-modal`);
            modal.classList.remove('hidden');
            setTimeout(() => {
                modal.classList.remove('opacity-0');
                modal.querySelector('.modal-content').classList.remove('scale-95');
            }, 10);
        });
    });
    closeModals.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.skill-modal');
            modal.classList.add('opacity-0');
            modal.querySelector('.modal-content').classList.add('scale-95');
            setTimeout(() => modal.classList.add('hidden'), 300);
        });
    });

    // Fade-in Sections
    const fadeInSections = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
            }
        });
    });
    fadeInSections.forEach(section => observer.observe(section));

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const errorTopic = document.getElementById('error-topic');
    const errorYourName = document.getElementById('error-yourName');
    const errorEmail = document.getElementById('error-email');
    const errorMessage = document.getElementById('error-message');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        formSuccess.textContent = ''; // Success mesajını təmizlə

        // Client-side validation
        const topic = document.getElementById('topic').value.trim();
        const yourName = document.getElementById('yourName').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        let valid = true;

        // Topic validation
        errorTopic.textContent = '';
        if (!topic || topic === '') {
            errorTopic.textContent = 'Topic is required.';
            valid = false;
        }

        // Name validation
        errorYourName.textContent = '';
        if (!yourName) {
            errorYourName.textContent = 'Name cannot be empty.';
            valid = false;
        } else if (yourName.length < 3 || yourName.length > 40) {
            errorYourName.textContent = 'Your name must be between 3 and 40 characters.';
            valid = false;
        }

        // Email validation
        errorEmail.textContent = '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            errorEmail.textContent = 'Email cannot be empty.';
            valid = false;
        } else if (!emailRegex.test(email)) {
            errorEmail.textContent = 'Email should be valid.';
            valid = false;
        }

        // Message validation
        errorMessage.textContent = '';
        if (!message) {
            errorMessage.textContent = 'Message cannot be empty.';
            valid = false;
        } else if (message.length < 10 || message.length > 400) {
            errorMessage.textContent = 'Message must be between 10 and 400 characters.';
            valid = false;
        }

        if (!valid) return;

        // Send request
        const data = { topic, yourName, email, message };
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errData = await response.json(); // 400 və 500 üçün JSON
                handleServerErrors(errData);
                return;
            }

            const successData = await response.json(); // ✅ JSON oxu
            formSuccess.textContent = successData.message; // yalnız message göstər
            contactForm.reset(); // Formu təmizlə
            errorTopic.textContent = '';
            errorYourName.textContent = '';
            errorEmail.textContent = '';
            errorMessage.textContent = '';
        } catch (error) {
            console.error('Form submission error:', error);
            formSuccess.textContent = 'An unexpected error occurred. Please try again later.';
        }
    });

    // Server-side validation errors handling
    function handleServerErrors(error) {
        formSuccess.textContent = ''; // Önceki success mesajını təmizlə
        errorTopic.textContent = '';
        errorYourName.textContent = '';
        errorEmail.textContent = '';
        errorMessage.textContent = '';

        console.error('Server error response:', error);

        if (error.errors && Array.isArray(error.errors)) {
            error.errors.forEach(err => {
                if (err.includes('Topic')) errorTopic.textContent = err;
                else if (err.includes('Name')) errorYourName.textContent = err;
                else if (err.includes('Email')) errorEmail.textContent = err;
                else if (err.includes('Message')) errorMessage.textContent = err;
                else formSuccess.textContent = err;
            });
        } else if (error.error) { // 500 xətası üçün
            formSuccess.textContent = error.error;
        } else if (error.message) {
            formSuccess.textContent = error.message;
        } else {
            formSuccess.textContent = 'Bad Request: Please check your input and try again.';
        }
    }
});
