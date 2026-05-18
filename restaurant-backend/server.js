require('dotenv').config();
const connectDB = require('./src/utils/db');
const app = require('./app');

// default port or from env
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // gotta connect to db first
    await connectDB();
    
    // start it up
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server', error);
  }
};

// go
startServer();
