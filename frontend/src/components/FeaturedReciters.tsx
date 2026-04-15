import { Play, Heart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function FeaturedReciters() {
  const reciters = [
    {
      name: "Sheikh Abdul Rahman Al-Sudais",
      nameArabic: "الشيخ عبد الرحمن السديس",
      bio: "Imam of the Grand Mosque in Mecca",
      image: "https://images.unsplash.com/photo-1637518026117-9d1ac5e73f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNsaW0lMjBwcmF5ZXJ8ZW58MXx8fHwxNzU2MTMwNjExfDA&ixlib=rb-4.1.0&q=80&w=1080",
      listeners: "2.5M",
      featured: true
    },
    {
      name: "Sheikh Mishary Rashid Alafasy",
      nameArabic: "الشيخ مشاري راشد العفاسي",
      bio: "Renowned Quran reciter from Kuwait",
      image: "https://images.unsplash.com/photo-1637518026117-9d1ac5e73f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNsaW0lMjBwcmF5ZXJ8ZW58MXx8fHwxNzU2MTMwNjExfDA&ixlib=rb-4.1.0&q=80&w=1080",
      listeners: "1.8M",
      featured: false
    },
    {
      name: "Sheikh Saad Al-Ghamdi",
      nameArabic: "الشيخ سعد الغامدي",
      bio: "Imam of the Holy Mosque in Mecca",
      image: "https://images.unsplash.com/photo-1637518026117-9d1ac5e73f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNsaW0lMjBwcmF5ZXJ8ZW58MXx8fHwxNzU2MTMwNjExfDA&ixlib=rb-4.1.0&q=80&w=1080",
      listeners: "1.2M",
      featured: false
    },
    {
      name: "Sheikh Maher Al-Muaiqly",
      nameArabic: "الشيخ ماهر المعيقلي",
      bio: "Imam of the Prophet's Mosque in Medina",
      image: "https://images.unsplash.com/photo-1637518026117-9d1ac5e73f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNsaW0lMjBwcmF5ZXJ8ZW58MXx8fHwxNzU2MTMwNjExfDA&ixlib=rb-4.1.0&q=80&w=1080",
      listeners: "980K",
      featured: false
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Featured Reciters
          </h2>
          <div className="text-xl text-gray-600 mb-2" style={{ direction: 'rtl' }}>
            القراء المميزون
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Listen to the most beautiful Quran recitations from world-renowned reciters
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reciters.map((reciter, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="relative">
                <ImageWithFallback
                  src={reciter.image}
                  alt={reciter.name}
                  className="w-full h-48 object-cover"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 hover:bg-white">
                    <Play className="w-6 h-6 text-emerald-600 ml-1" />
                  </button>
                </div>

                {/* Featured Badge */}
                {reciter.featured && (
                  <div className="absolute top-3 left-3 bg-emerald-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </div>
                )}

                {/* Favorite Button */}
                <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-gray-800 mb-1">
                  {reciter.name}
                </h3>
                <div className="text-sm text-gray-500 mb-2" style={{ direction: 'rtl' }}>
                  {reciter.nameArabic}
                </div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {reciter.bio}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    {reciter.listeners} listeners
                  </div>
                  <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors">
                    View All →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors font-medium">
            View All Reciters
          </button>
        </div>
      </div>
    </section>
  );
}