const express = require('express');
const QRCode = require('qrcode');
const speakeasy = require('speakeasy');

const router = express.Router();
let userSecrets = {}; // Replace with persistent storage in production

// Route for setting up TOTP
router.post('/setup-otp', (req, res) => {
    const { userId } = req.body;

    // Validate userId
    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    // Generate a TOTP secret
    const secret = speakeasy.generateSecret({ length: 20 });
    userSecrets[userId] = secret.base32; // Store the secret in memory

    // Generate QR code
    const otpauth_url = secret.otpauth_url;
    QRCode.toDataURL(otpauth_url, (err, imageUrl) => {
        if (err) {
            return res.status(500).json({ error: "Failed to generate QR code." });
        }

        // Respond with QR code and secret
        return res.json({ qrCode: imageUrl, secret: secret.base32 });
    });
});

// Endpoint to verify the TOTP code
router.post('/verify-otp', (req, res) => {
    const userId = req.body.userId; 
    const token = req.body.token; 
    const secret = userSecrets[userId];

    if (!secret) {
        return res.status(400).json({ error: "No secret found for this user ID." });
    }

    if (speakeasy.totp.verify({ secret: secret, encoding: 'base32', token })) {
        res.send('OTP verified successfully!');
    } else {
        res.status(400).send('Invalid OTP.');
    }
});

// Exporting the router
module.exports = router;