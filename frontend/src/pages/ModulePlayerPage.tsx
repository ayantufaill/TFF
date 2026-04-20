import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import {
  ChevronLeft,
  Play,
  CheckCircle,
  ChevronRight,
  BookOpen,
  Video,
  Headphones,
  FileText,
  Star,
  ArrowRight,
  ArrowLeft,
  Circle,
  ChevronDown,
  Layout,
  HelpCircle,
  Menu,
  Heart,
  Clock,
  Award,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
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
  const { user, updateProgress } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const currentLevel = levelsData[0]; // Photocopying 'Health And Happiness'
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

  console.log('User completed modules:', user?.completedModules);
  const totalModules = 15;
  const completedCount = user?.completedModules?.length || 0;
  // Progress calculation - Forced test value of 20% if 0 for visibility
  const progressValue = completedCount > 0 ? (completedCount / totalModules) * 100 : 20.0;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#FAF8F3] font-sans select-none overflow-hidden">
      
      {/* SIDEBAR - LEFT SIDE */}
      <aside className={`bg-white transition-all duration-700 shadow-[0_20px_50px_rgba(44,95,45,0.06)] z-30 flex flex-col shrink-0 border-r border-gray-100 ${sidebarOpen ? 'w-full md:w-[350px] lg:w-[380px]' : 'w-0 opacity-0 md:hidden'}`}>
        {/* Sidebar Header */}
        <div className="h-[100px] md:h-[130px] bg-[#2C5F2D] flex flex-col justify-center px-7 text-white shrink-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque-thin.png')] opacity-10"></div>
          <div className="flex items-center justify-between relative z-10 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 backdrop-blur-md">
                <Sparkles className="w-5 h-5 text-[#C9A961]" />
              </div>
              <div>
                <span className="block font-black text-[9px] uppercase tracking-[0.3em] text-[#C9A961] mb-0.5">Academy</span>
                <span className="block font-bold text-sm md:text-[16px] text-white leading-tight truncate w-40 md:w-48">{currentLevel.title}</span>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all border border-white/10"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Progress Mini Bar */}
          <div className="relative z-10 px-0.5">
            <div className="flex justify-between text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-white/50 mb-2">
              <span>Curriculum Progress</span>
              <span className="text-[#C9A961]">{Math.round((completedCount / currentLevel.modules.length) * 100)}%</span>
            </div>
            <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-[#C9A961] via-[#E5C987] to-[#C9A961] rounded-full transition-all duration-1000"
                style={{ width: `${(completedCount / currentLevel.modules.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Sidebar List */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[#FAF8F3] to-white custom-scrollbar pb-12 pt-8 px-5">
          <div className="mb-6 px-3 flex items-center justify-between">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 mb-1">Course Modules</h3>
              <div className="h-1 w-8 bg-[#C9A961] rounded-full"></div>
            </div>
            <Badge variant="outline" className="text-[8px] border-[#C9A961]/20 text-[#2C5F2D] font-black uppercase tracking-tighter">
              {currentLevel.modules.length} Lessons
            </Badge>
          </div>

          <div className="space-y-3">
            {currentLevel.modules.map((m) => {
              const isActive = String(m.number) === moduleId;
              const completed = user?.completedModules?.includes(`module-${m.number}`);

              return (
                <div key={m.number}>
                  <button
                    onClick={() => navigate(`/training/module/1/${m.number}`)}
                    className={`w-full text-left p-4 rounded-2xl transition-all duration-500 flex items-center gap-4 group relative ${isActive
                      ? 'bg-white shadow-[0_15px_40px_rgba(44,95,45,0.08)] ring-1 ring-[#C9A961]/30 translate-x-1'
                      : 'hover:bg-white/60 hover:translate-x-1'
                      }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[#C9A961] rounded-r-full shadow-[0_0_10px_#C9A961]"></div>
                    )}

                    <div className="shrink-0 relative">
                      {completed ? (
                        <div className="w-8 h-8 rounded-full bg-[#2C5F2D] flex items-center justify-center shadow-lg shadow-green-900/20 group-hover:scale-110 transition-transform">
                          <CheckCircle className="w-4.5 h-4.5 text-white" />
                        </div>
                      ) : (
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 group-hover:border-[#C9A961]/50 ${isActive ? 'border-[#C9A961] bg-[#C9A961]/5 shadow-[0_0_15px_rgba(201,169,97,0.2)]' : 'border-gray-100 bg-white'
                          }`}>
                          <span className={`text-[11px] font-black ${isActive ? 'text-[#C9A961]' : 'text-gray-300 group-hover:text-gray-500'}`}>
                            {String(m.number).padStart(2, '0')}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className={`text-[13px] font-bold leading-tight transition-colors duration-300 ${isActive ? 'text-[#2C5F2D]' : 'text-gray-500 group-hover:text-[#2C5F2D]'
                        }`}>
                        {m.title}
                      </p>
                    </div>

                    {isActive && (
                      <div className="shrink-0">
                        <div className="w-7 h-7 rounded-xl bg-[#FAF8F3] flex items-center justify-center border border-[#C9A961]/10">
                          <Play className="w-3 h-3 text-[#C9A961] fill-[#C9A961]" />
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </aside>

      {/* RIGHT SIDE CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-[#FAF8F3] relative scroll-smooth custom-scrollbar">
        
        {/* HERO / PROGRESS SECTION */}
        <section className="bg-gradient-to-r from-[#2C5F2D] to-[#4A8B4D] text-white py-12 md:py-20 shrink-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque-thin.png')] opacity-10"></div>
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
            <div className="mb-10">
              <h1 className="text-3xl md:text-5xl font-bold mb-5 tracking-tight">Training & Support</h1>
              <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto opacity-90 leading-relaxed font-medium">
                Step-by-step journey to help you understand and practice Islam with confidence
              </p>
            </div>

            <Link to="/training/curriculum" className="block group max-w-2xl mx-auto">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl rounded-3xl hover:bg-white/20 transition-all duration-500 cursor-pointer overflow-hidden">
                <CardContent className="p-7">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-bold text-xs uppercase tracking-widest text-white/90">Academy Progress</h3>
                    <span className="text-xs font-black text-[#C9A961] bg-black/40 px-5 py-2 rounded-full border border-white/10">
                      {progressValue.toFixed(1)}% COMPLETE
                    </span>
                  </div>
                  
                  <div className="h-4 w-full bg-black/30 rounded-full p-1 border border-white/10 relative shadow-inner mb-5">
                    <div 
                      className="h-full bg-gradient-to-r from-[#C9A961] via-[#F3E5AB] to-[#C9A961] rounded-full transition-all duration-1000 shadow-[0_0_25px_rgba(201,169,97,0.5)]"
                      style={{ width: `${progressValue}%` }}
                    ></div>
                  </div>

                  <p className="text-[10px] text-white/70 font-black tracking-[0.2em] uppercase group-hover:text-white transition-colors">
                    {completedCount} OF {totalModules} MODULES MASTERED • VIEW ALL MODULES →
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* MAIN VIDEO & CONTENT AREA */}
        <main className="flex-1 px-4 md:px-12 py-12">
          <div className="max-w-[1000px] mx-auto">
            
            {/* TOGGLE SIDEBAR BUTTON (Floating when closed) */}
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="fixed left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-[#2C5F2D] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all border-4 border-white/20 md:flex hidden"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            <div className="bg-white rounded-[2.5rem] shadow-[0_25px_60px_rgba(44,95,45,0.08)] border border-gray-100 overflow-hidden mb-12">
              <div className="aspect-video w-full bg-black relative group">
                <SecurePlayer videoId={currentModule.videoId} />
                {/* Click Shield Overlay */}
                <div 
                  className="absolute inset-0 bg-transparent z-[50]" 
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
              </div>

              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-gray-50 pb-10">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-[#2C5F2D]/5 text-[#2C5F2D] border-[#2C5F2D]/10 px-4 py-1.5 text-xs font-bold rounded-full">
                        Module {currentModule.number}
                      </Badge>
                      {isCompleted && (
                        <Badge className="bg-green-50 text-green-600 border-green-100 px-4 py-1.5 text-xs font-bold rounded-full flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Completed
                        </Badge>
                      )}
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold text-[#2C5F2D] tracking-tight">{currentModule.title}</h2>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      className="rounded-2xl h-14 px-6 border-gray-100 hover:bg-gray-50 text-gray-500 font-bold"
                    >
                      <ChevronLeft className="w-5 h-5 mr-2" />
                      Back
                    </Button>
                    <Button
                      onClick={handleNext}
                      className="bg-[#2C5F2D] hover:bg-[#234F24] text-white rounded-2xl h-14 px-8 font-bold shadow-lg shadow-green-900/20"
                    >
                      Next Lesson
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-12">
                  <section>
                    <h3 className="text-lg font-black text-[#2C5F2D] uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                      <div className="w-2 h-8 bg-[#C9A961] rounded-full"></div>
                      Overview
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed font-medium">
                      {currentModule.description}
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-black text-[#2C5F2D] uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                      <div className="w-2 h-8 bg-[#C9A961] rounded-full"></div>
                      Learning Objectives
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {currentModule.topics.map((topic, i) => (
                        <div key={i} className="flex items-start gap-4 p-6 rounded-3xl bg-[#FAF8F3] border border-gray-100 hover:border-[#C9A961]/30 transition-all group">
                          <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-[#C9A961] font-bold text-sm shadow-sm border border-gray-50 group-hover:bg-[#C9A961] group-hover:text-white transition-all">
                            {i + 1}
                          </div>
                          <span className="text-gray-700 font-bold leading-snug">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
