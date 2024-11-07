const express = require('express');
const { getGuides, getGuideById, createGuide, updateGuide, deleteGuide } = require('../controllers/guideController');
const router = express.Router();

// Route to get all guides
router.get('/', getGuides);

// Route to get a single guide by ID
router.get('/:id', getGuideById);

// Route to create a new guide
router.post('/', createGuide);

// Route to update an existing guide
router.put('/:id', updateGuide);

// Route to delete a guide
router.delete('/:id', deleteGuide);

module.exports = router;
