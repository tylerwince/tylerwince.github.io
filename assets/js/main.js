/** THE ANALOG HI-FI - Main JS */
document.addEventListener('DOMContentLoaded', () => {

  /* === VU Meter Jitter Effect === */
  const needles = document.querySelectorAll('.vu-needle');
  
  function jitterNeedles() {
    needles.forEach(needle => {
      // Base rotation from animation is -45 to +15
      // We add a tiny random jitter to make it feel more "analog"
      const jitter = (Math.random() - 0.5) * 5;
      needle.style.transform = `rotate(${jitter}deg)`;
    });
    
    // Schedule next jitter
    setTimeout(jitterNeedles, 50 + Math.random() * 150);
  }

  // We actually use CSS animation for the main movement, 
  // but we can use JS to make it more erratic on hover.
  document.querySelectorAll('.vu-meter').forEach(meter => {
    meter.addEventListener('mouseenter', () => {
      meter.querySelector('.vu-needle').style.animationDuration = '0.5s';
    });
    meter.addEventListener('mouseleave', () => {
      meter.querySelector('.vu-needle').style.animationDuration = '2s';
    });
  });

  /* === Tactile Button Sound / Feel === */
  // (In a real site we might add subtle click sounds, but here we'll just handle 
  // any visual state that needs JS)
  
  document.querySelectorAll('.push-button').forEach(button => {
    button.addEventListener('mousedown', () => {
      button.style.transform = 'translateY(4px)';
      button.style.boxShadow = 'none';
    });
    button.addEventListener('mouseup', () => {
      button.style.transform = '';
      button.style.boxShadow = '';
    });
  });

});
