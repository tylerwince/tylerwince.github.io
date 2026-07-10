/* tylerwince.com — THE PINBALL AUTHOR
 * Cabinet behavior: hinged mobile routes, reveal sequencing, copy controls,
 * target lamps and a lightweight live pinball that scores visible collisions.
 */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  var reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');
  var mobileMq = window.matchMedia('(max-width: 760px)');
  function reduced() { return reduceMq.matches; }

  /* ---- hinged backglass navigation --------------------------------- */
  var navToggle = document.getElementById('nav-toggle');
  var siteNav = document.getElementById('site-nav');

  function setNav(open) {
    root.classList.toggle('nav-open', open);
    if (!navToggle) return;
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    var text = navToggle.querySelector('.nav-toggle-text');
    if (text) text.textContent = open ? 'close' : 'routes';
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      setNav(!root.classList.contains('nav-open'));
    });

    siteNav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setNav(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && root.classList.contains('nav-open')) {
        setNav(false);
        navToggle.focus();
      }
    });

    if (mobileMq.addEventListener) {
      mobileMq.addEventListener('change', function (event) {
        if (!event.matches) setNav(false);
      });
    }
  }

  /* ---- assemble each playfield zone as it enters view -------------- */
  var revealZones = document.querySelectorAll('.reveal-zone');
  if (reduced() || !('IntersectionObserver' in window)) {
    revealZones.forEach(function (zone) { zone.classList.add('is-revealed'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealZones.forEach(function (zone) { revealObserver.observe(zone); });

    /* CSS reorders the mobile hero ahead of the reading bank. Some engines
       can calculate the first observer frame from DOM order before that
       visual reorder settles, so reveal anything already in the viewport
       and keep a fail-safe that never strands readable content at opacity 0. */
    requestAnimationFrame(function () {
      revealZones.forEach(function (zone) {
        var rect = zone.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          zone.classList.add('is-revealed');
          revealObserver.unobserve(zone);
        }
      });
    });
    window.setTimeout(function () {
      revealZones.forEach(function (zone) { zone.classList.add('is-revealed'); });
    }, 900);
  }

  /* ---- code-copy service buttons ----------------------------------- */
  document.querySelectorAll('pre').forEach(function (pre) {
    var code = pre.querySelector('code');
    if (!code || !navigator.clipboard) return;
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-code';
    button.textContent = 'copy';
    button.addEventListener('click', function () {
      navigator.clipboard.writeText(code.textContent).then(function () {
        button.textContent = 'copied';
        window.setTimeout(function () { button.textContent = 'copy'; }, 1400);
      });
    });
    pre.appendChild(button);
  });

  /* ---- cabinet score ------------------------------------------------ */
  var scoreEl = document.getElementById('cabinet-score');
  var ballReadout = document.getElementById('ball-readout');
  var score = 0;
  var ballNumber = 1;

  function renderScore() {
    if (scoreEl) scoreEl.textContent = String(Math.max(0, Math.round(score))).padStart(6, '0').slice(-6);
    if (ballReadout) ballReadout.textContent = 'ball ' + ballNumber;
  }

  function addScore(points) {
    score += points;
    renderScore();
    if (!scoreEl || reduced()) return;
    scoreEl.animate([
      { opacity: .45, transform: 'translateY(2px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 150, easing: 'steps(2, end)' });
  }

  renderScore();

  /* Targets answer to pointer input even before the ball is launched. */
  var targets = Array.prototype.slice.call(document.querySelectorAll('[data-pin]'));
  targets.forEach(function (target, index) {
    target.addEventListener('pointerenter', function () {
      target.classList.remove('pin-hit');
      void target.offsetWidth;
      target.classList.add('pin-hit');
      if (root.classList.contains('ball-in-play')) addScore(25 + (index % 5) * 25);
    });
    target.addEventListener('animationend', function () { target.classList.remove('pin-hit'); });
  });

  /* ---- THE SIGNATURE: launch ball ---------------------------------- */
  var ball = document.getElementById('pinball-ball');
  var launchButton = document.getElementById('launch-ball');
  var animationFrame = 0;
  var inPlay = false;
  var x = 0;
  var y = 0;
  var vx = 0;
  var vy = 0;
  var lastFrame = 0;
  var activeUntil = 0;
  var lastScrollY = window.scrollY;
  var hitTimes = new WeakMap();

  function visibleTargets() {
    return targets.filter(function (target) {
      var rect = target.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth;
    });
  }

  function flashTarget(target) {
    target.classList.remove('pin-hit');
    void target.offsetWidth;
    target.classList.add('pin-hit');
  }

  function finishBall() {
    inPlay = false;
    root.classList.remove('ball-in-play');
    if (ball) ball.classList.remove('is-live');
    if (launchButton) launchButton.classList.remove('is-playing');
    if (animationFrame) cancelAnimationFrame(animationFrame);
    animationFrame = 0;
    ballNumber = ballNumber === 3 ? 1 : ballNumber + 1;
    renderScore();
  }

  function collideWithTarget(target, now) {
    var rect = target.getBoundingClientRect();
    var radius = 12;
    var centerX = x + radius;
    var centerY = y + radius;
    if (centerX < rect.left || centerX > rect.right || centerY < rect.top || centerY > rect.bottom) return false;

    var lastHit = hitTimes.get(target) || 0;
    if (now - lastHit < 420) return false;
    hitTimes.set(target, now);

    var fromLeft = Math.abs(centerX - rect.left);
    var fromRight = Math.abs(rect.right - centerX);
    var fromTop = Math.abs(centerY - rect.top);
    var fromBottom = Math.abs(rect.bottom - centerY);
    var nearest = Math.min(fromLeft, fromRight, fromTop, fromBottom);

    if (nearest === fromLeft || nearest === fromRight) {
      vx = -vx * 1.04 + (Math.random() - .5) * 2;
      x += nearest === fromLeft ? -radius : radius;
    } else {
      vy = -Math.max(4, Math.abs(vy)) * .92;
      y += nearest === fromTop ? -radius : radius;
    }

    flashTarget(target);
    var multiplier = target.classList.contains('bumper-assembly') ? 250 :
      target.classList.contains('drop-target') ? 100 : 50;
    addScore(multiplier);
    activeUntil = Math.min(now + 9000, activeUntil + 750);
    return true;
  }

  function ballLoop(now) {
    if (!inPlay || !ball) return;
    if (!lastFrame) lastFrame = now;
    var delta = Math.min(2.2, Math.max(.5, (now - lastFrame) / 16.67));
    lastFrame = now;

    vy += .24 * delta;
    x += vx * delta;
    y += vy * delta;

    var header = document.getElementById('site-header');
    var topBound = header ? Math.min(header.getBoundingClientRect().bottom, window.innerHeight * .34) : 8;
    var maxX = Math.max(10, window.innerWidth - 28);
    var maxY = Math.max(topBound + 80, window.innerHeight - 28);

    if (x < 5) { x = 5; vx = Math.abs(vx) * .94; addScore(10); }
    if (x > maxX) { x = maxX; vx = -Math.abs(vx) * .94; addScore(10); }
    if (y < topBound) { y = topBound; vy = Math.abs(vy) * .86; addScore(10); }
    if (y > maxY) {
      y = maxY;
      vy = -Math.max(8, Math.abs(vy) * .86);
      vx += (Math.random() - .5) * 3;
      addScore(25);
    }

    visibleTargets().some(function (target) { return collideWithTarget(target, now); });

    vx *= .999;
    if (Math.abs(vx) < 1.8) vx += vx < 0 ? -.3 : .3;
    if (Math.abs(vx) > 10) vx *= .92;
    if (Math.abs(vy) > 15) vy *= .94;

    ball.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';

    if (now >= activeUntil) {
      finishBall();
      return;
    }
    animationFrame = requestAnimationFrame(ballLoop);
  }

  function launchBall() {
    if (!ball) return;

    if (reduced()) {
      addScore(500);
      var first = visibleTargets()[0];
      if (first) flashTarget(first);
      return;
    }

    if (animationFrame) cancelAnimationFrame(animationFrame);
    inPlay = true;
    root.classList.add('ball-in-play');
    ball.classList.add('is-live');
    if (launchButton) launchButton.classList.add('is-playing');
    x = Math.max(12, window.innerWidth - 64);
    y = Math.max(140, window.innerHeight - 72);
    vx = -(4.3 + Math.random() * 3.2);
    vy = -(11.5 + Math.random() * 3);
    lastFrame = 0;
    activeUntil = performance.now() + 12000;
    addScore(100);
    animationFrame = requestAnimationFrame(ballLoop);
  }

  if (launchButton) launchButton.addEventListener('click', launchBall);

  window.addEventListener('scroll', function () {
    var current = window.scrollY;
    var travel = current - lastScrollY;
    lastScrollY = current;
    if (!inPlay) return;
    vy += Math.max(-2.5, Math.min(2.5, travel * .018));
    activeUntil = Math.min(performance.now() + 9000, activeUntil + Math.min(500, Math.abs(travel) * 2));
  }, { passive: true });

  window.addEventListener('pointermove', function (event) {
    if (!inPlay || event.pointerType === 'touch') return;
    var center = x + 12;
    var distance = event.clientX - center;
    if (Math.abs(distance) < 140) vx += distance * .0008;
  }, { passive: true });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden && inPlay) finishBall();
  });

  window.addEventListener('resize', function () {
    x = Math.min(x, window.innerWidth - 28);
    y = Math.min(y, window.innerHeight - 28);
  });

  if (reduceMq.addEventListener) {
    reduceMq.addEventListener('change', function (event) {
      if (event.matches && inPlay) finishBall();
      revealZones.forEach(function (zone) { zone.classList.add('is-revealed'); });
    });
  }
})();
