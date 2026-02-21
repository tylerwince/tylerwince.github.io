/**
 * Tyler Wince — RECORD CRATE theme interactions
 */

(function() {
  'use strict';

  var body = document.body;
  body.classList.add('js-ready');

  // ---- Header scroll effect ----
  var header = document.getElementById('site-header');
  if (header) {
    var scrollThreshold = 20;
    var ticking = false;

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          if (window.scrollY > scrollThreshold) {
            header.classList.add('is-scrolled');
          } else {
            header.classList.remove('is-scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---- Mobile nav toggle ----
  var navToggle = document.getElementById('nav-toggle');
  var navOverlay = document.getElementById('nav-overlay');

  if (navToggle && navOverlay) {
    navToggle.addEventListener('click', function() {
      var isOpen = navOverlay.classList.contains('is-open');

      if (isOpen) {
        navOverlay.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      } else {
        navOverlay.classList.add('is-open');
        navToggle.classList.add('is-active');
        navToggle.setAttribute('aria-expanded', 'true');
        body.style.overflow = 'hidden';
      }
    });

    // Close overlay when clicking a link
    navOverlay.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navOverlay.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      });
    });
  }

  // ---- Active nav highlighting ----
  var currentPath = window.location.pathname.replace(/\/$/, '') || '/';

  // Desktop nav
  document.querySelectorAll('.nav-links a').forEach(function(link) {
    var href = (link.getAttribute('href') || '').replace(/\/$/, '') || '/';
    if (currentPath === href || (href !== '/' && currentPath.indexOf(href) === 0)) {
      link.classList.add('active');
    }
  });

  // Overlay nav
  document.querySelectorAll('.overlay-links a').forEach(function(link) {
    var href = (link.getAttribute('href') || '').replace(/\/$/, '') || '/';
    if (currentPath === href || (href !== '/' && currentPath.indexOf(href) === 0)) {
      link.classList.add('active');
    }
  });

  // ---- Scroll reveal ----
  var revealTargets = document.querySelectorAll('[data-reveal]');
  if (revealTargets.length > 0) {
    // Add the reveal-target class for CSS transitions
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
        rootMargin: '0px 0px -40px 0px'
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

  // ---- Smooth scroll for hash links ----
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

  // ---- External links open in new tab ----
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
        setTimeout(function() { button.textContent = 'Copy'; }, 1600);
      } catch (error) {
        button.textContent = 'Error';
        setTimeout(function() { button.textContent = 'Copy'; }, 1600);
      }
    });

    pre.appendChild(button);
  });

  // ---- Keyboard focus intent ----
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') body.classList.add('keyboard-nav');
  });

  document.addEventListener('mousedown', function() {
    body.classList.remove('keyboard-nav');
  });

  // ---- Sleeve hover depth (subtle parallax on sleeves) ----
  document.querySelectorAll('.sleeve').forEach(function(sleeve) {
    sleeve.addEventListener('mouseenter', function() {
      sleeve.style.zIndex = '10';
    });
    sleeve.addEventListener('mouseleave', function() {
      if (!sleeve.classList.contains('sleeve-featured')) {
        sleeve.style.zIndex = '';
      }
    });
  });

})();
