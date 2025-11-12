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
    setupCounters();
    setupNewsletter();
    updateCopyrightYear();
    setupParallax();
    setupTypewriter();
}

// ======== NAVIGATION =========
function setupNavigation() {
    const navToggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".nav");
    const header = document.querySelector(".site-header");

    if (navToggle && nav) {
        navToggle.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("open");
            navToggle.setAttribute("aria-expanded", isOpen);
        });

        // Close nav when clicking outside
        document.addEventListener("click", (e) => {
            if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
                nav.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
            }
        });

        // Close nav when clicking on a link
        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    // Header scroll effect
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }
}

// ======== SMOOTH SCROLL =========
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener("click", function(e) {
            if (this.getAttribute("href") === "#") return;
            
            const targetId = this.getAttribute("href");
            if (targetId.startsWith("#")) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.site-header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });
}

// ======== SCROLL EFFECTS =========
function setupScrollEffects() {
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '-50px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Trigger specific animations based on section
                if (entry.target.id === 'projects' || entry.target.classList.contains('projects')) {
                    setTimeout(() => {
                        animateProgressBars();
                        animateCounters();
                    }, 500);
                }
                
                if (entry.target.classList.contains('stats')) {
                    setTimeout(() => {
                        animateStats();
                    }, 300);
                }
            }
        });
    }, observerOptions);
    
    sections.forEach((section) => observer.observe(section));
}

// ======== PROGRESS BARS =========
function setupProgressBars() {
    // Progress bars will be animated when they come into view
}

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    progressBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-target');
        if (targetWidth) {
            setTimeout(() => {
                bar.style.width = targetWidth + '%';
            }, 200);
        }
    });
}

// ======== COUNTER ANIMATIONS =========
function setupCounters() {
    // Counters will be animated when they come into view
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format numbers with commas
            if (target >= 1000) {
                counter.textContent = Math.floor(current).toLocaleString();
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

function animateStats() {
    const statNumbers = document.querySelectorAll('.stats .stat-number[data-target]');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 1500;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format numbers with commas and add symbols
            if (target >= 1000) {
                stat.textContent = Math.floor(current).toLocaleString();
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 16);
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
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// ======== ANIMATIONS =========
function setupAnimations() {
    // Add floating animation to hero features
    const heroFeatures = document.querySelectorAll('.floating-card');
    heroFeatures.forEach((feature, index) => {
        feature.style.animationDelay = `${index * 0.5}s`;
    });

    // Add staggered animation to mission cards
    const missionCards = document.querySelectorAll('.mission-card');
    missionCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('stagger-in');
    });

    // Add hover effects to project cards
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(project => {
        project.addEventListener('mouseenter', () => {
            project.style.transform = 'translateY(-10px)';
        });
        
        project.addEventListener('mouseleave', () => {
            project.style.transform = 'translateY(-5px)';
        });
    });

    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
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
}

// ======== PARALLAX EFFECTS =========
function setupParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

// ======== TYPEWRITER EFFECT =========
function setupTypewriter() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    // Start typewriter when hero section is in view
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            typeWriter();
            observer.unobserve(heroTitle);
        }
    });

    observer.observe(heroTitle);
}

// ======== NEWSLETTER FORM =========
function setupNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            // Simulate subscription
            showToast('🎉 Welcome to the movement! You\'ll receive updates soon.');
            newsletterForm.reset();
            
            // Add some visual feedback
            const submitBtn = newsletterForm.querySelector('button');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribed!';
            submitBtn.style.background = 'var(--success)';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
            }, 2000);
        });
    }
}

// ======== UTILITY FUNCTIONS =========
function updateCopyrightYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

function showToast(message, duration = 3000) {
    // Remove existing toasts
    document.querySelectorAll('.toast').forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    // Add styles if not already present
    if (!document.querySelector('#toast-styles')) {
        const styles = document.createElement('style');
        styles.id = 'toast-styles';
        styles.textContent = `
            .toast {
                position: fixed;
                bottom: 30px;
                left: 50%;
                transform: translateX(-50%) translateY(30px);
                background: #fff;
                color: #000;
                padding: 16px 24px;
                border-radius: 12px;
                font-weight: 700;
                opacity: 0;
                transition: all 0.4s ease;
                z-index: 2000;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                font-size: 0.9rem;
                text-align: center;
                max-width: 300px;
            }
            .toast.show {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Animate out and remove
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, duration);
}

// ======== PERFORMANCE OPTIMIZATIONS =========
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

// Optimized scroll handler
window.addEventListener('scroll', debounce(() => {
    // Scroll effects are handled by IntersectionObserver
}, 10));

// ======== LOADING STATES =========
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for any post-load animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// ======== ERROR HANDLING =========
window.addEventListener('error', (e) => {
    console.error('Script error:', e.error);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .stagger-in {
        animation: staggerIn 0.8s ease-out forwards;
        opacity: 0;
        transform: translateY(30px);
    }
    
    @keyframes staggerIn {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .loaded .hero-title {
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
`;
document.head.appendChild(style);

// Initialize everything
console.log("🚀 Noticer Network - Advanced home page loaded!");
