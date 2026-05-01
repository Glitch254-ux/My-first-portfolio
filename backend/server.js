const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;
const msgPath = path.join(__dirname, 'messages.json');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Initialize messages file if missing
if (!fs.existsSync(msgPath)) {
    fs.writeFileSync(msgPath, JSON.stringify([]));
}

app.post('/messages', (req, res) => {
    try {
        // This is what will show up in your Render Logs
        console.log("!!! NEW MESSAGE RECEIVED:", req.body);

        const data = fs.readFileSync(msgPath, 'utf8');
        const msgs = JSON.parse(data || '[]');
        
        msgs.push({
            ...req.body,
            date: new Date().toISOString()
        });

        fs.writeFileSync(msgPath, JSON.stringify(msgs, null, 2));
        res.status(200).json({ success: true });
    } catch (err) {
        console.error("Server Error:", err);
        res.status(500).json({ error: "Failed to save message" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});