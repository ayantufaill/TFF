export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface Quiz {
  levelId: string;
  title: string;
  description: string;
  passingScore: number;
  questions: QuizQuestion[];
}

const ramadanQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "During Ramadan, from what time do Muslims begin their fast each day?",
    options: [
      "Sunrise (Fajr Adhan)",
      "Midnight",
      "Before Fajr Adhan (Suhoor time ends)",
      "After Fajr prayer is completed"
    ],
    correctAnswerIndex: 2
  },
  {
    id: "q2",
    question: "What is the meal called that Muslims eat before the fast begins at dawn?",
    options: [
      "Iftar",
      "Suhoor",
      "Sahur al-Kabeer",
      "Qiyaam"
    ],
    correctAnswerIndex: 1
  },
  {
    id: "q3",
    question: "What breaks the fast at sunset in Ramadan?",
    options: [
      "Maghrib prayer",
      "Isha prayer",
      "Iftar — eating/drinking after Maghrib Adhan",
      "Completing Taraweeh prayer"
    ],
    correctAnswerIndex: 2
  },
  {
    id: "q4",
    question: "Which of the following does NOT invalidate the fast?",
    options: [
      "Eating intentionally",
      "Drinking water",
      "Forgetting and eating accidentally",
      "Intentional vomiting"
    ],
    correctAnswerIndex: 2
  },
  {
    id: "q5",
    question: "Who is EXEMPT from fasting during Ramadan?",
    options: [
      "Healthy adult men only",
      "All Muslims above age 10",
      "Travelers, the ill, pregnant/nursing women, and the elderly",
      "Only children under 7"
    ],
    correctAnswerIndex: 2
  },
  {
    id: "q6",
    question: "What is the ruling on making up missed fasts (Qada)?",
    options: [
      "It is optional",
      "It is obligatory to make them up before the next Ramadan",
      "Missed fasts cannot be made up",
      "Only one missed fast needs to be made up"
    ],
    correctAnswerIndex: 1
  },
  {
    id: "q7",
    question: "What is the name of the night in the last 10 days of Ramadan considered better than 1,000 months?",
    options: [
      "Laylatul Miraj",
      "Laylatul Qadr",
      "Laylatul Bara'at",
      "Laylatul Jumuah"
    ],
    correctAnswerIndex: 1
  },
  {
    id: "q8",
    question: "Which of the following IS allowed while fasting?",
    options: [
      "Smoking",
      "Taking oral medicine",
      "Using a Miswak (teeth-cleaning stick)",
      "Drinking water due to thirst"
    ],
    correctAnswerIndex: 2
  },
  {
    id: "q9",
    question: "What is the charity that must be given at the end of Ramadan before Eid prayer?",
    options: [
      "Zakat al-Maal",
      "Sadaqah Nafilah",
      "Zakat al-Fitr (Fitrana)",
      "Kaffarah"
    ],
    correctAnswerIndex: 2
  },
  {
    id: "q10",
    question: "What is the special nightly prayer performed during Ramadan called?",
    options: [
      "Tahajjud",
      "Ishraq",
      "Taraweeh",
      "Duha"
    ],
    correctAnswerIndex: 2
  }
];

export const levelQuizzes: Record<string, Quiz> = {
  "1": {
    levelId: "1",
    title: "Level 1 Assessment",
    description: "Test your knowledge to unlock Level 2.",
    passingScore: 60,
    questions: ramadanQuestions
  },
  "2": {
    levelId: "2",
    title: "Level 2 Assessment",
    description: "Test your knowledge to unlock Level 3.",
    passingScore: 60,
    questions: ramadanQuestions
  },
  "3": {
    levelId: "3",
    title: "Level 3 Assessment",
    description: "Test your knowledge to unlock Level 4.",
    passingScore: 60,
    questions: ramadanQuestions
  },
  "4": {
    levelId: "4",
    title: "Level 4 Assessment",
    description: "Test your knowledge to unlock Level 5.",
    passingScore: 60,
    questions: ramadanQuestions
  },
  "5": {
    levelId: "5",
    title: "Level 5 Assessment",
    description: "Final assessment on Ramadan & Fasting.",
    passingScore: 60,
    questions: ramadanQuestions
  }
};
