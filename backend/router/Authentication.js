const express = require('express');
const router = express.Router();

// Mock data
const users = [
  { id: 1, username: 'testuser', password: 'password123' }
];

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    res.json({ message: 'Login successful', token: 'mock-token' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Register
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const id = users.length + 1;
  users.push({ id, username, password });
  res.json({ message: 'Registration successful', userId: id });
});

module.exports = router;
