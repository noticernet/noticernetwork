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
        annTrack.addEventListener("mouseenter", () => {
            annTrack.style.animationPlayState = "paused";
        });
        
        annTrack.addEventListener("mouseleave", () => {
            annTrack.style.animationPlayState = "running";
        });
        
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

        document.addEventListener("click", (e) => {
            if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
                nav.classList.remove("open");
                navToggle.textContent = "☰";
            }
        });

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
            amountButtons.forEach((b) => b.classList.remove("active"));
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

    customInput.addEventListener("blur", (e) => {
        if (e.target.value && !isNaN(parseFloat(e.target.value))) {
            e.target.value = parseFloat(e.target.value).toFixed(2);
        }
    });

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

    // YOUR REAL WALLET ADDRESSES
    const wallets = {
        BTC: {
            address: "bc1qc78ztftkxzehx3veuar3fstse2vcvd4nslzqvy",
            networks: ["Bitcoin Mainnet"]
        },
        ETH: {
            address: "0x20190e969bc2654219702413B8AacD3c0099000e",
            networks: ["ERC-20 Only"]
        },
        SOL: {
            address: "CunPMZC9QitsSrS1wbPUPEqXJ41jxejyok18FEFB1LFH",
            networks: ["Solana Mainnet"]
        },
        USDT: {
            address: "0x20190e969bc2654219702413B8AacD3c0099000e",
            networks: ["ERC-20 Only"]
        },
        USDC: {
            address: "CunPMZC9QitsSrS1wbPUPEqXJ41jxejyok18FEFB1LFH",
            networks: ["Solana Only"]
        },
        XMR: {
            address: "43nwFS7KR1xLavzjeFuUJj9zhMETFN1gVHbEMeCkYCJMTWpfGkEWjdJK76tkcFEWYAZdmYwXw2dbEEZEZAsa1bE6TQHV9bv",
            networks: ["Monero Mainnet"]
        }
    };

    cryptoItems.forEach((item) => {
        item.addEventListener("click", () => {
            cryptoItems.forEach((i) => i.classList.remove("active"));
            item.classList.add("active");
            selectedCrypto = item.dataset.symbol;

            showEnhancedWallet(selectedCrypto);
            updateSummary();
            triggerHapticFeedback();
            showConfetti(50);
        });
    });

    function showEnhancedWallet(symbol) {
        if (!wallets[symbol]) return;

        walletSection.style.display = "block";
        walletAddress.textContent = wallets[symbol].address;
        
        generateQRCode(wallets[symbol].address, symbol);
        showNetworkOptions(symbol, wallets[symbol].networks);
        updateCryptoPriceInfo(symbol);
    }

    function showNetworkOptions(symbol, networks) {
        const existingNetworkSelector = document.querySelector(".network-selector");
        if (existingNetworkSelector) {
            existingNetworkSelector.remove();
        }

        if (networks.length > 0) {
            const networkSelector = document.createElement("div");
            networkSelector.className = "network-selector";
            networkSelector.innerHTML = `
                <p class="muted" style="margin-bottom: 8px;">Network:</p>
                <div class="network-options">
                    ${networks.map(network => `
                        <button class="network-btn active" data-network="${network}">${network}</button>
                    `).join('')}
                </div>
            `;
            
            walletSection.insertBefore(networkSelector, walletAddress.nextSibling);
        }
    }

    function updateCryptoPriceInfo(symbol) {
        const rate = rates[symbol] || 1;
        if (selectedAmount && rate) {
            const equivalent = (selectedAmount / rate).toFixed(6);
            cryptoPrice.textContent = `$${selectedAmount} ≈ ${equivalent} ${symbol}`;
        } else {
            cryptoPrice.textContent = `Current ${symbol} price: $${(rate || 1).toLocaleString()}`;
        }
    }

    // Enhanced copy functionality
    if (copyBtn) {
        copyBtn.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(walletAddress.textContent);
                
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
    BTC: 0,
    ETH: 0,
    SOL: 0,
    USDT: 0,
    USDC: 0,
    XMR: 0
};

function setupRealTimeRates() {
    fetchRates();
    setInterval(fetchRates, 30000);
    updateLivePricesDisplay();
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

        rates = newRates;
        updateLivePricesDisplay();
        updateSummary();
        
    } catch (err) {
        console.warn("Failed to fetch live rates. Using cached rates.");
    }
}

function updateLivePricesDisplay() {
    document.querySelectorAll(".crypto-item").forEach(item => {
        const symbol = item.dataset.symbol;
        const currentRate = rates[symbol];
        
        // Remove existing price display
        const existingPrice = item.querySelector(".live-price");
        if (existingPrice) {
            existingPrice.remove();
        }
        
        if (currentRate && currentRate > 0) {
            const priceElement = document.createElement("div");
            priceElement.className = "live-price";
            priceElement.style.fontSize = "0.75rem";
            priceElement.style.marginTop = "4px";
            priceElement.style.color = "#bfbfbf";
            priceElement.style.fontWeight = "600";
            
            // Format price based on value
            let formattedPrice;
            if (currentRate >= 1000) {
                formattedPrice = `$${currentRate.toLocaleString()}`;
            } else if (currentRate >= 1) {
                formattedPrice = `$${currentRate.toFixed(2)}`;
            } else {
                formattedPrice = `$${currentRate.toFixed(4)}`;
            }
            
            priceElement.textContent = formattedPrice;
            item.appendChild(priceElement);
        }
    });
}

// ======== WORKING QR CODE GENERATION =========
function generateQRCode(address, symbol) {
    const qrPanel = document.querySelector(".qr-panel");
    if (!qrPanel || !address) return;

    qrPanel.innerHTML = "";
    
    const qrContainer = document.createElement("div");
    qrContainer.style.textAlign = "center";
    qrContainer.style.padding = "20px";
    qrContainer.style.background = "white";
    qrContainer.style.borderRadius = "12px";
    qrContainer.style.display = "inline-block";
    qrContainer.style.margin = "20px auto 0 auto"; // Added top margin for spacing
    
    const img = document.createElement("img");
    const qrData = encodeURIComponent(address);
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrData}&bgcolor=ffffff&color=000000&margin=10&qzone=1`;
    img.alt = `${symbol} QR Code`;
    img.style.borderRadius = "8px";
    img.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
    img.loading = "lazy";
    
    qrContainer.appendChild(img);
    qrPanel.appendChild(qrContainer);
}

// ======== ENHANCED DONATION SUMMARY =========
function updateSummary() {
    const summaryBox = document.querySelector(".donation-summary");
    
    if (!summaryBox) return;

    if (selectedAmount && selectedCrypto) {
        const rate = rates[selectedCrypto] || 1;
        
        // Calculate amounts based on the specific cryptocurrency
        let equivalent, networkFee, totalCrypto;
        
        if (selectedCrypto === "BTC") {
            equivalent = (selectedAmount / rate).toFixed(8);
            networkFee = "0.0002";
            totalCrypto = (parseFloat(equivalent) + parseFloat(networkFee)).toFixed(8);
        } else if (selectedCrypto === "ETH") {
            equivalent = (selectedAmount / rate).toFixed(6);
            networkFee = "0.003";
            totalCrypto = (parseFloat(equivalent) + parseFloat(networkFee)).toFixed(6);
        } else if (selectedCrypto === "SOL") {
            equivalent = (selectedAmount / rate).toFixed(4);
            networkFee = "0.000005";
            totalCrypto = (parseFloat(equivalent) + parseFloat(networkFee)).toFixed(4);
        } else if (selectedCrypto === "USDT") {
            equivalent = (selectedAmount / rate).toFixed(2);
            networkFee = "0.003";
            totalCrypto = (parseFloat(equivalent) + parseFloat(networkFee)).toFixed(2);
        } else if (selectedCrypto === "USDC") {
            equivalent = (selectedAmount / rate).toFixed(2);
            networkFee = "0.000005";
            totalCrypto = (parseFloat(equivalent) + parseFloat(networkFee)).toFixed(2);
        } else if (selectedCrypto === "XMR") {
            equivalent = (selectedAmount / rate).toFixed(6);
            networkFee = "0.0001";
            totalCrypto = (parseFloat(equivalent) + parseFloat(networkFee)).toFixed(6);
        } else {
            equivalent = (selectedAmount / rate).toFixed(6);
            networkFee = "0.001";
            totalCrypto = (parseFloat(equivalent) + parseFloat(networkFee)).toFixed(6);
        }

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
            // Update existing summary with correct values
            const summaryValues = document.querySelectorAll(".summary-value");
            if (summaryValues.length >= 4) {
                summaryValues[0].textContent = `$${selectedAmount.toFixed(2)} USD`;
                summaryValues[1].textContent = selectedCrypto;
                summaryValues[2].textContent = `${equivalent} ${selectedCrypto}`;
                summaryValues[3].textContent = `~${networkFee} ${selectedCrypto}`;
                summaryValues[4].textContent = `${totalCrypto} ${selectedCrypto}`;
            }
            document.querySelector(".conversion-note").textContent = `Rate: 1 ${selectedCrypto} = $${rate.toLocaleString()}`;
        }

        summaryBox.classList.add("visible");
        saveDonationPreference();
        
    } else {
        summaryBox.classList.remove("visible");
    }
}

// ======== LOCAL STORAGE PREFERENCES =========
function setupLocalStorage() {
    loadDonationPreference();
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
            
            if (Date.now() - preference.timestamp < 24 * 60 * 60 * 1000) {
                if (preference.amount) {
                    selectedAmount = preference.amount;
                    document.querySelectorAll(".amt-btn").forEach(btn => {
                        if (btn.dataset.amount == preference.amount) {
                            btn.click();
                        }
                    });
                }
                
                if (preference.crypto) {
                    selectedCrypto = preference.crypto;
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
    document.querySelectorAll(".toast").forEach(toast => toast.remove());
    
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add("show"), 100);
    
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
                    
                    if (entry.target.classList.contains("hero-section")) {
                        setTimeout(() => showConfetti(30), 500);
                    }
                }
            });
        },
        { threshold: 0.15 }
    );
    
    sections.forEach((section) => observer.observe(section));
    
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
    if (e.altKey && e.key === 'd') {
        e.preventDefault();
        document.querySelector(".amt-btn")?.focus();
        showToast("🎯 Donation amount focused");
    }
    
    if (e.altKey && e.key === 'c') {
        e.preventDefault();
        document.querySelector(".crypto-item")?.focus();
        showToast("🎯 Crypto selection focused");
    }
    
    if (e.key === 'Escape') {
        document.querySelector(".nav")?.classList.remove("open");
        document.querySelector(".nav-toggle").textContent = "☰";
    }
});

// ======== PERFORMANCE OPTIMIZATIONS =========
let scrollTimeout;
window.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Heavy scroll operations here
    }, 100);
});

function preloadImages() {
    const images = [
        'btc.png', 'eth.png', 'sol.png', 'usdt.png', 'usdc.png', 'xmr.png'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadImages();

console.log("🚀 Noticer Network Donation Page - Enhanced functionality loaded!");
