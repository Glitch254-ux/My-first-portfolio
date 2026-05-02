// Mouse Glow Implementation
document.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--x', e.clientX + 'px');
    document.body.style.setProperty('--y', e.clientY + 'px');
});

// Final Recommended Typing Strings
new Typed('#typing-passionate', {
    strings: [
        'Passionate Developer', 
        'Frontend Developer', 
        'Problem Solver', 
        'Tech Enthusiast'
    ],
    typeSpeed: 70,
    backSpeed: 50,
    backDelay: 2000,
    loop: true,
    cursorChar: '|'
});

// Form Auto-Reset Logic
window.addEventListener("pageshow", () => {
    const form = document.getElementById("contact-form");
    if (form) form.reset();
});

// Reveal Animations
const sr = ScrollReveal({
    origin: 'bottom',
    distance: '60px',
    duration: 1200,
    delay: 200,
    reset: false
});

sr.reveal('.hero-content');
sr.reveal('.hero-visual', { origin: 'right', delay: 400 });
sr.reveal('.service-card', { interval: 200 });
sr.reveal('.contact-card');