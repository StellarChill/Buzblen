const jwt = require('jsonwebtoken');

// Middleware to authenticate user using JWT
function authenticateUser(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from header
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = decoded; // Add user info (decoded JWT payload) to request object
    next(); // Proceed to next middleware or route handler
  } catch (err) {
    console.error('Error verifying token:', err);
    return res.status(403).json({ error: 'Forbidden: Invalid token' });
  }
}

// Middleware to verify admin access
function verifyAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next(); // User is an admin, proceed to next handler
  } else {
    res.status(403).json({ error: 'Forbidden: Admin access only' });
  }
}

// Middleware to log user actions (Optional for debugging)
function logUserActions(req, res, next) {
  if (req.user) {
    console.log(`[LOG] User ID: ${req.user.id}, Role: ${req.user.role}, Path: ${req.path}`);
  } else {
    console.log(`[LOG] Unauthenticated access attempt to ${req.path}`);
  }
  next();
}

module.exports = { authenticateUser, verifyAdmin, logUserActions };
