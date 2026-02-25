/**
 * Tyler Wince — CLI Interactions
 */

(function() {
  'use strict';

  // ---- Active nav highlighting ----
  var currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a').forEach(function(link) {
    var href = (link.getAttribute('href') || '').replace(/\/$/, '') || '/';
    if (currentPath === href || (href !== '/' && currentPath.indexOf(href) === 0)) {
      link.classList.add('active');
    }
  });

  // ---- External links in new tab ----
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
    button.textContent = '[ COPY ]';

    button.addEventListener('click', async function() {
      try {
        await navigator.clipboard.writeText(block.textContent || '');
        button.textContent = '[ COPIED ]';
        setTimeout(function() { button.textContent = '[ COPY ]'; }, 1500);
      } catch (error) {
        button.textContent = '[ ERR ]';
        setTimeout(function() { button.textContent = '[ COPY ]'; }, 1500);
      }
    });

    pre.appendChild(button);
  });

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

})();
