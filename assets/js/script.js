/* =========================================================
   MD Sabbir Hossain — Portfolio
   script.js · Interactions & animations (vanilla JS)
   ========================================================= */
(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initLoader();
    initTheme();
    initYear();
    initNav();
    initScrollProgress();
    initReveal();
    initTyping();
    initSkillBars();
    initRipple();
    initBackToTop();
    initContactForm();
    initSectionSpy();
  }

  /* ---------- Loading Screen ---------- */
  function initLoader() {
    const loader = $('#loader');
    if (!loader) return;
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('is-hidden'), 400);
    });
  }

  /* ---------- Theme Toggle (light/dark + persistence) ---------- */
  function initTheme() {
    const KEY = 'as-theme';
    const root = document.documentElement;
    const toggle = $('#themeToggle');
    const stored = localStorage.getItem(KEY);
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = stored || system;
    root.setAttribute('data-theme', theme);

    if (!toggle) return;
    toggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem(KEY, next);
    });
  }

  /* ---------- Footer year ---------- */
  function initYear() {
    const el = $('#year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Nav: scroll shadow, mobile burger, smooth close ---------- */
  function initNav() {
    const nav = $('#nav');
    const burger = $('#navBurger');
    const menu = $('#navMenu');

    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    if (burger && menu) {
      burger.addEventListener('click', () => {
        const open = menu.classList.toggle('is-open');
        burger.classList.toggle('is-open', open);
        burger.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
      });

      $$('a', menu).forEach(a => {
        a.addEventListener('click', () => {
          menu.classList.remove('is-open');
          burger.classList.remove('is-open');
          burger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });
    }
  }

  /* ---------- Scroll Progress Bar ---------- */
  function initScrollProgress() {
    const bar = $('#scrollProgress');
    if (!bar) return;
    const update = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      bar.style.width = `${Math.min(100, Math.max(0, scrolled * 100))}%`;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  /* ---------- Section spy (nav active state) ---------- */
  function initSectionSpy() {
    const links = $$('.nav__link');
    const map = new Map();
    links.forEach(l => {
      const id = l.getAttribute('href');
      if (id && id.startsWith('#')) map.set(id.slice(1), l);
    });

    const sections = Array.from(map.keys())
      .map(id => document.getElementById(id))
      .filter(Boolean);

    if (!('IntersectionObserver' in window) || sections.length === 0) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(l => l.classList.remove('is-active'));
          const link = map.get(e.target.id);
          if (link) link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(s => obs.observe(s));
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    const els = $$('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => obs.observe(el));
  }

  /* ---------- Typing animation ---------- */
  function initTyping() {
    const el = $('#typing');
    if (!el) return;
    let words = [];
    try { words = JSON.parse(el.dataset.words || '[]'); } catch { words = []; }
    if (!words.length) return;

    let wi = 0, ci = 0, deleting = false;

    const tick = () => {
      const word = words[wi];
      if (!deleting) {
        el.textContent = word.slice(0, ++ci);
        if (ci === word.length) { deleting = true; return setTimeout(tick, 1500); }
      } else {
        el.textContent = word.slice(0, --ci);
        if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
      }
      setTimeout(tick, deleting ? 40 : 80);
    };
    tick();
  }

  /* ---------- Skill progress bars ---------- */
  function initSkillBars() {
    const bars = $$('.skill-card__bars i');
    if (!('IntersectionObserver' in window)) {
      bars.forEach(b => { b.style.setProperty('--w', `${b.dataset.level || 0}%`); b.classList.add('is-animated'); });
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const level = e.target.dataset.level || 0;
          e.target.style.setProperty('--w', `${level}%`);
          e.target.classList.add('is-animated');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach(b => obs.observe(b));
  }

  /* ---------- Ripple effect on buttons ---------- */
  function initRipple() {
    $$('.btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const r = document.createElement('span');
        r.className = 'ripple';
        r.style.width = r.style.height = `${size}px`;
        r.style.left = `${e.clientX - rect.left - size / 2}px`;
        r.style.top = `${e.clientY - rect.top - size / 2}px`;
        btn.appendChild(r);
        setTimeout(() => r.remove(), 650);
      });
    });
  }

  /* ---------- Back to top ---------- */
  function initBackToTop() {
    const btn = $('#backToTop');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('is-visible', window.scrollY > 600);
    }, { passive: true });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Contact form (Operational via Formspree) ---------- */
  function initContactForm() {
    const form = $('#contactForm');
    const status = $('#contactStatus');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      $$('.field', form).forEach(f => f.classList.remove('is-invalid'));

      const fields = [
        { el: $('#cf-name'), test: v => v.trim().length >= 2 },
        { el: $('#cf-email'), test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
        { el: $('#cf-subject'), test: v => v.trim().length >= 2 },
        { el: $('#cf-message'), test: v => v.trim().length >= 10 },
      ];

      fields.forEach(f => {
        if (!f.test(f.el.value)) {
          f.el.closest('.field').classList.add('is-invalid');
          valid = false;
        }
      });

      if (!valid) {
        status.textContent = 'Please fix the highlighted fields.';
        status.className = 'contact__status is-error';
        return;
      }

      // Update UI to loading state
      status.textContent = 'Sending your message...';
      status.className = 'contact__status';
      
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      const formData = new FormData(form);

      // Fetch request sent directly to your Formspree Endpoint
      fetch('https://formspree.io/f/mbdveqlk', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          status.textContent = 'Thanks — your message has been sent. I\'ll get back within 24 hours.';
          status.className = 'contact__status is-success';
          form.reset();
        } else {
          return response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.textContent = data.errors.map(error => error.message).join(', ');
            } else {
              status.textContent = 'Oops! There was a problem submitting your form.';
            }
            status.className = 'contact__status is-error';
          });
        }
      })
      .catch(error => {
        status.textContent = 'Network error. Please try again later.';
        status.className = 'contact__status is-error';
      })
      .finally(() => {
        if (submitBtn) submitBtn.disabled = false;
      });
    });
  }
})();