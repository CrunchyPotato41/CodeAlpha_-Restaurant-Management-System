const jwt = require('jsonwebtoken');

// Middleware to verify the JWT token
const protect = async (req, res, next) => {
  try {
    let token;

    // Read the token from the Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using our secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the decoded user information to the request
      req.user = decoded;

      // Move to the next function
      next();
    } else {
      // If there's no token, return 401 Unauthorized
      return res.status(401).json({ message: 'Not authorized, no token provided' });
    }
  } catch (error) {
    // If the token is invalid or expired
    res.status(401).json({ message: 'Not authorized, invalid token', error: error.message });
  }
};

module.exports = { protect };
