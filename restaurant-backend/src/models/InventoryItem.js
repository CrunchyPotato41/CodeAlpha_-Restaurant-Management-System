const mongoose = require('mongoose');

// Define the InventoryItem schema
const inventoryItemSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  unit: { 
    type: String, 
    required: true // e.g., 'kg', 'liters', 'pieces'
  },
  quantityInStock: { 
    type: Number, 
    required: true 
  },
  lowStockThreshold: { 
    type: Number, 
    required: true 
  }
}, { 
  timestamps: true 
});

// Export the InventoryItem model
module.exports = mongoose.model('InventoryItem', inventoryItemSchema);
