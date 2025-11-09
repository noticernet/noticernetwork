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
               
