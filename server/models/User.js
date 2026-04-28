const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  phone: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  completedModules: {
    type: [String],
    default: []
  },
  lastViewedModuleId: {
    type: String,
    default: null
  },
  quizAnswers: {
    type: Map,
    of: [Number],
    default: {}
  },
  currentStreak: {
    type: Number,
    default: 0
  },
  longestStreak: {
    type: Number,
    default: 0
  },
  lastActivityDate: {
    type: Date,
    default: null
  },
  resetOTP: {
    type: String
  },
  resetOTPExpires: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
