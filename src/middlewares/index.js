const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function verifyToken(req, res, next) {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized - Missing or invalid token' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = decoded.user;
        next();
    } catch (error) {
        console.error('Error verifying token:', error.message);
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
}

module.exports = verifyToken;
