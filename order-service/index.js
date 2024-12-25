const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./src/config/database');
const orderRoutes = require('./src/routes/order.routes');

const app = express();
const PORT = process.env.PORT || 3012;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', orderRoutes);

// Initialize application
const initializeApp = async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized');
    
    app.listen(PORT, () => {
      console.log(`Order service running on port ${PORT}`);
      console.log(`
Available Routes:
----------------
Orders:
  - GET    /api/orders                   Get all orders
  - GET    /api/orders/recent            Get recent orders
  - GET    /api/orders/stats             Get order statistics
  - GET    /api/orders/:id               Get order by ID
  - GET    /api/users/:userId/orders     Get user's orders
  - POST   /api/orders                   Create new order
  - PATCH  /api/orders/:id/status        Update order status

Health Check:
  - GET    /api/health                   Service health check
`);
    });
  } catch (error) {
    console.error('Failed to initialize app:', error);
    process.exit(1);
  }
};

initializeApp();
