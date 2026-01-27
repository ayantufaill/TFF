import { Users, Target, Heart, Shield, Award, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We lead with empathy and understanding in all our actions',
    },
    {
      icon: Shield,
      title: 'Dignity',
      description: 'Treating every individual with respect and honor',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building strong bonds and support networks',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to the highest standards in all we do',
    },
  ];

  const leadership = [
    {
      name: 'Dr. Ahmed Hassan',
      role: 'Founder & Executive Director',
      bio: 'With over 20 years of experience in humanitarian work, Dr. Hassan founded TFF to create sustainable change.',
    },
    {
      name: 'Fatima Al-Rashid',
      role: 'Director of Programs',
      bio: 'Leading our global programs with expertise in community development and Islamic education.',
    },
    {
      name: 'Ibrahim Khalil',
      role: 'Director of Operations',
      bio: 'Ensuring transparent operations and efficient delivery of services across all regions.',
    },
    {
      name: 'Aisha Mohamed',
      role: 'Director of Outreach',
      bio: 'Building partnerships and expanding our reach to serve more communities in need.',
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C5F2D] mb-6">Who We Are</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Two Finger Foundation (TFF) is a global Islamic charitable organization founded in 2010 with a mission to uplift the most vulnerable members of our community—widows, orphans, and new Muslims who have embraced Islam.
                </p>
                <p>
                  Born from a deep commitment to serving humanity and guided by Islamic principles of compassion, justice, and dignity, we work tirelessly to provide comprehensive support that addresses both immediate needs and long-term development.
                </p>
                <p>
                  Our approach is holistic, combining financial assistance, education, skills training, spiritual guidance, and community integration to create sustainable, transformative change. We believe that every individual deserves to live with dignity, purpose, and hope.
                </p>
                <p>
                  With a presence in over 20 countries across Asia, Africa, and the Middle East, we have supported thousands of families and continue to expand our reach to serve more communities in need.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1759709042164-0dd78a39028b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxwaW5nJTIwaGFuZHMlMjBjaGFyaXR5fGVufDF8fHx8MTc2OTQ1MDUwMnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Helping hands"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
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
                <p className="text-gray-600 leading-relaxed">
                  A world where widows, orphans, and new Muslims live with dignity, empowerment, and strong faith—
                  supported by compassionate communities that embody the true spirit of Islamic brotherhood and service.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-[#C9A961]/30">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-10 h-10 text-[#C9A961]" />
                  <h3 className="text-2xl font-bold text-[#2C5F2D]">Our Mission</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To provide comprehensive, dignified support to widows, orphans, and new Muslims through sustainable programs 
                  that address their physical, emotional, spiritual, and economic needs—creating pathways to independence and 
                  strong faith communities.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-[#2C5F2D] mb-4">Our Core Values</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide every decision we make and every action we take
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C5F2D] mb-4">Why Two Finger Foundation?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              What sets us apart in serving our community
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-l-4 border-l-[#C9A961]">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-[#2C5F2D] mb-3">Holistic Approach</h4>
                <p className="text-gray-600 leading-relaxed">
                  We don't just provide financial aid—we address the complete needs of individuals including education, 
                  skills training, spiritual development, and community integration for sustainable change.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-[#C9A961]">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-[#2C5F2D] mb-3">Complete Transparency</h4>
                <p className="text-gray-600 leading-relaxed">
                  Every donation is tracked and reported. With a 95% transparency rating, we ensure your contributions 
                  reach those who need them most with full accountability and detailed impact reporting.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-[#C9A961]">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-[#2C5F2D] mb-3">Islamic Foundation</h4>
                <p className="text-gray-600 leading-relaxed">
                  Rooted in the teachings of Islam, we serve with compassion, justice, and excellence—guided by the 
                  principles of Zakat, Sadaqah, and service to humanity that our faith calls us to uphold.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Founder's Message */}
      <section className="py-20 bg-gradient-to-br from-[#2C5F2D] to-[#4A8B4D] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">A Message from Our Founder</h2>
          </div>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8">
              <p className="text-lg leading-relaxed mb-6 italic">
                "Assalamu Alaikum dear brothers and sisters,
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Two Finger Foundation was born from a simple yet profound realization: that the most vulnerable among 
                us—widows who have lost their providers, orphans who have lost their parents, and new Muslims seeking 
                guidance—often struggle alone when they need support the most.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Having witnessed firsthand the transformative power of compassionate, dignified support, I founded TFF 
                with a vision to create a global network of care that embodies the true spirit of Islamic brotherhood 
                and service to humanity.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Our work is not charity in the traditional sense—it is an investment in human potential, in faith, and 
                in building stronger communities. Every widow we empower becomes a beacon of resilience. Every orphan 
                we educate becomes a force for good. Every new Muslim we guide becomes a pillar of faith.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                As we look to the future, our commitment remains unwavering: to serve with excellence, transparency, and 
                unwavering dedication to the principles that guide us. Together, we can create a world where no one feels 
                alone, where dignity is universal, and where hope is abundant.
              </p>
              <p className="text-lg leading-relaxed">
                JazakAllah Khair for your support and trust in our mission.
              </p>
              <p className="text-[#C9A961] font-semibold mt-6 text-xl">
                Dr. Ahmed Hassan
                <br />
                <span className="text-base text-gray-200">Founder & Executive Director</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Governance and Leadership */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C5F2D] mb-4">Leadership Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to serving our community with excellence
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {leadership.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#C9A961] to-[#8B7355] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-[#2C5F2D] mb-1">{member.name}</h4>
                  <p className="text-sm text-[#C9A961] mb-3 font-medium">{member.role}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-br from-[#FAF8F3] to-[#F5F1E8] rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-[#2C5F2D] mb-6 text-center">Legal Status & Compliance</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-[#C9A961] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-[#2C5F2D] mb-2">Registered Charity</h4>
                  <p className="text-sm text-gray-600">
                    TFF is a registered 501(c)(3) nonprofit organization in full compliance with US federal regulations 
                    and international humanitarian standards.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Award className="w-8 h-8 text-[#C9A961] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-[#2C5F2D] mb-2">Annual Audits</h4>
                  <p className="text-sm text-gray-600">
                    We undergo independent financial audits annually and publish comprehensive reports to ensure complete 
                    transparency and accountability to our donors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
