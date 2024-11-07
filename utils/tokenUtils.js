const jwt = require('jsonwebtoken');

// Assuming JWT_SECRET is set in your environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Function to generate a JWT token
const generateToken = (userId) => {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' }); // Adjust expiration time as needed
  return token;
};

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { generateToken, verifyToken };