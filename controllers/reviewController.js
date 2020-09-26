const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');
const factoryHandler = require('../utils/factoryHandler');

// get all reviews
exports.getAllReviews = async (req, res, next) => {
  try {
    // filter == for accessed reviews through /tours/{id}/reviews, you wanna
    // get the tourid params and filter all reviews out just for that tour

    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };
    const reviews = await Review.find(filter);

    res.status(200).json({
      status: 'success',
      results: reviews.length,
      data: {
        reviews,
      },
    });
  } catch (error) {
    return next(new AppError(error, 404));
  }
};

//middleware for filling up tourid and userid in the reviews, because the factoryhandler is too generic
exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

// fetch one review
exports.getReview = factoryHandler.getOne(Review);

// create review
exports.createReview = factoryHandler.createOne(Review);

//delete review
exports.deleteReview = factoryHandler.deleteOne(Review);

// update review
exports.updateReview = factoryHandler.updateOne(Review);
