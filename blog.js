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
    setupFiltering();
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
    const postsPerPage = 6;

    // Sample blog posts data
    const blogPosts = [
        {
            id: 1,
            title: "The Art of Noticing: Cultivating Awareness in a Distracted World",
            excerpt: "Exploring techniques to enhance observation skills and maintain presence in an increasingly noisy digital landscape.",
            category: "philosophy",
            readTime: "8 min read",
            date: "2024-01-15",
            icon: "🔍"
        },
        {
            id: 2,
            title: "Privacy in the Age of Surveillance Capitalism",
            excerpt: "Understanding how personal data has become the new currency and what we can do to protect our digital sovereignty.",
            category: "privacy",
            readTime: "12 min read",
            date: "2024-01-12",
            icon: "🛡️"
        },
        {
            id: 3,
            title: "Decentralized Networks: The Future of Digital Communication",
            excerpt: "How peer-to-peer technologies are reshaping our online interactions and challenging centralized platforms.",
            category: "technology",
            readTime: "10 min read",
            date: "2024-01-08",
            icon: "🌐"
        },
        {
            id: 4,
            title: "The Psychology of Mass Movements",
            excerpt: "Analyzing the cognitive patterns that drive collective behavior and social transformations throughout history.",
            category: "society",
            readTime: "15 min read",
            date: "2024-01-05",
            icon: "👥"
        },
        {
            id: 5,
            title: "Encryption Tools Every Privacy-Conscious Person Should Know",
            excerpt: "A practical guide to essential encryption software for securing communications and data.",
            category: "technology",
            readTime: "6 min read",
            date: "2024-01-02",
            icon: "🔒"
        },
        {
            id: 6,
            title: "Urban Exploration and the Rediscovery of Forgotten Spaces",
            excerpt: "How exploring abandoned places can reveal hidden histories and challenge our perception of progress.",
            category: "society",
            readTime: "9 min read",
            date: "2023-12-28",
            icon: "🏚️"
        },
        {
            id: 7,
            title: "The Philosophy of Minimalism in Digital Life",
            excerpt: "Applying minimalist principles to our digital existence for greater clarity and intentionality.",
            category: "philosophy",
            readTime: "7 min read",
            date: "2023-12-25",
            icon: "⚡"
        },
        {
            id: 8,
            title: "Dark Patterns: How Interfaces Manipulate User Behavior",
            excerpt: "Examining the subtle design techniques that influence our decisions online, often without our awareness.",
            category: "technology",
            readTime: "11 min read",
            date: "2023-12-20",
            icon: "🎭"
        },
        {
            id: 9,
            title: "The Lost Art of Deep Reading",
            excerpt: "Why sustained focus on long-form content is disappearing and how to reclaim this valuable cognitive skill.",
            category: "society",
            readTime: "8 min read",
            date: "2023-12-15",
            icon: "📖"
        }
    ];

    function renderPosts(postsToRender) {
        postsToRender.forEach(post => {
            const postElement = document.createElement('article');
            postElement.className = `blog-card ${post.category}`;
            postElement.innerHTML = `
                <div class="blog-card-image">
                    ${post.icon}
                </div>
                <div class="blog-card-content">
                    <div class="blog-card-meta">
                        <span class="blog-card-category">${post.category}</span>
                        <span>${formatDate(post.date)}</span>
                    </div>
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <div class="blog-card-footer">
                        <span class="read-time">${post.readTime}</span>
                        <a href="#" class="read-more">Read More →</a>
                    </div>
                </div>
            `;
            blogGrid.appendChild(postElement);
        });
    }

    function loadPosts(page = 1) {
        const startIndex = (page - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const postsToLoad = blogPosts.slice(startIndex, endIndex);
        
        renderPosts(postsToLoad);
        
        // Hide load more button if no more posts
        if (endIndex >= blogPosts.length) {
            loadMoreBtn.style.display = 'none';
        }
    }

    // Initial load
    loadPosts(currentPage);

    // Load more functionality
    loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        loadPosts(currentPage);
    });

    // Update post count
    document.getElementById('postCount').textContent = blogPosts.length;
}

// ======== RESOURCES =========
function setupResources() {
    // Sample resources data
    const resources = {
        websites: [
            {
                name: "Anonymous UK Delivery",
                description: "Secure anonymous delivery services with privacy-focused shipping options.",
                url: "http://tti5jkxpp5zhigg5ov4wr5zdmueii6xjv2dvnilgfycy3dxxeousheyd.onion",
                type: "Service",
                icon: "📦"
            },
            {
                name: "Privacy Tools",
                description: "Comprehensive list of privacy-respecting software and services.",
                url: "https://www.privacytools.io",
                type: "Tools",
                icon: "🛠️"
            },
            {
                name: "Library Genesis",
                description: "Massive collection of books, articles, and academic papers.",
                url: "http://libgen.rs",
                type: "Library",
                icon: "📚"
            },
            {
                name: "Archived Today",
                description: "Web archiving service for preserving digital content.",
                url: "https://archive.today",
                type: "Archive",
                icon: "💾"
            },
            {
                name: "DuckDuckGo",
                description: "Privacy-focused search engine that doesn't track your searches.",
                url: "https://duckduckgo.com",
                type: "Search",
                icon: "🔍"
            },
            {
                name: "ProtonMail",
                description: "Secure email service with end-to-end encryption.",
                url: "https://protonmail.com",
                type: "Communication",
                icon: "✉️"
            }
        ],
        books: [
            {
                name: "The Age of Surveillance Capitalism",
                description: "Shoshana Zuboff's groundbreaking analysis of the new economic order.",
                author: "Shoshana Zuboff",
                type: "Non-fiction",
                icon: "📖"
            },
            {
                name: "Permanent Record",
                description: "Edward Snowden's memoir about surveillance and democracy.",
                author: "Edward Snowden",
                type: "Memoir",
                icon: "🕵️"
            },
            {
                name: "The Sovereign Individual",
                description: "Predicting the shift from industrial to information societies.",
                author: "James Dale Davidson",
                type: "Economics",
                icon: "👑"
            },
            {
                name: "Cryptonomicon",
                description: "Neal Stephenson's novel exploring cryptography and information warfare.",
                author: "Neal Stephenson",
                type: "Fiction",
                icon: "🔐"
            }
        ],
        tools: [
            {
                name: "Signal",
                description: "Open-source encrypted messaging app for secure communication.",
                type: "Communication",
                icon: "📱"
            },
            {
                name: "Tor Browser",
                description: "Web browser for anonymous communication and browsing.",
                type: "Privacy",
                icon: "🧅"
            },
            {
                name: "VeraCrypt",
                description: "Free open-source disk encryption software.",
                type: "Security",
                icon: "🔒"
            },
            {
                name: "KeePassXC",
                description: "Cross-platform password manager for secure credential storage.",
                type: "Security",
                icon: "🗝️"
            }
        ],
        archives: [
            {
                name: "Wayback Machine",
                description: "Digital archive of the World Wide Web founded by the Internet Archive.",
                url: "https://archive.org",
                type: "Web Archive",
                icon: "⏳"
            },
            {
                name: "Sci-Hub",
                description: "Repository of over 85 million academic papers accessible to all.",
                url: "https://sci-hub.se",
                type: "Academic",
                icon: "🔬"
            }
        ]
    };

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
    renderResources('websites', 'websites-tab');
    renderResources('books', 'books-tab');
    renderResources('tools', 'tools-tab');
    renderResources('archives', 'archives-tab');

    // Update resource counts
    document.getElementById('resourceCount').textContent = 
        resources.websites.length + resources.tools.length + resources.archives.length;
    document.getElementById('bookCount').textContent = resources.books.length;
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

// ======== FILTERING & TABS =========
function setupFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            filterBlogPosts(filter);
        });
    });
}

function filterBlogPosts(filter) {
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        if (filter === 'all' || card.classList.contains(filter)) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

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
