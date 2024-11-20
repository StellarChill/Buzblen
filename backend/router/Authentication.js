const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

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
            { expiresIn: '1h' } // Token มีอายุ 1 ชั่วโมง
        );

        // เก็บ Token ลงใน HTTP-Only Cookie
        res.cookie('jwt', token, {
            httpOnly: true, // ป้องกันการเข้าถึงจาก JavaScript
            secure: process.env.NODE_ENV === 'production', // ใช้ secure เมื่อเป็น production
            maxAge: 3600000, // อายุของ Cookie (1 ชั่วโมง)
        });

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Logout Endpoint
router.post('/logout', (req, res) => {
    // ลบ Cookie โดยตั้ง maxAge เป็น 0
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
