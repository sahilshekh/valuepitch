// db.js

const mongoose = require('mongoose');
require('dotenv').config();
// Instead of hardcoding the connection string
const mongooseUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/clientManagement";

// Then connect using:


const connectDB = async () => {
  try {
    await mongoose.connect(mongooseUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error('Error connecting to MongoDB', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
