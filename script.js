// script.js - modern interactions & accessibility
(() => {
  // Utilities
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // Set year in footer
  document.addEventListener('DOMContentLoaded', () => {
    $('#year') && ($('#year').textContent = new Date().getFullYear());
  });

  /* Mobile nav toggle */
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  navToggle && navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  /* Smooth scrolling for intra-page links (keyboard + click) */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', href);
      }
    });
  });

  /* Section reveal and active nav highlight using IntersectionObserver */
  const sections = $$('.section');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.12 });

  sections.forEach(s => io.observe(s));

  // Active link highlighting
  const navLinks = $$('a[data-link]');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = navLinks.find(a => a.getAttribute('href') === `#${id}`);
      if (link) {
        if (entry.isIntersecting) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(s => sectionObserver.observe(s));

  /* Back to Top */
  const backBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) backBtn.classList.add('visible');
    else backBtn.classList.remove('visible');
  });
  backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* Progress bar animation on view */
  const progBars = $$('.progress');
  const progObs = new IntersectionObserver((entries) => {
    entries.forEach(ent => {
      if (ent.isIntersecting) {
        const el = ent.target;
        const target = el.dataset.target ? Number(el.dataset.target) : 50;
        el.style.width = `${target}%`;
        progObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  progBars.forEach(pb => progObs.observe(pb));

  /* Lazy-load images */
  const lazyImgs = $$('.lazy');
  if ('IntersectionObserver' in window) {
    const imgObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const img = e.target;
          const src = img.dataset.src;
          if (src) {
            img.src = src;
            img.classList.remove('lazy');
            imgObs.unobserve(img);
          }
        }
      });
    }, { rootMargin: '120px' });
    lazyImgs.forEach(i => imgObs.observe(i));
  } else {
    // fallback: load immediately
    lazyImgs.forEach(i => i.src = i.dataset.src || i.src);
  }

  /* Copy-to-clipboard for crypto addresses with accessible feedback */
  $$('button.copy-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const addr = btn.dataset.addr;
      if (!addr) return;
      try {
        await navigator.clipboard.writeText(addr);
        // accessible live region feedback
        btn.textContent = 'Copied';
        setTimeout(() => btn.textContent = 'Copy', 1800);
      } catch (err) {
        // fallback: select & prompt
        prompt('Copy the address below:', addr);
      }
    });
  });

  /* QR toggle */
  $$('button.qr-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.donation-card');
      const qr = parent && parent.querySelector('.qr');
      if (!qr) return;
      const isVisible = qr.style.display === 'block';
      qr.style.display = isVisible ? 'none' : 'block';
      btn.setAttribute('aria-expanded', String(!isVisible));
    });
  });

  /* Ripple effect for all .btn elements (improves touch feel) */
  document.addEventListener('pointerdown', (ev) => {
    const b = ev.target.closest('.btn');
    if (!b) return;
    const rect = b.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const size = Math.max(rect.width, rect.height) * 1.2;
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${ev.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${ev.clientY - rect.top - size / 2}px`;
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.pointerEvents = 'none';
    ripple.style.background = 'rgba(255,255,255,0.06)';
    ripple.style.transform = 'scale(0)';
    ripple.style.transition = 'transform .5s, opacity .8s';
    b.appendChild(ripple);
    requestAnimationFrame(() => { ripple.style.transform = 'scale(1)'; ripple.style.opacity = '1'; });
    setTimeout(() => { ripple.style.opacity = '0'; setTimeout(() => ripple.remove(), 400); }, 400);
  });

  /* Search simulation (local filter) */
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('q');
  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      const q = (searchInput.value || '').trim().toLowerCase();
      const posts = $$('#blogGrid .blog-item');
      posts.forEach(p => {
        const txt = (p.textContent || '').toLowerCase();
        p.style.display = q === '' || txt.includes(q) ? '' : 'none';
      });
    });
  }

  /* Keyboard shortcuts (small accessibility helpers) */
  document.addEventListener('keydown', (e) => {
    // "g then d" to jump to donate (like quick nav) - only when not typing in a field
    if (e.key.toLowerCase() === 'g') {
      const handler = (ev) => {
        if (ev.key.toLowerCase() === 'd') {
          ev.preventDefault();
          document.querySelector('#donate').scrollIntoView({behavior:'smooth'});
          document.removeEventListener('keydown', handler);
        } else {
          document.removeEventListener('keydown', handler);
        }
      };
      document.addEventListener('keydown', handler);
    }
  });

  /* close mobile nav on outside click */
  document.addEventListener('click', (ev) => {
    if (!nav || !nav.classList.contains('open')) return;
    if (!ev.target.closest('#primary-nav') && !ev.target.closest('.nav-toggle')) {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* Accessibility: ensure focus outlines visible when keyboard used */
  (function focusStyleManager(){
    const body = document.body;
    function handleFirstTab(e) {
      if (e.key === 'Tab') {
        body.classList.add('show-focus');
        window.removeEventListener('keydown', handleFirstTab);
      }
    }
    window.addEventListener('keydown', handleFirstTab);
  })();

})();
