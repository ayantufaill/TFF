import { BookOpen, Video, FileText, Headphones, Download, CheckCircle, Lock, Play, Mail, ArrowLeft, Shield, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { getCourses, MainCourse, Level } from '../services/courseService';

const LoadingOverlay = ({ message }: { message: string }) => (
  <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/70 backdrop-blur-md rounded-2xl animate-in fade-in duration-300">
    <div className="relative w-20 h-20 mb-4">
      <div className="absolute inset-0 rounded-full border-[6px] border-[#1B2A4A]/5 border-t-[#C9A961] animate-spin" />
      <div className="absolute inset-[10%] rounded-full border-[6px] border-[#C9A961]/10 border-b-[#1B2A4A] animate-[spin_1.5s_linear_infinite_reverse]" />
    </div>
    <div className="text-center px-6">
      <h3 className="text-lg font-bold text-[#1B2A4A] tracking-tight">{message}</h3>
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
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
          <CardTitle className="text-2xl font-bold text-[#1B2A4A]">
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
                  <div className="relative w-full">
                    <Input 
                      type={showNewPassword ? 'text' : 'password'} 
                      placeholder="New Password" 
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)} 
                      className="pr-10"
                      required 
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute z-10 text-gray-400 hover:text-[#1B2A4A]"
                      style={{ right: '12px', top: '50%', transform: 'translateY(-50%)', left: 'auto' }}
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="relative w-full">
                    <Input 
                      type={showConfirmPassword ? 'text' : 'password'} 
                      placeholder="Confirm Password" 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                      className="pr-10"
                      required 
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute z-10 text-gray-400 hover:text-[#1B2A4A]"
                      style={{ right: '12px', top: '50%', transform: 'translateY(-50%)', left: 'auto' }}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </>
              )}
              {authError && <p className="text-red-500 text-sm">{authError}</p>}
              <Button type="submit" className="w-full bg-[#1B2A4A] text-white">
                {forgotStep === 1 ? 'Send Code' : forgotStep === 2 ? 'Next' : 'Reset Password'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleAuth} className="space-y-4">
              {authMode === 'signup' && <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />}
              <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <div className="relative w-full">
                <Input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="pr-10"
                  required 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute z-10 text-gray-400 hover:text-[#1B2A4A]"
                  style={{ right: '12px', top: '50%', transform: 'translateY(-50%)', left: 'auto' }}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {authError && <p className="text-red-500 text-sm">{authError}</p>}
              <Button type="submit" className="w-full bg-[#1B2A4A] text-white">
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
  const [courses, setCourses] = useState<MainCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const selectedCourseId = searchParams.get('course');
  const activeCourse = courses.find(c => c._id === selectedCourseId) || courses[0];
  const levels = activeCourse?.levels || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        toast.error('Failed to load training content');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const moduleId = searchParams.get('module');
    if (moduleId) {
      setActiveModule(`module-${moduleId}`);
    }
  }, [searchParams]);

  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F3]">
        <div className="bg-gradient-to-r from-[#1B2A4A] to-[#2D4A8A] py-20">
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
    if (value.startsWith('module-')) {
      const num = value.replace('module-', '');
      const params = new URLSearchParams(window.location.search);
      params.set('module', num);
      navigate(`?${params.toString()}`, { replace: true });

      if (user) {
        localStorage.setItem(`lastViewed_${user.id}`, value);
      }
    }

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    if (value && user) {
      saveTimeoutRef.current = setTimeout(() => {
        updateProgress(undefined, undefined, value);
      }, 500);
    }
  };

  if (isLoading) return <div className="p-20 text-center text-[#1B2A4A] font-bold">Loading your learning path...</div>;

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#1B2A4A] to-[#2D4A8A] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque-thin.png')]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <Link to="/Training/dashboard" className="inline-flex items-center text-white/60 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Courses
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{activeCourse?.title || 'Training Program'}</h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              {activeCourse?.description || 'Your personalized spiritual journey'}
            </p>
          </div>

          {!user ? (
            <div className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <AuthForm />
            </div>
          ) : (
            <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm border-white/20 mt-8">
              <CardContent className="p-6">
                {(() => {
                  const courseModules = levels.flatMap(l => l.modules);
                  const totalModules = courseModules.length;
                  const completedCount = courseModules.filter(m => 
                    user.completedModules?.some(id => id === `module-${String(m._id)}` || id === `module-${String(m.number)}`)
                  ).length;
                  const progressPercentage = totalModules > 0 ? (completedCount / totalModules) * 100 : 0;

                  return (
                    <>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-white">Course Progress</h3>
                        <span className="text-sm font-bold text-[#C9A961]">{Math.round(progressPercentage)}%</span>
                      </div>
                      <div className="h-3 w-full bg-white/20 rounded-full overflow-hidden border border-white/10 mb-2 relative">
                        <div
                          className="h-full bg-white transition-all duration-700 shadow-[0_0_12px_rgba(255,255,255,0.9)]"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-100">
                        {completedCount} of {totalModules} lectures completed
                      </p>
                    </>
                  );
                })()}
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-12 bg-gradient-to-br from-[#FAF8F3] to-[#F5F1E8] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {levels.length === 0 ? (
            <div className="text-center py-20 text-gray-400 font-bold">No courses defined yet.</div>
          ) : (
            levels.sort((a,b) => a.level - b.level).map((level, levelIndex) => {
              const isFirstLevel = levelIndex === 0;
              const prevLevelPassed = isFirstLevel ? true : user?.completedModules?.includes(`quiz-${levels[levelIndex - 1]._id}`);

              return (
                <div key={level._id} className={!prevLevelPassed ? 'opacity-70 pointer-events-none grayscale-[30%]' : ''}>
                  <div className="text-white rounded-2xl p-8 mb-6 relative overflow-hidden shadow-xl" style={{ background: 'linear-gradient(to right, #1B2A4A, #2D4A8A)' }}>
                    <div className="flex items-center gap-4 mb-2">
                      <Badge className="bg-white/20 text-white text-lg px-4 py-1 border-none">Course {level.level}</Badge>
                      <Badge className="bg-white/20 text-white border-none">{level.subtitle}</Badge>
                    </div>
                    <h2 className="text-3xl font-bold">{level.title}</h2>
                    {!prevLevelPassed && (
                      <p className="mt-4 text-white/80 font-medium flex items-center gap-2">
                        <Lock className="w-4 h-4" /> Pass previous course assessment to unlock
                      </p>
                    )}
                  </div>

                  <Accordion
                    type="single"
                    collapsible
                    value={level.modules.some(m => `module-${m.number}` === activeModule) ? activeModule : ""}
                    onValueChange={handleAccordionChange}
                    className="space-y-4"
                  >
                    {level.modules.map((module) => {
                      const isCompleted = user?.completedModules?.some(id => id === `module-${String(module._id)}` || id === `module-${String(module.number)}`);
                      return (
                        <AccordionItem
                          key={module._id}
                          value={`module-${module.number}`}
                          className={`bg-white border-2 rounded-xl overflow-hidden transition-all duration-300 ${isCompleted ? 'border-[#1B2A4A]/40 shadow-sm' : 'border-[#C9A961]/20'}`}
                        >
                          <AccordionTrigger className={`px-6 py-4 hover:no-underline transition-colors ${isCompleted ? 'hover:bg-[#f0fdf4]' : 'hover:bg-[#FAF8F3]'}`}>
                            <div className="flex items-center gap-4 w-full text-left">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${isCompleted
                                ? 'bg-gradient-to-br from-[#1B2A4A] to-[#2D4A8A]'
                                : 'bg-gradient-to-br from-[#C9A961] to-[#8B7355]'
                                }`}>
                                <span className="text-white font-bold">
                                  {isCompleted ? <CheckCircle className="w-6 h-6" /> : module.number}
                                </span>
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-[#1B2A4A]">{module.title}</h3>
                                <p className="text-sm text-gray-500 line-clamp-1">{module.description}</p>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-6">
                            <div className="space-y-4 pt-4 border-t">
                              <div>
                                <h4 className="font-semibold text-[#1B2A4A] mb-3">Topics Covered:</h4>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  {module.topics.map((topic, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-gray-600">
                                      <CheckCircle className="w-4 h-4 text-[#C9A961] mt-1" />
                                      <span>{topic}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="flex flex-wrap gap-3 pt-4 border-t items-center">
                                <Button
                                  onClick={() => navigate(`/training/module/${level._id}/${module.number}`)}
                                  className="bg-[#C9A961] hover:bg-[#B89751] text-white px-8"
                                >
                                  <Play className="w-4 h-4 mr-2" /> Start Now
                                </Button>
                                <a
                                  href={encodeURI(`/courses/Course 1 Lecture ${module.number} slides (1).pdf`)}
                                  download
                                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#C9A961]/40 text-[#1B2A4A] font-semibold text-sm hover:bg-[#FAF8F3] hover:border-[#C9A961] transition-all"
                                  onClick={e => e.stopPropagation()}
                                >
                                  <Download className="w-4 h-4 text-[#C9A961]" /> Download Notes
                                </a>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      )
                    })}
                  </Accordion>
                </div>
              )
            })
          )}
        </div>
      </section>
    </div>
  );
}
