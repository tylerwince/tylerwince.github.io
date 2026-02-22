/**
 * Tyler Wince — STORYBOARD STUDIO interactions
 */

(function() {
  'use strict';

  var body = document.body;
  body.classList.add('js-ready');

  // ---- Header rail scroll shadow ----
  var rail = document.getElementById('site-header');
  if (rail) {
    var railTicking = false;

    function updateRail() {
      if (window.scrollY > 18) {
        rail.classList.add('is-scrolled');
      } else {
        rail.classList.remove('is-scrolled');
      }
      railTicking = false;
    }

    function onRailScroll() {
      if (!railTicking) {
        window.requestAnimationFrame(updateRail);
        railTicking = true;
      }
    }

    window.addEventListener('scroll', onRailScroll, { passive: true });
    updateRail();
  }

  // ---- Scene map overlay ----
  var navToggle = document.getElementById('nav-toggle');
  var navOverlay = document.getElementById('nav-overlay');
  var navClose = document.getElementById('nav-close');

  function closeNavOverlay() {
    if (!navOverlay) return;
    navOverlay.classList.remove('is-open');
    navOverlay.setAttribute('aria-hidden', 'true');
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'false');
    }
    body.classList.remove('nav-open');
  }

  function openNavOverlay() {
    if (!navOverlay) return;
    navOverlay.classList.add('is-open');
    navOverlay.setAttribute('aria-hidden', 'false');
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'true');
    }
    body.classList.add('nav-open');
  }

  if (navToggle && navOverlay) {
    navToggle.addEventListener('click', function() {
      if (navOverlay.classList.contains('is-open')) {
        closeNavOverlay();
      } else {
        openNavOverlay();
      }
    });

    navOverlay.addEventListener('click', function(event) {
      if (event.target && event.target.hasAttribute('data-nav-close')) {
        closeNavOverlay();
      }
    });

    navOverlay.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', closeNavOverlay);
    });
  }

  if (navClose) {
    navClose.addEventListener('click', closeNavOverlay);
  }

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeNavOverlay();
    }
  });

  // ---- Active nav highlighting ----
  var currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.story-nav-link, .route-sheet-link, .mobile-dock-link').forEach(function(link) {
    var href = (link.getAttribute('href') || '').replace(/\/$/, '') || '/';
    if (currentPath === href || (href !== '/' && currentPath.indexOf(href) === 0)) {
      link.classList.add('active');
    }
  });

  // ---- Scroll reveal ----
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
        threshold: 0.1,
        rootMargin: '0px 0px -45px 0px'
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
        setTimeout(function() {
          button.textContent = 'Copy';
        }, 1500);
      } catch (error) {
        button.textContent = 'Error';
        setTimeout(function() {
          button.textContent = 'Copy';
        }, 1500);
      }
    });

    pre.appendChild(button);
  });

  // ---- Focus intent ----
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') {
      body.classList.add('keyboard-nav');
    }
  });

  document.addEventListener('mousedown', function() {
    body.classList.remove('keyboard-nav');
  });

  // ---- Panel tilt interaction ----
  if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.scene-panel').forEach(function(panel) {
      panel.addEventListener('mousemove', function(event) {
        var rect = panel.getBoundingClientRect();
        var px = (event.clientX - rect.left) / rect.width;
        var py = (event.clientY - rect.top) / rect.height;
        var rotateY = (px - 0.5) * 1.6;
        var rotateX = (0.5 - py) * 1.6;
        panel.style.transform = 'perspective(900px) rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg)';
      });

      panel.addEventListener('mouseleave', function() {
        panel.style.transform = '';
      });
    });
  }
})();
