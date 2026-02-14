/**
 * Tyler Wince - LOVE LETTERS theme interactions
 */

(function() {
  'use strict';

  var body = document.body;
  var routeToggle = document.getElementById('route-toggle');
  var siteHeader = document.getElementById('site-header');
  body.classList.add('js-ready');

  // Nav toggle (mobile: slides up from bottom)
  function setNavOpen(open) {
    if (!routeToggle || !siteHeader) return;
    body.classList.toggle('nav-open', open);
    routeToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  if (routeToggle && siteHeader) {
    routeToggle.addEventListener('click', function() {
      var expanded = routeToggle.getAttribute('aria-expanded') === 'true';
      setNavOpen(!expanded);
    });

    // Close nav when clicking a link (mobile)
    siteHeader.querySelectorAll('.site-nav a').forEach(function(link) {
      link.addEventListener('click', function() {
        if (window.matchMedia('(max-width: 900px)').matches) {
          setNavOpen(false);
        }
      });
    });

    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') setNavOpen(false);
    });

    // Close nav on click outside (mobile)
    document.addEventListener('click', function(event) {
      if (window.matchMedia('(max-width: 900px)').matches && body.classList.contains('nav-open')) {
        if (!siteHeader.contains(event.target) && !routeToggle.contains(event.target)) {
          setNavOpen(false);
        }
      }
    });

    window.addEventListener('resize', function() {
      if (window.innerWidth > 900) setNavOpen(false);
    });
  }

  // Highlight active nav links
  var currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.site-nav a').forEach(function(link) {
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

  // Add copy button to code blocks
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

  // Keyboard-focus intent styling
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') body.classList.add('keyboard-nav');
  });

  document.addEventListener('mousedown', function() {
    body.classList.remove('keyboard-nav');
  });

  // Floating hearts animation on valentine cards
  document.querySelectorAll('.valentine-card').forEach(function(card) {
    card.addEventListener('mouseenter', function() {
      card.style.transform = card.style.transform.replace(/rotate\([^)]+\)/, '') + ' scale(1.01)';
    });
    card.addEventListener('mouseleave', function() {
      // Restore original rotation
      if (card.classList.contains('card-apps')) {
        card.style.transform = 'rotate(-0.8deg)';
      } else if (card.classList.contains('card-writing')) {
        card.style.transform = 'rotate(0.5deg)';
      } else if (card.classList.contains('card-reading')) {
        card.style.transform = 'rotate(-0.3deg)';
      }
    });
  });

  // Gentle letter paper hover lift
  document.querySelectorAll('.letter-paper, .app-love-letter, .book-love-letter, .page-letter').forEach(function(paper) {
    paper.addEventListener('mouseenter', function() {
      paper.style.boxShadow = '3px 5px 20px rgba(100, 40, 40, 0.15), 0 2px 6px rgba(0,0,0,0.06)';
    });
    paper.addEventListener('mouseleave', function() {
      paper.style.boxShadow = '';
    });
  });
})();
