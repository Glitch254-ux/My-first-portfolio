const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 1. Tell the server to look inside the 'public' folder
app.use(express.static(path.join(__dirname, '../public')));

// 2. Serve your index.html when someone visits the site
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// 3. Start the server
app.listen(PORT, () => {
    console.log(`ENGINE SECURED. Portfolio running on port ${PORT}`);
});