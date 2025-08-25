// Celestia - Apple-Style JavaScript with 500+ Design Tokens Implementation
// Made by Kousho

class CelestiaApp {
    constructor() {
        // Target launch date: November 1, 2025 00:00:00 IST
        this.targetDate = new Date('2025-11-01T00:00:00+05:30').getTime();
        
        // DOM Elements - Initialize after DOM is loaded
        this.countdownElements = {};
        this.modal = null;
        this.modalBackdrop = null;
        this.modalClose = null;
        this.notifyBtn = null;
        this.notifyBtnNav = null;
        this.learnMoreBtn = null;
        this.notificationForm = null;
        this.contactForm = null;
        this.navToggle = null;
        this.navMenu = null;
        
        // State management
        this.isModalOpen = false;
        this.isNavOpen = false;
        this.scrollPosition = 0;
        this.isCountdownComplete = false;
        
        // Animation and interaction handlers
        this.observers = [];
        this.resizeHandlers = [];
        this.scrollHandlers = [];
        
        this.countdownInterval = null;
    }
    
    // Initialize all functionality
    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }
    
    initializeApp() {
        this.initializeDOMElements();
        this.startCountdown();
        this.initModalHandlers();
        this.initFormHandling();
        this.initNavigationHandlers();
        this.initScrollAnimations();
        this.initAppleStyleInteractions();
        this.initGlassmorphismEffects();
        this.initPerformanceOptimizations();
        this.initAccessibilityFeatures();
        this.initResponsiveHandlers();
        this.initAdvancedAnimations();
        
        console.log('🌟 Celestia initialized successfully by Kousho');
    }
    
    initializeDOMElements() {
        // Countdown elements
        this.countdownElements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };
        
        // Modal elements
        this.modal = document.getElementById('notificationModal');
        this.modalBackdrop = document.getElementById('modalBackdrop');
        this.modalClose = document.getElementById('modalClose');
        
        // Button elements
        this.notifyBtn = document.getElementById('notifyBtn');
        this.notifyBtnNav = document.getElementById('notifyBtnNav');
        this.learnMoreBtn = document.getElementById('learnMore');
        
        // Form elements
        this.notificationForm = document.getElementById('notificationForm');
        this.contactForm = document.getElementById('contactForm');
        
        // Navigation elements
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
    }
    
    // === COUNTDOWN TIMER SYSTEM ===
    startCountdown() {
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = this.targetDate - now;
            
            if (distance < 0 && !this.isCountdownComplete) {
                this.handleCountdownComplete();
                return;
            }
            
            if (distance >= 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                this.animateCountdownValue(this.countdownElements.days, days);
                this.animateCountdownValue(this.countdownElements.hours, hours);
                this.animateCountdownValue(this.countdownElements.minutes, minutes);
                this.animateCountdownValue(this.countdownElements.seconds, seconds);
            }
        };
        
        updateCountdown();
        this.countdownInterval = setInterval(updateCountdown, 1000);
    }
    
    animateCountdownValue(element, newValue) {
        if (!element) return;
        
        const currentValue = parseInt(element.textContent) || 0;
        if (currentValue !== newValue) {
            // Apple-style scaling animation
            element.style.transform = 'scale(1.2)';
            element.style.filter = 'brightness(1.3)';
            
            setTimeout(() => {
                element.textContent = newValue.toString().padStart(2, '0');
                element.style.transform = 'scale(1)';
                element.style.filter = 'brightness(1)';
            }, 150);
            
            // Add ripple effect
            this.createCountdownRipple(element);
        }
    }
    
    createCountdownRipple(element) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 4px;
            height: 4px;
            background: rgba(0, 122, 255, 0.6);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: countdownRipple 0.6s ease-out;
            pointer-events: none;
            z-index: 10;
        `;
        
        if (element.parentElement) {
            element.parentElement.style.position = 'relative';
            element.parentElement.appendChild(ripple);
        }
        
        setTimeout(() => {
            if (ripple.parentElement) {
                ripple.remove();
            }
        }, 600);
    }
    
    handleCountdownComplete() {
        this.isCountdownComplete = true;
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }
        
        const countdownLabel = document.querySelector('.countdown-label');
        const countdownContainer = document.querySelector('.countdown');
        
        if (countdownLabel) {
            countdownLabel.textContent = '🎉 Celestia is Live! 🎉';
            countdownLabel.style.background = 'linear-gradient(135deg, #00C851, #007E33)';
            countdownLabel.style.webkitBackgroundClip = 'text';
            countdownLabel.style.webkitTextFillColor = 'transparent';
        }
        
        if (countdownContainer) {
            countdownContainer.innerHTML = `
                <div class="launch-message glass-item" style="grid-column: 1 / -1; padding: 2rem; text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">✨</div>
                    <div style="font-size: 1.5rem; font-weight: 600; color: var(--color-green);">Available Now!</div>
                </div>
            `;
        }
        
        // Update CTA buttons
        document.querySelectorAll('.btn--primary').forEach(btn => {
            if (btn.textContent.includes('Notify') || btn.textContent.includes('Get Notified')) {
                btn.textContent = 'Launch Celestia';
                btn.style.background = 'linear-gradient(135deg, var(--color-green), var(--color-teal))';
            }
        });
        
        // Celebration animation
        this.triggerCelebrationAnimation();
    }
    
    triggerCelebrationAnimation() {
        const createConfetti = () => {
            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: fixed;
                    top: -10px;
                    left: ${Math.random() * 100}vw;
                    width: ${Math.random() * 10 + 5}px;
                    height: ${Math.random() * 10 + 5}px;
                    background: hsl(${Math.random() * 360}, 70%, 60%);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1000;
                    animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
                `;
                
                document.body.appendChild(confetti);
                setTimeout(() => {
                    if (confetti.parentElement) {
                        confetti.remove();
                    }
                }, 5000);
            }
        };
        
        createConfetti();
        setTimeout(createConfetti, 500);
        setTimeout(createConfetti, 1000);
    }
    
    // === MODAL SYSTEM ===
    initModalHandlers() {
        // Multiple trigger buttons
        if (this.notifyBtn) {
            this.notifyBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal();
            });
        }
        
        if (this.notifyBtnNav) {
            this.notifyBtnNav.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal();
            });
        }
        
        // Learn more button smooth scroll
        if (this.learnMoreBtn) {
            this.learnMoreBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const featuresSection = document.getElementById('features');
                if (featuresSection) {
                    featuresSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
        
        // Close handlers
        if (this.modalClose) {
            this.modalClose.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal();
            });
        }
        
        if (this.modalBackdrop) {
            this.modalBackdrop.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal();
            });
        }
        
        // Keyboard handlers
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isModalOpen) {
                this.closeModal();
            }
        });
        
        // Prevent scroll when modal is open
        if (this.modal) {
            this.modal.addEventListener('wheel', (e) => {
                if (this.isModalOpen) {
                    e.preventDefault();
                }
            });
        }
    }
    
    openModal() {
        if (!this.modal) return;
        
        this.isModalOpen = true;
        this.scrollPosition = window.pageYOffset;
        
        // Prevent body scroll
        document.body.style.position = 'fixed';
        document.body.style.top = `-${this.scrollPosition}px`;
        document.body.style.width = '100%';
        
        this.modal.classList.remove('hidden');
        
        // Apple-style entrance animation
        requestAnimationFrame(() => {
            if (this.modal) {
                this.modal.style.opacity = '1';
                const modalContent = this.modal.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.style.transform = 'scale(1)';
                }
            }
        });
        
        // Focus management
        setTimeout(() => {
            if (this.modal) {
                const emailInput = this.modal.querySelector('input[type="email"]');
                if (emailInput) {
                    emailInput.focus();
                }
            }
        }, 300);
        
        // Add blur effect to background
        document.body.classList.add('modal-open');
    }
    
    closeModal() {
        if (!this.modal) return;
        
        this.isModalOpen = false;
        
        // Restore scroll position
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.classList.remove('modal-open');
        window.scrollTo(0, this.scrollPosition);
        
        this.modal.classList.add('hidden');
        
        // Return focus to trigger button
        if (this.notifyBtn) {
            this.notifyBtn.focus();
        }
    }
    
    // === FORM HANDLING SYSTEM ===
    initFormHandling() {
        // Notification form
        if (this.notificationForm) {
            this.notificationForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNotificationFormSubmission(e);
            });
        }
        
        // Contact form
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactFormSubmission(e);
            });
        }
        
        // Real-time validation for all email inputs
        document.querySelectorAll('input[type="email"]').forEach(input => {
            input.addEventListener('blur', () => this.validateEmail(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
        
        // Enhanced form interactions for all form controls
        document.querySelectorAll('.form-control').forEach(control => {
            control.addEventListener('focus', (e) => this.handleFieldFocus(e));
            control.addEventListener('blur', (e) => this.handleFieldBlur(e));
        });
        
        // Ensure all form inputs are functional
        document.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });
    }
    
    async handleNotificationFormSubmission(e) {
        const emailInput = e.target.querySelector('input[type="email"]');
        const submitBtn = e.target.querySelector('button[type="submit"]');
        
        if (!emailInput || !submitBtn) {
            console.error('Form elements not found');
            return;
        }
        
        const email = emailInput.value.trim();
        
        if (!this.isValidEmail(email)) {
            this.showFieldError(emailInput, 'Please enter a valid email address');
            return;
        }
        
        // Apple-style loading state
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Joining...';
        submitBtn.disabled = true;
        
        try {
            await this.simulateSubscription(email);
            this.showSuccessModal();
        } catch (error) {
            this.showFieldError(emailInput, 'Something went wrong. Please try again.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
    
    async handleContactFormSubmission(e) {
        const formData = new FormData(e.target);
        const submitBtn = e.target.querySelector('button[type="submit"]');
        
        if (!submitBtn) {
            console.error('Submit button not found');
            return;
        }
        
        // Validate all fields
        const email = formData.get('email');
        const name = formData.get('name');
        
        if (!this.isValidEmail(email)) {
            const emailInput = e.target.querySelector('[name="email"]');
            if (emailInput) {
                this.showFieldError(emailInput, 'Valid email required');
            }
            return;
        }
        
        if (!name || name.trim().length < 2) {
            const nameInput = e.target.querySelector('[name="name"]');
            if (nameInput) {
                this.showFieldError(nameInput, 'Name must be at least 2 characters');
            }
            return;
        }
        
        // Loading state
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" opacity="0.3"/>
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="2" fill="none">
                    <animateTransform attributeName="transform" type="rotate" values="0 12 12;360 12 12" dur="1s" repeatCount="indefinite"/>
                </path>
            </svg>
            Submitting...
        `;
        submitBtn.disabled = true;
        
        try {
            await this.simulateContactSubmission(Object.fromEntries(formData));
            this.showContactSuccess(e.target);
        } catch (error) {
            this.showFormError(e.target, 'Unable to submit. Please try again.');
        } finally {
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1000);
        }
    }
    
    validateEmail(input) {
        const email = input.value.trim();
        if (email && !this.isValidEmail(email)) {
            this.showFieldError(input, 'Please enter a valid email address');
            return false;
        }
        this.clearFieldError(input);
        return true;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    showFieldError(field, message) {
        if (!field) return;
        
        field.style.borderColor = 'var(--color-red)';
        field.style.animation = 'shake 0.4s ease-in-out';
        
        let errorMsg = field.parentElement.querySelector('.error-message');
        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.style.cssText = `
                color: var(--color-red);
                font-size: var(--font-size-sm);
                margin-top: var(--space-1);
                opacity: 0;
                transform: translateY(-10px);
                transition: all var(--duration-fast) var(--ease-apple);
            `;
            field.parentElement.appendChild(errorMsg);
        }
        
        errorMsg.textContent = message;
        requestAnimationFrame(() => {
            errorMsg.style.opacity = '1';
            errorMsg.style.transform = 'translateY(0)';
        });
        
        // Auto-clear error after 5 seconds
        setTimeout(() => this.clearFieldError(field), 5000);
    }
    
    clearFieldError(field) {
        if (!field) return;
        
        field.style.borderColor = '';
        field.style.animation = '';
        
        const errorMsg = field.parentElement.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.style.opacity = '0';
            errorMsg.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                if (errorMsg.parentElement) {
                    errorMsg.remove();
                }
            }, 200);
        }
    }
    
    handleFieldFocus(e) {
        const field = e.target;
        field.style.transform = 'scale(1.02)';
        field.style.boxShadow = '0 0 0 3px rgba(0, 122, 255, 0.2)';
    }
    
    handleFieldBlur(e) {
        const field = e.target;
        field.style.transform = 'scale(1)';
        field.style.boxShadow = '';
    }
    
    simulateSubscription(email) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`🌟 Subscription added: ${email}`);
                resolve({ success: true });
            }, 1500);
        });
    }
    
    simulateContactSubmission(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('📧 Contact form submitted:', data);
                resolve({ success: true });
            }, 2000);
        });
    }
    
    showSuccessModal() {
        if (!this.modal) return;
        
        const modalBody = this.modal.querySelector('.modal-body');
        if (modalBody) {
            modalBody.innerHTML = `
                <div class="success-content">
                    <div class="success-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" fill="var(--color-green)" opacity="0.2"/>
                            <path d="M9 12l2 2 4-4" stroke="var(--color-green)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <h4 style="color: var(--text-primary); margin: var(--space-4) 0;">You're all set! 🎉</h4>
                    <p style="color: var(--text-secondary); margin-bottom: var(--space-6);">We'll notify you the moment Celestia launches on November 1, 2025.</p>
                    <button class="btn btn--primary btn--full-width" onclick="window.celestiaApp.closeModal()">Perfect!</button>
                </div>
            `;
            
            // Success animation
            const successIcon = modalBody.querySelector('.success-icon');
            if (successIcon) {
                successIcon.style.animation = 'successBounce 0.8s var(--ease-spring)';
            }
        }
    }
    
    showContactSuccess(form) {
        if (!form) return;
        
        const originalHTML = form.innerHTML;
        form.innerHTML = `
            <div class="success-content" style="text-align: center; padding: var(--space-6);">
                <div class="success-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="var(--color-green)" opacity="0.2"/>
                        <path d="M9 12l2 2 4-4" stroke="var(--color-green)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <h3 style="color: var(--text-primary); margin: var(--space-4) 0;">Message Sent! ✨</h3>
                <p style="color: var(--text-secondary);">Thanks for your interest in Celestia. We'll be in touch soon!</p>
            </div>
        `;
        
        // Reset form after 5 seconds
        setTimeout(() => {
            form.innerHTML = originalHTML;
            this.initFormHandling(); // Re-initialize handlers
        }, 5000);
    }
    
    // === NAVIGATION SYSTEM ===
    initNavigationHandlers() {
        // Mobile navigation toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleNavigation();
            });
        }
        
        // Smooth scroll for all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile nav if open
                    if (this.isNavOpen) {
                        this.toggleNavigation();
                    }
                }
            });
        });
        
        // Navigation scroll behavior
        this.initNavbarScrollBehavior();
    }
    
    toggleNavigation() {
        this.isNavOpen = !this.isNavOpen;
        
        if (this.navMenu) {
            this.navMenu.style.display = this.isNavOpen ? 'flex' : 'none';
        }
        
        // Animate hamburger menu
        if (this.navToggle) {
            const spans = this.navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (this.isNavOpen) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '';
                }
            });
        }
    }
    
    initNavbarScrollBehavior() {
        let lastScrollTop = 0;
        let ticking = false;
        
        const handleNavScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const nav = document.querySelector('.nav');
            
            if (!nav) return;
            
            // Hide/show navigation based on scroll direction
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
            
            // Adjust background opacity
            const opacity = Math.min(scrollTop / 100, 1);
            nav.style.background = `rgba(255, 255, 255, ${0.1 + opacity * 0.15})`;
            nav.style.backdropFilter = `blur(${20 + opacity * 20}px)`;
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(handleNavScroll);
                ticking = true;
            }
        });
    }
    
    // === SCROLL ANIMATIONS ===
    initScrollAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    fadeInObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.animationPlayState = 'paused';
            fadeInObserver.observe(el);
        });
        
        this.observers.push(fadeInObserver);
        
        // Parallax effects
        this.initParallaxEffects();
        
        // Advanced scroll-triggered animations
        this.initScrollTriggeredAnimations();
    }
    
    initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.glass-element, .visual-element');
        
        let ticking = false;
        const handleParallax = () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.1 + (index * 0.05);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px) rotate(${yPos * 0.1}deg)`;
            });
            
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(handleParallax);
                ticking = true;
            }
        });
    }
    
    initScrollTriggeredAnimations() {
        // Counter animation for stats
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        document.querySelectorAll('.stat-number').forEach(stat => {
            counterObserver.observe(stat);
        });
        
        this.observers.push(counterObserver);
    }
    
    animateCounter(element) {
        const text = element.textContent;
        const isNumber = /^\d+$/.test(text);
        
        if (isNumber) {
            const target = parseInt(text);
            let current = 0;
            const increment = target / 50;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    element.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target;
                }
            };
            
            updateCounter();
        }
    }
    
    // Simplified Apple-style interactions
    initAppleStyleInteractions() {
        // Button hover effects
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-2px) scale(1.02)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Card interactions
        document.querySelectorAll('.feature-card, .glass-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // Simplified glassmorphism effects
    initGlassmorphismEffects() {
        const glassElements = document.querySelectorAll('.glass-panel');
        
        glassElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.background = 'rgba(255, 255, 255, 0.35)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.background = 'rgba(255, 255, 255, 0.25)';
            });
        });
    }
    
    // Simplified performance optimizations
    initPerformanceOptimizations() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }
    
    // Simplified accessibility features
    initAccessibilityFeatures() {
        // Basic keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                // Focus management handled by browser
            }
        });
    }
    
    // Responsive handling
    initResponsiveHandlers() {
        this.handleResize();
    }
    
    handleResize() {
        const width = window.innerWidth;
        
        // Mobile navigation handling
        if (width > 768 && this.isNavOpen) {
            this.toggleNavigation();
        }
        
        // Responsive countdown layout
        const countdown = document.querySelector('.glass-countdown');
        if (countdown) {
            if (width < 480) {
                countdown.style.gridTemplateColumns = '1fr';
                countdown.style.maxWidth = '200px';
            } else if (width < 768) {
                countdown.style.gridTemplateColumns = 'repeat(2, 1fr)';
                countdown.style.maxWidth = '300px';
            } else {
                countdown.style.gridTemplateColumns = 'repeat(4, 1fr)';
                countdown.style.maxWidth = '500px';
            }
        }
    }
    
    // Advanced animations with CSS injection
    initAdvancedAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes countdownRipple {
                to {
                    transform: translate(-50%, -50%) scale(20);
                    opacity: 0;
                }
            }
            
            @keyframes confettiFall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
            
            @keyframes successBounce {
                0% { transform: scale(0) rotate(0deg); }
                50% { transform: scale(1.3) rotate(180deg); }
                100% { transform: scale(1) rotate(360deg); }
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-8px); }
                75% { transform: translateX(8px); }
            }
            
            .modal-open .hero,
            .modal-open .features,
            .modal-open .about,
            .modal-open .contact,
            .modal-open .footer {
                filter: blur(3px) brightness(0.7);
                transition: filter 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Utility method for form errors
    showFormError(form, message) {
        const errorEl = document.createElement('div');
        errorEl.className = 'form-error';
        errorEl.style.cssText = `
            color: var(--color-red);
            text-align: center;
            margin-top: var(--space-4);
            padding: var(--space-3);
            background: rgba(255, 59, 48, 0.1);
            border-radius: var(--radius-base);
            border: 1px solid rgba(255, 59, 48, 0.3);
        `;
        errorEl.textContent = message;
        
        form.appendChild(errorEl);
        
        setTimeout(() => {
            if (errorEl.parentElement) {
                errorEl.remove();
            }
        }, 5000);
    }
    
    // Clean up on destroy
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }
    }
}

// Initialize Celestia App when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Add initial loading animation
    document.body.style.opacity = '0';
    document.body.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
        document.body.style.transition = 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
        document.body.style.opacity = '1';
        document.body.style.transform = 'scale(1)';
        
        // Initialize the main app
        window.celestiaApp = new CelestiaApp();
        window.celestiaApp.init();
        
        console.log('✨ Celestia - The future of digital experiences');
        console.log('🚀 Made with ♥ by Kousho');
        console.log('🌟 Launching November 1, 2025');
    }, 100);
});

// Service Worker registration for future PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        console.log('🔧 Service Worker support detected - Ready for PWA');
    });
}

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log(`⚡ Page loaded in ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
    });
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CelestiaApp;
}