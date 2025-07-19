const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// In-memory storage for logged addresses
let addresses = [];

// Endpoint to log a new address
app.post('/log-address', (req, res) => {
    const { key } = req.body;
    if (key === '▀▀▀ ░▀░ ▀▀▀ ▀░░') {
        const address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        addresses.push(address);
        res.json({ message: 'Address logged successfully' });
    } else {
        res.status(401).json({ message: 'Invalid key' });
    }
});

// Endpoint to fetch logged addresses
app.get('/addresses', (req, res) => {
    const { key } = req.query;
    if (key === '▀▀▀ ░▀░ ▀▀▀ ▀░░') {
        res.json({ addresses: addresses });
    } else {
        res.status(401).json({ message: 'Invalid key' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
