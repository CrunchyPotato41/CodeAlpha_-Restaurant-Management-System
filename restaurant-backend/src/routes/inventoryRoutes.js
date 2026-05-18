const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { protect } = require('../middleware/authMiddleware');

// all these need login
router.get('/', protect, inventoryController.getAllInventory);
router.post('/', protect, inventoryController.addInventoryItem);
router.put('/:id', protect, inventoryController.updateInventoryItem);

module.exports = router;
