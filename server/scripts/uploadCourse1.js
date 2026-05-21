require('dotenv').config({ path: './server/.env' });
const mongoose = require('mongoose');
const MainCourse = require('../models/MainCourse');
const Course = require('../models/Course');
const Module = require('../models/Module');
const Assessment = require('../models/Assessment');

const MONGODB_URI = process.env.MONGODB_URI;

const courseData = {
  mainCourse: {
    title: 'New Reverts Path',
    description: 'A complete foundational course designed for new Muslims and reverts — covering faith, worship, Quran, and daily Islamic living step by step.',
    category: 'Foundation',
    order: 1,
  },
  level: {
    level: 1,
    title: 'First Steps to Islam',
    subtitle: 'Beginner / New Reverts',
    color: 'from-[#1B2A4A] to-[#2D4A8A]',
    order: 1,
  },
  modules: [
    {
      number: 1,
      title: 'Welcome to Islam',
      description: 'This lecture welcomes new Muslims into Islam by explaining the foundations of faith, understanding Allah, Prophet Muhammad ﷺ, emotional challenges of reverts, and how to begin the journey step by step.',
      videoId: '',
      topics: ['Tawheed (Oneness of Allah)', 'Prophet Muhammad ﷺ', 'Purpose of Islam', 'Emotional adjustment after accepting Islam', 'Importance of patience and consistency'],
      quiz: {
        title: 'Welcome to Islam Quiz',
        passingScore: 70,
        questions: [
          { question: 'What does Tawheed mean?', options: ['Charity', 'Oneness of Allah', 'Prayer', 'Fasting'], correctAnswerIndex: 1 },
          { question: 'Prophet Muhammad ﷺ is:', options: ['A king', 'A scholar only', 'The final messenger of Allah', 'An angel'], correctAnswerIndex: 2 },
          { question: 'Islam teaches:', options: ['Instant perfection', 'Gradual progress and consistency', 'Isolation from society', 'Worship without understanding'], correctAnswerIndex: 1 },
        ],
      },
    },
    {
      number: 2,
      title: 'Building Salah, Wudu & Daily Connection with Allah',
      description: 'Learn how to perform Wudu and Salah step-by-step. Understand the spiritual meaning of prayer, build consistency, improve focus (Khushu), and develop a daily Islamic routine.',
      videoId: '',
      topics: ['Importance of Salah', 'Complete Wudu method', 'Basic Salah structure', 'Common mistakes in prayer', 'Building Khushu (focus)'],
      quiz: {
        title: 'Salah & Wudu Quiz',
        passingScore: 70,
        questions: [
          { question: 'What is required before Salah?', options: ['Fasting', 'Wudu', 'Charity', 'Sleep'], correctAnswerIndex: 1 },
          { question: 'Salah is:', options: ['Optional', 'Cultural practice', 'Daily connection with Allah', 'Only for scholars'], correctAnswerIndex: 2 },
          { question: 'Khushu means:', options: ['Loud recitation', 'Presence and focus in prayer', 'Long prayer', 'Memorization only'], correctAnswerIndex: 1 },
        ],
      },
    },
    {
      number: 3,
      title: 'Building an Islamic Lifestyle After Salah',
      description: 'Learn how to build an Islamic lifestyle through small consistent actions, daily remembrance, discipline, and intentional living beyond the prayer mat.',
      videoId: '',
      topics: ['Daily Dhikr & remembrance', 'Consistency in worship', 'Cleanliness and discipline', 'Islamic manners and behavior', 'Intention in daily actions'],
      quiz: {
        title: 'Islamic Lifestyle Quiz',
        passingScore: 70,
        questions: [
          { question: 'Islam encourages:', options: ['Instant perfection', 'Small consistent actions', 'Isolation from society', 'Worship only in mosques'], correctAnswerIndex: 1 },
          { question: 'Saying "Astaghfirullah" after Salah is:', options: ['Forbidden', 'A Sunnah practice', 'Only for scholars', 'Optional without benefit'], correctAnswerIndex: 1 },
          { question: 'In Islam, ordinary actions can become worship when:', options: ['Done publicly', 'Done perfectly', 'Done with correct intention', 'Done quickly'], correctAnswerIndex: 2 },
        ],
      },
    },
    {
      number: 4,
      title: 'Learning the Quran, Tajweed & Essential Surahs',
      description: 'Learn how to start reading the Quran step-by-step. Understand Arabic letters, Quran pronunciation, Tajweed basics, and memorize essential Surahs needed for daily Salah.',
      videoId: '',
      topics: ['Importance of Quran learning', 'Arabic letter recognition', 'Basic Tajweed understanding', 'Memorizing essential Surahs', 'Building connection with Quran'],
      quiz: {
        title: 'Quran & Tajweed Quiz',
        passingScore: 70,
        questions: [
          { question: 'Tajweed means:', options: ['Memorizing fast', 'Reading Quran correctly', 'Translating Quran', 'Writing Arabic'], correctAnswerIndex: 1 },
          { question: 'Which Surah is recited in every Rak\'ah?', options: ['Surah Ikhlas', 'Surah Falaq', 'Surah Al-Fatiha', 'Surah Nas'], correctAnswerIndex: 2 },
          { question: 'The best way to improve Quran reading is:', options: ['Rushing lessons', 'Practicing consistently', 'Avoiding repetition', 'Memorizing without understanding'], correctAnswerIndex: 1 },
        ],
      },
    },
    {
      number: 5,
      title: 'Dhikr, Daily Duas & Building a Consistent Islamic Routine',
      description: 'Learn how to stay connected with Allah throughout your day through Dhikr, daily duas, and simple Islamic habits. Build a sustainable spiritual routine through small consistent actions.',
      videoId: '',
      topics: ['Understanding Dhikr', 'Daily remembrance (SubhanAllah, Alhamdulillah, Allahu Akbar)', 'Morning & evening duas', 'Building daily Islamic routine', 'Consistency & transformation'],
      quiz: {
        title: 'Dhikr & Daily Routine Quiz',
        passingScore: 70,
        questions: [
          { question: 'Dhikr means:', options: ['Reading history', 'Remembering Allah', 'Studying Arabic only', 'Giving charity'], correctAnswerIndex: 1 },
          { question: 'Which of the following is Dhikr?', options: ['SubhanAllah', 'Allahu Akbar', 'Alhamdulillah', 'All of the above'], correctAnswerIndex: 3 },
          { question: 'The best routine is:', options: ['Difficult and overwhelming', 'Inconsistent but long', 'Small and consistent', 'Random worship'], correctAnswerIndex: 2 },
        ],
      },
    },
  ],
};

async function upload() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  // 1. Create Main Course
  const main = new MainCourse(courseData.mainCourse);
  await main.save();
  console.log('✓ MainCourse created:', main._id);

  // 2. Create Level
  const level = new Course({ ...courseData.level, mainCourseId: main._id });
  await level.save();
  console.log('✓ Level created:', level._id);

  // 3. Create Modules + Quizzes
  for (const mod of courseData.modules) {
    const { quiz, ...moduleFields } = mod;
    const module = new Module({ ...moduleFields, courseId: level._id });
    await module.save();
    console.log(`  ✓ Module ${mod.number} created: ${mod.title}`);

    const assessment = new Assessment({
      courseId: module._id,
      level: mod.number,
      title: quiz.title,
      description: `Quiz for Lecture ${mod.number}`,
      passingScore: quiz.passingScore,
      questions: quiz.questions,
    });
    await assessment.save();
    console.log(`  ✓ Quiz created for Module ${mod.number}`);
  }

  console.log('\n✅ Course 1 uploaded successfully!');
  await mongoose.disconnect();
}

upload().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
