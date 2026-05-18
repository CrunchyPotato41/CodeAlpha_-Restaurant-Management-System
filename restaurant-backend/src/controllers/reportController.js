const Order = require('../models/Order');
const InventoryItem = require('../models/InventoryItem');

// get total sales for today
const getDailySales = async (req, res) => {
  try {
    // figure out start and end of today
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // find all completed orders today
    const completedOrders = await Order.find({
      status: 'completed',
      createdAt: { $gte: todayStart, $lte: todayEnd }
    });

    // sum it up
    let totalSales = 0;
    for (const order of completedOrders) {
      totalSales += order.totalAmount;
    }

    res.status(200).json({
      date: todayStart.toISOString().split('T')[0],
      orderCount: completedOrders.length,
      totalSales
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching daily sales', error: error.message });
  }
};

// get things we are running out of
const getStockAlerts = async (req, res) => {
  try {
    // use $expr to compare two fields in the db
    const lowStockItems = await InventoryItem.find({
      $expr: { $lte: ['$quantityInStock', '$lowStockThreshold'] }
    });

    res.status(200).json(lowStockItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stock alerts', error: error.message });
  }
};

module.exports = {
  getDailySales,
  getStockAlerts
};
