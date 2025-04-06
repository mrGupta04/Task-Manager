import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path'; // Required for static file handling
import sequelize from './config/db';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Static files (uploads & React build)
app.use('/uploads', express.static('uploads'));

// ✅ Serve React's static files (if in production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// API Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

// ✅ Let React handle all client-side routes
app.get('*', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  } else {
    res.redirect('/'); // Fallback for development
  }
});

// Error handling
app.use(errorHandler);

// Start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});