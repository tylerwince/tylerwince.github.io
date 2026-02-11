/**
 * Tyler Wince - CITY TRANSIT ATLAS theme interactions
 */

(function() {
  'use strict';

  const body = document.body;
  const routeToggle = document.getElementById('route-toggle');
  const siteNav = document.getElementById('site-nav');
  body.classList.add('js-ready');

  function setNavOpen(open) {
    if (!routeToggle || !siteNav) {
      return;
    }

    body.classList.toggle('nav-open', open);
    routeToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  if (routeToggle && siteNav) {
    routeToggle.addEventListener('click', function() {
      const expanded = routeToggle.getAttribute('aria-expanded') === 'true';
      setNavOpen(!expanded);
    });

    siteNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        if (window.matchMedia('(max-width: 1020px)').matches) {
          setNavOpen(false);
        }
      });
    });

    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        setNavOpen(false);
      }
    });

    window.addEventListener('resize', function() {
      if (window.innerWidth > 1020) {
        setNavOpen(false);
      }
    });
  }

  // Highlight active nav links based on current path.
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.site-nav a').forEach(function(link) {
    const href = (link.getAttribute('href') || '').replace(/\/$/, '') || '/';
    if (currentPath === href || (href !== '/' && currentPath.indexOf(href) === 0)) {
      link.classList.add('active');
    }
  });

  // Progressive reveal for route panels.
  const revealTargets = document.querySelectorAll('[data-reveal]');
  if (revealTargets.length > 0) {
    body.classList.add('reveal-ready');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function(entries, obs) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
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

  // Smooth scroll for hash links.
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(event) {
      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') {
        return;
      }

      const target = document.querySelector(hash);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // External links open in new tab.
  document.querySelectorAll('a[href^="http"]').forEach(function(link) {
    try {
      const url = new URL(link.href);
      if (url.hostname !== window.location.hostname) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    } catch (error) {
      // Ignore invalid URLs.
    }
  });

  // Add copy button to code blocks.
  document.querySelectorAll('pre code').forEach(function(block) {
    const pre = block.parentElement;
    if (!pre || pre.querySelector('.code-copy-button')) {
      return;
    }

    const button = document.createElement('button');
    button.className = 'code-copy-button';
    button.type = 'button';
    button.textContent = 'Copy';
    button.setAttribute('aria-label', 'Copy code to clipboard');

    button.addEventListener('click', async function() {
      try {
        await navigator.clipboard.writeText(block.textContent || '');
        button.textContent = 'Copied';
        setTimeout(function() {
          button.textContent = 'Copy';
        }, 1600);
      } catch (error) {
        button.textContent = 'Error';
        setTimeout(function() {
          button.textContent = 'Copy';
        }, 1600);
      }
    });

    pre.appendChild(button);
  });

  // Keyboard-focus intent styling.
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') {
      body.classList.add('keyboard-nav');
    }
  });

  document.addEventListener('mousedown', function() {
    body.classList.remove('keyboard-nav');
  });
})();
