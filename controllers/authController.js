const User = require('../models/userModel');
const AppError = require('../utils/appError');

exports.signUp = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    return next(new AppError(err, 404));
  }
};
