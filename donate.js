// donate.js - interactive donation page
(() => {
  // Simple DOM helpers
  const $ = (s, c=document) => c.querySelector(s);
  const $$ = (s, c=document) => Array.from(c.querySelectorAll(s));

  // Mocked addresses and exchange rates (replace with real addresses + APIs)
  const CRYPTO = {
    BTC: { name: 'Bitcoin', icon: 'icon-btc.svg', address: 'bc1q-example-address-xxxxx', rateUSD: 56000 }, // 1 BTC = $56,000
    ETH: { name: 'Ethereum', icon: 'icon-eth.svg', address: '0xExampleEthereumAddress123', rateUSD: 3600 }, // 1 ETH = $3,600
    SOL: { name: 'Solana', icon: 'icon-sol.svg', address: 'So1ExampleSolanaAddrssXyz', rateUSD: 140 }, // 1 SOL = $140
    USDT:{ name: 'Tether', icon: 'icon-usdt.svg', address: 'Tether-address-example', rateUSD: 1 }, // 1 USDT = $1
    XMR: { name: 'Monero', icon: 'icon-xmr.svg', address: '44ExampleMoneroAddressxyz', rateUSD: 160 } // 1 XMR = $160
  };

  // Elements
  const amtBtns = $$('.amt-btn');
  const customRow = $('.custom-row');
  const customInput = $('#customAmount');
  const cryptoItems = $$('.crypto-item');
  const walletAddressEl = $('#walletAddress');
  const copyAddrBtn = $('#copyAddrBtn');
  const toggleQRBtn = $('#toggleQRBtn');
  const qrPanel = $('#qrPanel');
  const summaryUSD = $('#summaryUSD');
  const summaryCrypto = $('#summaryCrypto');
  const summaryMethod = $('#summaryMethod');
  const doneBtn = $('#doneBtn');
  const toast = $('#toast');
  const yearEl = $('#year');

  // State
  let selectedAmount = null; // number in USD
  let selectedCoin = null; // 'BTC' | 'ETH' | ...
  let lastToastTimer = null;

  // Init
  document.addEventListener('DOMContentLoaded', () => {
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    initAmountButtons();
    initCryptoButtons();
    initCopyButtons();
    initNavToggle();
    animateGoalBar();
  });

  // Nav toggle (simple)
  function initNavToggle(){
    const navToggle = $('.nav-toggle');
    const nav = $('#primary-nav');
    navToggle?.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Amount logic
  function initAmountButtons(){
    amtBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        amtBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const amt = btn.dataset.amount;
        if (amt === 'custom') {
          customRow.style.display = 'block';
          customInput.focus();
          selectedAmount = null;
        } else {
          customRow.style.display = 'none';
          customInput.value = '';
          selectedAmount = Number(amt);
        }
        updateSummary();
        updateFormState();
      });
    });

    customInput.addEventListener('input', () => {
      const v = customInput.value.replace(/[^0-9.]/g,'');
      customInput.value = v;
      selectedAmount = v ? parseFloat(v) : null;
      updateSummary();
      updateFormState();
    });
  }

  // Crypto selection logic
  function initCryptoButtons(){
    cryptoItems.forEach(btn => {
      btn.addEventListener('click', () => {
        // toggle selection
        cryptoItems.forEach(b => {
          b.setAttribute('aria-selected', 'false');
          b.classList.remove('selected');
        });
        btn.setAttribute('aria-selected', 'true');
        btn.classList.add('selected');

        selectedCoin = btn.dataset.coin;
        showWalletFor(selectedCoin);
        updateSummary();
        updateFormState();
      });
      // keyboard support (Enter/Space)
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
      });
    });
  }

  // Show wallet address and enable copy/QR
  function showWalletFor(coin){
    const data = CRYPTO[coin];
    if (!data) {
      walletAddressEl.textContent = 'Address not available';
      copyAddrBtn.disabled = true;
      toggleQRBtn.disabled = true;
      return;
    }
    walletAddressEl.textContent = data.address;
    copyAddrBtn.disabled = false;
    toggleQRBtn.disabled = false;
    // update QR placeholder hint (could be replaced with real QR generation)
    qrPanel.querySelector('.qr-hint').textContent = `${data.name} address — placeholder QR`;
    // Update small icon if you want (icons are embedded in the crypto-item buttons)
  }

  // Copy button handlers
  function initCopyButtons(){
    copyAddrBtn.addEventListener('click', async () => {
      const addr = walletAddressEl.textContent.trim();
      if (!addr || addr.startsWith('Select')) return;
      try {
        await navigator.clipboard.writeText(addr);
        showToast('Address copied to clipboard');
      } catch (err) {
        // fallback
        const fallback = prompt('Copy the address below:', addr);
        if (fallback !== null) showToast('Address ready to paste');
      }
    });

    toggleQRBtn.addEventListener('click', () => {
      const open = qrPanel.style.display === 'block';
      qrPanel.style.display = open ? 'none' : 'flex';
      toggleQRBtn.setAttribute('aria-expanded', String(!open));
    });

    // done button - emphasizes copy + next step
    doneBtn.addEventListener('click', async () => {
      if (!selectedCoin || !selectedAmount) {
        showToast('Select amount and crypto first');
        return;
      }
      // copy address for convenience
      const addr = walletAddressEl.textContent.trim();
      if (addr && navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(addr);
          showToast('Address copied, thank you!');
        } catch (err) {
          showToast('Copy failed — address shown for manual copy');
        }
      } else {
        showToast('Address ready to copy');
      }
      // Optionally you could open a modal with steps, or redirect to a confirmation page
    });
  }

  // Update summary card
  function updateSummary(){
    summaryUSD.textContent = selectedAmount ? `$${formatNumber(selectedAmount)}` : '—';
    if (selectedAmount && selectedCoin) {
      const rate = CRYPTO[selectedCoin].rateUSD;
      const cryptoAmount = selectedAmount / rate;
      summaryCrypto.textContent = `${formatCrypto(cryptoAmount)} ${selectedCoin}`;
      summaryMethod.textContent = CRYPTO[selectedCoin].name;
    } else {
      summaryCrypto.textContent = '—';
      summaryMethod.textContent = selectedCoin ? CRYPTO[selectedCoin].name : '—';
    }
  }

  function updateFormState(){
    const ready = !!(selectedAmount && selectedCoin);
    doneBtn.disabled = !ready;
    // copy buttons enabled state handled elsewhere
  }

  // small helpers
  function formatNumber(n){
    return Number(n).toLocaleString(undefined, {minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2});
  }
  function formatCrypto(n){
    if (!isFinite(n)) return '—';
    if (n >= 1) return Number(n).toLocaleString(undefined, {maximumFractionDigits: 4});
    if (n >= 0.0001) return Number(n).toLocaleString(undefined, {maximumFractionDigits: 6});
    return Number(n).toExponential(6);
  }

  // Toast helper (accessible)
  function showToast(msg){
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    if (lastToastTimer) clearTimeout(lastToastTimer);
    lastToastTimer = setTimeout(() => { toast.classList.remove('show'); }, 2500);
  }

  // animate goal bar on load
  function animateGoalBar(){
    const bar = document.querySelector('.goal-progress');
    if (!bar) return;
    requestAnimationFrame(() => {
      bar.style.width = bar.style.width || '44%';
    });
  }

})();
