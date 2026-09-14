const mongoose = require('mongoose');

const mentorRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    contact: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150
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

const MentorRequest = mongoose.model('MentorRequest', mentorRequestSchema);

module.exports = MentorRequest;
