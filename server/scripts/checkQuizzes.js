require('dotenv').config({ path: './server/.env' });
const mongoose = require('mongoose');
const Module = require('../models/Module');
const Assessment = require('../models/Assessment');

const levelId = '6a0f39a035da1ce375578920';

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const modules = await Module.find({ courseId: levelId }).sort({ number: 1 });
  for (const m of modules) {
    const a = await Assessment.findOne({ courseId: m._id });
    console.log(`Lecture ${m.number} | module._id: ${m._id} | quiz: ${a ? a.questions.length + ' questions' : 'NOT FOUND'}`);
  }
  mongoose.disconnect();
});
