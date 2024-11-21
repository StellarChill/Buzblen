const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors'); // เพิ่ม CORS
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// เพิ่ม CORS เพื่ออนุญาตให้ Frontend เชื่อมต่อได้
router.use(cors({
    origin: 'http://localhost:3000', // URL ของ Frontend
    credentials: true, // เปิดใช้งาน Cookies
}));

// Register Endpoint
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and Password are required' });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    try {
        const existingUser = await prisma.employeeDetails.findUnique({
            where: { Email: email },
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.employeeDetails.create({
            data: {
                Email: email,
                Password: hashedPassword,
            },
        });

        res.status(201).json({ message: 'Registration successful', user });
    } catch (error) {
        console.error('Registration error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Login Endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and Password are required' });
    }

    try {
        const user = await prisma.employeeDetails.findUnique({
            where: { Email: email },
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.EmployeeID, email: user.Email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
        });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Logout Endpoint
router.post('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
