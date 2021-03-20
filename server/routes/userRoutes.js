const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// ----------- HTTP ROUTES -------------- //

// for users
router.get(
  '/myprofile',
  authController.protect,
  userController.getMe,
  userController.getUser
);

router.post(
  '/signup',
  userController.uploadPhoto,
  userController.uploadImageToS3,
  authController.signUp
);
router.post('/login', authController.logIn);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch(
  '/updateProfile',
  authController.protect,
  userController.uploadPhoto,
  userController.uploadImageToS3,
  userController.updateMe
);

router.delete('/deleteUser', authController.protect, userController.deleteMe);

router.patch(
  '/updatePassword',
  authController.protect,
  authController.updatePassword
);

// for admins
router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    userController.getAllUsers
  );

router
  .route('/:id')
  .get(authController.protect, userController.getUser)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    userController.updateUser
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    userController.deleteUser
  );

module.exports = router;
