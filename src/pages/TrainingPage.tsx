import { BookOpen, Video, FileText, Headphones, Download, CheckCircle, Play } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { useState } from 'react';

export function TrainingPage() {
  const [userProgress] = useState(0); // In a real app, this would come from a database

  const levels = [
    {
      level: 1,
      title: 'Foundations of Faith',
      subtitle: 'Beginner',
      darkFrom: '#2C5F2D', // TFF green
      darkTo: '#4A8B4D',   // TFF green (lighter)
      glow: '#C9A961',     // TFF gold
      modules: [
        {
          number: 1,
          title: 'Welcome to Islam',
          description: 'Reassurance and clarity about accepting Islam. Myths, mercy, and common questions.',
          formats: ['Reading guide', 'Short video', 'Audio reassurance'],
          topics: [
            'Understanding your decision to embrace Islam',
            'Common myths and misconceptions',
            'The mercy and forgiveness of Allah',
            'Your rights as a new Muslim',
          ],
        },
        {
          number: 2,
          title: 'Core Beliefs (Aqeedah – Simplified)',
          description: 'Explains Allah, Tawheed, Prophethood, and Afterlife in simple terms.',
          formats: ['Illustrated reading notes', 'Audio', 'Whiteboard-style videos'],
          topics: [
            'Who is Allah? Understanding Tawheed (Oneness of God)',
            'Belief in the Prophets and Messengers',
            'Understanding the Quran',
            'Life after death and the Day of Judgment',
          ],
        },
        {
          number: 3,
          title: 'The Shahadah Explained',
          description: 'Deepens understanding of the Shahadah in daily life and its significance.',
          formats: ['Reading', 'Short reflection audio'],
          topics: [
            'The meaning of "La ilaha illa Allah"',
            'The meaning of "Muhammad Rasulullah"',
            'Living by the Shahadah daily',
            'The commitment you\'ve made',
          ],
        },
      ],
    },
    {
      level: 2,
      title: 'Daily Practice',
      subtitle: 'Essential Worship',
      darkFrom: '#2C5F2D',
      darkTo: '#4A8B4D',
      glow: '#FAF8F3',     // warm ivory
      modules: [
        {
          number: 4,
          title: 'Cleanliness & Preparation (Taharah)',
          description: 'Step-by-step guidance on Wudu (ablution) and Ghusl (full bath).',
          formats: ['Reading guide', 'Videos', 'Audio reminders'],
          topics: [
            'Importance of cleanliness in Islam',
            'How to perform Wudu step-by-step',
            'When Wudu is required',
            'How to perform Ghusl (full bath)',
          ],
        },
        {
          number: 5,
          title: 'Salah (Prayer) – Step by Step',
          description: 'Explanation of prayer times, how to perform Salah without Arabic, and common mistakes.',
          formats: ['Printable guides', 'Video walkthroughs', 'Slow-paced recitations'],
          topics: [
            'Understanding the five daily prayers',
            'How to pray step-by-step (beginner-friendly)',
            'What to say in prayer (transliteration provided)',
            'Common mistakes and how to avoid them',
          ],
        },
        {
          number: 6,
          title: 'Duas & Connection with Allah',
          description: 'Teaching how to make Dua, daily remembrance, and emotional connection with Allah.',
          formats: ['Dua cards', 'Audio recitations', 'Motivational videos'],
          topics: [
            'What is Dua and why it matters',
            'Essential daily Duas',
            'How to make personal Dua in your language',
            'Dhikr (remembrance) throughout the day',
          ],
        },
      ],
    },
    {
      level: 3,
      title: 'Lifestyle & Identity',
      subtitle: 'Building Your Muslim Life',
      darkFrom: '#2C5F2D',
      darkTo: '#4A8B4D',
      glow: '#E8D9B0',     // soft gold
      modules: [
        {
          number: 7,
          title: 'Halal & Haram Basics',
          description: 'Core principles of Halal and Haram, including food and lifestyle choices.',
          formats: ['Reading guides', 'Explainer videos'],
          topics: [
            'Understanding Halal and Haram',
            'Halal food and dietary guidelines',
            'Lifestyle choices in Islam',
            'Practical tips for everyday life',
          ],
        },
        {
          number: 8,
          title: 'Family & Social Life',
          description: 'Guidance on managing family relationships and responding to criticisms.',
          formats: ['Reading', 'Audio counseling talks'],
          topics: [
            'Dealing with family who don\'t understand',
            'Maintaining good relationships',
            'How to respond to questions and criticism',
            'Finding balance and patience',
          ],
        },
        {
          number: 9,
          title: 'Emotional Wellbeing & Mental Health',
          description: 'Support for loneliness and handling emotional ups and downs after reversion.',
          formats: ['Audio reflections', 'Support videos'],
          topics: [
            'It\'s normal to feel overwhelmed',
            'Dealing with loneliness and isolation',
            'Finding peace through faith',
            'When and how to seek support',
          ],
        },
      ],
    },
    {
      level: 4,
      title: 'Growth & Confidence',
      subtitle: 'Deepening Your Faith',
      darkFrom: '#2C5F2D',
      darkTo: '#4A8B4D',
      glow: '#F5F1E8',     // warm cream
      modules: [
        {
          number: 10,
          title: 'Character & Manners (Akhlaq)',
          description: 'Focus on developing good character: honesty, patience, kindness, and dealing with frustration.',
          formats: ['Reading', 'Story-based videos'],
          topics: [
            'The importance of good character in Islam',
            'Patience (Sabr) and gratitude (Shukr)',
            'Honesty, kindness, and generosity',
            'Controlling anger and dealing with difficulty',
          ],
        },
        {
          number: 11,
          title: 'Knowledge Development Path',
          description: 'Guidance on what knowledge to seek first and how to avoid confusion.',
          formats: ['Reading roadmap', 'Guidance video'],
          topics: [
            'Prioritizing Islamic knowledge',
            'Reliable sources and teachers',
            'Avoiding confusion and extremes',
            'Building a learning routine',
          ],
        },
        {
          number: 12,
          title: 'Community & Belonging',
          description: 'How to integrate into a Muslim community, mosque etiquette, and how to serve humanity.',
          formats: ['Reading', 'Short videos'],
          topics: [
            'Finding your local Muslim community',
            'Mosque etiquette and participation',
            'Building meaningful friendships',
            'Serving others and giving back',
          ],
        },
      ],
    },
    {
      level: 5,
      title: 'Long-Term Practice & Stability',
      subtitle: 'Lifelong Journey',
      darkFrom: '#2C5F2D',
      darkTo: '#4A8B4D',
      glow: '#D7C08A',     // deep soft-gold
      modules: [
        {
          number: 13,
          title: 'Ramadan & Fasting',
          description: 'Preparation for Ramadan and understanding fasting for new Muslims.',
          formats: ['Reading', 'Explainer videos'],
          topics: [
            'What is Ramadan and why it matters',
            'How to fast step-by-step',
            'Spiritual benefits of fasting',
            'Preparing for your first Ramadan',
          ],
        },
        {
          number: 14,
          title: 'Islamic Ethics & Purpose',
          description: 'Balancing work, family, and worship while understanding the purpose of life in Islam.',
          formats: ['Reflection reading', 'Motivational audio'],
          topics: [
            'The purpose of life in Islam',
            'Balancing dunya (worldly life) and akhirah (hereafter)',
            'Work ethic and professional conduct',
            'Family responsibilities and worship',
          ],
        },
        {
          number: 15,
          title: 'Long-Term Support',
          description: 'Staying consistent in faith and building a lifelong relationship with Allah.',
          formats: ['Audio reminders', 'Closing video series'],
          topics: [
            'Dealing with spiritual ups and downs',
            'Staying consistent in practice',
            'Continuing to grow and learn',
            'Your ongoing journey with Allah',
          ],
        },
      ],
    },
  ];

  const formatIcon = (format: string) => {
    if (format.toLowerCase().includes('video')) return <Video className="w-4 h-4" />;
    if (format.toLowerCase().includes('audio')) return <Headphones className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#2C5F2D] to-[#4A8B4D] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Training & Support for New Muslims</h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              A comprehensive, step-by-step journey to help you understand and practice Islam with confidence
            </p>
          </div>
          
          {/* Progress Tracker */}
          <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Your Progress</h3>
                <span className="text-sm">{userProgress}% Complete</span>
              </div>
              <Progress value={userProgress} className="h-3 mb-2" />
              <p className="text-sm text-gray-100">
                Sign in to track your progress through all 15 modules
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Overview */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[#2C5F2D] mb-4">Your Learning Path</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Our training program is organized into 5 progressive levels with 15 comprehensive modules. 
              Each module includes multiple formats (reading, video, audio) to suit your learning style. 
              Take your time, learn at your own pace, and build a strong foundation in your faith.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-[#FAF8F3] to-[#F5F1E8] p-4 rounded-lg">
                <div className="text-3xl font-bold text-[#C9A961] mb-1">15</div>
                <div className="text-sm text-gray-600">Modules</div>
              </div>
              <div className="bg-gradient-to-br from-[#FAF8F3] to-[#F5F1E8] p-4 rounded-lg">
                <div className="text-3xl font-bold text-[#C9A961] mb-1">5</div>
                <div className="text-sm text-gray-600">Levels</div>
              </div>
              <div className="bg-gradient-to-br from-[#FAF8F3] to-[#F5F1E8] p-4 rounded-lg">
                <div className="text-3xl font-bold text-[#C9A961] mb-1">100%</div>
                <div className="text-sm text-gray-600">Free</div>
              </div>
              <div className="bg-gradient-to-br from-[#FAF8F3] to-[#F5F1E8] p-4 rounded-lg">
                <div className="text-3xl font-bold text-[#C9A961] mb-1">24/7</div>
                <div className="text-sm text-gray-600">Access</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Levels */}
      <section className="py-12 bg-gradient-to-br from-[#FAF8F3] to-[#F5F1E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {levels.map((level) => (
            <div key={level.level}>
              {/* Level Header */}
              <div
                className="relative overflow-hidden rounded-2xl p-8 mb-6 text-white border border-black/10 shadow-sm"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${level.darkFrom}, ${level.darkTo}), radial-gradient(circle at 18% 35%, ${level.glow}55 0%, transparent 62%)`,
                  backgroundBlendMode: 'normal',
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.06) 22%, rgba(255,255,255,0) 55%)',
                  }}
                  aria-hidden
                />
                <div className="flex items-center gap-4 mb-2">
                  <Badge className="bg-white/15 text-white text-lg px-4 py-1">
                    Level {level.level}
                  </Badge>
                  <Badge className="bg-white/15 text-white">
                    {level.subtitle}
                  </Badge>
                </div>
                <h2 className="text-3xl font-bold">{level.title}</h2>
              </div>

              {/* Modules Accordion */}
              <Accordion type="single" collapsible className="space-y-4">
                {level.modules.map((module) => (
                  <AccordionItem
                    key={module.number}
                    value={`module-${module.number}`}
                    className="bg-white border-2 border-[#C9A961]/20 rounded-xl overflow-hidden"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-[#FAF8F3]">
                      <div className="flex items-center gap-4 w-full text-left">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#C9A961] to-[#8B7355] rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">{module.number}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#2C5F2D] mb-1">{module.title}</h3>
                          <p className="text-sm text-gray-600">{module.description}</p>
                        </div>
                        <CheckCircle className="w-6 h-6 text-gray-300" />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="space-y-4 pt-4 border-t">
                        {/* Topics */}
                        <div>
                          <h4 className="font-semibold text-[#2C5F2D] mb-3">What You'll Learn:</h4>
                          <ul className="space-y-2">
                            {module.topics.map((topic, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-gray-600">
                                <CheckCircle className="w-5 h-5 text-[#C9A961] flex-shrink-0 mt-0.5" />
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Formats */}
                        <div>
                          <h4 className="font-semibold text-[#2C5F2D] mb-3">Available Formats:</h4>
                          <div className="flex flex-wrap gap-2">
                            {module.formats.map((format, idx) => (
                              <Badge key={idx} variant="outline" className="border-[#C9A961] text-[#2C5F2D]">
                                {formatIcon(format)}
                                <span className="ml-2">{format}</span>
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-3 pt-4">
                          <Button className="bg-[#C9A961] hover:bg-[#B89751] text-white">
                            <Play className="w-4 h-4 mr-2" />
                            Start Module
                          </Button>
                          <Button variant="outline" className="border-[#2C5F2D] text-[#2C5F2D]">
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                          </Button>
                          <Button variant="outline" className="border-[#2C5F2D] text-[#2C5F2D]">
                            <Headphones className="w-4 h-4 mr-2" />
                            Audio Version
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Support */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2C5F2D] mb-4">Additional Support Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Beyond the training modules, we offer comprehensive support to ensure your success
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-[#C9A961]/30 hover:border-[#C9A961] transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#C9A961] to-[#8B7355] rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#2C5F2D] mb-3">Personal Mentor</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get paired with an experienced Muslim mentor for one-on-one guidance, support, and answers to your questions.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-[#C9A961]/30 hover:border-[#C9A961] transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#C9A961] to-[#8B7355] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#2C5F2D] mb-3">Offline Access</h3>
                <p className="text-gray-600 leading-relaxed">
                  Download all training materials, guides, and audio files for offline access anytime, anywhere.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-[#C9A961]/30 hover:border-[#C9A961] transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#C9A961] to-[#8B7355] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Headphones className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#2C5F2D] mb-3">Daily Reminders</h3>
                <p className="text-gray-600 leading-relaxed">
                  Receive daily prayers, duas, and motivational messages to keep you connected and inspired.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/*
      Divider (separate cards from CTA)
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-10">
            <div className="mx-auto h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-[#C9A961]/70 to-transparent" />
            <p className="mt-3 text-center text-xs font-medium tracking-wide text-[#8B7355]">
              Continue your journey
            </p>
          </div>
        </div>
      </div>
      */}

      {/*
      CTA
      <section className="py-20 bg-gradient-to-r from-[#2C5F2D] to-[#4A8B4D] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-gray-100 mb-8">
            Create a free account to access all training modules, track your progress, and connect with a mentor
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-[#C9A961] hover:bg-[#B89751] text-white px-10 py-6 text-lg">
              Create Free Account
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white px-10 py-6 text-lg">
              Contact a Mentor
            </Button>
          </div>
        </div>
      </section>
      */}
    </div>
  );
}
