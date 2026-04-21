import React, { useState } from 'react';
import { Mail, Lock, ArrowLeft, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

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

export function AuthForm() {
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
