const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs'); // This allows us to save files
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'messages.json');

app.use(cors());
app.use(bodyParser.json());

// 1. BOOT UP: Load existing messages from the file so they aren't lost
let inbox = [];
if (fs.existsSync(DATA_FILE)) {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        inbox = JSON.parse(data);
    } catch (err) {
        console.error("Error reading saved messages:", err);
        inbox = [];
    }
}

// 2. LANDING PAGE
app.get('/', (req, res) => {
    res.send(`
        <body style="font-family: 'Segoe UI', sans-serif; background: #050505; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0;">
            <h1 style="background: linear-gradient(90deg, #9D50BB, #3B82F6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 3rem;">Meshack's Engine</h1>
            <p style="color: #94A3B8;">Status: Persistent Storage Active ✅</p>
            <a href="/messages" style="margin-top: 20px; color: white; text-decoration: none; background: #3B82F6; padding: 12px 24px; border-radius: 8px; font-weight: bold;">Check Inbox</a>
        </body>
    `);
});

// 3. RECEIVE & SAVE: This writes to your hard drive
app.post('/send-message', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ success: false });

    const newMessage = { 
        id: inbox.length + 1, 
        name, 
        email, 
        message, 
        date: new Date().toLocaleString() 
    };
    
    inbox.push(newMessage);

    // Save the entire list to the messages.json file
    fs.writeFileSync(DATA_FILE, JSON.stringify(inbox, null, 2));
    
    console.log(`Saved new message from: ${name}`);
    res.status(200).json({ success: true, message: "Message saved to disk!" });
});

// 4. THE DASHBOARD
app.get('/messages', (req, res) => {
    let rows = inbox.map(m => `
        <tr style="border-bottom: 1px solid #222;">
            <td style="padding: 15px;">${m.date}</td>
            <td style="padding: 15px; color: #9D50BB; font-weight: bold;">${m.name}</td>
            <td style="padding: 15px;">${m.email}</td>
            <td style="padding: 15px; color: #cbd5e1;">${m.message}</td>
        </tr>
    `).join('');

    res.send(`
        <body style="background: #050505; color: white; font-family: sans-serif; padding: 40px;">
            <h2 style="border-left: 5px solid #9D50BB; padding-left: 15px;">Portfolio Inbox (${inbox.length})</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px; background: #0F1115; border-radius: 12px; overflow: hidden;">
                <thead style="background: #1a1d23; text-align: left;">
                    <tr>
                        <th style="padding: 15px;">Date</th>
                        <th style="padding: 15px;">Name</th>
                        <th style="padding: 15px;">Email</th>
                        <th style="padding: 15px;">Message</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows || '<tr><td colspan="4" style="padding: 20px; text-align: center; color: #475569;">No messages saved yet.</td></tr>'}
                </tbody>
            </table>
            <br>
            <a href="/" style="color: #94A3B8; text-decoration: none;">&larr; Back to Engine</a>
        </body>
    `);
});

app.listen(PORT, () => {
    console.log(`
    ✅ ENGINE SECURED
    -------------------------------------------
    Storage File: ${DATA_FILE}
    URL: http://localhost:3000
    -------------------------------------------
    `);
});