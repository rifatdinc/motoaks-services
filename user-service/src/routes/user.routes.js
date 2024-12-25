const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const userValidator = require('../validators/user.validator');
const { validate } = require('../middlewares/validator.middleware');
const auth = require('../middlewares/auth.middleware');

// Public routes
router.post('/auth/login', validate(userValidator.login), userController.login);
router.post('/users', validate(userValidator.create), userController.createUser);

// Protected routes
router.get('/users', auth(['admin']), userController.getAllUsers);
router.get('/users/me', auth(), userController.getCurrentUser);
router.get('/users/:id', auth(['admin']), userController.getUserById);
router.put('/users/:id', auth(['admin']), validate(userValidator.update), userController.updateUser);
router.delete('/users/:id', auth(['admin']), userController.deleteUser);
router.get('/health', userController.health);

module.exports = router;
