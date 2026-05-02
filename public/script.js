// Typing Animation
new Typed('.typing-animate', {
    strings: ['UI/UX Designer', 'Frontend Dev', 'IT Student', 'Problem Solver'],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true
});

// Scroll Reveal
ScrollReveal().reveal('.reveal', {
    distance: '50px',
    duration: 1000,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    interval: 200
});

// Mouse Glow Effect
const glow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});