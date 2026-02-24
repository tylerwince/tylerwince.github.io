/**
 * Tyler Wince — VHS RENTAL interactions
 * Neon glow, CRT warmup, overlay menu, bottom nav.
 */

(function() {
  'use strict';

  var body = document.body;
  body.classList.add('js-ready');

  // ---- Overlay menu ----
  var navToggle = document.getElementById('nav-toggle');
  var navOverlay = document.getElementById('nav-overlay');
  var navClose = document.getElementById('nav-close');

  function closeOverlay() {
    if (!navOverlay) return;
    navOverlay.classList.remove('is-open');
    navOverlay.setAttribute('aria-hidden', 'true');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    body.classList.remove('nav-open');
  }

  function openOverlay() {
    if (!navOverlay) return;
    navOverlay.classList.add('is-open');
    navOverlay.setAttribute('aria-hidden', 'false');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
    body.classList.add('nav-open');
  }

  if (navToggle && navOverlay) {
    navToggle.addEventListener('click', function() {
      if (navOverlay.classList.contains('is-open')) {
        closeOverlay();
      } else {
        openOverlay();
      }
    });

    navOverlay.addEventListener('click', function(event) {
      if (event.target && event.target.hasAttribute('data-nav-close')) {
        closeOverlay();
      }
    });

    navOverlay.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', closeOverlay);
    });
  }

  if (navClose) {
    navClose.addEventListener('click', closeOverlay);
  }

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') closeOverlay();
  });

  // ---- Active nav highlighting ----
  var currentPath = window.location.pathname.replace(/\/$/, '') || '/';

  function highlightNav(selector) {
    document.querySelectorAll(selector).forEach(function(link) {
      var href = (link.getAttribute('href') || '').replace(/\/$/, '') || '/';
      if (currentPath === href || (href !== '/' && currentPath.indexOf(href) === 0)) {
        link.classList.add('active');
      }
    });
  }

  highlightNav('.sidebar-link');
  highlightNav('.bottom-nav-link');
  highlightNav('.vhs-panel-link');

  // ---- Scroll reveal (CRT warmup) ----
  var revealTargets = document.querySelectorAll('[data-reveal]');
  if (revealTargets.length > 0) {
    revealTargets.forEach(function(target) {
      target.classList.add('reveal-target');
    });

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function(entries, obs) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
      });

      revealTargets.forEach(function(target) {
        observer.observe(target);
      });
    } else {
      revealTargets.forEach(function(target) {
        target.classList.add('is-visible');
      });
    }
  }

  // ---- Sidebar glow on hover (desktop) ----
  if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.sidebar-link').forEach(function(link) {
      link.addEventListener('mouseenter', function() {
        link.style.transition = 'all 0.15s ease';
      });
    });
  }

  // ---- Smooth hash scrolling ----
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(event) {
      var hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;
      var target = document.querySelector(hash);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ---- External links in new tab ----
  document.querySelectorAll('a[href^="http"]').forEach(function(link) {
    try {
      var url = new URL(link.href);
      if (url.hostname !== window.location.hostname) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    } catch (error) {}
  });

  // ---- Code copy button ----
  document.querySelectorAll('pre code').forEach(function(block) {
    var pre = block.parentElement;
    if (!pre || pre.querySelector('.code-copy-button')) return;

    var button = document.createElement('button');
    button.className = 'code-copy-button';
    button.type = 'button';
    button.textContent = 'Copy';
    button.setAttribute('aria-label', 'Copy code to clipboard');

    button.addEventListener('click', async function() {
      try {
        await navigator.clipboard.writeText(block.textContent || '');
        button.textContent = 'Copied!';
        setTimeout(function() { button.textContent = 'Copy'; }, 1500);
      } catch (error) {
        button.textContent = 'Error';
        setTimeout(function() { button.textContent = 'Copy'; }, 1500);
      }
    });

    pre.appendChild(button);
  });

  // ---- Focus intent ----
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') body.classList.add('keyboard-nav');
  });
  document.addEventListener('mousedown', function() {
    body.classList.remove('keyboard-nav');
  });

  // ---- Neon hover glow on VHS tapes ----
  if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.vhs-tape').forEach(function(tape) {
      tape.addEventListener('mouseenter', function() {
        tape.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease';
      });
    });
  }
})();
