const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function applyTheme(theme) {
  if (theme === "dark" || theme === "light") {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  } else {
    root.removeAttribute("data-theme");
    localStorage.removeItem("theme");
  }
  updateToggleLabel();
}

function effectiveTheme() {
  const explicit = root.getAttribute("data-theme");
  if (explicit) return explicit;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function updateToggleLabel() {
  const active = effectiveTheme();
  themeToggle.textContent = active === "dark" ? "Light mode" : "Dark mode";
  themeToggle.setAttribute("aria-label", active === "dark" ? "Switch to light mode" : "Switch to dark mode");
}

const storedTheme = localStorage.getItem("theme");
if (storedTheme === "dark" || storedTheme === "light") {
  root.setAttribute("data-theme", storedTheme);
}
updateToggleLabel();

themeToggle.addEventListener("click", () => {
  const active = effectiveTheme();
  applyTheme(active === "dark" ? "light" : "dark");
});

if (!reducedMotion) {
  root.classList.add("motion-ok");
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.18 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  const heroMedia = document.querySelector(".hero-media");
  if (heroMedia) {
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const offset = Math.min(window.scrollY * 0.03, 16);
        heroMedia.style.transform = `translateY(${offset}px)`;
        ticking = false;
      });
    });
  }
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
}
