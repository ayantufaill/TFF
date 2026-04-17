import { BookOpen, Video, FileText, Headphones, Download, CheckCircle, Play, Mail, Lock, User as UserIcon, LogIn, ArrowLeft, Shield, Star, Users, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner'; 

const LoadingOverlay = ({ message }: { message: string }) => (
  <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/70 backdrop-blur-md rounded-2xl animate-in fade-in duration-300">
    <div className="relative w-20 h-20 mb-4">
      {/* Dynamic rolling slider effect */}
      <div className="absolute inset-0 rounded-full border-[6px] border-[#2C5F2D]/5 border-t-[#C9A961] animate-[spin_1s_cubic_bezier(0.55,0.055,0.675,0.19)_infinite]" />
      <div className="absolute inset-[10%] rounded-full border-[6px] border-[#C9A961]/10 border-b-[#2C5F2D] animate-[spin_1.5s_cubic_bezier(0.215,0.61,0.355,1)_infinite_reverse]" />
      
      {/* Center glowing element */}
      <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-[#2C5F2D] to-[#C9A961] opacity-20 animate-pulse" />
    </div>
    <div className="text-center px-6">
      <h3 className="text-lg font-bold text-[#2C5F2D] tracking-tight">{message}</h3>
      <p className="mt-1 text-[#8B7355] font-semibold text-xs animate-pulse">Please wait while we process...</p>
    </div>
    
    <style>{`
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

const courseCatalog = [
  { id: 1, title: 'Foundations of Aqeedah', provider: 'The Faith Foundation', type: 'Course', category: 'Aqeedah', image: 'https://picsum.photos/seed/aqeedah/600/400', badges: ['New'] },
  { id: 2, title: 'Learn to Pray – Salah Guide', provider: 'The Faith Foundation', type: 'Guided Module', category: 'Fiqh', image: 'https://picsum.photos/seed/salah/600/400', badges: ['Free'] },
  { id: 3, title: 'Seerah – Life of the Prophet ﷺ', provider: 'The Faith Foundation', type: 'Specialization', category: 'Seerah', image: 'https://picsum.photos/seed/seerah/600/400', badges: [] },
  { id: 4, title: 'Quranic Arabic – Read & Understand', provider: 'The Faith Foundation', type: 'Course', category: 'Language', image: 'https://picsum.photos/seed/arabic/600/400', badges: ['New', 'Free'] },
  { id: 5, title: 'Daily Adhkar & Dua', provider: 'The Faith Foundation', type: 'Guided Module', category: 'Spirituality', image: 'https://picsum.photos/seed/adhkar/600/400', badges: ['Free'] },
  { id: 6, title: 'Islamic History & Civilization', provider: 'The Faith Foundation', type: 'Specialization', category: 'History', image: 'https://picsum.photos/seed/history/600/400', badges: [] },
];

const CourseCard = ({ course, onClick }: { course: any; onClick: () => void }) => (
  <div
    onClick={onClick}
    className="group cursor-pointer"
  >
    {/* Card container with border */}
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      {/* Image — fixed height */}
      <div className="relative h-[160px] bg-gray-100 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badges — top right */}
        {course.badges?.length > 0 && (
          <div className="absolute top-2.5 right-2.5 flex gap-1.5">
            {course.badges.map((badge: string) => (
              <span
                key={badge}
                className="bg-white text-[11px] font-medium text-gray-700 px-2 py-0.5 rounded border border-gray-200"
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Provider row — icon + name */}
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-4 h-4 text-[#2C5F2D] flex-shrink-0" />
          <span className="text-[12px] text-gray-500">{course.provider}</span>
        </div>

        {/* Title */}
        <h4 className="text-[14px] font-bold text-gray-900 leading-snug mb-auto line-clamp-2 group-hover:text-[#2C5F2D] transition-colors">
          {course.title}
        </h4>

        {/* Type */}
        <p className="text-[12px] text-gray-500 mt-3">{course.type}</p>
      </div>
    </div>
  </div>
);

export function TrainingPage() {
  const { user, login, register, logout, updateProgress, loading, forgotPassword, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot'>('login');
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [forgotStep, setForgotStep] = useState<1 | 2 | 3>(1);
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);
  
  // Catalog State
  const [selectedCategory, setSelectedCategory] = useState('All');
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const categories = ['All', 'Aqeedah', 'Fiqh', 'Seerah', 'Language', 'Spirituality'];
  const filteredCourses = selectedCategory === 'All' 
    ? courseCatalog 
    : courseCatalog.filter(c => c.category === selectedCategory);

  const userProgress = user?.completedModules?.length 
    ? Math.round((user.completedModules.length / 15) * 100) 
    : 0;

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

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsSubmitting(true);

    try {
      if (authMode === 'login') {
        await login(email, password);
        toast.success('Welcome back!', {
          description: 'Successfully logged in to your training portal.',
        });
        navigate('/dashboard');
      } else {
        await register(name, email, password);
        toast.success('Account created!', {
          description: 'Welcome to the TFF training community.',
        });
        navigate('/dashboard');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Authentication failed. Please check your credentials.';
      setAuthError(errorMessage);
      toast.error('Authentication Error', {
        description: errorMessage,
      });
      console.error('Auth error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsSubmitting(true);
    
    try {
      await forgotPassword(email);
      setForgotStep(2);
      toast.success('Code sent!', {
        description: 'Verification code has been sent to your email.',
      });
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error sending reset code. Please try again.';
      setAuthError(errorMessage);
      toast.error('Reset Error', {
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setAuthError('Passwords do not match.');
      toast.error('Validation Error', {
        description: 'Passwords do not match.',
      });
      return;
    }
    
    setAuthError('');
    setIsSubmitting(true);
    
    try {
      await resetPassword(email, otp, newPassword);
      toast.success('Password reset!', {
        description: 'Your password has been changed successfully.',
      });
      setAuthMode('login');
      setForgotStep(1);
      setPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setOtp('');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Invalid code or error resetting password.';
      setAuthError(errorMessage);
      toast.error('Reset Error', {
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
        fill="#EA4335"
      />
    </svg>
  );

  if (loading) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center bg-[#FAF8F3]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2C5F2D]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden bg-[#FAF8F3]">
        {/* Subtle Geometric Background Pattern (matching HomePage) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'url(/pattern-geometric.svg)', backgroundSize: '100px 100px' }} />
        
        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-[#2C5F2D] mb-3">Training Access</h1>
            <div className="w-20 h-1.5 bg-[#C9A961] mx-auto rounded-full mb-4" />
            <p className="text-[#8B7355] font-semibold text-lg max-w-[280px] mx-auto leading-relaxed">
              To see the Training page first login or sign up
            </p>
          </div>

          <div className="relative">
            {isSubmitting && <LoadingOverlay message={authMode === 'forgot' ? (forgotStep === 1 ? "Sending Code..." : "Resetting Password...") : "Processing..."} />}

            <Card className="bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden">
            <CardHeader className="pb-4 pt-8 text-center">
              <CardTitle className="text-2xl font-bold text-[#2C5F2D]">
                {authMode === 'login' ? 'Welcome Back' : authMode === 'forgot' ? 'Reset Password' : 'Join the Community'}
              </CardTitle>
              <CardDescription className="text-gray-500 font-medium">
                {authMode === 'login' 
                  ? 'Sign in to continue your learning journey' 
                  : authMode === 'forgot'
                  ? 'Follow the steps to recover your access'
                  : 'Start your foundation in faith today'}
              </CardDescription>
            </CardHeader>

            {authMode === 'forgot' ? (
              <form onSubmit={forgotStep === 1 ? handleForgotPassword : forgotStep === 2 ? (e) => { e.preventDefault(); setForgotStep(3); } : handleResetPassword}>
                <CardContent className="space-y-6 px-8 pb-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-center mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-2 rounded-full transition-all duration-500 ${forgotStep === 1 ? 'bg-[#C9A961] w-12' : 'bg-gray-200'}`} />
                      <div className={`w-8 h-2 rounded-full transition-all duration-500 ${forgotStep === 2 ? 'bg-[#C9A961] w-12' : 'bg-gray-200'}`} />
                      <div className={`w-8 h-2 rounded-full transition-all duration-500 ${forgotStep === 3 ? 'bg-[#C9A961] w-12' : 'bg-gray-200'}`} />
                    </div>
                  </div>

                  {forgotStep === 1 ? (
                    <div className="space-y-4 animate-in fade-in duration-500">
                      <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-[#C9A961]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Mail className="w-8 h-8 text-[#C9A961]" />
                        </div>
                        <h3 className="text-xl font-bold text-[#2C5F2D]">Verify your Email</h3>
                        <p className="text-sm text-gray-500">Enter the email associated with your account</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="forgot-email" className="text-sm font-semibold text-[#2C5F2D] ml-1">Email Address</Label>
                        <div className="relative group">
                          <Input 
                            id="forgot-email" 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@example.com" 
                            className="px-4 h-14 border-2 border-gray-100 focus:border-[#C9A961] focus:ring-0 rounded-xl bg-white/50 focus:bg-white transition-all outline-none" 
                            required 
                          />
                        </div>
                      </div>
                    </div>
                  ) : forgotStep === 2 ? (
                    <div className="space-y-4 animate-in fade-in duration-500">
                      <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-[#C9A961]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Shield className="w-8 h-8 text-[#C9A961]" />
                        </div>
                        <h3 className="text-xl font-bold text-[#2C5F2D]">Check your Inbox</h3>
                        <p className="text-sm text-gray-500">Enter the 6-digit code sent to <br/><span className="text-[#2C5F2D] font-bold">{email}</span></p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="otp" className="text-sm font-semibold text-[#2C5F2D] ml-1 text-center block">Verification Code</Label>
                        <Input 
                          id="otp" 
                          type="text" 
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="••••••" 
                          maxLength={6}
                          className="h-16 border-2 border-gray-100 focus:border-[#C9A961] focus:ring-0 text-center tracking-[0.8em] font-extrabold text-3xl text-[#2C5F2D] rounded-xl bg-white/50 focus:bg-white transition-all" 
                          required 
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 animate-in fade-in duration-500">
                      <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-[#C9A961]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Lock className="w-8 h-8 text-[#C9A961]" />
                        </div>
                        <h3 className="text-xl font-bold text-[#2C5F2D]">New Password</h3>
                        <p className="text-sm text-gray-500">Set a strong password for your account</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password" id="pass-label" className="text-sm font-semibold text-[#2C5F2D] ml-1">New Password</Label>
                        <div className="relative group">
                          <Input 
                            id="new-password" 
                            type="password" 
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="••••••••" 
                            className="px-4 h-14 border-2 border-gray-100 focus:border-[#C9A961] focus:ring-0 rounded-xl bg-white/50 focus:bg-white transition-all outline-none" 
                            required 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password" internal-role="confirm-pass-label" className="text-sm font-semibold text-[#2C5F2D] ml-1">Confirm Password</Label>
                        <div className="relative group">
                          <Input 
                            id="confirm-password" 
                            type="password" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••" 
                            className="px-4 h-14 border-2 border-gray-100 focus:border-[#C9A961] focus:ring-0 rounded-xl bg-white/50 focus:bg-white transition-all outline-none" 
                            required 
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {authError && (
                    <div className="p-4 text-sm bg-red-50 text-red-600 border-l-4 border-red-500 rounded-lg font-bold flex items-start gap-3 animate-in fade-in zoom-in-95 duration-300">
                      <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">!</div>
                      <span>{authError}</span>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[#2C5F2D] hover:bg-[#234F24] text-white h-14 text-lg font-bold rounded-xl shadow-lg shadow-green-900/10 transition-all active:scale-[0.98] mt-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Processing...
                      </div>
                    ) : forgotStep === 1 ? 'Send Code' : forgotStep === 2 ? 'Next' : 'Reset Password'}
                  </Button>
                </CardContent>
                <CardFooter className="pb-32 pt-4 flex justify-center">
                  <button 
                    type="button" 
                    onClick={() => { setAuthMode('login'); setForgotStep(1); setAuthError(''); }}
                    className="text-sm font-bold text-gray-500 hover:text-[#C9A961] transition-all flex items-center gap-2 group px-4 py-2 rounded-lg hover:bg-[#C9A961]/5"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Login
                  </button>
                </CardFooter>
              </form>
            ) : (
              <form onSubmit={handleAuth}>
                <CardContent className="space-y-4 px-8 pb-4">
                  {authMode === 'signup' && (
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-semibold text-[#2C5F2D]">Full Name</Label>
                      <div className="relative group">
                        <Input 
                          id="name" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Abdullah Ahmed" 
                          className="px-4 h-12 border-gray-200 focus:border-[#C9A961] focus:ring-[#C9A961]/10 transition-all" 
                          required 
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-[#2C5F2D]">Email Address</Label>
                    <div className="relative group">
                      <Input 
                        id="email" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com" 
                        className="px-4 h-12 border-gray-200 focus:border-[#C9A961] focus:ring-[#C9A961]/10 transition-all" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" id="pass-label" className="text-sm font-semibold text-[#2C5F2D]">Password</Label>
                    <div className="relative group">
                      <Input 
                        id="password" 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••" 
                        className="px-4 h-12 border-gray-200 focus:border-[#C9A961] focus:ring-[#C9A961]/10 transition-all" 
                        required 
                      />
                    </div>
                  </div>

                  {authError && (
                    <div className="p-3 text-xs bg-red-50 text-red-600 border border-red-100 rounded-lg font-medium text-center">
                      {authError}
                    </div>
                  )}

                  {authMode === 'login' && (
                    <div className="flex justify-end pr-1">
                      <button 
                        type="button" 
                        onClick={() => { setAuthMode('forgot'); setForgotStep(1); setAuthError(''); }}
                        className="text-xs text-[#C9A961] font-bold hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[#2C5F2D] hover:bg-[#234F24] text-white h-14 text-lg font-bold rounded-xl shadow-md transition-all active:scale-[0.98] mt-2 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Processing...' : (authMode === 'login' ? 'Login Now' : 'Create My Account')}
                  </Button>

                  {/* Repositioned Google Login Button */}
                  <div className="relative pt-6 pb-2">
                    <div className="absolute inset-0 flex items-center pr-8 pl-8">
                      <span className="w-full border-t border-gray-100" />
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold text-gray-400">
                      <span className="bg-white px-3">Or explore with</span>
                    </div>
                  </div>

                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={() => login('demo@example.com', 'password123')} // Placeholder for demo
                    className="w-full h-12 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-600 font-bold transition-all rounded-xl"
                  >
                    <GoogleIcon />
                    Continue with Google
                  </Button>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4 pb-4 pt-1">
                  <div className="text-center text-sm w-full">
                    <span className="text-gray-500 font-medium">
                      {authMode === 'login' ? "Don't have an account?" : "Already joined us?"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                      className="ml-2 text-[#C9A961] font-extrabold hover:text-[#B89751] transition-colors"
                    >
                      {authMode === 'login' ? 'Sign Up' : 'Login'}
                    </button>
                  </div>
                </CardFooter>
              </form>
            )}
          </Card>
        </div>

          {/* Mini Trust Row */}
          <div className="mt-4 flex justify-center items-center gap-6 opacity-60">
            <span className="text-[10px] font-bold text-[#2C5F2D] tracking-widest uppercase">Safe & Secure</span>
            <div className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="text-[10px] font-bold text-[#2C5F2D] tracking-widest uppercase">Privacy Focused</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#2C5F2D] to-[#4A8B4D] text-white py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome Back, {user?.name.split(' ')[0]}
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Continue your step-by-step journey to understand and practice Islam with confidence
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

      {/* Course Catalog */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-5">Get started with Deen Islam</h2>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium border transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-[#2C5F2D] text-white border-[#2C5F2D]'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards Grid — 4 columns with proper spacing */}
          <div
            ref={scrollRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredCourses.slice(0, 4).map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => toast.info(course.title, {
                  description: `Opening ${course.type}: ${course.title}`,
                })}
              />
            ))}
          </div>

          {/* Show more button */}
          {filteredCourses.length > 4 && (
            <button className="mt-8 px-5 py-2 text-[13px] font-semibold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Show {filteredCourses.length - 4} more
            </button>
          )}
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
                        <div className="flex flex-wrap items-center gap-3 pt-4">
                          <Button className="bg-[#C9A961] hover:bg-[#B89751] text-white">
                            <Play className="w-4 h-4 mr-2" />
                            Start Module
                          </Button>
                          
                          {user?.completedModules?.includes(`module-${module.number}`) ? (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg font-bold text-sm border border-green-100">
                              <CheckCircle className="w-4 h-4" />
                              Module Completed
                            </div>
                          ) : (
                            <Button 
                              variant="outline" 
                              onClick={async () => {
                                await updateProgress(`module-${module.number}`);
                                toast.success('Progress updated!', {
                                  description: `Module ${module.number} marked as complete.`,
                                });
                              }}
                              className="border-[#C9A961] text-[#C9A961] hover:bg-[#C9A961] hover:text-white font-bold"
                            >
                              Mark as Complete
                            </Button>
                          )}

                          <div className="flex gap-2 ml-auto">
                            <Button variant="ghost" size="sm" className="text-[#2C5F2D]">
                              <Download className="w-4 h-4 mr-2" />
                              PDF
                            </Button>
                            <Button variant="ghost" size="sm" className="text-[#2C5F2D]">
                              <Headphones className="w-4 h-4 mr-2" />
                              Audio
                            </Button>
                          </div>
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
