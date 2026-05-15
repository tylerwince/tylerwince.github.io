/* tylerwince.com — baseline JS
   Minimal. Just nav active-state correctness for routes the Liquid
   `contains` check misses (e.g. nested URLs). */
document.addEventListener('DOMContentLoaded', function () {
  var path = window.location.pathname.replace(/\/+$/, '') || '/';
  document.querySelectorAll('.site-nav .nav-item a').forEach(function (link) {
    var href = link.getAttribute('href').replace(/\/+$/, '') || '/';
    if (href !== '/' && path.indexOf(href) === 0) {
      link.classList.add('active');
    }
  });
});
