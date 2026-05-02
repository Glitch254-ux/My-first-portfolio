// 1. Mouse Glow Position Tracking
document.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--x', e.clientX + 'px');
    document.body.style.setProperty('--y', e.clientY + 'px');
});

// 2. Typing Animation
new Typed('#typing-passionate', {
    strings: ['passionate', 'dedicated', 'creative', 'innovative'],
    typeSpeed: 70,
    backSpeed: 50,
    backDelay: 2000,
    loop: true,
    cursorChar: '|'
});

// 3. Reveal Animations on Scroll
const sr = ScrollReveal({
    origin: 'bottom',
    distance: '80px',
    duration: 1500,
    delay: 200,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    reset: false
});

sr.reveal('.hero-content');
sr.reveal('.hero-visual', { origin: 'right', delay: 400 });
sr.reveal('.bio-content', { delay: 300 });
sr.reveal('.service-card', { interval: 200 });
sr.reveal('.contact-card', { distance: '40px' });