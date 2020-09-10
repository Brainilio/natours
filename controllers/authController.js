const { promisify } = require('util');
const jwt = require('jsonwebtoken');
// const crypto = require('crypto');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

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
      passwordChangedAt: req.body.passwordChangedAt,
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

    if (!token) {
      return next(new AppError('You are not logged in. Please log in!'));
    }

    // 2) validate token
    const decodedData = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );

    // 3) Check if user still exists
    const freshUser = await User.findById(decodedData.id);
    if (!freshUser) {
      return next(new AppError("User doesn't exist!", 401));
    }

    // 4) Check if user changed password after the token was issued
    if (freshUser.changedPasswordAfter(decodedData.iat)) {
      return next(
        new AppError('User recently changed password, please log in again!')
      );
    }

    // Grant access to protected route!
    req.user = freshUser;
    next();
  } catch (err) {
    return next(new AppError('Unauthorized access!', 401));
  }
};

//restricts route if role is not the same role as parameter
exports.restrictTo = (role) => {
  return (req, res, next) => {
    if (role !== req.user.role) {
      return next(new AppError('You do not have permission!', 403));
    }
    next();
  };
};

exports.forgotPassword = async (req, res, next) => {
  try {
    // 1) Get user based on posted email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(
        new AppError('There is no user with that email address.', 404)
      );
    }
    // 2) Generate random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // 3) Send it to user's email
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a patch request with your new password and passwordConfirm to ${resetURL}.\nWasn't you? Please contact our support center!`;

    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10min)',
      body: message,
    });

    res.status(200).json({
      status: 'Success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    return next(new AppError(err, 500));
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    // 1) get user based ont he token TODO: isn't the same token as the one in db
    // const hashedToken = crypto
    //   .createHash('sha256')
    //   .update(req.params.token)
    //   .digest('hex');

    // console.log(hashedToken);

    const user = await User.findOne({
      passwordResetToken: req.params.token,
      passwordresetExpires: { $gt: Date.now() },
    });

    // 2) if token has not expired and there is user set new password
    if (!user) {
      return next(new AppError('Token is invalid or has expired', 400));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordresetExpires = undefined;
    await user.save();
    // 3) update changepasswordat property for the user
    // 4) log the user in, send JWT
    const token = signToken(user._id);
    res.status(200).json({
      status: 'success',
      token,
    });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};

// ask for current password before updating password
exports.updatePassword = async (req, res, next) => {
  try {
    // 1) Get user from collection
    console.log(req);
    let token;

    if (req.headers.authorization) {
      token = req.headers.authorization;
    }

    if (!token) {
      return next(new AppError('You are not logged in. Please log in!'));
    }

    const decodedData = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decodedData.id).select('+password');

    if (!user) {
      return next(new AppError("User doesn't exist!", 401));
    }

    // 2) Check if POSTed current password is correct
    const { currentPassword, newPassword, newPasswordConfirm } = req.body;

    if (!(await user.validatePassword(currentPassword, user.password))) {
      return next(new AppError('Incorrect password', 401));
    }

    // 3) If password is correct, update password
    user.password = newPassword;
    user.passwordConfirm = newPasswordConfirm;

    await user.save();

    // 4) Log user in, send JWT token with new password
    const newToken = signToken(user._id);
    res.status(200).json({
      status: 'success',
      newToken,
    });
  } catch (error) {
    return next(new AppError(error, 400));
  }
};
