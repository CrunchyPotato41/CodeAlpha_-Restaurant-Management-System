const mongoose = require('mongoose');

// Define the structure for individual items inside an order
const orderItemSchema = new mongoose.Schema({
  menuItemId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'MenuItem', 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true,
    min: 1
  },
  unitPrice: { 
    type: Number, 
    required: true 
  }
});

// Define the Order schema
const orderSchema = new mongoose.Schema({
  tableId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Table', 
    required: true 
  },
  items: [orderItemSchema], // Array of order items
  totalAmount: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'in-progress', 'completed'], 
    default: 'pending' 
  }
}, { 
  // Automatically adds createdAt and updatedAt
  timestamps: true 
});

// Export the Order model
module.exports = mongoose.model('Order', orderSchema);
