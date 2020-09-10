const User = require('../models/userModel');
const AppError = require('../utils/appError');
// ------------ HTTP METHODS --------------- //

//Updating profile
exports.updateMe = async (req, res, next) => {
  try {
    // 1) Create error if user posts password data
    if (req.body.password || req.body.passwordConfirm) {
      return new AppError("You can't change your password here!", 400);
    }
    // 2) Update user doc
    const updatedFields = {
      // eslint-disable-next-line node/no-unsupported-features/es-syntax
      ...req.body,
    };

    const allowedFields = ['name', 'email'];

    //updated doc
    const newObject = {};

    Object.keys(updatedFields).forEach((el) => {
      if (allowedFields.includes(el)) newObject[el] = updatedFields[el];
    });

    const updatedUser = await User.findByIdAndUpdate(req.user.id, newObject, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        updatedUser,
      },
    });
  } catch (error) {
    return new AppError(error, 400);
  }
};

//putting an user inactive
exports.deleteMe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { active: false });
    res.status(204).json({
      status: 'success',
      message: 'User successfully deactivated',
    });
  } catch (error) {
    return new AppError("Couldn't delete user", 400);
  }
};

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
