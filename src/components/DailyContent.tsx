import { Calendar, BookOpen, Share2, Heart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function DailyContent() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Daily Islamic Content
          </h2>
          <div className="text-xl text-gray-600 mb-2" style={{ direction: 'rtl' }}>
            المحتوى الإسلامي اليومي
          </div>
          <p className="text-gray-600">
            Enrich your knowledge with daily hadith and inspiring Islamic articles
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hadith of the Day */}
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8 border border-emerald-200 relative overflow-hidden">
            {/* Decorative Islamic Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1603522456939-a52d4adda873?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwZ2VvbWV0cmljJTIwcGF0dGVybnxlbnwxfHx8fDE3NTYwNDk4NTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Islamic Pattern"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-emerald-800">Hadith of the Day</h3>
                  <div className="text-sm text-emerald-600" style={{ direction: 'rtl' }}>
                    حديث اليوم
                  </div>
                </div>
              </div>

              {/* Arabic Hadith */}
              <div className="bg-white/80 rounded-xl p-6 mb-4">
                <div className="text-lg leading-relaxed text-gray-800 mb-4" style={{ direction: 'rtl' }}>
                  قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «الْمُؤْمِنُ لِلْمُؤْمِنِ كَالْبُنْيَانِ يَشُدُّ بَعْضُهُ بَعْضًا»
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-gray-700 italic mb-2">
                    "The believer to another believer is like a building whose different parts 
                    enforce each other."
                  </p>
                  <div className="text-sm text-gray-600">
                    - Sahih Bukhari
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-emerald-600 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                  <Heart className="w-4 h-4" />
                  Save
                </button>
              </div>
            </div>
          </div>

          {/* Featured Article */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1665627394359-742021bc5110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdXJhbiUyMGhvbHklMjBib29rfGVufDF8fHx8MTc1NjA3NzQzM3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Featured Article"
                className="w-full h-48 object-cover"
              />
              
              <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Featured Article
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500">5 min read</span>
                <span className="text-gray-300">•</span>
                <span className="text-sm text-gray-500">Islamic Knowledge</span>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 leading-tight">
                The Importance of Seeking Knowledge in Islam
              </h3>
              
              <div className="text-sm text-gray-600 mb-4" style={{ direction: 'rtl' }}>
                أهمية طلب العلم في الإسلام
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                Explore the profound emphasis Islam places on seeking knowledge and education. 
                From the first revelation to the Prophet Muhammad (PBUH) to the countless 
                verses and hadiths encouraging learning...
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">SH</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">Sheikh Hassan</div>
                    <div className="text-xs text-gray-500">Islamic Scholar</div>
                  </div>
                </div>

                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* More Content Navigation */}
        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 border border-emerald-600 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors font-medium">
              View All Hadith
            </button>
            <button className="px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium">
              Browse Articles
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}