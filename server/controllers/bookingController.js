/* eslint-disable no-unneeded-ternary */
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const Booking = require('../models/bookingModel');
// const factoryHandler = require('../utils/factoryHandler');
const AppError = require('../utils/appError');
const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');

exports.getCheckoutSession = async (req, res, next) => {
  try {
    // get currently booked tour
    const tour = await Tour.findById(req.params.tourid);
    const { cancelurl, successurl } = req.query;
    //create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: successurl
        ? successurl
        : `${req.protocol}://${req.get('host')}/`,
      cancel_url: cancelurl
        ? cancelurl
        : `${req.protocol}://${req.get('host')}/tour/${tour.id}`,
      customer_email: req.user.email,
      client_reference_id: req.user.id,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: tour.name,
              description: tour.summary,
              images: [tour.imageCover],
            },
            unit_amount: tour.price * 100,
          },
          quantity: 1,
        },
      ],
    });

    res.status(200).json({
      session: session,
      image: tour.imageCover,
    });

    //send it to client
  } catch (error) {
    return next(new AppError(error.message, 404));
  }
};

exports.hasBookedTour = async (req, res, next) => {
  try {
    const booking = await Booking.find({
      tour: req.params.tourid,
      user: req.user.id,
    });
    if (booking) res.send(true);
  } catch (error) {
    return res.send(false);
  }
};
