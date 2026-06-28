/* tylerwince.com — OVERPRINT
 * Lane: digital-native. The page is printed live in two inks.
 *   1. nav active-state on the ink control strip (covers nested URLs)
 *   2. live registration on load — the blue & red separations of the name start
 *      badly out of register and snap home as the crop marks draw in
 *   3. pointer misregister — the two inks drift apart under your pointer, mixing
 *      a third where they cross
 * All motion is gated behind prefers-reduced-motion.
 */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;

  /* ---- Nav active state (URL based — authoritative on every page) ---- */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.site-nav .nav-item a'));
  var path = window.location.pathname.replace(/\/+$/, '') || '/';

  function setActive(activeLink) {
    navLinks.forEach(function (link) {
      var on = link === activeLink;
      link.classList.toggle('active', on);
      if (on) { link.setAttribute('aria-current', 'page'); }
      else { link.removeAttribute('aria-current'); }
    });
  }
  var best = null, bestLen = -1;
  navLinks.forEach(function (link) {
    var href = (link.getAttribute('href') || '').replace(/\/+$/, '') || '/';
    var match = (href === '/') ? (path === '/') : (path.indexOf(href) === 0);
    if (match && href.length > bestLen) { best = link; bestLen = href.length; }
  });
  if (best) setActive(best);

  /* ====================================================================
     The press: crop marks ink in, the separations lock into register.
     ==================================================================== */
  var hero = document.getElementById('hero-title');

  if (reduce) {
    root.classList.add('inked');            /* show crop marks, skip the run-up */
  } else {
    root.classList.add('cued');             /* jump the inks out of register */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        root.classList.add('printing');     /* slower transition for the lock-in */
        root.classList.add('inked');        /* draw the crop marks */
        root.classList.remove('cued');      /* -> separations animate into register */
        window.setTimeout(function () {
          root.classList.remove('printing');
        }, 720);
      });
    });
  }

  /* ====================================================================
     Pointer misregister — the inks separate as you move across the sheet.
     ==================================================================== */
  if (hero && !reduce && window.matchMedia('(pointer: fine)').matches) {
    var REST_B = [-0.028, -0.020];          /* blue rest offset (em) */
    var REST_R = [ 0.030,  0.018];          /* red rest offset (em)  */
    var SPREAD = 0.10;                       /* max extra separation (em) */
    var queued = false, px = 0, py = 0;

    function apply() {
      queued = false;
      hero.style.setProperty('--reg-bx', (REST_B[0] - px * SPREAD).toFixed(4) + 'em');
      hero.style.setProperty('--reg-by', (REST_B[1] - py * SPREAD).toFixed(4) + 'em');
      hero.style.setProperty('--reg-rx', (REST_R[0] + px * SPREAD).toFixed(4) + 'em');
      hero.style.setProperty('--reg-ry', (REST_R[1] + py * SPREAD).toFixed(4) + 'em');
    }
    window.addEventListener('pointermove', function (e) {
      px = (e.clientX / window.innerWidth) * 2 - 1;   /* -1 .. 1 */
      py = (e.clientY / window.innerHeight) * 2 - 1;
      if (!queued) { queued = true; requestAnimationFrame(apply); }
    }, { passive: true });
  }
})();
