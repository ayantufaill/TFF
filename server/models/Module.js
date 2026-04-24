const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  videoId: {
    type: String
  },
  topics: {
    type: [String],
    default: []
  },
  formats: {
    type: [String],
    default: ['Reading guide', 'Short video']
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

const Module = mongoose.model('Module', moduleSchema);

module.exports = Module;
