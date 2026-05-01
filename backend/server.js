const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// This middleware is required to read the JSON data from your contact form
app.use(express.json()); 
app.use(express.static(path.join(__dirname, '../public')));

// 1. Serve your Frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// 2. GET messages (to view them)
app.get('/messages', (req, res) => {
    const filePath = path.join(__dirname, 'messages.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: "Could not read messages" });
        res.json(JSON.parse(data || '[]'));
    });
});

// 3. POST messages (THIS FIXES THE ERROR POPUP)
app.post('/messages', (req, res) => {
    const filePath = path.join(__dirname, 'messages.json');
    const newMessage = req.body;

    fs.readFile(filePath, 'utf8', (err, data) => {
        const messages = err ? [] : JSON.parse(data || '[]');
        messages.push(newMessage);

        fs.writeFile(filePath, JSON.stringify(messages, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "Failed to save message" });
            res.status(200).json({ success: true });
        });
    });
});

app.listen(PORT, () => {
    console.log(`ENGINE SECURED. Full-stack running on port ${PORT}`);
});