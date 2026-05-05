/**
 * One-time script to drop the stale unique index "level_1" on the courses collection.
 * This index prevents creating multiple levels with the same level number across courses.
 * Run: node scripts/dropStaleIndex.js
 */
require('dotenv').config();
const mongoose = require('mongoose');

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    const collection = db.collection('courses');

    // List current indexes
    const indexes = await collection.indexes();
    console.log('Current indexes on "courses":');
    indexes.forEach(idx => console.log(`  - ${idx.name}:`, JSON.stringify(idx.key)));

    // Drop the stale unique index if it exists
    const staleIndex = indexes.find(idx => idx.name === 'level_1');
    if (staleIndex) {
      await collection.dropIndex('level_1');
      console.log('\n✅ Dropped stale index "level_1" successfully!');
    } else {
      console.log('\nIndex "level_1" not found — already removed or named differently.');
      // Try to find any unique index on "level" field
      const levelIndex = indexes.find(idx => idx.key && idx.key.level && idx.unique);
      if (levelIndex) {
        console.log(`Found unique index on level field: "${levelIndex.name}" — dropping it...`);
        await collection.dropIndex(levelIndex.name);
        console.log(`✅ Dropped "${levelIndex.name}" successfully!`);
      } else {
        console.log('No unique index on "level" field found. You should be good!');
      }
    }

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();
