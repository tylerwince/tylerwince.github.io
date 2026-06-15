/* tylerwince.com — SLIPSTREAM
 * Signature: scroll-velocity kinetic bands. Marquee text translates with a
 * constant drift plus a kick proportional to how fast (and which way) you
 * scroll; the cover reel gets thrown sideways by the same gesture. A spine
 * progress bar tracks how far down you are. Reduced-motion visitors get a
 * calm, fully static composition with everything revealed up front. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Nav active state (covers nested URLs Liquid's `contains` misses) ---- */
  var path = window.location.pathname.replace(/\/+$/, '') || '/';
  document.querySelectorAll('.site-nav .nav-item a').forEach(function (link) {
    var href = (link.getAttribute('href') || '').replace(/\/+$/, '') || '/';
    if (href !== '/' && path.indexOf(href) === 0) {
      link.classList.add('active');
    }
    if (link.classList.contains('active')) {
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ---- Spine progress (runs for everyone — it's information, not motion) ---- */
  var doc = document.documentElement;
  var progressTicking = false;
  function paintProgress() {
    progressTicking = false;
    var max = doc.scrollHeight - window.innerHeight;
    var frac = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    doc.style.setProperty('--progress', frac.toFixed(4));
  }
  window.addEventListener('scroll', function () {
    if (!progressTicking) {
      progressTicking = true;
      window.requestAnimationFrame(paintProgress);
    }
  }, { passive: true });
  paintProgress();
  window.addEventListener('resize', paintProgress);

  if (reduceMotion) return;

  document.documentElement.classList.add('slip-motion');

  /* ---- Reveal on scroll (sections slide in from the current) ---- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
    /* safety net: never leave content hidden */
    window.setTimeout(function () {
      revealEls.forEach(function (el) { el.classList.add('is-in'); });
    }, 2600);
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---- Signature: scroll-velocity kinetic bands ---- */
  var velocity = 0;
  var lastY = window.scrollY || 0;
  window.addEventListener('scroll', function () {
    var y = window.scrollY || 0;
    velocity += (y - lastY);
    lastY = y;
  }, { passive: true });

  /* Text marquees: JS-driven so velocity layers on top of a constant drift. */
  var marquees = [];
  document.querySelectorAll('[data-slip]').forEach(function (el) {
    var track = el.firstElementChild;
    if (!track) return;
    var factor = parseFloat(el.getAttribute('data-slip')) || 1;
    marquees.push({ track: track, factor: factor, base: 0.45, offset: 0, seg: 0 });
  });
  function measure() {
    marquees.forEach(function (m) {
      /* track holds 4 identical copies; one segment is a quarter of its width */
      m.seg = m.track.scrollWidth / 4 || 1;
    });
  }
  measure();
  window.addEventListener('resize', measure);

  /* Cover reels: velocity is added to native horizontal scroll position. */
  var reels = [];
  document.querySelectorAll('[data-slip-reel]').forEach(function (el) {
    reels.push(el.parentElement || el);
  });

  function frame() {
    velocity *= 0.88;
    if (Math.abs(velocity) < 0.01) velocity = 0;

    for (var i = 0; i < marquees.length; i++) {
      var m = marquees[i];
      m.offset += m.base + velocity * m.factor * 0.4;
      var seg = m.seg || 1;
      var t = ((m.offset % seg) + seg) % seg;
      m.track.style.transform = 'translate3d(' + (-t).toFixed(2) + 'px,0,0)';
    }

    for (var j = 0; j < reels.length; j++) {
      if (velocity) reels[j].scrollLeft += velocity * 0.55;
    }

    window.requestAnimationFrame(frame);
  }
  window.requestAnimationFrame(frame);
})();
