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

// Initialize everything
console.log("🚀 Noticer Network - Enhanced home page loaded!");

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .float-in {
        animation: floatIn 0.6s ease-out forwards;
        opacity: 0;
        transform: translateY(20px);
    }
    
    .stagger-in {
        animation: staggerIn 0.6s ease-out forwards;
        opacity: 0;
        transform: translateY(30px);
    }
    
    @keyframes floatIn {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes staggerIn {
        to {
            opacity: 1;
            transform: translateY(0);
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
