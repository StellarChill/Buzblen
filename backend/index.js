const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Middleware
app.use(bodyParser.json());

// Import Routers
const authenticationRouter = require("./router/Authentication");
const feedbackRouter = require("./router/FeedbackRouter");
const commentRouter = require("./router/comment");
const postRouter = require("./router/post");
const likeRouter = require("./router/like");
const notificationRouter = require("./router/Notification");
const searchRouter = require("./router/Search");
const userRouter = require("./router/user");

// Use Routers
app.use("/api/auth", authenticationRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/comment", commentRouter);
app.use("/api/posts", postRouter);
app.use("/api/likes", likeRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/search", searchRouter);
app.use("/api/users", userRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
