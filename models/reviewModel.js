// review model
// review-text, rating, createdat, ref to tour this review belonggs to
// and reference to the user this belongs to
const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  text: {
    type: String,
  },
  rating: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
  },
});

// doc middlewares
// populate the guides with the guides you find
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: '-__v -passwordChangedAt -role -email',
  });
  next();
});

// populate the guides with the guides you find
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'tour',
    select: 'id, name',
  });
  next();
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
