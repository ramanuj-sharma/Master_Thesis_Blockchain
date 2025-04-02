// server/index.js

// Existing imports and setup
const express = require('express');
const bodyParser = require('body-parser');
const otpApi = require('./otpApi'); 

const app = express();
const PORT = 3000;

app.use(bodyParser.json()); // Middleware for parsing JSON requests
app.use('/api', otpApi); // Use the OTP API for endpoints prefixed with "/api"

// Default route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Enhanced Account API! Use /api/setup-otp to initiate TOTP setup.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});