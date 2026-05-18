// using express
const express = require('express');
const cors = require('cors'); // need this for react to work

const app = express();

// middleware stuff
app.use(cors());
app.use(express.json()); // parses json

// routes
const authRoutes = require('./src/routes/authRoutes');
const menuRoutes = require('./src/routes/menuRoutes');
const tableRoutes = require('./src/routes/tableRoutes');
const reservationRoutes = require('./src/routes/reservationRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const inventoryRoutes = require('./src/routes/inventoryRoutes');
const reportRoutes = require('./src/routes/reportRoutes');

// mounting them
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/reports', reportRoutes);

// test if working
app.get('/', (req, res) => {
  console.log('hit the root route yay');
  res.status(200).json({ 
    message: 'hello from the backend server' 
  });
});

module.exports = app;
