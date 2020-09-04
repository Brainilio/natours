const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

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
});

// -------- DOC MIDDLEWARE: RUNS BEFORE .SAVE() AND .CREATE() //
userSchema.pre('save', async function (next) {
  // ONLY RUN IF PW WAS MODIFIED
  if (!this.isModified('password')) return next();
  //HASHING PASSWORD AND GETTING RID OF PWCONFIRM FIELD

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.validatePassword = async function (formPw, realPw) {
  return await bcrypt.compare(formPw, realPw);
};

// this function checks if the password
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

const User = mongoose.model('User', userSchema);

module.exports = User;
