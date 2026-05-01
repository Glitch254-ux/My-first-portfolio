const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// 1. MIDDLEWARE
// Allows the server to read the JSON data from your contact form
app.use(express.json()); 
// Points to your CSS/JS files in the public folder
app.use(express.static(path.join(__dirname, '../public')));

// 2. FILE PATH
// Targets messages.json inside the backend folder
const messagesFilePath = path.join(__dirname, 'messages.json');

// 3. ROUTES
// Serves your index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// GET Messages: Reads the inbox file
app.get('/messages', (req, res) => {
    if (!fs.existsSync(messagesFilePath)) return res.json([]);
    const data = fs.readFileSync(messagesFilePath, 'utf8');
    res.json(JSON.parse(data || '[]'));
});

// POST Messages: Handles the form and stops the error popup
app.post('/messages', (req, res) => {
    const newMessage = req.body;
    let messages = [];
    
    if (fs.existsSync(messagesFilePath)) {
        const data = fs.readFileSync(messagesFilePath, 'utf8');
        try {
            messages = JSON.parse(data || '[]');
        } catch (e) {
            messages = [];
        }
    }
    
    messages.push(newMessage);
    fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));
    res.status(200).json({ success: true });
});

app.listen(PORT, () => {
    console.log(`SERVER LIVE: Running on port ${PORT}`);
});