const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const { protect } = require('../middleware/authMiddleware');

// all these need login
router.get('/', protect, reservationController.getAllReservations);
router.post('/', protect, reservationController.createReservation);
router.put('/:id', protect, reservationController.updateReservation);

module.exports = router;
