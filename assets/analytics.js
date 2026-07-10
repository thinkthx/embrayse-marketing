window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-SJKZ557G4Z');

// CTA click events
document.addEventListener('click', (e) => {
  const demoLink = e.target.closest('a[href="#book-demo"]');
  if (demoLink) {
    let location = 'page';
    if (demoLink.classList.contains('nav__cta')) {
      location = 'nav';
    } else if (demoLink.classList.contains('nav__cta-mobile')) {
      location = 'nav_mobile';
    } else {
      const section = demoLink.closest('section');
      if (section) location = section.className.split(' ')[0] || section.id || 'page';
    }
    gtag('event', 'demo_cta_click', { cta_location: location });
  }

  const emailLink = e.target.closest('a[href^="mailto:demo@"]');
  if (emailLink) {
    gtag('event', 'email_fallback_click');
  }
});
