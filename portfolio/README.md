# MD Sabbir Hossain — Portfolio

A premium, handcrafted, single-page developer portfolio built with **pure HTML5, CSS3, and vanilla JavaScript**. No frameworks, no build step — open `index.html` in any browser.

Designed to serve as a template for CSE / SWE students applying to top-tier companies (Google, Microsoft, Amazon, Apple, Meta, NVIDIA, Adobe, Atlassian, Intel, Oracle).

---

## Features

- Elegant, minimal, modern design with a real design system (tokens, spacing scale, typography scale)
- Fully responsive (1440 / 1024 / 768 / 480 / 360)
- Light & dark mode with `localStorage` persistence
- Sticky nav, scroll progress bar, section spy, smooth scroll
- Typing hero animation
- Animated skill progress bars
- Reveal-on-scroll transitions
- Ripple button effects
- Contact form with client-side validation
- Custom loader, custom scrollbar, back-to-top button
- SEO ready: title, description, canonical, Open Graph, Twitter Cards, JSON-LD
- Accessible: semantic HTML, ARIA, keyboard focus, reduced-motion support
- Zero dependencies. Zero build tooling. Zero backend.

---

## Folder structure

```
portfolio/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   ├── style.css
    │   └── responsive.css
    ├── js/
    │   └── script.js
    ├── images/
    │   ├── hero.png
    │   ├── about.jpg
    │   ├── project-1.jpg
    │   ├── project-2.jpg
    │   └── project-3.jpg
    ├── icons/
    ├── documents/
    │   └── resume.pdf
    └── favicon/
        └── favicon.svg
```

---

### Contact form
The submit handler is a stub — wire it to your service of choice inside `initContactForm` in `assets/js/script.js`:
- [Formspree](https://formspree.io) — point the `<form action>` to your endpoint
- [EmailJS](https://www.emailjs.com) — call `emailjs.send(...)`
- Your own API endpoint via `fetch()`

---

## Technologies

- HTML5 (semantic)
- CSS3 (custom properties, grid, `oklch`-friendly tokens, `color-mix`, container queries–ready)
- Vanilla JavaScript (ES2020, IntersectionObserver, no dependencies)
- Google Fonts: Inter, Poppins, JetBrains Mono

---

## License

MIT — free to use, adapt, and republish. Attribution appreciated but not required.
