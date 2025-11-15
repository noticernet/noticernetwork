// ======== INITIALIZATION =========
document.addEventListener("DOMContentLoaded", () => {
    initializeSite();
});

function initializeSite() {
    setupNavigation();
    setupSmoothScroll();
    setupScrollEffects();
    setupBackToTop();
    setupAnimations();
    setupProgressBars();
    setupFundingCounter();
    setupParallaxEffects();
    setupInteractiveElements();
    updateCopyrightYear();
}

// ======== NAVIGATION =========
function setupNavigation() {
    const navToggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".nav");

    if (navToggle && nav) {
        navToggle.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("open");
            navToggle.setAttribute("aria-expanded", isOpen);
            
            // Update toggle button icon
            if (isOpen) {
                navToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
            } else {
                navToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
            }
        });

        // Close nav when clicking outside
        document.addEventListener("click", (e) => {
            if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
                nav.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
                navToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
            }
        });

        // Close nav when clicking on a link
        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
                navToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
            });
        });
    }
}

// ======== SMOOTH SCROLL =========
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener("click", function(e) {
            // Don't prevent default for external links or links without hash
            if (this.getAttribute("href") === "#" || this.getAttribute("href").startsWith("#!")) return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const announcementHeight = document.querySelector('.announcement-container').offsetHeight;
                const totalOffset = headerHeight + announcementHeight + 20;
                const targetPosition = targetElement.offsetTop - totalOffset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
}

// ======== SCROLL EFFECTS =========
function setupScrollEffects() {
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '-50px 0px -50px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Animate progress bars when projects section comes into view
                if (entry.target.id === 'projects') {
                    setTimeout(() => {
                        animateProgressBars();
                        animateCounters();
                    }, 300);
                }
            }
        });
    }, observerOptions);
    
    sections.forEach((section) => sectionObserver.observe(section));
    
    // Header scroll effect
    let lastScrollY = window.scrollY;
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class based on scroll position
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header based on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// ======== PROGRESS BARS =========
function setupProgressBars() {
    // Initialize progress bars with 0 width
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        bar.style.width = '0%';
    });
}

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    progressBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-target') + '%';
        
        // Reset to 0 first for animation
        bar.style.width = '0%';
        
        // Animate to target width
        setTimeout(() => {
            bar.style.transition = 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
            bar.style.width = targetWidth;
        }, 100);
    });
}

// ======== FUNDING COUNTER =========
function setupFundingCounter() {
    // Initialize counters with 0
    const counters = document.querySelectorAll('.stat-value');
    counters.forEach(counter => {
        counter.setAttribute('data-original', counter.textContent);
        if (!counter.textContent.includes('%')) {
            counter.textContent = '0';
        }
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-value');
    
    counters.forEach(counter => {
        const originalText = counter.getAttribute('data-original');
        
        if (originalText.includes('$')) {
            const target = parseInt(originalText.replace('$', '').replace(',', ''));
            animateValue(counter, 0, target, 2000, '$');
        } else if (originalText.includes('%')) {
            const target = parseInt(originalText.replace('%', ''));
            animateValue(counter, 0, target, 2000, '', '%');
        } else {
            const target = parseInt(originalText.replace(',', ''));
            animateValue(counter, 0, target, 2000);
        }
    });
}

function animateValue(element, start, end, duration, prefix = '', suffix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        
        element.textContent = prefix + value.toLocaleString() + suffix;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ======== PARALLAX EFFECTS =========
function setupParallaxEffects() {
    const heroMedia = document.querySelector('.hero-media');
    
    if (heroMedia) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            heroMedia.style.transform = `translateY(${rate}px) scale(${1 + scrolled * 0.0002})`;
        });
    }
}

// ======== INTERACTIVE ELEMENTS =========
function setupInteractiveElements() {
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            // Remove existing ripples
            const existingRipples = this.querySelectorAll('.ripple');
            existingRipples.forEach(ripple => ripple.remove());
            
            const ripple = document.createElement('span');
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add hover effects to project cards
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        project.addEventListener('mouseenter', () => {
            project.style.transform = 'translateY(-8px)';
        });
        
        project.addEventListener('mouseleave', () => {
            project.style.transform = 'translateY(0)';
        });
    });

    // Add announcement bar pause on hover
    const announcementBar = document.querySelector('.announcement-bar');
    if (announcementBar) {
        announcementBar.addEventListener('mouseenter', () => {
            announcementBar.style.animationPlayState = 'paused';
        });
        
        announcementBar.addEventListener('mouseleave', () => {
            announcementBar.style.animationPlayState = 'running';
        });
    }

    // Add card hover effects
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// ======== BACK TO TOP =========
function setupBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ 
                top: 0, 
                behavior: "smooth" 
            });
        });
    }
}

// ======== ANIMATIONS =========
function setupAnimations() {
    // Add floating animation to hero features
    const heroFeatures = document.querySelectorAll('.hero-features li');
    heroFeatures.forEach((feature, index) => {
        feature.style.animationDelay = `${index * 0.1}s`;
        feature.classList.add('float-in');
    });

    // Add staggered animation to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('stagger-in');
    });

    // Add staggered animation to projects
    const projects = document.querySelectorAll('.project');
    projects.forEach((project, index) => {
        project.style.animationDelay = `${index * 0.15}s`;
        project.classList.add('stagger-in');
    });

    // Add loading animation
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
}

// ======== UTILITY FUNCTIONS =========
function updateCopyrightYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ======== PERFORMANCE OPTIMIZATIONS =========
// Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimized scroll handler
window.addEventListener('scroll', throttle(() => {
    // Scroll effects are handled by IntersectionObserver and individual functions
}, 10));

// ======== LOADING STATES =========
window.addEventListener('load', () => {
    // Add loaded class to body for any post-load animations
    document.body.classList.add('fully-loaded');
    
    // Ensure all animations trigger
    setTimeout(() => {
        const event = new Event('scroll');
        window.dispatchEvent(event);
    }, 100);
});

// ======== ERROR HANDLING =========
window.addEventListener('error', (e) => {
    console.error('Script error:', e.error);
});

// Global error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// ======== ADDITIONAL CSS FOR ANIMATIONS =========
// Inject CSS for additional animations and effects
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    /* Ripple effect */
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    /* Header scroll effects */
    .site-header.scrolled {
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(12px);
    }
    
    .site-header {
        transition: all 0.3s ease;
    }
    
    /* Enhanced announcement bar animations */
    .announcement-section {
        position: relative;
    }
    
    .announcement-section::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background: currentColor;
        transition: width 0.3s ease;
    }
    
    .announcement-section:hover::after {
        width: 100%;
    }
    
    /* Project card enhancements */
    .project-media::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, rgba(59,130,246,0.1), rgba(16,185,129,0.1));
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1;
    }
    
    .project:hover .project-media::before {
        opacity: 1;
    }
    
    /* Loading animation for progress bars */
    .progress {
        position: relative;
        overflow: hidden;
    }
    
    .progress::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        animation: shimmer 2s infinite;
    }
    
    @keyframes shimmer {
        0% { left: -100%; }
        100% { left: 100%; }
    }
    
    /* Monero orange accent */
    .project .fa-monero {
        color: var(--monero-orange) !important;
    }
    
    /* Enhanced loading states */
    body.fully-loaded .hero-title {
        animation: titleReveal 1s ease-out forwards;
    }
    
    @keyframes titleReveal {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Smooth transitions for all interactive elements */
    .card, .project, .btn, .nav a {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Performance optimizations */
    .hero-media, .project-media {
        transform: translateZ(0);
        backface-visibility: hidden;
        perspective: 1000px;
    }
`;
document.head.appendChild(additionalStyles);

// ======== BROWSER COMPATIBILITY =========
// Check for IntersectionObserver support
if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers
    console.warn('IntersectionObserver not supported, using fallback');
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('in-view');
    });
}

// Check for smooth scroll behavior support
if (!('scrollBehavior' in document.documentElement.style)) {
    console.warn('Smooth scroll not supported, using fallback');
    // Remove smooth scroll event listeners
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow default behavior for browsers without smooth scroll
        });
    });
}

// Initialize everything with error handling
try {
    console.log("🚀 Noticer Network - Enhanced home page loaded successfully!");
} catch (error) {
    console.error("Error initializing Noticer Network:", error);
}

// Export functions for potential module use (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeSite,
        setupNavigation,
        setupSmoothScroll,
        setupScrollEffects,
        setupBackToTop,
        setupAnimations,
        setupProgressBars,
        animateCounters
    };
}
