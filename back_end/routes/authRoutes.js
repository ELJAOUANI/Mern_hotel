const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Route d'enregistrement
router.post('/register', authController.register);

// Route de connexion
router.post('/login', authController.login);

module.exports = router;
