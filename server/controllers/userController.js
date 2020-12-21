const multer = require('multer');
// const sharp = require('sharp');
const aws = require('aws-sdk');

const User = require('../models/userModel');
const AppError = require('../utils/appError');

const factoryHandler = require('../utils/factoryHandler');

const s3 = new aws.S3({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_KEY_ID,
  region: process.env.AWS_REGION,
});

// multer operations / lifecycle

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

// Upload file first to multer storage & filter
exports.uploadPhoto = upload.single('photo');

// Upload photo to S3 bucket and modify the request body to add the URL to imagefile
exports.uploadImageToS3 = (req, res, next) => {
  //No file uploaded? Skip this function completely.
  if (!req.file) return next();

  console.log(req.file);

  // Upload the photo to multer to "read" it.
  // upload.single('photo');

  // params for AWS bucket
  const params = {
    Body: req.file.buffer,
    Bucket: 'natours-images',
    Key: `user-${req.user.id}-${Date.now()}.jpeg`,
  };

  // Upload image to aws
  s3.upload(params, async (error, data) => {
    if (error) {
      return new AppError(error, 500);
    }
    const imagelink = data.Location;
    req.body.imagefile = imagelink;
    next();
  });
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
      if (
        allowedFields.includes(el) &&
        updatedFields[el] !== 'undefined' &&
        updatedFields[el] !== null &&
        updatedFields[el] !== '' &&
        updatedFields[el] !== undefined
      )
        newObject[el] = updatedFields[el];
    });

    // grab image file from modified request body (check uploadimagetos3 function) and add it to the user's photo field

    if (req.body.imagefile) {
      newObject.photo = req.body.imagefile;
    }

    console.log(newObject);

    const updatedUser = await User.findByIdAndUpdate(req.user.id, newObject, {
      new: true,
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
