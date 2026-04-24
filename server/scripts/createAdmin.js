require('dotenv').config({ path: './server/.env' });
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createAdmin = async () => {
  const email = 'admin@tff.com';
  const password = 'Admin123!';
  const name = 'TFF Admin';

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    let user = await User.findOne({ email });
    
    if (user) {
      console.log('⚠️  User already exists. Updating role to admin...');
      user.role = 'admin';
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      console.log('✅ Admin updated successfully!');
    } else {
      console.log('📝 Creating new admin user...');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      user = new User({
        name,
        email,
        password: hashedPassword,
        role: 'admin'
      });
      
      await user.save();
      console.log('✅ Admin user created successfully!');
    }
    process.exit();
  } catch (err) {
    console.error('❌ Error creating admin:', err);
    process.exit(1);
  }
};

createAdmin();
