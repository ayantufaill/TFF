import React, { useState, useRef } from 'react';
import { BookOpen, Search, Filter, Star, Clock, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';

const courseCatalog = [
  { id: 1, title: 'Foundations of Aqeedah', provider: 'The Faith Foundation', type: 'Course', category: 'Aqeedah', image: 'https://picsum.photos/seed/aqeedah/600/400', badges: ['New'] },
  { id: 2, title: 'Learn to Pray – Salah Guide', provider: 'The Faith Foundation', type: 'Guided Module', category: 'Fiqh', image: 'https://picsum.photos/seed/salah/600/400', badges: ['Free'] },
  { id: 3, title: 'Seerah – Life of the Prophet ﷺ', provider: 'The Faith Foundation', type: 'Specialization', category: 'Seerah', image: 'https://picsum.photos/seed/seerah/600/400', badges: [] },
  { id: 4, title: 'Quranic Arabic – Read & Understand', provider: 'The Faith Foundation', type: 'Course', category: 'Language', image: 'https://picsum.photos/seed/arabic/600/400', badges: ['New', 'Free'] },
  { id: 5, title: 'Daily Adhkar & Dua', provider: 'The Faith Foundation', type: 'Guided Module', category: 'Spirituality', image: 'https://picsum.photos/seed/adhkar/600/400', badges: ['Free'] },
  { id: 6, title: 'Islamic History & Civilization', provider: 'The Faith Foundation', type: 'Specialization', category: 'History', image: 'https://picsum.photos/seed/history/600/400', badges: [] },
];

const categories = ['All', 'Aqeedah', 'Fiqh', 'Seerah', 'Language', 'Spirituality', 'History'];

const CourseCard = ({ course, onClick }: { course: any; onClick: () => void }) => (
  <div
    onClick={onClick}
    className="group cursor-pointer p-2"
  >
    <div className="rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <div className="relative h-[200px] bg-gray-50 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {course.badges?.length > 0 && (
          <div className="absolute top-4 right-4 flex gap-2 font-bold">
            {course.badges.map((badge: string) => (
              <span
                key={badge}
                className={`text-[10px] uppercase px-2.5 py-1 rounded-lg shadow-sm font-black tracking-wider ${badge === 'New' ? 'bg-blue-600 text-white' : 'bg-[#C9A961] text-white'
                  }`}
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-4 h-4 text-[#2C5F2D] flex-shrink-0" />
          <span className="text-[12px] text-gray-500 font-bold uppercase tracking-widest">{course.provider}</span>
        </div>

        <h4 className="text-[16px] font-bold text-gray-900 leading-tight mb-auto line-clamp-2 group-hover:text-[#2C5F2D] transition-colors">
          {course.title}
        </h4>

        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{course.type}</span>
          <div className="flex items-center gap-1.5 text-[#C9A961]">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-[12px] font-black">4.9</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courseCatalog.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Search & Hero Section — Premium Green Theme */}
      <section className="bg-[#2C5F2D] py-20 border-b border-[#234F24] text-white relative overflow-hidden">
        {/* Subtle Checkered Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l30 30-30 30L0 30z\' fill=\'%23ffffff\' fill-opacity=\'0.8\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")', backgroundSize: '40px 40px' }} />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Master Your Deen</h1>
          <p className="text-gray-100/80 mb-10 max-w-2xl text-lg font-medium leading-relaxed italic">Explore our professional courses and specializations in Islamic studies, designed for modern learners seeking authentic knowledge.</p>

          <div className="max-w-4xl w-full mx-auto relative group">
            <div className="flex items-center bg-white rounded-2xl shadow-2xl border-2 border-gray-100/50 p-2 transition-all duration-300 focus-within:border-[#C9A961] focus-within:shadow-[#C9A961]/20">
              <div className="pl-6 text-[#2C5F2D]">
                <Search className="w-7 h-7" />
              </div>
              <input
                type="text"
                placeholder="Search for courses, seerah, aqeedah..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-5 py-6 bg-transparent text-gray-900 text-xl font-bold outline-none placeholder:text-gray-300"
              />
              <Button className="bg-[#C9A961] hover:bg-[#B89751] text-white px-10 py-5 h-auto font-black rounded-xl shadow-lg hover:-translate-y-1 active:scale-95 transition-all duration-300 text-lg uppercase tracking-widest ml-2 shrink-0">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Results */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          {/* Filter Row — Solid Spacing */}
          <div className="flex flex-wrap items-center gap-5 mb-12">
            <div className="flex items-center gap-3 mr-4 border-r border-gray-200 pr-6 uppercase tracking-widest text-[#2C5F2D] font-black text-xs">
              <Filter className="w-4 h-4" />
              <span>Filter By</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-[14px] font-bold transition-all duration-300 border ${selectedCategory === cat
                      ? 'bg-[#2C5F2D] text-white border-[#2C5F2D] shadow-md'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-[#2C5F2D] hover:bg-gray-50'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results Header */}
          <div className="mb-10 flex items-center justify-between">
            <p className="text-sm text-gray-500 font-medium">Showing <span className="text-[#2C5F2D] font-bold">{filteredCourses.length}</span> professional modules</p>
            <div className="h-px bg-gray-100 flex-1 mx-8 hidden sm:block"></div>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => toast.info(course.title, {
                  description: `Course enrollment coming soon: ${course.title}`,
                })}
              />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-24 bg-gray-50 rounded-[24px] border-2 border-dashed border-gray-200">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Search className="w-10 h-10 text-gray-200" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-500">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </section>

      {/* Enrollment CTA */}
      <section className="py-24 bg-[#2C5F2D] text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
          <h2 className="text-4xl font-bold mb-6 tracking-tight">Can't decide where to start?</h2>
          <p className="text-white/80 mb-12 max-w-2xl mx-auto text-xl font-medium leading-relaxed">Take our faith-assessment quiz to find the perfect learning path for your current level of spiritual knowledge.</p>
          <Button size="lg" className="bg-[#C9A961] hover:bg-[#B89751] text-white px-12 py-7 h-auto text-xl font-bold rounded-2xl shadow-xl hover:scale-105 transition-all">
            Start Assessment
          </Button>
        </div>
      </section>
    </div>
  );
}

const Filter = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
