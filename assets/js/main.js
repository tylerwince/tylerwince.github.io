/** THE DETECTIVE'S CORKBOARD - Main JS */
document.addEventListener('DOMContentLoaded', () => {
  // Sorting logic for Reading page
  const authorSort = document.getElementById('sort-author');
  const dateSort = document.getElementById('sort-date');
  const genreSort = document.getElementById('sort-genre');
  const listContainer = document.getElementById('reading-list');

  if (authorSort && dateSort && genreSort && listContainer) {
    const originalContent = listContainer.innerHTML;
    
    const items = Array.from(listContainer.querySelectorAll('.book-line, .post-index-row')).filter(el => !el.classList.contains('year-heading'));

    function removeHeadings() {
      listContainer.querySelectorAll('.year-heading').forEach(el => el.remove());
    }

    dateSort.addEventListener('click', (e) => {
      e.preventDefault();
      authorSort.classList.remove('active');
      genreSort.classList.remove('active');
      dateSort.classList.add('active');
      listContainer.innerHTML = originalContent;
      drawConnections(); // Redraw strings
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
            heading.textContent = `SECTION ${firstLetter}`;
            listContainer.appendChild(heading);
            currentLetter = firstLetter;
          }
        }
        listContainer.appendChild(item);
      });
      drawConnections();
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
          heading.textContent = `CATEGORY: ${genre.toUpperCase()}`;
          listContainer.appendChild(heading);
          currentGenre = genre;
        }
        listContainer.appendChild(item);
      });
      drawConnections();
    });
  }

  // --- RED STRING LOGIC ---
  const svg = document.getElementById('string-layer');
  if (svg) {
    drawConnections();
    window.addEventListener('resize', () => {
      clearTimeout(window.resizeTimer);
      window.resizeTimer = setTimeout(drawConnections, 200);
    });
  }

  function drawConnections() {
    if (!svg) return;
    svg.innerHTML = '';
    
    // Set SVG viewBox to match the document height
    const corkboard = document.getElementById('corkboard');
    if (!corkboard) return;
    const rect = corkboard.getBoundingClientRect();
    svg.setAttribute('width', rect.width);
    svg.setAttribute('height', rect.height);
    svg.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
    
    // Find things to connect
    const points = Array.from(document.querySelectorAll('.connect-point')).filter(el => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    });
    
    // Shuffle and pick some pairs
    if (points.length < 2) return;
    
    const numConnections = Math.min(Math.floor(points.length / 2), 6);
    
    // Simple seeded random to keep lines consistent until refresh/resize
    for (let i = 0; i < numConnections; i++) {
      const idx1 = Math.floor(Math.random() * points.length);
      let idx2 = Math.floor(Math.random() * points.length);
      while (idx2 === idx1 && points.length > 1) {
         idx2 = Math.floor(Math.random() * points.length);
      }
      
      const p1 = points[idx1];
      const p2 = points[idx2];
      
      const r1 = p1.getBoundingClientRect();
      const r2 = p2.getBoundingClientRect();
      const cb = corkboard.getBoundingClientRect();
      
      // Calculate centers relative to corkboard
      const x1 = (r1.left + r1.width / 2) - cb.left;
      const y1 = (r1.top + r1.height / 2) - cb.top + window.scrollY;
      const x2 = (r2.left + r2.width / 2) - cb.left;
      const y2 = (r2.top + r2.height / 2) - cb.top + window.scrollY;
      
      // Draw bezier curve for "sagging" string
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.classList.add('red-string');
      
      // Control points for the curve to sag downwards
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2 + Math.abs(x1 - x2) * 0.1 + 20; // sag
      
      path.setAttribute('d', `M ${x1},${y1} Q ${midX},${midY} ${x2},${y2}`);
      svg.appendChild(path);
      
      // Add a small pin at the connection points
      createPin(x1, y1);
      createPin(x2, y2);
    }
    
    function createPin(x, y) {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', x);
      circle.setAttribute('cx', x);
      circle.setAttribute('cy', y);
      circle.setAttribute('r', '4');
      circle.setAttribute('fill', '#cc0000');
      circle.setAttribute('stroke', '#660000');
      circle.setAttribute('stroke-width', '1');
      svg.appendChild(circle);
    }
  }
});
