/**
 * Tyler Wince - TROPICAL RESORT Theme JavaScript
 * Lush. Warm. Paradise Found.
 */

(function() {
  'use strict';

  // Floating nav: hide on scroll down, show on scroll up
  const header = document.getElementById('site-header');
  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateNav() {
    const currentScrollY = window.scrollY;
    const isMobile = window.innerWidth <= 768;

    if (header) {
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        header.style.transform = isMobile ? 'translateY(120%)' : 'translateX(-50%) translateY(120%)';
      } else {
        header.style.transform = isMobile ? 'translateY(0)' : 'translateX(-50%) translateY(0)';
      }
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  }, { passive: true });

  // Set transition after initial load to prevent flash
  if (header) {
    requestAnimationFrame(() => {
      header.style.transition = 'transform 400ms cubic-bezier(0.33, 1, 0.68, 1), box-shadow 350ms ease';
    });
  }

  // Highlight active nav link based on current page
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.site-nav a');

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    const normalizedCurrent = currentPath.replace(/\/$/, '') || '/';
    const normalizedLink = linkPath.replace(/\/$/, '') || '/';

    if (normalizedCurrent === normalizedLink ||
        (normalizedLink !== '/' && normalizedCurrent.startsWith(normalizedLink))) {
      link.classList.add('active');
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Scroll-triggered fade-in for elements with data-animate
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });

  // Bento tiles: stagger entrance animation
  const bentoTiles = document.querySelectorAll('.bento-tile');
  bentoTiles.forEach((tile, i) => {
    tile.style.opacity = '0';
    tile.style.transform = 'translateY(20px)';
    tile.style.transition = `opacity 600ms ease ${i * 120}ms, transform 600ms cubic-bezier(0.33, 1, 0.68, 1) ${i * 120}ms`;

    setTimeout(() => {
      tile.style.opacity = '1';
      tile.style.transform = 'translateY(0)';
    }, 100);
  });

  // External links open in new tab
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    const url = new URL(link.href);
    if (url.hostname !== window.location.hostname) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

  // Add copy button to code blocks
  document.querySelectorAll('pre code').forEach(block => {
    const pre = block.parentElement;
    const button = document.createElement('button');
    button.className = 'code-copy-button';
    button.textContent = 'Copy';
    button.setAttribute('aria-label', 'Copy code to clipboard');

    button.addEventListener('click', async () => {
      const code = block.textContent;
      try {
        await navigator.clipboard.writeText(code);
        button.textContent = 'Copied!';
        button.style.background = 'var(--color-green)';
        button.style.color = '#fff';
        button.style.borderColor = 'var(--color-green)';
        setTimeout(() => {
          button.textContent = 'Copy';
          button.style.background = '';
          button.style.color = '';
          button.style.borderColor = '';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
        button.textContent = 'Error';
        setTimeout(() => {
          button.textContent = 'Copy';
        }, 2000);
      }
    });

    pre.style.position = 'relative';
    pre.appendChild(button);
  });

  // Keyboard navigation enhancement
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });

  document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
  });

  // Add focus styles for keyboard navigation
  const style = document.createElement('style');
  style.textContent = `
    .keyboard-nav *:focus {
      outline: 2px solid var(--color-green);
      outline-offset: 2px;
    }
    .keyboard-nav *:focus:not(:focus-visible) {
      outline: none;
    }
  `;
  document.head.appendChild(style);

  // Mobile nav: update scroll behavior for edge-to-edge nav
  function updateMobileNav() {
    if (window.innerWidth <= 768 && header) {
      // On mobile, use left/right positioning instead of centering
      header.style.transform = lastScrollY > 200 && lastScrollY > (lastScrollY - 5) ? 'translateY(120%)' : 'translateY(0)';
    }
  }

  window.addEventListener('resize', function() {
    if (!ticking) {
      requestAnimationFrame(updateMobileNav);
    }
  }, { passive: true });

})();
