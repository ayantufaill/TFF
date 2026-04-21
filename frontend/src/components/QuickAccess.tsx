import { BookOpen, Clock, Headphones, FileText } from "lucide-react";

export function QuickAccess() {
  const features = [
    {
      icon: BookOpen,
      title: "Read Quran",
      titleArabic: "اقرأ القرآن",
      description: "Access the complete Quran with translations in 50+ languages",
      color: "bg-emerald-500",
      hoverColor: "hover:bg-emerald-600"
    },
    {
      icon: Clock,
      title: "Prayer Times",
      titleArabic: "أوقات الصلاة",
      description: "Accurate prayer times for your location with notifications",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600"
    },
    {
      icon: Headphones,
      title: "Recitations",
      titleArabic: "التلاوات",
      description: "Listen to beautiful Quran recitations by renowned reciters",
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600"
    },
    {
      icon: FileText,
      title: "Articles & Hadith",
      titleArabic: "المقالات والأحاديث",
      description: "Explore Islamic knowledge through articles and authentic hadith",
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Quick Access
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need for your Islamic journey in one place. Access the Quran,
            prayer times, recitations, and knowledge with ease.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-[24px] p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-100"
            >
              <div className={`w-12 h-12 ${feature.color} ${feature.hoverColor} rounded-xl flex items-center justify-center mb-4 transition-colors group-hover:scale-110 transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              <div className="mb-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {feature.title}
                </h3>
                <div className="text-sm text-gray-500 mb-3" style={{ direction: 'rtl' }}>
                  {feature.titleArabic}
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-emerald-600 text-sm font-medium group-hover:text-emerald-700 transition-colors">
                  Learn more →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}