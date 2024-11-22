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

// Like or Unlike a post
router.post('/:id/like', checkBlacklist, async (req, res) => {
  const postId = req.params.id;
  const employeeId = req.user.id;

  try {
    const existingLike = await prisma.likeDetails.findFirst({
      where: {
        EmployeeID: employeeId,
        PostID: postId,
      },
    });

    if (existingLike) {
      // If already liked, unlike the post
      await prisma.likeDetails.delete({
        where: {
          LikeID: existingLike.LikeID,
        },
      });
      return res.status(200).json({ message: 'Post unliked' });
    }

    // If not liked, create a like
    const newLike = await prisma.likeDetails.create({
      data: {
        EmployeeID: employeeId,
        PostID: postId,
      },
    });

    res.status(201).json({ message: 'Post liked', like: newLike });
  } catch (error) {
    console.error('Error liking/unliking post:', error);
    res.status(500).json({ error: 'Error processing like/unlike' });
  }
});

// Get likes for a post
router.get('/:id/likes', async (req, res) => {
  const postId = req.params.id;

  try {
    const likes = await prisma.likeDetails.findMany({
      where: {
        PostID: postId,
      },
    });

    res.status(200).json({ likes });
  } catch (error) {
    console.error('Error fetching likes:', error);
    res.status(500).json({ error: 'Error fetching likes' });
  }
});

module.exports = router;
