const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'mydatabase',
    user: process.env.DB_USER || 'myuser',
    password: process.env.DB_PASSWORD || 'mypassword',
    port: 5432,
});

client.connect()
    .then(() => console.log("เชื่อมต่อกับฐานข้อมูล PostgreSQL สำเร็จ"))
    .catch(err => console.error('เกิดข้อผิดพลาด:', err));

// GET users
app.get('/users', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM users;');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้');
    }
});

// POST new user
app.post('/users', async (req, res) => {
    const newUser = req.body;
    try {
        await client.query('INSERT INTO users (name, email) VALUES ($1, $2)',
            [newUser.name, newUser.email]);
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).send('เกิดข้อผิดพลาดในการเพิ่มผู้ใช้');
    }
});

app.listen(3000, () => {
    console.log('API รันที่ http://localhost:3000');
});