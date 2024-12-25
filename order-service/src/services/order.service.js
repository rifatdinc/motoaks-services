const orderRepository = require('../repositories/order.repository');
const { v4: uuidv4 } = require('uuid');

class OrderService {
  async getAllOrders(query) {
    return await orderRepository.findAll(query);
  }

  async getOrderById(id) {
    const order = await orderRepository.findById(id);
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }

  async getUserOrders(userId) {
    return await orderRepository.findByUserId(userId);
  }

  async createOrder(orderData) {
    const order = {
      ...orderData,
      id: uuidv4(),
      date: new Date(),
      status: 'Beklemede'
    };

    return await orderRepository.create(order);
  }

  async updateOrderStatus(id, status) {
    const validStatuses = ['Beklemede', 'İşleniyor', 'Kargoda', 'Tamamlandı', 'İptal Edildi'];
    
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status');
    }

    const updatedOrder = await orderRepository.updateStatus(id, status);
    if (!updatedOrder) {
      throw new Error('Order not found');
    }

    return updatedOrder;
  }

  async getRecentOrders() {
    return await orderRepository.getRecentOrders();
  }

  async getOrderStats() {
    return await orderRepository.getOrderStats();
  }

  async validateOrderProducts(products) {
    if (!Array.isArray(products) || products.length === 0) {
      throw new Error('Products must be a non-empty array');
    }

    products.forEach(product => {
      if (!product.productId || !product.quantity) {
        throw new Error('Each product must have a productId and quantity');
      }
      if (product.quantity <= 0) {
        throw new Error('Product quantity must be greater than 0');
      }
    });

    return true;
  }
}

module.exports = new OrderService();
