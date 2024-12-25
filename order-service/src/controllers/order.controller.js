const orderService = require('../services/order.service');

class OrderController {
  async getAllOrders(req, res) {
    try {
      const orders = await orderService.getAllOrders(req.query);
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async getOrderById(req, res) {
    try {
      const order = await orderService.getOrderById(req.params.id);
      res.json(order);
    } catch (error) {
      if (error.message === 'Order not found') {
        return res.status(404).json({ message: error.message });
      }
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async getUserOrders(req, res) {
    try {
      const orders = await orderService.getUserOrders(req.params.userId);
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async createOrder(req, res) {
    try {
      const order = await orderService.createOrder(req.body);
      res.status(201).json(order);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  }

  async updateOrderStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      const updatedOrder = await orderService.updateOrderStatus(id, status);
      res.json(updatedOrder);
    } catch (error) {
      if (error.message === 'Order not found') {
        return res.status(404).json({ message: error.message });
      }
      if (error.message === 'Invalid status') {
        return res.status(400).json({ message: error.message });
      }
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async getRecentOrders(req, res) {
    try {
      const orders = await orderService.getRecentOrders();
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async getOrderStats(req, res) {
    try {
      const stats = await orderService.getOrderStats();
      res.json(stats);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async health(req, res) {
    res.status(200).json({ status: 'OK', service: 'order-service' });
  }
}

module.exports = new OrderController();
