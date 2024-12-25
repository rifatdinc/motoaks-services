const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const orderValidator = require('../validators/order.validator');
const { validate } = require('../middlewares/validator.middleware');

// Order routes
router.get('/orders', orderController.getAllOrders);
router.get('/orders/recent', orderController.getRecentOrders);
router.get('/orders/stats', orderController.getOrderStats);
router.get('/orders/:id', orderController.getOrderById);
router.get('/users/:userId/orders', orderController.getUserOrders);
router.post('/orders', validate(orderValidator.create), orderController.createOrder);
router.patch('/orders/:id/status', validate(orderValidator.updateStatus), orderController.updateOrderStatus);

// Health check
router.get('/health', orderController.health);

module.exports = router;
