const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./src/config/database');
const bannerRoutes = require('./src/routes/banner.routes');
const bannerService = require('./src/services/banner.service');

const app = express();
const PORT = process.env.PORT || 3008;

// Middleware
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Allow all methods
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'], // Allow necessary headers
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api', bannerRoutes);

// Initialize application
const initializeApp = async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized');
    
    // Initialize default banners
    await bannerService.initializeDefaultBanners();
    
    app.listen(PORT, () => {
      console.log(`Home service running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize app:', error);
    process.exit(1);
  }
};

initializeApp();