const axios = require('axios');
const services = require('../config/services');

class DashboardService {
  async getSummaryStats() {
    try {
      const [orders, users, products] = await Promise.all([
        axios.get(`${services.ORDER_SERVICE}/api/orders`),
        axios.get(`${services.USER_SERVICE}/api/users`),
        axios.get(`${services.PRODUCT_SERVICE}/api/products`)
      ]);

      const currentMonth = new Date().getMonth();
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;

      const currentMonthOrders = orders.data.filter(order => 
        new Date(order.date).getMonth() === currentMonth
      );
      const lastMonthOrders = orders.data.filter(order => 
        new Date(order.date).getMonth() === lastMonth
      );

      const totalSales = currentMonthOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      const lastMonthSales = lastMonthOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      const salesChange = lastMonthSales ? ((totalSales - lastMonthSales) / lastMonthSales) * 100 : 100;

      const newUsers = users.data.filter(user => 
        new Date(user.createdAt).getMonth() === currentMonth
      ).length;
      const lastMonthUsers = users.data.filter(user => 
        new Date(user.createdAt).getMonth() === lastMonth
      ).length;
      const usersChange = lastMonthUsers ? ((newUsers - lastMonthUsers) / lastMonthUsers) * 100 : 100;

      const soldProducts = currentMonthOrders.reduce((sum, order) => 
        sum + order.products.reduce((total, product) => total + product.quantity, 0), 0
      );
      const lastMonthSoldProducts = lastMonthOrders.reduce((sum, order) => 
        sum + order.products.reduce((total, product) => total + product.quantity, 0), 0
      );
      const productsChange = lastMonthSoldProducts ? 
        ((soldProducts - lastMonthSoldProducts) / lastMonthSoldProducts) * 100 : 100;

      const conversionRate = orders.data.length / users.data.length * 100;
      const lastMonthConversion = lastMonthOrders.length / 
        users.data.filter(user => new Date(user.createdAt).getMonth() === lastMonth).length * 100;
      const conversionChange = lastMonthConversion ? 
        ((conversionRate - lastMonthConversion) / lastMonthConversion) * 100 : 100;

      return {
        totalSales: {
          value: totalSales,
          change: salesChange.toFixed(1)
        },
        newCustomers: {
          value: newUsers,
          change: usersChange.toFixed(1)
        },
        soldProducts: {
          value: soldProducts,
          change: productsChange.toFixed(1)
        },
        conversionRate: {
          value: conversionRate.toFixed(2),
          change: conversionChange.toFixed(1)
        }
      };
    } catch (error) {
      console.error('Error fetching summary stats:', error);
      throw new Error('Failed to fetch summary stats');
    }
  }

  async getWeeklySales() {
    try {
      const response = await axios.get(`${services.ORDER_SERVICE}/api/orders`);
      const orders = response.data;

      const today = new Date();
      const lastWeek = new Array(7).fill(0).map((_, index) => {
        const date = new Date(today);
        date.setDate(date.getDate() - index);
        return date;
      }).reverse();

      const weeklySales = lastWeek.map(date => {
        const dayOrders = orders.filter(order => 
          new Date(order.date).toDateString() === date.toDateString()
        );
        const totalSales = dayOrders.reduce((sum, order) => sum + order.totalAmount, 0);

        return {
          day: date.toLocaleDateString('tr-TR', { weekday: 'long' }),
          sales: totalSales
        };
      });

      return weeklySales;
    } catch (error) {
      console.error('Error fetching weekly sales:', error);
      throw new Error('Failed to fetch weekly sales');
    }
  }

  async getMonthlySales() {
    try {
      const response = await axios.get(`${services.ORDER_SERVICE}/api/orders`);
      const orders = response.data;

      const monthlySales = new Array(12).fill(0).map((_, index) => {
        const monthOrders = orders.filter(order => 
          new Date(order.date).getMonth() === index
        );
        const totalSales = monthOrders.reduce((sum, order) => sum + order.totalAmount, 0);

        return {
          month: new Date(2024, index).toLocaleDateString('tr-TR', { month: 'long' }),
          sales: totalSales
        };
      });

      return monthlySales;
    } catch (error) {
      console.error('Error fetching monthly sales:', error);
      throw new Error('Failed to fetch monthly sales');
    }
  }

  async getLowStockItems() {
    try {
      const response = await axios.get(`${services.PRODUCT_SERVICE}/api/products`);
      const products = response.data;

      const lowStockItems = products
        .filter(product => product.stock <= 5)
        .map(product => ({
          name: product.name,
          stock: product.stock
        }));

      return lowStockItems;
    } catch (error) {
      console.error('Error fetching low stock items:', error);
      throw new Error('Failed to fetch low stock items');
    }
  }
}

module.exports = new DashboardService();
