const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

let comments = [];

// Get comments by post
router.get('/:postId', (req, res) => {
    const postId = req.params.postId;
    const filteredComments = comments.filter(c => c.postId === postId);
    res.json(filteredComments);
});

// Add comment
router.post('/', (req, res) => {
    const { postId, employeeId, text } = req.body;
    const newComment = {
        commentId: uuidv4(),
        postId,
        employeeId,
        text,
        dateCommented: new Date()
    };
    comments.push(newComment);
    res.json({ message: 'Comment added successfully', comment: newComment });
});

module.exports = router;
