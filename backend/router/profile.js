const express = require('express');
const router = express.Router();

let users = [
  { id: 1, username: 'testuser', email: 'testuser@example.com' }
];

// Get user by ID
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

module.exports = router;
