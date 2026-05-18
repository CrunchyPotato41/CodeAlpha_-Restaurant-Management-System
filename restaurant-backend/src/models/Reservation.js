const mongoose = require('mongoose');

// Define the Reservation schema
const reservationSchema = new mongoose.Schema({
  customerName: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  tableId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Table', 
    required: true 
  },
  date: { 
    type: String, 
    required: true 
  },
  time: { 
    type: String, 
    required: true 
  },
  partySize: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['confirmed', 'cancelled'], 
    default: 'confirmed' 
  }
}, { 
  timestamps: true 
});

// Export the Reservation model
module.exports = mongoose.model('Reservation', reservationSchema);
