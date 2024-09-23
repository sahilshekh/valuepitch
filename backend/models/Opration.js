// models/Operation.js
const mongoose = require('mongoose');

const operationSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  operationType: {
    type: String, // 'create', 'update', 'delete', etc.
    required: true,
  },
  status: {
    type: String, // 'success' or 'error'
    required: true,
  },
  errorMessage: {
    type: String, // Store error message in case of failure
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Operation = mongoose.model('Operation', operationSchema);
module.exports = Operation;
