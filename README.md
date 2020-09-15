# natours

NodeJS, Express & MongoDB application for booking tours with MVC architecture

#### Contoller:

Application logic (Code that is concerned about application's implementation, not the underlying business problem, manages requests and responses, technical aspects, bridge between model and view layers)

### Model:

Business logic (Code that solves the business problem we set out to solve e.g. validating user input data, password validation, creating new tours etc))

- The database model/structure can be found here: <INSERT DRAW.IO LINK>

### View:

Presentation logic

Request -> Router -> Controller -> Response
Controller <-> Interact with Model
Controller <-> Send presentation to View

I'll try to offload as much logic as possible into the models, and keep the controllers as simple and lean as possible!

Docs:

## ENTRY POINT: ./SERVER.JS

### /dev-data

- Contains data that will be used throughout the app

### /public

- templates and stylesheets

### ./server.js

- Starts the server, connect to databases, require app and initializes it here
- Method to handle unhandled errors.

### ./app.js

- Add express config for port listening
- Routing
- middlewares: body parser, morgan for requests, serve static files & error middleware for global caught errors ( using the utility apperror method)
- Use rate limiter to limit api requests from a particular IP
- use data sanitization middleware to secure against nosql query injections & XSS
- Prevent http parameter pollution using hpp

### /routes/...

- contains routes for endpoints in app.js
- Added basic HTTP requests using filesystem to add to local files in /dev-data
- Http requests uses controllers

## /controllers/...

- Controllers to handle requests & middleware functions
- Aggregator pipeline methods
- Errorcontorllers to handle global errors, uses the appError class from /utils/... to handle errors, pass in message and errorcode

## /models/..

- Models enforcing schemas and business logic.
  - User model
  - Tour model
- Also uses visualization & aggregator middewares

#### example using mongoose:

```
const mongoose = require('mongoose');

//schema to enforce rules for model
const tourSchema = new mongoose.Schema({
name: {
type: String,
require: [true, 'A tour must have a name'],
unique: true,
},
rating: {
type: Number,
default: 2.5,
},
price: {
type: Number,
required: [true, 'A tour must have a price.'],
},
});

//create a model using the schema
const Tour = mongoose.model('Tour', tourSchema);

//new document for tour model
const testTour = new Tour({
name: 'San Francisco',
rating: 4.7,
price: 500,
});

//save it
testTour
.save()
.then((doc) => {
console.log(`You just saved: ${doc}`);
})
.catch((err) => {
console.log('ERROR! ', +err);
});
```

## ./utils/...

- Utility classes that can be globally used.
- appError.js is a class to use operational errors @params 1: message, 2: statuscode
- Email.js is a file in which i use nodemailer. You can use this utility method everywhere if you want to send emails

## Error ?

- Natours uses a middleware to handle errors. You can use the following snippet to create errors and the created middleware in ./app.js will handle it
- The class that uses the error can be found in utils
- The class uses two different error methods and in production we only want to distinguish between operational errors and unexpected errors which logs to your console.

```
// Class method uses this type of function
const err = new Error(`Error message here!`)
	err.status = "fail"
	err.statusCode = 404
	next(err)

// Using the error handler
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
```

## AUTH: Authentication && Security

Files can be found in ./controller/authcontroller , models/usermodel , routes/userRoutes

These are some of the authentication & security features I have added in this project:

- Signing up makes use of the bcrypt library to hash the password using the pre-hook method
- Signing people in the controller is going to be made with a custom body, i'm not going to throw the entire body in there, because it can be modified.
- I use JWT to assign webtokens with my private password in my config file.
- I use a model method in the userschema to validate and compare the passwrods with bcrypt
- In my authcontroller i also make use of the .select method on mongoose to still pull the password, despite the fact that i put select on false in my user model, so i still have access to my password in the controller and will be able to compare both passwords in the db.
- authController.forgotPassword: User schema uses a resettoken & expiration date field for the reset token that you can request if you go to /forgotpassword , this will set a reset token in your db and also send one to your email, i use mailtrap.io to catch all the emails.
- authController.resetPassword: In your email you will find the reset-token, you need to paste this as a params "resetPassword/:token". Send this request as a patch with body:
  password and authController.passwordConfirm to reset your password. After resetting your password, the reset-token and the reset-expires will be gone
- authController.updatePassword : you can change your password, but we are going to check if the user that is changing the password knows their current password for an extra security measure. I also get the user again by decoding the JWT.
- UserController.updateMe: updates the profile (only name and email are adjustable)
- UserController.deleteMe: Sets the active field on false. I also use a pre.find middleware on the model to make sure that whenever you uset he find method on a model anywhere youw ill only get the users that have active on true.

#### Protect middleware (./controllers/authcontrollers => protect)

the protect middleware route makes use of 3 different types of protections: checks the jwt token, checks if you exist as an user, checks if you've changed your password after jwt token was issued to you.

#### User roles & Permissions

- Use middleware authController.protect to protect routes from users that aren't logged in
- Use middleware authController.protect with @params 'user' || 'guide' || 'admin' to restrict routes and only allow the given param to connect to the route.

# Headers:

- _authorization_: Please insert your JWT token in here when you sign up or log in! You must be able to send your jwt token with all your requests in this header.
- Use helmet to

# API ENDPOINTS:

_TOURS_:

GET ALL TOURS: /api/v1/tours/
PARAMS: LIMIT, PAGE, SORT, GTE, LTE, LT, GT,

GET SINGLE TOUR: /api/v1/tours/{id}
