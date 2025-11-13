// ======== INITIALIZATION =========
document.addEventListener("DOMContentLoaded", () => {
    initializeProjects();
});

function initializeProjects() {
    setupNavigation();
    setupProjects();
    setupScrollEffects();
    setupBackToTop();
    setupAnimations();
    setupModal();
}

// ======== NAVIGATION =========
function setupNavigation() {
    const navToggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".nav");
    
    if (navToggle && nav) {
        navToggle.addEventListener("click", () => {
            nav.classList.toggle("open");
            navToggle.textContent = nav.classList.contains("open") ? "✕" : "☰";
        });
        
        document.addEventListener("click", (e) => {
            if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
                nav.classList.remove("open");
                navToggle.textContent = "☰";
            }
        });
    }
}

// ======== PROJECTS DATA & SETUP =========
function setupProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;

    const projects = [
        {
            id: 1,
            title: "Uncensored Social Media App",
            description: "A censorship-resistant platform with end-to-end encryption, crypto payments, and no tracking.",
            status: "active",
            category: "Platform",
            icon: "📱",
            progress: 12,
            details: {
                overview: "Building a decentralized social platform where free speech is permanent and protected by design. No censorship, no tracking, just open communication with full encryption.",
                timeline: [
                    "Planning & Architecture (Completed)",
                    "Core Infrastructure (In Progress)",
                    "Encrypted Messaging (Q3 2024)",
                    "Mobile Apps (Q1 2025)",
                    "Full Launch (Mid 2026)"
                ],
                techStack: ["HTML5", "CSS3", "JavaScript", "Node.js", "React", "PostgreSQL", "WebRTC", "Signal Protocol"],
                teamSize: "3 developers, 1 designer",
                estimatedCompletion: "Mid 2026",
                budget: "$10,000",
                challenges: "Implementing robust encryption while maintaining usability across all platforms",
                goals: "10,000 active users by end of 2026"
            },
            funding: {
                raised: 1208,
                goal: 10000,
                backers: 245,
                percent: 12
            },
            features: [
                "Fully uncensored content platform",
                "End-to-end encrypted chats",
                "Encrypted voice and video calls",
                "Secure file sharing in DMs",
                "No third-party trackers",
                "Tor website accessibility",
                "Crypto payment options",
                "Creator monetization",
                "Web, Android, and iOS apps"
            ],
            actions: [
                { label: "View Code", url: "#", icon: "fas fa-code", action: "view-code" },
                { label: "Support Project", url: "donate.html", icon: "fas fa-heart" }
            ]
        },
        {
            id: 2,
            title: "Privacy Toolkit",
            description: "Open-source tools and resources to protect your digital privacy and security.",
            status: "active",
            category: "Security Tools",
            icon: "🔒",
            progress: 70,
            details: {
                overview: "Comprehensive browser extension and mobile app for enhanced privacy protection against tracking and surveillance.",
                timeline: [
                    "Research & planning (Completed)",
                    "Core extension development (Completed)",
                    "Mobile app development (In Progress)",
                    "Security audit (Q3 2024)"
                ],
                techStack: ["JavaScript", "Swift", "Kotlin", "WebExtensions API"],
                teamSize: "2 developers, 1 security researcher",
                estimatedCompletion: "Q3 2024",
                budget: "$8,000",
                challenges: "Maintaining compatibility across browsers and devices",
                goals: "50,000 installs in first year"
            },
            actions: [
                { label: "Test Beta", url: "#", icon: "fas fa-flask" },
                { label: "Report Issues", url: "#", icon: "fas fa-bug" }
            ]
        },
        {
            id: 3,
            title: "Truth Archive",
            description: "Decentralized library for preserving censored documents and historical records.",
            status: "coming-soon",
            category: "Information",
            icon: "📚",
            progress: 0,
            details: {
                overview: "Creating a censorship-resistant archive using peer-to-peer technology to ensure information can never be erased.",
                timeline: [
                    "Technology research (Planned)",
                    "Protocol design (Planned)",
                    "MVP development (TBD)",
                    "Beta testing (TBD)"
                ],
                techStack: ["IPFS", "LibP2P", "React", "Node.js"],
                teamSize: "TBD",
                estimatedCompletion: "TBD",
                budget: "TBD",
                challenges: "Balancing decentralization with performance and accessibility",
                goals: "Preserve critical information for future generations"
            },
            actions: [
                { label: "Learn More", url: "#", icon: "fas fa-info" }
            ]
        },
        {
            id: 4,
            title: "Secure Communications",
            description: "End-to-end encrypted messaging and email alternative.",
            status: "coming-soon",
            category: "Communication",
            icon: "✉️",
            progress: 0,
            details: {
                overview: "Building a secure alternative to mainstream communication platforms with military-grade encryption.",
                timeline: [
                    "Protocol design (Planned)",
                    "Core development (Planned)",
                    "Security audit (TBD)",
                    "Public launch (TBD)"
                ],
                techStack: ["Signal Protocol", "React Native", "Node.js"],
                teamSize: "TBD",
                estimatedCompletion: "TBD",
                budget: "TBD",
                challenges: "Creating user-friendly encryption for non-technical users",
                goals: "Provide secure communication for activists and journalists"
            },
            actions: [
                { label: "Join Waitlist", url: "#", icon: "fas fa-list" }
            ]
        },
        {
            id: 5,
            title: "Digital Identity Protection",
            description: "Tools to help protect and manage your digital identity.",
            status: "coming-soon",
            category: "Security",
            icon: "🆔",
            progress: 0,
            details: {
                overview: "Developing solutions to help users protect their digital footprint and maintain privacy online.",
                timeline: [
                    "Research phase (Planned)",
                    "Tool development (Planned)",
                    "Beta testing (TBD)",
                    "Public release (TBD)"
                ],
                techStack: ["TBD"],
                teamSize: "TBD",
                estimatedCompletion: "TBD",
                budget: "TBD",
                challenges: "Creating effective tools against sophisticated tracking",
                goals: "Help users reclaim control of their digital identity"
            },
            actions: [
                { label: "Learn More", url: "#", icon: "fas fa-info" }
            ]
        },
        {
            id: 6,
            title: "Community VPN",
            description: "Privacy-focused VPN service operated and funded by the community.",
            status: "planning",
            category: "Infrastructure",
            icon: "🌐",
            progress: 15,
            details: {
                overview: "Building a transparent, community-operated VPN service with no logs and open-source clients.",
                timeline: [
                    "Infrastructure planning (In Progress)",
                    "Client development (Q3 2024)",
                    "Beta testing (Q4 2024)",
                    "Public launch (Q1 2025)"
                ],
                techStack: ["WireGuard", "Go", "React Native", "Kubernetes"],
                teamSize: "3 developers, 2 sysadmins",
                estimatedCompletion: "Q1 2025",
                budget: "$30,000",
                challenges: "Scaling infrastructure while maintaining privacy and performance",
                goals: "10,000 simultaneous users with 99.9% uptime"
            },
            actions: [
                { label: "Join Waitlist", url: "#", icon: "fas fa-list" },
                { label: "Learn More", url: "#", icon: "fas fa-info" }
            ]
        }
    ];

    function renderProjects() {
        projectsGrid.innerHTML = '';
        projects.forEach(project => {
            const projectElement = createProjectElement(project);
            projectsGrid.appendChild(projectElement);
        });
        updateProgressStats(projects);
    }

    function createProjectElement(project) {
        const projectElement = document.createElement('div');
        projectElement.className = 'project-card';
        
        // Funding section for active project
        const fundingSection = project.funding ? `
            <div class="details-section">
                <h4>Funding Progress</h4>
                <div class="progress-wrapper">
                    <div class="progress-label">
                        <span>$${project.funding.raised.toLocaleString()} raised</span>
                        <span>of $${project.funding.goal.toLocaleString()}</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${project.funding.percent}%"></div>
                    </div>
                </div>
                <p>${project.funding.percent}% funded • ${project.funding.backers} backers</p>
            </div>
        ` : '';
        
        // Features section
        const featuresSection = project.features ? `
            <div class="details-section">
                <h4>Key Features</h4>
                <div class="timeline">
                    ${project.features.map(feature => `
                        <div class="timeline-item">
                            <div class="timeline-marker"></div>
                            <div class="timeline-content">
                                <span>${feature}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : '';

        projectElement.innerHTML = `
            <div class="project-header">
                <div class="project-icon">${project.icon}</div>
                <div class="project-basic-info">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-meta">
                        <span class="project-status status-${project.status}">${project.status}</span>
                        <span class="project-category">${project.category}</span>
                    </div>
                </div>
                <button class="project-toggle" aria-label="Toggle project details">
                    <i class="fas fa-chevron-down"></i>
                </button>
            </div>
            <div class="project-details">
                <div class="details-content">
                    <div class="details-section">
                        <h4>Project Overview</h4>
                        <p>${project.details.overview}</p>
                    </div>
                    
                    ${fundingSection}
                    
                    <div class="details-section">
                        <h4>Development Progress</h4>
                        <div class="progress-wrapper">
                            <div class="progress-label">
                                <span>Overall Progress</span>
                                <span>${project.progress}%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${project.progress}%"></div>
                            </div>
                        </div>
                    </div>
                    
                    ${featuresSection}
                    
                    <div class="details-section">
                        <h4>Development Timeline</h4>
                        <div class="timeline">
                            ${project.details.timeline.map(item => `
                                <div class="timeline-item">
                                    <div class="timeline-marker"></div>
                                    <div class="timeline-content">
                                        <span>${item}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="details-section">
                        <h4>Technical Stack</h4>
                        <div class="tech-stack">
                            ${project.details.techStack.map(tech => `
                                <span class="tech-tag">${tech}</span>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="details-section">
                        <h4>Project Details</h4>
                        <p><strong>Team Size:</strong> ${project.details.teamSize}</p>
                        <p><strong>Estimated Completion:</strong> ${project.details.estimatedCompletion}</p>
                        <p><strong>Budget:</strong> ${project.details.budget}</p>
                        <p><strong>Main Challenge:</strong> ${project.details.challenges}</p>
                        <p><strong>Primary Goal:</strong> ${project.details.goals}</p>
                    </div>
                    
                    <div class="project-actions">
                        ${project.actions.map(action => `
                            <a href="${action.url}" class="btn ${action.label.includes('Support') ? 'btn-primary' : 'btn-outline'}" 
                               ${action.action ? `data-action="${action.action}"` : ''}>
                                <i class="${action.icon}"></i>${action.label}
                            </a>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        // Add toggle functionality
        const toggleBtn = projectElement.querySelector('.project-toggle');
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            projectElement.classList.toggle('active');
        });

        // Close other projects when opening one
        projectElement.addEventListener('click', (e) => {
            if (!e.target.closest('.project-toggle')) {
                const allProjects = document.querySelectorAll('.project-card');
                allProjects.forEach(p => {
                    if (p !== projectElement) {
                        p.classList.remove('active');
                    }
                });
                projectElement.classList.add('active');
            }
        });

        return projectElement;
    }

    function updateProgressStats(projects) {
        const totalProjects = document.getElementById('totalProjects');
        const activeProjects = document.getElementById('activeProjects');
        const completedProjects = document.getElementById('completedProjects');
        
        if (totalProjects) totalProjects.textContent = projects.length;
        if (activeProjects) {
            const activeCount = projects.filter(p => p.status === 'active').length;
            activeProjects.textContent = activeCount;
        }
        if (completedProjects) {
            const completedCount = projects.filter(p => p.status === 'completed').length;
            completedProjects.textContent = completedCount;
        }
    }

    renderProjects();
}

// ======== MODAL FUNCTIONALITY =========
function setupModal() {
    const codeModal = document.getElementById('codeModal');
    const closeModal = document.querySelector('.close-modal');
    
    if (codeModal && closeModal) {
        // Close modal when clicking the close button
        closeModal.addEventListener('click', function() {
            codeModal.style.display = 'none';
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === codeModal) {
                codeModal.style.display = 'none';
            }
        });
        
        // Add event listeners to "View Code" buttons
        document.addEventListener('click', function(e) {
            if (e.target.closest('[data-action="view-code"]')) {
                e.preventDefault();
                codeModal.style.display = 'flex';
            }
        });
    }
}

// ======== SCROLL EFFECTS =========
function setupScrollEffects() {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.15 });

    sections.forEach((section) => observer.observe(section));
}

// ======== BACK TO TOP =========
function setupBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
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
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('active')) {
                card.style.transform = 'translateY(-5px)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('active')) {
                card.style.transform = 'translateY(0)';
            }
        });
    });
}

// Initialize everything
console.log("🚀 Noticer Network Projects - Enhanced functionality loaded!");
