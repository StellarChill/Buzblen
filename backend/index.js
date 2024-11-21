const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./router/Authentication');
const postRouter = require('./router/post'); // Import router for posts
const commentRouter = require('./router/comment'); // Import router for comments

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from frontend
  credentials: true, // Allow credentials (cookies, etc.)
}));
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookies

// Routes
app.use('/auth', authRoutes); // Authentication routes
app.use('/api/posts', postRouter); // Post routes
app.use('/api/comments', commentRouter); // Comment routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
