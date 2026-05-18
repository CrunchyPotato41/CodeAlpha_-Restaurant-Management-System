const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

// all these need login
router.get('/', protect, orderController.getAllOrders);
router.post('/', protect, orderController.placeOrder);
router.put('/:id/status', protect, orderController.updateOrderStatus);
router.get('/:id', protect, orderController.getOrderById);

module.exports = router;
