/* archive.js — stable behavior for the design archive page.
   NOT part of the daily redesign scope; themes restyle it via CSS only. */
(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('archive-surprise');
    if (!btn) return;
    var dates = (btn.getAttribute('data-dates') || '').split(',').filter(Boolean);
    if (!dates.length) { btn.hidden = true; return; }
    btn.addEventListener('click', function () {
      var d = dates[Math.floor(Math.random() * dates.length)];
      window.location.href = '/archive/' + d + '/';
    });
  });
})();
