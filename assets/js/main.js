// FETS - Main JavaScript File
// Interactive features for the online exam center website

class FETSWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupAnimations();
        this.setupForms();
        this.setupModals();
        this.setupCounters();
        this.setupScrollEffects();
    }

    // Navigation functionality
    setupNavigation() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar?.classList.add('scrolled');
            } else {
                navbar?.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for anchor links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    // Animation setup
    setupAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        document.querySelectorAll('[data-animate]').forEach(el => {
            observer.observe(el);
        });
    }

    // Form handling
    setupForms() {
        // Contact form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleContactForm.bind(this));
        }

        // Booking form
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            bookingForm.addEventListener('submit', this.handleBookingForm.bind(this));
        }

        // Registration form
        const registrationForm = document.getElementById('registrationForm');
        if (registrationForm) {
            registrationForm.addEventListener('submit', this.handleRegistrationForm.bind(this));
        }

        // Real-time form validation
        this.setupFormValidation();
    }

    handleContactForm(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            this.showNotification('Message sent successfully! We will get back to you soon.', 'success');
            e.target.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    handleBookingForm(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        // Validate required fields
        if (!this.validateBookingData(data)) {
            return;
        }

        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;

        // Simulate booking process
        setTimeout(() => {
            this.showNotification('Booking confirmed! Check your email for details.', 'success');
            e.target.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 3000);
    }

    handleRegistrationForm(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        // Validate registration data
        if (!this.validateRegistrationData(data)) {
            return;
        }

        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Creating Account...';
        submitBtn.disabled = true;

        // Simulate registration process
        setTimeout(() => {
            this.showNotification('Account created successfully! Please check your email for verification.', 'success');
            e.target.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2500);
    }

    validateBookingData(data) {
        const requiredFields = ['examType', 'examDate', 'fullName', 'email', 'phone', 'timeSlot'];
        const missingFields = requiredFields.filter(field => !data[field]);

        if (missingFields.length > 0) {
            this.showNotification('Please fill in all required fields.', 'error');
            return false;
        }

        if (!this.isValidEmail(data.email)) {
            this.showNotification('Please enter a valid email address.', 'error');
            return false;
        }

        return true;
    }

    validateRegistrationData(data) {
        if (data.password !== data.confirmPassword) {
            this.showNotification('Passwords do not match.', 'error');
            return false;
        }

        if (data.password.length < 8) {
            this.showNotification('Password must be at least 8 characters long.', 'error');
            return false;
        }

        if (!this.isValidEmail(data.email)) {
            this.showNotification('Please enter a valid email address.', 'error');
            return false;
        }

        return true;
    }

    setupFormValidation() {
        // Real-time email validation
        document.querySelectorAll('input[type="email"]').forEach(input => {
            input.addEventListener('blur', (e) => {
                const email = e.target.value;
                
                if (email && !this.isValidEmail(email)) {
                    this.showFieldError(e.target, 'Please enter a valid email address');
                } else {
                    this.clearFieldError(e.target);
                }
            });
        });

        // Real-time phone validation
        document.querySelectorAll('input[type="tel"]').forEach(input => {
            input.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 10) value = value.slice(0, 10);
                e.target.value = value;
            });
        });
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showFieldError(field, message) {
        field.classList.add('error');
        let errorElement = field.parentNode.querySelector('.form-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'form-error';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.form-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    // Modal functionality
    setupModals() {
        // Modal triggers
        document.querySelectorAll('[data-modal]').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = trigger.getAttribute('data-modal');
                this.openModal(modalId);
            });
        });

        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(closeBtn => {
            closeBtn.addEventListener('click', () => {
                this.closeModal();
            });
        });
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.classList.add('modal-open');
        }
    }

    closeModal() {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.classList.remove('modal-open');
    }

    // Counter animations
    setupCounters() {
        const counters = document.querySelectorAll('.counter');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }

    // Scroll effects
    setupScrollEffects() {
        // Back to top button
        const backToTopBtn = document.querySelector('.back-to-top');
        if (backToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 500) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });

            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Notification system
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Add to page
        let container = document.querySelector('.notification-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'notification-container';
            document.body.appendChild(container);
        }
        container.appendChild(notification);

        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.removeNotification(notification);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);

        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
    }

    removeNotification(notification) {
        notification.classList.add('hide');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FETSWebsite();
});