const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client('http://822933026984-jh7prppr1vga336kngra591s8em32d6r.apps.googleusercontent.com');

router.post('/google', async (req, res) => {
    const { token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: 'http://822933026984-jh7prppr1vga336kngra591s8em32d6r.apps.googleusercontent.com',
        });
        const payload = ticket.getPayload();
        console.log('User Info:', payload);
        res.status(200).json({ message: 'Google login successful', user: payload });
    } catch (error) {
        res.status(401).json({ message: 'Invalid Google token' });
    }
});

module.exports = router;
