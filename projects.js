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
            title: "Noticer App",
            description: "A private, minimal platform for members to share thoughts, ideas, and creative works securely.",
            status: "active",
            category: "Platform",
            icon: "📱",
            progress: 45,
            details: {
                overview: "Building a privacy-first social platform where users can share ideas without surveillance. End-to-end encryption, zero data retention, and open-source transparency.",
                timeline: [
                    "Phase 1: Core infrastructure (Completed)",
                    "Phase 2: User authentication & profiles (In Progress)",
                    "Phase 3: Encrypted messaging (Q2 2024)",
                    "Phase 4: Mobile apps (Q3 2024)"
                ],
                techStack: ["Node.js", "React", "PostgreSQL", "WebRTC", "Signal Protocol"],
                teamSize: "3 developers, 1 designer",
                estimatedCompletion: "Q4 2024",
                budget: "$15,000",
                challenges: "Implementing robust encryption while maintaining usability",
                goals: "10,000 active users by end of 2024"
            },
            actions: [
                { label: "View Code", url: "#", icon: "fas fa-code" },
                { label: "Support Project", url: "donate.html", icon: "fas fa-heart" }
            ]
        },
        {
            id: 2,
            title: "Privacy Toolkit",
            description: "Comprehensive browser extension and mobile app for enhanced privacy protection.",
            status: "active",
            category: "Browser Extension",
            icon: "🔒",
            progress: 70,
            details: {
                overview: "All-in-one privacy solution featuring tracker blocking, fingerprint protection, and secure browsing enhancements.",
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
            title: "Decentralized Forum",
            description: "Community discussion platform built on distributed technology with no central control.",
            status: "planning",
            category: "Web Platform",
            icon: "💬",
            progress: 20,
            details: {
                overview: "Creating a censorship-resistant discussion platform using peer-to-peer technology and blockchain for moderation transparency.",
                timeline: [
                    "Technology research (Completed)",
                    "Protocol design (In Progress)",
                    "MVP development (Q3 2024)",
                    "Beta testing (Q1 2025)"
                ],
                techStack: ["IPFS", "LibP2P", "React", "Node.js", "Solidity"],
                teamSize: "4 developers, 1 community manager",
                estimatedCompletion: "Q2 2025",
                budget: "$25,000",
                challenges: "Balancing decentralization with performance",
                goals: "Become leading platform for uncensored discussion"
            },
            actions: [
                { label: "Join Discussion", url: "#", icon: "fas fa-comments" },
                { label: "Read Whitepaper", url: "#", icon: "fas fa-file-alt" }
            ]
        },
        {
            id: 4,
            title: "Educational Platform",
            description: "Open learning platform for privacy, security, and digital freedom topics.",
            status: "active",
            category: "Education",
            icon: "🎓",
            progress: 60,
            details: {
                overview: "Comprehensive educational resource with courses, tutorials, and community learning features focused on digital rights.",
                timeline: [
                    "Content creation (In Progress)",
                    "Platform development (In Progress)",
                    "Beta launch (Q3 2024)",
                    "Full release (Q4 2024)"
                ],
                techStack: ["Vue.js", "Python", "PostgreSQL", "Docker"],
                teamSize: "2 developers, 3 content creators",
                estimatedCompletion: "Q4 2024",
                budget: "$12,000",
                challenges: "Creating engaging content for technical and non-technical audiences",
                goals: "10,000 students in first year"
            },
            actions: [
                { label: "Preview Content", url: "#", icon: "fas fa-play" },
                { label: "Contribute", url: "#", icon: "fas fa-edit" }
            ]
        },
        {
            id: 5,
            title: "Secure File Sharing",
            description: "End-to-end encrypted file sharing service with self-destructing messages.",
            status: "completed",
            category: "Security Tool",
            icon: "📁",
            progress: 100,
            details: {
                overview: "Military-grade encrypted file sharing with optional expiration dates and zero-knowledge architecture.",
                timeline: [
                    "Protocol design (Completed)",
                    "Core development (Completed)",
                    "Security audit (Completed)",
                    "Public launch (Completed)"
                ],
                techStack: ["Go", "React", "WebCrypto API", "Redis"],
                teamSize: "3 developers, 1 security auditor",
                estimatedCompletion: "Completed",
                budget: "$18,000",
                challenges: "Implementing secure cryptography in browser environment",
                goals: "Maintain perfect security record"
            },
            actions: [
                { label: "Use Tool", url: "#", icon: "fas fa-external-link-alt" },
                { label: "View Code", url: "#", icon: "fas fa-code" }
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
                challenges: "Scaling infrastructure while maintaining privacy",
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
                            <a href="${action.url}" class="btn ${action.label.includes('Support') ? 'btn-primary' : 'btn-outline'}">
                                <i class="${action.icon}"></i>
                                ${action.label}
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

// ======== SCROLL EFFECTS =========
function setupScrollEffects() {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        },
        { threshold: 0.15 }
    );
    
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
