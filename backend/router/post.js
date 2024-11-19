const express = require('express');
const router = express.Router();

let posts = [];

// Get all posts
router.get('/', (req, res) => {
  res.json(posts);
});

// Create post
router.post('/', (req, res) => {
  const { title, content } = req.body;
  const id = posts.length + 1;
  posts.push({ id, title, content });
  res.json({ message: 'Post created successfully' });
});

module.exports = router;
