const express = require('express');
const router = express.Router();
const { createUser, getUsers, updateUser, deleteUser } = require('../controllers/userController');

// CRUD Routes for Users
router.post('/', createUser); // Create a user
router.get('/:clientId', getUsers); // Get users by clientId
router.put('/:id', updateUser); // Update user by user ID
router.delete('/:id', deleteUser); // Delete user by user ID

module.exports = router;
