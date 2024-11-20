const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const authRoutes = require('./router/Authentication');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cookieParser()); // ใช้ cookie-parser เพื่ออ่าน Cookies

// Routes
app.use('/auth', authRoutes);

// เริ่มต้นเซิร์ฟเวอร์
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
