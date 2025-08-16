// ==============================
// Identity to Impact - JS
// ==============================

const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

// Current year
const yearEl = $("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Smooth scroll focus management
$$('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if(target){
      setTimeout(() => target.setAttribute('tabindex', '-1'), 0);
      setTimeout(() => target.focus({preventScroll:true}), 250);
    }
  });
});

// Mobile nav toggle
const navToggle = $(".nav__toggle");
const navMenu = $("#navMenu");
if(navToggle){
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navMenu.setAttribute("aria-expanded", String(!expanded));
  });
}

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('revealed');
      io.unobserve(entry.target);
    }
  });
}, {threshold: 0.2});
$$('.reveal').forEach(el => io.observe(el));

// Countdown
(function startCountdown(){
  const el = $(".countdown");
  if(!el) return;
  const end = new Date(el.getAttribute("data-countdown"));
  const days = $("#cd-days"), hours=$("#cd-hours"), mins=$("#cd-mins"), secs=$("#cd-secs");

  function update(){
    const now = new Date();
    let diff = Math.max(0, end - now);
    const d = Math.floor(diff / (1000*60*60*24));
    diff -= d * (1000*60*60*24);
    const h = Math.floor(diff / (1000*60*60));
    diff -= h * (1000*60*60);
    const m = Math.floor(diff / (1000*60));
    diff -= m * (1000*60);
    const s = Math.floor(diff / 1000);
    days.textContent = String(d).padStart(2, '0');
    hours.textContent = String(h).padStart(2, '0');
    mins.textContent = String(m).padStart(2, '0');
    secs.textContent = String(s).padStart(2, '0');
  }
  update();
  setInterval(update, 1000);
})();
