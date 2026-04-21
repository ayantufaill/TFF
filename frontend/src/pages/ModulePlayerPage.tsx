import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
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

// Replicating the data exactly for the photocopy
const levelsData = [
  {
    level: 1,
    title: 'Health And Happiness',
    modules: [
      {
        number: 1,
        title: 'True Good Health & Happiness; Submission to God',
        description: 'Understanding the core connection between spiritual submission and physical wellbeing.',
        videoId: 'pzFILwLcJlE',
        topics: ['Health and happiness basics', 'The role of submission', 'Connecting with the Creator'],
      },
      {
        number: 2,
        title: 'The Quran – Understand Your Purpose in Life',
        description: 'Exploring how the Quran defines our existence and ultimate goals.',
        videoId: 'pzFILwLcJlE',
        topics: ['Quranic wisdom', 'Defining purpose', 'Life mapping'],
      },
      {
        number: 3,
        title: 'The Prayer – Your Gateway to Optimism and Happiness',
        description: 'How regular prayer transforms your mental and spiritual state.',
        videoId: 'pzFILwLcJlE',
        topics: ['Power of Salah', 'Building optimism', 'Daily connection'],
      },
      {
        number: 4,
        title: 'Shukr – The Power of being Thankful & Grateful',
        description: 'The science and spirituality of gratitude in Islam.',
        videoId: 'pzFILwLcJlE',
        topics: ['The practice of Shukr', 'Emotional benefits', 'Grateful living'],
      },
      {
        number: 5,
        title: 'Relationships & Good Character – Making a Better World',
        description: 'Developing Akhlaq to improve social bonds.',
        videoId: 'pzFILwLcJlE',
        topics: ['Good character', 'Healthy relationships', 'Social impact'],
      },
      {
        number: 6,
        title: 'Strong in Spirit & Body – Being Active & Healthy',
        description: 'The importance of physical health in the life of a believer.',
        videoId: 'pzFILwLcJlE',
        topics: ['Physical fitness', 'Spiritual strength', 'Holistic health'],
      }
    ],
  }
];

export function ModulePlayerPage() {
  const { levelId, moduleId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const currentLevel = levelsData[0];
  const currentModule = currentLevel.modules.find(m => String(m.number) === moduleId) || currentLevel.modules[0];

  const isCompleted = user?.completedModules?.includes(`module-${currentModule.number}`);

  const handleNext = () => {
    const currentIndex = currentLevel.modules.findIndex(m => String(m.number) === moduleId);
    if (currentIndex < currentLevel.modules.length - 1) {
      const nextModule = currentLevel.modules[currentIndex + 1];
      navigate(`/training/module/${levelId}/${nextModule.number}`);
    }
  };

  const handlePrevious = () => {
    const currentIndex = currentLevel.modules.findIndex(m => String(m.number) === moduleId);
    if (currentIndex > 0) {
      const prevModule = currentLevel.modules[currentIndex - 1];
      navigate(`/training/module/${levelId}/${prevModule.number}`);
    }
  };

  const totalModules = 15;
  const completedCount = user?.completedModules?.length || 0;
  const progressValue = completedCount > 0 ? (completedCount / totalModules) * 100 : 20.0;

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
          height: calc(100vh - 64px);
          background-color: #FAF8F3;
          font-family: ui-sans-serif, system-ui, sans-serif;
          overflow: hidden;
        }

        .module-layout {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-height: 0;
          overflow: hidden;
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
          overflow: hidden;
          position: relative;
          align-self: stretch;
          min-height: 0;
        }

        @media (min-width: 768px) {
          .module-page-container {
            height: calc(100vh - 80px);
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
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              padding: '1rem 2rem',
              borderRadius: '1rem',
              border: '1px solid rgba(255,255,255,0.15)',
              textAlign: 'left',
              maxWidth: '500px',
              margin: '0 auto',
              boxShadow: '0 15px 35px rgba(0,0,0,0.2)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>
                  Your Overall Progress
                </span>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: '#C9A961' }}>
                  {progressValue.toFixed(1)}% Complete
                </span>
              </div>

              <div style={{ height: '14px', background: 'rgba(0,0,0,0.3)', borderRadius: '999px', overflow: 'hidden', marginBottom: '0.75rem' }}>
                <div style={{
                  height: '100%', width: `${progressValue}%`,
                  background: 'linear-gradient(90deg, #C9A961, #F3E5AB, #C9A961)',
                  borderRadius: '999px',
                  transition: 'width 1s ease',
                }} />
              </div>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                You have completed {completedCount} out of {totalModules} modules. Keep going!
              </p>
            </div>
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
                  fontSize: '0.8rem', fontWeight: 900, color: '#2C5F2D',
                  textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0,
                }}>
                  Course Modules
                </h3>
              </div>
              {/* Progress indicator */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '6px 12px', borderRadius: '8px',
                background: 'rgba(44,95,45,0.05)',
              }}>
                <div style={{
                  flex: 1, height: '4px', borderRadius: '999px',
                  background: 'rgba(44,95,45,0.1)', overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%', borderRadius: '999px',
                    width: `${(completedCount / currentLevel.modules.length) * 100}%`,
                    background: 'linear-gradient(90deg, #2C5F2D, #C9A961)',
                    transition: 'width 0.8s ease',
                  }} />
                </div>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#2C5F2D', whiteSpace: 'nowrap' }}>
                  {completedCount}/{currentLevel.modules.length}
                </span>
              </div>
            </div>

            {/* Module List */}
            <div style={{ padding: '0.75rem', flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {currentLevel.modules.map((m, index) => {
                  const isActive = String(m.number) === moduleId;
                  const completed = user?.completedModules?.includes(`module-${m.number}`);

                  return (
                    <button
                      key={m.number}
                      onClick={() => navigate(`/training/module/${levelId}/${m.number}`)}
                      style={{
                        width: '100%', textAlign: 'left',
                        padding: '0.85rem 1rem', borderRadius: '14px',
                        background: isActive
                          ? 'linear-gradient(135deg, rgba(44,95,45,0.06), rgba(201,169,97,0.08))'
                          : 'transparent',
                        border: isActive ? '1.5px solid rgba(201,169,97,0.25)' : '1.5px solid transparent',
                        boxShadow: isActive ? '0 4px 16px rgba(44,95,45,0.06)' : 'none',
                        cursor: 'pointer', transition: 'all 0.25s ease',
                        display: 'flex', alignItems: 'center', gap: '0.85rem',
                        position: 'relative',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'rgba(44,95,45,0.03)';
                          e.currentTarget.style.border = '1.5px solid rgba(44,95,45,0.08)';
                          e.currentTarget.style.transform = 'translateX(2px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
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
                          fontSize: '0.82rem', fontWeight: isActive ? 800 : 600,
                          lineHeight: 1.4, margin: 0,
                          color: isActive ? '#1a1a2e' : completed ? '#2C5F2D' : '#555',
                          transition: 'color 0.25s ease',
                        }}>
                          {m.title}
                        </p>
                        {completed && !isActive && (
                          <span style={{ fontSize: '0.65rem', color: '#16a34a', fontWeight: 600 }}>
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
              </div>
            </div>

            {/* Sidebar Footer */}
            <div style={{
              padding: '1rem 1.25rem', borderTop: '1px solid rgba(44,95,45,0.08)',
              background: 'linear-gradient(180deg, transparent, rgba(44,95,45,0.03))',
            }}>
              <p style={{
                fontSize: '0.7rem', color: '#6b7280', fontWeight: 600,
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

              {/* Video Player Box - Now fits available height */}
              <div style={{
                borderRadius: '1.25rem', overflow: 'hidden',
                background: 'black', position: 'relative',
                boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.25)',
                marginBottom: '1rem',
                flex: 1,
                minHeight: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ aspectRatio: '16/9', width: '100%', maxWidth: '100%', height: 'auto', position: 'relative' }}>
                  <SecurePlayer videoId={currentModule.videoId} />
                </div>
              </div>

              {/* Module Info Card - Premium Design */}
              <div style={{
                background: 'white',
                borderRadius: '1.25rem',
                boxShadow: '0 10px 40px rgba(44,95,45,0.08), 0 1px 3px rgba(0,0,0,0.04)',
                border: '1px solid rgba(44,95,45,0.06)',
                flexShrink: 0,
                overflow: 'hidden',
              }}>

                {/* Top accent bar */}
                <div style={{
                  height: '4px',
                  background: 'linear-gradient(90deg, #2C5F2D, #C9A961, #2C5F2D)',
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
                      <button
                        onClick={handleNext}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '5px',
                          padding: '0.6rem 1.4rem', borderRadius: '12px',
                          border: 'none',
                          background: 'linear-gradient(135deg, #2C5F2D, #3a7a3d)',
                          color: 'white', fontWeight: 700, fontSize: '0.82rem',
                          cursor: 'pointer', transition: 'all 0.25s ease',
                          boxShadow: '0 4px 15px rgba(44,95,45,0.25)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = '0 6px 20px rgba(44,95,45,0.35)';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = '0 4px 15px rgba(44,95,45,0.25)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        Next <ChevronRight style={{ width: 15, height: 15 }} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>
    </>
  );
}
