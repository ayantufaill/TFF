require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const courseRoutes = require('./routes/courses');
const commentRoutes = require('./routes/comments');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'TFF API',
    routes: ['/api/auth', '/api/user', '/api/courses', '/api/comments']
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/comments', commentRoutes);

// Database Connection
if (process.env.MONGODB_URI.includes('cluster0.mongodb.net')) {
  console.warn('\n⚠️  WARNING: You are using a placeholder MongoDB URI.');
  console.warn('Please follow these steps:');
  console.warn('1. Go to https://www.mongodb.com/cloud/atlas');
  console.warn('2. Create a FREE cluster.');
  console.warn('3. Get your connection string and replace it in server/.env');
  console.warn('--------------------------------------------------\n');
}

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ Could not connect to MongoDB:');
    console.error('Original Error:', err.message); // Added for debugging
    if (err.message.includes('Authentication failed')) {
      console.error('   Tip: Your database password in server/.env might be incorrect.');
    } else if (err.message.includes('ECONNREFUSED') || err.message.includes('Server selection timed out')) {
      console.error('   Tip: Make sure your IP is allowlisted in MongoDB Atlas Network Access.');
    }
    console.log('--------------------------------------------------');
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
