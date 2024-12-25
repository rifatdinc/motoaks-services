const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');

router.get('/stats', dashboardController.getSummaryStats);
router.get('/sales/weekly', dashboardController.getWeeklySales);
router.get('/sales/monthly', dashboardController.getMonthlySales);
router.get('/inventory/low-stock', dashboardController.getLowStockItems);

module.exports = router;
