const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const Table = require('../models/Table');
const { deductInventory } = require('../services/inventoryService');

// get all orders and populate refs
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('tableId')
      .populate('items.menuItemId');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

// make a new order
const placeOrder = async (req, res) => {
  try {
    const { tableId, items } = req.body;
    let totalAmount = 0;
    const orderItems = [];

    // loop thru and check if items are available
    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItemId);

      // does it exist?
      if (!menuItem) {
        return res.status(400).json({ message: `Menu item with id ${item.menuItemId} not found` });
      }

      // is it available?
      if (!menuItem.isAvailable) {
        return res.status(400).json({ message: `${menuItem.name} is currently not available` });
      }

      // calculate price
      const unitPrice = menuItem.price;
      totalAmount += unitPrice * item.quantity;

      orderItems.push({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        unitPrice
      });
    }

    // save it
    const newOrder = new Order({
      tableId,
      items: orderItems,
      totalAmount
    });

    const savedOrder = await newOrder.save();

    // mark table as occupied so we don't seat someone else there
    await Table.findByIdAndUpdate(tableId, { status: 'occupied' });

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error placing order', error: error.message });
  }
};

// update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // trigger inventory logic if done
    if (status === 'completed') {
      deductInventory(id);
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error updating order status', error: error.message });
  }
};

// get single order
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate('tableId')
      .populate('items.menuItemId');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
};

module.exports = {
  getAllOrders,
  placeOrder,
  updateOrderStatus,
  getOrderById
};
