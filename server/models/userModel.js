const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const crypto = require('crypto');

// name, email, photo, password, passwordConfirm
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please type in a valid email!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail],
  },
  photo: { type: String },
  role: {
    type: String,
    enum: ['user', 'guide', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password!'],
    validate: {
      validator: function (el) {
        return this.password === el;
      },
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordresetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// -------- DOC MIDDLEWARE: RUNS BEFORE .SAVE() AND .CREATE() //

// hash password
userSchema.pre('save', async function (next) {
  // ONLY RUN IF PW WAS MODIFIED
  if (!this.isModified('password')) return next();
  //HASHING PASSWORD AND GETTING RID OF PWCONFIRM FIELD

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// change the passwordchangedat again after saving an userschema
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// only send users that are active when you use the 'find' method on the model
userSchema.pre(/^find/, function (next) {
  this.find({ active: true });
  next();
});

// --------- SCHEMA METHODS -------------- //

//method for validating password for logging in, compares password given to bcrypt password
userSchema.methods.validatePassword = async function (formPw, realPw) {
  return await bcrypt.compare(formPw, realPw);
};

// this function checks if the password is changed after user has received a jwt timestamp
userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    // change timestamp to parseint so i can compare the jwt time with the current time
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimeStamp < changedTimeStamp; // 100 < 200 means changed!
  }

  // False means not changed
  return false;
};

//generates reset token for user that expires in 10 minutes
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  //expires in 10 mins
  this.passwordresetExpires = Date.now() + 10 * 60 * 1000;

  return this.passwordResetToken;
};
const User = mongoose.model('User', userSchema);

module.exports = User;
