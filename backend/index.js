const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { checkBlacklist } = require('./middleware/authMiddleware');

const authRoutes = require('./router/Authentication'); // Correct Authentication path
const postRouter = require('./router/post'); // Correct post router path
const commentRouter = require('./router/comment'); // Correct comment router path

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Frontend origin
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/auth', authRoutes); // Authentication routes
app.use('/api/posts', postRouter); // Post routes
app.use('/api/comments', commentRouter); // Comment routes
app.use('/postimages', express.static('public/postimages')); // Serve uploaded images

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
