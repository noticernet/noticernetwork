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

    const projects = [
        {
            id: 'monero',
            title: 'Monero Network',
            description: 'Building privacy-focused tools and infrastructure for the Monero ecosystem to enhance financial privacy and freedom. Our initiative focuses on developing secure wallets, improving network privacy features, and creating educational resources for the Monero community.',
            status: 'Active Development',
            icon: '🕵️',
            color: 'monero',
            features: [
                {
                    icon: 'fas fa-shield-alt',
                    title: 'Enhanced Privacy',
                    description: 'Zero-knowledge proofs and ring signatures for untraceable transactions'
                },
                {
                    icon: 'fas fa-bolt',
                    title: 'Fast & Scalable',
                    description: 'Optimized nodes and improved transaction throughput'
                },
                {
                    icon: 'fas fa-globe',
                    title: 'Decentralized',
                    description: 'Distributed network resistant to censorship and control'
                },
                {
                    icon: 'fas fa-lock',
                    title: 'Secure Wallets',
                    description: 'Open-source wallet solutions with advanced security features'
                }
            ],
            stats: [
                { value: '75%', label: 'Development' },
                { value: '$25K', label: 'Funding Goal' },
                { value: 'Q4 2025', label: 'Target Launch' }
            ],
            funding: {
                current: 18500,
                goal: 25000,
                percent: 74
            },
            image: 'https://images.unsplash.com/photo-1550565118-3a14e8d03830?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&h=566&q=80'
        },
        {
            id: 'uncensored',
            title: 'Uncensored Platform',
            description: 'A decentralized social media platform that protects free speech and resists censorship through blockchain technology. Built with privacy-first principles, this platform ensures your voice cannot be silenced by centralized authorities.',
            status: 'Active Development',
            icon: '🗣️',
            color: 'default',
            features: [
                {
                    icon: 'fas fa-comment-slash',
                    title: 'Anti-Censorship',
                    description: 'Content cannot be removed by centralized authorities or governments'
                },
                {
                    icon: 'fas fa-user-secret',
                    title: 'User Privacy',
                    description: 'Anonymous posting and end-to-end encrypted communications'
                },
                {
                    icon: 'fas fa-network-wired',
                    title: 'Distributed',
                    description: 'Built on peer-to-peer technology with no central servers'
                },
                {
                    icon: 'fas fa-vote-yea',
                    title: 'Community Governance',
                    description: 'Users control platform rules through decentralized voting'
                }
            ],
            stats: [
                { value: '60%', label: 'Development' },
                { value: '$50K', label: 'Funding Goal' },
                { value: 'Q1 2026', label: 'Target Launch' }
            ],
            funding: {
                current: 28500,
                goal: 50000,
                percent: 57
            },
            image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&h=566&q=80'
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
    card.className = `project-card ${project.color}`;
    card.innerHTML = `
        <div class="project-hero">
            <img src="${project.image}" alt="${project.title}" class="project-hero-image" loading="lazy">
            <div class="project-hero-overlay">
                <div class="project-icon">${project.icon}</div>
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
                    <span class="progress-percent">${project.funding.percent}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress" style="width: ${project.funding.percent}%"></div>
                </div>
                <div class="funding-details">
                    <span class="funding-raised">$${project.funding.current.toLocaleString()} raised</span>
                    <span class="funding-goal">Goal: $${project.funding.goal.toLocaleString()}</span>
                </div>
            </div>
            
            <div class="project-actions">
                <button class="btn btn-primary" onclick="viewProjectDetails('${project.id}')">
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
        'monero': 'Monero Network Project',
        'uncensored': 'Uncensored Platform Project'
    };
    
    alert(`🚀 ${projectTitles[projectId]}\n\nThis feature is coming soon! You'll be able to view detailed information, technical specifications, and development updates for this project.`);
    
    // In a real implementation, this would:
    // 1. Open a detailed modal with project information
    // 2. Navigate to a project detail page
    // 3. Show development timeline and technical docs
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
            const project = this.getAttribute('data-project');
            openCodeModal(project);
        });
    });
}

function openCodeModal(projectName = '') {
    const modal = document.getElementById('codeModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Update modal content based on project
        if (projectName) {
            const modalTitle = modal.querySelector('h3');
            const modalText = modal.querySelector('p');
            if (modalTitle && modalText) {
                modalTitle.textContent = `Contribute to ${projectName.charAt(0).toUpperCase() + projectName.slice(1)}`;
                modalText.textContent = `The source code for the ${projectName} project is not yet publicly available as we're still in early development. Check back later for updates or join our community to get involved!`;
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

// Export functions for global access (if needed)
window.viewProjectDetails = viewProjectDetails;
window.openCodeModal = openCodeModal;
window.closeCodeModal = closeCodeModal;

console.log("🎉 Projects page JavaScript loaded successfully!");
