import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Heart, Users, BookOpen, HandHeart, Globe, TrendingUp, Award, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

// Video section (right after hero): set to your YouTube video ID (from youtube.com/watch?v=XXXXX) or null to hide section.
// For a self-hosted video: put the file in public/ (e.g. public/intro.mp4) and replace the iframe block with: <video src="/intro.mp4" controls className="w-full h-full" />
const HERO_VIDEO_YOUTUBE_ID = '3uNNZ9h3vS8' as string | null;

const HERO_TAGLINES = [
  { headline: 'Empowering Widows, Supporting Orphans, Guiding New Muslims to a Stronger Future', subtitle: 'Building a compassionate community through dignity, support, and faith' },
  { headline: 'Extending Hands Where Hope Is Fading. Serving Humanity with Purpose', subtitle: 'Because Every Life Deserves Dignity and Opportunity. Eternal Impact.' },
  { headline: 'Empowering Widows, Uplifting Families, Strengthening Communities.', subtitle: 'Your Support Builds Sustainable Futures, Reaching Where Others Can\'t.' },
  { headline: 'Restoring Dignity. Rebuilding Hope. Empowering Futures.', subtitle: 'From Survival to Self-Reliance — Together We Rise.' },
];

export function HomePage() {
  const globalReachRef = useRef<HTMLElement>(null);
  const [globalReachInView, setGlobalReachInView] = useState(false);
  const [heroTaglineIndex, setHeroTaglineIndex] = useState(0);
  const [heroLeavingIndex, setHeroLeavingIndex] = useState<number | null>(null);
  const [heroLeavingVisible, setHeroLeavingVisible] = useState(false);
  const [heroEntering, setHeroEntering] = useState(true);
  const heroTaglineRef = useRef(0);
  heroTaglineRef.current = heroTaglineIndex;

  useEffect(() => {
    const el = globalReachRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setGlobalReachInView(true);
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setHeroEntering(false), 80);
    return () => clearTimeout(t);
  }, [heroTaglineIndex]);

  useEffect(() => {
    if (heroLeavingIndex === null) return;
    setHeroLeavingVisible(true);
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setHeroLeavingVisible(false));
    });
    return () => cancelAnimationFrame(raf);
  }, [heroLeavingIndex]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const intervalId = setInterval(() => {
      if (timeoutId) clearTimeout(timeoutId);
      const current = heroTaglineRef.current;
      setHeroLeavingIndex(current);
      timeoutId = setTimeout(() => {
        setHeroTaglineIndex((prev) => (prev + 1) % HERO_TAGLINES.length);
        setHeroEntering(true);
        setHeroLeavingIndex(null);
        setHeroLeavingVisible(false);
        timeoutId = null;
      }, 700);
    }, 5000);
    return () => {
      clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const beneficiaries = [
    {
      icon: Heart,
      title: 'Widows Support',
      description: 'Widows often face emotional loss, social isolation, and economic hardship after losing their life partners. At Two Finger Foundation, we work to restore dignity by providing emotional care, skills development, and sustainable support systems that help widows move from dependency to self-reliance and regain their rightful place in society.',
      image: 'https://images.unsplash.com/photo-1601114174531-4d95d279713e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aWRvdyUyMHdvbWFuJTIwc3VwcG9ydHxlbnwxfHx8fDE3Njk0NTA1MDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: Users,
      title: 'Orphans Support',
      description: 'Orphans are among the most vulnerable members of any community, deserving protection, education, and love. We focus on nurturing their potential through education, healthcare, and mentorship, ensuring they grow with confidence, stability, and hope for a brighter future.',
      image: 'https://images.unsplash.com/photo-1666281269793-da06484657e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGVkdWNhdGlvbiUyMGFmcmljYXxlbnwxfHx8fDE3NjkzOTIyMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: BookOpen,
      title: 'New Revert Support',
      description: 'Accepting Islam is a profound and courageous journey, often accompanied by confusion, social pressure, and emotional challenges. We support new reverts by offering guidance, learning resources, and a caring community, helping them build strong foundations in faith while feeling welcomed, valued, and never alone.',
      image: 'https://images.unsplash.com/photo-1761640865509-31fa5c46cba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3NxdWUlMjBwcmF5ZXIlMjBjb21tdW5pdHl8ZW58MXx8fHwxNzY5NDUwNTAyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const programs = [
    {
      title: 'Widow Empowerment',
      description: 'Financial aid, vocational training, and legal support',
      icon: Heart,
    },
    {
      title: 'Orphan Care',
      description: 'Education, mentorship, and holistic development',
      icon: Users,
    },
    {
      title: 'Revert Support',
      description: 'Islamic education, community integration, spiritual guidance',
      icon: BookOpen,
    },
    {
      title: 'Emergency Relief',
      description: 'Food distribution, medical aid, crisis response',
      icon: HandHeart,
    },
  ];

  const impactStats = [
    { number: '20+', label: 'Countries Served', icon: Globe },
    { number: '5,000+', label: 'Families Supported', icon: Users },
    { number: '12,000+', label: 'Children Educated', icon: BookOpen },
    { number: '95%', label: 'Transparency Rating', icon: Award },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#2C5F2D] to-[#4A8B4D] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1558114965-eeb97aa84c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwcGF0dGVybnxlbnwxfHx8fDE3Njk0NTA1MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Islamic pattern"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 text-center">
          <div className="mb-10 sm:mb-12 text-[#C9A961] text-base sm:text-lg leading-relaxed" dir="rtl" style={{ minHeight: '2.5rem' }}>
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
          {/* Headline: fixed height, centered – clear gap above so no overlap with Arabic */}
          <div className="relative min-h-[5rem] h-24 sm:h-28 md:h-32 lg:h-36 flex items-center justify-center mb-8 sm:mb-10 px-2 mt-0">
            {heroLeavingIndex !== null && (
              <h1
                key={`leave-${heroLeavingIndex}`}
                className={`absolute inset-0 flex items-center justify-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center transition-opacity duration-700 ease-in-out px-2 leading-tight ${
                  heroLeavingVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {HERO_TAGLINES[heroLeavingIndex].headline}
              </h1>
            )}
            <h1
              key={heroTaglineIndex}
              className={`absolute inset-0 flex items-center justify-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center transition-opacity duration-700 ease-in-out px-2 leading-tight ${
                heroEntering ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {HERO_TAGLINES[heroTaglineIndex].headline}
            </h1>
          </div>
          {/* Subtitle: fixed height, below headline, above buttons */}
          <div className="relative min-h-[3rem] h-12 sm:h-14 md:h-16 flex items-center justify-center mb-8 sm:mb-10 px-2">
            {heroLeavingIndex !== null && (
              <p
                key={`sub-leave-${heroLeavingIndex}`}
                className={`absolute inset-0 flex items-center justify-center text-base sm:text-xl md:text-2xl font-normal text-gray-100 text-center transition-opacity duration-700 ease-in-out max-w-3xl mx-auto ${
                  heroLeavingVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {HERO_TAGLINES[heroLeavingIndex].subtitle}
              </p>
            )}
            <p
              key={`sub-${heroTaglineIndex}`}
              className={`absolute inset-0 flex items-center justify-center text-base sm:text-xl md:text-2xl font-normal text-gray-100 text-center transition-opacity duration-700 ease-in-out max-w-3xl mx-auto ${
                heroEntering ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {HERO_TAGLINES[heroTaglineIndex].subtitle}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center px-1">
            <Link to="/cause-of-tff">
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white px-4 py-4 sm:px-6 sm:py-6 text-sm sm:text-lg shrink-0">
                Cause of TFF
              </Button>
            </Link>
            <Link to="/daily-ayat-hadith">
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white px-4 py-4 sm:px-6 sm:py-6 text-sm sm:text-lg shrink-0">
                Daily Ayat and Hadith
              </Button>
            </Link>
            <Link to="/azkaar-dua">
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white px-4 py-4 sm:px-6 sm:py-6 text-sm sm:text-lg shrink-0">
                Azkaar / Dua
              </Button>
            </Link>
            <Link to="/donate">
              <Button size="lg" className="bg-[#C9A961] hover:bg-[#B89751] text-white px-4 py-4 sm:px-6 sm:py-6 text-sm sm:text-lg shrink-0">
                Donate Now
              </Button>
            </Link>
          </div>
          {/* Sliding white dots - inline styles so they always show */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.75rem' }}>
            <div style={{ display: 'inline-flex', gap: 10, position: 'relative', alignItems: 'center', height: 14 }}>
              <span
                role="presentation"
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: '#fff',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                  transform: `translate(${heroTaglineIndex * (10 + 10)}px, -50%)`,
                  transition: 'transform 0.3s ease-out',
                  zIndex: 10,
                }}
              />
              {HERO_TAGLINES.map((_, i) => (
                <span
                  key={i}
                  role="presentation"
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.6)',
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Section - right after banner */}
      {/* Width: change max-w-6xl → max-w-4xl (narrower) / max-w-7xl (wider). Height: aspect-video = 16:9; or use h-[400px] / h-[50vh] for fixed height */}
      {HERO_VIDEO_YOUTUBE_ID && (
        <section className="py-12 sm:py-16 lg:py-24 bg-[#E8E4DC]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C5F2D] mb-3 sm:mb-4">
                Our Path
              </h2>
              <div className="inline-block w-20 h-1.5 rounded-full bg-gradient-to-r from-[#C9A961] to-[#8B7355] mb-3 sm:mb-4" aria-hidden />
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-1">
                Discover our journey, our mission, and the impact we&apos;re making in communities worldwide
              </p>
            </div>
            <div className="aspect-square w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg bg-gray-200">
              <iframe
                title="TFF Video"
                src={`https://www.youtube.com/embed/${HERO_VIDEO_YOUTUBE_ID}`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      {/* Who We Serve - textured background (geometric pattern, soft gold top-left to white bottom-right) */}
      <section className="py-12 sm:py-16 lg:py-24 relative overflow-hidden">
        {/* Background: cream base + geometric pattern + gradient (gold top-left → white bottom-right) */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundColor: '#FAF8F3',
            backgroundImage: 'linear-gradient(135deg, rgba(201,169,97,0.14) 0%, rgba(250,248,243,0.4) 35%, rgba(255,255,255,0.9) 100%), url(/pattern-geometric.svg)',
            backgroundSize: 'auto, 120px 120px',
            backgroundRepeat: 'repeat',
          }}
          aria-hidden
        />
        <div className="absolute left-0 top-0 bottom-0 w-1.5 sm:w-2 bg-gradient-to-b from-[#C9A961] to-[#8B7355] z-10" aria-hidden />
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10 sm:mb-16">
           
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C5F2D] mb-5 tracking-tight">Who We Serve</h2>
            <div className="inline-block w-24 h-1 rounded-full bg-gradient-to-r from-[#C9A961] to-[#8B7355] mb-5" aria-hidden />
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium px-1">
              Providing comprehensive support to those in need with dignity and compassion
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {beneficiaries.map((beneficiary, index) => (
              <Card
                key={index}
                className="group overflow-hidden bg-white border border-gray-200/80 rounded-2xl shadow-[0_4px_14px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(44,95,45,0.12)] hover:-translate-y-2 hover:border-[#C9A961]/40 transition-all duration-300"
              >
                <div className="h-0.5 w-full bg-gradient-to-r from-[#C9A961] to-[#8B7355] opacity-80" aria-hidden />
                <div className="h-48 overflow-hidden">
                  <ImageWithFallback
                    src={beneficiary.image}
                    alt={beneficiary.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C9A961]/20 to-[#2C5F2D]/10 flex items-center justify-center ring-2 ring-[#C9A961]/30 group-hover:ring-[#C9A961] group-hover:scale-110 transition-all duration-300 shrink-0">
                      <beneficiary.icon className="w-7 h-7 text-[#C9A961]" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#2C5F2D]">{beneficiary.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{beneficiary.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Global Reach - Design 2: soft left frame */}
      <section ref={globalReachRef} className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#FAF8F3] to-[#F8F6F0] overflow-x-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-[#C9A961]/15 z-10" aria-hidden />
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-10 sm:mb-16 transition-all duration-700 ease-out ${
              globalReachInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C5F2D] mb-3 sm:mb-4">Our Global Reach</h2>
            <div className="inline-block w-20 h-1.5 rounded-full bg-gradient-to-r from-[#C9A961]/90 to-[#8B7355]/90 mb-3 sm:mb-4" aria-hidden />
            <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto px-1">
              Making a difference in communities across the world
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div
              className={`rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-700 ease-out delay-150 ${
                globalReachInView ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-8 scale-[0.98]'
              }`}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1619392553201-3d9ab3169271?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JsZCUyMGdsb2JlJTIwbWFwfGVufDF8fHx8MTc2OTQwNTcyOHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Global reach"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {impactStats.map((stat, index) => (
                  <div
                    key={index}
                    className={`group bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-gray-200/70 transition-all duration-500 ease-out hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:scale-[1.02] hover:border-[#C9A961]/20 ${
                      globalReachInView
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-6'
                    }`}
                    style={
                      globalReachInView
                        ? { transitionDelay: `${200 + index * 100}ms` }
                        : undefined
                    }
                  >
                    <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 text-[#C9A961] mb-2 sm:mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:text-[#B89751]" />
                    <div className="text-2xl sm:text-3xl font-bold text-[#2C5F2D] mb-0.5 sm:mb-1">{stat.number}</div>
                    <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
              <p
                className={`text-gray-500 leading-relaxed transition-all duration-700 ease-out delay-500 ${
                  globalReachInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                Our presence spans across Asia, Africa, and the Middle East, bringing hope and support to communities in need. Every contribution helps us expand our reach and deepen our impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Programs Snapshot - Design 2: soft left frame */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white relative">
        <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-[#C9A961]/15 z-10" aria-hidden />
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C5F2D] mb-3 sm:mb-4">Our Key Programs</h2>
            <div className="inline-block w-20 h-1.5 rounded-full bg-gradient-to-r from-[#C9A961]/90 to-[#8B7355]/90 mb-3 sm:mb-4" aria-hidden />
            <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto px-1">
              Comprehensive support systems designed to create lasting change
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {programs.map((program, index) => (
              <Card key={index} className="group bg-white border border-gray-200/70 rounded-xl sm:rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:border-[#C9A961]/20 transition-all duration-300 cursor-pointer">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#C9A961] to-[#8B7355] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-105 transition-transform duration-300">
                    <program.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#2C5F2D] mb-2 sm:mb-3">{program.title}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{program.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-6 sm:mt-10">
            <Button size="lg" className="bg-[#2C5F2D] hover:bg-[#234F24] text-white cursor-default" type="button">
              View All Programs
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Highlights - Design 2: soft left frame */}
      <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#2C5F2D] to-[#4A8B4D] text-white overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-[#C9A961]/30 z-10" aria-hidden />
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Our Impact</h2>
            <div className="inline-block w-20 h-1.5 rounded-full bg-[#C9A961]/90 mb-3 sm:mb-4" aria-hidden />
            <p className="text-base sm:text-lg text-gray-100 max-w-2xl mx-auto px-1">
              Real stories, real change, real hope
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="flex items-start gap-3 sm:gap-4">
                  <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 text-[#C9A961] flex-shrink-0" />
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Quantitative Impact</h3>
                    <ul className="space-y-1.5 sm:space-y-2 text-gray-100 text-sm sm:text-base">
                      <li>• 5,000+ families receiving monthly support</li>
                      <li>• 12,000+ children enrolled in educational programs</li>
                      <li>• 3,500+ widows trained in vocational skills</li>
                      <li>• 2,000+ new Muslims guided through training modules</li>
                      <li>• 50,000+ beneficiaries reached through emergency relief</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="flex items-start gap-3 sm:gap-4">
                  <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-[#C9A961] flex-shrink-0" />
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Testimonial</h3>
                    <p className="text-gray-100 italic leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                      "After losing my husband, I felt lost and unable to provide for my children. Two Finger Foundation gave me hope, skills training, and the support I needed to stand on my own feet. Today, I run my own small business and can send my children to school with dignity."
                    </p>
                    <p className="text-[#C9A961] font-semibold">— Amina, Widow & Entrepreneur</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action - Design 2: soft left frame */}
      <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#FAF8F3] to-[#F8F6F0]">
        <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-[#C9A961]/15 z-10" aria-hidden />
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C5F2D] mb-3 sm:mb-4">
            Be Part of the Change
          </h2>
          <div className="inline-block w-20 h-1.5 rounded-full bg-gradient-to-r from-[#C9A961]/90 to-[#8B7355]/90 mb-4 sm:mb-6" aria-hidden />
          <p className="text-base sm:text-lg text-gray-500 mb-8 sm:mb-10 leading-relaxed px-1">
            Your support can transform lives. Whether through donation, volunteering, or seeking help, 
            every action creates ripples of positive change in our community.
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            <Link to="/donate">
              <Button size="lg" className="bg-[#C9A961] hover:bg-[#B89751] text-white px-6 py-4 sm:px-10 sm:py-6 text-sm sm:text-lg w-full sm:w-auto">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Donate Now
              </Button>
            </Link>
            <Link to="/volunteer">
              <Button size="lg" variant="outline" className="border-[#2C5F2D] text-[#2C5F2D] hover:bg-[#2C5F2D] hover:text-white px-6 py-4 sm:px-10 sm:py-6 text-sm sm:text-lg w-full sm:w-auto">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Volunteer
              </Button>
            </Link>
            <Link to="/get-help">
              <Button size="lg" variant="outline" className="border-[#2C5F2D] text-[#2C5F2D] hover:bg-[#2C5F2D] hover:text-white px-6 py-4 sm:px-10 sm:py-6 text-sm sm:text-lg w-full sm:w-auto">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Get Help
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators - Design 2: soft left frame */}
      <section className="relative py-10 sm:py-16 bg-white border-t border-gray-200/80">
        <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-[#C9A961]/15 z-10" aria-hidden />
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-10">
            <h3 className="text-xl sm:text-2xl font-semibold text-[#2C5F2D] mb-2">Trusted & Transparent</h3>
            <div className="inline-block w-20 h-1.5 rounded-full bg-gradient-to-r from-[#C9A961]/90 to-[#8B7355]/90 mb-2" aria-hidden />
            <p className="text-gray-500 text-sm sm:text-base px-1">Registered charity with full accountability and transparency</p>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 text-gray-600 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-[#2C5F2D] shrink-0" />
              <span className="font-semibold text-gray-600 text-sm sm:text-base">501(c)(3) Certified</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Award className="w-7 h-7 sm:w-8 sm:h-8 text-[#C9A961] shrink-0" />
              <span className="font-semibold text-gray-600 text-sm sm:text-base">95% Transparency Rating</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Globe className="w-7 h-7 sm:w-8 sm:h-8 text-[#2C5F2D] shrink-0" />
              <span className="font-semibold text-gray-600 text-sm sm:text-base">Global Impact Network</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
