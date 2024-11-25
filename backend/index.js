// นำเข้าฟังก์ชันและโมดูลที่จำเป็น
const express = require('express'); // ใช้สำหรับสร้างเว็บเซิร์ฟเวอร์
const cookieParser = require('cookie-parser'); // ใช้สำหรับจัดการ Cookie
const cors = require('cors'); // ใช้เพื่ออนุญาตให้เซิร์ฟเวอร์เชื่อมต่อกับโดเมนอื่น
const dotenv = require('dotenv'); // ใช้สำหรับโหลดค่าต่างๆ จากไฟล์ .env

// นำเข้าไฟล์ที่มีการจัดการ Routes (เส้นทาง API)
const authRoutes = require('./router/Authentication'); // เส้นทางเกี่ยวกับการล็อกอินและสมัครสมาชิก
const postRoutes = require('./router/post'); // เส้นทางเกี่ยวกับการจัดการโพสต์

dotenv.config(); // โหลดค่าต่างๆ จากไฟล์ .env เข้าสู่แอปพลิเคชัน
const app = express(); // สร้างแอปพลิเคชัน Express

/** -----------------------------------
 * Middleware
 * ----------------------------------- */

// เปิดใช้งาน CORS (Cross-Origin Resource Sharing)
// อนุญาตให้เว็บที่มาจาก 'http://localhost:5173' เชื่อมต่อกับ API นี้
app.use(cors({
  origin: 'http://localhost:5173', // อนุญาตเฉพาะโดเมนนี้
  credentials: true, // อนุญาตให้ส่งข้อมูล Cookie ไปด้วย
}));

app.use(express.json()); // ใช้สำหรับแปลงข้อมูล JSON ที่ส่งมาให้เป็น JavaScript Object
app.use(cookieParser()); // ใช้สำหรับแปลง Cookie ที่ส่งมาพร้อมกับคำร้องขอ

/** -----------------------------------
 * Routes (เส้นทาง API)
 * ----------------------------------- */

// เส้นทางสำหรับการจัดการผู้ใช้ เช่น การล็อกอินและสมัครสมาชิก
app.use('/auth', authRoutes);

// เส้นทางสำหรับการจัดการโพสต์ เช่น การสร้าง, อ่าน, แก้ไข, และลบโพสต์
app.use('/api/posts', postRoutes);

// เส้นทางสำหรับให้บริการไฟล์รูปภาพที่อัปโหลด
// ตัวอย่าง: รูปภาพในโฟลเดอร์ 'public/postimages' สามารถเข้าถึงได้ผ่าน '/postimages'
app.use('/postimages', express.static('public/postimages'));

/** -----------------------------------
 * Start Server
 * ----------------------------------- */

// กำหนดพอร์ตที่เซิร์ฟเวอร์จะรัน (ใช้ค่าจาก .env หรือค่าเริ่มต้น 5000)
const PORT = process.env.PORT || 5000;

// เริ่มต้นเซิร์ฟเวอร์
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`); // แสดงข้อความว่าเซิร์ฟเวอร์กำลังทำงาน
});
