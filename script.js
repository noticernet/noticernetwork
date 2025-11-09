(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  document.addEventListener('DOMContentLoaded', () => {
    $('#year').textContent = new Date().getFullYear();
  });

  // Mobile nav toggle
  const navToggle = $('.nav-toggle');
  const nav = $('#primary-nav');
  navToggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });

  // Smooth scroll
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = $(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Section reveal
  const sections = $$('.section');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => e.isIntersecting && e.target.classList.add('in-view'));
  }, { threshold: 0.15 });
  sections.forEach(s => io.observe(s));

  // Active nav highlight
  const navLinks = $$('a[data-link]');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = navLinks.find(a => a.getAttribute('href') === `#${id}`);
      if (link) {
        entry.isIntersecting ? link.setAttribute('aria-current', 'true') : link.removeAttribute('aria-current');
      }
    });
  }, { threshold: 0.45 });
  sections.forEach(s => sectionObserver.observe(s));

  // Back to Top
  const backBtn = $('#backToTop');
  window.addEventListener('scroll', () => {
    backBtn.classList.toggle('visible', window.scrollY > 300);
  });
  backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Progress animation
  const progBars = $$('.progress');
  const progObs = new IntersectionObserver((entries) => {
    entries.forEach(ent => {
      if (ent.isIntersecting) {
        const el = ent.target;
        el.style.width = `${el.dataset.target || 50}%`;
        progObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  progBars.forEach(pb => progObs.observe(pb));

  // Lazy images
  const lazyImgs = $$('.lazy');
  if ('IntersectionObserver' in window) {
    const imgObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const img = e.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imgObs.unobserve(img);
        }
      });
    }, { rootMargin: '150px' });
    lazyImgs.forEach(i => imgObs.observe(i));
  }

  // Focus outlines only when tabbing
  document.body.addEventListener('keydown', e => {
    if (e.key === 'Tab') document.body.classList.add('show-focus');
  }, { once: true });
})();
