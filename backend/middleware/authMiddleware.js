const jwt = require('jsonwebtoken');

// Middleware to check if the token is provided and valid
function checkBlacklist(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // ดึง Token จาก Header
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ตรวจสอบความถูกต้องของ Token
    req.user = decoded; // เพิ่มข้อมูลผู้ใช้ที่ถูกถอดรหัสลงใน req.user
    next(); // ดำเนินการต่อไปยัง Middleware หรือ Route Handler ถัดไป
  } catch (err) {
    console.error('Error verifying token:', err);
    return res.status(403).json({ error: 'Forbidden: Invalid token' });
  }
}

// Middleware to verify if the user is an admin
function verifyAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next(); // ดำเนินการต่อถ้าผู้ใช้เป็น Admin
  } else {
    res.status(403).json({ error: 'Forbidden: Admin access only' });
  }
}

// Middleware to log the user's actions (Optional)
function logUserActions(req, res, next) {
  if (req.user) {
    console.log(`[LOG] User ID: ${req.user.id}, Role: ${req.user.role}, Path: ${req.path}`);
  } else {
    console.log(`[LOG] Unauthenticated access attempt to ${req.path}`);
  }
  next();
}

module.exports = { checkBlacklist, verifyAdmin, logUserActions };
