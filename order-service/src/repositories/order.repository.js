const Order = require('../models/order.model');
const { Op } = require('sequelize');

class OrderRepository {
  async findAll(query = {}) {
    const { userId, status, startDate, endDate } = query;
    
    const where = {};
    
    if (userId) where.userId = userId;
    if (status) where.status = status;
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date[Op.gte] = new Date(startDate);
      if (endDate) where.date[Op.lte] = new Date(endDate);
    }

    return await Order.findAll({
      where,
      order: [['date', 'DESC']]
    });
  }

  async findById(id) {
    return await Order.findByPk(id);
  }

  async findByUserId(userId) {
    return await Order.findAll({
      where: { userId },
      order: [['date', 'DESC']]
    });
  }

  async create(orderData) {
    return await Order.create(orderData);
  }

  async updateStatus(id, status) {
    const order = await Order.findByPk(id);
    if (!order) return null;
    
    return await order.update({ status });
  }

  async getRecentOrders(limit = 5) {
    return await Order.findAll({
      order: [['date', 'DESC']],
      limit
    });
  }

  async getOrderStats() {
    const totalOrders = await Order.count();
    const statusCounts = await Order.findAll({
      attributes: ['status', [sequelize.fn('COUNT', 'status'), 'count']],
      group: ['status']
    });

    return {
      totalOrders,
      statusCounts: statusCounts.reduce((acc, curr) => {
        acc[curr.status] = curr.get('count');
        return acc;
      }, {})
    };
  }
}

module.exports = new OrderRepository();
