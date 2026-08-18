import { Heart, Users, BookOpen, HandHeart, Megaphone, Mail } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

export function VolunteerPage() {
  const ways = [
    {
      icon: Users,
      title: 'Mentor & Support',
      description: 'Spend time guiding widows, orphans, and new Muslims through our community programs.',
    },
    {
      icon: BookOpen,
      title: 'Teach & Educate',
      description: 'Help deliver training modules, workshops, and Islamic knowledge sessions.',
    },
    {
      icon: HandHeart,
      title: 'On-Ground Support',
      description: 'Assist with community events, distributions, and day-to-day foundation activities.',
    },
    {
      icon: Megaphone,
      title: 'Skills & Media',
      description: 'Contribute your skills in writing, design, translation, or outreach to expand our impact.',
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#1B2A4A] to-[#2D4A8A] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Volunteer With Us</h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            The Two Fingers Foundation runs entirely on the time and skills of volunteers
          </p>
        </div>
      </section>

      {/* No donations statement */}
      <section className="py-16 bg-gradient-to-br from-[#FAF8F3] via-[#F5F1E8] to-[#F2EFE7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white border border-[#C9A961]/20 shadow-lg">
            <CardContent className="p-8 text-center">
              <Heart className="w-10 h-10 text-[#C9A961] mx-auto mb-4" />
              <p className="text-lg leading-relaxed text-gray-600">
                We do not accept or collect monetary donations. Every part of our mission is
                carried forward by people who give their time. If you would like to support
                TFF, we welcome you to volunteer with us.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Ways to volunteer */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B2A4A] mb-4">Ways to Get Involved</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the way you would like to contribute your time and skills
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ways.map((way, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-2 border-transparent hover:border-[#C9A961]">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#C9A961] to-[#8B7355] rounded-full flex items-center justify-center mx-auto mb-4">
                    <way.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-[#1B2A4A] mb-3">{way.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{way.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-br from-[#FAF8F3] via-[#F5F1E8] to-[#F2EFE7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#1B2A4A] mb-4">Ready to Volunteer?</h2>
          <p className="text-gray-600 mb-8">
            Reach out to us and let us know how you would like to help.
          </p>
          <a
            href="mailto:info@twofingerfoundation.org"
            className="inline-flex items-center gap-2 rounded-full bg-[#1B2A4A] px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#101a30]"
          >
            <Mail className="w-4 h-4" />
            info@twofingerfoundation.org
          </a>
        </div>
      </section>
    </div>
  );
}
