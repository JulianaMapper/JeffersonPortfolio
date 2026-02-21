/* ================================================================
   Jefferson McMillan-Wilhoit — Portfolio
   Shared JS: scroll animations, cycling phrase, counters, progress
   ================================================================ */

// ── Reading progress bar ─────────────────────────────────────────
function initReadingProgress() {
  const bar = document.getElementById('reading-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

// ── Scroll fade-ins ──────────────────────────────────────────────
function initFadeIns() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.anim').forEach(el => {
    el.classList.add('will-animate');
    observer.observe(el);
  });
}

// ── Animated counters ────────────────────────────────────────────
function animateCounter(el) {
  const raw = el.getAttribute('data-count');
  const prefix = el.getAttribute('data-prefix') || '';
  const suffix = el.getAttribute('data-suffix') || '';
  const target = parseFloat(raw);
  const isFloat = raw.includes('.');
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = eased * target;
    el.textContent = prefix + (isFloat ? value.toFixed(1) : Math.round(value).toLocaleString()) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function initCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
}

// ── Cycling phrase (homepage hero only) ─────────────────────────
function initCyclingPhrase() {
  const el = document.getElementById('cycle-phrase');
  if (!el) return;
  const phrases = ['fix it.', 'name it.', 'build around it.', 'stop it.'];
  let i = 0;
  setInterval(() => {
    el.classList.add('out');
    setTimeout(() => {
      i = (i + 1) % phrases.length;
      el.textContent = phrases[i];
      el.classList.remove('out');
    }, 380);
  }, 2800);
}

// ── Cycling quote carousel ───────────────────────────────────────
function initQuoteCarousel() {
  const carousel = document.getElementById('quote-carousel');
  if (!carousel) return;
  const slides = carousel.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('#quote-dots .testimonial-dot');
  let current = 0;
  let timer;

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = idx;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() {
    goTo((current + 1) % slides.length);
  }

  function startTimer() {
    timer = setInterval(next, 5000);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(timer);
      goTo(parseInt(dot.dataset.idx));
      startTimer();
    });
  });

  startTimer();
}

document.addEventListener('DOMContentLoaded', () => {
  initReadingProgress();
  initFadeIns();
  initCounters();
  initCyclingPhrase();
  initQuoteCarousel();
});
