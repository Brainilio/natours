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

const User = mongoose.model('User', userSchema);

module.exports = User;
