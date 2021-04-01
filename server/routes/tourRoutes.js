const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

// ------- MIDDLEWARE  ------ //

/* checks id on each :id request example:
router.param('id', tourController.checkID);
*/

// ----------- HTTP ROUTES -------------- //

//merge routes together

// POST /tour/{id}/reviews
// GET /tour/{id}/reviews
// GET /tour/{id}/reviews/{id}

router.use('/:tourId/reviews', tourController.setTourId, reviewRouter);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tours-stats').get(tourController.getTourStats);

router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    tourController.getMonthlyPlan
  );

// GEOSPATIAL ROUTES
router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

// tours
router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    tourController.createTour
  );

router
  .route('/:id')
  .get(tourController.getTour) // reference: ../controllers/authcontroller
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    tourController.uploadPhotos,
    tourController.uploadCoverImageToS3,
    tourController.uploadImagesToS3,
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    tourController.deleteTour
  );

module.exports = router;
