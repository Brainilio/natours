const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

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

// SERVING STATIC FILES
app.use(express.static(`${__dirname}/public`));

// TEST MIDDLEWARE
app.use((req, res, next) => {
  next();
});

// -------------------  ROUTING ---------------- //

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//operational error using utility class errorhandler
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// use the globally created errors that are used in other middlewares, all error messages will be using these methods
app.use(globalErrorHandler);

module.exports = app;
