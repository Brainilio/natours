const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');
const factoryHandler = require('../utils/factoryHandler');

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

exports.createReview = async (req, res, next) => {
  try {
    // Allow nested routes
    if (!req.body.tour) req.body.tour = req.params.tourId;
    if (!req.body.user) req.body.user = req.user.id;

    const newReview = await Review.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        review: newReview,
      },
    });
  } catch (error) {
    return next(new AppError(error, 404));
  }
};

exports.deleteReview = factoryHandler.deleteOne(Review);
