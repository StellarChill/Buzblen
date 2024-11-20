const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

let posts = [];

// Get all posts
router.get('/', (req, res) => {
    res.json(posts);
});

// Create post
router.post('/', (req, res) => {
    const { employeeId, description, imageUrl } = req.body;
    const newPost = {
        postId: uuidv4(),
        employeeId,
        description,
        imageUrl,
        dateCreated: new Date(),
        postStatus: 'active'
    };
    posts.push(newPost);
    res.json({ message: 'Post created successfully', post: newPost });
});

module.exports = router;
