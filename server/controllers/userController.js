const User = require('../models/userModel');
const AppError = require('../utils/appError');
const factoryHandler = require('../utils/factoryHandler');

// --------- middlewares ---------- //
// Get personal profile;
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

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

// get all users
exports.getAllUsers = factoryHandler.getAll(User);

/// - Admin methods, don't update passwords with the updateuser function - //

// getting user
exports.getUser = factoryHandler.getOne(User);

// deleting user
exports.deleteUser = factoryHandler.deleteOne(User);

//updating user
exports.updateUser = factoryHandler.updateOne(User);
