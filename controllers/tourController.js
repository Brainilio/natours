const Tour = require('../models/tourModel');

// ----------- Middleware METHODS -------------- //
// Write any middleware functions in here

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

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
