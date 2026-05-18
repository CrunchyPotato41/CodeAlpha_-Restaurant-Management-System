const InventoryItem = require('../models/InventoryItem');

// grab all inventory stuff
const getAllInventory = async (req, res) => {
  try {
    const items = await InventoryItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventory', error: error.message });
  }
};

// add an item
const addInventoryItem = async (req, res) => {
  try {
    const newItem = new InventoryItem(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: 'Error adding inventory item', error: error.message });
  }
};

// update quantity or whatever
const updateInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedItem = await InventoryItem.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: 'Error updating inventory item', error: error.message });
  }
};

module.exports = {
  getAllInventory,
  addInventoryItem,
  updateInventoryItem
};
