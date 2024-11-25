const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient(); // เชื่อมต่อกับฐานข้อมูล
const router = express.Router(); // สร้าง Router สำหรับจัดการ API

// เปิดใช้งาน CORS (Cross-Origin Resource Sharing)
router.use(cors({
  origin: 'http://localhost:5173', // อนุญาตให้ Frontend ที่อยู่ http://localhost:5173 เข้าถึง
  credentials: true, // ส่งคุกกี้และข้อมูลรับรองข้ามโดเมน
}));

/** -----------------------------------
 * API สำหรับลงทะเบียนผู้ใช้ใหม่ (Register API)
 * ----------------------------------- */
router.post('/register', async (req, res) => {
  const { email, password, role } = req.body; // รับข้อมูล email, password และ role จากผู้ใช้

  // ตรวจสอบว่าผู้ใช้กรอก email และ password มาหรือไม่
  if (!email || !password) {
    return res.status(400).json({ message: 'ต้องกรอกอีเมลและรหัสผ่าน' });
  }

  // ตรวจสอบความยาวของรหัสผ่าน
  if (password.length < 6) {
    return res.status(400).json({ message: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' });
  }

  try {
    // ตรวจสอบว่ามีอีเมลนี้ในระบบหรือยัง
    const existingUser = await prisma.employeeDetails.findUnique({
      where: { Email: email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'อีเมลนี้มีอยู่ในระบบแล้ว' });
    }

    // เข้ารหัสรหัสผ่านก่อนเก็บในฐานข้อมูล
    const hashedPassword = await bcrypt.hash(password, 10);

    // สร้างผู้ใช้ใหม่ในฐานข้อมูล
    await prisma.employeeDetails.create({
      data: { 
        Email: email, 
        Password: hashedPassword, 
        Role: role || 'employee', // ถ้าไม่ได้ระบุ Role จะตั้งค่าเริ่มต้นเป็น 'employee'
      },
    });

    res.status(201).json({ message: 'ลงทะเบียนสำเร็จ' });
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการลงทะเบียน:', error);
    res.status(500).json({ message: 'เกิดปัญหาบางอย่าง ลองใหม่อีกครั้ง' });
  }
});

/** -----------------------------------
 * API สำหรับเข้าสู่ระบบ (Login API)
 * ----------------------------------- */
router.post('/login', async (req, res) => {
  const { email, password } = req.body; // รับข้อมูล email และ password จากผู้ใช้

  // ตรวจสอบว่าผู้ใช้กรอก email และ password มาหรือไม่
  if (!email || !password) {
    return res.status(400).json({ message: 'ต้องกรอกอีเมลและรหัสผ่าน' });
  }

  try {
    // ค้นหาผู้ใช้ในฐานข้อมูลด้วย email
    const user = await prisma.employeeDetails.findUnique({
      where: { Email: email },
    });

    // ถ้าไม่พบผู้ใช้ ให้แจ้งว่าข้อมูลไม่ถูกต้อง
    if (!user) {
      return res.status(401).json({ message: 'ข้อมูลไม่ถูกต้อง' });
    }

    // ตรวจสอบว่ารหัสผ่านตรงกับข้อมูลในฐานข้อมูลหรือไม่
    const isPasswordMatch = await bcrypt.compare(password, user.Password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'ข้อมูลไม่ถูกต้อง' });
    }

    // สร้าง Token สำหรับการเข้าสู่ระบบ
    const token = jwt.sign({ id: user.EmployeeID, role: user.Role }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token มีอายุ 1 ชั่วโมง
    });

    // ส่ง Token กลับไปยังผู้ใช้ผ่านคุกกี้
    res.cookie('jwt', token, {
      httpOnly: true, // คุกกี้นี้จะไม่สามารถเข้าถึงผ่าน JavaScript ได้
      secure: process.env.NODE_ENV === 'production', // ใช้ HTTPS ในโหมด Production
      maxAge: 3600000, // อายุคุกกี้ 1 ชั่วโมง
    });

    res.status(200).json({ message: 'เข้าสู่ระบบสำเร็จ', token });
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการเข้าสู่ระบบ:', error);
    res.status(500).json({ message: 'เกิดปัญหาบางอย่าง ลองใหม่อีกครั้ง' });
  }
});

module.exports = router;