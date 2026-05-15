import { Link } from 'react-router';
import { Heart, Sun, Scale, Calendar, MapPin, Sparkles, ArrowRight, BookMarked } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

const PILLARS = [
  { icon: Heart, title: 'Shahadah', subtitle: 'Declaration of Faith', description: 'The sincere declaration that there is no god worthy of worship except Allah, and that Muhammad ﷺ is His Messenger. The gateway to Islam and the foundation of a life of purpose and peace.' },
  { icon: Sun, title: 'Salah', subtitle: 'Prayer', description: 'Five daily prayers that connect the believer with Allah, bring discipline, and centre the heart on gratitude and remembrance throughout the day.' },
  { icon: Scale, title: 'Zakat', subtitle: 'Charity', description: 'Giving a portion of one’s wealth to those in need. It purifies wealth, uplifts communities, and reminds us that everything we have is a trust from Allah.' },
  { icon: Calendar, title: 'Sawm', subtitle: 'Fasting in Ramadan', description: 'Fasting from dawn to sunset during Ramadan. It builds self-control, empathy for the hungry, and draws the heart closer to Allah.' },
  { icon: MapPin, title: 'Hajj', subtitle: 'Pilgrimage', description: 'The pilgrimage to Makkah, once in a lifetime for those who are able. A journey of unity, equality, and devotion shared by millions worldwide.' },
];

const FIRST_STEPS = [
  { title: 'Understand the Shahadah', body: 'Learn the meaning and beauty of the declaration of faith.', to: '/cause-of-tff', label: 'Learn more' },
  { title: 'Daily Ayat & Hadith', body: 'A verse from the Qur’an or a saying of the Prophet ﷺ each day.', to: '/daily-ayat-hadith', label: 'Read today’s' },
  { title: 'Free Books & Guides', body: 'Clear, gentle introductions from Light of Faith to The New Muslims Guide.', to: '/downloads', label: 'Browse downloads' },
  { title: 'Azkaar & Dua', body: 'Short remembrances and supplications for morning, evening, and daily life.', to: '/azkaar-dua', label: 'Explore duas' },
];

export function DiscoveringIslamPage() {
  return (
    <div className="min-h-[60vh]">
      {/* Hero – bilkul same as Downloads / Articles (green banner, white text) */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#1B2A4A] to-[#2D4A8A] text-white shadow-[0_4px_0_0_rgba(0,0,0,0.06)] min-h-[17rem] sm:min-h-[20rem] lg:min-h-[24rem] flex flex-col justify-center">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 sm:w-2 bg-gradient-to-b from-[#C9A961] to-[#8B7355] z-10" aria-hidden />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Discovering Islam
          </h1>
          <div className="inline-block w-24 h-1.5 rounded-full bg-gradient-to-r from-[#C9A961] to-[#8B7355] mb-5" aria-hidden />
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
            A journey of faith, knowledge, and peace. Learn what Islam is, what Muslims believe, and take your first steps with clarity and confidence.
          </p>
        </div>
      </section>

      {/* Cream strip – same as Downloads / Articles */}
      <div className="h-12 sm:h-16 lg:h-20 shrink-0 bg-[#FAF8F4]" aria-hidden />

      {/* Content – same section style as Articles (gradient background + left gold bar) */}
      <section className="relative overflow-hidden pt-16 sm:pt-20 lg:pt-24 pb-24 sm:pb-36 lg:pb-44">
        <div
          className="absolute inset-0 opacity-[0.98]"
          style={{
            backgroundImage: 'linear-gradient(165deg, #FAF8F4 0%, #F6F3ED 25%, #F9F7F2 50%, #F4F1EA 75%, #F2EFE7 100%)',
          }}
          aria-hidden
        />
        <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-2 bg-gradient-to-b from-[#C9A961]/50 to-[#8B7355]/40 z-10" aria-hidden />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* What is Islam – card same style as project */}
          <div className="rounded-[24px] border border-gray-200/80 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] p-6 sm:p-8 mb-10 sm:mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-[#C9A961]/10 text-[#C9A961]">
                <Sparkles className="w-5 h-5" />
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1B2A4A]">What is Islam?</h2>
            </div>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4">
              <strong className="text-[#1B2A4A]">Islam</strong> means submission to the One God—Allah—in peace. Muslims believe that Allah created the universe, sent guidance through prophets and books, and that life has a purpose: to worship Him, do good, and prepare for the life to come.
            </p>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              Islam is built on clarity, mercy, and balance. Discovering Islam is a journey of the mind and the heart—one that millions have taken and found peace, direction, and a connection with their Creator.
            </p>
          </div>

          {/* Section heading – same as HomePage / Articles */}
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1B2A4A] mb-3 tracking-tight">
              The Five Pillars of Islam
            </h2>
            <div className="inline-block w-20 h-1.5 rounded-full bg-gradient-to-r from-[#C9A961] to-[#8B7355] mb-3" aria-hidden />
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              The foundation of a Muslim’s faith and practice—five acts that shape life, character, and connection with Allah.
            </p>
          </div>

          {/* Pillars – cards same as project (rounded-xl, border, hover) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-12 sm:mb-14">
            {PILLARS.map((pillar, i) => (
              <Card
                key={pillar.title}
                className="border border-gray-200/80 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:border-[#C9A961]/60 hover:shadow-[0_8px_24px_rgba(44,95,45,0.12)] transition-all duration-200"
              >
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-[#C9A961]/10 text-[#C9A961]">
                      <pillar.icon className="w-5 h-5" />
                    </span>
                    <div className="min-w-0">
                      <span className="inline-block text-[11px] sm:text-xs font-semibold text-[#7b5b1f] bg-[#C9A961]/15 rounded-full px-2 py-0.5 mb-1">
                        {pillar.subtitle}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-[#1B2A4A] mb-2">{pillar.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{pillar.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* What Muslims Believe – same card style */}
          <div className="rounded-xl border border-gray-200/80 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] p-6 sm:p-8 mb-12 sm:mb-14">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1B2A4A] mb-4 text-center">
              What Muslims Believe
            </h2>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto">
              Muslims believe in <strong className="text-[#1B2A4A]">One God (Allah)</strong>, the <strong className="text-[#1B2A4A]">Angels</strong>, the <strong className="text-[#1B2A4A]">Books</strong> (including the Qur’an), the <strong className="text-[#1B2A4A]">Prophets</strong> (from Adam to Noah, Abraham, Moses, Jesus, and Muhammad ﷺ), the <strong className="text-[#1B2A4A]">Day of Judgment</strong>, and that good and bad are by Allah’s will (<strong className="text-[#1B2A4A]">Qadr</strong>). These six articles of faith give Islam its clarity and coherence.
            </p>
          </div>

          {/* Your Next Steps – same heading + cards as project */}
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1B2A4A] mb-3 tracking-tight">
              Your Next Steps
            </h2>
            <div className="inline-block w-20 h-1.5 rounded-full bg-gradient-to-r from-[#C9A961] to-[#8B7355] mb-3" aria-hidden />
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our resources to deepen your understanding and strengthen your connection with Islam.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {FIRST_STEPS.map((step) => (
              <Link key={step.to} to={step.to} className="group block">
                <Card className="h-full border border-gray-200/80 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:border-[#C9A961]/60 hover:shadow-[0_8px_24px_rgba(44,95,45,0.12)] hover:-translate-y-0.5 transition-all duration-200">
                  <CardContent className="p-4 sm:p-5 flex flex-col h-full">
                    <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#C9A961]/10 text-[#C9A961] mb-3 group-hover:bg-[#C9A961]/20 transition-colors">
                      <BookMarked className="w-5 h-5" />
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#1B2A4A] mb-2 group-hover:text-[#1f3f21]">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-3">
                      {step.body}
                    </p>
                    <span className="inline-flex items-center text-sm font-semibold text-[#1B2A4A] group-hover:text-[#C9A961]">
                      {step.label}
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Quote – solid project green */}
          <div className="mt-12 sm:mt-16 mb-16 sm:mb-24 relative rounded-[24px] overflow-hidden bg-[#1B2A4A] text-white shadow-[0_8px_32px_rgba(44,95,45,0.25)] border border-[#1B2A4A]/90">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 sm:w-2 bg-gradient-to-b from-[#D4AF37] to-[#B8962E]" aria-hidden />
            <div className="absolute inset-0 opacity-[0.06] bg-[length:48px_48px] bg-[url('data:image/svg+xml,%3Csvg width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'1.5\' fill=\'%23fff\'/%3E%3C/svg%3E')]" aria-hidden />
            <div className="relative z-10 px-6 sm:px-10 py-11 sm:py-14 text-center">
              <p className="text-xl sm:text-2xl md:text-3xl font-medium italic text-white leading-relaxed mb-4 max-w-2xl mx-auto drop-shadow-sm">
                “And I did not create the jinn and mankind except to worship Me.”
              </p>
              <p className="text-sm sm:text-base text-[#E8D5A3] font-semibold tracking-wide">— Qur’an 51:56</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
