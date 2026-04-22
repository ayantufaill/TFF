import React, { useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router';
import {
  ChevronLeft,
  Play,
  CheckCircle,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../context/AuthContext';
import SecurePlayer from '../components/SecurePlayer';
import { Card, CardContent } from '../components/ui/card';
import { Progress } from '../components/ui/progress';

import { trainingLevels } from '../data/trainingData';
import { levelQuizzes } from '../data/quizData';
import Quiz from '../components/Quiz';

export function ModulePlayerPage() {
  const { levelId, moduleId } = useParams();
  const navigate = useNavigate();
  const { user, updateProgress } = useAuth();

  const currentLevel = trainingLevels.find(l => String(l.level) === levelId) || trainingLevels[0];
  const currentModule = currentLevel.modules.find(m => String(m.number) === moduleId) || currentLevel.modules[0];

  const isCompleted = user?.completedModules?.includes(`module-${currentModule.number}`);
  const isLastModuleOfLevel = currentLevel.modules[currentLevel.modules.length - 1].number === currentModule.number;
  const hasPassedLevelAssessment = user?.completedModules?.includes(`quiz-${levelId}`);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const shouldShowQuiz = searchParams.get('quiz') === 'true';

  const [isVideoCompleted, setIsVideoCompleted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(shouldShowQuiz && isLastModuleOfLevel);

  // Reset states when module changes
  React.useEffect(() => {
    setIsVideoCompleted(false);
    setShowQuiz(shouldShowQuiz && isLastModuleOfLevel);
  }, [moduleId, levelId, shouldShowQuiz]);

  const handleVideoEnded = () => {
    if (isLastModuleOfLevel) {
      setIsVideoCompleted(true);
    } else {
      updateProgress(`module-${currentModule.number}`);
    }
  };

  const handleQuizComplete = async (passed: boolean) => {
    if (passed) {
      await updateProgress(`module-${currentModule.number}`);
      await updateProgress(`quiz-${levelId}`);
      setShowQuiz(false);
      setIsVideoCompleted(false);
      handleNext();
    }
  };

  const handleNext = () => {
    if (!isCompleted) return;
    const currentIndex = currentLevel.modules.findIndex(m => String(m.number) === moduleId);
    if (currentIndex < currentLevel.modules.length - 1) {
      const nextModule = currentLevel.modules[currentIndex + 1];
      navigate(`/training/module/${levelId}/${nextModule.number}`);
    } else {
      const currentLevelIndex = trainingLevels.findIndex(l => String(l.level) === levelId);
      if (currentLevelIndex < trainingLevels.length - 1) {
        const nextLevel = trainingLevels[currentLevelIndex + 1];
        const nextModule = nextLevel.modules[0];
        navigate(`/training/module/${nextLevel.level}/${nextModule.number}`);
      }
    }
  };

  const handlePrevious = () => {
    const currentIndex = currentLevel.modules.findIndex(m => String(m.number) === moduleId);
    if (currentIndex > 0) {
      const prevModule = currentLevel.modules[currentIndex - 1];
      navigate(`/training/module/${levelId}/${prevModule.number}`);
    } else {
      const currentLevelIndex = trainingLevels.findIndex(l => String(l.level) === levelId);
      if (currentLevelIndex > 0) {
        const prevLevel = trainingLevels[currentLevelIndex - 1];
        const prevModule = prevLevel.modules[prevLevel.modules.length - 1];
        navigate(`/training/module/${prevLevel.level}/${prevModule.number}`);
      }
    }
  };

  const totalModules = 15;
  const completedCount = user?.completedModules?.length || 0;
  const progressValue = (completedCount / totalModules) * 100;

  return (
    <>
      <style>{`
        /* Remove the large footer margin on the module player page */
        footer {
          margin-top: 0 !important;
        }

        .module-page-container {
          display: flex;
          flex-direction: column;
          min-height: calc(100vh - 64px);
          background-color: #FAF8F3;
          font-family: ui-sans-serif, system-ui, sans-serif;
          overflow: auto;
        }

        .module-layout {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-height: 0;
          overflow: visible;
        }
        
        .module-sidebar {
          width: 100%;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          background-color: white;
          border-right: 1px solid #f3f4f6;
          overflow-y: auto;
          box-shadow: 0 20px 50px rgba(44,95,45,0.06);
          z-index: 10;
          align-self: stretch;
        }

        .module-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: visible;
          position: relative;
          align-self: stretch;
          min-height: 0;
        }

        @media (min-width: 768px) {
          .module-page-container {
            min-height: calc(100vh - 80px);
            height: auto;
          }
          .module-layout {
            flex-direction: row;
            align-items: stretch;
          }
          .module-sidebar {
            width: 350px;
            height: auto;
          }
        }

        @media (min-width: 1024px) {
          .module-sidebar {
            width: 400px;
          }
        }
      `}</style>

      <div className="module-page-container">

        {/* ============================================================
            HERO / PROGRESS SECTION - NOW FULL WIDTH
            ============================================================ */}
        <section style={{
          background: '#2C5F2D',
          color: 'white',
          padding: '2rem 2rem',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
          textAlign: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: "url('https://www.transparenttextures.com/patterns/arabesque-thin.png')",
            opacity: 0.05,
          }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
              Training & Support for New Muslims
            </h1>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.9)', marginBottom: '1rem', fontWeight: 500, lineHeight: 1.4 }}>
              A comprehensive, step-by-step journey to help you understand and practice Islam with confidence
            </p>

            {/* Large Progress Card */}
            <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm border-white/20 mt-8 text-left text-white shadow-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white">Your Progress</h3>
                  <span className="text-sm font-bold text-[#C9A961]">{Math.round(progressValue)}% Complete</span>
                </div>
                <div className="h-3 w-full bg-white/20 rounded-full overflow-hidden border border-white/10 mb-2 relative">
                  <div 
                    className="h-full bg-white transition-all duration-700 shadow-[0_0_12px_rgba(255,255,255,0.9)]" 
                    style={{ width: `${progressValue}%` }}
                  />
                </div>
                <p className="text-sm text-gray-200">
                  You have completed {completedCount} out of {totalModules} modules. Keep going!
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="module-layout" style={{ margin: '1rem 0' }}>

          {/* ============================================================
              LEFT COLUMN (SIDEBAR): COURSE MODULES
              ============================================================ */}
          <aside className="module-sidebar custom-scrollbar">

            {/* Sidebar Header */}
            <div style={{
              padding: '1.25rem 1.25rem 1rem',
              borderBottom: '1px solid rgba(44,95,45,0.08)',
              background: 'linear-gradient(180deg, rgba(44,95,45,0.03), transparent)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                <div style={{
                  width: '5px', height: '24px', borderRadius: '4px',
                  background: 'linear-gradient(180deg, #C9A961, #2C5F2D)',
                }} />
                <h3 style={{
                  fontSize: '0.9rem', fontWeight: 900, color: '#2C5F2D',
                  textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0,
                }}>
                  Level {currentLevel.level} - {currentLevel.title}
                </h3>
              </div>
              {/* Progress indicator removed per user request */}
            </div>

            {/* Module List */}
            <div style={{ padding: '0.75rem', flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {currentLevel.modules.map((m, index) => {
                  const isActive = String(m.number) === moduleId;
                  const completed = user?.completedModules?.includes(`module-${m.number}`);
                  const isPrevCompleted = index === 0 ? true : user?.completedModules?.includes(`module-${currentLevel.modules[index - 1].number}`);
                  const isUnlocked = completed || isPrevCompleted || isActive;

                  return (
                    <button
                      key={m.number}
                      onClick={() => {
                        if (isUnlocked) {
                          navigate(`/training/module/${levelId}/${m.number}`);
                        }
                      }}
                      style={{
                        width: '100%', textAlign: 'left',
                        padding: '0.85rem 1rem', borderRadius: '14px',
                        background: isActive
                          ? 'linear-gradient(135deg, rgba(44,95,45,0.06), rgba(201,169,97,0.08))'
                          : 'transparent',
                        border: isActive ? '1.5px solid rgba(201,169,97,0.25)' : '1.5px solid transparent',
                        boxShadow: isActive ? '0 4px 16px rgba(44,95,45,0.06)' : 'none',
                        cursor: isUnlocked ? 'pointer' : 'not-allowed',
                        transition: 'all 0.25s ease',
                        display: 'flex', alignItems: 'center', gap: '0.85rem',
                        position: 'relative',
                        opacity: isUnlocked ? 1 : 0.6,
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive && isUnlocked) {
                          e.currentTarget.style.background = 'rgba(44,95,45,0.03)';
                          e.currentTarget.style.border = '1.5px solid rgba(44,95,45,0.08)';
                          e.currentTarget.style.transform = 'translateX(2px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive && isUnlocked) {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.border = '1.5px solid transparent';
                          e.currentTarget.style.transform = 'translateX(0)';
                        }
                      }}
                    >
                      {/* Active left accent */}
                      {isActive && (
                        <div style={{
                          position: 'absolute', left: 0, top: '20%', bottom: '20%',
                          width: '3px', borderRadius: '0 4px 4px 0',
                          background: 'linear-gradient(180deg, #C9A961, #2C5F2D)',
                        }} />
                      )}

                      {/* Circle indicator */}
                      <div style={{ flexShrink: 0 }}>
                        {completed ? (
                          <div style={{
                            width: '36px', height: '36px', borderRadius: '50%',
                            background: 'linear-gradient(135deg, #2C5F2D, #3a7a3d)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 3px 10px rgba(44,95,45,0.25)',
                          }}>
                            <CheckCircle style={{ width: 17, height: 17, color: 'white' }} />
                          </div>
                        ) : (
                          <div style={{
                            width: '36px', height: '36px', borderRadius: '50%',
                            border: isActive ? '2.5px solid #C9A961' : '2px solid #e0e0e0',
                            background: isActive ? 'rgba(201,169,97,0.08)' : '#fafafa',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.25s ease',
                          }}>
                            <span style={{
                              fontSize: '0.75rem', fontWeight: 800,
                              color: isActive ? '#C9A961' : '#9ca3af',
                            }}>
                              {m.number}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{
                          fontSize: '0.95rem', fontWeight: isActive ? 800 : 600,
                          lineHeight: 1.4, margin: 0,
                          color: isActive ? '#1a1a2e' : completed ? '#2C5F2D' : isUnlocked ? '#555' : '#9ca3af',
                          transition: 'color 0.25s ease',
                        }}>
                          {m.title}
                        </p>
                        {completed && !isActive && (
                          <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>
                            ✓ Completed
                          </span>
                        )}
                      </div>

                      {/* Active play icon */}
                      {isActive && (
                        <div style={{
                          flexShrink: 0, width: '28px', height: '28px', borderRadius: '50%',
                          background: 'linear-gradient(135deg, #C9A961, #d4b872)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: '0 2px 8px rgba(201,169,97,0.3)',
                        }}>
                          <Play style={{ width: 12, height: 12, color: 'white', fill: 'white' }} />
                        </div>
                      )}
                    </button>
                  );
                })}
                
                {/* Level Assessment Quiz Sidebar Item */}
                <button
                  onClick={() => {
                    const lastModule = currentLevel.modules[currentLevel.modules.length - 1];
                    if (currentModule.number === lastModule.number) {
                      setShowQuiz(true);
                    } else {
                      navigate(`/training/module/${levelId}/${lastModule.number}?quiz=true`);
                    }
                  }}
                  style={{
                    width: '100%', textAlign: 'left',
                    padding: '0.85rem 1rem', borderRadius: '14px',
                    background: showQuiz
                      ? 'linear-gradient(135deg, rgba(44,95,45,0.06), rgba(201,169,97,0.08))'
                      : 'transparent',
                    border: showQuiz ? '1.5px solid rgba(201,169,97,0.25)' : '1.5px solid transparent',
                    boxShadow: showQuiz ? '0 4px 16px rgba(44,95,45,0.06)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    display: 'flex', alignItems: 'center', gap: '0.85rem',
                    position: 'relative',
                    marginTop: '4px'
                  }}
                  onMouseEnter={(e) => {
                    if (!showQuiz) {
                      e.currentTarget.style.background = 'rgba(44,95,45,0.03)';
                      e.currentTarget.style.border = '1.5px solid rgba(44,95,45,0.08)';
                      e.currentTarget.style.transform = 'translateX(2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!showQuiz) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.border = '1.5px solid transparent';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }
                  }}
                >
                  {/* Active left accent */}
                  {showQuiz && (
                    <div style={{
                      position: 'absolute', left: 0, top: '20%', bottom: '20%',
                      width: '3px', borderRadius: '0 4px 4px 0',
                      background: 'linear-gradient(180deg, #C9A961, #2C5F2D)',
                    }} />
                  )}

                  <div style={{ flexShrink: 0 }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '50%',
                      border: showQuiz ? '2.5px solid #C9A961' : '2px solid #e0e0e0',
                      background: showQuiz ? 'rgba(201,169,97,0.08)' : '#fafafa',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.25s ease',
                    }}>
                      <span style={{ fontSize: '1.2rem' }}>📝</span>
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: '0.95rem', fontWeight: showQuiz ? 800 : 600,
                      lineHeight: 1.4, margin: 0,
                      color: showQuiz ? '#1a1a2e' : '#555',
                      transition: 'color 0.25s ease',
                    }}>
                      Level Assessment
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Sidebar Footer */}
            <div style={{
              padding: '1rem 1.25rem', borderTop: '1px solid rgba(44,95,45,0.08)',
              background: 'linear-gradient(180deg, transparent, rgba(44,95,45,0.03))',
            }}>
              <p style={{
                fontSize: '0.85rem', color: '#6b7280', fontWeight: 600,
                textAlign: 'center', margin: 0, lineHeight: 1.5,
              }}>
                🕌 Keep learning — every step brings you closer to understanding
              </p>
            </div>
          </aside>

          {/* ============================================================
            RIGHT COLUMN (MAIN CONTENT): VIDEO PLAYER & INFO
            ============================================================ */}
          <main className="module-content custom-scrollbar" style={{ padding: '1rem' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>

              {/* Module Info Card - Premium Design (Moved ABOVE Video Player) */}
              <div style={{
                background: 'white',
                borderRadius: '1.25rem',
                boxShadow: '0 10px 40px rgba(44,95,45,0.08), 0 1px 3px rgba(0,0,0,0.04)',
                border: '1px solid rgba(44,95,45,0.06)',
                flexShrink: 0,
                overflow: 'hidden',
                marginBottom: '1rem',
              }}>

                {/* Top accent bar */}
                <div style={{
                  height: '4px',
                  background: '#2C5F2D',
                }} />

                <div style={{ padding: '1.25rem 1.5rem' }}>
                  {/* Header Row: Info + Navigation */}
                  <div style={{
                    display: 'flex', flexWrap: 'wrap', gap: '1rem',
                    justifyContent: 'space-between', alignItems: 'flex-start'
                  }}>

                    {/* Left: Module Info */}
                    <div style={{ flex: 1, minWidth: '220px' }}>
                      {/* Badges */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                        <span style={{
                          background: 'linear-gradient(135deg, #2C5F2D, #3a7a3d)',
                          color: 'white',
                          padding: '4px 14px', borderRadius: '999px', fontSize: '0.7rem',
                          fontWeight: 800, letterSpacing: '0.04em',
                          boxShadow: '0 2px 8px rgba(44,95,45,0.2)',
                        }}>
                          MODULE {currentModule.number}
                        </span>
                        {isCompleted && (
                          <span style={{
                            background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
                            color: '#15803d',
                            padding: '4px 12px', borderRadius: '999px', fontSize: '0.7rem',
                            fontWeight: 800,
                            display: 'flex', alignItems: 'center', gap: '5px',
                            border: '1px solid rgba(22,163,106,0.15)',
                          }}>
                            <CheckCircle style={{ width: 13, height: 13 }} /> Completed
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h2 style={{
                        fontSize: '1.35rem', fontWeight: 800, color: '#1a1a2e',
                        lineHeight: 1.3, letterSpacing: '-0.01em', marginBottom: '0.35rem',
                      }}>
                        {currentModule.title}
                      </h2>

                      {/* Description */}
                      <p style={{
                        color: '#6b7280', fontSize: '0.88rem', lineHeight: 1.6,
                        fontWeight: 500, margin: 0,
                      }}>
                        {currentModule.description}
                      </p>
                    </div>

                    {/* Right: Navigation Buttons */}
                    <div style={{ display: 'flex', gap: '0.6rem', flexShrink: 0, alignItems: 'center', paddingTop: '0.25rem' }}>
                      <button
                        onClick={handlePrevious}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '5px',
                          padding: '0.6rem 1.2rem', borderRadius: '12px',
                          border: '1.5px solid #e5e7eb', background: 'white',
                          color: '#374151', fontWeight: 700, fontSize: '0.82rem',
                          cursor: 'pointer', transition: 'all 0.25s ease',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#C9A961';
                          e.currentTarget.style.color = '#2C5F2D';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(201,169,97,0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#e5e7eb';
                          e.currentTarget.style.color = '#374151';
                          e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.04)';
                        }}
                      >
                        <ChevronLeft style={{ width: 15, height: 15 }} /> Back
                      </button>
                      
                      {/* Show Take Assessment button if it's the last module AND (video is done OR already passed) */}
                      {isLastModuleOfLevel && (isVideoCompleted || isCompleted) && !showQuiz && (
                        <button
                          onClick={() => setShowQuiz(true)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '5px',
                            padding: '0.6rem 1.4rem', borderRadius: '12px',
                            border: 'none',
                            background: 'linear-gradient(135deg, #C9A961, #d4b872)',
                            color: 'white', fontWeight: 800, fontSize: '0.85rem',
                            cursor: 'pointer', transition: 'all 0.25s ease',
                            boxShadow: '0 4px 15px rgba(201,169,97,0.3)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(201,169,97,0.45)';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(201,169,97,0.3)';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          {hasPassedLevelAssessment ? 'Review Assessment' : 'Take Level Assessment'}
                        </button>
                      )}
                      
                      {/* Only show NEXT if they actually passed the quiz (or are on a non-final module) */}
                      {(!isLastModuleOfLevel || (isLastModuleOfLevel && hasPassedLevelAssessment)) && !showQuiz && (
                        <button
                          onClick={handleNext}
                          disabled={!isCompleted}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '5px',
                            padding: '0.6rem 1.4rem', borderRadius: '12px',
                            border: 'none',
                            background: isCompleted ? 'linear-gradient(135deg, #2C5F2D, #3a7a3d)' : '#e5e7eb',
                            color: isCompleted ? 'white' : '#9ca3af', fontWeight: 700, fontSize: '0.82rem',
                            cursor: isCompleted ? 'pointer' : 'not-allowed', transition: 'all 0.25s ease',
                            boxShadow: isCompleted ? '0 4px 15px rgba(44,95,45,0.25)' : 'none',
                          }}
                          onMouseEnter={(e) => {
                            if (!isCompleted) return;
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(44,95,45,0.35)';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                          }}
                          onMouseLeave={(e) => {
                            if (!isCompleted) return;
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(44,95,45,0.25)';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          Next <ChevronRight style={{ width: 15, height: 15 }} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Player Box or Quiz - Fits available height */}
              <div style={{
                borderRadius: '1.25rem', overflow: 'visible',
                background: showQuiz ? 'transparent' : 'black', position: 'relative',
                boxShadow: showQuiz ? 'none' : '0 20px 40px -10px rgba(0, 0, 0, 0.25)',
                flex: 1,
                minHeight: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: '2rem'
              }}>
                {showQuiz && levelId && levelQuizzes[levelId] ? (
                  <Quiz 
                    quiz={levelQuizzes[levelId]} 
                    onComplete={handleQuizComplete} 
                  />
                ) : (
                  <div style={{ aspectRatio: '16/9', width: '100%', maxWidth: '100%', height: 'auto', position: 'relative' }}>
                    <SecurePlayer
                      key={currentModule.number}
                      videoId={currentModule.videoId}
                      onEnded={handleVideoEnded}
                    />
                  </div>
                )}
              </div>

            </div>
          </main>
        </div>
      </div>
    </>
  );
}
