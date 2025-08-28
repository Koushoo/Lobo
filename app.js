// Celestia - Premium Apple-inspired announcement website
// Made by Koushoo

class CelestiaApp {
    constructor() {
        this.targetDate = new Date('2025-10-01T00:00:00').getTime();
        this.scrollY = 0;
        this.isScrolling = false;
        
        this.init();
    }

    init() {
        this.showLoadingScreen();
        this.setupEventListeners();
        this.startCountdown();
        this.setupSmoothScrolling();
        this.setupScrollAnimations();
        this.setupNavigation();
        this.setupNotificationForm();
        this.setupMicroInteractions();
        this.createBackgroundAnimation();
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        
        // Hide loading screen after 2 seconds
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            this.startPageAnimations();
        }, 2000);
    }

    startPageAnimations() {
        // Add entrance animations to elements
        const elements = document.querySelectorAll('.hero-container, .nav');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    setupEventListeners() {
        // Scroll events
        window.addEventListener('scroll', this.throttle(() => {
            this.handleScroll();
        }, 16));

        // Resize events
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        // Keyboard shortcuts (Apple-style)
        document.addEventListener('keydown', (e) => {
            if (e.metaKey || e.ctrlKey) {
                switch (e.key.toLowerCase()) {
                    case 'r':
                        e.preventDefault();
                        this.refreshCountdown();
                        break;
                    case 'n':
                        e.preventDefault();
                        document.getElementById('email-input').focus();
                        break;
                }
            }
        });
    }

    startCountdown() {
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = this.targetDate - now;

            if (distance < 0) {
                this.showLaunchMessage();
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            this.animateNumberChange('days', days.toString().padStart(3, '0'));
            this.animateNumberChange('hours', hours.toString().padStart(2, '0'));
            this.animateNumberChange('minutes', minutes.toString().padStart(2, '0'));
            this.animateNumberChange('seconds', seconds.toString().padStart(2, '0'));
        };

        updateCountdown();
        this.countdownInterval = setInterval(updateCountdown, 1000);
    }

    animateNumberChange(elementId, newValue) {
        const element = document.getElementById(elementId);
        if (element && element.textContent !== newValue) {
            element.style.transform = 'scale(1.1)';
            element.style.opacity = '0.7';
            
            setTimeout(() => {
                element.textContent = newValue;
                element.style.transform = 'scale(1)';
                element.style.opacity = '1';
            }, 150);
        }
    }

    showLaunchMessage() {
        const countdownContainer = document.querySelector('.countdown-container');
        countdownContainer.innerHTML = `
            <div class="launch-message">
                <div class="launch-icon">🚀</div>
                <h3 class="launch-title">Celestia has launched!</h3>
                <p class="launch-subtitle">The future is here</p>
                <a href="#" class="btn-primary launch-btn">Experience Celestia</a>
            </div>
        `;
        countdownContainer.style.textAlign = 'center';
    }

    setupSmoothScrolling() {
        // Smooth scrolling for navigation links
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navHeight = document.getElementById('nav').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navHeight - 20;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupScrollAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '-50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const elementsToAnimate = document.querySelectorAll(
            '.countdown-card, .feature-card, .marketing-content, .cta-content'
        );
        
        elementsToAnimate.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            observer.observe(el);
        });

        // Add animate-in styles
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }

    setupNavigation() {
        const nav = document.getElementById('nav');
        let lastScrollY = 0;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Change nav appearance based on scroll
            if (currentScrollY > 100) {
                nav.style.background = 'rgba(252, 252, 249, 0.95)';
                nav.style.boxShadow = '0 1px 10px rgba(0, 0, 0, 0.1)';
            } else {
                nav.style.background = 'rgba(252, 252, 249, 0.8)';
                nav.style.boxShadow = 'none';
            }

            // Hide/show nav on scroll (Apple-style)
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }

    setupNotificationForm() {
        const form = document.getElementById('notify-form');
        const emailInput = document.getElementById('email-input');
        const notifyBtn = document.getElementById('notify-btn');
        const btnText = notifyBtn.querySelector('.btn-text');
        const btnLoader = notifyBtn.querySelector('.btn-loader');
        const successMessage = document.getElementById('success-message');

        // Ensure form elements are properly initialized
        if (!form || !emailInput || !notifyBtn) {
            console.error('Form elements not found');
            return;
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            if (!this.isValidEmail(email)) {
                this.showFormError('Please enter a valid email address');
                return;
            }

            // Show loading state
            btnText.textContent = 'Sending...';
            btnLoader.classList.remove('hidden');
            notifyBtn.disabled = true;
            notifyBtn.style.opacity = '0.8';

            // Simulate API call
            await this.delay(1500);

            // Show success state
            btnLoader.classList.add('hidden');
            
            // Animate form out
            form.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            form.style.opacity = '0';
            form.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                form.classList.add('hidden');
                successMessage.classList.remove('hidden');
                
                // Animate success message in
                successMessage.style.opacity = '0';
                successMessage.style.transform = 'translateY(20px)';
                successMessage.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                
                requestAnimationFrame(() => {
                    successMessage.style.opacity = '1';
                    successMessage.style.transform = 'translateY(0)';
                });
                
                // Store email (in real app, would send to backend)
                console.log('Email registered:', email);
                
                // Add celebration effect
                this.createCelebrationEffect();
            }, 500);
        });

        // Enhanced input interactions
        emailInput.addEventListener('focus', () => {
            emailInput.style.borderColor = 'var(--color-primary)';
            emailInput.style.transform = 'translateY(-1px)';
        });

        emailInput.addEventListener('blur', () => {
            if (!emailInput.value) {
                emailInput.style.borderColor = 'var(--color-border)';
            }
            emailInput.style.transform = 'translateY(0)';
        });

        // Real-time validation
        emailInput.addEventListener('input', () => {
            const email = emailInput.value.trim();
            if (email && !this.isValidEmail(email)) {
                emailInput.style.borderColor = 'var(--color-error)';
            } else if (email) {
                emailInput.style.borderColor = 'var(--color-success)';
            } else {
                emailInput.style.borderColor = 'var(--color-border)';
            }
        });
    }

    setupMicroInteractions() {
        // Enhanced button hover effects
        document.querySelectorAll('.btn-primary, .nav-link-cta').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                if (!btn.disabled) {
                    btn.style.transform = 'translateY(-2px) scale(1.02)';
                    btn.style.boxShadow = '0 8px 25px rgba(33, 128, 141, 0.3)';
                }
            });
            
            btn.addEventListener('mouseleave', () => {
                if (!btn.disabled) {
                    btn.style.transform = 'translateY(0) scale(1)';
                    btn.style.boxShadow = 'none';
                }
            });
        });

        // Feature card interactions
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'none';
            });
        });

        // Countdown card hover effect
        const countdownCard = document.querySelector('.countdown-card');
        if (countdownCard) {
            countdownCard.addEventListener('mouseenter', () => {
                countdownCard.style.transform = 'translateY(-6px) scale(1.02)';
                countdownCard.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
            });
            
            countdownCard.addEventListener('mouseleave', () => {
                countdownCard.style.transform = 'translateY(0) scale(1)';
                countdownCard.style.boxShadow = 'var(--shadow-lg)';
            });
        }
    }

    createBackgroundAnimation() {
        const bgBlur = document.getElementById('bg-blur');
        
        // Subtle parallax effect
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            if (bgBlur) {
                bgBlur.style.transform = `translate3d(0, ${rate}px, 0)`;
            }
        });
    }

    createCelebrationEffect() {
        // Create subtle sparkle effect after email signup
        const successMessage = document.getElementById('success-message');
        const rect = successMessage.getBoundingClientRect();
        
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                this.createSparkle(
                    rect.left + rect.width / 2 + (Math.random() - 0.5) * 200,
                    rect.top + rect.height / 2 + (Math.random() - 0.5) * 100
                );
            }, i * 150);
        }
    }

    createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 6px;
            height: 6px;
            background: var(--color-primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 1;
            transform: scale(0);
            transition: all 1s ease-out;
        `;
        
        document.body.appendChild(sparkle);
        
        requestAnimationFrame(() => {
            sparkle.style.opacity = '0';
            sparkle.style.transform = 'scale(1.5) translateY(-40px)';
        });
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                document.body.removeChild(sparkle);
            }
        }, 1000);
    }

    handleScroll() {
        this.scrollY = window.pageYOffset;
        this.updateNavigationState();
    }

    updateNavigationState() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        let currentSection = '';
        const offset = 150;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.offsetHeight;
            
            if (sectionTop <= offset && sectionTop + sectionHeight > offset) {
                currentSection = section.id;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href').substring(1);
            if (linkHref === currentSection) {
                link.classList.add('active');
            }
        });
    }

    handleResize() {
        // Recalculate animations on resize
        this.updateNavigationState();
    }

    refreshCountdown() {
        // Easter egg: refresh countdown with animation
        const countdownNumbers = document.querySelectorAll('.countdown-number');
        countdownNumbers.forEach((num, index) => {
            setTimeout(() => {
                num.style.transform = 'rotateX(360deg)';
                setTimeout(() => {
                    num.style.transform = 'rotateX(0deg)';
                }, 300);
            }, index * 100);
        });
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showFormError(message) {
        const emailInput = document.getElementById('email-input');
        emailInput.style.borderColor = 'var(--color-error)';
        emailInput.style.boxShadow = '0 0 0 3px rgba(192, 21, 47, 0.1)';
        
        // Create error message element
        let errorMsg = document.getElementById('error-message');
        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.id = 'error-message';
            errorMsg.style.cssText = `
                color: var(--color-error);
                font-size: 14px;
                margin-top: 8px;
                text-align: center;
            `;
            emailInput.parentElement.appendChild(errorMsg);
        }
        
        errorMsg.textContent = message;
        
        // Reset after 3 seconds
        setTimeout(() => {
            emailInput.style.borderColor = 'var(--color-border)';
            emailInput.style.boxShadow = 'none';
            if (errorMsg) {
                errorMsg.remove();
            }
        }, 3000);
    }

    // Utility functions
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, delay) {
        let debounceTimer;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        };
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new CelestiaApp();
    
    // Add CSS for active navigation state and other enhancements
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--color-primary) !important;
            font-weight: var(--font-weight-semibold);
        }
        
        .launch-message {
            padding: var(--space-32);
        }
        
        .launch-icon {
            font-size: 4rem;
            margin-bottom: var(--space-16);
            animation: bounce 2s infinite;
        }
        
        .launch-title {
            font-size: var(--font-size-3xl);
            font-weight: var(--font-weight-bold);
            margin-bottom: var(--space-12);
            color: var(--color-text);
        }
        
        .launch-subtitle {
            font-size: var(--font-size-lg);
            color: var(--color-text-secondary);
            margin-bottom: var(--space-24);
        }
        
        .launch-btn {
            display: inline-block;
            text-decoration: none;
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-30px);
            }
            60% {
                transform: translateY(-15px);
            }
        }
        
        .countdown-number {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .form-input {
            transition: all 0.3s ease-out;
        }
        
        .btn-primary {
            transition: all 0.3s ease-out;
        }
        
        .nav {
            transition: all 0.3s ease-out;
        }
    `;
    document.head.appendChild(style);
    
    // Console message for developers (Apple-style)
    console.log(`
        🍎 Celestia - Premium announcement website
        
        Built with Apple's design philosophy:
        ✓ Clean, minimal interface
        ✓ Smooth animations & transitions
        ✓ Premium micro-interactions
        ✓ Responsive across all devices
        ✓ Accessibility focused
        
        Keyboard shortcuts:
        • Cmd/Ctrl + R: Refresh countdown
        • Cmd/Ctrl + N: Focus email input
        
        Designed by Koushoo with ❤️
    `);
});

// Prevent zoom on double tap for better mobile experience
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Add performance optimizations
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        console.log('Celestia app initialized successfully');
    });
}