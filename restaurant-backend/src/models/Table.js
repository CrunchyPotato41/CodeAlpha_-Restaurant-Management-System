const mongoose = require('mongoose');

// Define the Table schema
const tableSchema = new mongoose.Schema({
  tableNumber: { 
    type: Number, 
    required: true, 
    unique: true 
  },
  capacity: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['available', 'occupied', 'reserved'], 
    default: 'available' 
  }
}, { 
  timestamps: true 
});

// Export the Table model
module.exports = mongoose.model('Table', tableSchema);
