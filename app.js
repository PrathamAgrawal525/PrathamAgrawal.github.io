/* ---------------------------
   CLEAN final app.js - FIXED
   --------------------------- */

/* Year */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* PAGE LOADER: fade out on window.load */
window.addEventListener("load", () => {
  const loader = document.getElementById("page-loader");
  if (loader && window.gsap) {
    gsap.to(loader, {
      opacity: 0,
      duration: 0.55,
      ease: "power2.out",
      onComplete: () => {
        loader.style.display = "none";
      },
    });
  } else if (loader) {
    loader.style.display = "none";
  }
});

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
  } catch (e) { }
}
themeToggle?.addEventListener("click", () =>
  applyTheme(!document.body.classList.contains("light"))
);
// restore
try {
  const s = localStorage.getItem("site-theme");
  if (s === "light") applyTheme(true);
  else if (s === "dark") applyTheme(false);
} catch (e) { }

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

/* GSAP PARALLAX (Hero only - removed conflicting scroll animations) */
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.to(".hero-inner", {
    y: -26,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
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

/* CURSOR + TRAIL (lightweight) */
const cursor = document.getElementById("cursor-dot");
const canvas = document.getElementById("cursor-trail");
const ctx = canvas?.getContext("2d");

function resizeCanvas() {
  if (canvas) {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let mouse = { x: innerWidth / 2, y: innerHeight / 2 },
  points = [];
for (let i = 0; i < 12; i++) points.push({ x: mouse.x, y: mouse.y });

window.addEventListener("pointermove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  if (cursor) {
    cursor.style.left = mouse.x + "px";
    cursor.style.top = mouse.y + "px";
  }
});

function draw() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  points.unshift({ x: mouse.x, y: mouse.y });
  points.length = 12;
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    ctx.beginPath();
    ctx.fillStyle = `rgba(0,212,255,${1 - i / points.length})`;
    ctx.arc(p.x, p.y, 10 - i * 0.6, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);

/* accessibility reduced motion */
if (
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  if (canvas) canvas.style.display = "none";
  if (cursor) cursor.style.display = "none";
}
