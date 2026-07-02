/* tylerwince.com — MANICULE
 * Lane: pure-typography. The page is a critical edition; the interactions are
 * its apparatus:
 *   1. nav active-state on the ribbon markers (covers nested URLs)
 *   2. THE SIGNATURE — the manicule: a small pointing hand glides down the
 *      margin rule as you read, keeping a live line count ("l. 142");
 *      sidenotes ink themselves in as each section arrives
 *   3. the contents tassel — on small screens the ribbons unroll over the page
 * All motion is gated behind prefers-reduced-motion (handled in CSS too).
 */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Nav active state (URL based — authoritative on every page) ---- */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.site-nav .nav-item a'));
  var path = window.location.pathname.replace(/\/+$/, '') || '/';

  function setActive(activeLink) {
    navLinks.forEach(function (link) {
      var on = link === activeLink;
      link.classList.toggle('active', on);
      if (on) { link.setAttribute('aria-current', 'page'); }
      else { link.removeAttribute('aria-current'); }
    });
  }
  var best = null, bestLen = -1;
  navLinks.forEach(function (link) {
    var href = (link.getAttribute('href') || '').replace(/\/+$/, '') || '/';
    var match = (href === '/') ? (path === '/') : (path.indexOf(href) === 0);
    if (match && href.length > bestLen) { best = link; bestLen = href.length; }
  });
  if (best) setActive(best);

  /* ====================================================================
     THE CONTENTS TASSEL — small-screen nav: the ribbons unroll over the page
     ==================================================================== */
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');

  function setContents(open) {
    root.classList.toggle('nav-open', open);
    if (toggle) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close the contents' : 'Open the contents');
    }
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setContents(!root.classList.contains('nav-open'));
    });
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () { setContents(false); });
    });
    nav.addEventListener('click', function (e) {
      if (e.target === nav || e.target.classList.contains('nav-list')) {
        setContents(false);
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && root.classList.contains('nav-open')) {
        setContents(false);
        toggle.focus();
      }
    });
  }

  /* ====================================================================
     THE MANICULE — walks the margin rule, counting lines as you read
     ==================================================================== */
  var rail = document.getElementById('margin-rail');
  var hand = document.getElementById('manicule');
  var lineNo = document.getElementById('line-no');

  if (rail && hand) {
    var lineHeight = 30;
    try {
      var probe = parseFloat(getComputedStyle(document.body).lineHeight);
      if (probe > 12) { lineHeight = probe; }
    } catch (err) { /* keep fallback */ }

    var ticking = false;
    function placeHand() {
      ticking = false;
      var span = document.documentElement.scrollHeight - window.innerHeight;
      var progress = span > 0 ? Math.min(1, Math.max(0, window.scrollY / span)) : 0;
      var travel = rail.clientHeight - hand.offsetHeight;
      hand.style.transform = 'translateY(' + (progress * travel) + 'px)';
      if (lineNo) {
        lineNo.textContent = 'l. ' + (Math.round(window.scrollY / lineHeight) + 1);
      }
    }
    function requestPlace() {
      if (!ticking) { ticking = true; requestAnimationFrame(placeHand); }
    }
    window.addEventListener('scroll', requestPlace, { passive: true });
    window.addEventListener('resize', requestPlace);
    placeHand();
  }

  /* the hand arrives, the rubric inks in */
  if (reduce) {
    root.classList.add('inked');
  } else {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        root.classList.add('inked');
      });
    });
  }

  /* ====================================================================
     Sidenotes ink in as each section enters the measure
     ==================================================================== */
  var sections = Array.prototype.slice.call(document.querySelectorAll('.home-section'));
  if (sections.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      sections.forEach(function (s) { s.classList.add('in-view'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0.1 });
      sections.forEach(function (s) { io.observe(s); });
    }
  }
})();
