/* tylerwince.com — THE SPECIMEN SHEET
 * A pure-typography foundry specimen. Three small behaviors:
 *   1. nav active-state (covers nested URLs Liquid's `contains` misses)
 *   2. the index overlay — a full-screen specimen contents page
 *   3. the signature: a live type tester — edit the hero line and drag the
 *      point-size scale; the display face re-sets in real time.
 * Nothing here is gratuitous motion, so it all runs regardless of
 * prefers-reduced-motion (the only animation, the hero fall, is CSS-gated). */
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

  /* ---- Index overlay ---- */
  var toggle = document.getElementById('nav-toggle');
  var overlay = document.getElementById('index-overlay');
  if (toggle && overlay) {
    var openNav = function () {
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      document.documentElement.classList.add('nav-open');
      var first = overlay.querySelector('a');
      if (first) { try { first.focus({ preventScroll: true }); } catch (e) { first.focus(); } }
    };
    var closeNav = function () {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('nav-open');
    };
    toggle.addEventListener('click', function () {
      if (overlay.classList.contains('is-open')) { closeNav(); } else { openNav(); }
    });
    overlay.addEventListener('click', function (e) {
      /* click on the backdrop (the nav itself, not the sheet) closes */
      if (e.target === overlay) closeNav();
    });
    overlay.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeNav);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
        closeNav();
        toggle.focus();
      }
    });
  }

  /* ---- Signature: the live type tester ---- */
  var tester = document.querySelector('[data-tester]');
  if (tester) {
    var line = tester.querySelector('[data-tester-line]');
    var range = tester.querySelector('[data-tester-range]');
    var readout = tester.querySelector('[data-tester-size]');

    if (range && line) {
      var setSize = function () {
        var pt = parseInt(range.value, 10) || 112;
        line.style.setProperty('--pt', pt);
        if (readout) readout.textContent = pt;
      };
      range.addEventListener('input', setSize);
      setSize();
    }

    if (line) {
      /* tapping/focusing the line selects all so typing replaces the sample */
      var selectAll = function () {
        var sel = window.getSelection();
        if (!sel) return;
        var r = document.createRange();
        r.selectNodeContents(line);
        sel.removeAllRanges();
        sel.addRange(r);
      };
      line.addEventListener('focus', function () { window.setTimeout(selectAll, 0); });
      /* keep it a single line: Enter blurs instead of inserting a break */
      line.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); line.blur(); }
      });
      /* never let it go fully empty (keeps the specimen readable) */
      line.addEventListener('blur', function () {
        if (!line.textContent.trim()) { line.textContent = 'Whispering to agents'; }
      });
    }
  }
})();
