const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');

// all these need login
router.get('/daily-sales', protect, reportController.getDailySales);
router.get('/stock-alerts', protect, reportController.getStockAlerts);

module.exports = router;
