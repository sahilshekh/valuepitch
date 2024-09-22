const express = require('express');
const router = express.Router();
const clientController = require('../controllers/ClientController');
const userController = require('../controllers/userController');
const jwtAuthenticationMiddleware = require('../middleware/JWTAuthenticationMiddlewar');
const adminMiddleware = require('../middleware/adminMiddleware');

// Admin Routes
router.put('/clients/:id', jwtAuthenticationMiddleware, adminMiddleware, clientController.updateClient);
router.delete('/clients/:id', jwtAuthenticationMiddleware, adminMiddleware, clientController.deleteClient);

router.put('/users/:id', jwtAuthenticationMiddleware, adminMiddleware, userController.updateUser);
router.delete('/users/:id', jwtAuthenticationMiddleware, adminMiddleware, userController.deleteUser);

module.exports = router;
