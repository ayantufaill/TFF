require('dotenv').config({ path: './server/.env' });
const mongoose = require('mongoose');
const User = require('../models/User');

const emails = ['huzaifaras10@gmail.com', 'ayantufail.tdc@gmail.com'];

const demote = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    for (const email of emails) {
      const user = await User.findOneAndUpdate({ email }, { role: 'user' }, { new: true });
      if (user) {
        console.log(`✅ User ${email} demoted to user.`);
      } else {
        console.log(`❌ User ${email} not found.`);
      }
    }
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

demote();
