import { Target, Heart, Shield, CheckCircle, BookOpen, Scale, Sparkles, Award } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

export function AboutPage() {
  const values = [
    {
      icon: Sparkles,
      title: 'Faith-Centered Service',
      description: 'Every initiative is grounded in sincerity, accountability, and Islamic ethics.',
    },
    {
      icon: Shield,
      title: 'Dignity Before Dependency',
      description: 'We prioritize empowerment over short-term relief.',
    },
    {
      icon: BookOpen,
      title: 'Knowledge with Purpose',
      description: 'Education is the foundation of personal and community development.',
    },
    {
      icon: Scale,
      title: 'Transparency & Trust',
      description: 'We maintain integrity in operations, finances, and partnerships.',
    },
    {
      icon: Heart,
      title: 'Compassion in Action',
      description: 'We believe service is not optional; it is a responsibility.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to the highest standards in all we do.',
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#2C5F2D] to-[#4A8B4D] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Two Finger Foundation</h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            Dedicated to serving humanity with compassion, dignity, and unwavering commitment to Islamic values
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-gradient-to-br from-[#FAF8F3] via-[#F5F1E8] to-[#F2EFE7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2C5F2D]">Who We Are</h2>
          </div>
          <Card className="bg-white border border-[#C9A961]/20 shadow-lg">
            <CardContent className="p-8 text-center">
              <p className="text-lg leading-relaxed mb-6 text-gray-600">
                Two Finger Foundation (TFF) is a faith-centered humanitarian initiative committed to restoring dignity, strengthening communities, and guiding vulnerable individuals toward stability and purpose.
              </p>
              <p className="text-lg leading-relaxed mb-6 text-gray-600">
                We serve widows, orphans, and new Muslims through structured support systems that combine compassion with education. Our approach goes beyond temporary relief. We focus on empowerment, character development, and sustainable transformation rooted in Islamic values.
              </p>
              <p className="text-lg leading-relaxed text-gray-600">
                TFF was established on the belief that real change requires both spiritual guidance and practical support. We work to build individuals who are confident in faith, equipped with knowledge, and supported by community.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="py-20 bg-gradient-to-br from-[#FAF8F3] to-[#F5F1E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="border-2 border-[#C9A961]/30">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-10 h-10 text-[#C9A961]" />
                  <h3 className="text-2xl font-bold text-[#2C5F2D]">Our Vision</h3>
                </div>
                <div className="text-gray-600 leading-relaxed space-y-3">
                  <p>
                    To build a world where no widow feels abandoned, no orphan feels forgotten, and no new Muslim walks alone.
                  </p>
                  <p>
                    We envision communities strengthened by compassion, guided by faith, and empowered through knowledge.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-[#C9A961]/30">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-10 h-10 text-[#C9A961]" />
                  <h3 className="text-2xl font-bold text-[#2C5F2D]">Our Mission</h3>
                </div>
                <ul className="text-gray-600 leading-relaxed space-y-2 list-disc list-outside pl-6 marker:text-[#C9A961] marker:font-bold">
                  <li>To provide structured support programs for widows, orphans, and new Muslims.</li>
                  <li>To develop educational resources that make Islamic knowledge accessible and practical.</li>
                  <li>To transform charitable giving into sustainable impact.</li>
                  <li>To nurture individuals who grow in faith, dignity, and independence.</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-[#2C5F2D] mb-4">Our Core Values</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide every decision we make and every action we take
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-2 border-transparent hover:border-[#C9A961]">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#C9A961] to-[#8B7355] rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-[#2C5F2D] mb-3">{value.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why TFF */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C5F2D] mb-4">Why TFF</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-l-4 border-l-[#C9A961]">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-[#2C5F2D] mb-3">Structured Support, Not Random Charity</h4>
                <p className="text-gray-600 leading-relaxed">
                  Many charitable efforts provide temporary relief. TFF develops structured programs that guide beneficiaries toward long-term stability, education, and self-reliance.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-[#C9A961]">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-[#2C5F2D] mb-3">Faith and Practical Development Combined</h4>
                <p className="text-gray-600 leading-relaxed">
                  We address both spiritual and material needs. Our model integrates Islamic guidance with real-world solutions, creating balanced growth.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-[#C9A961]">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-[#2C5F2D] mb-3">Scalable Impact Through Education</h4>
                <p className="text-gray-600 leading-relaxed">
                  Through booklets, training programs, digital platforms, and community initiatives, TFF builds systems that expand impact beyond one-time interventions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Founder's Message */}
      <section className="py-20 bg-gradient-to-br from-[#FAF8F3] via-[#F5F1E8] to-[#F2EFE7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2C5F2D]">A Message from the Founder</h2>
          </div>
          <Card className="bg-white border border-[#C9A961]/20 shadow-lg">
            <CardContent className="p-8">
              <p className="text-lg leading-relaxed mb-6 text-gray-600">
                Two Finger Foundation was born from a simple realization: compassion must be organized to create real change.
              </p>
              <p className="text-lg leading-relaxed mb-6 text-gray-600">
                Our communities face challenges that require more than sympathy. They require structure, sincerity, and sustained effort. TFF is our commitment to serving with responsibility and excellence.
              </p>
              <p className="text-lg leading-relaxed mb-6 text-gray-600">
                I invite you not just to support this mission, but to become part of it. Together, we can transform lives with faith, dignity, and purpose.
              </p>
              <p className="text-[#C9A961] font-semibold mt-8 text-xl">
                — Mr. Ashar Azeem
                <br />
                <span className="text-base text-gray-600">Founder, Two Finger Foundation</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
