const Review = require('../models/reviewModel');
const Tour = require('../models/tourModel');
const AppError = require('../utils/appError');
// const AppError = require('../utils/appError');
const factoryHandler = require('../utils/factoryHandler');

//middleware for filling up tourid and userid in the reviews, because the factoryhandler is too generic
exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user;
  next();
};

// ----------------------------------------------

exports.getOwnReviews = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const reviews = await Review.find({ user: currentUser._id });
    const list = [...reviews];

    // eslint-disable-next-line no-plusplus
    list.map(async (i, d) => {
      const currentTour = await Tour.findById(i.tour);
      list[d].tour = currentTour;
    });

    res.status(200).json({
      status: 'success',
      data: {
        data: reviews,
      },
    });
  } catch (error) {
    return next(new AppError(error, 404));
  }
};
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
