document.addEventListener('DOMContentLoaded', () => {
    // Logo Tooltip
    const logoButton = document.getElementById('logo-button');
    const logoTooltip = document.getElementById('logo-tooltip');
    if (logoButton && logoTooltip) {
        logoButton.addEventListener('mouseenter', () => logoTooltip.classList.add('opacity-100'));
        logoButton.addEventListener('mouseleave', () => logoTooltip.classList.remove('opacity-100'));
    }

    // Logo Dropdown
    const logoDropdown = document.getElementById('logo-dropdown');
    if (logoButton && logoDropdown) {
        logoButton.addEventListener('click', () => logoDropdown.classList.toggle('hidden'));
    }

    // Mobile Menu Dropdown
    const menuButton = document.getElementById('menu-button');
    const menuDropdown = document.getElementById('menu-dropdown');
    if (menuButton && menuDropdown) {
        menuButton.addEventListener('click', () => {
            menuDropdown.classList.toggle('hidden');
            menuDropdown.classList.toggle('opacity-0');
            menuDropdown.classList.toggle('scale-95');
        });
    }

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
        const today = new Date('2025-09-27T17:18:00+04:00'); // Current time: 05:18 PM +04
        const ageDifMs = today - birthDate;
        const ageDate = new Date(ageDifMs);
        agePlaceholder.textContent = Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    // Skill Modals
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


    // ----------------------------------------------------------------------
    // 1. PROJECT VIDEOS AUTOPLAY
    // ----------------------------------------------------------------------
    const projectVideos = document.querySelectorAll('.project-video');
    // Assuming your video tags have a class "project-video" or similar
    projectVideos.forEach(video => {
        // Autoplay requires muted to work in most modern browsers
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.play().catch(error => {
            console.warn("Autoplay was prevented (browser restrictions). Please ensure 'muted' is set or user interaction occurs.", error);
        });
    });


    // ----------------------------------------------------------------------
    // 2. CONTACT FORM HANDLING AND 'SENDING...' STATUS
    // 3. FIXING 'TypeError: Cannot read properties of null (reading 'textContent')'
    // ----------------------------------------------------------------------

    const contactForm = document.getElementById('contactForm');
    // Assuming your submit button has the ID 'send-button'
    const sendButton = document.getElementById('send-button');
    // Store initial button text to revert after sending
    const initialButtonText = sendButton ? sendButton.textContent : 'Send';

    // Form and error message elements (null check in event listener handles the TypeError)
    const formSuccess = document.getElementById('formSuccess');
    const errorTopic = document.getElementById('error-topic');
    const errorYourName = document.getElementById('error-yourName');
    const errorEmail = document.getElementById('error-email');
    const errorMessage = document.getElementById('error-message');

    // Server-side validation errors handling function
    function handleServerErrors(error) {
        // Safe check before accessing textContent
        if (formSuccess) formSuccess.textContent = '';
        if (errorTopic) errorTopic.textContent = '';
        if (errorYourName) errorYourName.textContent = '';
        if (errorEmail) errorEmail.textContent = '';
        if (errorMessage) errorMessage.textContent = '';

        console.error('Server error response:', error);

        if (error.errors && Array.isArray(error.errors)) {
            error.errors.forEach(err => {
                // Check if the error element exists before setting text
                if (err.includes('Topic') && errorTopic) errorTopic.textContent = err;
                else if (err.includes('Name') && errorYourName) errorYourName.textContent = err;
                else if (err.includes('Email') && errorEmail) errorEmail.textContent = err;
                else if (err.includes('Message') && errorMessage) errorMessage.textContent = err;
                else if (formSuccess) formSuccess.textContent = err;
            });
        } else if (error.error && formSuccess) { // For 500 errors
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

            // Fix: Check if formSuccess element exists before accessing its properties
            if (formSuccess) formSuccess.textContent = '';

            // Client-side validation
            const topic = document.getElementById('topic').value.trim();
            const yourName = document.getElementById('yourName').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            let valid = true;

            // Topic validation
            if (errorTopic) errorTopic.textContent = '';
            if (!topic || topic === '') {
                if (errorTopic) errorTopic.textContent = 'Topic is required.';
                valid = false;
            }

            // Name validation
            if (errorYourName) errorYourName.textContent = '';
            if (!yourName) {
                if (errorYourName) errorYourName.textContent = 'Name cannot be empty.';
                valid = false;
            } else if (yourName.length < 3 || yourName.length > 40) {
                if (errorYourName) errorYourName.textContent = 'Your name must be between 3 and 40 characters.';
                valid = false;
            }

            // Email validation
            if (errorEmail) errorEmail.textContent = '';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
                if (errorEmail) errorEmail.textContent = 'Email cannot be empty.';
                valid = false;
            } else if (!emailRegex.test(email)) {
                if (errorEmail) errorEmail.textContent = 'Email should be valid.';
                valid = false;
            }

            // Message validation
            if (errorMessage) errorMessage.textContent = '';
            if (!message) {
                if (errorMessage) errorMessage.textContent = 'Message cannot be empty.';
                valid = false;
            } else if (message.length < 10 || message.length > 400) {
                if (errorMessage) errorMessage.textContent = 'Message must be between 10 and 400 characters.';
                valid = false;
            }

            if (!valid) return;

            // Start 'Sending...' status
            if (sendButton) {
                sendButton.textContent = 'Sending...';
                sendButton.disabled = true; // Disable button to prevent double-click
            }

            // Send request
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
                contactForm.reset(); // Clear form on success
                // Clear error messages
                if (errorTopic) errorTopic.textContent = '';
                if (errorYourName) errorYourName.textContent = '';
                if (errorEmail) errorEmail.textContent = '';
                if (errorMessage) errorMessage.textContent = '';

            } catch (error) {
                console.error('Form submission error:', error);
                if (formSuccess) formSuccess.textContent = 'An unexpected error occurred. Please try again later.';
            } finally {
                // Revert button text and re-enable button (whether successful or error)
                if (sendButton) {
                    sendButton.textContent = initialButtonText;
                    sendButton.disabled = false;
                }
            }
        });
    }

}); // End of DOMContentLoaded