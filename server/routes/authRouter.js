const authentication = require('../middleware/authMiddleware');
const express = require('express');
const { createUser, loginUser, resetPasswordController } = require('../controllers/AuthController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/me', authentication, userController.check);
router.post('/request-reset-password', resetPasswordController);

module.exports = router;