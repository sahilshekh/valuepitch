const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// Import route files
const clientRoutes = require('./routes/clientRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');

// Import middlewares
const jwtAuthenticationMiddleware = require('./middleware/JWTAuthenticationMiddlewar');
const adminMiddleware = require('./middleware/adminMiddleware');
const reportRoutes = require('./routes/reportRoutes');
// Initialize Express app
const app = express();

// Middleware for JSON and CORS
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Public Auth Routes
app.use('/api', authRoutes);
app.use('/api/reports', reportRoutes);
// Client Routes (protected by JWT)
app.use('/api/clients', jwtAuthenticationMiddleware, clientRoutes);

// User Routes (protected by JWT)
app.use('/api/users', jwtAuthenticationMiddleware, userRoutes);

// Admin Routes (JWT + Admin Middleware)
app.use('/api/admin', jwtAuthenticationMiddleware, adminMiddleware, adminRoutes);

// Error handling (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
