require('dotenv').config({ path: './server/.env' });
const mongoose = require('mongoose');
const Module = require('../models/Module');
const Assessment = require('../models/Assessment');

const levelId = '6a0f39a035da1ce375578920';

const extraQuestions = {
  1: [
    {
      question: 'Which Surah states "Indeed, the religion in the sight of Allah is Islam"?',
      options: ['Surah Al-Baqarah', 'Surah Aal-e-Imran', 'Surah Al-Ikhlas', 'Surah Al-Fatiha'],
      correctAnswerIndex: 1,
    },
    {
      question: 'When someone accepts Islam, they become part of:',
      options: ['A political group', 'The global Ummah', 'A local community only', 'A religious school'],
      correctAnswerIndex: 1,
    },
  ],
  2: [
    {
      question: 'How many daily prayers (Salah) are obligatory in Islam?',
      options: ['3', '7', '5', '2'],
      correctAnswerIndex: 2,
    },
    {
      question: 'What is Sujood?',
      options: ['Standing', 'Bowing', 'Prostration', 'Sitting'],
      correctAnswerIndex: 2,
    },
  ],
  3: [
    {
      question: 'What does Niyyah mean?',
      options: ['Charity', 'Intention', 'Prayer', 'Fasting'],
      correctAnswerIndex: 1,
    },
    {
      question: 'Which of these is a recommended after-Salah practice?',
      options: ['Making dua', 'Sleeping immediately', 'Eating', 'Leaving quickly'],
      correctAnswerIndex: 0,
    },
  ],
  4: [
    {
      question: 'What are the vowel signs in Arabic called?',
      options: ['Tajweed', 'Harakat', 'Makhraj', 'Waqf'],
      correctAnswerIndex: 1,
    },
    {
      question: 'According to Hadith, who receives extra reward in Quran learning?',
      options: ['Those who memorize fastest', 'Those who recite loudly', 'Those who struggle while reading', 'Those who teach only'],
      correctAnswerIndex: 2,
    },
  ],
  5: [
    {
      question: 'What should a Muslim say before eating?',
      options: ['Alhamdulillah', 'Bismillah', 'SubhanAllah', 'Allahu Akbar'],
      correctAnswerIndex: 1,
    },
    {
      question: 'Dua means:',
      options: ['Fasting', 'Giving charity', 'Speaking to Allah', 'Quran recitation'],
      correctAnswerIndex: 2,
    },
  ],
};

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  for (const [num, questions] of Object.entries(extraQuestions)) {
    const mod = await Module.findOne({ courseId: levelId, number: parseInt(num) });
    if (!mod) { console.log(`❌ Module ${num} not found`); continue; }

    const assessment = await Assessment.findOne({ courseId: mod._id });
    if (!assessment) { console.log(`❌ Quiz for Lecture ${num} not found`); continue; }

    assessment.questions.push(...questions);
    await assessment.save();
    console.log(`✓ Lecture ${num} quiz → ${assessment.questions.length} questions`);
  }
  console.log('\n✅ All quizzes expanded to 5 questions!');
  mongoose.disconnect();
}).catch(e => console.error(e.message));
