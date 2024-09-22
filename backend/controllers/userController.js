const User = require('../models/User');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Create a new user
// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, phone, password, client } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Convert client ID to a valid ObjectId
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      client:new mongoose.Types.ObjectId(client) // Fix: Direct function call
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};


// Read all users for a specific client
exports.getUsers = async (req, res) => {
  try {
    const { clientId } = req.params;
    const users = await User.find({ client: clientId });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, { name, email, phone }, { new: true, runValidators: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};
