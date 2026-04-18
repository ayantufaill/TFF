import { BookOpen, Video, FileText, Headphones, Download, CheckCircle, Play, Mail, Lock, ArrowLeft, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
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

  // Search Params - Default to Lesson 1 if none is specified
  const [searchParams] = useSearchParams();
  const rawModuleId = searchParams.get('module');
  const activeModuleId = rawModuleId || '1';
  const activeModuleValue = `module-${activeModuleId}`;
  
  // Track which level is currently being viewed
  const [selectedLevelId, setSelectedLevelId] = useState(1);

  // Sync selectedLevelId with the level of the activeModuleId
  useEffect(() => {
    const parentLevel = levels.find(l => l.modules.some(m => String(m.number) === activeModuleId || m.id === activeModuleId));
    if (parentLevel) {
      setSelectedLevelId(parentLevel.level);
    }
  }, [activeModuleId]);

  // If already logged in, redirect to dashboard ONLY if they haven't started a specific module
  useEffect(() => {
    if (user && !loading && !rawModuleId) {
      navigate('/Training/dashboard');
    }
  }, [user, loading, navigate, rawModuleId]);
  

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
          id: 'module-1',
          number: 1,
          title: 'Welcome to Islam',
          description: 'Reassurance and clarity about accepting Islam. Myths, mercy, and common questions.',
          formats: ['Reading guide', 'Short video', 'Audio reassurance'],
          videoId: 'f9A0Tvxu2_I',
          topics: [
            'Understanding your decision to embrace Islam',
            'Common myths and misconceptions',
            'The mercy and forgiveness of Allah',
            'Your rights as a new Muslim',
          ],
        },
        {
          id: 'module-2',
          number: 2,
          title: 'Core Beliefs (Aqeedah – Simplified)',
          description: 'Explains Allah, Tawheed, Prophethood, and Afterlife in simple terms.',
          formats: ['Illustrated reading notes', 'Audio', 'Whiteboard-style videos'],
          videoId: 'O9Yv8_D70u8',
          topics: [
            'Who is Allah? Understanding Tawheed (Oneness of God)',
            'Belief in the Prophets and Messengers',
            'Understanding the Quran',
            'Life after death and the Day of Judgment',
          ],
        },
        {
          id: 'module-3',
          number: 3,
          title: 'The Shahadah Explained',
          description: 'Deepens understanding of the Shahadah in daily life and its significance.',
          formats: ['Reading', 'Short reflection audio'],
          videoId: 'f24X_3j0qEY',
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
          id: 'module-4',
          number: 4,
          title: 'Cleanliness & Preparation (Taharah)',
          description: 'Step-by-step guidance on Wudu (ablution) and Ghusl (full bath).',
          formats: ['Reading guide', 'Videos', 'Audio reminders'],
          videoId: 'f9A0Tvxu2_I',
          topics: [
            'Importance of cleanliness in Islam',
            'How to perform Wudu step-by-step',
            'When Wudu is required',
            'How to perform Ghusl (full bath)',
          ],
        },
        {
          id: 'module-5',
          number: 5,
          title: 'Salah (Prayer) – Step by Step',
          description: 'Explanation of prayer times, how to perform Salah without Arabic, and common mistakes.',
          formats: ['Printable guides', 'Video walkthroughs', 'Slow-paced recitations'],
          videoId: 'O9Yv8_D70u8',
          topics: [
            'Understanding the five daily prayers',
            'How to pray step-by-step (beginner-friendly)',
            'What to say in prayer (transliteration provided)',
            'Common mistakes and how to avoid them',
          ],
        },
        {
          id: 'module-6',
          number: 6,
          title: 'Duas & Connection with Allah',
          description: 'Teaching how to make Dua, daily remembrance, and emotional connection with Allah.',
          formats: ['Dua cards', 'Audio recitations', 'Motivational videos'],
          videoId: 'f24X_3j0qEY',
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
          id: 'module-7',
          number: 7,
          title: 'Halal & Haram Basics',
          description: 'Core principles of Halal and Haram, including food and lifestyle choices.',
          formats: ['Reading guides', 'Explainer videos'],
          videoId: 'f9A0Tvxu2_I',
          topics: [
            'Understanding Halal and Haram',
            'Halal food and dietary guidelines',
            'Lifestyle choices in Islam',
            'Practical tips for everyday life',
          ],
        },
        {
          id: 'module-8',
          number: 8,
          title: 'Family & Social Life',
          description: 'Guidance on managing family relationships and responding to criticisms.',
          formats: ['Reading', 'Audio counseling talks'],
          videoId: 'O9Yv8_D70u8',
          topics: [
            'Dealing with family who don\'t understand',
            'Maintaining good relationships',
            'How to respond to questions and criticism',
            'Finding balance and patience',
          ],
        },
        {
          id: 'module-9',
          number: 9,
          title: 'Emotional Wellbeing & Mental Health',
          description: 'Support for loneliness and handling emotional ups and downs after reversion.',
          formats: ['Audio reflections', 'Support videos'],
          videoId: 'f24X_3j0qEY',
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
          id: 'module-10',
          number: 10,
          title: 'Character & Manners (Akhlaq)',
          description: 'Focus on developing good character: honesty, patience, kindness, and dealing with frustration.',
          formats: ['Reading', 'Story-based videos'],
          videoId: 'f9A0Tvxu2_I',
          topics: [
            'The importance of good character in Islam',
            'Patience (Sabr) and gratitude (Shukr)',
            'Honesty, kindness, and generosity',
            'Controlling anger and dealing with difficulty',
          ],
        },
        {
          id: 'module-11',
          number: 11,
          title: 'Knowledge Development Path',
          description: 'Guidance on what knowledge to seek first and how to avoid confusion.',
          formats: ['Reading roadmap', 'Guidance video'],
          videoId: 'O9Yv8_D70u8',
          topics: [
            'Prioritizing Islamic knowledge',
            'Reliable sources and teachers',
            'Avoiding confusion and extremes',
            'Building a learning routine',
          ],
        },
        {
          id: 'module-12',
          number: 12,
          title: 'Community & Belonging',
          description: 'How to integrate into a Muslim community, mosque etiquette, and how to serve humanity.',
          formats: ['Reading', 'Short videos'],
          videoId: 'f24X_3j0qEY',
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
          id: 'module-13',
          number: 13,
          title: 'Ramadan & Fasting',
          description: 'Preparation for Ramadan and understanding fasting for new Muslims.',
          formats: ['Reading', 'Explainer videos'],
          videoId: 'f9A0Tvxu2_I',
          topics: [
            'What is Ramadan and why it matters',
            'How to fast step-by-step',
            'Spiritual benefits of fasting',
            'Preparing for your first Ramadan',
          ],
        },
        {
          id: 'module-14',
          number: 14,
          title: 'Islamic Ethics & Purpose',
          description: 'Balancing work, family, and worship while understanding the purpose of life in Islam.',
          formats: ['Reflection reading', 'Motivational audio'],
          videoId: 'O9Yv8_D70u8',
          topics: [
            'The purpose of life in Islam',
            'Balancing dunya (worldly life) and akhirah (hereafter)',
            'Work ethic and professional conduct',
            'Family responsibilities and worship',
          ],
        },
        {
          id: 'module-15',
          number: 15,
          title: 'Long-Term Support',
          description: 'Staying consistent in faith and building a lifelong relationship with Allah.',
          formats: ['Audio reminders', 'Closing video series'],
          videoId: 'f24X_3j0qEY',
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
        navigate('/Training/dashboard');
      } else {
        await register(name, email, password);
        toast.success('Account created!', {
          description: 'Welcome to the TFF training community.',
        });
        navigate('/Training/dashboard');
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


      {/* Training Levels Section */}
      <section className="py-12 bg-[#FAF8F3]">
        <div className="w-full mx-auto px-4 lg:px-6">
          
          {/* Level Switcher Hero Tab Bar */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {levels.map((l) => (
              <button
                key={l.level}
                onClick={() => setSelectedLevelId(l.level)}
                className={`group relative flex flex-col items-center p-1 transition-all duration-300 ${
                  selectedLevelId === l.level ? 'scale-110' : 'opacity-60 hover:opacity-100 hover:scale-105'
                }`}
              >
                <div className={`
                  flex flex-col items-center justify-center w-24 h-24 rounded-2xl border-2 transition-all shadow-sm
                  ${selectedLevelId === l.level 
                    ? 'bg-gradient-to-br from-[#2C5F2D] to-[#4A8B4D] border-[#C9A961] shadow-xl shadow-green-900/20' 
                    : 'bg-white border-gray-100'
                  }
                `}>
                  <p className={`text-[10px] font-black uppercase tracking-widest ${selectedLevelId === l.level ? 'text-[#C9A961]' : 'text-gray-400'}`}>
                    Level
                  </p>
                  <p className={`text-3xl font-black ${selectedLevelId === l.level ? 'text-white' : 'text-[#2C5F2D]'}`}>
                    {l.level}
                  </p>
                </div>
                {selectedLevelId === l.level && (
                   <div className="absolute -bottom-2 w-2 h-2 rounded-full bg-[#C9A961] animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {levels
            .filter((level) => level.level === selectedLevelId)
            .map((level) => (
            <Card key={level.level} className="overflow-hidden border-none rounded-[3rem] shadow-[0_40px_120px_rgba(0,0,0,0.06)] bg-white min-h-[750px] border border-gray-100">
              {/* Unified Level Header */}
              <div
                className="relative overflow-hidden p-8 text-white border-b border-[#C9A961]/10"
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
              <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr' }} className="min-h-[750px] bg-white w-full overflow-hidden">
                {/* Left Sidebar: Curriculum List (Warm Premium Sidebar) */}
                <div style={{ width: '280px', height: '100%' }} className="flex-shrink-0 border-r border-gray-100/80 bg-[#FAF8F3]">
                  <div className="px-7 py-7 border-b border-[#C9A961]/15 bg-white/60 sticky top-0 z-20 backdrop-blur-md">
                    <h3 className="text-[10px] font-black text-[#8B7355] uppercase tracking-[0.3em] mb-4 opacity-60">Curriculum Path</h3>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-baseline justify-between">
                            <p className="text-sm font-black text-[#2C5F2D]">Level {level.level}</p>
                            <span className="text-[10px] font-bold text-[#8B7355] bg-[#C9A961]/10 px-2 py-0.5 rounded-full">{userProgress}%</span>
                        </div>
                        <Progress value={userProgress} className="h-1.5 bg-[#C9A961]/15 rounded-full [&>div]:bg-gradient-to-r [&>div]:from-[#C9A961] [&>div]:to-[#2C5F2D] [&>div]:rounded-full" />
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }} className="pt-4 pb-6 px-4">
                    {level.modules.map((module, moduleIdx) => {
                      const isActive = activeModuleId === module.id || activeModuleId === String(module.number);
                      const isCompleted = user?.completedModules?.includes(module.id);
                      
                      return (
                        <button
                          key={module.id}
                          onClick={() => {
                            const params = new URLSearchParams(searchParams);
                            params.set('module', String(module.number));
                            navigate(`?${params.toString()}`, { replace: true });
                          }}
                          className={`relative flex flex-col gap-2.5 px-7 py-6 text-left transition-all duration-500 group rounded-2xl ${
                            moduleIdx < level.modules.length - 1 ? 'mb-4' : ''
                          } ${
                            isActive 
                              ? 'bg-white shadow-[0_10px_30px_rgba(44,95,45,0.08)] ring-1 ring-[#2C5F2D]/10' 
                              : 'hover:bg-white/60 opacity-75 hover:opacity-100 hover:translate-x-1'
                          }`}
                        >
                          {/* Active Backdrop Tint */}
                          {isActive && (
                            <div className="absolute inset-0 bg-[#2C5F2D]/[0.02] rounded-2xl pointer-events-none" />
                          )}
                          {isActive && (
                            <div className="absolute left-1 top-4 bottom-4 w-1.5 bg-gradient-to-b from-[#C9A961] to-[#8B7355] rounded-full shadow-[0_0_10px_rgba(201,169,97,0.4)]" />
                          )}
                          
                          <div className="flex flex-col gap-2 min-w-0 pl-2">
                            <div className="flex items-center justify-between">
                                <span className={`text-[10px] font-black px-4 py-1.5 rounded-lg uppercase tracking-tight ${
                                    isActive ? 'bg-[#2C5F2D] text-white shadow-sm' : 'bg-gray-100 text-gray-500'
                                }`}>
                                    Module {module.number}
                                </span>
                                {isCompleted ? (
                                    <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
                                        <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                                    </div>
                                ) : (
                                    <Play className={`w-4 h-4 transition-transform duration-500 ${isActive ? 'text-[#C9A961] scale-125' : 'text-gray-300'}`} />
                                )}
                            </div>
                            <h4 className={`font-black text-[13px] leading-snug transition-colors line-clamp-2 mt-0.5 ${
                                isActive ? 'text-[#2C5F2D]' : 'text-gray-600'
                            }`}>
                                {module.title}
                            </h4>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-0.5 pl-2">
                            <span className={`text-[10px] font-bold flex items-center gap-2 uppercase tracking-wider ${isActive ? 'text-[#8B7355]' : 'text-gray-400'}`}>
                                <Video className="w-3.5 h-3.5 opacity-70" />
                                12 MINS
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Content Area: Multi-Column Focus */}
                <div className="flex-1 min-w-0 bg-white relative flex flex-col">
                    {level.modules
                      .filter(module => activeModuleId === module.id || activeModuleId === String(module.number))
                      .map((module) => {
                        // Logic to find next module
                        const currentModuleIndex = levels.flatMap(l => l.modules).findIndex(m => m.id === module.id);
                        const nextModule = levels.flatMap(l => l.modules)[currentModuleIndex + 1];

                        return (
                        <div key={module.id} className="h-full w-full animate-in fade-in slide-in-from-right-4 duration-700 p-8 lg:p-10">
                          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 720px', gap: '1.5rem', alignItems: 'stretch', width: '100%' }}>
                            
                            {/* Left Column: Lesson Details (Main Content) */}
                            <div className="min-w-0 space-y-12">
                                <div className="max-w-3xl">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A961]/10 text-[#2C5F2D] text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-[#C9A961]/20 shadow-sm shadow-[#C9A961]/5">
                                        <Star className="w-3.5 h-3.5 text-[#C9A961] fill-[#C9A961]/20" />
                                        Module {module.number} • Level {level.level}
                                    </div>
                                    <h1 className="text-4xl lg:text-5xl font-black text-[#2C5F2D] mb-8 tracking-tight leading-[1.05] animate-in slide-in-from-left duration-700">
                                        {module.title}
                                    </h1>
                                    <p className="text-lg text-gray-500 leading-relaxed font-medium mb-10 border-l-4 border-gray-100 pl-6 py-2 italic">
                                        {module.description}
                                    </p>
                                </div>

                                <div className="space-y-6 bg-white p-8 rounded-[2rem] border border-[#C9A961]/10 shadow-[0_20px_40px_rgba(201,169,97,0.03)] group/goals">
                                    <h4 className="text-xs font-black text-[#2C5F2D] flex items-center gap-3 uppercase tracking-[0.25em]">
                                        <div className="w-8 h-8 rounded-full bg-[#C9A961]/10 flex items-center justify-center">
                                            <BookOpen className="w-4 h-4 text-[#C9A961]" />
                                        </div>
                                        Mastery Goals
                                    </h4>
                                    <ul className="space-y-5">
                                        {module.topics.map((topic, idx) => (
                                            <li key={idx} className="flex items-start gap-4 text-sm text-[#4E4E4E] font-bold transition-all hover:translate-x-1 duration-300">
                                                <div className="mt-0.5 w-5 h-5 rounded-full bg-green-50 flex items-center justify-center shrink-0 border border-green-100">
                                                    <CheckCircle className="w-3 h-3 text-green-600" />
                                                </div>
                                                {topic}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="pt-10 space-y-8">
                                    {nextModule ? (
                                        <Button 
                                            onClick={() => {
                                                const params = new URLSearchParams(searchParams);
                                                params.set('module', String(nextModule.number));
                                                navigate(`?${params.toString()}`);
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }}
                                            className="w-full max-w-xl bg-gradient-to-r from-[#2C5F2D] to-[#4A8B4D] hover:from-[#234F24] hover:to-[#3e7540] text-white font-black h-16 rounded-2xl shadow-xl shadow-green-900/20 transition-all hover:scale-[1.03] active:scale-95 text-lg tracking-tight"
                                        >
                                            Next Lesson
                                            <ArrowLeft className="w-5 h-5 ml-3 rotate-180" />
                                        </Button>
                                    ) : (
                                        <div className="flex items-center gap-4 p-5 bg-gold-50 text-[#8B7355] rounded-2xl font-bold border-2 border-[#C9A961]/20">
                                            <Star className="w-8 h-8 text-[#C9A961]" />
                                            <div>
                                                <p className="text-xs opacity-60 uppercase tracking-widest">Congratulations</p>
                                                <p className="text-lg">You've finished the course!</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex flex-col gap-6">
                                        <Button 
                                            variant="outline" 
                                            onClick={async () => {
                                                await updateProgress(module.id);
                                                toast.success('MashaAllah!', { description: `You've completed: ${module.title}` });
                                            }}
                                            className={`h-12 border-gray-100 font-bold rounded-xl text-xs transition-all ${
                                                user?.completedModules?.includes(module.id) 
                                                ? 'bg-green-50 text-green-700 border-green-200' 
                                                : 'text-[#2C5F2D] hover:bg-[#FAF8F3]'
                                            }`}
                                        >
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                            {user?.completedModules?.includes(module.id) ? 'Completed' : 'Mark Done'}
                                        </Button>
                                        <Button variant="outline" className="h-12 border-gray-100 text-[#2C5F2D] hover:bg-[#FAF8F3] font-bold rounded-xl text-xs">
                                            <Download className="w-4 h-4 mr-2" />
                                            Resources
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Cinematic Video Player (Sticky Focus) */}
                            <div style={{ width: '720px' }} className="animate-in fade-in slide-in-from-right duration-1000 delay-300">
                                <div className="sticky top-10 w-full h-full flex flex-col">
                                  <div className="bg-[#0A0A0A] rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.3)] border-[8px] border-white ring-1 ring-gray-200 relative group transition-transform duration-500 hover:scale-[1.02] flex-1" style={{ minHeight: '450px' }}>
                                    <iframe
                                      className="absolute inset-0 w-full h-full"
                                      src={`https://www.youtube.com/embed/${module.videoId}?rel=0&modestbranding=1&autoplay=0&hd=1&origin=${window.location.origin}`}
                                      title={module.title}
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                      allowFullScreen
                                      referrerPolicy="strict-origin-when-cross-origin"
                                      loading="lazy"
                                    ></iframe>
                                </div>
                                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 px-2">
                                    <div className="flex items-center gap-3">
                                        <Badge variant="outline" className="border-[#C9A961]/20 text-[#8B7355] px-3 py-1.5 rounded-lg text-xs font-bold bg-white">
                                            <Video className="w-3.5 h-3.5 mr-2 text-[#C9A961]" />
                                            Master Class
                                        </Badge>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">~15 min</p>
                                    </div>
                                    <div className="flex gap-1.5">
                                        {module.formats.map((f, i) => (
                                            <div key={i} className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                                                {formatIcon(f)}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </Card>
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
