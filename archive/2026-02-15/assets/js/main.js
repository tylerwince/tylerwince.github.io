/**
 * Tyler Wince — PIXEL DESKTOP theme interactions
 */

(function() {
  'use strict';

  var body = document.body;
  var routeToggle = document.getElementById('route-toggle');
  var siteHeader = document.getElementById('site-header');
  body.classList.add('js-ready');

  // Nav toggle (mobile: slides up from bottom as Start menu)
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

  // Window focus management — clicking a window brings it to front
  var zCounter = 10;
  document.querySelectorAll('.win-window').forEach(function(win) {
    win.addEventListener('mousedown', function() {
      // Remove focus from all windows
      document.querySelectorAll('.win-window').forEach(function(w) {
        w.classList.remove('win-focused');
      });
      // Focus this window and bring to front
      win.classList.add('win-focused');
      zCounter++;
      win.style.zIndex = zCounter;
    });
  });

  // Taskbar clock
  var clockEl = document.getElementById('taskbar-clock');
  if (clockEl) {
    function updateClock() {
      var now = new Date();
      var hours = now.getHours();
      var minutes = now.getMinutes();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      var timeStr = hours + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + ampm;
      clockEl.textContent = timeStr;
    }
    updateClock();
    setInterval(updateClock, 30000);
  }
})();
