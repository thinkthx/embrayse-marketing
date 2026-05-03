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
   AUTO-HIDE NAV ON SCROLL
   =========================== */

(() => {
  const nav = document.getElementById('nav');
  if (!nav) return;

  let lastY = window.scrollY;
  let ticking = false;
  const threshold = 80;

  const update = () => {
    const y = window.scrollY;
    const delta = y - lastY;
    const menuOpen = navLinks && navLinks.classList.contains('is-open');

    if (menuOpen || y < threshold) {
      nav.classList.remove('nav--hidden');
    } else if (delta > 6) {
      nav.classList.add('nav--hidden');
    } else if (delta < 0) {
      nav.classList.remove('nav--hidden');
    }

    lastY = y;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  // Keep nav visible after anchor link clicks
  const keepVisible = () => {
    nav.classList.remove('nav--hidden');
    requestAnimationFrame(() => { lastY = window.scrollY; });
  };
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => setTimeout(keepVisible, 50));
  });
  window.addEventListener('hashchange', () => setTimeout(keepVisible, 50));
})();

/* ===========================
   CAROUSEL ARROWS
   =========================== */

document.querySelectorAll('[data-carousel-prev]').forEach(btn => {
  btn.addEventListener('click', () => {
    const carousel = btn.closest('.opint__carousel-wrapper').querySelector('.opint__carousel');
    const card = carousel.querySelector('.opint__card');
    if (!card) return;
    const step = card.offsetWidth + 24;
    const target = Math.max(0, carousel.scrollLeft - step);
    carousel.scrollTo({ left: target, behavior: 'smooth' });
  });
});

document.querySelectorAll('[data-carousel-next]').forEach(btn => {
  btn.addEventListener('click', () => {
    const carousel = btn.closest('.opint__carousel-wrapper').querySelector('.opint__carousel');
    const card = carousel.querySelector('.opint__card');
    if (!card) return;
    const step = card.offsetWidth + 24;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    const target = Math.min(maxScroll, carousel.scrollLeft + step);
    carousel.scrollTo({ left: target, behavior: 'smooth' });
  });
});

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

  /* Genie animation for feedback survey cards */
  const surveys = document.querySelector('.feedback__surveys-images');
  if (surveys) {
    const genieObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => surveys.classList.add('is-animating'), 1200);
          genieObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.9 });
    genieObserver.observe(surveys);
  }
}
