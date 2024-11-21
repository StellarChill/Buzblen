const express = require('express');
const multer = require('multer');
const { PrismaClient } = require('@prisma/client');
const { checkBlacklist } = require('../middleware/authMiddleware');
const upload = multer();
const router = express.Router();
const prisma = new PrismaClient();

// POST endpoint to create a new post with text and image
router.post('/', upload.none(),checkBlacklist, async (req, res) => {
    const {  postDescription } = req.body;
    const employeeId = req.user.id;
    console.log(postDescription);
    
    // if (!postDescription) {
    //     return res.status(400).json({ error: 'Employee ID and Post Description are required' });
    // }

    try {
      
        const newPost = await prisma.postDetails.create({
            data: {
                EmployeeID: employeeId,
                PostDescription: postDescription,
                PostStatus: 'active',
                ImageURL:"test"
            },
        });

        res.status(201).json({
            message: 'Post created successfully',
            // post: newPost,
        });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Error creating post' });
    }
});


module.exports = router;
