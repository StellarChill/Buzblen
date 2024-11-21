const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { checkBlacklist } = require('../middleware/authMiddleware');

const router = express.Router();
const prisma = new PrismaClient();

// API สำหรับสร้างคอมเมนต์
router.post('/', checkBlacklist, async (req, res) => {
    const { employeeId, postId, commentText } = req.body;

    if (!employeeId || !postId || !commentText) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newComment = await prisma.commentDetails.create({
            data: {
                EmployeeID: employeeId,
                PostID: postId,
                CommentText: commentText,
            },
        });

        res.status(201).json({
            message: 'Comment added successfully',
            comment: newComment,
        });
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Error creating comment' });
    }
});

module.exports = router;
