const mongoose = require('mongoose');

const mainCourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=600&auto=format&fit=crop'
  },
  category: {
    type: String,
    default: 'General'
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const MainCourse = mongoose.model('MainCourse', mainCourseSchema);

module.exports = MainCourse;
