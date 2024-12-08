const express = require('express');
const router = express.Router();
const { generateToken, verifyToken } = require('../utils/jwt');

// Mock user data (replace with database queries)
const users = [
    { id: 1, email: 'testuser@gmail.com', password: 'password123' }
];

// Route for user login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Find user
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = generateToken({ id: user.id, email: user.email }, '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');
    res.json({ token });
});

// Route to verify token
router.get('/protected', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = verifyToken(token, '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');
        res.json({ message: 'Token is valid', decoded });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

module.exports = router;
