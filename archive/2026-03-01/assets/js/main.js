// THE SWISS ARCHIVE JS

document.addEventListener('DOMContentLoaded', () => {
  console.log("SYSTEM BOOT: MÜLLER-BROCKMANN GRID ACTIVE.");
  console.log("DESIGN IS MATHEMATICS. FORM IS FUNCTION.");

  // Hover effect for writing rows
  const writingRows = document.querySelectorAll('.writing-row');
  writingRows.forEach((row) => {
    row.addEventListener('mouseenter', () => {
      const action = row.querySelector('.w-action');
      if (action) {
        action.innerHTML = 'READ_NOW &rarr;';
      }
    });
    row.addEventListener('mouseleave', () => {
      const action = row.querySelector('.w-action');
      if (action) {
        action.innerHTML = 'READ &rarr;';
      }
    });
  });

  // Stagger in the apps
  const apps = document.querySelectorAll('.app-block');
  apps.forEach((app, i) => {
    app.style.opacity = '0';
    app.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      app.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      app.style.opacity = '1';
      app.style.transform = 'translateY(0)';
      
      // Reset transition for hover effect
      setTimeout(() => {
        app.style.transition = 'transform 0.3s';
      }, 500);
    }, i * 150);
  });
});