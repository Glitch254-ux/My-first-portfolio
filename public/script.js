const textElement = document.getElementById('typing-text');
const words = ["Web Developer", "UI/UX Designer", "Software Engineer"];
let wordIndex = 0, charIndex = 0, isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    textElement.textContent = isDeleting ? currentWord.substring(0, charIndex - 1) : currentWord.substring(0, charIndex + 1);
    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 100 : 200);
    }
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        try {
            const response = await fetch('/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert('Success!');
                contactForm.reset();
            } else { alert('Server error'); }
        } catch (error) { alert('Backend Connection Error'); }
    });
}
document.addEventListener('DOMContentLoaded', type);// 1. Mouse Spotlight Effect
const spotlight = document.createElement('div');
spotlight.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 9999;
    background: radial-gradient(circle 200px at 0% 0%, rgba(168, 85, 247, 0.08), transparent);
`;
document.body.appendChild(spotlight);

window.addEventListener('mousemove', (e) => {
    spotlight.style.background = `radial-gradient(circle 300px at ${e.clientX}px ${e.clientY}px, rgba(168, 85, 247, 0.12), transparent)`;
});

// 2. Scroll Reveal Observer
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));