// userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ... other functions

// User registration
router.post('/register', async (req, res) => {
  // ... (same as before)
  const user = new User({
    ...req.body // Spread the properties from req.body
  });
 // const user = new User({ ... });
  user.password = await bcrypt.hash(password, 10); // Hash the password
  await user.save();

  // Generate JWT
  const token = jwt.sign({ userId: user._id }, 'process.env.JWT_SECRET');
  res.json({ token });
});

// User login
router.post('/login', async (req, res) => {
  // ... (same as before)
  const user = await User.findOne({ email });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user._id }, 'process.env.JWT_SECRET');
  res.json({ token });
});

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, 'process.env.JWT_SECRET');
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Example usage of authMiddleware:
router.get('/protected-route', authMiddleware, async (req, res) => {
  // Access the user ID from the decoded token
  const userId = req.user;
  // ...
});