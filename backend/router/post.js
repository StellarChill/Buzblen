const express = require('express');
const multer = require('multer');
const { PrismaClient } = require('@prisma/client');
const { authenticateUser } = require('../middleware/authMiddleware');

const router = express.Router();
const prisma = new PrismaClient();

// ตั้งค่าการจัดการไฟล์รูปภาพที่จะอัปโหลดโดยใช้ Multer
const storage = multer.diskStorage({
  // กำหนดโฟลเดอร์ที่ใช้เก็บไฟล์รูปภาพ
  destination: (req, file, cb) => {
    cb(null, './public/postimages'); // ไฟล์จะถูกเก็บในโฟลเดอร์นี้
  },
  // ตั้งชื่อไฟล์รูปภาพที่อัปโหลดให้ไม่ซ้ำ โดยเพิ่มเวลาปัจจุบัน (Timestamp) หน้าชื่อไฟล์
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

/** -----------------------------------
 * API สำหรับสร้างโพสต์ใหม่
 * ----------------------------------- */
router.post('/', authenticateUser, upload.single('image'), async (req, res) => {
  const { postDescription } = req.body; // ข้อความคำบรรยายโพสต์จากผู้ใช้
  const employeeId = req.user.id; // ID ของผู้ใช้ที่ล็อกอินอยู่

  // ตรวจสอบว่ามีการส่งทั้งข้อความและรูปภาพมาหรือไม่
  if (!postDescription || !req.file) {
    return res.status(400).json({ error: 'กรุณาใส่คำบรรยายและรูปภาพก่อนโพสต์!' });
  }

  try {
    const imageUrl = `/postimages/${req.file.filename}`; // เก็บ URL รูปภาพที่อัปโหลด
    const newPost = await prisma.postDetails.create({
      data: {
        EmployeeID: employeeId, // ใครคือเจ้าของโพสต์
        PostDescription: postDescription, // ข้อความคำบรรยายโพสต์
        PostStatus: 'active', // กำหนดสถานะโพสต์ว่าใช้งานอยู่
        ImageURL: imageUrl, // ที่อยู่ของรูปภาพ
      },
    });

    res.status(201).json({ message: 'โพสต์สำเร็จ!', post: newPost });
  } catch (error) {
    console.error('เกิดปัญหาในการสร้างโพสต์:', error);
    res.status(500).json({ error: 'เกิดปัญหาในการสร้างโพสต์ ลองใหม่อีกครั้ง!' });
  }
});

/** -----------------------------------
 * API สำหรับดึงข้อมูลโพสต์ทั้งหมด
 * ----------------------------------- */
router.get('/', authenticateUser, async (req, res) => {
  try {
    // ค้นหาโพสต์ทั้งหมดที่ยังไม่ถูกลบในฐานข้อมูล
    const posts = await prisma.postDetails.findMany({
      where: { IsDeleted: false }, // เงื่อนไข: โพสต์ต้องไม่ถูกลบ
      include: {
        Employee: { select: { Email: true } }, // รวมข้อมูลของผู้สร้างโพสต์ เช่น อีเมล
        Comments: true, // รวมข้อมูลคอมเมนต์ทั้งหมดในโพสต์
        Likes: true, // รวมข้อมูลไลค์ทั้งหมดในโพสต์
      },
      orderBy: { DateCreated: 'desc' }, // เรียงโพสต์จากใหม่ไปเก่า
    });

    // เพิ่มจำนวนไลค์ในข้อมูลโพสต์ที่ดึงมา
    const formattedPosts = posts.map((post) => ({
      ...post,
      likeCount: post.Likes.length, // นับจำนวนไลค์ในแต่ละโพสต์
    }));

    res.status(200).json({ posts: formattedPosts }); // ส่งข้อมูลโพสต์กลับไป
  } catch (error) {
    console.error('เกิดปัญหาในการดึงข้อมูลโพสต์:', error);
    res.status(500).json({ error: 'เกิดปัญหาในการดึงโพสต์ ลองใหม่อีกครั้ง!' });
  }
});

/** -----------------------------------
 * API สำหรับดึงคอมเมนต์ของโพสต์
 * ----------------------------------- */
router.get('/:postId/comments', authenticateUser, async (req, res) => {
  const { postId } = req.params; // รหัสโพสต์ที่ต้องการดึงคอมเมนต์

  try {
    // ดึงคอมเมนต์ทั้งหมดของโพสต์ที่เลือก
    const comments = await prisma.commentDetails.findMany({
      where: { PostID: parseInt(postId), IsDeleted: false }, // เงื่อนไข: คอมเมนต์ต้องไม่ถูกลบ
      orderBy: { DateCreated: 'asc' }, // เรียงลำดับคอมเมนต์จากเก่าสุดไปใหม่สุด
      include: { Employee: { select: { Email: true } } }, // รวมข้อมูลผู้คอมเมนต์ เช่น อีเมล
    });

    res.status(200).json({ comments }); // ส่งคอมเมนต์กลับไป
  } catch (error) {
    console.error('เกิดปัญหาในการดึงคอมเมนต์:', error);
    res.status(500).json({ error: 'เกิดปัญหาในการดึงคอมเมนต์ ลองใหม่อีกครั้ง!' });
  }
});

/** -----------------------------------
 * API สำหรับกดไลค์หรือเลิกไลค์โพสต์
 * ----------------------------------- */
router.post('/:id/like', authenticateUser, async (req, res) => {
  const postId = parseInt(req.params.id); // รหัสโพสต์ที่ต้องการกดไลค์
  const employeeId = req.user.id; // รหัสผู้ใช้ที่กำลังกดไลค์

  try {
    // ตรวจสอบว่าผู้ใช้งานคนนี้เคยไลค์โพสต์นี้หรือยัง
    const existingLike = await prisma.likeDetails.findFirst({
      where: {
        EmployeeID: employeeId,
        PostID: postId,
      },
    });

    if (existingLike) {
      // ถ้าเคยไลค์แล้วให้ลบข้อมูลไลค์ (เลิกไลค์)
      await prisma.likeDetails.delete({
        where: { LikeID: existingLike.LikeID },
      });

      const likeCount = await prisma.likeDetails.count({ where: { PostID: postId } });
      return res.status(200).json({ message: 'เลิกไลค์โพสต์นี้แล้ว.', likeCount });
    }

    // ถ้ายังไม่เคยไลค์ ให้เพิ่มข้อมูลไลค์
    await prisma.likeDetails.create({
      data: {
        EmployeeID: employeeId,
        PostID: postId,
      },
    });

    const likeCount = await prisma.likeDetails.count({ where: { PostID: postId } });
    res.status(201).json({ message: 'ไลค์โพสต์นี้แล้ว!', likeCount });
  } catch (error) {
    console.error('เกิดปัญหาในการกดไลค์:', error);
    res.status(500).json({ error: 'เกิดปัญหาในการไลค์โพสต์ ลองใหม่อีกครั้ง!' });
  }
});

/** -----------------------------------
 * API สำหรับเพิ่มคอมเมนต์ในโพสต์
 * ----------------------------------- */
router.post('/:postId/comments', authenticateUser, async (req, res) => {
  const { postId } = req.params; // รหัสโพสต์ที่ต้องการคอมเมนต์
  const { commentText } = req.body; // ข้อความคอมเมนต์ที่ผู้ใช้ส่งมา
  const employeeId = req.user.id; // รหัสผู้ใช้ที่กำลังคอมเมนต์

  if (!commentText) {
    return res.status(400).json({ error: 'กรุณาเขียนข้อความก่อนคอมเมนต์!' });
  }

  try {
    // ตรวจสอบว่าโพสต์ที่กำลังคอมเมนต์อยู่มีอยู่จริงหรือไม่
    const postExists = await prisma.postDetails.findFirst({
      where: { PostID: parseInt(postId), IsDeleted: false },
    });

    if (!postExists) {
      return res.status(404).json({ error: 'ไม่พบโพสต์ที่คุณต้องการคอมเมนต์!' });
    }

    // เพิ่มข้อมูลคอมเมนต์ในฐานข้อมูล
    const newComment = await prisma.commentDetails.create({
      data: {
        EmployeeID: employeeId, // ใครคือผู้คอมเมนต์
        PostID: parseInt(postId), // โพสต์ไหนที่คอมเมนต์
        CommentText: commentText, // ข้อความคอมเมนต์
      },
    });

    res.status(201).json({ message: 'คอมเมนต์เพิ่มสำเร็จ!', comment: newComment });
  } catch (error) {
    console.error('เกิดปัญหาในการเพิ่มคอมเมนต์:', error);
    res.status(500).json({ error: 'เกิดปัญหาในการเพิ่มคอมเมนต์ ลองใหม่อีกครั้ง!' });
  }
});

/** -----------------------------------
 * API สำหรับลบโพสต์
 * ----------------------------------- */
router.delete('/:id', authenticateUser, async (req, res) => {
  const postId = req.params.id; // รหัสโพสต์ที่ต้องการลบ
  const employeeId = req.user.id; // รหัสผู้ที่ร้องขอให้ลบโพสต์
  const userRole = req.user.role; // บทบาทผู้ใช้งาน เช่น admin หรือเจ้าของโพสต์

  try {
    const post = await prisma.postDetails.findUnique({ where: { PostID: postId } });

    if (!post) {
      return res.status(404).json({ error: 'ไม่พบโพสต์นี้!' });
    }

    // ตรวจสอบว่าเป็นเจ้าของโพสต์หรือมีสิทธิ์ลบหรือไม่
    if (post.EmployeeID !== employeeId && userRole !== 'admin') {
      return res.status(403).json({ error: 'คุณไม่มีสิทธิ์ลบโพสต์นี้!' });
    }

    // อัปเดตสถานะโพสต์ให้เป็นลบ
    await prisma.postDetails.update({
      where: { PostID: postId },
      data: { IsDeleted: true },
    });

    res.status(200).json({ message: 'ลบโพสต์สำเร็จ!' });
  } catch (error) {
    console.error('เกิดปัญหาในการลบโพสต์:', error);
    res.status(500).json({ error: 'เกิดปัญหาในการลบโพสต์ ลองใหม่อีกครั้ง!' });
  }
});

module.exports = router;
