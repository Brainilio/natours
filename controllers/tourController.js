const Tour = require('../models/tourModel');

// ----------- Middleware METHODS -------------- //

exports.checkBody = (req, res, next) => {
  if (!req.body.price || !req.body.name) {
    return res.status(400).json({
      status: 'fail',
      message: 'Post has no name or price!',
    });
  }
  next();
};

// ------------ HTTP METHODS --------------- //

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    // data: {
    //   tours,
    // },
  });
};

exports.getTour = (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const id = +req.params.id;
  // const tour = tours.find((el) => el.id === id);
  // res.status(200).json({
  //   status: 'success',
  //   tour: tour,
  // });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'updated tour',
    },
  });
};

exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    // data: {
    //   tour: newTour,
    // },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
