const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
// Strictly defining the public folder path
app.use(express.static(path.join(__dirname, '..', 'public')));

const msgPath = path.join(__dirname, 'messages.json');

// POST route for the contact form
app.post('/messages', (req, res) => {
    try {
        let msgs = [];
        if (fs.existsSync(msgPath)) {
            const fileData = fs.readFileSync(msgPath, 'utf8');
            msgs = JSON.parse(fileData || '[]');
        }
        msgs.push(req.body);
        fs.writeFileSync(msgPath, JSON.stringify(msgs, null, 2));
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Failed to save message" });
    }
});

// The "Catch-all" route to serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));