import { Play, Users, Clock, Radio } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Simple Live Indicator Component
function LiveIndicator() {
  return (
    <div className="flex items-center gap-1">
      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
      <span>LIVE</span>
    </div>
  );
}

export function VideoSection() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Islamic Lectures & Live Streams
          </h2>
          <div className="text-xl text-gray-600 mb-2" style={{ direction: 'rtl' }}>
            المحاضرات الإسلامية والبث المباشر
          </div>
          <p className="text-gray-600">
            Watch inspiring lectures and join live streams from renowned Islamic scholars
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured Live Stream */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1626303298621-984f671f8a82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3NxdWUlMjBpc2xhbWljJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1NjA3NzQzMnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Live Stream"
                className="w-full h-64 object-cover"
              />
              
              {/* Live Badge */}
              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                <LiveIndicator />
              </div>

              {/* Viewer Count */}
              <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                <Users className="w-3 h-3" />
                2,547
              </div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors group">
                  <Play className="w-8 h-8 text-emerald-600 ml-1 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                <span className="text-sm text-red-600 font-medium">Live Now</span>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Friday Khutbah - The Path of Righteousness
              </h3>
              
              <div className="text-gray-600 mb-4" style={{ direction: 'rtl' }}>
                خطبة الجمعة - طريق البر والتقوى
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-emerald-600">SA</span>
                  </div>
                  <span className="text-sm text-gray-600">Sheikh Ahmed</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  Started 15 min ago
                </div>
              </div>

              <button className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium">
                Join Live Stream
              </button>
            </div>
          </div>

          {/* Recent Videos */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Recent Lectures</h3>
            
            {[
              {
                title: "Understanding the Five Pillars of Islam",
                titleArabic: "فهم أركان الإسلام الخمسة",
                speaker: "Dr. Omar Hassan",
                duration: "45:30",
                views: "12.5K",
                image: "https://images.unsplash.com/photo-1665627394359-742021bc5110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdXJhbiUyMGhvbHklMjBib29rfGVufDF8fHx8MTc1NjA3NzQzM3ww&ixlib=rb-4.1.0&q=80&w=1080"
              },
              {
                title: "The Stories of the Prophets",
                titleArabic: "قصص الأنبياء",
                speaker: "Sheikh Yusuf",
                duration: "1:02:15",
                views: "8.7K",
                image: "https://images.unsplash.com/photo-1665627394359-742021bc5110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdXJhbiUyMGhvbHklMjBib29rfGVufDF8fHx8MTc1NjA3NzQzM3ww&ixlib=rb-4.1.0&q=80&w=1080"
              },
              {
                title: "Patience and Gratitude in Islam",
                titleArabic: "الصبر والشكر في الإسلام",
                speaker: "Ustadh Malik",
                duration: "38:45",
                views: "15.2K",
                image: "https://images.unsplash.com/photo-1665627394359-742021bc5110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdXJhbiUyMGhvbHklMjBib29rfGVufDF8fHx8MTc1NjA3NzQzM3ww&ixlib=rb-4.1.0&q=80&w=1080"
              }
            ].map((video, index) => (
              <div key={index} className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                <div className="relative flex-shrink-0">
                  <ImageWithFallback
                    src={video.image}
                    alt={video.title}
                    className="w-32 h-20 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute bottom-1 right-1 bg-black/70 text-white px-1 py-0.5 rounded text-xs">
                    {video.duration}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-800 mb-1 line-clamp-2">
                    {video.title}
                  </h4>
                  <div className="text-sm text-gray-500 mb-2" style={{ direction: 'rtl' }}>
                    {video.titleArabic}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{video.speaker}</span>
                    <span>•</span>
                    <span>{video.views} views</span>
                  </div>
                </div>
              </div>
            ))}

            <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium">
              View All Videos
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}