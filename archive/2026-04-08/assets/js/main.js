/** THE WEATHER MAP - Main JS */
document.addEventListener('DOMContentLoaded', () => {

  /* === Mobile sidebar toggle === */
  const toggle = document.getElementById('nav-toggle');
  const legend = document.getElementById('map-legend');

  if (toggle && legend) {
    toggle.addEventListener('click', () => {
      legend.classList.toggle('open');
      toggle.textContent = legend.classList.contains('open') ? 'CLOSE' : 'METAR';
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (legend.classList.contains('open') &&
          !legend.contains(e.target) &&
          e.target !== toggle) {
        legend.classList.remove('open');
        toggle.textContent = 'METAR';
      }
    });
  }

  /* === Active nav highlighting === */
  const currentPath = window.location.pathname;
  document.querySelectorAll('.legend-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === '/' && currentPath === '/') {
      link.classList.add('active');
    } else if (href !== '/' && currentPath.startsWith(href)) {
      link.classList.add('active');
    }
  });

  /* === Reading page sort logic === */
  const authorSort = document.getElementById('sort-author');
  const dateSort = document.getElementById('sort-date');
  const genreSort = document.getElementById('sort-genre');
  const listContainer = document.getElementById('reading-list');

  if (authorSort && dateSort && genreSort && listContainer) {
    const originalContent = listContainer.innerHTML;
    const items = Array.from(listContainer.querySelectorAll('.post-index-row')).filter(el => !el.classList.contains('year-heading'));

    function removeHeadings() {
      listContainer.querySelectorAll('.year-heading').forEach(el => el.remove());
    }

    dateSort.addEventListener('click', (e) => {
      e.preventDefault();
      authorSort.classList.remove('active');
      genreSort.classList.remove('active');
      dateSort.classList.add('active');
      listContainer.innerHTML = originalContent;
    });

    authorSort.addEventListener('click', (e) => {
      e.preventDefault();
      dateSort.classList.remove('active');
      genreSort.classList.remove('active');
      authorSort.classList.add('active');
      removeHeadings();
      const sorted = items.sort((a, b) => {
        const nameA = a.getAttribute('data-last-name') || '';
        const nameB = b.getAttribute('data-last-name') || '';
        return nameA.localeCompare(nameB);
      });
      listContainer.innerHTML = '';
      let currentLetter = '';
      sorted.forEach(item => {
        const lastName = item.getAttribute('data-last-name');
        if (lastName) {
          const firstLetter = lastName.charAt(0).toUpperCase();
          if (firstLetter !== currentLetter) {
            const heading = document.createElement('div');
            heading.className = 'year-heading';
            heading.textContent = firstLetter;
            listContainer.appendChild(heading);
            currentLetter = firstLetter;
          }
        }
        listContainer.appendChild(item);
      });
    });

    genreSort.addEventListener('click', (e) => {
      e.preventDefault();
      dateSort.classList.remove('active');
      authorSort.classList.remove('active');
      genreSort.classList.add('active');
      removeHeadings();
      const sorted = items.sort((a, b) => {
        const genreA = a.getAttribute('data-genre') || 'Uncategorized';
        const genreB = b.getAttribute('data-genre') || 'Uncategorized';
        return genreA.localeCompare(genreB);
      });
      listContainer.innerHTML = '';
      let currentGenre = '';
      sorted.forEach(item => {
        const genre = item.getAttribute('data-genre') || 'Uncategorized';
        if (genre !== currentGenre) {
          const heading = document.createElement('div');
          heading.className = 'year-heading';
          heading.textContent = genre.toUpperCase();
          listContainer.appendChild(heading);
          currentGenre = genre;
        }
        listContainer.appendChild(item);
      });
    });
  }

  /* === Subtle isobar animation on homepage station models === */
  document.querySelectorAll('.station-model').forEach(model => {
    model.addEventListener('mouseenter', () => {
      model.style.setProperty('--pulse', '1');
    });
    model.addEventListener('mouseleave', () => {
      model.style.setProperty('--pulse', '0');
    });
  });

});
