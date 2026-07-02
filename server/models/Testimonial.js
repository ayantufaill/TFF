const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    mainCourseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MainCourse',
      required: true
    },
    text: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
      maxlength: 3000
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: null
    },
    profileImageUrl: {
      type: String,
      default: null
    },
    videoUrl: {
      type: String,
      default: null
    },
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED', 'HIDDEN'],
      default: 'PENDING',
      index: true
    },
    adminNotes: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: ''
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    reviewedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

testimonialSchema.index({ userId: 1, mainCourseId: 1 }, { unique: true });
testimonialSchema.index({ status: 1, createdAt: -1 });

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
