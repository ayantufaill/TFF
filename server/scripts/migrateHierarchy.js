require('dotenv').config({ path: './server/.env' });
const mongoose = require('mongoose');
const MainCourse = require('../models/MainCourse');
const Course = require('../models/Course');

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Create a default Main Course
    let mainCourse = await MainCourse.findOne({ title: 'Islamic Foundations' });
    if (!mainCourse) {
      mainCourse = new MainCourse({
        title: 'Islamic Foundations',
        description: 'A comprehensive, step-by-step journey to help you understand and practice Islam with confidence.',
        image: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=600&auto=format&fit=crop',
        category: 'Foundations',
        order: 1
      });
      await mainCourse.save();
      console.log('📝 Created default Main Course: Islamic Foundations');
    }

    // Update all levels that don't have a mainCourseId
    const result = await Course.updateMany(
      { mainCourseId: { $exists: false } },
      { $set: { mainCourseId: mainCourse._id } }
    );

    console.log(`✅ Migrated ${result.modifiedCount} levels to Islamic Foundations.`);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

migrate();
