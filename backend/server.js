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

// Ensure messages.json exists
if (!fs.existsSync(msgPath)) {
    fs.writeFileSync(msgPath, JSON.stringify([]));
}

app.post('/messages', (req, res) => {
    try {
        // --- THIS LINE IS THE KEY ---
        // This will print the message content to your Render Logs immediately
        console.log("!!! NEW MESSAGE FROM WEBSITE:", req.body);

        const data = fs.readFileSync(msgPath, 'utf8');
        const msgs = JSON.parse(data || '[]');
        
        // Add timestamp so you know exactly when it arrived
        const newMessage = {
            ...req.body,
            receivedAt: new Date().toLocaleString()
        };
        
        msgs.push(newMessage);
        fs.writeFileSync(msgPath, JSON.stringify(msgs, null, 2));
        
        res.status(200).json({ success: true });
    } catch (err) {
        console.error("Error saving message:", err);
        res.status(500).json({ error: "Storage error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server live on port ${PORT}`);
});