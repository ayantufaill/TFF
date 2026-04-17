import React from 'react';
import { BookOpen, CheckCircle, Clock, Star, Play, Award, LayoutDashboard, Search, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Link } from 'react-router';

// Reusing shared data (ideally this should be moved to a shared file later)
const courses = [
  { id: 1, title: 'Foundations of Aqeedah', provider: 'The Faith Foundation', type: 'Course', category: 'Aqeedah', image: 'https://picsum.photos/seed/aqeedah/600/400', progress: 65 },
  { id: 2, title: 'Learn to Pray – Salah Guide', provider: 'The Faith Foundation', type: 'Guided Module', category: 'Fiqh', image: 'https://picsum.photos/seed/salah/600/400', progress: 30 },
  { id: 3, title: 'Seerah – Life of the Prophet ﷺ', provider: 'The Faith Foundation', type: 'Specialization', category: 'Seerah', image: 'https://picsum.photos/seed/seerah/600/400', progress: 0 },
];

export function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F3]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#2C5F2D] mb-4">Please log in to view your dashboard</h2>
          <Link to="/training">
            <Button className="bg-[#2C5F2D] hover:bg-[#234F24] text-white">Go to Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F3] pb-20">
      {/* Welcome Hero */}
      <section className="bg-gradient-to-r from-[#2C5F2D] to-[#4A8B4D] py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Assalamu Alaikum, {user.name}!</h1>
              <p className="text-[#E8D9B0] font-medium flex items-center gap-2">
                <Star className="w-4 h-4 fill-current" />
                Welcome back to your spiritual learning journey.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center min-w-[120px]">
                <div className="text-2xl font-bold">12</div>
                <div className="text-xs text-white/70 uppercase tracking-wider font-semibold">Days Streak</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center min-w-[120px]">
                <div className="text-2xl font-bold">{user.completedModules?.length || 0}</div>
                <div className="text-xs text-white/70 uppercase tracking-wider font-semibold">Completed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 transition-all duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Dashboard Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* My Courses Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Current Learning</h2>
                <Link to="/courses" className="text-[#2C5F2D] font-semibold text-sm hover:underline">View all courses</Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <Card key={course.id} className="group overflow-hidden border-gray-200 hover:shadow-xl transition-all duration-300">
                    <div className="relative h-40">
                      <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute bottom-3 right-3">
                        <Button size="icon" className="h-10 w-10 rounded-full bg-white text-[#2C5F2D] hover:bg-[#FAF8F3]">
                          <Play className="w-5 h-5 fill-current" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <div className="text-xs font-semibold text-[#2C5F2D] uppercase tracking-wider mb-2">{course.category}</div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-1">{course.title}</h3>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-gray-500">Progress</span>
                          <span className="text-[#2C5F2D]">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2 bg-gray-100 ring-1 ring-gray-200" indicatorClassName="bg-gradient-to-r from-[#2C5F2D] to-[#4A8B4D]" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Path Selection */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#2C5F2D]/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#2C5F2D]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Your Learning Path</h3>
                  <p className="text-sm text-gray-500">Complete these levels to earn your graduation certificate.</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  { level: 1, title: 'The Gateway to Faith', status: 'completed' },
                  { level: 2, title: 'Daily Practice', status: 'active' },
                  { level: 3, title: 'Lifestyle & Identity', status: 'locked' }
                ].map((l) => (
                  <div key={l.level} className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                    l.status === 'active' ? 'border-[#2C5F2D] bg-[#2C5F2D]/5 shadow-sm' : 'border-gray-100'
                  }`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        l.status === 'completed' ? 'bg-[#2C5F2D] text-white' : 
                        l.status === 'active' ? 'bg-white text-[#2C5F2D] border border-[#2C5F2D]' : 
                        'bg-gray-100 text-gray-400'
                      }`}>
                        {l.status === 'completed' ? <CheckCircle className="w-6 h-6" /> : l.level}
                      </div>
                      <span className={`font-bold ${l.status === 'locked' ? 'text-gray-400' : 'text-gray-900'}`}>{l.title}</span>
                    </div>
                    {l.status === 'active' ? (
                      <Button size="sm" className="bg-[#2C5F2D] hover:bg-[#234F24] text-white">Continue</Button>
                    ) : l.status === 'locked' ? (
                      <Lock className="w-5 h-5 text-gray-300" />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar / Stats */}
          <div className="space-y-8">
            {/* Quick Stats */}
            <Card className="border-gray-200 shadow-sm overflow-hidden">
              <CardHeader className="pb-4 bg-gray-50/50">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <LayoutDashboard className="w-5 h-5 text-[#2C5F2D]" />
                  Activity Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      <Clock className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">Learning Hours</span>
                  </div>
                  <span className="font-bold text-gray-900">24.5h</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">Modules Done</span>
                  </div>
                  <span className="font-bold text-gray-900">8 / 15</span>
                </div>
                <Button variant="outline" className="w-full border-[#2C5F2D] text-[#2C5F2D] hover:bg-[#2C5F2D]/5 font-bold py-6">
                  Weekly Report
                </Button>
              </CardContent>
            </Card>

            {/* Spiritual Tip of the Day */}
            <div className="bg-[#2C5F2D] text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <BookOpen className="w-24 h-24" />
              </div>
              <div className="relative z-10">
                <h4 className="text-[#E8D9B0] font-bold text-xs uppercase tracking-widest mb-3">Daily Reflection</h4>
                <p className="text-lg font-medium leading-relaxed italic mb-4">
                  "The best of people are those who are most beneficial to people."
                </p>
                <div className="text-white/60 text-sm">— Prophet Muhammad ﷺ</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Lock = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
