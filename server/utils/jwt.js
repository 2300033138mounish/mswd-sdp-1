const jwt = require('jsonwebtoken');

// Function to generate a token
const generateToken = (payload, secret, expiresIn = '1h') => {
    return jwt.sign(payload, secret, { expiresIn });
};

// Function to verify a token
const verifyToken = (token, secret) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

module.exports = { generateToken, verifyToken };
