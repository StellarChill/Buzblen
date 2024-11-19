const express = require('express');
const router = express.Router();

let notifications = [];

// Get notifications
router.get('/', (req, res) => {
  res.json(notifications);
});

module.exports = router;
