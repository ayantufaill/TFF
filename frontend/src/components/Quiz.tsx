import React, { useState } from 'react';
import { Quiz as QuizType } from '../data/quizData';
import { ChevronRight, ChevronLeft, CheckCircle, XCircle, RefreshCw, ArrowLeft, Check } from 'lucide-react';

interface QuizProps {
  quiz: any;
  onComplete: (passed: boolean) => void;
  isFinalLevel?: boolean;
  onViewCertificate?: () => void;
  alreadyPassed?: boolean;
}

export const Quiz: React.FC<QuizProps> = ({ quiz, onComplete, isFinalLevel, onViewCertificate, alreadyPassed }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(alreadyPassed || false);
  const [score, setScore] = useState(alreadyPassed ? 100 : 0);
  const [reviewMode, setReviewMode] = useState(false);

  const question = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const handleSelectOption = (optionIndex: number) => {
    setAnswers({ ...answers, [currentQuestionIndex]: optionIndex });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      calculateResults();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateResults = () => {
    let correct = 0;
    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswerIndex) {
        correct++;
      }
    });
    const percentage = (correct / quiz.questions.length) * 100;
    setScore(percentage);
    setShowResults(true);
  };

  const handleRetry = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setScore(0);
    setReviewMode(false);
  };

  const handleContinue = () => {
    onComplete(true);
  };

  if (reviewMode) {
    return (
      <>
        <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(44, 95, 45, 0.2);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(44, 95, 45, 0.4);
          }
        `}</style>
        <div className="w-full max-w-full mx-auto bg-white rounded-2xl shadow-[0_10px_40px_rgba(44,95,45,0.08)] overflow-hidden flex flex-col h-[650px]">
          {/* Header */}
          <div className="p-6 bg-gray-50 border-b border-gray-100 flex-shrink-0 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#2C5F2D]">Review Questions</h2>
              <p className="text-sm text-gray-500">Your Score: {score}%</p>
            </div>
            <button
              onClick={() => setReviewMode(false)}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-semibold"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Results
            </button>
          </div>

          {/* Scrollable Questions List */}
          <div className="flex-1 overflow-y-auto p-8 space-y-12 bg-white scroll-smooth custom-scrollbar">
            {quiz.questions.map((q, qIndex) => {
              const userAnswer = answers[qIndex];
              const isCorrect = userAnswer === q.correctAnswerIndex;

              return (
                <div key={q.id} className="pb-12 border-b border-gray-100 last:border-0">
                  {/* Question Header */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm font-bold text-[#C9A961] uppercase tracking-wider">
                      Question {qIndex + 1}
                    </span>
                    {isCorrect ? (
                      <span className="flex items-center gap-1.5 text-green-600 font-bold text-sm bg-green-50 px-3 py-1 rounded-full">
                        <CheckCircle className="w-4 h-4" /> Correct
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-red-600 font-bold text-sm bg-red-50 px-3 py-1 rounded-full">
                        <XCircle className="w-4 h-4" /> Incorrect
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-8 leading-tight">
                    {q.question}
                  </h3>

                  {/* Options */}
                  <div className="flex flex-col gap-3">
                    {q.options.map((option, optIndex) => {
                      const isCorrectOption = optIndex === q.correctAnswerIndex;
                      const isUserSelected = userAnswer === optIndex;

                      let borderClass = 'border-gray-200';
                      let bgClass = 'bg-white';
                      let indicatorBorder = 'border-gray-300';
                      let indicatorBg = 'bg-white';

                      if (isCorrectOption) {
                        borderClass = 'border-[#2C5F2D] bg-[#F1F9F4] border-[3px]';
                        indicatorBorder = 'border-[#2C5F2D]';
                        indicatorBg = 'bg-[#2C5F2D]';
                      } else if (isUserSelected && !isCorrect) {
                        borderClass = 'border-red-500 bg-red-50/50';
                        indicatorBorder = 'border-red-500';
                        indicatorBg = 'bg-red-500';
                      }

                      return (
                        <div
                          key={optIndex}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${borderClass} ${bgClass}`}
                        >
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${indicatorBorder} ${indicatorBg}`}>
                            {(isCorrectOption || isUserSelected) && (
                              <div className="w-2.5 h-2.5 rounded-full bg-white" />
                            )}
                          </div>

                          <div className="flex-1 flex items-center justify-between">
                            <span className={`text-lg ${isCorrectOption ? 'text-[#2C5F2D] font-bold' : 'text-gray-700'}`}>
                              {option}
                            </span>

                            {isCorrectOption && (
                              <span className="text-green-600 text-xs font-bold uppercase tracking-widest bg-green-100 px-2 py-0.5 rounded">
                                Correct Answer
                              </span>
                            )}
                            {isUserSelected && !isCorrect && (
                              <span className="text-red-600 text-xs font-bold uppercase tracking-widest bg-red-100 px-2 py-0.5 rounded">
                                Your Selection
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-center flex-shrink-0">
            <button
              onClick={handleRetry}
              className="px-6 py-2 bg-[#2C5F2D] text-white rounded-xl font-bold hover:bg-[#1a3a1b] transition-colors shadow-md flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Try Quiz Again
            </button>
          </div>
        </div>
      </>
    );
  }

  if (showResults) {
    const passed = score >= quiz.passingScore;
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] w-full max-w-full mx-auto p-8 bg-white rounded-2xl shadow-[0_10px_40px_rgba(44,95,45,0.08)]">
        {passed ? (
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Level Passed!</h2>
            <p className="text-lg text-gray-600 mb-6">You scored {score}% on the assessment.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={isFinalLevel && onViewCertificate ? onViewCertificate : handleContinue}
                className="px-8 py-3 bg-[#2C5F2D] text-white rounded-xl font-bold text-lg hover:bg-[#1a3a1b] transition-colors shadow-lg"
              >
                {isFinalLevel ? 'View Certificate' : 'Continue to Next Level'}
              </button>
              <button
                onClick={() => setReviewMode(true)}
                className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                View Questions
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Almost There!</h2>
            <p className="text-lg text-gray-600 mb-2">You scored {score}%. A score of {quiz.passingScore}% is required to pass.</p>
            <p className="text-sm text-gray-500 mb-6">Review the material and try again.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleRetry}
                className="px-8 py-3 bg-white border-2 border-[#2C5F2D] text-[#2C5F2D] rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" /> Try Again
              </button>
              <button
                onClick={() => setReviewMode(true)}
                className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                View Questions
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full max-w-full mx-auto bg-white rounded-2xl shadow-[0_10px_40px_rgba(44,95,45,0.08)] overflow-hidden flex flex-col h-full min-h-[400px]">
      {/* Header */}
      <div className="p-6 bg-gray-50 border-b border-gray-100 flex-shrink-0">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#2C5F2D]">{quiz.title}</h2>
          <span className="text-sm font-semibold text-gray-500">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </span>
        </div>
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#2C5F2D] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex-1 flex flex-col overflow-y-auto">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 leading-tight">
          {question.question}
        </h3>

        <div className="flex flex-col gap-3 flex-1">
          {question.options.map((option, index) => {
            const isSelected = answers[currentQuestionIndex] === index;
            return (
              <button
                key={index}
                onClick={() => handleSelectOption(index)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${isSelected
                  ? 'border-[#C9A961] bg-[#C9A961]/5 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${isSelected ? 'border-[#C9A961] bg-[#C9A961]' : 'border-gray-300 bg-white'
                  }`}>
                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                </div>
                <span className={`text-lg ${isSelected ? 'text-gray-900 font-semibold' : 'text-gray-700'}`}>
                  {option}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-100 flex justify-between items-center bg-gray-50 flex-shrink-0">
        <button
          onClick={handlePrev}
          disabled={currentQuestionIndex === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors ${currentQuestionIndex === 0
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-200'
            }`}
        >
          <span className="py-1"><ChevronLeft className="w-5 h-5 inline-block mr-1 -mt-0.5" /> Previous</span>
        </button>

        <button
          onClick={handleNext}
          disabled={answers[currentQuestionIndex] === undefined}
          className={`flex items-center gap-2 px-10 py-3 text-lg rounded-xl font-bold transition-all shadow-md ${answers[currentQuestionIndex] === undefined
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-[#2C5F2D] text-white hover:bg-[#1a3a1b] hover:-translate-y-0.5 hover:shadow-lg'
            }`}
        >
          <span className="py-2">
            {isLastQuestion ? 'Submit Assessment' : 'Next Question'}
          </span>
          {!isLastQuestion && <ChevronRight className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
