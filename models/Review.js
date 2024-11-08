const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model

// User registration
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body; // Extract fields from the request body

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user
    const user = new User({
      email,
      name,
      password: await bcrypt.hash(password, 10), // Hash the password
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET); // Use environment variable for JWT secret
    res.json({ token });

  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body; // Extract fields from the request body

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET); // Use environment variable for JWT secret
    res.json({ token });

  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use environment variable for JWT secret
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Example protected route
router.get('/protected-route', authMiddleware, async (req, res) => {
  const userId = req.user; // Access the user ID from the decoded token
  res.status(200).json({ message: 'Protected data accessed successfully', userId });
});

module.exports = router;
