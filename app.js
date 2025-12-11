const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* MOBILE NAV */
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  document.body.classList.toggle("menu-open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
});

/* THEME TOGGLE (persist) */
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
function applyTheme(light) {
  document.body.classList.toggle("light", !!light);
  if (themeIcon) themeIcon.className = light ? "fa fa-sun" : "fa fa-moon";
  try {
    localStorage.setItem("site-theme", light ? "light" : "dark");
  } catch (e) {}
}
themeToggle?.addEventListener("click", () =>
  applyTheme(!document.body.classList.contains("light"))
);
// restore
try {
  const s = localStorage.getItem("site-theme");
  if (s === "light") applyTheme(true);
  else if (s === "dark") applyTheme(false);
} catch (e) {}

/* TYPING EFFECT */
(function typing() {
  const el = document.getElementById("typed");
  if (!el) return;
  const words = [
    "Frontend Developer",
    "Fullstack Engineer",
    "UI/UX Enthusiast",
  ];
  let wi = 0,
    ci = 0,
    del = false;
  function step() {
    const w = words[wi];
    el.textContent = w.slice(0, ci);
    if (!del) ci++;
    else ci--;
    if (ci === w.length + 1) {
      del = true;
      setTimeout(step, 700);
      return;
    }
    if (ci === 0 && del) {
      del = false;
      wi = (wi + 1) % words.length;
    }
    setTimeout(step, del ? 50 : 110);
  }
  step();
})();

/* INTERSECTION OBSERVER REVEAL (Single source of animation) */
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
reveals.forEach((r) => io.observe(r));

/* PARTICLES */
if (window.particlesJS) {
  particlesJS("particles-js", {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 800 } },
      color: { value: ["#7c5cff", "#00d4ff"] },
      shape: { type: "circle" },
      opacity: { value: 0.12 },
      size: { value: 3, random: true },
      line_linked: { enable: false },
      move: { enable: true, speed: 0.7, random: true, out_mode: "out" },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "grab" },
        onclick: { enable: false },
      },
      modes: { grab: { distance: 140, line_linked: { opacity: 0.12 } } },
    },
    retina_detect: true,
  });
}

/* 3D TILT */
document.querySelectorAll(".tilt").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const rx = (y - 0.5) * 10;
    const ry = (x - 0.5) * -12;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener("mouseleave", () => (card.style.transform = ""));
});

/* accessibility reduced motion */
if (
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  if (canvas) canvas.style.display = "none";
  if (cursor) cursor.style.display = "none";
}
