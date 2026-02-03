import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Heart, Users, BookOpen, HandHeart, Globe, TrendingUp, Award, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

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
      title: 'Widows',
      description: 'Providing financial support, skills training, and legal aid to empower widows toward independence and dignity.',
      image: 'https://images.unsplash.com/photo-1601114174531-4d95d279713e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aWRvdyUyMHdvbWFuJTIwc3VwcG9ydHxlbnwxfHx8fDE3Njk0NTA1MDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: Users,
      title: 'Orphans',
      description: 'Supporting orphans through education sponsorship, mentorship programs, and comprehensive care for a brighter future.',
      image: 'https://images.unsplash.com/photo-1666281269793-da06484657e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGVkdWNhdGlvbiUyMGFmcmljYXxlbnwxfHx8fDE3NjkzOTIyMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: BookOpen,
      title: 'New Muslims',
      description: 'Guiding reverted Muslims with Islamic education, community integration, and spiritual support for their faith journey.',
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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="mb-6 text-[#C9A961] text-lg" dir="rtl">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
          {/* Headline: fixed height, centered */}
          <div className="relative h-24 md:h-28 lg:h-32 flex items-center justify-center mb-4 px-2">
            {heroLeavingIndex !== null && (
              <h1
                key={`leave-${heroLeavingIndex}`}
                className={`absolute inset-0 flex items-center justify-center text-4xl md:text-5xl lg:text-6xl font-bold text-center transition-opacity duration-700 ease-in-out px-2 leading-tight ${
                  heroLeavingVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {HERO_TAGLINES[heroLeavingIndex].headline}
              </h1>
            )}
            <h1
              key={heroTaglineIndex}
              className={`absolute inset-0 flex items-center justify-center text-4xl md:text-5xl lg:text-6xl font-bold text-center transition-opacity duration-700 ease-in-out px-2 leading-tight ${
                heroEntering ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {HERO_TAGLINES[heroTaglineIndex].headline}
            </h1>
          </div>
          {/* Subtitle: fixed height, below headline, above buttons */}
          <div className="relative h-12 md:h-14 flex items-center justify-center mb-8 px-2">
            {heroLeavingIndex !== null && (
              <p
                key={`sub-leave-${heroLeavingIndex}`}
                className={`absolute inset-0 flex items-center justify-center text-xl md:text-2xl font-normal text-gray-100 text-center transition-opacity duration-700 ease-in-out max-w-3xl mx-auto ${
                  heroLeavingVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {HERO_TAGLINES[heroLeavingIndex].subtitle}
              </p>
            )}
            <p
              key={`sub-${heroTaglineIndex}`}
              className={`absolute inset-0 flex items-center justify-center text-xl md:text-2xl font-normal text-gray-100 text-center transition-opacity duration-700 ease-in-out max-w-3xl mx-auto ${
                heroEntering ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {HERO_TAGLINES[heroTaglineIndex].subtitle}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white px-6 py-6 text-lg cursor-default" type="button">
              Cause of TFF
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white px-6 py-6 text-lg cursor-default" type="button">
              Daily Ayat and Hadith
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white px-6 py-6 text-lg cursor-default" type="button">
              Azkaar / Dua
            </Button>
            <Link to="/donate">
              <Button size="lg" className="bg-[#C9A961] hover:bg-[#B89751] text-white px-6 py-6 text-lg">
                Donate Now
              </Button>
            </Link>
          </div>
          {/* Sliding white dots - inline styles so they always show */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.25rem' }}>
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

      {/* Who We Serve - Design 2: soft left frame */}
      <section className="py-20 bg-white relative">
        <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-[#C9A961]/15 z-10" aria-hidden />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C5F2D] mb-4">Who We Serve</h2>
            <div className="inline-block w-20 h-1.5 rounded-full bg-gradient-to-r from-[#C9A961]/90 to-[#8B7355]/90 mb-4" aria-hidden />
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Providing comprehensive support to those in need with dignity and compassion
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {beneficiaries.map((beneficiary, index) => (
              <Card key={index} className="group overflow-hidden bg-white border border-gray-200/70 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-[#C9A961]/20 transition-all duration-300">
                <div className="h-48 overflow-hidden">
                  <ImageWithFallback
                    src={beneficiary.image}
                    alt={beneficiary.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-[#C9A961]/10 rounded-full flex items-center justify-center">
                      <beneficiary.icon className="w-6 h-6 text-[#C9A961]" />
                    </div>
                    <h3 className="text-2xl font-semibold text-[#2C5F2D]">{beneficiary.title}</h3>
                  </div>
                  <p className="text-gray-500 leading-relaxed">{beneficiary.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Global Reach - Design 2: soft left frame */}
      <section ref={globalReachRef} className="py-20 bg-gradient-to-b from-[#FAF8F3] to-[#F8F6F0] overflow-x-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-[#C9A961]/15 z-10" aria-hidden />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-700 ease-out ${
              globalReachInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C5F2D] mb-4">Our Global Reach</h2>
            <div className="inline-block w-20 h-1.5 rounded-full bg-gradient-to-r from-[#C9A961]/90 to-[#8B7355]/90 mb-4" aria-hidden />
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Making a difference in communities across the world
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
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
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {impactStats.map((stat, index) => (
                  <div
                    key={index}
                    className={`group bg-white p-6 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-gray-200/70 transition-all duration-500 ease-out hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:scale-[1.02] hover:border-[#C9A961]/20 ${
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
                    <stat.icon className="w-10 h-10 text-[#C9A961] mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:text-[#B89751]" />
                    <div className="text-3xl font-bold text-[#2C5F2D] mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
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
      <section className="py-20 bg-white relative">
        <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-[#C9A961]/15 z-10" aria-hidden />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C5F2D] mb-4">Our Key Programs</h2>
            <div className="inline-block w-20 h-1.5 rounded-full bg-gradient-to-r from-[#C9A961]/90 to-[#8B7355]/90 mb-4" aria-hidden />
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Comprehensive support systems designed to create lasting change
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, index) => (
              <Card key={index} className="group bg-white border border-gray-200/70 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:border-[#C9A961]/20 transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#C9A961] to-[#8B7355] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
                    <program.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#2C5F2D] mb-3">{program.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{program.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button size="lg" className="bg-[#2C5F2D] hover:bg-[#234F24] text-white cursor-default" type="button">
              View All Programs
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Highlights - Design 2: soft left frame */}
      <section className="relative py-20 bg-gradient-to-br from-[#2C5F2D] to-[#4A8B4D] text-white overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-[#C9A961]/30 z-10" aria-hidden />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <div className="inline-block w-20 h-1.5 rounded-full bg-[#C9A961]/90 mb-4" aria-hidden />
            <p className="text-lg text-gray-100 max-w-2xl mx-auto">
              Real stories, real change, real hope
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <TrendingUp className="w-12 h-12 text-[#C9A961] flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Quantitative Impact</h3>
                    <ul className="space-y-2 text-gray-100">
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
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <Shield className="w-12 h-12 text-[#C9A961] flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Testimonial</h3>
                    <p className="text-gray-100 italic leading-relaxed mb-4">
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
      <section className="relative py-20 bg-gradient-to-b from-[#FAF8F3] to-[#F8F6F0]">
        <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-[#C9A961]/15 z-10" aria-hidden />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C5F2D] mb-4">
            Be Part of the Change
          </h2>
          <div className="inline-block w-20 h-1.5 rounded-full bg-gradient-to-r from-[#C9A961]/90 to-[#8B7355]/90 mb-6" aria-hidden />
          <p className="text-lg text-gray-500 mb-10 leading-relaxed">
            Your support can transform lives. Whether through donation, volunteering, or seeking help, 
            every action creates ripples of positive change in our community.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-[#C9A961] hover:bg-[#B89751] text-white px-10 py-6 text-lg cursor-default" type="button">
              <Heart className="w-5 h-5 mr-2" />
              Donate Now
            </Button>
            <Button size="lg" variant="outline" className="border-[#2C5F2D] text-[#2C5F2D] hover:bg-[#2C5F2D] hover:text-white px-10 py-6 text-lg cursor-default" type="button">
              <Users className="w-5 h-5 mr-2" />
              Volunteer
            </Button>
            <Button size="lg" variant="outline" className="border-[#2C5F2D] text-[#2C5F2D] hover:bg-[#2C5F2D] hover:text-white px-10 py-6 text-lg cursor-default" type="button">
              <BookOpen className="w-5 h-5 mr-2" />
              Get Help
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Indicators - Design 2: soft left frame */}
      <section className="relative py-16 bg-white border-t border-gray-200/80">
        <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-[#C9A961]/15 z-10" aria-hidden />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-semibold text-[#2C5F2D] mb-2">Trusted & Transparent</h3>
            <div className="inline-block w-20 h-1.5 rounded-full bg-gradient-to-r from-[#C9A961]/90 to-[#8B7355]/90 mb-2" aria-hidden />
            <p className="text-gray-500">Registered charity with full accountability and transparency</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-[#2C5F2D]" />
              <span className="font-semibold text-gray-600">501(c)(3) Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-8 h-8 text-[#C9A961]" />
              <span className="font-semibold text-gray-600">95% Transparency Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-8 h-8 text-[#2C5F2D]" />
              <span className="font-semibold text-gray-600">Global Impact Network</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
