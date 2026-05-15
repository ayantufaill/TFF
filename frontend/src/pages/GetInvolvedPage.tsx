import { Users, HandHeart, GraduationCap, MessageCircle, Building, Calendar, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export function GetInvolvedPage() {
  const volunteerOpportunities = [
    {
      icon: GraduationCap,
      title: 'Education & Mentorship',
      description: 'Mentor new Muslims, tutor orphans, or teach vocational skills to widows.',
      commitment: 'Flexible, 2-4 hours/week',
      locations: 'Remote or On-site',
    },
    {
      icon: HandHeart,
      title: 'Community Support',
      description: 'Assist with local community events, food distribution, and family support visits.',
      commitment: 'Monthly or As-needed',
      locations: 'On-site',
    },
    {
      icon: MessageCircle,
      title: 'Counseling & Guidance',
      description: 'Provide emotional support and religious guidance to those seeking help.',
      commitment: '3-5 hours/week',
      locations: 'Remote',
    },
    {
      icon: Building,
      title: 'Professional Services',
      description: 'Volunteer your professional skills (legal, medical, IT, marketing, etc.).',
      commitment: 'Project-based',
      locations: 'Remote',
    },
  ];

  const partnerBenefits = [
    'Official partnership recognition and promotional materials',
    'Regular impact reports and success stories',
    'Joint event and campaign opportunities',
    'Access to our global network of supporters',
    'Tax benefits and corporate social responsibility recognition',
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#1B2A4A] to-[#2D4A8A] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get Involved</h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            Join our mission to empower widows, support orphans, and guide new Muslims. 
            Your time, skills, and commitment can change lives.
          </p>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B2A4A] mb-4">Volunteer Opportunities</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Make a hands-on difference in the lives of those we serve
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {volunteerOpportunities.map((opportunity, index) => (
              <Card key={index} className="border-2 border-[#C9A961]/30 hover:border-[#C9A961] transition-colors">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#C9A961] to-[#8B7355] rounded-full flex items-center justify-center flex-shrink-0">
                      <opportunity.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#1B2A4A] mb-2">{opportunity.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{opportunity.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4 text-[#C9A961]" />
                          <span><strong>Time Commitment:</strong> {opportunity.commitment}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4 text-[#C9A961]" />
                          <span><strong>Location:</strong> {opportunity.locations}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Volunteer Sign-up Form */}
          <Card className="border-2 border-[#C9A961]/30">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-[#1B2A4A] mb-6 text-center">
                Volunteer Application
              </h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="vol-first-name">First Name *</Label>
                    <Input id="vol-first-name" required />
                  </div>
                  <div>
                    <Label htmlFor="vol-last-name">Last Name *</Label>
                    <Input id="vol-last-name" required />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="vol-email">Email Address *</Label>
                    <Input id="vol-email" type="email" required />
                  </div>
                  <div>
                    <Label htmlFor="vol-phone">Phone Number</Label>
                    <Input id="vol-phone" type="tel" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="vol-location">Your Location *</Label>
                  <Input id="vol-location" placeholder="City, State/Country" required />
                </div>
                <div>
                  <Label htmlFor="vol-area">Area of Interest *</Label>
                  <Select>
                    <SelectTrigger id="vol-area">
                      <SelectValue placeholder="Select an area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="education">Education & Mentorship</SelectItem>
                      <SelectItem value="community">Community Support</SelectItem>
                      <SelectItem value="counseling">Counseling & Guidance</SelectItem>
                      <SelectItem value="professional">Professional Services</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="vol-skills">Skills & Experience</Label>
                  <Textarea 
                    id="vol-skills" 
                    placeholder="Tell us about your relevant skills, experience, and why you want to volunteer..."
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="vol-availability">Availability</Label>
                  <Textarea 
                    id="vol-availability" 
                    placeholder="Please describe your availability (days, times, hours per week)..."
                    rows={3}
                  />
                </div>
                <Button size="lg" className="w-full bg-[#C9A961] hover:bg-[#B89751] text-white">
                  <Users className="w-5 h-5 mr-2" />
                  Submit Volunteer Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Become a Mentor */}
      <section className="py-20 bg-gradient-to-br from-[#FAF8F3] to-[#F5F1E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1B2A4A] mb-6">Become a Mentor</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Mentorship is one of the most impactful ways to support new Muslims on their faith journey. 
                As a mentor, you'll provide guidance, answer questions, and offer emotional support during 
                their transition to Islam.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#C9A961] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-[#1B2A4A] mb-1">Personal Connection</h4>
                    <p className="text-gray-600">Build meaningful one-on-one relationships with new Muslims</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#C9A961] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-[#1B2A4A] mb-1">Flexible Engagement</h4>
                    <p className="text-gray-600">Connect remotely via phone, video call, or in-person meetings</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#C9A961] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-[#1B2A4A] mb-1">Training Provided</h4>
                    <p className="text-gray-600">Comprehensive mentor training and ongoing support from our team</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#C9A961] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-[#1B2A4A] mb-1">Spiritual Reward</h4>
                    <p className="text-gray-600">The immense reward of helping someone strengthen their faith</p>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-[#1B2A4A] hover:bg-[#122038] text-white">
                <GraduationCap className="w-5 h-5 mr-2" />
                Apply to Become a Mentor
              </Button>
            </div>
            <Card className="border-2 border-[#C9A961]/30">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-[#1B2A4A] mb-4">Mentor Requirements</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#C9A961] rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-600">Practicing Muslim with good knowledge of Islam</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#C9A961] rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-600">Patient, empathetic, and good communication skills</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#C9A961] rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-600">Commitment of 2-3 hours per week</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#C9A961] rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-600">Willingness to undergo background check</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#C9A961] rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-600">Complete our mentor training program</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partner Opportunities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B2A4A] mb-4">Partner with Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Organizations and businesses can partner with TFF to amplify their social impact
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="border-2 border-[#C9A961]/30">
              <CardContent className="p-8">
                <Building className="w-12 h-12 text-[#C9A961] mb-4" />
                <h3 className="text-2xl font-bold text-[#1B2A4A] mb-4">Partnership Benefits</h3>
                <ul className="space-y-3">
                  {partnerBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#C9A961] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-2 border-[#C9A961]/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-[#1B2A4A] mb-6">Partnership Inquiry</h3>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="org-name">Organization Name *</Label>
                    <Input id="org-name" required />
                  </div>
                  <div>
                    <Label htmlFor="org-contact">Contact Person *</Label>
                    <Input id="org-contact" required />
                  </div>
                  <div>
                    <Label htmlFor="org-email">Email Address *</Label>
                    <Input id="org-email" type="email" required />
                  </div>
                  <div>
                    <Label htmlFor="org-phone">Phone Number</Label>
                    <Input id="org-phone" type="tel" />
                  </div>
                  <div>
                    <Label htmlFor="org-type">Organization Type</Label>
                    <Select>
                      <SelectTrigger id="org-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nonprofit">Nonprofit Organization</SelectItem>
                        <SelectItem value="corporate">Corporate/Business</SelectItem>
                        <SelectItem value="mosque">Mosque/Islamic Center</SelectItem>
                        <SelectItem value="educational">Educational Institution</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="org-message">Partnership Interests</Label>
                    <Textarea 
                      id="org-message" 
                      placeholder="Tell us about your organization and partnership goals..."
                      rows={4}
                    />
                  </div>
                  <Button size="lg" className="w-full bg-[#C9A961] hover:bg-[#B89751] text-white">
                    Submit Partnership Inquiry
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gradient-to-br from-[#FAF8F3] to-[#F5F1E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B2A4A] mb-4">Get in Touch</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions? Want to learn more? We'd love to hear from you.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-2 border-[#C9A961]/30 hover:border-[#C9A961] transition-colors">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#C9A961] to-[#8B7355] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#1B2A4A] mb-2">Email Us</h3>
                <p className="text-gray-600 mb-3">volunteer@twofingerfoundation.org</p>
                <Button variant="outline" className="border-[#1B2A4A] text-[#1B2A4A]">
                  Send Email
                </Button>
              </CardContent>
            </Card>
            <Card className="text-center border-2 border-[#C9A961]/30 hover:border-[#C9A961] transition-colors">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#C9A961] to-[#8B7355] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#1B2A4A] mb-2">Call Us</h3>
                <p className="text-gray-600 mb-3">+1 (555) 123-4567</p>
                <Button variant="outline" className="border-[#1B2A4A] text-[#1B2A4A]">
                  Call Now
                </Button>
              </CardContent>
            </Card>
            <Card className="text-center border-2 border-[#C9A961]/30 hover:border-[#C9A961] transition-colors">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#C9A961] to-[#8B7355] rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#1B2A4A] mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-3">Mon-Fri, 9am-5pm EST</p>
                <Button variant="outline" className="border-[#1B2A4A] text-[#1B2A4A]">
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
