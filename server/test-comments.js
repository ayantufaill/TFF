require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const Comment = mongoose.model('Comment', new mongoose.Schema({}, { strict: false }));
  const comments = await Comment.find().lean();
  console.log(JSON.stringify(comments, null, 2));
  process.exit();
}).catch(console.error);
