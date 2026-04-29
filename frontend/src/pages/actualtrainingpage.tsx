import { BookOpen, Video, FileText, Headphones, Download, CheckCircle, Lock, Play, Mail, ArrowLeft, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { trainingLevels } from '../data/trainingData';
const LoadingOverlay = ({ message }: { message: string }) => (
  <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/70 backdrop-blur-md rounded-2xl animate-in fade-in duration-300">
    <div className="relative w-20 h-20 mb-4">
      <div className="absolute inset-0 rounded-full border-[6px] border-[#2C5F2D]/5 border-t-[#C9A961] animate-spin" />
      <div className="absolute inset-[10%] rounded-full border-[6px] border-[#C9A961]/10 border-b-[#2C5F2D] animate-[spin_1.5s_linear_infinite_reverse]" />
    </div>
    <div className="text-center px-6">
      <h3 className="text-lg font-bold text-[#2C5F2D] tracking-tight">{message}</h3>
    </div>
  </div>
);

function AuthForm() {
  const { login, register, forgotPassword, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [forgotStep, setForgotStep] = useState<1 | 2 | 3>(1);
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsSubmitting(true);
    try {
      if (authMode === 'login') {
        await login(email, password);
        toast.success('Welcome back!');
        navigate('/Training/dashboard');
      } else {
        await register(name, email, password);
        toast.success('Account created!');
        navigate('/Training/dashboard');
      }
    } catch (err: any) {
      setAuthError(err.response?.data?.message || 'Authentication failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await forgotPassword(email);
      setForgotStep(2);
      toast.success('Code sent!');
    } catch (err: any) {
      setAuthError(err.response?.data?.message || 'Error sending code.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setAuthError('Passwords do not match.');
      return;
    }
    setIsSubmitting(true);
    try {
      await resetPassword(email, otp, newPassword);
      toast.success('Password reset!');
      setAuthMode('login');
    } catch (err: any) {
      setAuthError(err.response?.data?.message || 'Error resetting password.');
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="w-full max-w-md mx-auto relative">
      {isSubmitting && <LoadingOverlay message="Processing..." />}
      <Card className="bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="pb-4 pt-8 text-center">
          <CardTitle className="text-2xl font-bold text-[#2C5F2D]">
            {authMode === 'login' ? 'Welcome Back' : authMode === 'forgot' ? 'Reset Password' : 'Join the Community'}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-4">
          {authMode === 'forgot' ? (
            <form onSubmit={forgotStep === 1 ? handleForgotPassword : forgotStep === 2 ? (e) => { e.preventDefault(); setForgotStep(3); } : handleResetPassword} className="space-y-4">
              {forgotStep === 1 ? (
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              ) : forgotStep === 2 ? (
                <Input type="text" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
              ) : (
                <>
                  <Input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                  <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </>
              )}
              {authError && <p className="text-red-500 text-sm">{authError}</p>}
              <Button type="submit" className="w-full bg-[#2C5F2D] text-white">
                {forgotStep === 1 ? 'Send Code' : forgotStep === 2 ? 'Next' : 'Reset Password'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleAuth} className="space-y-4">
              {authMode === 'signup' && <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />}
              <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              {authError && <p className="text-red-500 text-sm">{authError}</p>}
              <Button type="submit" className="w-full bg-[#2C5F2D] text-white">
                {authMode === 'login' ? 'Login' : 'Sign Up'}
              </Button>
              <div className="text-center mt-4">
                <button type="button" onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} className="text-[#C9A961] text-sm font-bold">
                  {authMode === 'login' ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                </button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function ActualTrainingPage() {
  const navigate = useNavigate();
  const { user, updateProgress } = useAuth();
  const [searchParams] = useSearchParams();
  const [activeModule, setActiveModule] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Only expand if a specific module is requested via the URL (deep-linking)
    const moduleId = searchParams.get('module');
    if (moduleId) {
      setActiveModule(`module-${moduleId}`);
    }
  }, [searchParams]);

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F3]">
        <div className="bg-gradient-to-r from-[#2C5F2D] to-[#4A8B4D] py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-12 w-3/4 bg-white/20 rounded-xl animate-pulse mx-auto mb-6" />
            <div className="h-6 w-1/2 bg-white/10 rounded-lg animate-pulse mx-auto" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {[1, 2].map(i => (
            <div key={i} className="space-y-6">
              <div className="h-32 bg-gray-200/50 rounded-2xl animate-pulse" />
              <div className="space-y-4">
                {[1, 2, 3].map(j => (
                  <div key={j} className="h-20 bg-white border-2 border-gray-100 rounded-xl animate-pulse" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const handleAccordionChange = (value: string) => {
    setActiveModule(value);

    // Update the URL to stay in sync with the expanded module
    if (value.startsWith('module-')) {
      const num = value.replace('module-', '');
      const params = new URLSearchParams(window.location.search);
      params.set('module', num);
      navigate(`?${params.toString()}`, { replace: true });

      // Save to localStorage immediately for instant persistence
      if (user) {
        localStorage.setItem(`lastViewed_${user.id}`, value);
      }
    }

    // Debounce the database update to prevent server spam
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    if (value && user) {
      saveTimeoutRef.current = setTimeout(() => {
        updateProgress(undefined, undefined, value);
      }, 500); // Faster sync to avoid losing data on navigation
    }
  };

  const levels = trainingLevels;

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

          {/* Progress Tracker / Login Prompt */}
          {!user ? (
            <div className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <AuthForm />
            </div>
          ) : (
            <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm border-white/20 mt-8">
              <CardContent className="p-6">
                {(() => {
                  const totalModules = trainingLevels.reduce((acc, l) => acc + l.modules.length, 0);
                  const completedCount = user.completedModules?.filter(id => id.startsWith('module-')).length || 0;
                  const progressPercentage = (completedCount / totalModules) * 100;

                  return (
                    <>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-white">Your Progress</h3>
                        <span className="text-sm font-bold text-[#C9A961]">{Math.round(progressPercentage)}% Complete</span>
                      </div>
                      <div className="h-3 w-full bg-white/20 rounded-full overflow-hidden border border-white/10 mb-2 relative">
                        <div
                          className="h-full bg-white transition-all duration-700 shadow-[0_0_12px_rgba(255,255,255,0.9)]"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-100">
                        You have completed {completedCount} out of {totalModules} modules. Keep going!
                      </p>
                    </>
                  );
                })()}
              </CardContent>
            </Card>
          )}
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
            <div className="grid grid-cols-4 gap-4 mt-8">
              <div className="bg-gradient-to-br from-[#FAF8F3] to-[#F5F1E8] p-6 rounded-2xl border border-[#C9A961]/10 shadow-sm hover:shadow-md transition-all group">
                <div className="text-3xl font-black text-[#C9A961] mb-1 group-hover:scale-110 transition-transform inline-block">15</div>
                <div className="text-xs font-bold text-[#2C5F2D] uppercase tracking-widest opacity-70">Modules</div>
              </div>
              <div className="bg-gradient-to-br from-[#FAF8F3] to-[#F5F1E8] p-6 rounded-2xl border border-[#C9A961]/10 shadow-sm hover:shadow-md transition-all group">
                <div className="text-3xl font-black text-[#C9A961] mb-1 group-hover:scale-110 transition-transform inline-block">5</div>
                <div className="text-xs font-bold text-[#2C5F2D] uppercase tracking-widest opacity-70">Levels</div>
              </div>
              <div className="bg-gradient-to-br from-[#FAF8F3] to-[#F5F1E8] p-6 rounded-2xl border border-[#C9A961]/10 shadow-sm hover:shadow-md transition-all group">
                <div className="text-3xl font-black text-[#C9A961] mb-1 group-hover:scale-110 transition-transform inline-block">100%</div>
                <div className="text-xs font-bold text-[#2C5F2D] uppercase tracking-widest opacity-70">Free</div>
              </div>
              <div className="bg-gradient-to-br from-[#FAF8F3] to-[#F5F1E8] p-6 rounded-2xl border border-[#C9A961]/10 shadow-sm hover:shadow-md transition-all group">
                <div className="text-3xl font-black text-[#C9A961] mb-1 group-hover:scale-110 transition-transform inline-block">24/7</div>
                <div className="text-xs font-bold text-[#2C5F2D] uppercase tracking-widest opacity-70">Access</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Levels */}
      <section className="py-12 bg-gradient-to-br from-[#FAF8F3] to-[#F5F1E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {levels.map((level, levelIndex) => {
            const isFirstLevel = levelIndex === 0;
            const prevLevelPassed = isFirstLevel ? true : user?.completedModules?.includes(`quiz-${levels[levelIndex - 1].level}`);

            return (
              <div key={level.level} className={!prevLevelPassed ? 'opacity-70 pointer-events-none grayscale-[30%]' : ''}>
                {/* Level Header */}
                <div className={`bg-gradient-to-r ${level.color} text-white rounded-2xl p-8 mb-6 relative overflow-hidden`}>
                  {/* Removed Locked label per user request */}
                  <div className="flex items-center gap-4 mb-2">
                    <Badge className="bg-white/20 text-white text-lg px-4 py-1">
                      Level {level.level}
                    </Badge>
                    <Badge className="bg-white/20 text-white">
                      {level.subtitle}
                    </Badge>
                  </div>
                  <h2 className="text-3xl font-bold">{level.title}</h2>
                  {!prevLevelPassed && (
                    <p className="mt-4 text-white/80 font-medium">
                      Pass Level {levels[levelIndex - 1].level} Assessment to unlock this level
                    </p>
                  )}
                </div>

                {/* Modules Accordion */}
                <Accordion
                  type="single"
                  collapsible
                  value={level.modules.some(m => `module-${m.number}` === activeModule) ? activeModule : ""}
                  onValueChange={handleAccordionChange}
                  className="space-y-4"
                >
                  {level.modules.map((module) => {
                    const isCompleted = user?.completedModules?.includes(`module-${module.number}`);
                    return (
                      <AccordionItem
                        key={module.number}
                        value={`module-${module.number}`}
                        className={`bg-white border-2 rounded-xl overflow-hidden transition-all duration-300 ${isCompleted ? 'border-[#2C5F2D]/40 shadow-sm' : 'border-[#C9A961]/20'}`}
                      >
                        <AccordionTrigger className={`px-6 py-4 hover:no-underline transition-colors ${isCompleted ? 'hover:bg-[#f0fdf4]' : 'hover:bg-[#FAF8F3]'}`}>
                          <div className="flex items-center gap-4 w-full text-left">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${isCompleted
                              ? 'bg-gradient-to-br from-[#2C5F2D] to-[#4A8B4D] shadow-md shadow-[#2C5F2D]/20'
                              : 'bg-gradient-to-br from-[#C9A961] to-[#8B7355]'
                              }`}>
                              <span className="text-white font-bold">
                                {isCompleted ? <CheckCircle className="w-6 h-6 text-white" /> : module.number}
                              </span>
                            </div>
                            <div className="flex-1">
                              <h3 className={`font-semibold mb-1 ${isCompleted ? 'text-[#2C5F2D]' : 'text-[#2C5F2D]'}`}>
                                {module.title}
                              </h3>
                              <p className="text-sm text-gray-600">{module.description}</p>
                            </div>
                            <CheckCircle className={`w-6 h-6 transition-colors ${isCompleted ? 'text-[#2C5F2D]' : 'text-gray-300'
                              }`} />
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
                            {/* <div>
                              <h4 className="font-semibold text-[#2C5F2D] mb-3">Available Formats:</h4>
                              <div className="flex flex-wrap gap-2">
                                {module.formats.map((format, idx) => (
                                  <Badge key={idx} variant="outline" className="border-[#C9A961] text-[#2C5F2D]">
                                    {formatIcon(format)}
                                    <span className="ml-2">{format}</span>
                                  </Badge>
                                ))}
                              </div>
                            </div> */}

                            {/* Actions */}
                            <div className="flex flex-wrap gap-3 pt-4">
                              <Button
                                onClick={() => navigate(`/training/module/${level.level}/${module.number}`)}
                                className="bg-[#C9A961] hover:bg-[#B89751] text-white"
                              >
                                <Play className="w-4 h-4 mr-2" />
                                Start Module
                              </Button>
                              {/* <Button variant="outline" className="border-[#2C5F2D] text-[#2C5F2D]">
                                <Download className="w-4 h-4 mr-2" />
                                Download PDF
                              </Button> */}
                              <Button variant="outline" className="border-[#2C5F2D] text-[#2C5F2D]">
                                <Headphones className="w-4 h-4 mr-2" />
                                Audio Version
                              </Button>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  })}
                </Accordion>
              </div>
            )
          })}
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


    </div>
  );
}
