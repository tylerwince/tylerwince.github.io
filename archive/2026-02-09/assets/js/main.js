/**
 * Tyler Wince - NOIR DOSSIER Theme JavaScript
 * Classified. Analog. After Hours.
 */

(function() {
  'use strict';

  // Mobile drawer navigation
  const header = document.getElementById('site-header');
  const drawerToggle = document.getElementById('nav-drawer-toggle');
  const drawerOverlay = document.getElementById('nav-drawer-overlay');

  if (drawerToggle && header) {
    drawerToggle.addEventListener('click', function() {
      const isOpen = header.classList.toggle('drawer-open');
      if (drawerOverlay) {
        drawerOverlay.classList.toggle('visible', isOpen);
      }
      drawerToggle.textContent = isOpen ? 'Close' : 'Dossier';
    });
  }

  if (drawerOverlay && header) {
    drawerOverlay.addEventListener('click', function() {
      header.classList.remove('drawer-open');
      drawerOverlay.classList.remove('visible');
      if (drawerToggle) drawerToggle.textContent = 'Dossier';
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
        button.textContent = 'Copied';
        button.style.background = 'var(--color-accent)';
        button.style.color = '#fff';
        button.style.borderColor = 'var(--color-accent)';
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

  // Close mobile drawer on escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && header && header.classList.contains('drawer-open')) {
      header.classList.remove('drawer-open');
      if (drawerOverlay) drawerOverlay.classList.remove('visible');
      if (drawerToggle) drawerToggle.textContent = 'Dossier';
    }
  });

  // Add focus styles for keyboard navigation
  const style = document.createElement('style');
  style.textContent = `
    .keyboard-nav *:focus {
      outline: 2px solid var(--color-accent);
      outline-offset: 2px;
    }
    .keyboard-nav *:focus:not(:focus-visible) {
      outline: none;
    }
  `;
  document.head.appendChild(style);

})();
