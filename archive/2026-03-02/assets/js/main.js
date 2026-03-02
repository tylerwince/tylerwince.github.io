// THE SUPERMARKET CIRCULAR JS

document.addEventListener('DOMContentLoaded', () => {
  console.log("★★★ ATTENTION SHOPPERS! SYSTEM BOOT: AUTOMATED REDESIGN PROTOCOL ACTIVE! ★★★");
  console.log("WE WILL NOT BE UNDERSOLD ON SYSTEMS & ENGINEERING!");

  // Hover effect for specials (writing rows)
  const specials = document.querySelectorAll('.special-item');
  specials.forEach((special) => {
    special.addEventListener('mouseenter', () => {
      const action = special.querySelector('.special-action');
      if (action) {
        action.innerHTML = 'CLIP AND SAVE! &rarr;';
      }
    });
    special.addEventListener('mouseleave', () => {
      const action = special.querySelector('.special-action');
      if (action) {
        action.innerHTML = 'CLIP THIS DEAL &rarr;';
      }
    });
  });

  // Chaotic stagger in the coupons
  const coupons = document.querySelectorAll('.app-coupon');
  coupons.forEach((coupon, i) => {
    coupon.style.opacity = '0';
    // Random rotation between -5deg and 5deg
    const randRot = Math.random() * 10 - 5;
    coupon.style.transform = `translateY(30px) rotate(${randRot}deg) scale(0.9)`;
    
    setTimeout(() => {
      coupon.style.transition = 'opacity 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      coupon.style.opacity = '1';
      // Settle at original designed rotations
      let finalRot = 0;
      if (coupon.style.transform.includes('rotate(1deg)')) finalRot = 1;
      if (coupon.style.transform.includes('rotate(-1deg)')) finalRot = -1;
      
      coupon.style.transform = `translateY(0) rotate(${finalRot}deg) scale(1)`;
      
      // Reset transition for hover effect
      setTimeout(() => {
        coupon.style.transition = 'transform 0.2s, background-color 0.2s';
      }, 500);
    }, i * 150 + 200);
  });
});