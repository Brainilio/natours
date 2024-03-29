const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const bodyParser = require('body-parser');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');
const Booking = require('../models/bookingModel');

const router = express.Router({ mergeParams: true });
const endpointSecret =
  'whsec_6ed55e7dc8c2123eab0bb5f5c218714fc547e67fedffadcac60965beadafb663';

router.post(
  '/checkout-session/:tourid',
  authController.protect,
  bookingController.getCheckoutSession
);

const fulfillOrder = async (session) => {
  // TODO: fill me in
  try {
    const userId = session.client_reference_id;
    const tourId = session.success_url.split('/')[4];
    const price = session.amount_total;

    await Booking.create({
      tour: tourId,
      user: userId,
      price: price / 100,
    });
  } catch (error) {
    console.log(error.message);
  }
};

router.post(
  '/webhook',
  bodyParser.raw({ type: 'application/json' }),
  (request, response, next) => {
    const payload = request.body;
    const sig = request.headers['stripe-signature'];
    // sig = sig.replace(/^\[+]+$/g, '');

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log(err.message);
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      // Fulfill the purchase...
      fulfillOrder(session, next);
    }

    response.status(200);
  }
);

router.get(
  '/:tourid/hasBookedTour',
  authController.protect,
  bookingController.hasBookedTour
);

router.get(
  '/bookedTours',
  authController.protect,
  bookingController.getBookedTours
);

module.exports = router;
