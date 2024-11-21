const jwt = require('jsonwebtoken');

function checkBlacklist(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info to the request
    next(); // Continue to the next middleware or route handler
  } catch (err) {
    return res.status(403).json({ error: 'Forbidden: Invalid token' });
  }
}

module.exports = { checkBlacklist };
