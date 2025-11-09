// ======== INITIALIZATION =========
document.addEventListener("DOMContentLoaded", () => {
    initializeApp();
});

function initializeApp() {
    setupAnnouncementBar();
    setupNavigation();
    setupAmountSelection();
    setupCryptoSelection();
    setupRealTimeRates();
    setupScrollEffects();
    setupBackToTop();
    setupConfetti();
    setupLocalStorage();
}

// ======== ENHANCED ANNOUNCEMENT BAR =========
function setupAnnouncementBar() {
    const annTrack = document.querySelector(".ann-track");
    if (annTrack) {
        // Pause animation on hover
        annTrack.addEventListener("mouseenter", () => {
            annTrack.style.animationPlayState = "paused";
        });
        
        annTrack.addEventListener("mouseleave", () => {
            annTrack.style.animationPlayState = "running";
        });
        
        // Add click to copy functionality
        annTrack.addEventListener("click", () => {
            navigator.clipboard.writeText("Noticer Network - Join the Movement");
            showToast("🔗 Copied website info!");
        });
    }
}

// ======== ENHANCED NAVIGATION =========
function setupNavigation() {
    const navToggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".nav");

    if (navToggle && nav) {
        navToggle.addEventListener("click", () => {
            nav.classList.toggle("open");
            navToggle.textContent = nav.classList.contains("open") ? "✕" : "☰";
        });

        // Close nav when clicking outside
        document.addEventListener("click", (e) => {
            if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
                nav.classList.remove("open");
                navToggle.textContent = "☰";
            }
        });

        // Smooth scroll for internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener("click", function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute("href"));
                if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                    nav.classList.remove("open");
                    navToggle.textContent = "☰";
                }
            });
        });
    }
}

// ======== ENHANCED AMOUNT SELECTION =========
let selectedAmount = null;
let selectedCrypto = null;

function setupAmountSelection() {
    const amountButtons = document.querySelectorAll(".amt-btn");
    const customInput = document.querySelector(".custom-input");

    amountButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            // Remove active class from all buttons
            amountButtons.forEach((b) => b.classList.remove("active"));
            
            // Add active class to clicked button
            btn.classList.add("active");

            if (btn.classList.contains("custom")) {
                customInput.style.display = "block";
                customInput.focus();
                selectedAmount = null;
            } else {
                customInput.style.display = "none";
                selectedAmount = parseFloat(btn.dataset.amount);
                updateSummary();
                triggerHapticFeedback();
            }
        });
    });

    // Enhanced custom input with validation
    customInput.addEventListener("input", (e) => {
        const val = parseFloat(e.target.value);
        if (!isNaN(val) && val > 0) {
            selectedAmount = val;
            updateSummary();
        } else if (e.target.value === "") {
            selectedAmount = null;
            updateSummary();
        }
    });

    // Format custom input on blur
    customInput.addEventListener("blur", (e) => {
        if (e.target.value && !isNaN(parseFloat(e.target.value))) {
            e.target.value = parseFloat(e.target.value).toFixed(2);
        }
    });

    // Keyboard shortcuts for amount selection
    document.addEventListener("keydown", (e) => {
        if (e.altKey && e.key >= '1' && e.key <= '6') {
            e.preventDefault();
            const index = parseInt(e.key) - 1;
            if (amountButtons[index]) {
                amountButtons[index].click();
            }
        }
    });
}

// ======== ENHANCED CRYPTO SELECTION =========
function setupCryptoSelection() {
    const cryptoItems = document.querySelectorAll(".crypto-item");
    const walletSection = document.querySelector(".wallet-section");
    const walletAddress = document.querySelector(".wallet-address");
    const copyBtn = document.querySelector(".copy-btn");
    const qrPanel = document.querySelector(".qr-panel");
    const cryptoPrice = document.querySelector(".crypto-price");

    // Enhanced wallet addresses with multiple options
    const wallets = {
        BTC: {
            address: "bc1qexamplebtcwalletaddress12345",
            networks: ["Bitcoin Mainnet"]
        },
        ETH: {
            address: "0xExampleEthereumWallet1234567890abcdef",
            networks: ["ERC20", "Arbitrum", "Optimism"]
        },
        SOL: {
            address: "SolExampleWallet1234567890abcdef",
            networks: ["Solana Mainnet"]
        },
        USDT: {
            address: "0xExampleUSDTWallet1234567890abcdef",
            networks: ["ERC20", "TRC20", "Polygon"]
        },
        USDC: {
            address: "0xExampleUSDCWallet1234567890abcdef",
            networks: ["ERC20", "Solana", "Polygon"]
        },
        XMR: {
            address: "48ExampleMoneroWallet1234567890abcdef",
            networks: ["Monero Mainnet"]
        }
    };

    cryptoItems.forEach((item) => {
        item.addEventListener("click", () => {
            // Remove active class from all items
            cryptoItems.forEach((i) => i.classList.remove("active"));
            
            // Add active class to clicked item
            item.classList.add("active");
            selectedCrypto = item.dataset.symbol;

            showEnhancedWallet(selectedCrypto);
            updateSummary();
            triggerHapticFeedback();
            
            // Show confetti for crypto selection
            showConfetti(50);
        });
    });

    function showEnhancedWallet(symbol) {
        if (!wallets[symbol]) return;

        walletSection.style.display = "block";
        walletAddress.textContent = wallets[symbol].address;
        
        // Generate QR code
        generateQRCode(wallets[symbol].address);
        
        // Show network options
        showNetworkOptions(symbol, wallets[symbol].networks);
        
        // Update crypto price info
        updateCryptoPriceInfo(symbol);
    }

    function showNetworkOptions(symbol, networks) {
        const existingNetworkSelector = document.querySelector(".network-selector");
        if (existingNetworkSelector) {
            existingNetworkSelector.remove();
        }

        if (networks.length > 1) {
            const networkSelector = document.createElement("div");
            networkSelector.className = "network-selector";
            networkSelector.innerHTML = `
                <p class="muted" style="margin-bottom: 8px;">Select Network:</p>
                <div class="network-options">
                    ${networks.map(network => `
                        <button class="network-btn" data-network="${network}">${network}</button>
                    `).join('')}
                </div>
            `;
            
            walletSection.insertBefore(networkSelector, walletAddress.nextSibling);
            
            // Add network selection functionality
            document.querySelectorAll(".network-btn").forEach(btn => {
                btn.addEventListener("click", function() {
                    document.querySelectorAll(".network-btn").forEach(b => b.classList.remove("active"));
                    this.classList.add("active");
                    showToast(`🌐 ${this.dataset.network} selected`);
                });
            });
            
            // Activate first network by default
            document.querySelector(".network-btn")?.classList.add("active");
        }
    }

    function updateCryptoPriceInfo(symbol) {
        const rate = rates[symbol] || 1;
        if (selectedAmount && rate) {
            const equivalent = (selectedAmount / rate).toFixed(6);
            cryptoPrice.textContent = `$${selectedAmount} ≈ ${equivalent} ${symbol}`;
        } else {
            cryptoPrice.textContent = `Current ${symbol} price: $${rate.toLocaleString()}`;
        }
    }

    // Enhanced copy functionality
    if (copyBtn) {
        copyBtn.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(walletAddress.textContent);
                
                // Visual feedback for copy
                copyBtn.innerHTML = "✓ Copied!";
                copyBtn.style.background = "#10B981";
                
                showToast("📋 Wallet address copied to clipboard!");
                triggerHapticFeedback();
                
                setTimeout(() => {
                    copyBtn.innerHTML = "Copy Address";
                    copyBtn.style.background = "";
                }, 2000);
                
            } catch (err) {
                showToast("❌ Failed to copy address");
            }
        });
    }
}

// ======== REAL-TIME EXCHANGE RATES =========
let rates = {
    BTC: 65000,
    ETH: 3000,
    SOL: 150,
    USDT: 1,
    USDC: 1,
    XMR: 170
};

function setupRealTimeRates() {
    fetchRates();
    
    // Update rates every 30 seconds
    setInterval(fetchRates, 30000);
    
    // Add price change indicators
    setInterval(updatePriceIndicators, 5000);
}

async function fetchRates() {
    try {
        const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,tether,usd-coin,monero&vs_currencies=usd"
        );
        
        if (!response.ok) throw new Error('API response not OK');
        
        const data = await response.json();
        const newRates = {
            BTC: data.bitcoin?.usd || rates.BTC,
            ETH: data.ethereum?.usd || rates.ETH,
            SOL: data.solana?.usd || rates.SOL,
            USDT: data.tether?.usd || rates.USDT,
            USDC: data["usd-coin"]?.usd || rates.USDC,
            XMR: data.monero?.usd || rates.XMR
        };

        // Store old rates for comparison
        const oldRates = { ...rates };
        rates = newRates;
        
        // Update UI with new rates
        updateRateDisplays(oldRates);
        updateSummary();
        
    } catch (err) {
        console.warn("Failed to fetch live rates. Using cached rates.");
        showToast("⚠️ Using cached exchange rates", 3000);
    }
}

function updateRateDisplays(oldRates) {
    document.querySelectorAll(".crypto-item").forEach(item => {
        const symbol = item.dataset.symbol;
        const currentRate = rates[symbol];
        const oldRate = oldRates[symbol];
        
        if (currentRate && oldRate) {
            const change = ((currentRate - oldRate) / oldRate * 100).toFixed(2);
            const changeElement = item.querySelector(".price-change") || document.createElement("span");
            
            if (!item.querySelector(".price-change")) {
                changeElement.className = "price-change";
                changeElement.style.fontSize = "0.7rem";
                changeElement.style.marginTop = "4px";
                item.appendChild(changeElement);
            }
            
            changeElement.textContent = `${change}%`;
            changeElement.style.color = change >= 0 ? "#10B981" : "#EF4444";
        }
    });
}

function updatePriceIndicators() {
    // Flash animation for price updates
    document.querySelectorAll(".crypto-item").forEach(item => {
        if (Math.random() > 0.7) { // Random flash for demo
            item.style.boxShadow = "0 0 10px rgba(59, 130, 246, 0.5)";
            setTimeout(() => {
                item.style.boxShadow = "";
            }, 1000);
        }
    });
}

// ======== ENHANCED QR CODE GENERATION =========
function generateQRCode(address) {
    const qrPanel = document.querySelector(".qr-panel");
    if (!qrPanel || !address) return;

    qrPanel.innerHTML = "";
    
    // Create QR code with enhanced styling
    const qrContainer = document.createElement("div");
    qrContainer.style.textAlign = "center";
    qrContainer.style.padding = "15px";
    qrContainer.style.background = "white";
    qrContainer.style.borderRadius = "12px";
    qrContainer.style.display = "inline-block";
    
    const img = document.createElement("img");
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(address)}&bgcolor=ffffff&color=000000&margin=10`;
    img.alt = "QR Code";
    img.style.borderRadius = "8px";
    img.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
    
    qrContainer.appendChild(img);
    qrPanel.appendChild(qrContainer);
    
    // Add download QR code functionality
    const downloadBtn = document.createElement("button");
    downloadBtn.className = "copy-btn";
    downloadBtn.style.marginTop = "10px";
    downloadBtn.textContent = "📥 Download QR";
    downloadBtn.onclick = () => downloadQRCode(address);
    qrPanel.appendChild(downloadBtn);
}

function downloadQRCode(address) {
    const link = document.createElement("a");
    link.download = `Noticer-Network-${selectedCrypto}-QR.png`;
    link.href = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(address)}&bgcolor=ffffff&color=000000`;
    link.click();
    showToast("📥 QR code download started!");
}

// ======== ENHANCED DONATION SUMMARY =========
function updateSummary() {
    const summaryBox = document.querySelector(".donation-summary");
    
    if (!summaryBox) return;

    if (selectedAmount && selectedCrypto) {
        const rate = rates[selectedCrypto] || 1;
        const equivalent = (selectedAmount / rate).toFixed(6);
        const networkFee = calculateNetworkFee(selectedCrypto);
        const totalCrypto = (selectedAmount / rate + networkFee).toFixed(6);

        // Create or update summary
        if (!document.querySelector(".enhanced-summary")) {
            summaryBox.innerHTML = `
                <div class="enhanced-summary">
                    <h4>Donation Summary</h4>
                    <div class="summary-line">
                        <span class="summary-label">Amount:</span>
                        <span class="summary-value">$${selectedAmount.toFixed(2)} USD</span>
                    </div>
                    <div class="summary-line">
                        <span class="summary-label">Cryptocurrency:</span>
                        <span class="summary-value">${selectedCrypto}</span>
                    </div>
                    <div class="summary-line">
                        <span class="summary-label">You send:</span>
                        <span class="summary-value">${equivalent} ${selectedCrypto}</span>
                    </div>
                    <div class="summary-line">
                        <span class="summary-label">Est. network fee:</span>
                        <span class="summary-value">~${networkFee} ${selectedCrypto}</span>
                    </div>
                    <div class="summary-line total">
                        <span class="summary-label">Total to send:</span>
                        <span class="summary-value">${totalCrypto} ${selectedCrypto}</span>
                    </div>
                    <div class="conversion-note">
                        Rate: 1 ${selectedCrypto} = $${rate.toLocaleString()}
                    </div>
                </div>
            `;
        } else {
            // Update existing summary
            document.querySelector(".summary-value:nth-child(2)").textContent = `$${selectedAmount.toFixed(2)} USD`;
            document.querySelector(".summary-value:nth-child(4)").textContent = `${equivalent} ${selectedCrypto}`;
            document.querySelector(".summary-value:nth-child(6)").textContent = `~${networkFee} ${selectedCrypto}`;
            document.querySelector(".summary-value:nth-child(8)").textContent = `${totalCrypto} ${selectedCrypto}`;
            document.querySelector(".conversion-note").textContent = `Rate: 1 ${selectedCrypto} = $${rate.toLocaleString()}`;
        }

        summaryBox.classList.add("visible");
        
        // Save to localStorage
        saveDonationPreference();
        
    } else {
        summaryBox.classList.remove("visible");
    }
}

function calculateNetworkFee(crypto) {
    const feeRates = {
        BTC: 0.0002,
        ETH: 0.003,
        SOL: 0.000005,
        USDT: 0.003,
        USDC: 0.003,
        XMR: 0.0001
    };
    return feeRates[crypto] || 0.001;
}

// ======== LOCAL STORAGE PREFERENCES =========
function setupLocalStorage() {
    loadDonationPreference();
    
    // Auto-save when leaving page
    window.addEventListener("beforeunload", saveDonationPreference);
}

function saveDonationPreference() {
    const preference = {
        amount: selectedAmount,
        crypto: selectedCrypto,
        timestamp: Date.now()
    };
    localStorage.setItem("noticerDonationPref", JSON.stringify(preference));
}

function loadDonationPreference() {
    try {
        const saved = localStorage.getItem("noticerDonationPref");
        if (saved) {
            const preference = JSON.parse(saved);
            
            // Only load if less than 1 day old
            if (Date.now() - preference.timestamp < 24 * 60 * 60 * 1000) {
                if (preference.amount) {
                    selectedAmount = preference.amount;
                    // Find and click the corresponding amount button
                    document.querySelectorAll(".amt-btn").forEach(btn => {
                        if (btn.dataset.amount == preference.amount) {
                            btn.click();
                        }
                    });
                }
                
                if (preference.crypto) {
                    selectedCrypto = preference.crypto;
                    // Find and click the corresponding crypto item
                    document.querySelectorAll(".crypto-item").forEach(item => {
                        if (item.dataset.symbol === preference.crypto) {
                            item.click();
                        }
                    });
                }
            }
        }
    } catch (e) {
        console.log("No saved preferences found");
    }
}

// ======== ENHANCED TOAST NOTIFICATIONS =========
function showToast(message, duration = 2500) {
    // Remove existing toasts
    document.querySelectorAll(".toast").forEach(toast => toast.remove());
    
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    
    // Add styles if not already present
    if (!document.querySelector("#toast-styles")) {
        const styles = document.createElement("style");
        styles.id = "toast-styles";
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
    setTimeout(() => toast.classList.add("show"), 100);
    
    // Animate out and remove
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 400);
    }, duration);
}

// ======== HAPTIC FEEDBACK =========
function triggerHapticFeedback() {
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

// ======== CONFETTI EFFECT =========
function setupConfetti() {
    // Confetti will be loaded on demand
}

function showConfetti(particleCount = 100) {
    // Simple confetti effect
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
}

function createParticle() {
    const particle = document.createElement("div");
    particle.style.position = "fixed";
    particle.style.width = "8px";
    particle.style.height = "8px";
    particle.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
    particle.style.borderRadius = "50%";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "1000";
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = "-10px";
    
    document.body.appendChild(particle);
    
    const animation = particle.animate([
        { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
        { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ], {
        duration: 1000 + Math.random() * 2000,
        easing: "cubic-bezier(0.1, 0.8, 0.2, 1)"
    });
    
    animation.onfinish = () => particle.remove();
}

// ======== SCROLL EFFECTS =========
function setupScrollEffects() {
    const sections = document.querySelectorAll(".section");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                    
                    // Trigger confetti for hero section
                    if (entry.target.classList.contains("hero-section")) {
                        setTimeout(() => showConfetti(30), 500);
                    }
                }
            });
        },
        { threshold: 0.15 }
    );
    
    sections.forEach((section) => observer.observe(section));
    
    // Parallax effect for hero section
    window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector(".hero-section");
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// ======== BACK TO TOP BUTTON =========
function setupBackToTop() {
    const backToTop = document.querySelector(".back-to-top");
    
    if (!backToTop) {
        // Create back to top button if it doesn't exist
        const newBackToTop = document.createElement("button");
        newBackToTop.className = "back-to-top";
        newBackToTop.innerHTML = "↑";
        newBackToTop.title = "Back to top";
        newBackToTop.style.cssText = `
            position: fixed;
            bottom: 28px;
            right: 28px;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: rgba(255,255,255,0.08);
            color: #fff;
            border: 1px solid rgba(255,255,255,0.1);
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all .3s ease;
            z-index: 1000;
            font-size: 1.2rem;
        `;
        
        newBackToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            triggerHapticFeedback();
        });
        
        document.body.appendChild(newBackToTop);
        
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                newBackToTop.style.opacity = "1";
                newBackToTop.style.visibility = "visible";
            } else {
                newBackToTop.style.opacity = "0";
                newBackToTop.style.visibility = "hidden";
            }
        });
    }
}

// ======== KEYBOARD SHORTCUTS =========
document.addEventListener("keydown", (e) => {
    // Alt + D to focus on donation amount
    if (e.altKey && e.key === 'd') {
        e.preventDefault();
        document.querySelector(".amt-btn")?.focus();
        showToast("🎯 Donation amount focused");
    }
    
    // Alt + C to focus on crypto selection
    if (e.altKey && e.key === 'c') {
        e.preventDefault();
        document.querySelector(".crypto-item")?.focus();
        showToast("🎯 Crypto selection focused");
    }
    
    // Escape to close modals/nav
    if (e.key === 'Escape') {
        document.querySelector(".nav")?.classList.remove("open");
        document.querySelector(".nav-toggle").textContent = "☰";
    }
});

// ======== PERFORMANCE OPTIMIZATIONS =========
// Debounce scroll events
let scrollTimeout;
window.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Heavy scroll operations here
    }, 100);
});

// Preload critical images
function preloadImages() {
    const images = [
        'btc.png', 'eth.png', 'sol.png', 'usdt.png', 'usdc.png', 'xmr.png'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();

console.log("🚀 Noticer Network Donation Page - Enhanced functionality loaded!");
