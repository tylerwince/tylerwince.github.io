/* tylerwince.com — MEMPHIS MILANO
 * Signature: "the mobile" — a fixed field of confetti shapes that drift and
 * spin at different rates as you scroll, like a Calder mobile. Reduced-motion
 * visitors get a calm, static composition. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Nav active state (covers nested URLs Liquid's contains misses) ---- */
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

  /* ---- Signature interaction: the mobile ---- */

  /* Deterministic pseudo-random so the composition is stable across visits. */
  function rng(seed) {
    return function () {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
  }

  var SHAPES = ['ball', 'ring', 'tri', 'square', 'half', 'zig', 'squig', 'cross'];
  var TONES = ['teal', 'pink', 'yellow', 'cobalt', 'ink'];

  function buildField() {
    var field = document.createElement('div');
    field.className = 'memphis-field';
    field.setAttribute('aria-hidden', 'true');

    var rand = rng(19810918); /* Memphis Group debut: Salone del Mobile, 1981 */
    var count = 16;
    var pieces = [];

    for (var i = 0; i < count; i++) {
      var el = document.createElement('span');
      var shape = SHAPES[i % SHAPES.length];
      var tone = TONES[Math.floor(rand() * TONES.length)];
      el.className = 'mf-piece mf--' + shape + ' mf-tone--' + tone;
      /* Keep the middle column clearer so content stays readable. */
      var x = rand();
      x = x < 0.5 ? x * 0.26 : 0.76 + (x - 0.5) * 0.46;
      el.style.left = (x * 100).toFixed(2) + '%';
      el.style.top = (rand() * 92 + 3).toFixed(2) + '%';
      var scale = 0.5 + rand() * 0.9;
      var baseRot = Math.floor(rand() * 360);
      el.style.transform = 'rotate(' + baseRot + 'deg) scale(' + scale.toFixed(2) + ')';
      field.appendChild(el);
      pieces.push({
        el: el,
        baseRot: baseRot,
        scale: scale,
        drift: (rand() - 0.5) * 0.22,   /* px moved per scrolled px */
        spin: (rand() - 0.5) * 0.09     /* deg turned per scrolled px */
      });
    }

    document.body.appendChild(field);
    return pieces;
  }

  var pieces = buildField();

  if (reduceMotion) return;

  var ticking = false;
  function paint() {
    ticking = false;
    var y = window.scrollY || 0;
    for (var i = 0; i < pieces.length; i++) {
      var p = pieces[i];
      p.el.style.transform =
        'translateY(' + (y * p.drift).toFixed(1) + 'px) ' +
        'rotate(' + (p.baseRot + y * p.spin).toFixed(1) + 'deg) ' +
        'scale(' + p.scale.toFixed(2) + ')';
    }
  }
  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(paint);
    }
  }, { passive: true });
  paint();
})();
