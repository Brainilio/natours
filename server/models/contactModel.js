const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please type in your name'],
  },
  email: {
    type: String,
    required: [true, 'Please type in your email'],
  },
  message: {
    type: String,
  },
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
