// Typing Animation
new Typed('#typing', {
    strings: [
        'Developer', 
        'Frontend Developer', 
        'Problem Solver', 
        'Tech Enthusiast'
    ],
    typeSpeed: 100,   // Slower for professional mobile reading
    backSpeed: 50,    // Smooth erasing speed
    backDelay: 2000,  // Stays visible for 2 seconds
    loop: true
});

// Scroll Reveal Animations
ScrollReveal().reveal('.reveal', {
    distance: '60px',
    duration: 1200,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    interval: 200
});

// Interactive Mouse Glow
const glow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});