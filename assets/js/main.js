/* tylerwince.com — TITLE SEQUENCE
 * Lane: motion-first. The site is staged as a film's opening titles.
 *   1. nav active-state on the cue sheet (covers nested URLs)
 *   2. the title-sequence reveal on load — the cue sheet rolls in and the
 *      hero name cuts up into frame (html.cues -> html.is-ready)
 *   3. scene cuts — each [data-cue] scene snaps in as it enters the frame and
 *      resets when it leaves, so scrolling re-cuts the reel
 *   4. the tally — on the home page the cue sheet tracks the scene you're in,
 *      and clicking a cue re-cues that scene instead of leaving the page
 * All choreography is gated behind prefers-reduced-motion.
 */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;

  /* ---- map a nav href to its home-scene id ---- */
  function sceneIdFor(href) {
    var p = (href || '').replace(/[#?].*$/, '').replace(/\/+$/, '');
    var seg = p.split('/').pop();
    return seg ? 'scene-' + seg : 'scene-home';
  }

  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.site-nav .nav-item a'));

  /* ---- Nav active state (URL based — the default on every page) ---- */
  var path = window.location.pathname.replace(/\/+$/, '') || '/';
  function setActive(activeLink) {
    navLinks.forEach(function (link) {
      var on = link === activeLink;
      link.classList.toggle('active', on);
      if (on) { link.setAttribute('aria-current', 'page'); }
      else { link.removeAttribute('aria-current'); }
    });
  }
  navLinks.forEach(function (link) {
    var href = (link.getAttribute('href') || '').replace(/\/+$/, '') || '/';
    var match = (href === '/') ? (path === '/') : (path.indexOf(href) === 0);
    if (match) setActive(link);
  });

  var onHome = !!document.getElementById('scene-home');

  /* ====================================================================
     The title-sequence reveal + scene cuts
     ==================================================================== */
  var scenes = Array.prototype.slice.call(document.querySelectorAll('[data-cue]'));

  function cue(el) { el.classList.add('is-cued'); }
  function uncue(el) { el.classList.remove('is-cued'); }
  function recue(el) {              /* force the cut to replay */
    el.classList.remove('is-cued');
    void el.offsetWidth;            /* reflow */
    el.classList.add('is-cued');
  }

  if (!reduce && scenes.length) {
    root.classList.add('cues');     /* arm the pre-cue states */

    /* roll the cue sheet in once the first frame paints */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { root.classList.add('is-ready'); });
    });

    if ('IntersectionObserver' in window) {
      var cueObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) cue(e.target);
          else if (e.intersectionRatio === 0) uncue(e.target);
        });
      }, { threshold: [0, 0.18], rootMargin: '0px 0px -8% 0px' });
      scenes.forEach(function (s) { cueObserver.observe(s); });
    } else {
      scenes.forEach(cue);
    }
  } else {
    scenes.forEach(cue);            /* reduced motion: just show them */
  }

  /* ====================================================================
     The tally — on the home page the cue sheet follows your scroll, and a
     cue re-cues its scene rather than navigating away.
     ==================================================================== */
  if (onHome && navLinks.length) {
    /* click-to-recue */
    navLinks.forEach(function (link) {
      var target = document.getElementById(sceneIdFor(link.getAttribute('href')));
      if (!target) return;          /* no matching scene -> normal nav */
      link.addEventListener('click', function (ev) {
        ev.preventDefault();
        setActive(link);
        target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        if (!reduce) recue(target);
      });
    });

    /* scrollspy: light the cue for whichever scene crosses the centre line */
    if ('IntersectionObserver' in window) {
      var byScene = {};
      navLinks.forEach(function (link) {
        byScene[sceneIdFor(link.getAttribute('href'))] = link;
      });
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var link = byScene[e.target.id];
          if (link) setActive(link);
        });
      }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
      scenes.forEach(function (s) { spy.observe(s); });
    }
  }
})();
