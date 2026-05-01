const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware - This connects your CSS and JS to the server
app.use(express.json()); 
app.use(express.static(path.join(__dirname, '../public')));

const messagesFilePath = path.join(__dirname, 'messages.json');

// Routes - Ensures your portfolio loads at the main URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// GET Messages - For checking feedback
app.get('/messages', (req, res) => {
    if (!fs.existsSync(messagesFilePath)) return res.json([]);
    try {
        const data = fs.readFileSync(messagesFilePath, 'utf8');
        res.json(JSON.parse(data || '[]'));
    } catch (e) {
        res.json([]);
    }
});

// POST Messages - The fix for the submission error
app.post('/messages', (req, res) => {
    const newMessage = req.body;
    let messages = [];
    
    if (fs.existsSync(messagesFilePath)) {
        try {
            const data = fs.readFileSync(messagesFilePath, 'utf8');
            messages = JSON.parse(data || '[]');
        } catch (e) {
            messages = [];
        }
    }
    
    messages.push(newMessage);
    fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));
    res.status(200).json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));