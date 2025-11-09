// ---------- Settings ----------
const wallets = {
  BTC: "YOUR_BTC_WALLET_HERE",
  ETH: "YOUR_ETH_WALLET_HERE",
  SOL: "YOUR_SOL_WALLET_HERE",
  USDT: "YOUR_USDT_WALLET_HERE",
  USDC: "YOUR_USDC_WALLET_HERE",
  XMR: "YOUR_XMR_WALLET_HERE"
};

// ---------- Elements ----------
const amountButtons = document.querySelectorAll(".amount-btn");
const customInput = document.getElementById("custom-amount");
const cryptoCards = document.querySelectorAll(".crypto");
const walletInfo = document.getElementById("wallet-info");
const walletAddress = document.getElementById("wallet-address");
const copyBtn = document.getElementById("copy-btn");
const summary = document.getElementById("summary");
const summaryText = document.getElementById("summary-text");
const qrContainer = document.getElementById("qrcode");

let selectedAmount = null;
let selectedCrypto = null;
let rates = {};

// ---------- Fetch exchange rates ----------
async function getRates() {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,tether,usd-coin,monero&vs_currencies=usd");
    const data = await res.json();
    rates = {
      BTC: data.bitcoin.usd,
      ETH: data.ethereum.usd,
      SOL: data.solana.usd,
      USDT: data.tether.usd,
      USDC: data["usd-coin"].usd,
      XMR: data.monero.usd
    };
  } catch (err) {
    console.error("Exchange rates unavailable", err);
  }
}
getRates();

// ---------- Amount selection ----------
amountButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    amountButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    if (btn.classList.contains("custom")) {
      customInput.style.display = "inline-block";
      customInput.focus();
    } else {
      customInput.style.display = "none";
      selectedAmount = parseFloat(btn.dataset.amount);
      updateSummary();
    }
  });
});

customInput.addEventListener("input", () => {
  selectedAmount = parseFloat(customInput.value);
  updateSummary();
});

// ---------- Crypto selection ----------
cryptoCards.forEach(card => {
  card.addEventListener("click", () => {
    cryptoCards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    selectedCrypto = card.dataset.symbol;
    const address = wallets[selectedCrypto];
    walletAddress.textContent = address;
    walletInfo.classList.remove("hidden");

    qrContainer.innerHTML = "";
    new QRCode(qrContainer, { text: address, width: 128, height: 128, colorDark: "#ffffff", colorLight: "#000000" });
    updateSummary();
  });
});

// ---------- Copy wallet ----------
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(walletAddress.textContent);
  copyBtn.textContent = "Copied!";
  setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
});

// ---------- Summary ----------
function updateSummary() {
  if (!selectedAmount || !selectedCrypto) return;
  const usdRate = rates[selectedCrypto] || 0;
  const cryptoValue = usdRate ? (selectedAmount / usdRate).toFixed(6) : "?";
  summaryText.textContent = `$${selectedAmount} ≈ ${cryptoValue} ${selectedCrypto}`;
  summary.classList.remove("hidden");
}
