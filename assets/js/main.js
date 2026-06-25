/* tylerwince.com — TRUCHET
 * Lane: generative. Three behaviors:
 *   1. nav active-state on the tile rail (covers nested URLs)
 *   2. the live weave — a full-viewport <canvas> field of Truchet tiles (one
 *      square, two quarter-arcs), randomly rotated from a fixed seed and drawn
 *      live in ink. Never an image.
 *   3. the signature — on load the field draws itself in along a diagonal
 *      wavefront and a cerise current sweeps the name (.is-ready on <html>);
 *      thereafter, tiles near the pointer FLIP and glow as the current reroutes
 *      around you (tap-to-reroute on touch). All gated by prefers-reduced-motion.
 */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;

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

  /* ========================================================================
     The live Truchet weave
     ====================================================================== */
  var canvas = document.getElementById('truchet-field');
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext('2d');

    /* deterministic PRNG (mulberry32) so the weave is stable across redraws */
    function mulberry32(a) {
      return function () {
        a |= 0; a = (a + 0x6D2B79F5) | 0;
        var t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }

    var SEED = 0x7c4a8d09;          /* the day's seed (one redesign = one seed) */
    var dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    var TILE = 48;
    var cols = 0, rows = 0, base = [];
    var W = 0, H = 0;

    var pointer = { x: -9999, y: -9999, on: false };
    var REROUTE = 150;              /* px radius the current reroutes within */

    var ink = '#1b1813', accent = '#e01f63';
    function readColors() {
      var cs = getComputedStyle(document.body);
      ink = (cs.getPropertyValue('--ink') || '#1b1813').trim();
      accent = (cs.getPropertyValue('--accent') || '#e01f63').trim();
    }

    function build() {
      W = window.innerWidth;
      H = window.innerHeight;
      /* fewer, larger tiles on small screens */
      TILE = W < 640 ? 56 : 48;
      cols = Math.ceil(W / TILE) + 1;
      rows = Math.ceil(H / TILE) + 1;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var rng = mulberry32(SEED);
      base = new Array(cols * rows);
      for (var i = 0; i < base.length; i++) base[i] = rng() < 0.5 ? 0 : 1;
    }

    /* draw one tile's two quarter-arcs for a given orientation */
    function tileArcs(x, y, s, orient) {
      var r = s / 2;
      if (orient === 0) {           /* arcs hug top-left & bottom-right corners */
        ctx.moveTo(x + r, y);
        ctx.arc(x, y, r, 0, Math.PI / 2);
        ctx.moveTo(x + s - r, y + s);
        ctx.arc(x + s, y + s, r, Math.PI, Math.PI * 1.5);
      } else {                      /* arcs hug top-right & bottom-left corners */
        ctx.moveTo(x + s, y + r);
        ctx.arc(x + s, y, r, Math.PI / 2, Math.PI);
        ctx.moveTo(x, y + s - r);
        ctx.arc(x, y + s, r, Math.PI * 1.5, Math.PI * 2);
      }
    }

    /* progress: 0..1 diagonal reveal (1 = fully drawn) */
    function draw(progress) {
      ctx.clearRect(0, 0, W, H);
      var diag = cols + rows;
      var hot = [];                 /* tiles flipped + glowing near the pointer */

      ctx.lineWidth = 1.25;
      ctx.lineCap = 'round';
      ctx.strokeStyle = ink;

      for (var ry = 0; ry < rows; ry++) {
        for (var cx = 0; cx < cols; cx++) {
          var thr = (cx + ry) / diag;
          var rev = progress >= 1 ? 1 : Math.max(0, Math.min(1, (progress - thr) / 0.14));
          if (rev <= 0) continue;

          var x = cx * TILE, y = ry * TILE;
          var orient = base[ry * cols + cx];

          var glow = 0;
          if (pointer.on) {
            var dx = (x + TILE / 2) - pointer.x;
            var dy = (y + TILE / 2) - pointer.y;
            var d = Math.sqrt(dx * dx + dy * dy);
            if (d < REROUTE) glow = 1 - d / REROUTE;
          }

          if (glow > 0.04) {
            hot.push([x, y, 1 - orient, glow]);   /* defer: drawn flipped in accent */
            continue;
          }

          ctx.globalAlpha = 0.11 * rev;
          ctx.beginPath();
          tileArcs(x, y, TILE, orient);
          ctx.stroke();
        }
      }

      /* the rerouted current — flipped tiles, cerise, brighter near the pointer */
      if (hot.length) {
        ctx.strokeStyle = accent;
        for (var h = 0; h < hot.length; h++) {
          var t = hot[h];
          ctx.globalAlpha = 0.18 + 0.7 * t[3];
          ctx.lineWidth = 1.25 + 1.6 * t[3];
          ctx.beginPath();
          tileArcs(t[0], t[1], TILE, t[2]);
          ctx.stroke();
        }
        ctx.lineWidth = 1.25;
      }
      ctx.globalAlpha = 1;
    }

    /* ---- reveal animation + pointer redraw loop ---- */
    var revealStart = null, REVEAL_MS = 1300, revealing = !reduce;
    var pending = false;

    function frame(ts) {
      if (revealing) {
        if (revealStart === null) revealStart = ts;
        var p = Math.min(1, (ts - revealStart) / REVEAL_MS);
        draw(p);
        if (p < 1) { requestAnimationFrame(frame); return; }
        revealing = false;
      } else {
        draw(1);
      }
      pending = false;
    }

    function requestDraw() {
      if (pending || revealing) return;
      pending = true;
      requestAnimationFrame(frame);
    }

    function onResize() {
      build();
      readColors();
      if (revealing) return;        /* the in-flight reveal loop handles it */
      draw(1);
    }

    var rt;
    window.addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(onResize, 120);
    });

    /* color-scheme flips */
    var dark = window.matchMedia('(prefers-color-scheme: dark)');
    (dark.addEventListener ? dark.addEventListener.bind(dark, 'change') : dark.addListener.bind(dark))(
      function () { readColors(); requestDraw(); }
    );

    /* pointer reroute (skipped under reduced motion) */
    if (!reduce) {
      window.addEventListener('pointermove', function (e) {
        pointer.x = e.clientX; pointer.y = e.clientY; pointer.on = true;
        requestDraw();
      }, { passive: true });
      window.addEventListener('pointerleave', function () {
        pointer.on = false; requestDraw();
      });
      window.addEventListener('blur', function () { pointer.on = false; requestDraw(); });
    }

    /* go */
    build();
    readColors();
    if (reduce) {
      draw(1);
    } else {
      requestAnimationFrame(frame);
    }
  }

  /* ---- Signature: arm the name reveal / current sweep ---- */
  if (!reduce) {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { root.classList.add('is-ready'); });
    });
  }
})();
