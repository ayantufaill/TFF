const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 150
    },
    city: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    interest: {
      type: String,
      required: true,
      enum: ['Mentor & Support', 'Teach & Educate', 'On-Ground Support', 'Skills & Media']
    },
    availability: {
      type: String,
      required: true,
      enum: ['Weekdays', 'Weekends', 'Flexible']
    },
    skills: {
      type: String,
      trim: true,
      maxlength: 300,
      default: ''
    },
    message: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: ''
    }
  },
  { timestamps: true }
);

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

module.exports = Volunteer;
