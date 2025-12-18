// Animaciones on-scroll + micro-interacciones del hero

(function () {
  const items = document.querySelectorAll('.animate-on-scroll');

  // Si el navegador no soporta IntersectionObserver, mostramos todo.
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
  );

  items.forEach((el) => observer.observe(el));

  // Efecto leve de tilt en la tarjeta del soldador (mouse).
  const tilt = document.querySelector('[data-tilt="welder"]');
  if (!tilt) return;

  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

  function onMove(e) {
    const rect = tilt.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0..1
    const y = (e.clientY - rect.top) / rect.height; // 0..1

    const rx = clamp((0.5 - y) * 10, -8, 8);
    const ry = clamp((x - 0.5) * 14, -10, 10);

    tilt.style.setProperty('--rx', rx.toFixed(2) + 'deg');
    tilt.style.setProperty('--ry', ry.toFixed(2) + 'deg');
  }

  function reset() {
    tilt.style.setProperty('--rx', '0deg');
    tilt.style.setProperty('--ry', '0deg');
  }

  tilt.addEventListener('mousemove', onMove);
  tilt.addEventListener('mouseleave', reset);
})();

// Menú móvil
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  function setOpen(next) {
    document.body.classList.toggle('nav-open', next);
    toggle.setAttribute('aria-expanded', next ? 'true' : 'false');
  }

  toggle.addEventListener('click', () => {
    const isOpen = document.body.classList.contains('nav-open');
    setOpen(!isOpen);
  });

  nav.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    setOpen(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
})();
