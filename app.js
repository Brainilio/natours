const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

// -------------- GLOBAL VARIABLES ---------- //

const app = express();

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

// ----------- MIDDLEWARES --------------- //

// SET SECURITY HTTP HEADERS
app.use(helmet());

// LIMIT REQUESTS FROM SAME API
app.use('/api', limiter);

// DEV LOGGING
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// BODY PARSER
app.use(express.json({ limit: '10kb' }));

// DATA SANITIZATION AGAINST NOSQL QUERY INJECTION
app.use(mongoSanitize());

// DATA SANITIZATION AGAINST XSS
app.use(xss());

// PREVENT PARAMTER POLLUTION
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// SERVING STATIC FILES
app.use(express.static(`${__dirname}/public`));

// TEST MIDDLEWARE
app.use((req, res, next) => {
  next();
});

// -------------------  ROUTING ---------------- //

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

//operational error using utility class errorhandler
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// use the globally created errors that are used in other middlewares, all error messages will be using these methods
app.use(globalErrorHandler);

module.exports = app;
