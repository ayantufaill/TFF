const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  correctAnswerIndex: {
    type: Number,
    required: true
  }
});

const assessmentSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
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
  description: {
    type: String
  },
  passingScore: {
    type: Number,
    default: 60
  },
  questions: [questionSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Assessment = mongoose.model('Assessment', assessmentSchema);

module.exports = Assessment;
