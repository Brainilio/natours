const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

// SET MERGEPARAMS TO TRUE TO GET ACCESS TO :TOURID
const router = express.Router({ mergeParams: true });

// POST /tour/{id}/reviews
// POST /reviews
// get /T

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview
  );

router.route('/:id').delete(reviewController.deleteReview);

module.exports = router;
