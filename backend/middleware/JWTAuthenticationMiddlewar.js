const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const jwtAuthenticationMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Get token from header
  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded token data to request object
    next(); // Proceed to the next middleware or route
  } catch (err) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = jwtAuthenticationMiddleware;
