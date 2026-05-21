require('dotenv').config({ path: './server/.env' });
const mongoose = require('mongoose');
const Module = require('../models/Module');

const videos = {
  1: 'qJomQCsVThg',
  2: 'gaPzJOv0jBQ',
  3: 'wDropQ4c2lc',
  4: '_KGyboklyfk',
  5: 'hjOKmg1X1zY',
};

const levelId = '6a0f39a035da1ce375578920';

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  for (const [num, id] of Object.entries(videos)) {
    const r = await Module.findOneAndUpdate(
      { courseId: levelId, number: parseInt(num) },
      { videoId: id },
      { new: true }
    );
    console.log(`✓ Lecture ${num} - ${r.title} → ${id}`);
  }
  console.log('\n✅ All video IDs updated!');
  mongoose.disconnect();
}).catch(e => console.error(e.message));
