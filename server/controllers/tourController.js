const aws = require('aws-sdk');
const multer = require('multer');
const Tour = require('../models/tourModel');
const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');
const factoryHandler = require('../utils/factoryHandler');

const s3 = new aws.S3({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_KEY_ID,
  region: process.env.AWS_REGION,
});

// multer operations / lifecycle

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new AppError('This is not an image, please upload images only', 400),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// ----------- Middleware METHODS -------------- //

// Upload file first to multer storage & filter
exports.uploadPhotos = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 },
]);

exports.uploadCoverImageToS3 = async (req, res, next) => {
  try {
    if (!req.files.imageCover) return next();
    const keyForPhoto = req.params.id;

    s3.upload(
      {
        Body: req.files.imageCover[0].buffer,
        Bucket: 'natours-images',
        Key: `tour-${keyForPhoto}-${Date.now()}.jpeg`,
      },
      (error, data) => {
        if (error) {
          return new AppError(error, 500);
        }
        const imageLink = data.Location;
        req.body.imageCover = imageLink;

        return next();
      }
    );
  } catch (error) {
    return new AppError(error.message, 400);
  }
};

// Upload photo to S3 bucket and modify the request body to add the URL to imagefile
exports.uploadImagesToS3 = async (req, res, next) => {
  //No file uploaded? Skip this function completely.
  if (!req.files.images) return next();
  const keyForPhoto = req.params.id;

  // // Upload image to aws

  req.body.images = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < req.files.images.length; i++) {
    // params for AWS bucket
    const params = {
      Body: req.files.images[i].buffer,
      Bucket: 'natours-images',
      Key: `tour-${keyForPhoto}-${Date.now()}.jpeg`,
    };

    // // Upload image to aws
    const pr = s3.upload(params).promise();
    pr.then((d) => {
      req.body.images.push(d.Location);
      if (i === req.files.images.length - 1) {
        next();
      }
    });
  }
};

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
exports.deleteTour = async (req, res, next) => {
  try {
    const doc = await Tour.findByIdAndDelete(req.params.id);
    const reviewsToDelete = await Review.find({
      tour: req.params.id,
    }).deleteMany();

    if (!doc || !reviewsToDelete) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};

// '/tours-within/:distance/center/:latlng/unit/:unit'
exports.getToursWithin = async (req, res, next) => {
  try {
    const { distance, latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');

    const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

    if (!lat || !lng) next(new AppError('Please provide your location', 400));

    const tours = await Tour.find({
      startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
    });

    res.status(200).json({
      status: 'success',
      data: {
        data: tours,
      },
    });
  } catch (error) {
    return next(new AppError(400, error));
  }
};

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

exports.getDistances = async (req, res, next) => {
  try {
    const { latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');
    if (!lat || !lng) {
      next(new AppError('Please provide location', 400));
    }

    //CONVERTS TO MILES OR KM
    const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

    const distances = await Tour.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [+lng, +lat],
          },
          distanceField: 'distance',
          distanceMultiplier: multiplier,
        },
      },
      {
        $project: {
          distance: 1,
          name: 1,
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: distances,
    });
  } catch (error) {
    return next(new AppError(error, 400));
  }
};
