/* Commonplace: progressively enhanced tabs and collection search. */
(function () {
  'use strict';

  var articleBody = document.querySelector('.layout-post .article-body');
  if (articleBody) {
    var headings = Array.from(articleBody.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]'));
    headings.forEach(function (heading) {
      var link = document.createElement('a');
      var symbol = document.createElement('span');
      link.className = 'heading-anchor';
      link.href = '#' + encodeURIComponent(heading.id);
      link.setAttribute('aria-label', 'Link to ' + heading.textContent.trim());
      link.title = 'Link to this section';
      symbol.textContent = '#';
      symbol.setAttribute('aria-hidden', 'true');
      link.appendChild(symbol);
      heading.classList.add('anchored-heading');
      heading.appendChild(link);
    });

    // A tap reveals the link; a click elsewhere returns headings to plain text.
    document.addEventListener('click', function (event) {
      var selected = event.target.closest('.anchored-heading');
      headings.forEach(function (heading) {
        heading.classList.toggle('heading-anchor-visible', heading === selected);
      });
    });
  }

  var home = document.querySelector('[data-home-tabs]');
  if (home) {
    var tablist = home.querySelector('.index-tabs');
    var tabs = Array.from(home.querySelectorAll('[data-tab]'));
    var panels = Array.from(home.querySelectorAll('[data-panel]'));
    var names = tabs.map(function (tab) { return tab.dataset.tab; });
    var indicator = document.createElement('span');
    indicator.className = 'tab-indicator';
    indicator.setAttribute('aria-hidden', 'true');
    tablist.appendChild(indicator);
    tablist.setAttribute('role', 'tablist');
    tabs.forEach(function (tab) {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', 'panel-' + tab.dataset.tab);
    });
    panels.forEach(function (panel) {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('tabindex', '0');
    });

    function positionTabIndicator() {
      var selected = tablist.querySelector('[aria-selected="true"]');
      if (!selected) return;
      var bounds = selected.getBoundingClientRect();
      var listBounds = tablist.getBoundingClientRect();
      indicator.style.width = bounds.width + 'px';
      indicator.style.transform = 'translateX(' + (bounds.left - listBounds.left) + 'px)';
    }

    function selectTab(name, focus) {
      if (!names.includes(name)) name = 'writing';
      tabs.forEach(function (tab) {
        var selected = tab.dataset.tab === name;
        tab.setAttribute('aria-selected', String(selected));
        tab.setAttribute('tabindex', selected ? '0' : '-1');
        if (selected && focus) tab.focus({ preventScroll: true });
      });
      panels.forEach(function (panel) {
        panel.hidden = panel.dataset.panel !== name;
      });
      positionTabIndicator();
    }

    function syncLocation() {
      var focusedPanel = panels.find(function (panel) { return panel.contains(document.activeElement); });
      var name = window.location.hash.slice(1);
      selectTab(name, Boolean(focusedPanel && focusedPanel.dataset.panel !== name));
    }

    function activate(name, focus) {
      if (window.location.hash !== '#' + name) {
        window.history.pushState(null, '', '#' + name);
      }
      selectTab(name, focus);
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function (event) {
        // Modified clicks retain normal links to the complete collection pages.
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        activate(tab.dataset.tab, true);
      });
      tab.addEventListener('keydown', function (event) {
        var next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (event.key === ' ') next = index;
        if (next === undefined) return;
        event.preventDefault();
        activate(tabs[next].dataset.tab, true);
      });
    });
    home.classList.add('tabs-ready');
    syncLocation();
    // Paint the initial position before enabling transitions between tabs.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { indicator.classList.add('is-ready'); });
    });
    if (window.ResizeObserver) {
      var tabResizeObserver = new ResizeObserver(positionTabIndicator);
      tabs.forEach(function (tab) { tabResizeObserver.observe(tab); });
      tabResizeObserver.observe(tablist);
    } else {
      window.addEventListener('resize', positionTabIndicator);
    }
    window.addEventListener('popstate', syncLocation);
    window.addEventListener('hashchange', syncLocation);
  }

  var writing = document.querySelector('[data-writing]');
  if (writing) {
    var articleQuery = writing.querySelector('[data-article-query]');
    var articleClear = writing.querySelector('[data-search-clear]');
    var articleCount = writing.querySelector('[data-article-count]');
    var articleEmpty = writing.querySelector('[data-article-empty]');

    function normalizeArticleSearch(value) {
      return value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    }

    // Prepare the text once; each keystroke only scans the stored strings.
    var articleYears = Array.from(writing.querySelectorAll('.writing-year')).map(function (year) {
      return {
        element: year,
        articles: Array.from(year.querySelectorAll('[data-article-search]')).map(function (row) {
          return { element: row, text: normalizeArticleSearch(row.dataset.articleSearch) };
        })
      };
    });

    function updateWriting() {
      var terms = normalizeArticleSearch(articleQuery.value).split(' ').filter(Boolean);
      var visible = 0;
      articleYears.forEach(function (year) {
        var yearVisible = 0;
        year.articles.forEach(function (article) {
          var matches = terms.every(function (term) { return article.text.includes(term); });
          article.element.hidden = !matches;
          if (matches) yearVisible++;
        });
        year.element.hidden = yearVisible === 0;
        visible += yearVisible;
      });
      articleCount.textContent = visible + (visible === 1 ? ' article' : ' articles');
      articleEmpty.hidden = visible !== 0;
      articleClear.hidden = articleQuery.value.length === 0;
    }

    writing.querySelector('.writing-controls').hidden = false;
    articleQuery.addEventListener('input', updateWriting);
    articleClear.addEventListener('click', function () {
      articleQuery.value = '';
      updateWriting();
      articleQuery.focus({ preventScroll: true });
    });
    window.addEventListener('pageshow', updateWriting);
    updateWriting();
  }

  var library = document.querySelector('[data-library]');
  if (library) {
    var list = library.querySelector('[data-book-list]');
    var books = Array.from(list.querySelectorAll('.book-line'));
    var search = library.querySelector('[data-book-search]');
    var sortButtons = Array.from(library.querySelectorAll('[data-book-sort]'));
    var filterButtons = Array.from(library.querySelectorAll('[data-book-filter]'));
    var clearSearch = library.querySelector('[data-search-clear]');
    var count = library.querySelector('[data-book-count]');
    var empty = library.querySelector('[data-book-empty]');

    function normalize(value) {
      return value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }
    function authorSurname(book) {
      return book.dataset.author.trim().split(/\s+/).pop();
    }
    function updateLibrary() {
      var terms = normalize(search.value).trim().split(/\s+/).filter(Boolean);
      var mode = library.querySelector('[data-book-sort][aria-pressed="true"]').dataset.bookSort;
      var filter = library.querySelector('[data-book-filter][aria-pressed="true"]').dataset.bookFilter;
      var ordered = books.slice().sort(function (a, b) {
        if (mode === 'title') return a.dataset.title.localeCompare(b.dataset.title);
        if (mode === 'author') return authorSurname(a).localeCompare(authorSurname(b)) || a.dataset.title.localeCompare(b.dataset.title);
        if (mode === 'rating') return Number(b.dataset.rating) - Number(a.dataset.rating) || b.dataset.date.localeCompare(a.dataset.date);
        return b.dataset.date.localeCompare(a.dataset.date);
      });
      var visible = 0;
      ordered.forEach(function (book) {
        var haystack = normalize(book.dataset.title + ' ' + book.dataset.author);
        var matches = terms.every(function (term) { return haystack.includes(term); });
        if (filter === 'favorites') matches = matches && Number(book.dataset.rating) === 5;
        if (filter === 'notes') matches = matches && book.dataset.notes === 'true';
        book.hidden = !matches;
        if (matches) visible++;
        list.appendChild(book);
      });
      count.textContent = visible + (visible === 1 ? ' book' : ' books');
      empty.hidden = visible !== 0;
      clearSearch.hidden = search.value.length === 0;
    }

    library.querySelector('.library-controls').hidden = false;
    search.addEventListener('input', updateLibrary);
    [sortButtons, filterButtons].forEach(function (group) {
      group.forEach(function (button) {
        button.addEventListener('click', function () {
          group.forEach(function (item) { item.setAttribute('aria-pressed', String(item === button)); });
          updateLibrary();
        });
      });
    });
    clearSearch.addEventListener('click', function () {
      search.value = '';
      updateLibrary();
      search.focus({ preventScroll: true });
    });
    window.addEventListener('pageshow', updateLibrary);
    updateLibrary();
  }
})();
