/* tylerwince.com — MOIRÉ
 * Signature: the hero's second ring field lerps toward the pointer, so the
 * two fields interfere live. Reduced-motion / coarse pointers keep the static
 * (or slow CSS-drift) field instead. */
(function () {
  'use strict';

  /* ---- Nav active state (covers nested URLs Liquid's contains misses) ---- */
  var path = window.location.pathname.replace(/\/+$/, '') || '/';
  document.querySelectorAll('.site-nav .nav-item a').forEach(function (link) {
    var href = (link.getAttribute('href') || '').replace(/\/+$/, '') || '/';
    if (href !== '/' && path.indexOf(href) === 0) {
      link.classList.add('active');
    }
  });

  /* ---- Signature interaction: pointer-driven interference ---- */
  var motionOK = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;

  var field = document.querySelector('[data-interference]');
  if (field && motionOK && finePointer) {
    field.classList.add('is-live');
    var tx = 0, ty = 0, x = 0, y = 0, raf = null;

    var step = function () {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      field.style.transform = 'translate3d(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px,0)';
      if (Math.abs(tx - x) + Math.abs(ty - y) > 0.05) {
        raf = window.requestAnimationFrame(step);
      } else {
        raf = null;
      }
    };

    window.addEventListener('pointermove', function (e) {
      tx = (e.clientX / window.innerWidth - 0.5) * 90;
      ty = (e.clientY / window.innerHeight - 0.5) * 90;
      if (raf === null) raf = window.requestAnimationFrame(step);
    }, { passive: true });
  }
})();
