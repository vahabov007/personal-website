// main.js
document.addEventListener('DOMContentLoaded', function() {
    // Age calculator
    calculateAge();

    // Skill modals
    setupSkillModals();

    // Contact form handling
    setupContactForm();

    // Navigation
    setupNavigation();
});

function calculateAge() {
    const birthYear = 2006;
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    document.getElementById('age-placeholder').textContent = age;
}

function setupSkillModals() {
    const skillCards = document.querySelectorAll('.skill-card');
    const closeButtons = document.querySelectorAll('.close-modal');

    skillCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('view-details-btn')) {
                return;
            }

            const skill = this.getAttribute('data-skill');
            const modal = document.getElementById(`${skill}-modal`);

            if (modal) {
                modal.classList.remove('hidden');
                setTimeout(() => {
                    modal.classList.add('opacity-100');
                    modal.querySelector('.modal-content').classList.remove('scale-95');
                }, 10);
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.skill-modal');
            modal.classList.remove('opacity-100');
            modal.querySelector('.modal-content').classList.add('scale-95');

            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300);
        });
    });

    // Close modal when clicking outside
    document.querySelectorAll('.skill-modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('opacity-100');
                this.querySelector('.modal-content').classList.add('scale-95');

                setTimeout(() => {
                    this.classList.add('hidden');
                }, 300);
            }
        });
    });
}

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('formSuccess');

    if (!contactForm) return;

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Reset errors and messages
        document.querySelectorAll('[id^="error-"]').forEach(el => {
            el.textContent = '';
        });
        successMessage.textContent = '';
        successMessage.className = 'text-green-400 mt-6 font-semibold text-center';

        // Get form data
        const formData = {
            topic: document.getElementById('topic').value,
            yourName: document.getElementById('yourName').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Basic validation
        let isValid = true;

        if (!formData.topic) {
            document.getElementById('error-topic').textContent = 'Topic is required';
            isValid = false;
        }

        if (!formData.yourName || formData.yourName.length < 3) {
            document.getElementById('error-yourName').textContent = 'Name must be at least 3 characters';
            isValid = false;
        }

        if (!formData.email || !isValidEmail(formData.email)) {
            document.getElementById('error-email').textContent = 'Valid email is required';
            isValid = false;
        }

        if (!formData.message || formData.message.length < 10) {
            document.getElementById('error-message').textContent = 'Message must be at least 10 characters';
            isValid = false;
        }

        if (!isValid) return;

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            // ƏSAS DÜZƏLİŞ: Eyni domain-ə göndər
            const currentDomain = window.location.origin;
            const apiUrl = `${currentDomain}/api/contact`;

            console.log('Sending request to:', apiUrl);

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            console.log('Response status:', response.status);

            if (response.ok) {
                const result = await response.text();
                successMessage.textContent = result || 'Message sent successfully!';
                contactForm.reset();
            } else {
                const errorData = await response.text();
                throw new Error(errorData || `Server error: ${response.status}`);
            }
        } catch (error) {
            console.error('Error:', error);
            successMessage.textContent = 'Error: ' + error.message;
            successMessage.className = 'text-red-400 mt-6 font-semibold text-center';
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function setupNavigation() {
    // Logo dropdown
    const logoButton = document.getElementById('logo-button');
    const logoDropdown = document.getElementById('logo-dropdown');
    const logoTooltip = document.getElementById('logo-tooltip');

    if (logoButton) {
        logoButton.addEventListener('mouseenter', function() {
            logoTooltip.classList.remove('opacity-0');
            logoTooltip.classList.add('opacity-100');
        });

        logoButton.addEventListener('mouseleave', function() {
            logoTooltip.classList.remove('opacity-100');
            logoTooltip.classList.add('opacity-0');
        });

        logoButton.addEventListener('click', function() {
            logoDropdown.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!logoButton.contains(e.target)) {
                logoDropdown.classList.add('hidden');
            }
        });
    }

    // Mobile menu
    const menuButton = document.getElementById('menu-button');
    const menuDropdown = document.getElementById('menu-dropdown');

    if (menuButton && menuDropdown) {
        menuButton.addEventListener('click', function() {
            const isHidden = menuDropdown.classList.contains('opacity-0');

            if (isHidden) {
                menuDropdown.classList.remove('opacity-0', 'pointer-events-none', 'scale-95');
                menuDropdown.classList.add('opacity-100', 'pointer-events-auto', 'scale-100');
            } else {
                menuDropdown.classList.remove('opacity-100', 'pointer-events-auto', 'scale-100');
                menuDropdown.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuButton.contains(e.target) && !menuDropdown.contains(e.target)) {
                menuDropdown.classList.remove('opacity-100', 'pointer-events-auto', 'scale-100');
                menuDropdown.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Fade-in animation for project cards
const fadeInSections = document.querySelectorAll('.fade-in-section');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeInSections.forEach(section => {
    fadeInObserver.observe(section);
});