const express = require('express');
const multer = require('multer');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const { checkBlacklist } = require('../middleware/authMiddleware');

const router = express.Router();
const prisma = new PrismaClient();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/postimages'); // Directory for images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Unique file name
  },
});

const upload = multer({ storage });

// Create a new post
router.post('/', upload.single('image'), checkBlacklist, async (req, res) => {
  const { postDescription } = req.body;
  const employeeId = req.user.id;

  if (!postDescription || !req.file) {
    return res.status(400).json({ error: 'Post description and image are required' });
  }

  try {
    const imageUrl = `/postimages/${req.file.filename}`;
    const newPost = await prisma.postDetails.create({
      data: {
        EmployeeID: employeeId,
        PostDescription: postDescription,
        PostStatus: 'active',
        ImageURL: imageUrl,
      },
    });

    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Error creating post' });
  }
});

module.exports = router;
