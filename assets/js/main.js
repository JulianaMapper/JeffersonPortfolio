/* ================================================================
   Jefferson McMillan-Wilhoit — Portfolio
   Shared JS: scroll animations + cycling phrase
   ================================================================ */

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

document.addEventListener('DOMContentLoaded', () => {
  initFadeIns();
  initCyclingPhrase();
});
