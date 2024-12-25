const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/database');
const dashboardRoutes = require('./src/routes/dashboard.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/admin/dashboard', dashboardRoutes);
app.use('/api/admin/trust-features', trustFeatureRoutes);
app.use('/api/admin/testimonials', testimonialRoutes);

// Database sync and server start
const PORT = process.env.PORT || 3013;

async function startServer() {
  try {
    await sequelize.sync();
    console.log('Database synced successfully');
    
    app.listen(PORT, () => {
      console.log(`Admin service running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
