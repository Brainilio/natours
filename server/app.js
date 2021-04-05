const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const contactRouter = require('./routes/contactRoutes');
const bookingRouter = require('./routes/bookingRoutes');

// -------------- GLOBAL VARIABLES ---------- //

const app = express();

const limiter = rateLimit({
  max: 8000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

// ----------- MIDDLEWARES --------------- //

// SET SECURITY HTTP HEADERS
app.use(helmet());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Origin, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
  res.header('Allow', 'GET, PATCH, PUT, DELETE, OPTIONS');

  if (req.accepts('json' || 'xml' || 'x-www-form-urlencoded')) {
    next();
  } else {
    res.sendStatus(406);
  }
});

// LIMIT REQUESTS FROM SAME API
app.use('/api', limiter);

app.use(cors());

// DEV LOGGING
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// BODY PARSER

// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
  if (req.originalUrl === '/api/v1/booking/webhook') {
    next();
  } else {
    bodyParser.json()(req, res, next);
  }
});

// COOKIE PARSER
app.use(cookieParser());

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
app.use('/api/v1/contact', contactRouter);
app.use('/api/v1/booking', bookingRouter);

//operational error using utility class errorhandler
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// use the globally created errors that are used in other middlewares, all error messages will be using these methods
app.use(globalErrorHandler);

module.exports = app;
