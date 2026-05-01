const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and serving your frontend files
app.use(express.json()); 
app.use(express.static(path.join(__dirname, '../public')));

// 1. Root Route - Serves your Portfolio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// 2. GET Messages - Reads from the file in the SAME folder
app.get('/messages', (req, res) => {
    const filePath = path.join(__dirname, 'messages.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: "Could not read messages" });
        res.json(JSON.parse(data || '[]'));
    });
});

// 3. POST Message - Saves new form submissions
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
    console.log(`Portfolio Engine Online at Port ${PORT}`);
});