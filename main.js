/* ============================================================
   WINGWATCH AFRICA — main.js
   Dark mode | Mobile nav | Scroll reveal | Active nav link
   ============================================================ */

(function () {

  /* ── Dark / Light Mode ── */
  const root   = document.documentElement;
  const toggle = document.querySelectorAll('.theme-toggle');
  const saved  = localStorage.getItem('ww-theme') || 'light';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('ww-theme', theme);
    toggle.forEach(btn => {
      btn.textContent = theme === 'dark' ? '☀️' : '🌙';
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  applyTheme(saved);

  toggle.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  });

  /* ── Mobile Nav ── */
  const hamburger  = document.querySelector('.nav__hamburger');
  const mobileNav  = document.querySelector('.nav__mobile');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const isOpen = mobileNav.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    mobileNav.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
  }

  /* ── Active Nav Link ── */
  const path  = window.location.pathname;
  const links = document.querySelectorAll('.nav__link:not(.nav__link--donate)');

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    if (
      (href === '/' && (path === '/' || path === '/index.html')) ||
      (href !== '/' && path.startsWith(href))
    ) {
      link.classList.add('active');
    }
  });

  /* ── Scroll Reveal ── */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── Nav scroll shadow ── */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 20
        ? '0 4px 20px rgba(26,42,32,0.12)'
        : 'none';
    }, { passive: true });
  }

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
