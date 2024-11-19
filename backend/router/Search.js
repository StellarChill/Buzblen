const express = require('express');
const router = express.Router();

// Mock search functionality
router.get('/', (req, res) => {
  const { query } = req.query;
  const results = [
    { id: 1, title: `Result for ${query}` }
  ];
  res.json(results);
});

module.exports = router;
