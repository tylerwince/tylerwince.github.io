/* tylerwince.com — STRATA
 * Lane: digital-native. A site composed in depth. Three behaviors:
 *   1. nav active-state (covers nested URLs Liquid's `contains` misses)
 *   2. the elevation index — a floating depth-stack of links that collapses
 *      behind a "Layers" toggle on small screens
 *   3. the signature: pointer-driven depth parallax. The decorative strata
 *      planes drift by pointer offset × their own depth, so the page reads as
 *      near-and-far rather than flat. Gated behind reduced-motion / coarse
 *      pointers; pure ambience, never required to read the page. */
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

  /* ---- Elevation index: mobile layers toggle ---- */
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
    /* tapping outside the open stack closes it (mobile) */
    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('is-open')) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      closeNav();
    });
  }

  /* ---- Signature: pointer-driven depth parallax ---- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse = window.matchMedia('(pointer: coarse)').matches;
  if (!reduce && !coarse) {
    var root = document.documentElement;
    var tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;

    var frame = function () {
      /* ease the rendered offset toward the pointer target */
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      root.style.setProperty('--mx', cx.toFixed(3));
      root.style.setProperty('--my', cy.toFixed(3));
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) {
        raf = window.requestAnimationFrame(frame);
      } else {
        raf = 0;
      }
    };

    window.addEventListener('pointermove', function (e) {
      /* normalize pointer to roughly [-1, 1] from viewport center */
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
      if (!raf) raf = window.requestAnimationFrame(frame);
    }, { passive: true });
  }
})();
