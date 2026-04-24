require('dotenv').config({ path: './server/.env' });
const mongoose = require('mongoose');
const User = require('../models/User');

const email = process.argv[2];

if (!email) {
  console.error('Please provide an email: node server/scripts/promoteAdmin.js user@example.com');
  process.exit(1);
}

const promote = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const user = await User.findOneAndUpdate({ email }, { role: 'admin' }, { new: true });
    if (user) {
      console.log(`✅ User ${email} promoted to admin!`);
    } else {
      console.log(`❌ User ${email} not found.`);
    }
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

promote();
