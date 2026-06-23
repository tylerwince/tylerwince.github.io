/* tylerwince.com — METROPOLIS
 * Lane: design-movement (Art Deco). Three behaviors:
 *   1. nav active-state (covers nested URLs Liquid's `contains` misses)
 *   2. the directory — the marquee nav folds into a full-screen "playbill"
 *      overlay behind a toggle on small screens
 *   3. the signature: "the grand opening". On load we add .is-ready to <html>,
 *      which lets the CSS run the one-shot reveal — the sunburst rays sweep in,
 *      the chevron rules draw outward from centre, and a single gilt shimmer
 *      passes across the name. Gated behind prefers-reduced-motion in CSS; here
 *      we simply skip arming it when motion is reduced so it never flashes. */
(function () {
  'use strict';

  /* ---- Nav active state ---- */
  var path = window.location.pathname.replace(/\/+$/, '') || '/';
  document.querySelectorAll('.site-nav .nav-item a').forEach(function (link) {
    var href = (link.getAttribute('href') || '').replace(/\/+$/, '') || '/';
    var match = (href === '/') ? (path === '/') : (path.indexOf(href) === 0);
    if (match) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ---- The directory: mobile playbill toggle ---- */
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    var openNav = function () {
      nav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      document.documentElement.classList.add('nav-open');
    };
    var closeNav = function () {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('nav-open');
    };
    toggle.addEventListener('click', function () {
      if (nav.classList.contains('is-open')) { closeNav(); } else { openNav(); }
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeNav);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        closeNav();
        toggle.focus();
      }
    });
    /* tapping the backdrop closes the overlay (mobile) */
    nav.addEventListener('click', function (e) {
      if (e.target === nav) closeNav();
    });
  }

  /* ---- Signature: arm "the grand opening" reveal ---- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  if (!reduce) {
    /* defer one frame so the first paint is the pre-reveal state, then the
       CSS animations fire as the class lands */
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        root.classList.add('is-ready');
      });
    });
  }
})();
