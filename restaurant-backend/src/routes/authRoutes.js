const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route for registering a new user
router.post('/register', authController.register);

// Route for logging in
router.post('/login', authController.login);

module.exports = router;
