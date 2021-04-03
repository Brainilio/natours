/* eslint-disable no-restricted-syntax */
/* This is an optional handler to add your http controller methods in if there's
a lot of repetition */

const AppError = require('./appError');

// for fetching all
exports.getAll = (Model) => async (req, res, next) => {
  try {
    // BUILD QUERY
    // 1A) Filtering
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced filtering - change gte to $gte
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (word) => `$${word}`);

    let query = Model.find(JSON.parse(queryStr));

    // 2) Sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // 3) field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // 4) Pagination
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const num = await Model.countDocuments();
      if (skip >= num) throw new Error('This page does not exist');
    }

    // EXEC QUERY
    const doc = await query;

    // SEND RESP
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        doc,
      },
    });
  } catch (err) {
    return next(new AppError(err, 404));
  }
};

// for fetching one
exports.getOne = (Model, popOptions) => async (req, res, next) => {
  try {
    let query = await Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  } catch (err) {
    return next(new AppError('Nothing found with that ID', 404));
  }
};

// for deleting
exports.deleteOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
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

// for udpating
exports.updateOne = (Model) => async (req, res, next) => {
  try {
    if (req.body.startLocation) {
      const newStartLocation = {};
      // const arrayedBody = req.body.startLocation.split(',');
      newStartLocation.description = req.body.startLocation[0];
      newStartLocation.coordinates = req.body.startLocation[1].split(',');
      newStartLocation.address = req.body.startLocation[2];
      req.body.startLocation = newStartLocation;
    }

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  } catch (err) {
    return next(new AppError(err, 404));
  }
};

// for creating
exports.createOne = (Model) => async (req, res, next) => {
  try {
    if (req.body.startLocation) {
      const newStartLocation = {};
      // const arrayedBody = req.body.startLocation.split(',');
      newStartLocation.description = req.body.startLocation[0];
      newStartLocation.coordinates = req.body.startLocation[1].split(',');
      newStartLocation.address = req.body.startLocation[2];
      req.body.startLocation = newStartLocation;
    }

    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};
