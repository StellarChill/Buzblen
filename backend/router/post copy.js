const express = require('express');
const multer = require('multer');
const { PrismaClient } = require('@prisma/client');
const { checkBlacklist } = require('../middleware/authMiddleware');

const router = express.Router();
const prisma = new PrismaClient();

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the folder to store images
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Rename the file
    },
});
const upload = multer({ storage });

// POST endpoint to create a new post with text and image
router.post('/', checkBlacklist, upload.single('image'), async (req, res) => {
    const { employeeId, postDescription } = req.body;

    if (!employeeId || !postDescription) {
        return res.status(400).json({ error: 'Employee ID and Post Description are required' });
    }

    try {
        const imageURL = req.file ? `/uploads/${req.file.filename}` : '';

        const newPost = await prisma.postDetails.create({
            data: {
                EmployeeID: employeeId,
                PostDescription: postDescription,
                ImageURL: imageURL,
                PostStatus: 'active',
            },
        });

        res.status(201).json({
            message: 'Post created successfully',
            post: newPost,
        });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Error creating post' });
    }
});


module.exports = router;
