// routes/review.js

const express = require('express');
const router = express.Router();
const Review = require('../models/Review'); // Import the Review model

// Create a new review
router.post('/', async (req, res) => {
  const { username, comment, rating } = req.body;
  try {
    const newReview = new Review({ username, comment, rating });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create review' });
  }
});

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Update a review by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { username, comment, rating } = req.body;
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { username, comment, rating },
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(updatedReview);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update review' });
  }
});

// Delete a review by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

module.exports = router;
