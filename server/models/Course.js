const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  mainCourseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MainCourse',
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String
  },
  description: {
    type: String
  },
  color: {
    type: String,
    default: 'from-[#2C5F2D] to-[#4A8B4D]'
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

// Compound index to ensure level uniqueness WITHIN a specific course,
// but allow same level numbers across DIFFERENT courses.
courseSchema.index({ mainCourseId: 1, level: 1 }, { unique: true });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
