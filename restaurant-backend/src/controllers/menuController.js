const MenuItem = require('../models/MenuItem');

// get everything
const getAllMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items', error: error.message });
  }
};

// create one
const addMenuItem = async (req, res) => {
  try {
    console.log("adding menu item!!!"); // test
    console.log(req.body); // see what we got
    const newItem = new MenuItem(req.body);
    const savedItem = await newItem.save();
    console.log("saved!");
    res.status(201).json(savedItem);
  } catch (error) {
    console.log("error wtf", error);
    res.status(400).json({ message: 'Error adding menu item', error: error.message });
  }
};

// update existing
const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    // new: true so it returns the updated one
    const updatedItem = await MenuItem.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: 'Error updating menu item', error: error.message });
  }
};

// delete by id
const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await MenuItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting menu item', error: error.message });
  }
};

module.exports = {
  getAllMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem
};
