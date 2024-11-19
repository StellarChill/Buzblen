const express = require('express');
const router = express.Router();

let likes = [];

// Like a post
router.post('/', (req, res) => {
  const { postId } = req.body;
  const id = likes.length + 1;
  likes.push({ id, postId });
  res.json({ message: 'Post liked successfully' });
});

module.exports = router;
