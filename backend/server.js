const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// --- THE ABSOLUTE PATH LOGIC ---
// path.resolve ensures Render knows exactly where the public folder is
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

// Ensure messages.json exists so the server doesn't crash on startup
const msgPath = path.resolve(__dirname, 'messages.json');
if (!fs.existsSync(msgPath)) {
    fs.writeFileSync(msgPath, JSON.stringify([], null, 2));
}

app.post('/messages', (req, res) => {
    try {
        const data = fs.readFileSync(msgPath, 'utf8');
        const msgs = JSON.parse(data || '[]');
        msgs.push(req.body);
        fs.writeFileSync(msgPath, JSON.stringify(msgs, null, 2));
        res.status(200).json({ success: true });
    } catch (err) {
        console.error("Storage error:", err);
        res.status(500).json({ error: "Storage error" });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, () => console.log(`Server live on ${PORT}`));