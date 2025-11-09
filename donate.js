/* donate.js — Noticer Network
   Full-featured client-side donation interactions:
   - Announcement bar marquee (JS fallback)
   - Amount presets + custom amount input
   - Crypto selection (BTC, ETH, SOL, USDT, USDC, XMR)
   - Live prices from CoinGecko
   - USD -> crypto conversion display
   - Copy-to-clipboard & accessible toast
   - QR generation via api.qrserver.com
   - Defensive selectors (works with several HTML variants)
*/

(() => {
  'use strict';

  /* -------------------------
     Config / Crypto metadata
     Add or replace wallet addresses here if you want them hard-coded.
     If addresses are present in the DOM (ids like btcAddress), those will override.
     ------------------------- */
  const CRYPTOS = {
    BTC: { cgId: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', uriScheme: 'bitcoin', icon: 'icon-btc.svg', wallet: '' },
    ETH: { cgId: 'ethereum', name: 'Ethereum', symbol: 'ETH', uriScheme: 'ethereum', icon: 'icon-eth.svg', wallet: '' },
    SOL: { cgId: 'solana', name: 'Solana', symbol: 'SOL', uriScheme: 'solana', icon: 'icon-sol.svg', wallet: '' },
    USDT:{ cgId: 'tether', name: 'Tether', symbol: 'USDT', uriScheme: '', icon: 'icon-usdt.svg', wallet: '' },
    USDC:{ cgId: 'usd-coin', name: 'USD Coin', symbol: 'USDC', uriScheme: '', icon: 'icon-usdc.svg', wallet: '' },
    XMR: { cgId: 'monero', name: 'Monero', symbol: 'XMR', uriScheme: 'monero', icon: 'icon-xmr.svg', wallet: '' }
  };

  // coin -> latest USD price
  const prices = {};

  // UI state
  let selectedUSD = null;   // number (USD)
  let selectedCoin = null;  // ex: 'BTC'
  let priceTimer = null;

  /* -------------------------
     Utility DOM helpers
     ------------------------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from((ctx || document).querySelectorAll(sel));
  const exists = el => !!el;

  /* -------------------------
     Announcement / Marquee
     Ensures continuous scroll even if CSS animation is unavailable.
     ------------------------- */
  function initMarquee() {
    const track = $('.ann-track');
    if (!track) return;

    // respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      track.style.animation = 'none';
      return;
    }

    // if CSS animation present, keep it; otherwise fallback to JS-driven transform loop
    const cs = window.getComputedStyle(track);
    const hasAnimation = cs.animationName && cs.animationName !== 'none';
    if (hasAnimation) return;

    // fallback JS marquee: duplicate children and animate transform
    // clone content so it repeats seamlessly
    if (!track.dataset.marqueeInited) {
      track.dataset.marqueeInited = '1';
      const children = Array.from(track.children);
      children.forEach(node => {
        const clone = node.cloneNode(true);
        track.appendChild(clone);
      });
    }

    let speed = 40; // pixels per second
    let x = 0;
    let last = performance.now();

    function step(now) {
      const dt = (now - last) / 1000;
      last = now;
      x -= speed * dt;
      // reset when scrolled half (we duplicated)
      const width = track.scrollWidth / 2;
      if (Math.abs(x) >= width) x += width;
      track.style.transform = `translateX(${x}px)`;
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);

    // pause on pointer hover for accessibility
    track.addEventListener('pointerenter', () => { speed = 0; });
    track.addEventListener('pointerleave', () => { speed = 40; });
  }

  /* -------------------------
     Price fetching (CoinGecko)
     ------------------------- */
  async function fetchPricesOnce() {
    try {
      const ids = Object.values(CRYPTOS).map(c => c.cgId).join(',');
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(ids)}&vs_currencies=usd`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`CoinGecko ${res.status}`);
      const data = await res.json();
      for (const key of Object.keys(CRYPTOS)) {
        const id = CRYPTOS[key].cgId;
        prices[key] = data[id] && data[id].usd ? Number(data[id].usd) : null;
      }
      // update any visible UI that depends on prices
      updateSummaryUI();
      // animate goal/progress bars if present using new data (not required)
    } catch (err) {
      console.warn('Price fetch failed:', err);
    }
  }

  function startPricePolling() {
    // initial fetch then poll
    fetchPricesOnce();
    if (priceTimer) clearInterval(priceTimer);
    priceTimer = setInterval(fetchPricesOnce, 60_000); // every 60s
  }

  /* -------------------------
     Wallet resolution
     - Looks for addresses in DOM first (ids like btcAddress, ethAddress, solAddress, usdtAddress, usdcAddress, xmrAddress)
     - Falls back to data-addr on elements with data attributes
     - Falls back to CRYPTOS map (if filled in config)
     ------------------------- */
  function resolveWalletFor(coin) {
    if (!coin || !CRYPTOS[coin]) return null;
    const idMap = {
      BTC: 'btcAddress',
      ETH: 'ethAddress',
      SOL: 'solAddress',
      USDT: 'usdtAddress',
      USDC: 'usdcAddress',
      XMR: 'xmrAddress'
    };
    // check specific id element
    const idEl = idMap[coin] && $(`#${idMap[coin]}`);
    if (idEl && idEl.textContent.trim()) return idEl.textContent.trim();

    // check for data-addr on crypto-item buttons (variants)
    const dataBtn = $$(`.crypto-item[data-coin="${coin}"], .crypto[data-symbol="${coin}"], .crypto[data-coin="${coin}"]`).find(b => !!b.dataset.addr || !!b.dataset.address);
    if (dataBtn) return dataBtn.dataset.addr || dataBtn.dataset.address || null;

    // check generic element with data attributes like data-btc-addr on page
    const generic = $(`[data-${coin.toLowerCase()}-addr]`);
    if (generic) return generic.getAttribute(`data-${coin.toLowerCase()}-addr`);

    // fallback to config
    return CRYPTOS[coin].wallet || null;
  }

  /* -------------------------
     QR generation
     - Uses api.qrserver.com to generate an image URL
     - Encodes a sensible payment URI when possible
     ------------------------- */
  function buildPaymentUri(coin, address, amountUSD) {
    if (!coin || !address) return address || '';
    const coinData = CRYPTOS[coin];
    const amount = Number(amountUSD) > 0 ? Number(amountUSD) : null;

    // If we have a fiat amount and a known price, convert to crypto amount
    let cryptoAmount = null;
    if (amount && prices[coin]) {
      cryptoAmount = amount / prices[coin];
    }

    // Use known URI schemes for common coins when possible
    // bitcoin:address?amount=0.00123  (amount is in BTC)
    // ethereum: sometimes wallet URIs are not standardized - we'll use eth:address if available
    // solana: solana:<address>?amount=...
    // monero: monero:address
    const scheme = coinData.uriScheme || '';
    if (scheme) {
      if (cryptoAmount) {
        // format numeric with reasonable decimals depending on coin
        const decimals = (coin === 'BTC' || coin === 'ETH') ? 8 : 6;
        const amtStr = Number(cryptoAmount).toFixed(decimals).replace(/(?:\.0+|(\.\d+?)0+)$/, '$1');
        return `${scheme}:${address}?amount=${amtStr}`;
      } else {
        return `${scheme}:${address}`;
      }
    }

    // fallback: embed address and optionally the USD amount
    if (cryptoAmount) {
      return `${address}?amount=${Number(cryptoAmount).toFixed(6)}`;
    }
    return address;
  }

  function updateQRImage(imgEl, uri) {
    if (!imgEl) return;
    const encoded = encodeURIComponent(uri);
    // using qrserver api
    imgEl.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encoded}&size=220x220&color=ffffff&bgcolor=000000`;
    imgEl.alt = `QR code for ${uri}`;
  }

  /* -------------------------
     Amount selection logic
     - supports buttons with attribute data-amount
     - supports custom input element with id #customAmount or #custom-amount
     ------------------------- */
  function initAmountSelection() {
    const amtButtons = Array.from(document.querySelectorAll('.amt-btn, .amount-btn, .amount-btn--preset'));
    const customRow = $('.custom-row') || $('.custom-amount-row') || null;
    const customInput = $('#customAmount') || $('#custom-amount') || null;

    // helper to set selected
    function setSelectedAmount(value, activateButton = null) {
      selectedUSD = (value === null || value === '') ? null : (typeof value === 'number' ? value : Number(value));
      // update buttons' active state
      amtButtons.forEach(b => b.classList.remove('active'));
      if (activateButton) activateButton.classList.add('active');

      // show/hide custom input
      if (customRow) {
        if (activateButton && (activateButton.dataset.amount === 'custom' || activateButton.classList.contains('amt-custom') || activateButton.classList.contains('custom'))) {
          customRow.style.display = '';
        } else {
          customRow.style.display = 'none';
        }
      } else if (customInput) {
        // if we have custom input directly
        const isCustom = activateButton && (activateButton.dataset.amount === 'custom' || activateButton.classList.contains('amt-custom') || activateButton.classList.contains('custom'));
        customInput.style.display = isCustom ? '' : 'none';
      }

      updateSummaryUI();
    }

    // wire up preset buttons
    amtButtons.forEach(btn => {
      btn.addEventListener('click', (ev) => {
        const amt = btn.dataset.amount || btn.getAttribute('data-value') || btn.textContent.replace(/[^0-9.]/g,'');
        if (amt === 'custom') {
          setSelectedAmount(null, btn);
          // if a custom input exists, focus it
          const ci = customInput || $('#customAmount') || $('#custom-amount');
          if (ci) {
            ci.style.display = '';
            ci.focus();
            ci.select && ci.select();
          }
        } else {
          const n = Number(amt);
          if (!isNaN(n)) setSelectedAmount(n, btn);
        }
      });
      // keyboard: Enter/Space
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
      });
    });

    // custom input change
    if (customInput) {
      customInput.addEventListener('input', (e) => {
        const v = String(e.target.value).trim();
        const n = Number(v);
        if (v === '') {
          selectedUSD = null;
        } else if (!isNaN(n) && isFinite(n)) {
          selectedUSD = n;
        }
        updateSummaryUI();
      });
    }
  }

  /* -------------------------
     Crypto selector logic
     - Supports elements with classes: .crypto-item, .crypto, .crypto-option
     - Buttons should have data-coin attribute like data-coin="BTC"
     - If button has data-addr or data-address, that address will be used
     - If not, resolveWalletFor will attempt to find an address in the DOM or config
     ------------------------- */
  function initCryptoSelector() {
    const items = $$(`.crypto-item, .crypto, .crypto-option`);
    if (!items.length) return;

    items.forEach(item => {
      item.setAttribute('role', 'option');
      item.tabIndex = 0;
      item.addEventListener('click', () => selectCryptoItem(item));
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectCryptoItem(item); }
      });
    });

    function selectCryptoItem(item) {
      // clear existing selection
      items.forEach(i => {
        i.classList.remove('active','selected');
        i.setAttribute('aria-selected', 'false');
      });

      item.classList.add('active','selected');
      item.setAttribute('aria-selected','true');

      const coin = (item.dataset.coin || item.dataset.symbol || item.dataset.crypto || '').toUpperCase().trim();
      if (!coin || !CRYPTOS[coin]) return;

      selectedCoin = coin;

      // resolve address: priority
      const inlineAddr = item.dataset.addr || item.dataset.address || item.getAttribute('data-addr') || item.getAttribute('data-address');
      const resolved = inlineAddr || resolveWalletFor(coin);
      // update wallet UI
      const walletEl = $('#walletAddress') || $('#wallet-address') || $('#wallet-address-display') || document.getElementById('walletAddress');
      const copyBtns = $$('button.copy-btn, button.copy-btn-js, #copyAddrBtn, #copy-wallet, .copy-address');
      const qrImg = $('#qrPanel img') || $('#qrPanel .qr-img') || $('#qrPanel img.qr') || $('#qrPanel') && $('#qrPanel').querySelector('img');

      // show address text element if present
      if (walletEl) {
        walletEl.textContent = resolved || 'Address unavailable';
      }

      // enable copy buttons
      copyBtns.forEach(b => {
        b.disabled = !resolved;
        if (!resolved) b.setAttribute('aria-disabled', 'true'); else b.removeAttribute('aria-disabled');
      });

      // update QR (create image if necessary)
      const qrContainer = $('#qrPanel') || $('#qr') || $('#qrcode') || $('#qr-code');
      if (qrContainer) {
        // ensure there is an <img> inside qrContainer
        let img = qrContainer.querySelector('img');
        if (!img) {
          img = document.createElement('img');
          img.className = 'qr-img';
          img.alt = 'QR code';
          qrContainer.innerHTML = ''; // clear placeholder svg
          qrContainer.appendChild(img);
        }
        const uri = buildPaymentUri(coin, resolved, selectedUSD);
        updateQRImage(img, uri);
        qrContainer.style.display = resolved ? '' : 'none';
      }

      updateSummaryUI();
    }
  }

  /* -------------------------
     Copy & Done buttons
     ------------------------- */
  function initCopyAndDoneButtons() {
    // Copy address buttons
    const copyBtns = $$('button.copy-btn, #copyAddrBtn, #copy-wallet, .copy-address');
    copyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // try several address sources
        const walletEl = $('#walletAddress') || $('#wallet-address') || $('#wallet-address-display') || document.getElementById('walletAddress');
        let address = (walletEl && walletEl.textContent.trim()) || btn.dataset.addr || btn.getAttribute('data-addr') || null;

        // fallback: check specific per-coin elements
        if (!address && selectedCoin) address = resolveWalletFor(selectedCoin);

        if (!address) {
          showToast('No address available to copy');
          return;
        }
        navigator.clipboard?.writeText(address).then(() => {
          showToast('Address copied');
          // small UI feedback
          const original = btn.textContent;
          btn.textContent = 'Copied';
          setTimeout(() => { btn.textContent = original; }, 1400);
        }).catch(() => {
          // fallback prompt
          const ok = prompt('Copy the address manually:', address);
          if (ok !== null) showToast('Address ready to paste');
        });
      });
    });

    // 'Done' button or 'Copy & donate' action
    const doneBtn = $('#doneBtn') || $('#donateNow') || $('.done-btn') || null;
    if (doneBtn) {
      doneBtn.addEventListener('click', async (e) => {
        // require both amount and coin
        if (!selectedCoin || !selectedUSD) {
          showToast('Select an amount and a cryptocurrency first');
          return;
        }
        const address = resolveWalletFor(selectedCoin);
        if (!address) {
          showToast('Address not available');
          return;
        }
        // copy address
        try {
          await navigator.clipboard.writeText(address);
          showToast('Address copied — complete the transfer in your wallet');
        } catch {
          showToast('Copy failed — address shown for manual copy');
        }
      });
    }
  }

  /* -------------------------
     Update summary UI (USD, crypto equivalent, method)
     Targets elements with ids we used earlier: #summaryUSD, #summaryCrypto, #summaryMethod
     Also supports alternate ids: #summary-amount, #summary-crypto, #summary-method
     ------------------------- */
  function updateSummaryUI() {
    const elUSD = $('#summaryUSD') || $('#summary-amount') || $('#summaryUSD-display') || null;
    const elCrypto = $('#summaryCrypto') || $('#summary-equivalent') || $('#summaryCrypto-display') || null;
    const elMethod = $('#summaryMethod') || $('#summary-method') || $('#summaryMethod-display') || null;

    if (elUSD) elUSD.textContent = selectedUSD ? `$${Number(selectedUSD).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : '—';
    if (!selectedCoin) {
      if (elCrypto) elCrypto.textContent = '—';
      if (elMethod) elMethod.textContent = '—';
      return;
    }
    if (elMethod) elMethod.textContent = CRYPTOS[selectedCoin] ? `${CRYPTOS[selectedCoin].name} (${selectedCoin})` : selectedCoin;

    if (selectedUSD && prices[selectedCoin]) {
      const cryptoAmt = selectedUSD / prices[selectedCoin];
      const formatted = cryptoAmt >= 1 ? cryptoAmt.toLocaleString(undefined, {maximumFractionDigits: 6}) : cryptoAmt.toExponential(6);
      if (elCrypto) elCrypto.textContent = `${formatted} ${selectedCoin}`;
    } else {
      if (elCrypto) elCrypto.textContent = '—';
    }
  }

  /* -------------------------
     Toast (accessible)
     - looks for #toast, .toast, or creates one
     ------------------------- */
  function showToast(message) {
    let t = $('#toast') || document.querySelector('.toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'toast';
      t.className = 'toast';
      t.setAttribute('role','status');
      t.setAttribute('aria-live','polite');
      document.body.appendChild(t);
      // base styles inlined if your CSS doesn't have them
      t.style.position = 'fixed';
      t.style.right = '20px';
      t.style.bottom = '20px';
      t.style.padding = '10px 14px';
      t.style.borderRadius = '10px';
      t.style.background = 'rgba(255,255,255,0.06)';
      t.style.color = '#fff';
      t.style.backdropFilter = 'blur(6px)';
      t.style.zIndex = 2200;
      t.style.transition = 'opacity .25s, transform .25s';
      t.style.opacity = '0';
      t.style.transform = 'translateY(8px)';
    }
    t.textContent = message;
    requestAnimationFrame(() => {
      t.style.opacity = '1';
      t.style.transform = 'translateY(0)';
    });
    clearTimeout(t._hideTimer);
    t._hideTimer = setTimeout(() => {
      t.style.opacity = '0';
      t.style.transform = 'translateY(8px)';
    }, 2200);
  }

  /* -------------------------
     Helpers: find element by selector or return null
     ------------------------- */
  function $(sel, ctx = document) { return ctx.querySelector(sel); } // re-declare to allow local usage in some contexts (safe)

  /* -------------------------
     init: wire everything up
     ------------------------- */
  function init() {
    // Marquee
    initMarquee();

    // Amount buttons etc
    initAmountSelection();

    // Crypto selector
    initCryptoSelector();

    // Copy/Done
    initCopyAndDoneButtons();

    // Prices
    startPricePolling();

    // Small: set footer year if present
    const yearEl = $('#year') || $('#footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // reveal goal progress bars if any
    const goalBars = $$('.goal-progress');
    goalBars.forEach(g => {
      const w = g.getAttribute('data-progress') || g.style.width || g.dataset.width || g.getAttribute('aria-valuenow') || '0%';
      // animate after a tick
      requestAnimationFrame(() => { g.style.width = w; });
    });

    // ensure announcement CSS fallback if needed (already handled)
    console.log('donate.js initialized');
  }

  // DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
