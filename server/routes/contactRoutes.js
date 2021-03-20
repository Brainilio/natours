const express = require('express');
const contactController = require('../controllers/contactController');
const authController = require('../controllers/authController');

// SET MERGEPARAMS TO TRUE TO GET ACCESS TO :TOURID
const router = express.Router({ mergeParams: true });

authController.restrictTo('admin');

router.post('/', contactController.postMessage);
router.get(
  '/',
  authController.protect,
  authController.restrictTo('admin'),
  contactController.getAllMessages
);

module.exports = router;
