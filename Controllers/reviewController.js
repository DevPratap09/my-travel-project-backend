// controllers/reviewController.js

const Review = require('../models/Review'); // Import the Review model

// Create a new review
const createReview = async (req, res) => {
  const { username, comment, rating } = req.body;
  try {
    const newReview = new Review({ username, comment, rating });
    await newReview.save();
    res.status(201).json(newReview); // Return the new review data
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find(); // Fetch all reviews from MongoDB
    res.json(reviews); // Return reviews as JSON
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a review by ID
const updateReview = async (req, res) => {
  const { id } = req.params;
  const { username, comment, rating } = req.body;
  try {
    const updatedReview = await Review.findByIdAndUpdate(id, { username, comment, rating }, { new: true });
    if (!updatedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(updatedReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a review by ID
const deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export the controller functions
module.exports = {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview
};
