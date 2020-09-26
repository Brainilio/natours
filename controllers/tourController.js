const Tour = require('../models/tourModel');
const AppError = require('../utils/appError');
const factoryHandler = require('../utils/factoryHandler');

// ----------- Middleware METHODS -------------- //

// Write any middleware functions in here
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

// to inject tourid into params for nested get
exports.setTourId = (req, res, next) => {
  if (req.params.tourId) req.query.tour = req.params.tourId;
  next();
};

// ------------ HTTP METHODS --------------- //

// get all tours
exports.getAllTours = factoryHandler.getAll(Tour);

// get tour
exports.getTour = factoryHandler.getOne(Tour, 'reviews');

// update tour
exports.updateTour = factoryHandler.updateOne(Tour);

// create tour
exports.createTour = factoryHandler.createOne(Tour);

// delete will be handled by a factory handler in utils/factoryhandler
exports.deleteTour = factoryHandler.deleteOne(Tour);

// ----------- AGGREGATION PIPELINE METHODS ------------ //

exports.getTourStats = async (req, res, next) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: {
          avgPrice: 1,
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      results: stats.length,
      data: stats,
    });
  } catch (err) {
    return next(new AppError(err, 40));
  }
};

exports.getMonthlyPlan = async (req, res, next) => {
  try {
    const year = +req.params.year; // 2021
    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: { numTourStarts: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    res.status(200).json({
      message: 'success',
      data: plan,
    });
  } catch (err) {
    return next(new AppError(err, 40));
  }
};
