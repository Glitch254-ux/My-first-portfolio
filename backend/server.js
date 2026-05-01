const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// This line is CRITICAL: it lets the server read the form data
app.use(express.json()); 
app.use(express.static(path.join(__dirname, '../public')));

// 1. Serves your Frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// 2. Receives your Messages (Fixes the Error Popup)
app.post('/messages', (req, res) => {
    const filePath = path.join(__dirname, 'messages.json');
    const newMessage = req.body;

    fs.readFile(filePath, 'utf8', (err, data) => {
        const messages = err ? [] : JSON.parse(data || '[]');
        messages.push(newMessage);

        fs.writeFile(filePath, JSON.stringify(messages, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "Failed to save" });
            res.status(200).json({ success: true });
        });
    });
});

app.listen(PORT, () => {
    console.log(`ENGINE SECURED. Full-stack running on port ${PORT}`);
});