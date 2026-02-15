/**
 * Tyler Wince - INK & PAPER Theme JavaScript
 * Subtle, elegant interactions for a refined experience.
 */

(function() {
  'use strict';

  // Header scroll effect - subtle fade in background
  const header = document.getElementById('site-header');
  let ticking = false;

  function updateHeader() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });

  // Highlight active nav link based on current page
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.site-nav a');

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    // Remove trailing slash for comparison
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

  // Add animation classes on scroll for elements with data-animate
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
        button.style.background = 'var(--color-gold)';
        button.style.color = 'var(--color-ink)';
        setTimeout(() => {
          button.textContent = 'Copy';
          button.style.background = '';
          button.style.color = '';
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

  // Subtle hover lift effect for cards
  document.querySelectorAll('.app-card, .card, .feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });

  // Keyboard navigation enhancement - visible focus states
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
      outline: 2px solid var(--color-accent);
      outline-offset: 2px;
    }
    .keyboard-nav *:focus:not(:focus-visible) {
      outline: none;
    }
  `;
  document.head.appendChild(style);

})();
