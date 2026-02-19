/**
 * Tyler Wince — FIELD EXPEDITION theme interactions
 */

(function() {
  'use strict';

  var body = document.body;
  body.classList.add('js-ready');

  // Active nav highlighting (bottom bar)
  var currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.expedition-nav .nav-waypoint a').forEach(function(link) {
    var href = (link.getAttribute('href') || '').replace(/\/$/, '') || '/';
    if (currentPath === href || (href !== '/' && currentPath.indexOf(href) === 0)) {
      link.classList.add('active');
    }
  });

  // Progressive reveal for sections
  var revealTargets = document.querySelectorAll('[data-reveal]');
  if (revealTargets.length > 0) {
    body.classList.add('reveal-ready');

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function(entries, obs) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.06,
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

  // Smooth scroll for hash links
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

  // External links open in new tab
  document.querySelectorAll('a[href^="http"]').forEach(function(link) {
    try {
      var url = new URL(link.href);
      if (url.hostname !== window.location.hostname) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    } catch (error) {}
  });

  // Code copy button
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
        button.textContent = 'Copied';
        setTimeout(function() { button.textContent = 'Copy'; }, 1600);
      } catch (error) {
        button.textContent = 'Error';
        setTimeout(function() { button.textContent = 'Copy'; }, 1600);
      }
    });

    pre.appendChild(button);
  });

  // Keyboard focus intent
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') body.classList.add('keyboard-nav');
  });

  document.addEventListener('mousedown', function() {
    body.classList.remove('keyboard-nav');
  });

  // Hide bottom nav on scroll down, show on scroll up (smooth hide/show)
  var lastScrollY = window.scrollY;
  var nav = document.getElementById('expedition-nav');
  var scrollThreshold = 10;

  window.addEventListener('scroll', function() {
    var currentScrollY = window.scrollY;
    if (!nav) return;

    if (currentScrollY > lastScrollY + scrollThreshold && currentScrollY > 100) {
      nav.classList.add('nav-hidden');
    } else if (currentScrollY < lastScrollY - scrollThreshold) {
      nav.classList.remove('nav-hidden');
    }

    lastScrollY = currentScrollY;
  }, { passive: true });

})();
