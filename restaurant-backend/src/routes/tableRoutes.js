const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');
const { protect } = require('../middleware/authMiddleware');

// public routes
router.get('/', tableController.getAllTables);

// protected routes (need login)
router.post('/', protect, tableController.addTable);
router.put('/:id/status', protect, tableController.updateTableStatus);

module.exports = router;
