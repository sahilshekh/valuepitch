const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // ensure no duplicate emails
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true, // Password is now a required field
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client', // Reference the Client model
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);
