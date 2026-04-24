require('dotenv').config({ path: './server/.env' });
const mongoose = require('mongoose');
const User = require('../models/User');

const listUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const users = await User.find({}, 'name email role');
    console.log('--- Registered Users ---');
    users.forEach(u => console.log(`${u.name} (${u.email}) - Role: ${u.role}`));
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

listUsers();
