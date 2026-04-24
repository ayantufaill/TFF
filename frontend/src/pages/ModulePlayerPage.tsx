import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router';
import {
  ChevronLeft,
  Play,
  CheckCircle,
  ChevronRight,
  Sparkles,
  Award
} from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../context/AuthContext';
import SecurePlayer from '../components/SecurePlayer';
import { Card, CardContent } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Button } from '../components/ui/button';

import { getCourses, getAssessment, MainCourse, Level, Module, Assessment } from '../services/courseService';
import Quiz from '../components/Quiz';
import CertificateView from '../components/CertificateView';

export function ModulePlayerPage() {
  const { levelId, moduleId } = useParams();
  const navigate = useNavigate();
  const { user, updateProgress } = useAuth();

  const [courses, setCourses] = useState<MainCourse[]>([]);
  const [currentAssessment, setCurrentAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState(true);

  // Derived state from courses data
  const allLevels = courses.flatMap(c => c.levels);
  const currentLevel = allLevels.find(l => l._id === levelId);
  const currentModule = currentLevel?.modules.find(m => String(m.number) === String(moduleId));

  const currentCourse = courses.find(c => c.levels.some(l => l._id === levelId));

  const isCompleted = user?.completedModules?.includes(`module-${currentModule?._id}`) || user?.completedModules?.includes(`module-${currentModule?.number}`);
  const isLastModuleOfLevel = currentLevel && currentModule && currentLevel.modules[currentLevel.modules.length - 1]._id === currentModule._id;
  const hasPassedLevelAssessment = user?.completedModules?.includes(`quiz-${levelId}`);

  const isFinalLevelOfCourse = currentCourse && currentCourse.levels[currentCourse.levels.length - 1]._id === levelId;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const shouldShowQuiz = searchParams.get('quiz') === 'true';

  const [isVideoCompleted, setIsVideoCompleted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(shouldShowQuiz && isLastModuleOfLevel);
  const [showFinalCertificate, setShowFinalCertificate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
        if (levelId) {
          const quiz = await getAssessment(levelId);
          setCurrentAssessment(quiz);
        }
      } catch (err) {
        console.error('Failed to fetch data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [levelId]);

  useEffect(() => {
    setIsVideoCompleted(false);
    setShowQuiz(shouldShowQuiz && isLastModuleOfLevel);
    setShowFinalCertificate(false);
  }, [moduleId, levelId, shouldShowQuiz, isLastModuleOfLevel]);

  const handleVideoEnded = () => {
    if (currentModule) {
      updateProgress(`module-${currentModule._id}`);
      setIsVideoCompleted(true);
    }
  };

  const handleQuizComplete = async (passed: boolean) => {
    if (passed && levelId) {
      await updateProgress(`quiz-${levelId}`);
      setShowQuiz(false);
      setIsVideoCompleted(false);

      if (!isFinalLevelOfCourse) {
        handleNext();
      }
    }
  };

  const handleNext = () => {
    const isAdmin = user?.role === 'admin';
    const canGoNext = isCompleted || isVideoCompleted || isAdmin;

    if (!canGoNext || !currentLevel || !currentModule) return;

    const currentIndex = currentLevel.modules.findIndex(m => String(m._id) === String(currentModule._id));

    if (currentIndex !== -1 && currentIndex < currentLevel.modules.length - 1) {
      // Next module in same level
      const nextModule = currentLevel.modules[currentIndex + 1];
      navigate(`/training/module/${levelId}/${nextModule.number}`);
    } else {
      // Last module of level -> check for next level
      const currentLevelIndex = currentCourse?.levels.findIndex(l => l._id === levelId) ?? -1;
      if (currentCourse && currentLevelIndex !== -1 && currentLevelIndex < currentCourse.levels.length - 1) {
        const nextLevel = currentCourse.levels[currentLevelIndex + 1];
        if (nextLevel.modules.length > 0) {
          navigate(`/training/module/${nextLevel._id}/${nextLevel.modules[0].number}`);
        }
      } else {
        // Last level of course -> check for next course
        const currentCourseIndex = courses.findIndex(c => c._id === currentCourse?._id);
        if (currentCourseIndex !== -1 && currentCourseIndex < courses.length - 1) {
          const nextCourse = courses[currentCourseIndex + 1];
          if (nextCourse.levels.length > 0 && nextCourse.levels[0].modules.length > 0) {
            const nl = nextCourse.levels[0];
            navigate(`/training/module/${nl._id}/${nl.modules[0].number}`);
          }
        }
      }
    }
  };

  const handlePrevious = () => {
    if (!currentLevel || !currentModule) return;
    const currentIndex = currentLevel.modules.findIndex(m => String(m._id) === String(currentModule._id));

    if (currentIndex > 0) {
      const prevModule = currentLevel.modules[currentIndex - 1];
      navigate(`/training/module/${levelId}/${prevModule.number}`);
    } else {
      const currentLevelIndex = currentCourse?.levels.findIndex(l => l._id === levelId) ?? -1;
      if (currentCourse && currentLevelIndex > 0) {
        const prevLevel = currentCourse.levels[currentLevelIndex - 1];
        if (prevLevel.modules.length > 0) {
          navigate(`/training/module/${prevLevel._id}/${prevLevel.modules[prevLevel.modules.length - 1].number}`);
        }
      }
    }
  };

  const totalModules = currentCourse?.levels.reduce((acc, l) => acc + l.modules.length, 0) || 0;
  const courseModuleIds = currentCourse?.levels.flatMap(l => l.modules.map(m => `module-${m._id}`)) || [];
  const completedCount = user?.completedModules?.filter(id => courseModuleIds.includes(id)).length || 0;
  const progressValue = totalModules > 0 ? (completedCount / totalModules) * 100 : 0;

  if (loading) return <div className="p-20 text-center font-bold text-[#2C5F2D]">Synchronizing your path...</div>;
  if (!currentLevel || !currentModule) return <div className="p-20 text-center font-bold text-[#2C5F2D]">Module not found.</div>;

  const renderPlayerContent = (isMobile: boolean) => {
    if (showFinalCertificate && isFinalLevelOfCourse && hasPassedLevelAssessment) {
      return (
        <div className={isMobile ? "mt-4" : ""}>
          <CertificateView
            userName={user?.name || 'Student'}
            onBack={() => setShowFinalCertificate(false)}
          />
        </div>
      );
    }

    if (showQuiz && currentAssessment) {
      return (
        <div className={isMobile ? "mt-4" : ""}>
          <Quiz
            quiz={currentAssessment}
            onComplete={handleQuizComplete}
            isFinalLevel={isFinalLevelOfCourse}
            onViewCertificate={() => setShowFinalCertificate(true)}
            alreadyPassed={hasPassedLevelAssessment}
          />
        </div>
      );
    }

    return (
      <div className={`relative w-full ${isMobile ? "mt-4" : ""}`} style={{ aspectRatio: '16/9' }}>
        <SecurePlayer
          key={currentModule._id}
          videoId={currentModule.videoId}
          onEnded={handleVideoEnded}
        />
      </div>
    );
  };

  const renderModuleInfoCard = () => {
    const isAdmin = user?.role === 'admin';
    const canGoNext = isCompleted || isVideoCompleted || isAdmin;

    return (
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-4">
        <div className="h-1 bg-[#2C5F2D]" />
        <div className="p-6">
          <div className="flex flex-wrap gap-4 justify-between items-start">
            <div className="flex-1 min-w-[220px]">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-[#2C5F2D] text-white px-3 py-1 font-bold text-[10px] tracking-widest uppercase">
                  MODULE {currentModule.number}
                </Badge>
                {isCompleted && (
                  <Badge variant="outline" className="text-[#15803d] border-[#bbf7d0] bg-[#f0fdf4] font-bold text-[10px] uppercase">
                    <CheckCircle className="w-3 h-3 mr-1" /> Completed
                  </Badge>
                )}
                {isAdmin && (
                  <Badge variant="outline" className="text-[#C9A961] border-[#C9A961] bg-[#FAF8F3] font-bold text-[10px] uppercase">
                    Admin Preview Mode
                  </Badge>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                {currentModule.title}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
                {currentModule.description}
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={handlePrevious}
                className="border-gray-200 text-gray-600 font-bold hover:bg-gray-50"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>

              {isLastModuleOfLevel && (isVideoCompleted || isCompleted || isAdmin) && !showQuiz && (
                <Button
                  onClick={() => setShowQuiz(true)}
                  className="bg-[#C9A961] hover:bg-[#B89751] text-white font-bold"
                >
                  {hasPassedLevelAssessment ? 'Review Quiz' : 'Take Quiz'}
                </Button>
              )}

              {(!isLastModuleOfLevel || (isLastModuleOfLevel && hasPassedLevelAssessment)) && !showQuiz && (
                <Button
                  onClick={handleNext}
                  disabled={!canGoNext}
                  className={`font-bold ${canGoNext ? 'bg-[#2C5F2D] hover:bg-[#234F24] text-white' : 'bg-gray-100 text-gray-400'}`}
                >
                  Next <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{`
        footer { margin-top: 0 !important; }
        .module-page-container {
          display: flex;
          flex-direction: column;
          min-height: calc(100vh - 64px);
          background-color: #FAF8F3;
        }
        .module-layout { display: flex; flex: 1; }
        .module-sidebar {
          width: 400px;
          background: white;
          border-right: 1px solid #f3f4f6;
          display: flex;
          flex-direction: column;
          box-shadow: 20px 0 50px rgba(44,95,45,0.02);
        }
        .module-content { flex: 1; padding: 2rem; overflow-y: auto; }
        @media (max-width: 1024px) {
          .module-layout { flex-direction: column; }
          .module-sidebar { width: 100%; border-right: none; border-bottom: 1px solid #f3f4f6; }
        }
      `}</style>

      <div className="module-page-container">
        <section className="bg-[#2C5F2D] text-white py-12 px-8 relative overflow-hidden text-center">
          <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/arabesque-thin.png')]" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-3xl font-black mb-2 tracking-tight">Level {currentLevel.level}: {currentLevel.title}</h1>
            <p className="text-white/70 font-medium mb-8">Part of the {currentCourse?.title} Course</p>

            <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm border-white/20 text-left text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white">Your Training Progress</h3>
                  <span className="text-sm font-bold text-[#C9A961]">{Math.round(progressValue)}%</span>
                </div>
                <div className="h-3 w-full bg-white/20 rounded-full overflow-hidden border border-white/10 relative">
                  <div className="h-full bg-white transition-all duration-1000 shadow-[0_0_15px_rgba(255,255,255,0.5)]" style={{ width: `${progressValue}%` }} />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="module-layout">
          <aside className="module-sidebar">
            <div className="p-6 border-b bg-gray-50/50">
              <h3 className="text-xs font-black text-[#2C5F2D] uppercase tracking-widest mb-1">Current Syllabus</h3>
              <p className="text-sm text-gray-500 font-medium line-clamp-1">{currentLevel.subtitle}</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {currentLevel.modules.map((m, idx) => {
                const isActive = String(m.number) === String(moduleId);
                const completed = user?.completedModules?.includes(`module-${m._id}`) || user?.completedModules?.includes(`module-${m.number}`);
                const isAdmin = user?.role === 'admin';
                const unlocked = idx === 0 || user?.completedModules?.includes(`module-${currentLevel.modules[idx - 1]._id}`) || user?.completedModules?.includes(`module-${currentLevel.modules[idx - 1].number}`) || completed || isActive || isAdmin;

                return (
                  <button
                    key={m._id}
                    onClick={() => unlocked && navigate(`/training/module/${levelId}/${m.number}`)}
                    className={`w-full text-left p-4 rounded-2xl transition-all flex items-center gap-4 ${isActive ? 'bg-[#FAF8F3] border-2 border-[#C9A961]/20 shadow-sm' :
                        unlocked ? 'hover:bg-gray-50 border-2 border-transparent' : 'opacity-50 grayscale cursor-not-allowed border-2 border-transparent'
                      }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold ${completed ? 'bg-[#2C5F2D] text-white shadow-lg shadow-[#2C5F2D]/20' :
                        isActive ? 'bg-white border-2 border-[#C9A961] text-[#C9A961]' : 'bg-gray-100 text-gray-400'
                      }`}>
                      {completed ? <CheckCircle className="w-5 h-5" /> : m.number}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-sm truncate ${isActive ? 'text-gray-900' : 'text-gray-600'}`}>{m.title}</p>
                    </div>
                    {isActive && <Play className="w-4 h-4 text-[#C9A961] fill-current" />}
                  </button>
                );
              })}

              <button
                onClick={() => (isLastModuleOfLevel || user?.role === 'admin') && setShowQuiz(true)}
                className={`w-full text-left p-4 rounded-2xl transition-all flex items-center gap-4 mt-4 ${showQuiz ? 'bg-[#FAF8F3] border-2 border-[#C9A961]/20 shadow-sm' : 'border-2 border-transparent hover:bg-gray-50'
                  }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-lg ${showQuiz ? 'bg-white border-2 border-[#C9A961]' : 'bg-gray-100'
                  }`}>
                  📝
                </div>
                <div className="flex-1 font-bold text-sm text-gray-600">Level Assessment</div>
              </button>
            </div>
          </aside>

          <main className="module-content">
            <div className="max-w-4xl mx-auto">
              {!showFinalCertificate && renderModuleInfoCard()}
              <div className="bg-black rounded-3xl overflow-hidden shadow-2xl">
                {renderPlayerContent(false)}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
