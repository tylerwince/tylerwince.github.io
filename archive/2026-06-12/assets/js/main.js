/* tylerwince.com — GREAT PRIMER
 * Signature: "the ink-in" — display type arrives at wght 100 / SOFT 100 and
 * settles to its full weight, staggered down the page, like ink striking
 * paper. Reduced-motion visitors get the fully-inked state immediately. */
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

  /* ---- Signature interaction: the ink-in ---- */
  var motionOK = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
  if (!motionOK) return;

  var root = document.documentElement;
  root.classList.add('ink-anim');
  window.requestAnimationFrame(function () {
    window.requestAnimationFrame(function () {
      root.classList.add('is-inked');
    });
  });
})();
