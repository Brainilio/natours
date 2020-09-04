const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');

const router = express.Router();

// ------- MIDDLEWARE  ------ //

/* checks id on each :id request example:
router.param('id', tourController.checkID);
*/

// ----------- HTTP ROUTES -------------- //

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tours-stats').get(tourController.getTourStats);

router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(authController.protect, tourController.getTour) // reference: ../controllers/authcontroller
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
