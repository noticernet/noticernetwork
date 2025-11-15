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
}

// ======== SMOOTH SCROLL =========
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
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
    const observer = new IntersectionObserver(
        (entries) => {
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
        },
        { 
            threshold: 0.15,
            rootMargin: '-50px 0px -50px 0px'
        }
    );
    
    sections.forEach((section) => observer.observe(section));
}

// ======== PROGRESS BARS =========
function setupProgressBars() {
    // Progress bars will be animated when they come into view
}

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    progressBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-target') + '%';
        bar.style.width = targetWidth;
    });
}

// ======== FUNDING COUNTER =========
function setupFundingCounter() {
    // Counter animation for funding stats
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-value');
    
    counters.forEach(counter => {
        const text = counter.textContent;
        let target;
        
        if (text.includes('$')) {
            target = parseInt(text.replace('$', '').replace(',', ''));
        } else if (text.includes('%')) {
            target = parseInt(text.replace('%', ''));
        } else {
            target = parseInt(text.replace(',', ''));
        }
        
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (text.includes('$')) {
                counter.textContent = '$' + Math.floor(current).toLocaleString();
            } else if (text.includes('%')) {
                counter.textContent = Math.floor(current) + '%';
            } else {
                counter.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    });
}

// ======== PARALLAX EFFECTS =========
function setupParallaxEffects() {
    const heroMedia = document.querySelector('.hero-media');
    
    if (heroMedia) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroMedia.style.transform = `translateY(${rate}px)`;
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

    // Add hover effects to project cards
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        project.addEventListener('mouseenter', () => {
            project.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        project.addEventListener('mouseleave', () => {
            project.style.transform = 'translateY(0) scale(1)';
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

    // Special styling for Monero project
    const moneroProject = document.querySelector('.project .fa-monero').closest('.project');
    if (moneroProject) {
        moneroProject.style.borderTop = '3px solid var(--monero-orange)';
    }
}

// ======== BACK TO TOP =========
function setupBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
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

// Add CSS for additional animations
const style = document.createElement('style');
style.textContent = `
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
`;
document.head.appendChild(style);

// Initialize everything
console.log("🚀 Noticer Network - Enhanced home page loaded with 2 featured projects!");
