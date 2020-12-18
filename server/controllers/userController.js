const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel');

const AppError = require('../utils/appError');
const factoryHandler = require('../utils/factoryHandler');

// multer configurations

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/');
//   },
//   filename: (req, file, cb) => {
//     // user-{id}-{timestamp}.{file-extension}
//     const extension = file.mimetype.split('/')[1];

//     cb(null, `user-${req.user.id}-${Date.now()}.${extension}`);
//   },
// });

//  upload to buffer!
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

// --------- middlewares ---------- //

// Handle file uploading
exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  // keep image in memory instead of storage
  sharp(req.file.buffer)
    .resize(500, 500, {
      fit: 'cover',
    })
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/${req.file.filename}`)
    .catch((error) => new AppError(error.message, 400));

  next();
};

// Get personal profile;
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

// ------------ HTTP METHODS --------------- //

//Updating profile
exports.updateMe = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.file);

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

    if (req.file) newObject.photo = req.file.filename;

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
