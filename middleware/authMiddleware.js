const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;  // Assuming you store your secret key in .env file

// Middleware to verify the JWT token in request headers
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify the token using the secret key
    req.user = decoded; // Store the decoded user info in the request object
    next(); // Continue to the next middleware/route handler
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
