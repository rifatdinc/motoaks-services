const dashboardService = require('../services/dashboard.service');

class DashboardController {
  async getSummaryStats(req, res) {
    try {
      const stats = await dashboardService.getSummaryStats();
      res.json(stats);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch summary stats' });
    }
  }

  async getWeeklySales(req, res) {
    try {
      const sales = await dashboardService.getWeeklySales();
      res.json(sales);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch weekly sales' });
    }
  }

  async getMonthlySales(req, res) {
    try {
      const sales = await dashboardService.getMonthlySales();
      res.json(sales);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch monthly sales' });
    }
  }

  async getLowStockItems(req, res) {
    try {
      const items = await dashboardService.getLowStockItems();
      res.json(items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch low stock items' });
    }
  }
}

module.exports = new DashboardController();
