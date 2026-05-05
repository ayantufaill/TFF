import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle, Clock, Star, Play, Award, LayoutDashboard, Search, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { getCourses, MainCourse } from '../services/courseService';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Link } from 'react-router';

export function DashboardPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<MainCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        console.error('Failed to fetch courses', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

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
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F3]">
        <div className="bg-gradient-to-r from-[#2C5F2D] to-[#4A8B4D] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-10 w-64 bg-white/20 rounded-lg animate-pulse mb-2" />
            <div className="h-4 w-48 bg-white/10 rounded-lg animate-pulse" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8 mt-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-white rounded-[24px] p-6 space-y-4 border border-gray-100 shadow-sm">
                    <div className="h-48 bg-gray-100 rounded-2xl animate-pulse" />
                    <div className="h-6 w-3/4 bg-gray-100 rounded-lg animate-pulse" />
                    <div className="h-4 w-1/2 bg-gray-100 rounded-lg animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-12 mt-12">
              <div className="bg-white rounded-[24px] p-6 h-64 border border-gray-100 shadow-sm animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const allModules = courses.flatMap(c => c.levels.flatMap(l => l.modules));
  const totalCompletedCount = allModules.filter(m => 
    user.completedModules?.some(id => id === `module-${String(m._id)}` || id === `module-${String(m.number)}`)
  ).length;
  const totalModulesCount = allModules.length;

  if (isLoading) return <div className="p-20 text-center text-[#2C5F2D] font-bold">Loading your dashboard...</div>;

  return (
    <div className="min-h-screen bg-[#FAF8F3]" style={{ paddingBottom: '320px' }}>
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
                <div className="text-2xl font-bold">{user.currentStreak || 0}</div>
                <div className="text-xs text-white/70 uppercase tracking-wider font-semibold">Days Streak</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center min-w-[120px]">
                <div className="text-2xl font-bold">{totalCompletedCount}</div>
                <div className="text-xs text-white/70 uppercase tracking-wider font-semibold">Total Modules</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 transition-all duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Dashboard Area */}
          <div className="lg:col-span-2 space-y-8">
            <div className="mt-12">
              <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Current Learning</h2>
                  <p className="text-sm text-gray-500 font-medium">Explore and continue your enrolled courses</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {courses.map((course) => {
                  const courseModules = course.levels.flatMap(l => l.modules);
                  const completedInCourse = courseModules.filter(m => 
                    user.completedModules?.some(id => id === `module-${String(m._id)}` || id === `module-${String(m.number)}`)
                  ).length;
                  const totalInCourse = courseModules.length;
                  const calculatedProgress = totalInCourse > 0 ? Math.round((completedInCourse / totalInCourse) * 100) : 0;

                  // Find first uncompleted module
                  const nextModule = courseModules.find(m => !user.completedModules?.includes(`module-${m._id}`) && !user.completedModules?.includes(`module-${m.number}`)) || courseModules[0];
                  const targetLevelId = course.levels.find(l => l.modules.some(m => m._id === nextModule?._id))?._id || course.levels[0]?._id;

                  return (
                    <Link to={`/training/curriculum?course=${course._id}`} key={course._id} className="block group">
                      <Card
                        className="relative border border-[#C9A961]/30 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(44,95,45,0.15)] transition-all duration-500 h-full"
                        style={{ borderRadius: '24px', overflow: 'hidden' }}
                      >
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C9A961] to-[#2C5F2D] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

                        <div className="relative h-48 overflow-hidden rounded-[16px] m-2">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                          <div className="absolute top-4 left-4">
                            <Badge className="bg-white/90 backdrop-blur-md text-[#2C5F2D] border-none font-bold px-3 py-1 text-[10px] uppercase tracking-wider shadow-sm">
                              {course.category}
                            </Badge>
                          </div>

                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                            <div className="h-14 w-14 rounded-full bg-[#C9A961] text-white flex items-center justify-center shadow-xl border-4 border-white/20">
                              <Play className="w-6 h-6 fill-current" />
                            </div>
                          </div>
                        </div>

                        <CardContent className="p-6 relative">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-[#2C5F2D] transition-colors line-clamp-2">
                              {course.title}
                            </h3>
                          </div>

                          <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 mb-6">
                            <div className="flex items-center gap-1.5">
                              <BookOpen className="w-3.5 h-3.5 text-[#C9A961]" />
                              {course.levels.length} Levels
                            </div>
                            <div className="w-1 h-1 rounded-full bg-gray-200" />
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-[#C9A961]" />
                              {completedInCourse}/{totalInCourse} Modules
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between items-end">
                              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Course Progress</span>
                              <span className="text-sm font-black text-[#2C5F2D]">{calculatedProgress}%</span>
                            </div>
                            <div className="relative pt-2">
                              <Progress
                                value={calculatedProgress}
                                className="h-2 bg-gray-100 rounded-full"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar / Stats */}
          <div className="space-y-12 mt-12">
            <Card className="border-gray-200 shadow-sm overflow-hidden" style={{ borderRadius: '24px' }}>
              <CardHeader className="pb-4 bg-gray-50/50">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <LayoutDashboard className="w-5 h-5 text-[#2C5F2D]" />
                  Learning Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      <Clock className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">Total Completion</span>
                  </div>
                  <span className="font-bold text-gray-900">{Math.round((totalCompletedCount / (totalModulesCount || 1)) * 100)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">Modules Mastered</span>
                  </div>
                  <span className="font-bold text-gray-900">{totalCompletedCount} / {totalModulesCount}</span>
                </div>
                <Button variant="outline" className="w-full border-[#2C5F2D] text-[#2C5F2D] hover:bg-[#2C5F2D]/5 font-bold py-6">
                  Detailed Report
                </Button>
              </CardContent>
            </Card>

            {/* Spiritual Tip */}
            <div
              className="bg-[#2C5F2D] text-white p-6 shadow-lg relative overflow-hidden"
              style={{ borderRadius: '24px' }}
            >
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
