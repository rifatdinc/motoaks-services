const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./src/config/database');
const productRoutes = require('./src/routes/product.routes');
const reviewRoutes = require('./src/routes/review.routes');
const productService = require('./src/services/product.service');

const app = express();
const PORT = process.env.PORT || 3010;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', productRoutes);
app.use('/api', reviewRoutes);

// Initialize application
const initializeApp = async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized');
    
    // Initialize default products
    await productService.initializeDefaultProducts();
    
    app.listen(PORT, () => {
      console.log(`Product service running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize app:', error);
    process.exit(1);
  }
};

initializeApp();
