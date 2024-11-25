const express = require('express');
const multer = require('multer');
const { PrismaClient } = require('@prisma/client');
const { authenticateUser } = require('../middleware/authMiddleware');

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

/** -----------------------------------
 * Create a New Post
 * ----------------------------------- */
router.post('/', authenticateUser, upload.single('image'), async (req, res) => {
  const { postDescription } = req.body;
  const employeeId = req.user.id;

  if (!postDescription || !req.file) {
    return res.status(400).json({ error: 'Post description and image are required.' });
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
    res.status(500).json({ error: 'Failed to create post. Please try again later.' });
  }
});

/** -----------------------------------
 * Get All Posts
 * ----------------------------------- */
router.get('/', authenticateUser, async (req, res) => {
  try {
    const posts = await prisma.postDetails.findMany({
      where: { IsDeleted: false }, // Fetch only posts that are not deleted
      include: {
        Employee: { select: { Email: true } }, // Include owner email
        Comments: true, // Include comments
        Likes: true, // Include likes
      },
      orderBy: { DateCreated: 'desc' }, // Order by newest first
    });

    const formattedPosts = posts.map((post) => ({
      ...post,
      likeCount: post.Likes.length, // Add like count to each post
    }));

    res.status(200).json({ posts: formattedPosts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts. Please try again later.' });
  }
});

/** -----------------------------------
 * Like or Unlike a Post
 * ----------------------------------- */
router.post('/:id/like', authenticateUser, async (req, res) => {
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
      const likeCount = await prisma.likeDetails.count({ where: { PostID: postId } });
      return res.status(200).json({ message: 'Post unliked.', likeCount });
    }

    await prisma.likeDetails.create({
      data: {
        EmployeeID: employeeId,
        PostID: postId,
      },
    });

    const likeCount = await prisma.likeDetails.count({ where: { PostID: postId } });
    res.status(201).json({ message: 'Post liked.', likeCount });
  } catch (error) {
    console.error('Error liking/unliking post:', error);
    res.status(500).json({ error: 'Failed to like/unlike post. Please try again later.' });
  }
});

/** -----------------------------------
 * Add Comment to a Post
 * ----------------------------------- */
router.post('/:postId/comments', authenticateUser, async (req, res) => {
  const { postId } = req.params;
  const { commentText } = req.body;
  const employeeId = req.user.id;

  if (!commentText) {
    return res.status(400).json({ error: 'Comment text is required.' });
  }

  try {
    const postExists = await prisma.postDetails.findFirst({
      where: { PostID: postId, IsDeleted: false },
    });

    if (!postExists) {
      return res.status(404).json({ error: 'Post not found.' });
    }

    const newComment = await prisma.commentDetails.create({
      data: {
        EmployeeID: employeeId,
        PostID: postId,
        CommentText: commentText,
      },
    });

    res.status(201).json({ message: 'Comment added successfully.', comment: newComment });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Failed to add comment. Please try again later.' });
  }
});

/** -----------------------------------
 * Delete a Post (Owner or Admin Only)
 * ----------------------------------- */
router.delete('/:id', authenticateUser, async (req, res) => {
  const postId = req.params.id;
  const employeeId = req.user.id;
  const userRole = req.user.role;

  try {
    const post = await prisma.postDetails.findUnique({ where: { PostID: postId } });

    if (!post) {
      return res.status(404).json({ error: 'Post not found.' });
    }

    if (post.EmployeeID !== employeeId && userRole !== 'admin') {
      return res.status(403).json({ error: 'You do not have permission to delete this post.' });
    }

    await prisma.postDetails.update({
      where: { PostID: postId },
      data: { IsDeleted: true },
    });

    res.status(200).json({ message: 'Post deleted successfully.' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post. Please try again later.' });
  }
});

module.exports = router;
