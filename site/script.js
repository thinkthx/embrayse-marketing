/* ===========================
   INIT
   =========================== */

document.documentElement.classList.add('js');

/* ===========================
   MOBILE NAV TOGGLE
   =========================== */

const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isOpen);
    navLinks.classList.toggle('is-open');
  });

  // Close on link click
  navLinks.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('is-open');
    });
  });
}

/* ===========================
   EXCLUSIVE ACCORDIONS
   =========================== */

document.querySelectorAll('[data-accordion-group]').forEach(group => {
  const items = group.querySelectorAll('[data-accordion]');

  items.forEach(item => {
    const trigger = item.querySelector('.accordion__trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all in group
      items.forEach(other => {
        other.classList.remove('is-open');
        const otherTrigger = other.querySelector('.accordion__trigger');
        if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
      });

      // Open clicked (unless it was already open)
      if (!isOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
});

/* ===========================
   SCROLL REVEAL
   =========================== */

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
