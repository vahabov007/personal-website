document.addEventListener('DOMContentLoaded', () => {
    const logoButton = document.getElementById('logo-button');
    const logoTooltip = document.getElementById('logo-tooltip');
    if (logoButton && logoTooltip) {
        logoButton.addEventListener('mouseenter', () => logoTooltip.classList.add('opacity-100'));
        logoButton.addEventListener('mouseleave', () => logoTooltip.classList.remove('opacity-100'));
    }

    const logoDropdown = document.getElementById('logo-dropdown');
    if (logoButton && logoDropdown) {
        logoButton.addEventListener('click', () => logoDropdown.classList.toggle('hidden'));
    }

    const menuButton = document.getElementById('menu-button');
    const menuDropdown = document.getElementById('menu-dropdown');
    if (menuButton && menuDropdown) {
        menuButton.addEventListener('click', () => {
            menuDropdown.classList.toggle('hidden');
            menuDropdown.classList.toggle('opacity-0');
            menuDropdown.classList.toggle('scale-95');
        });
    }

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

    const agePlaceholder = document.getElementById('age-placeholder');
    if (agePlaceholder) {
        const birthDate = new Date('2007-01-01');
        const today = new Date('2025-09-27T17:18:00+04:00');
        const ageDifMs = today - birthDate;
        const ageDate = new Date(ageDifMs);
        agePlaceholder.textContent = Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    const skillCards = document.querySelectorAll('.skill-card');
    const skillModals = document.querySelectorAll('.skill-modal');
    const closeModals = document.querySelectorAll('.close-modal');
    skillCards.forEach(card => {
        card.addEventListener('click', () => {
            const skill = card.dataset.skill;
            const modal = document.getElementById(`${skill}-modal`);
            if (modal) {
                modal.classList.remove('hidden');
                setTimeout(() => {
                    modal.classList.remove('opacity-0');
                    const modalContent = modal.querySelector('.modal-content');
                    if (modalContent) modalContent.classList.remove('scale-95');
                }, 10);
            }
        });
    });
    closeModals.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.skill-modal');
            if (modal) {
                modal.classList.add('opacity-0');
                const modalContent = modal.querySelector('.modal-content');
                if (modalContent) modalContent.classList.add('scale-95');
                setTimeout(() => modal.classList.add('hidden'), 300);
            }
        });
    });

    const fadeInSections = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
            }
        });
    });
    fadeInSections.forEach(section => observer.observe(section));

    // ** Project Videos Autoplay JS section is REMOVED as HTML attributes are used **

    const contactForm = document.getElementById('contactForm');
    const sendButton = document.getElementById('send-button');
    const initialButtonText = sendButton ? sendButton.textContent : 'Send Message';

    const formSuccess = document.getElementById('formSuccess');
    const errorTopic = document.getElementById('error-topic');
    const errorYourName = document.getElementById('error-yourName');
    const errorEmail = document.getElementById('error-email');
    const errorMessage = document.getElementById('error-message');

    function handleServerErrors(error) {
        if (formSuccess) formSuccess.textContent = '';
        if (errorTopic) errorTopic.textContent = '';
        if (errorYourName) errorYourName.textContent = '';
        if (errorEmail) errorEmail.textContent = '';
        if (errorMessage) errorMessage.textContent = '';

        console.error('Server error response:', error);

        if (error.errors && Array.isArray(error.errors)) {
            error.errors.forEach(err => {
                if (err.includes('Topic') && errorTopic) errorTopic.textContent = err;
                else if (err.includes('Name') && errorYourName) errorYourName.textContent = err;
                else if (err.includes('Email') && errorEmail) errorEmail.textContent = err;
                else if (err.includes('Message') && errorMessage) errorMessage.textContent = err;
                else if (formSuccess) formSuccess.textContent = err;
            });
        } else if (error.error && formSuccess) {
            formSuccess.textContent = error.error;
        } else if (error.message && formSuccess) {
            formSuccess.textContent = error.message;
        } else if (formSuccess) {
            formSuccess.textContent = 'Bad Request: Please check your input and try again.';
        }
    }

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (formSuccess) formSuccess.textContent = '';

            const topic = document.getElementById('topic').value.trim();
            const yourName = document.getElementById('yourName').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            let valid = true;

            if (errorTopic) errorTopic.textContent = '';
            if (!topic || topic === '') {
                if (errorTopic) errorTopic.textContent = 'Topic is required.';
                valid = false;
            }

            if (errorYourName) errorYourName.textContent = '';
            if (!yourName) {
                if (errorYourName) errorYourName.textContent = 'Name cannot be empty.';
                valid = false;
            } else if (yourName.length < 3 || yourName.length > 40) {
                if (errorYourName) errorYourName.textContent = 'Your name must be between 3 and 40 characters.';
                valid = false;
            }

            if (errorEmail) errorEmail.textContent = '';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
                if (errorEmail) errorEmail.textContent = 'Email cannot be empty.';
                valid = false;
            } else if (!emailRegex.test(email)) {
                if (errorEmail) errorEmail.textContent = 'Email should be valid.';
                valid = false;
            }

            if (errorMessage) errorMessage.textContent = '';
            if (!message) {
                if (errorMessage) errorMessage.textContent = 'Message cannot be empty.';
                valid = false;
            } else if (message.length < 10 || message.length > 400) {
                if (errorMessage) errorMessage.textContent = 'Message must be between 10 and 400 characters.';
                valid = false;
            }

            if (!valid) return;

            if (sendButton) {
                sendButton.textContent = 'Sending...';
                sendButton.disabled = true;
            }

            const data = { topic, yourName, email, message };
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    const errData = await response.json();
                    handleServerErrors(errData);
                    return;
                }

                const successData = await response.json();
                if (formSuccess) formSuccess.textContent = successData.message;
                contactForm.reset();
                if (errorTopic) errorTopic.textContent = '';
                if (errorYourName) errorYourName.textContent = '';
                if (errorEmail) errorEmail.textContent = '';
                if (errorMessage) errorMessage.textContent = '';

            } catch (error) {
                console.error('Form submission error:', error);
                if (formSuccess) formSuccess.textContent = 'An unexpected error occurred. Please try again later.';
            } finally {
                if (sendButton) {
                    sendButton.textContent = initialButtonText;
                    sendButton.disabled = false;
                }
            }
        });
    }

});