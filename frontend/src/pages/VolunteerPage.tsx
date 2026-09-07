import { useState, type FormEvent } from 'react';
import { Heart, Users, BookOpen, HandHeart, Megaphone, Mail, CheckCircle2, Loader2 } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { submitVolunteerApplication } from '../services/volunteerService';

const AVAILABILITY_OPTIONS = ['Weekdays', 'Weekends', 'Flexible'];

const initialFormState = {
  fullName: '',
  phone: '',
  email: '',
  city: '',
  interest: '',
  availability: '',
  skills: '',
  message: '',
};

export function VolunteerPage() {
  const [form, setForm] = useState(initialFormState);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const updateField = (field: keyof typeof initialFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.fullName || !form.phone || !form.email || !form.city || !form.interest || !form.availability) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      await submitVolunteerApplication(form);
      setStatus('success');
      setForm(initialFormState);
    } catch (err) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again or email us directly.');
    }
  };

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

      {/* Sign-up form */}
      <section className="py-20 bg-gradient-to-br from-[#FAF8F3] via-[#F5F1E8] to-[#F2EFE7]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1B2A4A] mb-4">Ready to Volunteer?</h2>
            <p className="text-gray-600">
              Fill in your details and our team will reach out to you.
            </p>
          </div>

          <Card className="bg-white border border-[#C9A961]/20 shadow-lg">
            <CardContent className="p-8">
              {status === 'success' ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-12 h-12 text-[#C9A961] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-[#1B2A4A] mb-2">JazakAllah Khair!</h3>
                  <p className="text-gray-600">
                    We have received your details. Someone from our team will contact you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={form.fullName}
                        onChange={(e) => updateField('fullName', e.target.value)}
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone / WhatsApp *</Label>
                      <Input
                        id="phone"
                        value={form.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        placeholder="03XX-XXXXXXX"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="you@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={form.city}
                        onChange={(e) => updateField('city', e.target.value)}
                        placeholder="Your city"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label>Area of Interest *</Label>
                      <Select value={form.interest} onValueChange={(v: string) => updateField('interest', v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          {ways.map((way) => (
                            <SelectItem key={way.title} value={way.title}>
                              {way.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Availability *</Label>
                      <Select value={form.availability} onValueChange={(v: string) => updateField('availability', v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          {AVAILABILITY_OPTIONS.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills / Experience (optional)</Label>
                    <Input
                      id="skills"
                      value={form.skills}
                      onChange={(e) => updateField('skills', e.target.value)}
                      placeholder="e.g. teaching, design, translation"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message (optional)</Label>
                    <Textarea
                      id="message"
                      value={form.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      placeholder="Anything else you'd like us to know"
                      rows={3}
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-sm text-red-600">{errorMessage}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-[#1B2A4A] hover:bg-[#101a30] text-white rounded-full py-6 text-sm font-semibold"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <p className="text-center text-sm text-gray-500 mt-8">
            Prefer email? Reach us at{' '}
            <a href="mailto:info@twofingerfoundation.org" className="inline-flex items-center gap-1 text-[#1B2A4A] font-medium hover:underline">
              <Mail className="w-3.5 h-3.5" />
              info@twofingerfoundation.org
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
