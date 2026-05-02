// Typing effect
new Typed('.typing-animate', {
    strings: ['UI/UX Designer', 'IT Student', 'Frontend Dev'],
    typeSpeed: 60,
    backSpeed: 40,
    loop: true
});

// Scroll animations
ScrollReveal().reveal('.reveal', {
    distance: '60px',
    duration: 1200,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    interval: 200
});

// Mouse glow effect
const glow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});