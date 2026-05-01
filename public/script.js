// --- 1. TYPEWRITER EFFECT ---
const textElement = document.getElementById('typewriter');
const phrases = ['UI Designer', 'Web Developer', 'IT Student', 'Problem Solver'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 60 : 150;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000; // Pause at the end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }
    setTimeout(type, typeSpeed);
}

// --- 2. CONTACT FORM LOGIC (WITH FEEDBACK) ---
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get the button and original text for feedback
        const submitBtn = contactForm.querySelector('button');
        const originalBtnText = submitBtn.textContent;
        
        // 1. Visual Feedback: Show user something is happening
        submitBtn.textContent = "Sending...";
        submitBtn.style.opacity = "0.7";
        submitBtn.disabled = true;

        // 2. Prepare Data
        const formData = {
            name: contactForm.querySelector('input[type="text"]').value,
            email: contactForm.querySelector('input[type="email"]').value,
            message: contactForm.querySelector('textarea').value
        };

        try {
            // 3. Send to Backend
            const response = await fetch('http://localhost:3000/send-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                // 4. Success Feedback
                alert("🚀 " + result.message);
                contactForm.reset();
            } else {
                alert("❌ Error: " + result.message);
            }
        } catch (error) {
            // 5. Error Feedback (if server is off)
            console.error("Connection Error:", error);
            alert("⚠️ Backend Error: Make sure you ran 'node server.js' in your terminal!");
        } finally {
            // 6. Reset Button
            submitBtn.textContent = originalBtnText;
            submitBtn.style.opacity = "1";
            submitBtn.disabled = false;
        }
    });
}

// Start Typewriter on load
document.addEventListener('DOMContentLoaded', type);