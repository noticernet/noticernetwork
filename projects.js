// projects.js - Complete Project Loading Script

document.addEventListener("DOMContentLoaded", function() {
    console.log("🚀 Projects page initialized");
    setupNavigation();
    setupBackToTop();
    loadProjects();
    setupModal();
    setupScrollEffects();
});

// ======== PROJECT LOADING =========
function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    if (!projectsGrid) {
        console.error("❌ Projects grid element not found");
        return;
    }

    // Projects Data
    const projects = [
        {
            id: 1,
            title: "Monero Universe Hub",
            description: "A comprehensive Monero ecosystem platform featuring real-time price tracking, merchant directory, educational resources, and community tools.",
            status: "In Development",
            icon: "fab fa-monero",
            type: "monero",
            features: [
                {
                    icon: "fas fa-chart-line",
                    title: "Live XMR Price & Charts",
                    description: "Real-time Monero price with 1-second updates, interactive charts, and market analysis"
                },
                {
                    icon: "fas fa-store",
                    title: "Merchant Directory", 
                    description: "Global directory of 500+ merchants accepting Monero with reviews and categories"
                },
                {
                    icon: "fas fa-graduation-cap",
                    title: "Educational Resources",
                    description: "Comprehensive guides, tutorials, and documentation for Monero beginners and experts"
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
            },
            image: "moneronetwork.png"
        },
        {
            id: 2,
            title: "Uncensored Social Media App",
            description: "A privacy-focused, decentralized social media platform that guarantees free speech and protects user data from censorship and surveillance.",
            status: "In Development", 
            icon: "fas fa-comment-alt",
            type: "social",
            features: [
                {
                    icon: "fas fa-shield-alt",
                    title: "End-to-End Encryption",
                    description: "All messages and posts are encrypted with military-grade encryption"
                },
                {
                    icon: "fas fa-ban",
                    title: "No Censorship", 
                    description: "Decentralized architecture prevents any single entity from censoring content"
                },
                {
                    icon: "fas fa-user-secret",
                    title: "Complete Anonymity",
                    description: "Post and interact without revealing your identity or personal data"
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
            },
            image: "uncensoredapp.png"
        }
    ];

    projectsGrid.innerHTML = ''; // Clear any existing content

    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });

    // Re-attach event listeners for the new buttons
    attachContributeButtonListeners();
    
    console.log(`✅ Loaded ${projects.length} projects`);
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = `project-card ${project.type}`;
    
    // Calculate funding percentage
    const fundingPercent = Math.round((project.funding.raised / project.funding.goal) * 100);
    
    card.innerHTML = `
        <div class="project-hero">
            <img src="${project.image}" alt="${project.title}" class="project-hero-image" loading="lazy">
            <div class="project-hero-overlay">
                <div class="project-icon">
                    <i class="${project.icon}"></i>
                </div>
                <h3>${project.title}</h3>
            </div>
            <div class="project-status-badge">
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
            
            <div class="development-progress">
                <div class="progress-header">
                    <span>Development Progress</span>
                    <span class="progress-percent">${project.progress}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress" style="width: ${project.progress}%"></div>
                </div>
            </div>
            
            <div class="funding-progress">
                <div class="progress-header">
                    <span>Funding Progress</span>
                    <span class="progress-percent">${fundingPercent}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress" style="width: ${fundingPercent}%"></div>
                </div>
                <div class="funding-details">
                    <span class="funding-raised">$${project.funding.raised.toLocaleString()} raised</span>
                    <span class="funding-goal">Goal: $${project.funding.goal.toLocaleString()}</span>
                </div>
            </div>
            
            <div class="project-actions">
                <button class="btn btn-primary" onclick="viewProjectDetails(${project.id})">
                    <i class="fas fa-rocket"></i>Learn More
                </button>
                <button class="btn btn-outline contribute-btn" data-project="${project.id}">
                    <i class="fas fa-code"></i>Contribute
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function viewProjectDetails(projectId) {
    const projectTitles = {
        1: 'Monero Universe Hub',
        2: 'Uncensored Social Media App'
    };
    
    const projectDescriptions = {
        1: 'A comprehensive Monero ecosystem platform featuring real-time price tracking, merchant directory, educational resources, and community tools.',
        2: 'A privacy-focused, decentralized social media platform that guarantees free speech and protects user data from censorship and surveillance.'
    };
    
    alert(`🚀 ${projectTitles[projectId]}\n\n${projectDescriptions[projectId]}\n\nThis feature is coming soon! You'll be able to view detailed information, technical specifications, and development updates for this project.`);
}

// ======== MODAL FUNCTIONALITY =========
function setupModal() {
    const modal = document.getElementById('codeModal');
    const closeModal = document.querySelector('.close-modal');
    const contributeBtn = document.getElementById('contributeBtn');
    
    // Main CTA contribute button
    if (contributeBtn) {
        contributeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openCodeModal();
        });
    }
    
    // Close modal button
    if (closeModal) {
        closeModal.addEventListener('click', closeCodeModal);
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeCodeModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCodeModal();
        }
    });
}

function attachContributeButtonListeners() {
    const contributeBtns = document.querySelectorAll('.contribute-btn');
    
    contributeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            openCodeModal(projectId);
        });
    });
}

function openCodeModal(projectId = '') {
    const modal = document.getElementById('codeModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Update modal content based on project
        if (projectId) {
            const projectNames = {
                1: 'Monero Universe Hub',
                2: 'Uncensored Social Media App'
            };
            const modalTitle = modal.querySelector('h3');
            const modalText = modal.querySelector('p');
            if (modalTitle && modalText) {
                modalTitle.textContent = `Contribute to ${projectNames[projectId]}`;
                modalText.textContent = `The source code for the ${projectNames[projectId]} project is not yet publicly available as we're still in early development. Check back later for updates or join our community to get involved!`;
            }
        }
    }
}

function closeCodeModal() {
    const modal = document.getElementById('codeModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
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
            const isOpen = nav.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', isOpen);
            console.log("🍔 Mobile menu toggled:", isOpen);
        });

        // Close nav when clicking on a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close nav when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
                nav.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// ======== BACK TO TOP =========
function setupBackToTop() {
    console.log("⬆️ Setting up back to top button...");
    
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
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

// ======== SCROLL EFFECTS =========
function setupScrollEffects() {
    console.log("📜 Setting up scroll effects...");
    
    // Add scroll-triggered animations for project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Set initial state and observe each card
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// ======== PROGRESS BARS ANIMATION =========
function animateProgressBars() {
    console.log("🎬 Animating progress bars...");
    
    const progressBars = document.querySelectorAll('.progress');
    
    progressBars.forEach(bar => {
        const currentWidth = bar.style.width;
        bar.style.width = '0%';
        
        // Animate after a small delay
        setTimeout(() => {
            bar.style.transition = 'width 1.2s ease-in-out';
            bar.style.width = currentWidth;
        }, 200);
    });
}

// ======== ERROR HANDLING =========
window.addEventListener('error', function(e) {
    console.error('❌ Projects page error:', e.error);
});

// Export functions for global access
window.viewProjectDetails = viewProjectDetails;
window.openCodeModal = openCodeModal;
window.closeCodeModal = closeCodeModal;

console.log("🎉 Projects page JavaScript loaded successfully!");
