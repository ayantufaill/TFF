import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Play, BookOpen } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1626303298621-984f671f8a82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3NxdWUlMjBpc2xhbWljJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1NjA3NzQzMnww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Beautiful Islamic Architecture"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        
        {/* Islamic Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Arabic Calligraphy */}
        <div className="mb-6">
          <div className="text-4xl md:text-6xl lg:text-7xl text-white mb-4 font-arabic leading-relaxed" 
               style={{ fontFamily: 'serif', direction: 'rtl' }}>
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </div>
          <p className="text-lg md:text-xl text-gray-200 italic">
            "In the name of Allah, the Most Gracious, the Most Merciful"
          </p>
        </div>

        {/* Quran Verse */}
        <div className="mb-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
          <div className="text-2xl md:text-3xl text-white mb-3 leading-relaxed" 
               style={{ fontFamily: 'serif', direction: 'rtl' }}>
            وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا
          </div>
          <p className="text-gray-200">
            "And whoever fears Allah - He will make for him a way out" - Quran 65:2
          </p>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="flex items-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <BookOpen className="w-5 h-5" />
            <span className="font-medium">ابدأ التلاوة الآن</span>
          </button>
          
          <button className="flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
            <Play className="w-5 h-5" />
            <span className="font-medium">معرفة المزيد</span>
          </button>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">1M+</div>
            <div className="text-gray-300">Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">100+</div>
            <div className="text-gray-300">Reciters</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">6,236</div>
            <div className="text-gray-300">Verses</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">50+</div>
            <div className="text-gray-300">Languages</div>
          </div>
        </div>
      </div>
    </section>
  );
}