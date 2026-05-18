const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const { protect } = require('../middleware/authMiddleware');

// public routes
router.get('/', menuController.getAllMenuItems);

// protected routes (need login)
router.post('/', protect, menuController.addMenuItem);
router.put('/:id', protect, menuController.updateMenuItem);
router.delete('/:id', protect, menuController.deleteMenuItem);

module.exports = router;
