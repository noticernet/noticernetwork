// Projects Data
const projects = [
    {
        id: 1,
        title: "Monero Network",
        description: "A comprehensive Monero ecosystem platform featuring real-time price tracking, merchant directory, educational resources, and community tools.",
        status: "In Development",
        icon: "fab fa-monero",
        type: "monero",
        image: "moneronetwork.png",
        features: [
            {
                icon: "fas fa-chart-line",
                title: "Live XMR Price & Charts",
                description: "Real-time Monero price with 1-second updates, interactive charts, and market analysis"
            },
            {
                icon: "fas fa-store",
                title: "Merchant Directory",
                description: "Global directory of businesses accepting Monero with reviews and verification system"
            },
            {
                icon: "fas fa-graduation-cap",
                title: "Educational Portal",
                description: "Comprehensive guides, tutorials, and resources for Monero beginners and experts"
            },
            {
                icon: "fas fa-comments",
                title: "Community Forum",
                description: "Decentralized discussion platform for Monero enthusiasts and developers"
            },
            {
                icon: "fas fa-tools",
                title: "Developer Tools",
                description: "APIs, SDKs, and integration tools for Monero-based application development"
            },
            {
                icon: "fas fa-shield-alt",
                title: "Privacy Resources",
                description: "Best practices, security guides, and privacy-enhancing tools for Monero users"
            }
        ],
        stats: [
            { value: "Live", label: "Price Tracking" },
            { value: "500+", label: "Merchants" },
            { value: "24/7", label: "Community" }
        ],
        progress: 45,
        funding: {
            raised: 18500,
            goal: 40000
        }
    },
    {
        id: 2,
        title: "Uncensored Social Media App",
        description: "A privacy-focused, decentralized social media platform that guarantees free speech and protects user data from censorship and surveillance.",
        status: "In Development",
        icon: "fas fa-comment-alt",
        type: "social",
        image: "uncensoredapp.png",
        features: [
            {
                icon: "fas fa-ban",
                title: "No Censorship",
                description: "Truly free speech platform with no content moderation based on political views"
            },
            {
                icon: "fas fa-user-secret",
                title: "Complete Privacy",
                description: "End-to-end encryption, no data collection, and anonymous posting options"
            },
            {
                icon: "fas fa-network-wired",
                title: "Decentralized Network",
                description: "Distributed architecture resistant to takedowns and single points of failure"
            },
            {
                icon: "fas fa-mobile-alt",
                title: "Cross-Platform",
                description: "Native apps for all devices with seamless synchronization"
            },
            {
                icon: "fas fa-wallet",
                title: "Crypto Integration",
                description: "Built-in cryptocurrency wallet and monetization features for creators"
            },
            {
                icon: "fas fa-users",
                title: "Community Governance",
                description: "Users collectively decide platform rules and development through voting"
            }
        ],
        stats: [
            { value: "Beta", label: "Version" },
            { value: "2.5k", label: "Test Users" },
            { value: "E2E", label: "Encryption" }
        ],
        progress: 65,
        funding: {
            raised: 32400,
            goal: 50000
        }
    }
];

// DOM Elements
const projectsGrid = document.getElementById('projectsGrid');
const backToTopBtn = document.querySelector('.back-to-top');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
const codeModal = document.getElementById('codeModal');
const closeModal = document.querySelector('.close-modal');
const contributeBtn = document.getElementById('contributeBtn');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderProjects();
    setupEventListeners();
    setupScrollEffects();
    updateProgressStats();
});

// Render projects to the grid
function renderProjects() {
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

// Create project card HTML
function createProjectCard(project) {
    const progressPercent = Math.round((project.funding.raised / project.funding.goal) * 100);
    const raisedFormatted = formatCurrency(project.funding.raised);
    const goalFormatted = formatCurrency(project.funding.goal);
    
    return document.createRange().createContextualFragment(`
        <div class="project-card ${project.type}">
            <div class="project-hero">
                <img src="${project.image}" alt="${project.title}" class="project-hero-image">
                <div class="project-hero-overlay">
                    <div class="project-icon">
                        <i class="${project.icon}"></i>
                    </div>
                    <h3>${project.title}</h3>
                    <span class="project-status">${project.status}</span>
                </div>
            </div>
            
            <div class="project-body">
                <p class="project-description">${project.description}</p>
                
                <div class="features-grid">
                    ${project.features.map(feature => `
                        <div class="feature-item">
                            <i class="${feature.icon}"></i>
                            <div class="feature-text">
                                <strong>${feature.title}</strong>
                                <span>${feature.description}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="project-stats">
                    ${project.stats.map(stat => `
                        <div class="stat-item">
                            <div class="stat-value">${stat.value}</div>
                            <div class="stat-label">${stat.label}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="funding-progress">
                    <div class="progress-header">
                        <span>Funding Progress</span>
                        <span class="progress-percent">${progressPercent}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${progressPercent}%"></div>
                    </div>
                    <div class="funding-details">
                        <span class="funding-raised">$${raisedFormatted} raised</span>
                        <span class="funding-goal">of $${goalFormatted} goal</span>
                    </div>
                </div>
                
                <div class="project-actions">
                    <a href="donate.html" class="btn btn-primary">
                        <i class="fas fa-donate"></i>Support Project
                    </a>
                    <button class="btn btn-outline view-code" data-project="${project.title}">
                        <i class="fas fa-code"></i>View Code
                    </button>
                </div>
            </div>
        </div>
    `).firstElementChild;
}

// Format currency
function formatCurrency(amount) {
    return amount.toLocaleString();
}

// Setup event listeners
function setupEventListeners() {
    // Navigation toggle
    navToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });

    // Close navigation when clicking outside
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !navToggle.contains(event.target)) {
            nav.classList.remove('active');
        }
    });

    // Back to top button
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Code modal
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('view-code') || event.target === contributeBtn) {
            codeModal.classList.add('active');
        }
    });

    closeModal.addEventListener('click', function() {
        codeModal.classList.remove('active');
    });

    // Close modal when clicking outside
    codeModal.addEventListener('click', function(event) {
        if (event.target === codeModal) {
            codeModal.classList.remove('active');
        }
    });
}

// Setup scroll effects
function setupScrollEffects() {
    window.addEventListener('scroll', function() {
        // Back to top button
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
        
        // Header shadow
        const header = document.querySelector('.site-header');
        if (window.pageYOffset > 50) {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
}

// Update progress stats
function updateProgressStats() {
    const totalProjects = projects.length;
    const activeProjects = projects.filter(p => p.status === 'In Development').length;
    const completedProjects = projects.filter(p => p.status === 'Completed').length;
    const comingSoon = projects.filter(p => p.status === 'Coming Soon').length;
    
    // Update the stats in the progress section
    const stats = document.querySelectorAll('.progress-stat .stat-number');
    if (stats.length >= 4) {
        stats[0].textContent = totalProjects;
        stats[1].textContent = activeProjects;
        stats[2].textContent = completedProjects;
        stats[3].textContent = comingSoon;
    }
}

// Add some interactive animations
function setupAnimations() {
    // Animate project cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize animations after a short delay
setTimeout(setupAnimations, 100);

console.log('🚀 Noticer Network Projects Page Loaded!');
