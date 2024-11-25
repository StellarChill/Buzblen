const jwt = require('jsonwebtoken');

/**
 * Middleware สำหรับตรวจสอบการยืนยันตัวตนของผู้ใช้
 * - ใช้ JWT (JSON Web Token) เพื่อตรวจสอบสิทธิ์ของผู้ใช้
 */
function authenticateUser(req, res, next) {
  // ดึง Token จาก Header ของคำร้องขอ
  const token = req.headers.authorization?.split(' ')[1]; // ตัดคำว่า 'Bearer ' ออก เหลือเฉพาะ Token
  if (!token) {
    // ถ้าไม่มี Token ให้ตอบกลับไปว่าผู้ใช้ยังไม่ได้รับสิทธิ์ (Unauthorized)
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    // ตรวจสอบความถูกต้องของ Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ใช้รหัสลับ (JWT_SECRET) ในการตรวจสอบ
    req.user = decoded; // เก็บข้อมูลผู้ใช้ที่ได้จาก Token ใน req.user เพื่อใช้งานในขั้นถัดไป
    next(); // ดำเนินการต่อไปยัง Middleware หรือ Route Handler ถัดไป
  } catch (err) {
    console.error('Error verifying token:', err); // หากมีข้อผิดพลาดในการตรวจสอบ Token
    return res.status(403).json({ error: 'Forbidden: Invalid token' }); // ตอบกลับว่าการเข้าถึงถูกปฏิเสธ
  }
}

/**
 * Middleware สำหรับตรวจสอบว่าผู้ใช้เป็น Admin หรือไม่
 */
function verifyAdmin(req, res, next) {
  // ตรวจสอบว่า req.user มีข้อมูลและ Role ของผู้ใช้เป็น 'admin'
  if (req.user && req.user.role === 'admin') {
    next(); // ถ้าเป็น Admin ให้ดำเนินการต่อ
  } else {
    // ถ้าไม่ใช่ Admin ให้ตอบกลับว่าการเข้าถึงถูกปฏิเสธ (Forbidden)
    res.status(403).json({ error: 'Forbidden: Admin access only' });
  }
}

/**
 * Middleware สำหรับบันทึกการกระทำของผู้ใช้ (เหมาะสำหรับการ Debug)
 * - ใช้เพื่อดูข้อมูลการกระทำของผู้ใช้ เช่น เส้นทางที่ร้องขอ (Path) และ Role
 */
function logUserActions(req, res, next) {
  if (req.user) {
    // ถ้าผู้ใช้ยืนยันตัวตนแล้ว แสดง ID, Role, และ Path ที่ร้องขอ
    console.log(`[LOG] User ID: ${req.user.id}, Role: ${req.user.role}, Path: ${req.path}`);
  } else {
    // ถ้าผู้ใช้ยังไม่ได้ยืนยันตัวตน ให้แสดง Path ที่ร้องขอ
    console.log(`[LOG] Unauthenticated access attempt to ${req.path}`);
  }
  next(); // ดำเนินการต่อไปยัง Middleware หรือ Route Handler ถัดไป
}

module.exports = { authenticateUser, verifyAdmin, logUserActions };
