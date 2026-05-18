const Table = require('../models/Table');

// get tables
const getAllTables = async (req, res) => {
  try {
    const tables = await Table.find();
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tables', error: error.message });
  }
};

// create a new table
const addTable = async (req, res) => {
  try {
    const newTable = new Table(req.body);
    const savedTable = await newTable.save();
    res.status(201).json(savedTable);
  } catch (error) {
    res.status(400).json({ message: 'Error adding table', error: error.message });
  }
};

// update table status
const updateTableStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // only update status, nothing else
    const updatedTable = await Table.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true } // make sure it matches enum
    );

    if (!updatedTable) {
      return res.status(404).json({ message: 'Table not found' });
    }

    res.status(200).json(updatedTable);
  } catch (error) {
    res.status(400).json({ message: 'Error updating table status', error: error.message });
  }
};

module.exports = {
  getAllTables,
  addTable,
  updateTableStatus
};
