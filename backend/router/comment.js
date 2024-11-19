const express = require('express');
const router = express.Router();

let comments = [];

// Get comments
router.get('/', (req, res) => {
  res.json(comments);
});

// Add comment
router.post('/', (req, res) => {
  const { postId, text } = req.body;
  const id = comments.length + 1;
  comments.push({ id, postId, text });
  res.json({ message: 'Comment added successfully' });
});

module.exports = router;
