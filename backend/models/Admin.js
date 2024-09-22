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
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client', // Reference the Client model
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'], // Can be either 'admin' or 'user'
    default: 'user',
  },
});

module.exports = mongoose.model('User', userSchema);
