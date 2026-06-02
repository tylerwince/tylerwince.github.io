/* tylerwince.com — THE DEPARTURES BOARD
   Live terminal clock, split-flap flip-in animation, nav active state. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Nav active state (covers nested URLs Liquid's contains misses) ---- */
  function markActiveNav() {
    var path = window.location.pathname.replace(/\/+$/, '') || '/';
    document.querySelectorAll('.site-nav .nav-item a').forEach(function (link) {
      var href = (link.getAttribute('href') || '').replace(/\/+$/, '') || '/';
      if (href !== '/' && path.indexOf(href) === 0) {
        link.classList.add('active');
      }
    });
  }

  /* ---- Live terminal clock (HH:MM:SS, 24h) ---- */
  function startClock() {
    var els = document.querySelectorAll('[data-clock]');
    if (!els.length) return;
    function pad(n) { return n < 10 ? '0' + n : '' + n; }
    function tick() {
      var d = new Date();
      var t = pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
      els.forEach(function (el) { el.textContent = t; });
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---- Split-flap flip-in: scramble characters, then settle left→right ---- */
  var GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  function flapInto(el, finalText) {
    var chars = finalText.split('');
    var locked = new Array(chars.length).fill(false);
    var ticks = 0;
    var maxTicks = 13;
    el.classList.add('is-flapping');
    var iv = setInterval(function () {
      ticks++;
      // lock one more character roughly every couple ticks
      var lockUpTo = Math.floor((ticks / maxTicks) * chars.length);
      var out = '';
      for (var i = 0; i < chars.length; i++) {
        if (chars[i] === ' ') { out += ' '; locked[i] = true; continue; }
        if (i <= lockUpTo) locked[i] = true;
        out += locked[i] ? chars[i] : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      el.textContent = out;
      if (ticks >= maxTicks) {
        clearInterval(iv);
        el.textContent = finalText;
        el.classList.remove('is-flapping');
      }
    }, 55);
  }

  function runFlaps() {
    var targets = document.querySelectorAll('[data-flap]');
    if (!targets.length) return;
    if (reduceMotion) {
      targets.forEach(function (el) {
        if (!el.textContent.trim()) el.textContent = el.getAttribute('data-flap') || '';
      });
      return;
    }
    targets.forEach(function (el, idx) {
      var finalText = el.getAttribute('data-flap') || el.textContent.trim();
      el.textContent = '';
      setTimeout(function () { flapInto(el, finalText); }, 90 * idx + 120);
    });
  }

  /* ---- Re-flap the big board sign whenever it scrolls back into view ---- */
  function watchHeroSign() {
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    var sign = document.querySelector('.hero-board-label[data-flap]');
    if (!sign) return;
    var seen = true; // already animated by runFlaps on load
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !seen) {
          seen = true;
          flapInto(sign, sign.getAttribute('data-flap'));
        } else if (!e.isIntersecting) {
          seen = false;
        }
      });
    }, { threshold: 0.9 });
    obs.observe(sign);
  }

  document.addEventListener('DOMContentLoaded', function () {
    markActiveNav();
    startClock();
    runFlaps();
    watchHeroSign();
  });
})();
