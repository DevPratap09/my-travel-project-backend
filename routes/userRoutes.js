const express = require('express');
const { registerUser, loginUser, getUserDetails } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Ensure this exists and is set up properly

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to login a user
router.post('/login', loginUser);

// Route to get user details (protected route)
router.get('/me', authMiddleware, getUserDetails);

module.exports = router;
