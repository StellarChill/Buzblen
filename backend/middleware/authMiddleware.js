const jwt = require('jsonwebtoken');
// const redis = require('redis');

// Create Redis client
// const redisClient = redis.createClient();

// redisClient.on('error', (err) => {
//     console.error('Redis error:', err);
// });

// Middleware เพื่อตรวจสอบว่า Token อยู่ใน Blacklist หรือไม่
const checkBlacklist = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token is missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded data to request
    next();
    // redisClient.get(token, (err, data) => {
    //     if (err) {
    //         console.error('Redis error:', err);
    //         return res.status(500).json({ error: 'Internal server error' });
    //     }

    //     if (data) {
    //         return res.status(401).json({ message: 'Unauthorized: Token is blacklisted' });
    //     }

    //     try {
    //         const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //         req.user = decoded; // Attach decoded data to request
    //         next();
    //     } catch (error) {
    //         return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    //     }
    //     const checkBlacklist = (req, res, next) => {
    //         const { employeeId } = req.body;
        
    //         // ตัวอย่างการตรวจสอบ: เช็คว่า user ถูกบล็อคหรือไม่
    //         if (!employeeId || employeeId === 'blacklisted') {
    //             return res.status(403).json({ error: 'You are not authorized to perform this action' });
    //         }
        
    //         next();
    //     };
        
    //     module.exports = { checkBlacklist };
        
    // });
};

module.exports = { checkBlacklist };
