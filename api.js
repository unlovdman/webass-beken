require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const routes = require('./routes');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Praktikum Management System API' });
});

// API Routes
app.use(routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Database connection
let isDbConnected = false;

async function initDatabase() {
  if (!isDbConnected) {
    try {
      await sequelize.authenticate();
      console.log('Database connection has been established successfully.');
      isDbConnected = true;
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      throw error;
    }
  }
}

// Handler for Vercel
module.exports = async (req, res) => {
  try {
    await initDatabase();
    app(req, res);
  } catch (error) {
    console.error('Error in serverless function:', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}; 