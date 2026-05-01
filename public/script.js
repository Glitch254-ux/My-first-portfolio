const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. Gather form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        date: new Date().toLocaleString()
    };

    // 2. Visual feedback: Change button text to "Sending..."
    const submitBtn = contactForm.querySelector('button');
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = 'Sending...';
    submitBtn.disabled = true;

    try {
        // 3. THE FIX: Using '/messages' (Relative Path)
        // This ensures it works on your computer AND on Render
        const response = await fetch('/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Message sent successfully! 🚀');
            contactForm.reset();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Server rejected the message');
        }
    } catch (error) {
        console.error('Submission Error:', error);
        // This is the popup you saw in image_3cbb63.png
        alert('Backend Error: Make sure your Render service is live and your server.js is running!');
    } finally {
        // 4. Reset button state
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
    }
});