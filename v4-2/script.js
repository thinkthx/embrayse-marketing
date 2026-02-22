document.documentElement.classList.add('js');

const header = document.querySelector('.site-header');
const nav = document.getElementById('primary-nav');
const toggle = document.getElementById('menu-toggle');
const heroParallax = document.querySelector('[data-hero-parallax]');
const heroDebugPanel = document.getElementById('hero-debug');
const heroDebugRerun = document.getElementById('hero-debug-rerun');
const heroDebugReset = document.getElementById('hero-debug-reset');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
const heroDebugDefaults = {
  '--hero-card-width': { value: 35, unit: '%' },
  '--hero-card-left': { value: -9, unit: '%' },
  '--hero-card-top': { value: -8, unit: '%' },
  '--hero-panel-width': { value: 56, unit: '%' },
  '--hero-panel-right': { value: -8, unit: '%' },
  '--hero-panel-bottom': { value: -6.5, unit: '%' },
  '--hero-enter-duration': { value: 1250, unit: 'ms' },
  '--hero-base-delay': { value: 80, unit: 'ms' },
  '--hero-card-delay': { value: 220, unit: 'ms' },
  '--hero-panel-delay': { value: 340, unit: 'ms' },
  '--hero-card-start-x': { value: 118, unit: 'px' },
  '--hero-card-start-y': { value: 84, unit: 'px' },
  '--hero-panel-start-x': { value: -128, unit: 'px' },
  '--hero-panel-start-y': { value: -92, unit: 'px' },
};

let heroParallaxMaxX = 26;
let heroParallaxMaxY = 22;
let heroParallaxEase = 0.14;

const isHeroDebugEnabled = (() => {
  if (!heroDebugPanel) return false;
  const params = new URLSearchParams(window.location.search);
  return params.get('debugHero') === '1' || window.location.hash.includes('debug-hero') || window.localStorage.getItem('debugHero') === '1';
})();

const rerunHeroAnimation = () => {
  if (!heroParallax) return;
  heroParallax.classList.remove('is-visible');
  heroParallax.style.setProperty('--px', '0px');
  heroParallax.style.setProperty('--py', '0px');
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      heroParallax.classList.add('is-visible');
    });
  });
};

const parseNumeric = (raw) => {
  const parsed = Number.parseFloat(String(raw).trim());
  return Number.isFinite(parsed) ? parsed : null;
};

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 8);
});

if (isHeroDebugEnabled && heroDebugPanel && heroParallax) {
  heroDebugPanel.hidden = false;
  document.body.classList.add('hero-debug-on');

  const controls = Array.from(heroDebugPanel.querySelectorAll('input[data-css-var], input[data-js-var]'));

  const syncDebugInputs = () => {
    const computed = getComputedStyle(heroParallax);

    controls.forEach((input) => {
      const cssVar = input.dataset.cssVar;
      const jsVar = input.dataset.jsVar;

      if (cssVar) {
        const val = parseNumeric(computed.getPropertyValue(cssVar));
        if (val !== null) input.value = String(val);
        return;
      }

      if (!jsVar) return;
      if (jsVar === 'parallaxX') input.value = String(heroParallaxMaxX);
      if (jsVar === 'parallaxY') input.value = String(heroParallaxMaxY);
      if (jsVar === 'parallaxEase') input.value = String(heroParallaxEase);
    });
  };

  controls.forEach((input) => {
    input.addEventListener('input', () => {
      const value = parseNumeric(input.value);
      if (value === null) return;

      const cssVar = input.dataset.cssVar;
      const jsVar = input.dataset.jsVar;

      if (cssVar) {
        const unit = input.dataset.unit ?? '';
        heroParallax.style.setProperty(cssVar, `${value}${unit}`);
        return;
      }

      if (jsVar === 'parallaxX') heroParallaxMaxX = value;
      if (jsVar === 'parallaxY') heroParallaxMaxY = value;
      if (jsVar === 'parallaxEase') heroParallaxEase = Math.min(0.5, Math.max(0.01, value));
    });
  });

  heroDebugRerun?.addEventListener('click', rerunHeroAnimation);

  heroDebugReset?.addEventListener('click', () => {
    Object.entries(heroDebugDefaults).forEach(([cssVar, config]) => {
      heroParallax.style.setProperty(cssVar, `${config.value}${config.unit}`);
    });

    heroParallaxMaxX = 26;
    heroParallaxMaxY = 22;
    heroParallaxEase = 0.14;
    syncDebugInputs();
    rerunHeroAnimation();
  });

  syncDebugInputs();
}

if (heroParallax && !prefersReducedMotion && hasFinePointer) {
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let frameId = 0;

  const animateParallax = () => {
    currentX += (targetX - currentX) * heroParallaxEase;
    currentY += (targetY - currentY) * heroParallaxEase;

    heroParallax.style.setProperty('--px', `${currentX.toFixed(2)}px`);
    heroParallax.style.setProperty('--py', `${currentY.toFixed(2)}px`);

    const settled = Math.abs(targetX - currentX) < 0.06 && Math.abs(targetY - currentY) < 0.06;
    if (!settled) {
      frameId = window.requestAnimationFrame(animateParallax);
      return;
    }

    frameId = 0;
  };

  const requestParallaxFrame = () => {
    if (!frameId) frameId = window.requestAnimationFrame(animateParallax);
  };

  const handleMove = (event) => {
    const rect = heroParallax.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const normX = ((event.clientX - rect.left) / rect.width) - 0.5;
    const normY = ((event.clientY - rect.top) / rect.height) - 0.5;

    targetX = normX * heroParallaxMaxX;
    targetY = normY * heroParallaxMaxY;
    requestParallaxFrame();
  };

  const resetParallax = () => {
    targetX = 0;
    targetY = 0;
    requestParallaxFrame();
  };

  heroParallax.addEventListener('pointermove', handleMove);
  heroParallax.addEventListener('pointerleave', resetParallax);
  heroParallax.addEventListener('pointercancel', resetParallax);
} else if (heroParallax) {
  heroParallax.style.setProperty('--px', '0px');
  heroParallax.style.setProperty('--py', '0px');
}

if (!prefersReducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
}
