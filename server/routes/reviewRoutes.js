const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

// SET MERGEPARAMS TO TRUE TO GET ACCESS TO :TOURID
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route('/ownreviews')
  .get(authController.protect, reviewController.getOwnReviews);

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(authController.protect, reviewController.updateReview)
  .delete(authController.protect, reviewController.deleteReview);

module.exports = router;
