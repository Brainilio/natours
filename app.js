const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// -------------- GLOBAL VARIABLES ---------- //

const app = express();

// ----------- MIDDLEWARES --------------- //

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
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
