const express = require('express');
const multer = require('multer');
const { PrismaClient } = require('@prisma/client');
const { checkBlacklist } = require('../middleware/authMiddleware');

const router = express.Router();
const prisma = new PrismaClient();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/postimages');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
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
      await prisma.likeDetails.delete({
        where: { LikeID: existingLike.LikeID },
      });
      return res.status(200).json({ message: 'Post unliked' });
    }

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

// Add Comment to a Post
router.post('/:postId/comments', checkBlacklist, async (req, res) => {
  const { postId } = req.params;
  const { commentText } = req.body;
  const employeeId = req.user.id;

  if (!commentText) {
    return res.status(400).json({ error: 'Comment text is required' });
  }

  try {
    const postExists = await prisma.postDetails.findFirst({
      where: { PostID: postId, IsDeleted: false },
    });

    if (!postExists) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const newComment = await prisma.commentDetails.create({
      data: {
        EmployeeID: employeeId,
        PostID: postId,
        CommentText: commentText,
      },
      include: {
        Employee: { select: { Email: true } },
      },
    });

    res.status(201).json({ message: 'Comment added successfully', comment: newComment });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Error adding comment' });
  }
});

// Get All Comments for a Post
router.get('/:postId/comments', async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await prisma.commentDetails.findMany({
      where: { PostID: postId },
      include: {
        Employee: { select: { Email: true } },
      },
    });

    res.status(200).json({ comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Error fetching comments' });
  }
});

module.exports = router;
