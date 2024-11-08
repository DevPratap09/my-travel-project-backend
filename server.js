const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

const reviewRoutes = require('./routes/reviewsRoutes');
const userRoutes = require('./routes/userRoutes');
const guideRoutes = require('./routes/guideRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000; // Use environment variable for port

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);
app.use('/api/guides', guideRoutes);

// Protected routes (requires authentication)
app.use('/api/protected', authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({ message: 'Protected data accessed successfully', user });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
