// THE AVANT-GARDE EDITORIAL JS

document.addEventListener('DOMContentLoaded', () => {
  console.log("THE EDITORIAL SPREAD IS ACTIVE.");
  console.log("DESIGN IS NOT A UTILITY.");

  // Add subtle parallax effect to the huge hero text
  const heroText = document.querySelector('.ed-huge-text');
  if (heroText) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      heroText.style.transform = `translateY(${scrollY * 0.2}px)`;
    });
  }
  
  // Highlight active nav item
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.ed-nav-item a');
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || linkPath + '/' === currentPath || (currentPath === '/' && linkPath === '/')) {
      link.style.color = 'var(--c-accent)';
      link.style.borderLeft = '2px solid var(--c-accent)';
      link.style.paddingLeft = '10px';
    }
  });

  // Stagger entrance of app blocks
  const apps = document.querySelectorAll('.ed-app-block');
  apps.forEach((app, i) => {
    app.style.opacity = '0';
    app.style.transform = 'translateY(20px)';
    app.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    setTimeout(() => {
      app.style.opacity = '1';
      app.style.transform = 'translateY(0)';
      
      // Reset transition for hover effect
      setTimeout(() => {
        app.style.transition = 'all 0.3s ease';
      }, 600);
    }, 200 + (i * 150));
  });
});