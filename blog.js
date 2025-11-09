// ======== INITIALIZATION =========
document.addEventListener("DOMContentLoaded", () => {
    initializeBlog();
});

function initializeBlog() {
    setupNavigation();
    setupBlogPosts();
    setupResources();
    setupNewsletter();
    setupModal();
    setupScrollEffects();
    setupBackToTop();
    setupTabs();
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

// ======== BLOG POSTS =========
function setupBlogPosts() {
    const blogGrid = document.getElementById('blogGrid');
    const loadMoreBtn = document.getElementById('loadMore');
    let currentPage = 1;
    const postsPerPage = 8;

    // Combined content data - blog posts, resources, books, tools
    const allContent = [
        // Blog Posts
        {
            id: 1,
            title: "The Art of Noticing: Cultivating Awareness in a Distracted World",
            excerpt: "Exploring techniques to enhance observation skills and maintain presence in an increasingly noisy digital landscape.",
            category: "blog",
            readTime: "8 min read",
            date: "2024-01-15",
            icon: "🔍",
            type: "Article"
        },
        {
            id: 2,
            title: "Privacy in the Age of Surveillance Capitalism",
            excerpt: "Understanding how personal data has become the new currency and what we can do to protect our digital sovereignty.",
            category: "blog",
            readTime: "12 min read",
            date: "2024-01-12",
            icon: "🛡️",
            type: "Article"
        },
        {
            id: 3,
            title: "Decentralized Networks: The Future of Digital Communication",
            excerpt: "How peer-to-peer technologies are reshaping our online interactions and challenging centralized platforms.",
            category: "blog",
            readTime: "10 min read",
            date: "2024-01-08",
            icon: "🌐",
            type: "Article"
        },
        {
            id: 4,
            title: "The Psychology of Mass Movements",
            excerpt: "Analyzing the cognitive patterns that drive collective behavior and social transformations throughout history.",
            category: "blog",
            readTime: "15 min read",
            date: "2024-01-05",
            icon: "👥",
            type: "Article"
        },

        // Resources
        {
            id: 5,
            title: "TrackAIPAC",
            excerpt: "Research and analysis platform tracking political influence and lobbying activities.",
            category: "resources",
            url: "https://trackaipac.com",
            icon: "📊",
            type: "Research"
        },
        {
            id: 6,
            title: "Europa The Last Battle",
            excerpt: "Comprehensive historical documentary series exploring modern European history.",
            category: "resources",
            url: "https://europathelastbattle.com",
            icon: "🎬",
            type: "Documentary"
        },

        // Books
        {
            id: 7,
            title: "The Age of Surveillance Capitalism",
            excerpt: "Shoshana Zuboff's groundbreaking analysis of the new economic order that threatens human autonomy.",
            category: "books",
            author: "Shoshana Zuboff",
            icon: "📖",
            type: "Non-fiction"
        },
        {
            id: 8,
            title: "Permanent Record",
            excerpt: "Edward Snowden's memoir about surveillance, democracy, and the price of truth.",
            category: "books",
            author: "Edward Snowden",
            icon: "🕵️",
            type: "Memoir"
        },

        // Tools
        {
            id: 9,
            title: "Tor Browser",
            excerpt: "Web browser for anonymous communication and browsing. Essential for privacy-conscious users.",
            category: "tools",
            url: "https://www.torproject.org",
            icon: "🧅",
            type: "Browser"
        },
        {
            id: 10,
            title: "Mullvad VPN",
            excerpt: "Privacy-first VPN service that doesn't require personal information and accepts anonymous payments.",
            category: "tools",
            url: "https://mullvad.net",
            icon: "🔒",
            type: "VPN"
        }
    ];

    function renderContent(contentToRender) {
        contentToRender.forEach(item => {
            const contentElement = document.createElement('article');
            contentElement.className = `blog-card ${item.category}`;
            
            let metaHTML = '';
            let footerHTML = '';

            if (item.category === 'blog') {
                metaHTML = `
                    <div class="blog-card-meta">
                        <span class="blog-card-category">${item.type}</span>
                        <span>${formatDate(item.date)}</span>
                    </div>
                `;
                footerHTML = `
                    <div class="blog-card-footer">
                        <span class="read-time">${item.readTime}</span>
                        <a href="#" class="read-more">Read More →</a>
                    </div>
                `;
            } else {
                metaHTML = `
                    <div class="blog-card-meta">
                        <span class="blog-card-category">${item.type}</span>
                    </div>
                `;
                if (item.url) {
                    footerHTML = `
                        <div class="blog-card-footer">
                            <span class="resource-type">${item.category}</span>
                            <button class="visit-btn" data-name="${item.title}" data-url="${item.url}">Visit</button>
                        </div>
                    `;
                } else {
                    footerHTML = `
                        <div class="blog-card-footer">
                            <span class="resource-type">${item.category}</span>
                            ${item.author ? `<span class="muted">by ${item.author}</span>` : ''}
                        </div>
                    `;
                }
            }

            contentElement.innerHTML = `
                <div class="blog-card-image">
                    ${item.icon}
                </div>
                <div class="blog-card-content">
                    ${metaHTML}
                    <h3>${item.title}</h3>
                    <p>${item.excerpt}</p>
                    ${footerHTML}
                </div>
            `;
            blogGrid.appendChild(contentElement);
        });

        // Add click events to visit buttons
        blogGrid.querySelectorAll('.visit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const name = btn.dataset.name;
                const url = btn.dataset.url;
                openWebsiteModal(name, url);
            });
        });
    }

    function loadContent(page = 1) {
        const startIndex = (page - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const contentToLoad = allContent.slice(startIndex, endIndex);
        
        renderContent(contentToLoad);
        
        // Hide load more button if no more content
        if (endIndex >= allContent.length) {
            loadMoreBtn.style.display = 'none';
        }
    }

    // Initial load
    loadContent(currentPage);

    // Load more functionality
    loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        loadContent(currentPage);
    });

    // Update counts
    document.getElementById('postCount').textContent = allContent.filter(item => item.category === 'blog').length;
    document.getElementById('resourceCount').textContent = allContent.filter(item => item.category === 'resources').length;
    document.getElementById('bookCount').textContent = allContent.filter(item => item.category === 'books').length;
}

// ======== RESOURCES =========
function setupResources() {
    // Sample resources data
    const resources = {
        websites: [
            {
                name: "TrackAIPAC",
                description: "Research platform tracking political influence and lobbying activities with comprehensive data analysis.",
                url: "https://trackaipac.com",
                type: "Research",
                icon: "📊"
            },
            {
                name: "Europa The Last Battle",
                description: "Documentary series exploring modern European history and geopolitical developments.",
                url: "https://europathelastbattle.com",
                type: "Documentary",
                icon: "🎬"
            },
            {
                name: "WikiLeaks",
                description: "Organization publishing news leaks and classified media from anonymous sources.",
                url: "https://wikileaks.org",
                type: "Journalism",
                icon: "📰"
            },
            {
                name: "The Intercept",
                description: "Nonprofit news organization dedicated to investigative journalism in the public interest.",
                url: "https://theintercept.com",
                type: "Journalism",
                icon: "🔍"
            },
            {
                name: "Bellingcat",
                description: "Independent international collective of researchers using open source and social media investigation.",
                url: "https://www.bellingcat.com",
                type: "Research",
                icon: "🕵️"
            },
            {
                name: "Library Genesis",
                description: "Database of books and articles providing free access to knowledge and research materials.",
                url: "http://libgen.rs",
                type: "Library",
                icon: "📚"
            },
            {
                name: "Archived Today",
                description: "Web archiving service for preserving digital content and preventing link rot.",
                url: "https://archive.today",
                type: "Archive",
                icon: "💾"
            },
            {
                name: "12ft Ladder",
                description: "Service to remove paywalls and signup walls from news articles and publications.",
                url: "https://12ft.io",
                type: "Tool",
                icon: "🪜"
            }
        ],
        books: [
            {
                name: "The Age of Surveillance Capitalism",
                description: "Shoshana Zuboff's groundbreaking analysis of the new economic order that threatens human autonomy.",
                author: "Shoshana Zuboff",
                type: "Non-fiction",
                icon: "📖"
            },
            {
                name: "Permanent Record",
                description: "Edward Snowden's memoir about surveillance, democracy, and the price of truth.",
                author: "Edward Snowden",
                type: "Memoir",
                icon: "🕵️"
            },
            {
                name: "The Sovereign Individual",
                description: "Predicting the shift from industrial to information societies and its implications.",
                author: "James Dale Davidson",
                type: "Economics",
                icon: "👑"
            },
            {
                name: "Cryptonomicon",
                description: "Neal Stephenson's novel exploring cryptography, information warfare, and digital freedom.",
                author: "Neal Stephenson",
                type: "Fiction",
                icon: "🔐"
            },
            {
                name: "1984",
                description: "George Orwell's classic dystopian novel about totalitarianism and surveillance society.",
                author: "George Orwell",
                type: "Fiction",
                icon: "👁️"
            },
            {
                name: "Brave New World",
                description: "Aldous Huxley's vision of a technologically advanced future society and its costs.",
                author: "Aldous Huxley",
                type: "Fiction",
                icon: "🔮"
            }
        ],
        tools: [
            {
                name: "Tor Browser",
                description: "Web browser for anonymous communication and browsing through the Tor network.",
                url: "https://www.torproject.org",
                type: "Browser",
                icon: "🧅"
            },
            {
                name: "Mullvad VPN",
                description: "Privacy-first VPN service that doesn't require personal information or track users.",
                url: "https://mullvad.net",
                type: "VPN",
                icon: "🔒"
            },
            {
                name: "Mullvad Browser",
                description: "Privacy-focused browser developed in collaboration with the Tor Project.",
                url: "https://mullvad.net/en/browser",
                type: "Browser",
                icon: "🌐"
            },
            {
                name: "Whonix",
                description: "Security-focused operating system designed for anonymity using Tor isolation.",
                url: "https://www.whonix.org",
                type: "OS",
                icon: "🖥️"
            },
            {
                name: "SimpleX",
                description: "Private messaging platform with no user identifiers and double ratchet encryption.",
                url: "https://simplex.chat",
                type: "Messaging",
                icon: "💬"
            },
            {
                name: "Tails OS",
                description: "Live operating system that leaves no trace on the computer you're using.",
                url: "https://tails.boum.org",
                type: "OS",
                icon: "💻"
            },
            {
                name: "Cake Wallet",
                description: "Open-source Monero and Bitcoin wallet with built-in exchange functionality.",
                url: "https://cakewallet.com",
                type: "Wallet",
                icon: "🎂"
            },
            {
                name: "Monero.com Wallet",
                description: "Official Monero wallet providing secure storage and transactions for XMR.",
                url: "https://monero.com",
                type: "Wallet",
                icon: "Ⓜ️"
            },
            {
                name: "Unstoppable Wallet",
                description: "Non-custodial multi-currency wallet with focus on privacy and security.",
                url: "https://unstoppable.money",
                type: "Wallet",
                icon: "🛡️"
            },
            {
                name: "Mailfence",
                description: "Secure email service with OpenPGP encryption and digital signatures.",
                url: "https://www.mailfence.com",
                type: "Email",
                icon: "✉️"
            },
            {
                name: "Guerrilla Mail",
                description: "Disposable email service for temporary communications and signups.",
                url: "https://www.guerrillamail.com",
                type: "Email",
                icon: "📨"
            },
            {
                name: "GrapheneOS",
                description: "Privacy and security focused mobile operating system with Android compatibility.",
                url: "https://grapheneos.org",
                type: "OS",
                icon: "📱"
            }
        ]
    };

    function renderWebsites() {
        const container = document.querySelector('#websites-tab .websites-grid');
        const items = resources.websites;
        
        container.innerHTML = '';
        
        items.forEach(item => {
            const websiteElement = document.createElement('div');
            websiteElement.className = 'website-card';
            websiteElement.innerHTML = `
                <div class="website-icon">${item.icon}</div>
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="website-meta">
                    <span class="website-type">${item.type}</span>
                    <button class="visit-website-btn" data-name="${item.name}" data-url="${item.url}">Visit</button>
                </div>
            `;
            container.appendChild(websiteElement);
        });

        // Add click events to visit buttons
        container.querySelectorAll('.visit-website-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const name = btn.dataset.name;
                const url = btn.dataset.url;
                openWebsiteModal(name, url);
            });
        });
    }

    function renderTools() {
        const container = document.querySelector('#tools-tab .tools-grid');
        const items = resources.tools;
        
        container.innerHTML = '';
        
        items.forEach(item => {
            const toolElement = document.createElement('div');
            toolElement.className = 'website-card';
            toolElement.innerHTML = `
                <div class="website-icon">${item.icon}</div>
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="website-meta">
                    <span class="website-type">${item.type}</span>
                    <button class="visit-website-btn" data-name="${item.name}" data-url="${item.url}">Visit</button>
                </div>
            `;
            container.appendChild(toolElement);
        });

        // Add click events to visit buttons
        container.querySelectorAll('.visit-website-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const name = btn.dataset.name;
                const url = btn.dataset.url;
                openWebsiteModal(name, url);
            });
        });
    }

    function renderResources(category, containerId) {
        const container = document.getElementById(containerId);
        const items = resources[category];
        
        container.innerHTML = '';
        
        items.forEach(item => {
            const resourceElement = document.createElement('div');
            resourceElement.className = 'resource-card';
            resourceElement.innerHTML = `
                <div class="resource-icon">${item.icon}</div>
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                ${item.author ? `<p class="muted"><em>by ${item.author}</em></p>` : ''}
                <div class="resource-meta">
                    <span class="resource-type">${item.type}</span>
                    ${item.url ? `<button class="visit-btn" data-name="${item.name}" data-url="${item.url}">Visit</button>` : ''}
                </div>
            `;
            container.appendChild(resourceElement);
        });

        // Add click events to visit buttons
        container.querySelectorAll('.visit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const name = btn.dataset.name;
                const url = btn.dataset.url;
                openWebsiteModal(name, url);
            });
        });
    }

    // Initial render
    renderWebsites();
    renderTools();
    renderResources('books', 'books-tab');
}

// ======== MODAL FUNCTIONALITY =========
function setupModal() {
    const modal = document.getElementById('websiteModal');
    const modalClose = document.getElementById('modalClose');
    const modalCopy = document.getElementById('modalCopy');
    const modalVisit = document.getElementById('modalVisit');

    let currentUrl = '';

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    modalCopy.addEventListener('click', () => {
        navigator.clipboard.writeText(currentUrl).then(() => {
            showToast('🔗 Link copied to clipboard!');
            modal.classList.remove('active');
        });
    });

    modalVisit.addEventListener('click', () => {
        window.open(currentUrl, '_blank');
        modal.classList.remove('active');
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}

function openWebsiteModal(name, url) {
    const modal = document.getElementById('websiteModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalWebsiteName = document.getElementById('modalWebsiteName');
    const modalWebsiteUrl = document.getElementById('modalWebsiteUrl');
    
    modalTitle.textContent = 'Visit External Website';
    modalWebsiteName.textContent = name;
    modalWebsiteUrl.textContent = url;
    currentUrl = url;
    
    modal.classList.add('active');
}

// ======== NEWSLETTER =========
function setupNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Simulate subscription
        showToast('📬 Thanks for subscribing! We\'ll be in touch.');
        newsletterForm.reset();
        
        // Add some visual feedback
        const submitBtn = newsletterForm.querySelector('button');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Subscribed!';
        submitBtn.style.background = '#10B981';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 2000);
    });
}

// ======== TABS =========
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
}

// ======== ANIMATIONS & EFFECTS =========
function setupAnimations() {
    // Add hover effects to resource cards
    const resourceCards = document.querySelectorAll('.resource-card');
    resourceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
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

// ======== UTILITY FUNCTIONS =========
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%) translateY(30px);
                background: #fff;
                color: #000;
                padding: 12px 20px;
                border-radius: 12px;
                font-weight: 700;
                opacity: 0;
                transition: all 0.4s ease;
                z-index: 2000;
                box-shadow: 0 8px 25px rgba(0,0,0,0.3);
                font-size: 0.9rem;
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

// Initialize everything
console.log("📝 Noticer Network Blog - Enhanced functionality loaded!");
