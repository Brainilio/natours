const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

// ------- MIDDLEWARE  ------ //

/* checks id on each :id request example:
router.param('id', tourController.checkID);
*/

// ----------- HTTP ROUTES -------------- //

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
