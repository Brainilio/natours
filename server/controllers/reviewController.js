const Review = require('../models/reviewModel');
// const AppError = require('../utils/appError');
const factoryHandler = require('../utils/factoryHandler');

//middleware for filling up tourid and userid in the reviews, because the factoryhandler is too generic
exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

// ----------------------------------------------

// get all reviews
exports.getAllReviews = factoryHandler.getAll(Review);

// fetch one review
exports.getReview = factoryHandler.getOne(Review);

// create review
exports.createReview = factoryHandler.createOne(Review);

//delete review
exports.deleteReview = factoryHandler.deleteOne(Review);

// update review
exports.updateReview = factoryHandler.updateOne(Review);
