// --- 1. TYPING EFFECT ---
// Targets the <span id="typing-text"> in your index.html
const textElement = document.getElementById('typing-text');
const words = ["Web Developer", "UI/UX Designer", "Software Engineer", "Problem Solver"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        textElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 2000); // Pause at the end of the word
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 100 : 200);
    }
}

// --- 2. CONTACT FORM SYNC ---
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value,
            date: new Date().toLocaleString()
        };

        const submitBtn = contactForm.querySelector('button');
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;

        try {
            // Using relative path '/messages' ensures it works on Render
            const response = await fetch('/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Message sent successfully! 🚀');
                contactForm.reset();
            } else {
                throw new Error('Server error');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Backend Error: Check your Render dashboard logs!');
        } finally {
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', type);