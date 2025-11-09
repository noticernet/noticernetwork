/* ======================================================
   DONATE.JS — Noticer Network Donation Page Logic
   ======================================================
   Features:
   ✅ Preset + custom donation amounts
   ✅ Real-time crypto price fetching from CoinGecko
   ✅ Dynamic USD ⇆ Crypto conversion
   ✅ Crypto selector with highlight + wallet details
   ✅ Copy-to-clipboard for wallet address
   ✅ QR code generation using qrserver API
   ✅ Smooth UI transitions and animations
   ====================================================== */

// --- CONFIGURATION --- //
const CRYPTOS = {
  BTC: {
    name: "Bitcoin",
    icon: "icon-btc.svg",
    wallet: "your-bitcoin-wallet-address-here",
    coingecko: "bitcoin",
  },
  ETH: {
    name: "Ethereum",
    icon: "icon-eth.svg",
    wallet: "your-ethereum-wallet-address-here",
    coingecko: "ethereum",
  },
  SOL: {
    name: "Solana",
    icon: "icon-sol.svg",
    wallet: "your-solana-wallet-address-here",
    coingecko: "solana",
  },
  USDT: {
    name: "Tether (USDT)",
    icon: "icon-usdt.svg",
    wallet: "your-tether-wallet-address-here",
    coingecko: "tether",
  },
  USDC: {
    name: "USD Coin (USDC)",
    icon: "icon-usdc.svg",
    wallet: "your-usdc-wallet-address-here",
    coingecko: "usd-coin",
  },
  XMR: {
    name: "Monero",
    icon: "icon-xmr.svg",
    wallet: "your-monero-wallet-address-here",
    coingecko: "monero",
  },
};

// --- GLOBAL STATE --- //
let selectedAmount = null;
let selectedCrypto = null;
let cryptoPrices = {}; // live prices in USD

// --- DOM ELEMENTS --- //
const amountButtons = document.querySelectorAll(".amount-btn");
const customInput = document.getElementById("custom-amount");
const cryptoButtons = document.querySelectorAll(".crypto-option");
const walletContainer = document.getElementById("wallet-info");
const walletAddressEl = document.getElementById("wallet-address");
const copyButton = document.getElementById("copy-wallet");
const qrCode = document.getElementById("qr-code");
const summaryCrypto = document.getElementById("summary-crypto");
const summaryAmount = document.getElementById("summary-amount");
const summaryEquivalent = document.getElementById("summary-equivalent");
const toast = document.getElementById("toast");

// --- UTILITY FUNCTIONS --- //

// Fetch live prices from CoinGecko
async function fetchPrices() {
  try {
    const ids = Object.values(CRYPTOS).map(c => c.coingecko).join(",");
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
    const data = await res.json();
    for (let key in CRYPTOS) {
      const cg = CRYPTOS[key].coingecko;
      cryptoPrices[key] = data[cg]?.usd || null;
    }
    console.log("✅ Prices updated:", cryptoPrices);
  } catch (err) {
    console.error("❌ Error fetching prices:", err);
  }
}

// Format USD
function formatUSD(value) {
  return `$${parseFloat(value).toFixed(2)}`;
}

// Format crypto amount
function formatCrypto(value, symbol) {
  return `${parseFloat(value).toFixed(6)} ${symbol}`;
}

// Copy wallet address
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast("Wallet address copied!");
  });
}

// Toast popup
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  setTimeout(() => toast.classList.remove("visible"), 2500);
}

// Update QR code
function updateQR(address) {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(address)}&size=150x150`;
  qrCode.src = qrUrl;
}

// --- EVENT HANDLERS --- //

// Amount selection
amountButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    amountButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    if (btn.dataset.value === "custom") {
      customInput.style.display = "block";
      customInput.focus();
      selectedAmount = null;
    } else {
      customInput.style.display = "none";
      selectedAmount = parseFloat(btn.dataset.value);
    }

    updateSummary();
  });
});

// Custom amount input
customInput.addEventListener("input", e => {
  const val = parseFloat(e.target.value);
  selectedAmount = isNaN(val) ? null : val;
  updateSummary();
});

// Crypto selection
cryptoButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    cryptoButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const cryptoKey = btn.dataset.crypto;
    selectedCrypto = cryptoKey;

    const crypto = CRYPTOS[cryptoKey];
    walletAddressEl.textContent = crypto.wallet;
    walletContainer.classList.add("visible");
    updateQR(crypto.wallet);

    updateSummary();
  });
});

// Copy button
copyButton.addEventListener("click", () => {
  const address = walletAddressEl.textContent;
  if (address) copyToClipboard(address);
});

// --- UPDATE SUMMARY --- //
function updateSummary() {
  if (!selectedCrypto || !selectedAmount) {
    summaryCrypto.textContent = "—";
    summaryAmount.textContent = "—";
    summaryEquivalent.textContent = "—";
    return;
  }

  const price = cryptoPrices[selectedCrypto];
  if (!price) return;

  const cryptoEquivalent = selectedAmount / price;
  const symbol = selectedCrypto;
  const cryptoName = CRYPTOS[selectedCrypto].name;

  summaryCrypto.textContent = `${cryptoName}`;
  summaryAmount.textContent = formatUSD(selectedAmount);
  summaryEquivalent.textContent = formatCrypto(cryptoEquivalent, symbol);
}

// --- INIT --- //
async function init() {
  await fetchPrices();
  setInterval(fetchPrices, 60000); // refresh every 60s
  console.log("💠 Donate.js initialized");
}

document.addEventListener("DOMContentLoaded", init);
