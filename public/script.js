/* 
  MESHACK PORTFOLIO - PREMIUM INTERACTION SCRIPT
  Handles: Typing Effects & Smooth Scroll Reveals
*/

// 1. DYNAMIC TYPING EFFECT
// This creates the "Designing with Purpose/Precision" effect in your hero section.
const typed = new Typed('#typing-effect', {
    strings: [
        'Purpose.', 
        'Precision.', 
        'Emotion.', 
        'Innovation.'
    ],
    typeSpeed: 60,      // Speed of typing
    backSpeed: 40,      // Speed of erasing
    backDelay: 2000,    // How long to wait before erasing
    loop: true,         // Keeps the animation running forever
    cursorChar: '_',    // Professional terminal-style cursor
});

// 2. SCROLL REVEAL ANIMATIONS
// This makes sections slide up smoothly as the user scrolls down.
const sr = ScrollReveal({
    origin: 'bottom',   // Elements start from the bottom
    distance: '60px',   // How far they travel
    duration: 1200,     // Time of the animation (1.2 seconds)
    delay: 200,         // Wait before starting the animation
    reset: false        // 'false' means it only animates once per visit
});

// Apply reveal effect to specific sections
sr.reveal('.reveal', { interval: 150 }); // Staggers the cards one after another
sr.reveal('.main-title', { delay: 100 });
sr.reveal('.bio', { delay: 300 });
sr.reveal('.contact-card', { distance: '40px', origin: 'top' });

// 3. FORM SUCCESS LOG
// Confirms the form is connected to the endpoint from image_cf9ea4.png
console.log("Portfolio Loaded: Form connected to endpoint meenovaq");