// ==============================
// Identity to Impact - JS
// ==============================

// Utility: qs
const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

// Current year
$("#year").textContent = new Date().getFullYear();

// Smooth scroll focus management for accessibility
$$('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if(target){
      // allow default scrolling
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

// Intersection Observer reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('revealed');
      io.unobserve(entry.target);
    }
  });
}, {threshold: 0.2});

$$('.reveal').forEach(el => io.observe(el));

// Countdown timer (reads ISO string from data-countdown attribute)
function startCountdown(){
  const el = $(".countdown");
  if(!el) return;
  const dateStr = el.getAttribute("data-countdown");
  const end = new Date(dateStr);
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
}
startCountdown();

// Accessible Modals for Speakers
const modals = $$('.modal');
const openers = [...$$('[data-modal]')];
const closeButtons = $$('.modal__close, [data-close]');

function openModal(id){
  const modal = document.getElementById(`modal-${id}`);
  if(!modal) return;
  modal.setAttribute('aria-hidden', 'false');
  // Trap focus basic
  const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  (focusable || modal).focus();
  document.body.style.overflow = 'hidden';
}
function closeAllModals(){
  modals.forEach(m => m.setAttribute('aria-hidden', 'true'));
  document.body.style.overflow = '';
}

openers.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const id = btn.getAttribute('data-modal');
    openModal(id);
  });
});
closeButtons.forEach(btn => btn.addEventListener('click', closeAllModals));
modals.forEach(m => {
  m.addEventListener('click', e => {
    if(e.target === m) closeAllModals();
    if(e.key === 'Escape') closeAllModals();
  });
});
document.addEventListener('keydown', e => {
  if(e.key === 'Escape') closeAllModals();
});

// Defer hero text fade-in after page load (respect reduced motion via CSS)
window.addEventListener('load', () => {
  $$('.hero .reveal').forEach(el => {
    el.classList.add('revealed');
  });
});
