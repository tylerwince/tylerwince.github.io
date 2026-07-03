/* tylerwince.com — CHLADNI
 * Lane: generative. Every figure on the site is computed live from the
 * Chladni plate equation — never an image:
 *   1. THE SIGNATURE — the strike: thousands of sand grains scatter and
 *      random-walk into the nodal lines of a random (m,n) mode on the hero
 *      plate; strike again (button or click the plate) for a new figure
 *   2. static stipple figures on the app plates, footer, article headers
 *      and the 404 — one-shot renders of the same equation
 *   3. the nav string — a standing wave oscillating through the nav nodes
 *   4. harmonic glyphs on the writing ladder (post n gets n antinodes)
 *   5. the tune button — small screens open the harmonic series full-screen
 * All motion is gated behind prefers-reduced-motion.
 */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  var reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');
  function reduced() { return reduceMq.matches; }

  /* ---- palette (raw hexes live on :root; muted/border are mixes) ---- */
  var colors = { bg: '#0e100f', fg: '#eae3d1', accent: '#9d7dff' };
  function readColors() {
    var cs = getComputedStyle(root);
    var bg = cs.getPropertyValue('--color-bg').trim();
    var fg = cs.getPropertyValue('--color-fg').trim();
    var ac = cs.getPropertyValue('--color-accent').trim();
    if (bg) colors.bg = bg;
    if (fg) colors.fg = fg;
    if (ac) colors.accent = ac;
  }
  readColors();

  function hexToRgb(hex) {
    var h = hex.replace('#', '');
    if (h.length === 3) { h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]; }
    var num = parseInt(h, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  }

  /* ---- the plate equation (square plate, free edges, unit domain) ---- */
  function chladni(m, n, x, y) {
    return Math.cos(n * Math.PI * x) * Math.cos(m * Math.PI * y) -
           Math.cos(m * Math.PI * x) * Math.cos(n * Math.PI * y);
  }

  /* curated modes that draw well */
  var MODES = [
    [1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5],
    [3, 5], [4, 5], [1, 5], [5, 6], [2, 7], [4, 7]
  ];

  function modeFreq(m, n) {
    /* a plausible bench frequency for the mode — deterministic, not physics */
    return Math.round(46 * (m * m + n * n) + 118 + 13 * m);
  }

  /* =====================================================================
     1. static stipple figures — sand pre-settled on the nodal lines
     ===================================================================== */
  var stipples = [];

  function drawStipple(canvas, m, n, opts) {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) { return; }
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var circle = !!(opts && opts.circle);
    var tries = Math.max(3000, Math.round(w * h / 6));
    var fg = colors.fg, accent = colors.accent;

    /* a faint dusting everywhere */
    ctx.fillStyle = fg;
    for (var d = 0; d < tries / 24; d++) {
      var dx = Math.random(), dy = Math.random();
      if (circle) { var ddx = dx - .5, ddy = dy - .5; if (ddx * ddx + ddy * ddy > .22) continue; }
      ctx.globalAlpha = 0.05 + Math.random() * 0.05;
      ctx.fillRect(dx * canvas.width, dy * canvas.height, dpr, dpr);
    }

    /* sand gathered where the wave stands still */
    for (var i = 0; i < tries; i++) {
      var x = Math.random(), y = Math.random();
      if (circle) { var cx = x - .5, cy = y - .5; if (cx * cx + cy * cy > .22) continue; }
      var v = Math.abs(chladni(m, n, x, y));
      if (v < 0.12) {
        var near = 1 - v / 0.12;
        ctx.fillStyle = (Math.random() < 0.055) ? accent : fg;
        ctx.globalAlpha = 0.25 + near * 0.65 * (0.5 + Math.random() * 0.5);
        var s = dpr * (Math.random() < 0.2 ? 2 : 1.35);
        ctx.fillRect(x * canvas.width, y * canvas.height, s, s);
      }
    }
    ctx.globalAlpha = 1;
  }

  function addStipple(host, m, n, opts) {
    var canvas = document.createElement('canvas');
    host.appendChild(canvas);
    var entry = { canvas: canvas, m: m, n: n, opts: opts || {} };
    stipples.push(entry);
    requestAnimationFrame(function () { drawStipple(canvas, m, n, entry.opts); });
  }

  function redrawStipples() {
    stipples.forEach(function (s) { drawStipple(s.canvas, s.m, s.n, s.opts); });
  }

  /* app plates + footer figure declare their mode via data-figure="m,n" */
  document.querySelectorAll('[data-figure]').forEach(function (el) {
    var parts = (el.getAttribute('data-figure') || '2,3').split(',');
    addStipple(el, parseInt(parts[0], 10) || 2, parseInt(parts[1], 10) || 3,
      { circle: el.classList.contains('plate-figure') });
  });

  /* the apps-page plates get figures injected (markup is stable there) */
  document.querySelectorAll('.app-showcase-card').forEach(function (card, i) {
    var mode = MODES[(i * 3 + 1) % MODES.length];
    addStipple(card, mode[0], mode[1], {});
  });

  /* article headers get a faint figure keyed to the title */
  var articleHeader = document.querySelector('.article-header');
  if (articleHeader) {
    var title = (document.querySelector('.article-title') || {}).textContent || 'x';
    var hash = 0;
    for (var ti = 0; ti < title.length; ti++) { hash = (hash * 31 + title.charCodeAt(ti)) >>> 0; }
    var amode = MODES[hash % MODES.length];
    var fig = document.createElement('div');
    fig.className = 'article-figure';
    fig.setAttribute('aria-hidden', 'true');
    articleHeader.appendChild(fig);
    addStipple(fig, amode[0], amode[1], {});
  }

  /* the 404 — the plate is silent, the figure barely settled */
  var errorPage = document.querySelector('.error-page');
  if (errorPage) {
    var efig = document.createElement('div');
    efig.className = 'error-figure';
    efig.setAttribute('aria-hidden', 'true');
    errorPage.insertBefore(efig, errorPage.firstChild);
    addStipple(efig, 1, 3, {});
  }

  /* =====================================================================
     2. harmonic glyphs — post n rings at the nth harmonic
     ===================================================================== */
  document.querySelectorAll('.post-harmonic[data-harmonic]').forEach(function (el) {
    var n = Math.max(1, parseInt(el.getAttribute('data-harmonic'), 10) || 1);
    var W = 100, H = 30, mid = H / 2, A = 11;
    var pts = [];
    for (var i = 0; i <= 48; i++) {
      var x = i / 48;
      pts.push((x * W).toFixed(1) + ',' + (mid - A * Math.sin(n * Math.PI * x)).toFixed(1));
    }
    var nodes = '';
    for (var k = 0; k <= n; k++) {
      nodes += '<circle cx="' + (k * W / n).toFixed(1) + '" cy="' + mid +
               '" r="1.8" fill="currentColor"/>';
    }
    el.innerHTML =
      '<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" aria-hidden="true">' +
      '<polyline points="' + pts.join(' ') + '" fill="none" stroke="currentColor" stroke-width="1.4"/>' +
      nodes + '</svg>';
  });

  /* =====================================================================
     3. the nav string — a standing wave through the nodes
     ===================================================================== */
  var navSvg = document.getElementById('nav-string');
  var navPath = document.getElementById('nav-string-path');
  var navItems = document.querySelectorAll('.nav-item').length || 6;
  var desktopMq = window.matchMedia('(min-width: 881px)');

  function navWaveFrame(time) {
    if (!navSvg || !navPath || !desktopMq.matches) { return; }
    var W = navSvg.clientWidth, H = navSvg.clientHeight;
    if (!W || !H) { return; }
    navSvg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    var A = reduced() ? 4 : 6.5 * Math.sin(time / 620);
    var mid = H / 2;
    var d = 'M0 ' + mid.toFixed(1);
    for (var i = 1; i <= 56; i++) {
      var x = (i / 56) * W;
      var y = mid + A * Math.cos(navItems * Math.PI * (x / W));
      d += ' L' + x.toFixed(1) + ' ' + y.toFixed(1);
    }
    navPath.setAttribute('d', d);
  }

  if (navSvg && navPath) {
    if (reduced()) {
      navWaveFrame(0);
      window.addEventListener('resize', function () { navWaveFrame(0); });
    } else {
      (function loop(t) {
        navWaveFrame(t || 0);
        requestAnimationFrame(loop);
      })(0);
    }
  }

  /* =====================================================================
     4. the tune button — the harmonic series, full-screen
     ===================================================================== */
  var toggle = document.getElementById('nav-toggle');
  if (toggle) {
    var toggleText = toggle.querySelector('.nav-toggle-text');
    function setNav(open) {
      root.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (toggleText) { toggleText.textContent = open ? 'damp' : 'tune'; }
    }
    toggle.addEventListener('click', function () {
      setNav(!root.classList.contains('nav-open'));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && root.classList.contains('nav-open')) { setNav(false); }
    });
    desktopMq.addEventListener('change', function (e) {
      if (e.matches) { setNav(false); }
    });
  }

  /* =====================================================================
     5. THE SIGNATURE — the struck plate
     ===================================================================== */
  var hero = document.getElementById('plate');
  var plateCanvas = document.getElementById('plate-canvas');

  if (hero && plateCanvas) {
    var ctx = plateCanvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    var W = 0, H = 0;
    var grains = null, grainCount = 0;
    var mode = MODES[new Date().getDate() % MODES.length];
    var agitation = 1;
    var pointer = { x: -1, y: -1 };
    var running = true, inView = true;
    var bgRgb = hexToRgb(colors.bg);
    var shownFreq = 0;

    var readoutF = document.getElementById('readout-f');
    var readoutMode = document.getElementById('readout-mode');

    function sizePlate() {
      W = hero.clientWidth; H = hero.clientHeight;
      plateCanvas.width = Math.round(W * dpr);
      plateCanvas.height = Math.round(H * dpr);
    }

    function seedGrains() {
      grainCount = Math.min(4200, Math.max(1400, Math.round(W * H / 420)));
      grains = new Float32Array(grainCount * 2);
      for (var i = 0; i < grainCount; i++) {
        grains[i * 2] = Math.random();
        grains[i * 2 + 1] = Math.random();
      }
    }

    /* one settling step for every grain — random walk scaled by |amplitude|,
       biased downhill so the sand drifts to where the wave stands still */
    function step(kick) {
      for (var i = 0; i < grainCount; i++) {
        var x = grains[i * 2], y = grains[i * 2 + 1];
        var v = Math.abs(chladni(mode[0], mode[1], x, y));
        var amp = 0.004 + v * (0.012 + kick * 0.05);

        /* the pointer stirs nearby sand */
        if (pointer.x >= 0) {
          var pdx = x - pointer.x, pdy = y - pointer.y;
          var pd = pdx * pdx + pdy * pdy;
          if (pd < 0.008) { amp += (1 - pd / 0.008) * 0.02; }
        }

        var nx = x + (Math.random() - 0.5) * amp * 2;
        var ny = y + (Math.random() - 0.5) * amp * 2;
        if (nx < 0.002) nx = 0.002; else if (nx > 0.998) nx = 0.998;
        if (ny < 0.002) ny = 0.002; else if (ny > 0.998) ny = 0.998;

        var nv = Math.abs(chladni(mode[0], mode[1], nx, ny));
        if (nv <= v || Math.random() < 0.12 + kick * 0.55) {
          grains[i * 2] = nx; grains[i * 2 + 1] = ny;
        }
      }
    }

    function render(alpha) {
      bgRgb = hexToRgb(colors.bg);
      ctx.fillStyle = 'rgba(' + bgRgb[0] + ',' + bgRgb[1] + ',' + bgRgb[2] + ',' + alpha + ')';
      ctx.fillRect(0, 0, plateCanvas.width, plateCanvas.height);
      var s = 1.5 * dpr;
      var cw = plateCanvas.width, ch = plateCanvas.height;
      ctx.globalAlpha = 0.82;
      ctx.fillStyle = colors.fg;
      var accentEvery = 17;
      for (var i = 0; i < grainCount; i++) {
        if (i % accentEvery === 0) { continue; }
        ctx.fillRect(grains[i * 2] * cw, grains[i * 2 + 1] * ch, s, s);
      }
      ctx.fillStyle = colors.accent;
      for (var j = 0; j < grainCount; j += accentEvery) {
        ctx.fillRect(grains[j * 2] * cw, grains[j * 2 + 1] * ch, s, s);
      }
      ctx.globalAlpha = 1;
    }

    function updateReadout() {
      var target = modeFreq(mode[0], mode[1]);
      if (!shownFreq) { shownFreq = target; }
      shownFreq += (target - shownFreq) * 0.14;
      if (Math.abs(target - shownFreq) < 1) { shownFreq = target; }
      if (readoutF) { readoutF.textContent = 'f = ' + Math.round(shownFreq) + ' Hz'; }
      if (readoutMode) {
        readoutMode.textContent = 'mode (' + mode[0] + ',' + mode[1] + ') · ' +
          grainCount + ' grains';
      }
    }

    function settleInstantly() {
      for (var r = 0; r < 300; r++) { step(r < 40 ? 0.4 : 0); }
      ctx.clearRect(0, 0, plateCanvas.width, plateCanvas.height);
      render(1);
      shownFreq = 0;
      updateReadout();
      if (readoutF) { readoutF.textContent = 'f = ' + modeFreq(mode[0], mode[1]) + ' Hz'; }
    }

    function strike() {
      var next = mode;
      while (next === mode || (next[0] === mode[0] && next[1] === mode[1])) {
        next = MODES[Math.floor(Math.random() * MODES.length)];
      }
      mode = next;
      if (reduced()) { settleInstantly(); return; }
      agitation = 1;
    }

    function frame() {
      if (running && inView && !reduced()) {
        agitation *= 0.972;
        if (agitation < 0.002) { agitation = 0; }
        step(agitation);
        render(0.3);
        updateReadout();
      }
      requestAnimationFrame(frame);
    }

    sizePlate();
    seedGrains();

    if (reduced()) {
      settleInstantly();
    } else {
      updateReadout();
      requestAnimationFrame(frame);
    }

    var strikeBtn = document.getElementById('strike-btn');
    if (strikeBtn) { strikeBtn.addEventListener('click', strike); }
    hero.addEventListener('click', function (e) {
      if (e.target.closest('.hero-readout')) { return; }
      strike();
    });

    hero.addEventListener('pointermove', function (e) {
      var rect = hero.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) / rect.width;
      pointer.y = (e.clientY - rect.top) / rect.height;
    });
    hero.addEventListener('pointerleave', function () { pointer.x = -1; pointer.y = -1; });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting;
      }, { threshold: 0.02 }).observe(hero);
    }
    document.addEventListener('visibilitychange', function () {
      running = !document.hidden;
    });

    var resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        sizePlate();
        if (reduced()) { settleInstantly(); }
      }, 150);
    });
  }

  /* ---- keep the figures honest if the colour scheme flips live ---- */
  var schemeMq = window.matchMedia('(prefers-color-scheme: light)');
  function onSchemeChange() {
    readColors();
    redrawStipples();
  }
  if (schemeMq.addEventListener) { schemeMq.addEventListener('change', onSchemeChange); }
})();
