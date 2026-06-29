/* tylerwince.com — ARABESQUE
 * Lane: design-movement (Art Nouveau, 1900). The page is forged, not loaded.
 *   1. nav active-state on the enamel plaques (covers nested URLs)
 *   2. THE SIGNATURE — the vines grow in: iron scrollwork and the margin
 *      tendrils self-draw via stroke-dashoffset, buds open, and a gilt shimmer
 *      sweeps the name; thereafter each section's vine-spine draws as it enters
 *   3. the mobile gate — a latch swings a full-screen ironwork overlay open
 * All motion is gated behind prefers-reduced-motion (handled in CSS too).
 */
(function () {
  'use strict';

  var root = document.documentElement;
  /* signal that JS is live so CSS can hold ornaments back, then grow them in */
  root.classList.add('js');

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
     THE GATE — mobile nav overlay
     ==================================================================== */
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');

  function setGate(open) {
    root.classList.toggle('nav-open', open);
    if (toggle) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close the gate' : 'Open the gate');
    }
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setGate(!root.classList.contains('nav-open'));
    });
    /* a tap on any plaque closes the gate */
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () { setGate(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && root.classList.contains('nav-open')) {
        setGate(false);
        toggle.focus();
      }
    });
  }

  /* ====================================================================
     THE PRESS — grow the vines in on load
     ==================================================================== */
  if (reduce) {
    root.classList.add('grown');           /* show final state, CSS skips the draw */
  } else {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        root.classList.add('grown');       /* -> tendrils draw, buds open, name gilds */
      });
    });
  }

  /* ====================================================================
     Section vine-spines draw as each plate enters the frame
     ==================================================================== */
  var sections = Array.prototype.slice.call(document.querySelectorAll('.home-section'));
  if (sections.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      sections.forEach(function (s) { s.classList.add('in-view'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
      sections.forEach(function (s) { io.observe(s); });
    }
  }
})();
