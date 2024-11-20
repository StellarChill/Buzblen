const jwt = require('jsonwebtoken');
const redis = require('redis');

// Create Redis client
const redisClient = redis.createClient();

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

// Middleware เพื่อตรวจสอบว่า Token อยู่ใน Blacklist หรือไม่
const checkBlacklist = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token is missing' });
    }

    redisClient.get(token, (err, data) => {
        if (err) {
            console.error('Redis error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (data) {
            return res.status(401).json({ message: 'Unauthorized: Token is blacklisted' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Attach decoded data to request
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
    });
};

module.exports = { checkBlacklist };
