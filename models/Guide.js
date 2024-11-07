const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  expertise: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review', // Assuming you have a Review model to link user reviews to guides
    },
  ],
});

const Guide = mongoose.model('Guide', guideSchema);

module.exports = Guide;
