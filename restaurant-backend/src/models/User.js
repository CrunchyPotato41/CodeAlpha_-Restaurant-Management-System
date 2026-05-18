const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  passwordHash: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    default: 'admin' 
  }
}, { 
  timestamps: true 
});

// Export the User model
module.exports = mongoose.model('User', userSchema);
