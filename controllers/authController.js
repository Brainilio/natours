const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signUp = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    return next(new AppError(err, 404));
  }
};

exports.logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return next(new AppError('Please provide email and password!', 400));
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email: email }).select('+password');
    if (!user || !(await user.validatePassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    // 3) if everything is okay, send token to client
    const token = signToken(user._id);
    res.status(200).json({
      status: 'success',
      token,
    });
  } catch (err) {
    return next(new AppError(err, 404));
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    // 1) Get token and check if it's there
    if (req.headers.authorization) {
      token = req.headers.authorization;
    }
    console.log(token);
    // 2) validate token
    // 3) Check if user still exists
    // 4) Check if user changed password after the token was issued
    next();
  } catch (err) {
    return next(new AppError('Unauthorized access!', 400));
  }
};
