import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import {
  User, Lock, Edit3, Save, Eye, EyeOff,
  Shield, Calendar, Award,
  BookOpenCheck, Flame, Trophy, TrendingUp
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

export function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState(user?.name || '');

  const [changingPassword, setChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F3]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1B2A4A] mb-4">Please log in to view your profile</h2>
          <Button onClick={() => navigate('/training')} className="bg-[#1B2A4A] hover:bg-[#122038] text-white">
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  const handleSaveName = async () => {
    if (!name.trim() || name.trim().length < 2) {
      toast.error('Name must be at least 2 characters');
      return;
    }
    setSaving(true);
    try {
      await updateProfile({ name: name.trim() });
      toast.success('Name updated successfully!');
      setEditingName(false);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to update name');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword) {
      toast.error('Please enter your current password');
      return;
    }
    if (newPassword.length < 5) {
      toast.error('New password must be at least 5 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    setSaving(true);
    try {
      await updateProfile({ currentPassword, newPassword });
      toast.success('Password changed successfully!');
      setChangingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  const initials = user.name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const memberSince = user.lastActivityDate
    ? new Date(user.lastActivityDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : 'Recently';

  return (
    <div className="min-h-screen bg-[#FAF8F3]" style={{ paddingBottom: '320px' }}>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1B2A4A] via-[#3A7A3C] to-[#2D4A8A] py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/arabesque-thin.png')]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          {/* Avatar */}
          <div className="w-28 h-28 rounded-full bg-white/15 backdrop-blur-md border-4 border-white/30 flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <span className="text-4xl font-black text-white tracking-wider">{initials}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">{user.name}</h1>
          <p className="text-white/70 font-medium text-lg">{user.email}</p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Badge className="bg-white/10 backdrop-blur-sm text-white border-white/20 font-bold px-4 py-2 text-xs uppercase tracking-widest">
              <Shield className="w-3.5 h-3.5 mr-2" />
              {user.role === 'admin' ? 'Administrator' : 'Student'}
            </Badge>
            <Badge className="bg-white/10 backdrop-blur-sm text-white border-white/20 font-bold px-4 py-2 text-xs uppercase tracking-widest">
              <Calendar className="w-3.5 h-3.5 mr-2" />
              Since {memberSince}
            </Badge>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* Personal Info Card */}
          <Card className="border-none shadow-xl shadow-gray-200/50 overflow-hidden bg-white" style={{ borderRadius: '24px' }}>
            <CardContent className="p-0">
              {/* Header */}
              <div className="px-8 py-6 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#1B2A4A]" />
                  Personal Profile
                </h2>
                {!editingName && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingName(true)}
                    className="border-[#1B2A4A] text-[#1B2A4A] hover:bg-[#1B2A4A] hover:text-white font-bold rounded-xl h-9"
                  >
                    <Edit3 className="w-4 h-4 mr-2" /> Edit
                  </Button>
                )}
              </div>

              {/* Body */}
              <div className="p-8 space-y-8">
                {/* Name */}
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                  </div>
                  {editingName ? (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-[#1B2A4A]/20 focus:border-[#1B2A4A] transition-all"
                        placeholder="Enter your name"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <Button variant="ghost" onClick={() => { setEditingName(false); setName(user.name); }} className="font-bold text-gray-500 rounded-xl">Discard</Button>
                        <Button onClick={handleSaveName} disabled={saving} className="bg-[#1B2A4A] hover:bg-[#122038] text-white font-bold rounded-xl px-6">Save</Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xl font-bold text-gray-900 leading-tight">{user.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                    <Badge className="bg-[#1B2A4A]/10 text-[#1B2A4A] border-none font-bold text-[10px] uppercase px-3 py-0.5 rounded-full">
                      Verified
                    </Badge>
                  </div>
                  <p className="text-lg font-bold text-gray-800">{user.email}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-8 py-6 bg-gray-50/30 border-t border-gray-100 grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                  <p className="text-sm font-bold text-[#1B2A4A]">Active Student</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Access</p>
                  <p className="text-sm font-bold text-[#C9A961]">{user.role === 'admin' ? 'Administrator' : 'Premium Member'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Card */}
          <Card className="border-none shadow-xl shadow-gray-200/50 overflow-hidden bg-white" style={{ borderRadius: '24px' }}>
            <CardContent className="p-0">
              {/* Header */}
              <div className="px-8 py-6 bg-gray-50/50 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#C9A961]" />
                  Security Settings
                </h2>
              </div>

              {/* Body */}
              <div className="p-8">
                {!changingPassword ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Account Password</label>
                      <p className="text-2xl font-black text-gray-900 tracking-[0.3em]">••••••••</p>
                    </div>
                    <Button
                      onClick={() => setChangingPassword(true)}
                      className="bg-[#C9A961] hover:bg-[#b89a58] text-white font-bold rounded-xl px-6"
                    >
                      Change
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {['Current', 'New', 'Confirm'].map((label) => {
                      const showPw = label === 'Current' ? showCurrentPw : label === 'New' ? showNewPw : showConfirmPw;
                      const setShowPw = label === 'Current' ? setShowCurrentPw : label === 'New' ? setShowNewPw : setShowConfirmPw;
                      const val = label === 'Current' ? currentPassword : label === 'New' ? newPassword : confirmPassword;
                      const setVal = label === 'Current' ? setCurrentPassword : label === 'New' ? setNewPassword : setConfirmPassword;
                      return (
                        <div key={label} className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{label} Password</label>
                          <div className="relative group flex items-center">
                            <input
                              type={showPw ? 'text' : 'password'}
                              value={val}
                              onChange={e => setVal(e.target.value)}
                              className="w-full h-14 bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 pr-12 text-base font-bold text-gray-900 outline-none focus:ring-4 focus:ring-[#C9A961]/10 focus:border-[#C9A961] transition-all placeholder:text-gray-300"
                              placeholder={`Enter ${label.toLowerCase()} password`}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPw(!showPw)}
                              className="absolute z-10 text-gray-400 hover:text-gray-600"
                              style={{ right: '16px', top: '50%', transform: 'translateY(-50%)', left: 'auto' }}
                            >
                              {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    <div className="flex gap-3 pt-6">
                      <Button 
                        variant="ghost" 
                        onClick={() => { setChangingPassword(false); setCurrentPassword(''); setNewPassword(''); setConfirmPassword(''); }} 
                        className="font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-xl h-12"
                      >
                        Discard Changes
                      </Button>
                      <Button 
                        onClick={handleChangePassword} 
                        disabled={saving || !currentPassword || !newPassword || newPassword !== confirmPassword} 
                        className="flex-[1.5] bg-[#C9A961] hover:bg-[#b89a58] text-white font-bold rounded-xl h-12 shadow-lg shadow-[#C9A961]/20 disabled:opacity-50"
                      >
                        <Save className="w-4 h-4 mr-2" /> Update Password
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-8 py-6 bg-gray-50/30 border-t border-gray-100 flex items-center justify-between mt-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#C9A961]/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#C9A961]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Security Score</p>
                    <p className="text-sm font-bold text-gray-900 leading-none">High Protection</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-5 h-1.5 rounded-full bg-[#C9A961]" />)}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Card */}
        <Card className="border-none shadow-2xl shadow-gray-200/60 overflow-hidden mt-16 bg-white" style={{ borderRadius: '32px' }}>
          <CardContent className="p-0">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gradient-to-r from-gray-50/50 to-transparent">
              <h2 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#1B2A4A]/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#1B2A4A]" />
                </div>
                Learning Journey
              </h2>
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#C9A961]/10 rounded-xl">
                <TrendingUp className="w-4 h-4 text-[#C9A961]" />
                <span className="text-[10px] font-black text-[#C9A961] uppercase tracking-widest">Consistency is Key</span>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Modules Done */}
                <div className="group p-6 rounded-[28px] bg-gradient-to-br from-white to-gray-50/50 border-2 border-gray-100 hover:border-[#1B2A4A]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#1B2A4A]/5 hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-4xl font-black text-[#1B2A4A] mb-1">
                        {user.completedModules?.filter(id => id.startsWith('module-')).length || 0}
                      </p>
                      <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em]">Modules Done</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-[#1B2A4A]/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#1B2A4A]/10 transition-all">
                      <BookOpenCheck className="w-6 h-6 text-[#1B2A4A]" />
                    </div>
                  </div>
                  <div className="w-10 h-1 bg-[#1B2A4A]/20 rounded-full group-hover:w-full transition-all duration-500" />
                </div>

                {/* Day Streak */}
                <div className="group p-6 rounded-[28px] bg-gradient-to-br from-white to-gray-50/50 border-2 border-gray-100 hover:border-[#C9A961]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#C9A961]/5 hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-4xl font-black text-[#C9A961] mb-1">
                        {user.currentStreak || 0}
                      </p>
                      <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em]">Current Streak</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-[#C9A961]/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#C9A961]/10 transition-all">
                      <Flame className="w-6 h-6 text-[#C9A961]" />
                    </div>
                  </div>
                  <div className="mt-4 w-10 h-1 bg-[#C9A961]/20 rounded-full group-hover:w-full transition-all duration-500" />
                </div>

                {/* Best Streak */}
                <div className="group p-6 rounded-[28px] bg-gradient-to-br from-white to-gray-50/50 border-2 border-gray-100 hover:border-gray-300 transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-4xl font-black text-gray-900 mb-1">
                        {user.longestStreak || 0}
                      </p>
                      <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em]">All-time Best</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-gray-200 transition-all">
                      <Trophy className="w-6 h-6 text-gray-700" />
                    </div>
                  </div>
                  <div className="mt-4 w-10 h-1 bg-gray-200 rounded-full group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            </div>

            <div className="py-4 px-8 bg-gray-50/50 border-t border-gray-50 text-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                Keep learning every day to grow your streak and knowledge!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
