const User = require('../models/userModel');
const AppError = require('../utils/appError');
// ------------ HTTP METHODS --------------- //

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    return next(new AppError(err, 404));
  }
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route is not yet defined',
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route is not yet defined',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route is not yet defined',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route is not yet defined',
  });
};
