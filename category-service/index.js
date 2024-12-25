const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./src/config/database');
const categoryRoutes = require('./src/routes/category.routes');
const categoryService = require('./src/services/category.service');

const app = express();
const PORT = process.env.PORT || 3009;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', categoryRoutes);

// Initialize application
const initializeApp = async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized');
    
    // Initialize default categories
    await categoryService.initializeDefaultCategories();
    
    app.listen(PORT, () => {
      console.log(`Category service running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize app:', error);
    process.exit(1);
  }
};

initializeApp();
