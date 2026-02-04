/**
 * Tyler Wince - NEUBRUTALISM Theme JavaScript
 * Bold interactions for a bold design.
 */

(function() {
  'use strict';

  // Header scroll effect - adds shadow when scrolled
  const header = document.getElementById('site-header');
  let ticking = false;

  function updateHeader() {
    if (window.scrollY > 20) {
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

  // Add copy button to code blocks with neubrutalist style
  document.querySelectorAll('pre code').forEach(block => {
    const pre = block.parentElement;
    const button = document.createElement('button');
    button.className = 'code-copy-button';
    button.textContent = 'COPY';
    button.setAttribute('aria-label', 'Copy code to clipboard');

    button.addEventListener('click', async () => {
      const code = block.textContent;
      try {
        await navigator.clipboard.writeText(code);
        button.textContent = 'COPIED!';
        button.style.background = 'var(--color-surface-green)';
        setTimeout(() => {
          button.textContent = 'COPY';
          button.style.background = '';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
        button.textContent = 'FAILED';
        button.style.background = 'var(--color-surface-alt)';
        setTimeout(() => {
          button.textContent = 'COPY';
          button.style.background = '';
        }, 2000);
      }
    });

    pre.style.position = 'relative';
    pre.appendChild(button);
  });

  // Add playful tilt effect on card hover (subtle)
  document.querySelectorAll('.app-card, .post-item a, .reading-item, .card').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const centerX = rect.width / 2;
      const tiltX = (x - centerX) / centerX * 1;
      this.style.transform = `translate(-4px, -4px) rotate(${tiltX}deg)`;
    });

    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const centerX = rect.width / 2;
      const tiltX = (x - centerX) / centerX * 1;
      this.style.transform = `translate(-4px, -4px) rotate(${tiltX}deg)`;
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

  // Random color accent on page load for extra fun (optional subtle variation)
  const accentColors = [
    { surface: '#FFE566', alt: '#FF6B9D' },
    { surface: '#7DF9FF', alt: '#FF6B9D' },
    { surface: '#BFFF00', alt: '#FF6B9D' },
    { surface: '#FF9F43', alt: '#7DF9FF' },
    { surface: '#FF6B9D', alt: '#FFE566' }
  ];

  // Uncomment to enable random accent colors on each page load:
  // const randomAccent = accentColors[Math.floor(Math.random() * accentColors.length)];
  // document.documentElement.style.setProperty('--color-surface', randomAccent.surface);

})();
