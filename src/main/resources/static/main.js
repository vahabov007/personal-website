document.addEventListener('DOMContentLoaded', function() {
    const dividerContainers = document.querySelectorAll('.divider-line-container');
    const dividerObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelector('.left-line').style.animation = 'drawLeftLine 1s ease-out forwards';
                entry.target.querySelector('.left-line').style.animationDelay = '0.2s';
                entry.target.querySelector('.right-line').style.animation = 'drawRightLine 1s ease-out forwards';
                entry.target.querySelector('.right-line').style.animationDelay = '0.2s';
                dividerObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    });
    dividerContainers.forEach(container => dividerObserver.observe(container));

    const birthYear = 2007;
    const currentYear = new Date().getFullYear();
    const agePlaceholder = document.getElementById("age-placeholder");
    if (agePlaceholder) agePlaceholder.textContent = currentYear - birthYear;

    const menuButton = document.getElementById('menu-button');
    const menuDropdown = document.getElementById('menu-dropdown');
    const logoButton = document.getElementById('logo-button');
    const logoDropdown = document.getElementById('logo-dropdown');

    if (menuButton && menuDropdown) {
        menuButton.addEventListener('click', event => {
            event.stopPropagation();
            menuDropdown.classList.toggle('opacity-100');
            menuDropdown.classList.toggle('pointer-events-auto');
            menuDropdown.classList.toggle('scale-100');
            menuDropdown.classList.toggle('opacity-0');
            menuDropdown.classList.toggle('pointer-events-none');
            menuDropdown.classList.toggle('scale-95');
            if (logoDropdown && !logoDropdown.classList.contains('hidden')) logoDropdown.classList.add('hidden');
        });
    }

    if (logoButton && logoDropdown) {
        logoButton.addEventListener('click', event => {
            event.stopPropagation();
            logoDropdown.classList.toggle('hidden');
            if (menuDropdown && menuDropdown.classList.contains('opacity-100')) {
                menuDropdown.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
                menuDropdown.classList.remove('opacity-100', 'pointer-events-auto', 'scale-100');
            }
        });
    }

    document.addEventListener('click', event => {
        if (menuButton && menuDropdown && !menuButton.contains(event.target) && !menuDropdown.contains(event.target)) {
            menuDropdown.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
            menuDropdown.classList.remove('opacity-100', 'pointer-events-auto', 'scale-100');
        }
        if (logoButton && logoDropdown && !logoButton.contains(event.target) && !logoDropdown.contains(event.target)) {
            logoDropdown.classList.add('hidden');
        }
    });

    const skillCards = document.querySelectorAll('.skill-card');
    const skillModals = document.querySelectorAll('.skill-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');

    skillCards.forEach(card => card.addEventListener('click', function() {
        const modal = document.getElementById(this.dataset.skill + '-modal');
        if (modal) {
            modal.classList.remove('hidden');
            setTimeout(() => modal.classList.add('active'), 10);
        }
    }));

    closeModalButtons.forEach(button => button.addEventListener('click', function() {
        const modal = this.closest('.skill-modal');
        if (modal) {
            modal.classList.remove('active');
            modal.addEventListener('transitionend', function handler() {
                modal.classList.add('hidden');
                modal.removeEventListener('transitionend', handler);
            }, {
                once: true
            });
        }
    }));

    skillModals.forEach(modal => modal.addEventListener('click', event => {
        if (event.target === modal) {
            modal.classList.remove('active');
            modal.addEventListener('transitionend', function handler() {
                modal.classList.add('hidden');
                modal.removeEventListener('transitionend', handler);
            }, {
                once: true
            });
        }
    }));

    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const sendButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

    const errors = {
        topic: document.getElementById('error-topic'),
        yourName: document.getElementById('error-yourName'),
        email: document.getElementById('error-email'),
        message: document.getElementById('error-message')
    };

    function clearErrors() {
        Object.values(errors).forEach(el => {
            if (el) el.textContent = '';
        });
        if (formSuccess) {
            formSuccess.textContent = '';
            formSuccess.style.color = ''; // Rəngi sıfırla
        }
    }

    if (contactForm && sendButton) {
        contactForm.addEventListener('submit', event => {
            event.preventDefault();
            clearErrors();

            const topic = document.getElementById('topic').value;
            const yourName = document.getElementById('yourName').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            let isValid = true;

            // Validation
            if (!topic) {
                if (errors.topic) errors.topic.textContent = 'Please select a topic.';
                isValid = false;
            }

            if (!yourName || yourName.length < 3 || yourName.length > 40) {
                if (errors.yourName) errors.yourName.textContent = 'Your name must be between 3 and 40 characters.';
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                if (errors.email) errors.email.textContent = 'Please enter a valid email address.';
                isValid = false;
            }

            if (!message || message.length < 10 || message.length > 400) {
                if (errors.message) errors.message.textContent = 'Message must be between 10 and 400 characters.';
                isValid = false;
            }

            if (!isValid) {
                return;
            }

            sendButton.disabled = true;
            sendButton.textContent = 'Message is sending... Please wait.';

            const formData = {
                yourName: yourName,
                topic: topic,
                email: email,
                message: message
            };

            const apiUrl = 'https://www.vahabvahabov.site/api/contact';

            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                    });
                }
                return response.text();
            })
            .then(data => {
                if (formSuccess) {
                    formSuccess.textContent = data || 'Message sent successfully!';
                    formSuccess.style.color = '#10B981'; // Yaşıl rəng
                }
                contactForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                if (formSuccess) {
                    formSuccess.textContent = 'Failed to send message: ' + error.message;
                    formSuccess.style.color = '#EF4444'; // Qırmızı rəng
                }
            })
            .finally(() => {
                sendButton.disabled = false;
                sendButton.textContent = 'Send Message';
            });
        });
    }

    const projectVideos = document.querySelectorAll('#projects video');
    const videoObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => entry.isIntersecting ? entry.target.play() : entry.target.pause());
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.7
    });
    projectVideos.forEach(video => videoObserver.observe(video));

    const fadeInSections = document.querySelectorAll('.fade-in-section');
    const fadeInObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    });
    fadeInSections.forEach(section => fadeInObserver.observe(section));
});