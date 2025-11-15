// ======== INITIALIZATION =========
document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 Noticer Network Homepage - Starting initialization...");
    initializeSite();
});

function initializeSite() {
    console.log("🛠️ Initializing homepage components...");
    
    // Basic setup that should always work
    updateCopyrightYear();
    setupNavigation();
    setupBackToTop();
    
    // Progressive enhancement
    try {
        setupSmoothScroll();
        setupScrollEffects();
        setupProgressBars();
        setupAnimations();
        console.log("✅ All homepage components initialized successfully");
    } catch (error) {
        console.warn("⚠️ Some homepage components failed to initialize:", error);
    }
}

// ======== BASIC UTILITIES =========
function updateCopyrightYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
        console.log("📅 Copyright year updated");
    }
}

// ======== NAVIGATION =========
function setupNavigation() {
    console.log("🧭 Setting up navigation...");
    
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');

    if (navToggle && nav) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = nav.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen);
            console.log("🍔 Mobile menu toggled:", isOpen);
        });

        // Close nav when clicking on a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close nav when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
                nav.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// ======== SMOOTH SCROLL =========
function setupSmoothScroll() {
    console.log("🎯 Setting up smooth scroll...");
    
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal page anchors
            if (href === '#' || href.startsWith('#!')) return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                const header = document.querySelector('.site-header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ======== SCROLL EFFECTS =========
function setupScrollEffects() {
    console.log("📜 Setting up scroll effects...");
    
    // Section reveal animation
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Animate progress bars when projects section is visible
                if (entry.target.id === 'projects') {
                    setTimeout(animateProgressBars, 300);
                    setTimeout(animateCounters, 500);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-50px 0px -50px 0px'
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// ======== PROGRESS BARS =========
function setupProgressBars() {
    console.log("📊 Setting up progress bars...");
    
    // Initialize all progress bars to 0
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        bar.style.width = '0%';
    });
}

function animateProgressBars() {
    console.log("🎬 Animating progress bars...");
    
    const progressBars = document.querySelectorAll('.progress');
    
    progressBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-target') + '%';
        
        // Reset to 0 for animation
        bar.style.width = '0%';
        
        // Animate after a small delay
        setTimeout(() => {
            bar.style.transition = 'width 1.2s ease-in-out';
            bar.style.width = targetWidth;
        }, 200);
    });
}

// ======== COUNTER ANIMATIONS =========
function animateCounters() {
    console.log("🔢 Animating counters...");
    
    const counters = document.querySelectorAll('.stat-value');
    
    counters.forEach(counter => {
        const text = counter.textContent;
        let target;
        
        if (text.includes('$')) {
            target = parseInt(text.replace('$', '').replace(',', ''));
            animateCounter(counter, 0, target, 2000, '$');
        } else if (text.includes('%')) {
            target = parseInt(text.replace('%', ''));
            animateCounter(counter, 0, target, 2000, '', '%');
        } else {
            target = parseInt(text.replace(',', ''));
            animateCounter(counter, 0, target, 2000);
        }
    });
}

function animateCounter(element, start, end, duration, prefix = '', suffix = '') {
    let startTime = null;
    
    function updateCounter(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const value = Math.floor(easeOutQuart * (end - start) + start);
        
        element.textContent = prefix + value.toLocaleString() + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// ======== BACK TO TOP =========
function setupBackToTop() {
    console.log("⬆️ Setting up back to top button...");
    
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
                behavior: 'smooth'
            });
        });
    }
}

// ======== ANIMATIONS =========
function setupAnimations() {
    console.log("🎨 Setting up animations...");
    
    // Add loading class to body
    document.body.classList.add('loaded');
    
    // Animate hero features
    const heroFeatures = document.querySelectorAll('.hero-features li');
    heroFeatures.forEach((feature, index) => {
        feature.style.animationDelay = (index * 0.1) + 's';
        feature.classList.add('float-in');
    });
    
    // Animate cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = (index * 0.1) + 's';
        card.classList.add('stagger-in');
    });
    
    // Animate projects
    const projects = document.querySelectorAll('.project');
    projects.forEach((project, index) => {
        project.style.animationDelay = (index * 0.15) + 's';
        project.classList.add('stagger-in');
    });
}

// ======== ERROR HANDLING =========
window.addEventListener('error', function(e) {
    console.error('❌ Homepage error:', e.error);
});

// Add some basic CSS for animations
const dynamicStyles = `
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
    
    .back-to-top {
        transition: all 0.3s ease;
    }
    
    .back-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .progress {
        transition: width 1.2s ease-in-out;
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

console.log("🎉 Noticer Network homepage initialization complete!");
