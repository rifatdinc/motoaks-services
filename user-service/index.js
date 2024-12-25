const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./src/config/database');
const userRoutes = require('./src/routes/user.routes');
const userService = require('./src/services/user.service');

const app = express();
const PORT = process.env.PORT || 3011;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', userRoutes);

// Initialize application
const initializeApp = async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized');
    
    // Initialize default users
    await userService.initializeDefaultUsers();
    
    app.listen(PORT, () => {
      console.log(`User service running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize app:', error);
    process.exit(1);
  }
};

initializeApp();
