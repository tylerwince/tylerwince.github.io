/* UNIBODY — restraint, precisely animated.
   1. The machining pass: the hero name resolves from blur, letter by letter,
      as a specular gleam sweeps across it.
   2. The capsule condenses once you scroll.
   3. Sections rise in softly as they enter the viewport.
   Everything is gated behind prefers-reduced-motion. */

(function () {
  'use strict';

  var docEl = document.documentElement;
  docEl.classList.add('js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Capsule: condense on scroll ---- */
  var header = document.getElementById('site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Capsule: mobile sheet ---- */
  var toggle = document.getElementById('nav-toggle');
  if (header && toggle) {
    var setOpen = function (open) {
      header.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    toggle.addEventListener('click', function () {
      setOpen(!header.classList.contains('nav-open'));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
    document.addEventListener('click', function (e) {
      if (header.classList.contains('nav-open') && !header.contains(e.target)) setOpen(false);
    });
    header.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () { setOpen(false); });
    });
  }

  /* ---- The machining pass ---- */
  var title = document.querySelector('.hero-title');
  if (title && !reduceMotion) {
    var text = title.textContent.trim();
    title.setAttribute('aria-label', text);
    title.textContent = '';
    var frag = document.createDocumentFragment();
    var i = 0;
    Array.prototype.forEach.call(text, function (ch) {
      var s = document.createElement('span');
      s.className = 'hero-char';
      s.setAttribute('aria-hidden', 'true');
      s.style.setProperty('--i', i++);
      if (ch === ' ') {
        s.classList.add('hero-char--space');
        s.innerHTML = '&nbsp;';
      } else {
        s.textContent = ch;
      }
      frag.appendChild(s);
    });
    title.appendChild(frag);
    title.classList.add('is-machining');
  }

  /* ---- Sections rise in ---- */
  var targets = document.querySelectorAll('.home-section, .reveal-zone');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    targets.forEach(function (t) { t.classList.add('in-view'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach(function (t) { io.observe(t); });
  }
})();
