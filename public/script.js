// 1. Typing Effect for the word "passionate"
new Typed('#typing-passionate', {
    strings: ['passionate', 'dedicated', 'creative'],
    typeSpeed: 100,
    backSpeed: 50,
    loop: true,
    showCursor: false
});

// 2. Scroll Animations
const sr = ScrollReveal({
    origin: 'bottom',
    distance: '60px',
    duration: 1200,
    delay: 200,
    reset: false
});

sr.reveal('.reveal', { interval: 150 });
sr.reveal('.hero-content', { delay: 100 });
sr.reveal('.hero-visual', { delay: 400, origin: 'right' });