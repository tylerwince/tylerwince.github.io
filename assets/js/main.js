document.addEventListener('DOMContentLoaded', function() {
  var path = window.location.pathname;
  document.querySelectorAll('.ide-file-list a').forEach(function(link) {
    var href = link.getAttribute('href');
    if (href === path || href + '/' === path || (path.startsWith(href) && href !== '/')) {
      link.classList.add('active');
    }
  });
});