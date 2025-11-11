// ======== INITIALIZATION =========
document.addEventListener("DOMContentLoaded", () => {
    initializeBlog();
});

function initializeBlog() {
    setupNavigation();
    setupResources();
    setupNewsletter();
    setupModal();
    setupScrollEffects();
    setupBackToTop();
    setupTabs();
    setupAnimations();
    setupBookDownloads();
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
                name: "The International Jew",
                description: "A comprehensive study of Jewish influence in modern society and finance.",
                author: "Henry Ford",
                type: "Historical",
                icon: "📖",
                download: "theinternationaljew.pdf"
            },
            {
                name: "Mein Kampf",
                description: "Historical political manifesto outlining the ideology of National Socialism.",
                author: "Adolf Hitler",
                type: "Political",
                icon: "📖",
                download: "meinkampf.pdf"
            },
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

    function renderBooks() {
        const container = document.querySelector('#books-tab .books-grid');
        const items = resources.books;
        
        container.innerHTML = '';
        
        items.forEach(item => {
            const bookElement = document.createElement('div');
            bookElement.className = 'book-card';
            bookElement.innerHTML = `
                <div class="book-image">
                    <img src="${item.name.toLowerCase().replace(/ /g, '')}.png" alt="${item.name}" class="book-cover" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDEyMCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTYwIiByeD0iOCIgZmlsbD0iIzExMTExMSIvPgo8dGV4dCB4PSI2MCIgeT0iODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNiZmJmYmYiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCI+PGt0c3BhbiBkeT0iLTEwIj5Cb29rPC90c3Bhbj48dHNwYW4gZHk9IjEwIj5Db3ZlcjwvdHNwYW4+PC90ZXh0Pgo8L3N2Zz4K'">
                </div>
                <div class="book-info">
                    <h3>${item.name}</h3>
                    <p class="book-author">By ${item.author}</p>
                    <p class="book-description">${item.description}</p>
                    <div class="book-actions">
                        ${item.download ? 
                            `<a href="${item.download}" class="btn-download" download>
                                <i class="fas fa-download"></i> Download PDF
                            </a>` :
                            `<button class="btn-download" disabled>
                                <i class="fas fa-book"></i> Coming Soon
                            </button>`
                        }
                    </div>
                </div>
            `;
            container.appendChild(bookElement);
        });

        // Add download tracking
        container.querySelectorAll('.btn-download[download]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const bookName = btn.closest('.book-card').querySelector('h3').textContent;
                showToast(`📥 Downloading: ${bookName}`);
            });
        });
    }

    // Initial render
    renderWebsites();
    renderTools();
    renderBooks();

    // Update counts
    document.getElementById('postCount').textContent = "Coming Soon";
    document.getElementById('resourceCount').textContent = resources.websites.length;
    document.getElementById('bookCount').textContent = resources.books.length;
}

// ======== BOOK DOWNLOADS =========
function setupBookDownloads() {
    // Add blog notification form handler
    const blogNotifyForm = document.getElementById('blogNotifyForm');
    if (blogNotifyForm) {
        blogNotifyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = blogNotifyForm.querySelector('input[type="email"]').value;
            showToast('📝 We\'ll notify you when blog posts are available!');
            blogNotifyForm.reset();
        });
    }
}

// ======== MODAL FUNCTIONALITY =========
function setupModal() {
    const modal = document.getElementById('websiteModal');
    const modalClose = document.getElementById('modalClose');
    const modalCopy = document.getElementById('modalCopy');
    const modalVisit = document.getElementById('modalVisit');

    if (modal && modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        modalCopy.addEventListener('click', () => {
            const url = document.getElementById('modalWebsiteUrl').textContent;
            navigator.clipboard.writeText(url).then(() => {
                showToast('🔗 Link copied to clipboard!');
                modal.classList.remove('active');
            });
        });

        modalVisit.addEventListener('click', () => {
            const url = document.getElementById('modalWebsiteUrl').textContent;
            window.open(url, '_blank');
            modal.classList.remove('active');
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        });
    }
}

function openWebsiteModal(name, url) {
    const modal = document.getElementById('websiteModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalWebsiteName = document.getElementById('modalWebsiteName');
    const modalWebsiteUrl = document.getElementById('modalWebsiteUrl');
    
    if (modal && modalTitle && modalWebsiteName && modalWebsiteUrl) {
        modalTitle.textContent = 'Visit External Website';
        modalWebsiteName.textContent = name;
        modalWebsiteUrl.textContent = url;
        
        modal.classList.add('active');
    }
}

// ======== NEWSLETTER =========
function setupNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
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
            const targetTab = document.getElementById(`${tabId}-tab`);
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });
}

// ======== ANIMATIONS & EFFECTS =========
function setupAnimations() {
    // Add hover effects to book cards
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
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
console.log("📚 Noticer Network Resources - Enhanced functionality loaded!");
