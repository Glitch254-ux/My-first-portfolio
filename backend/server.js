const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

const msgPath = path.join(__dirname, 'messages.json');

app.post('/messages', (req, res) => {
    let msgs = fs.existsSync(msgPath) ? JSON.parse(fs.readFileSync(msgPath)) : [];
    msgs.push(req.body);
    fs.writeFileSync(msgPath, JSON.stringify(msgs, null, 2));
    res.status(200).json({ success: true });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => console.log(`Server on ${PORT}`));