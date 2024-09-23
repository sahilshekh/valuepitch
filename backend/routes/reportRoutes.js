// routes/reportRoutes.js
const express = require('express');
const { generateMISReport } = require('../controllers/reportController');
const router = express.Router();

router.get('/backend/models/Opration.js', generateMISReport);

module.exports = router;
