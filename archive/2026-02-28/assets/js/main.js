// The Arcana Spread JS

document.addEventListener('DOMContentLoaded', () => {
  console.log("✧ The stars align. The spread is dealt. ✧");

  // Add subtle float animations to minor arcana items
  const minorItems = document.querySelectorAll('.minor-arcana-item');
  minorItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.animate([
      { opacity: 0, transform: 'translateX(-20px)' },
      { opacity: 1, transform: 'translateX(0)' }
    ], {
      duration: 600,
      delay: index * 100,
      fill: 'forwards',
      easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    });
  });
  
  // Card deal animation for Major Arcana
  const cards = document.querySelectorAll('.arcana-card');
  cards.forEach((card, index) => {
    card.animate([
      { opacity: 0, transform: 'translateY(50px) rotate(-5deg)' },
      { opacity: 1, transform: 'translateY(0) rotate(0)' }
    ], {
      duration: 800,
      delay: 200 + (index * 200),
      fill: 'forwards',
      easing: 'ease-out'
    });
  });

});
