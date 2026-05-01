const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

// Path to store messages
const msgPath = path.join(__dirname, 'messages.json');

app.use(cors());
app.use(express.json());
// Serves your frontend files from the public folder
app.use(express.static(path.join(__dirname, '../public')));

// Initialize messages file if it doesn't exist
if (!fs.existsSync(msgPath)) {
    fs.writeFileSync(msgPath, JSON.stringify([]));
}

app.post('/messages', (req, res) => {
    try {
        // THIS IS WHAT YOU WILL SEE IN THE RENDER LOGS
        console.log("================================");
        console.log("NEW MESSAGE RECEIVED!");
        console.log("From:", req.body.name);
        console.log("Email:", req.body.email);
        console.log("Message:", req.body.message);
        console.log("================================");

        const data = fs.readFileSync(msgPath, 'utf8');
        const msgs = JSON.parse(data || '[]');
        msgs.push({ ...req.body, date: new Date().toISOString() });
        fs.writeFileSync(msgPath, JSON.stringify(msgs, null, 2));
        
        res.status(200).json({ success: true });
    } catch (err) {
        console.error("Server Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running and listening on port ${PORT}`);
});