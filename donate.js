// ======== ANNOUNCEMENT BAR SCROLLING =========
document.addEventListener("DOMContentLoaded", () => {
  const annTrack = document.querySelector(".ann-track");
  if (annTrack) {
    annTrack.style.animation = "scroll 22s linear infinite";
  }
});

// ======== NAV TOGGLE (MOBILE) =========
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

// ======== AMOUNT SELECTION =========
const amountButtons = document.querySelectorAll(".amount-btn");
const customInput = document.querySelector(".custom-amount");
let selectedAmount = null;

amountButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    amountButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    if (btn.dataset.amount === "custom") {
      customInput.style.display = "block";
      customInput.focus();
      selectedAmount = null;
    } else {
      customInput.style.display = "none";
      selectedAmount = parseFloat(btn.dataset.amount);
      updateSummary();
    }
  });
});

customInput.addEventListener("input", () => {
  const val = parseFloat(customInput.value);
  if (!isNaN(val) && val > 0) {
    selectedAmount = val;
    updateSummary();
  }
});

// ======== CRYPTO SELECTION =========
const cryptoOptions = document.querySelectorAll(".crypto-option");
const walletContainer = document.querySelector(".wallet-info");
const walletAddress = document.querySelector(".wallet-address");
const copyBtn = document.querySelector(".copy-btn");
const qrCode = document.querySelector("#qr-code");
let selectedCrypto = null;

// Wallet addresses (replace with your actual ones)
const wallets = {
  BTC: "bc1qexamplebtcwalletaddress12345",
  ETH: "0xExampleEthereumWallet1234567890abcdef",
  SOL: "SolExampleWallet1234567890abcdef",
  USDT: "0xExampleUSDTWallet1234567890abcdef",
  USDC: "0xExampleUSDCWallet1234567890abcdef",
  XMR: "48ExampleMoneroWallet1234567890abcdef"
};

cryptoOptions.forEach((option) => {
  option.addEventListener("click", () => {
    cryptoOptions.forEach((o) => o.classList.remove("active"));
    option.classList.add("active");
    selectedCrypto = option.dataset.crypto;

    showWallet(selectedCrypto);
    updateSummary();
  });
});

function showWallet(symbol) {
  walletContainer.style.display = "block";
  walletAddress.textContent = wallets[symbol] || "Unavailable";
  generateQRCode(wallets[symbol]);
}

// ======== COPY WALLET ADDRESS =========
if (copyBtn) {
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(walletAddress.textContent).then(() => {
      showToast("Wallet address copied!");
    });
  });
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}

// ======== QR CODE GENERATION =========
function generateQRCode(address) {
  if (!qrCode) return;
  qrCode.innerHTML = "";
  if (!address) return;

  // Use a simple free API for QR code
  const img = document.createElement("img");
  img.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
    address
  )}`;
  img.alt = "QR Code";
  qrCode.appendChild(img);
}

// ======== LIVE EXCHANGE RATES =========
let rates = {
  BTC: 65000,
  ETH: 3000,
  SOL: 150,
  USDT: 1,
  USDC: 1,
  XMR: 170
};

async function fetchRates() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,tether,usd-coin,monero&vs_currencies=usd"
    );
    const data = await response.json();
    rates = {
      BTC: data.bitcoin.usd,
      ETH: data.ethereum.usd,
      SOL: data.solana.usd,
      USDT: data.tether.usd,
      USDC: data["usd-coin"].usd,
      XMR: data.monero.usd
    };
    updateSummary();
  } catch (err) {
    console.warn("Failed to fetch live rates. Using fallback rates.");
  }
}

fetchRates();
setInterval(fetchRates, 60000); // Update every 60s

// ======== DONATION SUMMARY =========
const summaryBox = document.querySelector(".donation-summary");
const summaryAmount = document.querySelector(".summary-amount");
const summaryCrypto = document.querySelector(".summary-crypto");
const summaryEquivalent = document.querySelector(".summary-equivalent");

function updateSummary() {
  if (!summaryBox) return;

  if (selectedAmount && selectedCrypto) {
    const rate = rates[selectedCrypto] || 1;
    const equivalent = (selectedAmount / rate).toFixed(6);

    summaryAmount.textContent = `$${selectedAmount.toFixed(2)}`;
    summaryCrypto.textContent = selectedCrypto;
    summaryEquivalent.textContent = `${equivalent} ${selectedCrypto}`;

    summaryBox.classList.add("visible");
  } else {
    summaryBox.classList.remove("visible");
  }
}

// ======== SCROLL REVEAL EFFECTS =========
const sections = document.querySelectorAll(".section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("in-view");
    });
  },
  { threshold: 0.15 }
);
sections.forEach((section) => observer.observe(section));

// ======== BACK TO TOP BUTTON =========
const backToTop = document.querySelector(".back-to-top");
if (backToTop) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });
  backToTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
}
