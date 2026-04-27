import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import {
  User, Mail, Lock, Edit3, Save, Eye, EyeOff,
  Shield, Calendar, Award, ChevronRight
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

export function ProfilePage() {
  const { user, updateProfile, logout } = useAuth();
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
          <h2 className="text-2xl font-bold text-[#2C5F2D] mb-4">Please log in to view your profile</h2>
          <Button onClick={() => navigate('/training')} className="bg-[#2C5F2D] hover:bg-[#234F24] text-white">
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
      <section className="bg-gradient-to-br from-[#2C5F2D] via-[#3A7A3C] to-[#4A8B4D] py-16 text-white relative overflow-hidden">
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
          <Card className="border-none shadow-2xl shadow-gray-200/50 overflow-hidden bg-white" style={{ borderRadius: '32px' }}>
            <CardContent className="p-0 flex flex-col h-full">
              <div className="p-8 pb-3 flex-1">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#2C5F2D]/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-[#2C5F2D]" />
                    </div>
                    Personal Profile
                  </h2>
                  {!editingName && (
                    <button
                      onClick={() => setEditingName(true)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#2C5F2D] bg-[#2C5F2D]/5 rounded-xl hover:bg-[#2C5F2D]/10 transition-all active:scale-95"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit Profile
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {/* Name Field */}
                  <div className={`p-4 rounded-[24px] border-2 transition-all ${editingName ? 'border-[#2C5F2D] bg-white shadow-lg shadow-[#2C5F2D]/5' : 'border-gray-50 bg-gray-50/50 hover:bg-white hover:border-gray-100'}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <User className="w-3.5 h-3.5 text-gray-400" />
                          <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Full Name</label>
                        </div>

                        {editingName ? (
                          <div className="space-y-4">
                            <input
                              value={name}
                              onChange={e => setName(e.target.value)}
                              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 outline-none focus:bg-white focus:border-[#2C5F2D] transition-all"
                              placeholder="Enter your name"
                              autoFocus
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => { setEditingName(false); setName(user.name); }}
                                className="flex-1 py-3 text-xs font-bold text-gray-500 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                              >
                                Discard
                              </button>
                              <button
                                onClick={handleSaveName}
                                disabled={saving}
                                className="flex-[2] py-3 text-xs font-bold text-white bg-[#2C5F2D] rounded-xl hover:bg-[#234F24] shadow-lg shadow-[#2C5F2D]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                              >
                                <Save className="w-3.5 h-3.5" /> Save Changes
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-900 font-bold text-lg leading-tight truncate">{user.name}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="p-4 rounded-[24px] border-2 border-gray-50 bg-gray-50/30">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Mail className="w-3.5 h-3.5 text-[#C9A961]" />
                          <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Email Address</label>
                        </div>
                        <p className="text-gray-900 font-bold text-base leading-tight truncate">{user.email}</p>
                      </div>
                      <div className="px-3 py-1.5 bg-[#2C5F2D] rounded-lg shadow-sm flex items-center gap-2 flex-shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                        <span className="text-[9px] font-black text-white uppercase tracking-widest">Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-3 px-6 bg-gray-50/50 border-t border-gray-50 flex items-center justify-center gap-6 mt-auto">
                <div className="text-center">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-bold text-gray-700">Active</span>
                  </div>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div className="text-center">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Access</p>
                  <div className="flex items-center justify-center h-4">
                    <span className="text-xs font-bold text-[#C9A961]">{user.role === 'admin' ? 'Admin' : 'Full'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Card */}
          <Card className="border-none shadow-2xl shadow-gray-200/50 overflow-hidden bg-white" style={{ borderRadius: '32px' }}>
            <CardContent className="p-0 flex flex-col h-full">
              <div className="p-6 pb-2 flex-1">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#C9A961]/10 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-[#C9A961]" />
                    </div>
                    Account Security
                  </h2>
                </div>

                {!changingPassword ? (
                  <div className="p-4 rounded-[24px] border-2 border-gray-50 bg-gray-50/50 hover:bg-white hover:border-gray-100 transition-all group">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Lock className="w-3.5 h-3.5 text-gray-400" />
                          <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Password</label>
                        </div>
                        <p className="text-gray-900 font-bold text-base leading-tight">••••••••••••</p>
                      </div>
                      <button
                        onClick={() => setChangingPassword(true)}
                        className="px-5 py-2.5 text-xs font-bold text-[#C9A961] bg-white border-2 border-[#C9A961]/20 rounded-xl hover:border-[#C9A961] hover:bg-[#C9A961]/5 transition-all flex items-center gap-2 shadow-sm"
                      >
                        Change <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="space-y-1">
                      {['Current', 'New', 'Confirm'].map((label, idx) => (
                        <div key={label}>
                          <div className="flex items-center gap-2 mb-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{label} Password</label>
                          </div>
                          <div className="relative">
                            <input
                              type={label === 'Current' ? (showCurrentPw ? 'text' : 'password') : label === 'New' ? (showNewPw ? 'text' : 'password') : (showConfirmPw ? 'text' : 'password')}
                              value={label === 'Current' ? currentPassword : label === 'New' ? newPassword : confirmPassword}
                              onChange={e => label === 'Current' ? setCurrentPassword(e.target.value) : label === 'New' ? setNewPassword(e.target.value) : setConfirmPassword(e.target.value)}
                              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 pr-12 text-sm font-bold text-gray-900 outline-none focus:bg-white focus:border-[#C9A961] transition-all"
                              placeholder={`Enter ${label.toLowerCase()} password`}
                            />
                            <button
                              type="button"
                              onClick={() => label === 'Current' ? setShowCurrentPw(!showCurrentPw) : label === 'New' ? setShowNewPw(!showNewPw) : setShowConfirmPw(!showConfirmPw)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                            >
                              {(label === 'Current' ? showCurrentPw : label === 'New' ? showNewPw : showConfirmPw) ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => { setChangingPassword(false); setCurrentPassword(''); setNewPassword(''); setConfirmPassword(''); }}
                        className="flex-1 py-3 text-xs font-bold text-gray-500 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleChangePassword}
                        disabled={saving || !currentPassword || !newPassword || newPassword !== confirmPassword}
                        className="flex-[2] py-3 text-xs font-bold text-white bg-[#C9A961] rounded-xl hover:bg-[#b89a58] shadow-lg shadow-[#C9A961]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-40"
                      >
                        <Lock className="w-3.5 h-3.5" /> Update Password
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="py-3 px-6 bg-[#C9A961]/5 border-t border-[#C9A961]/10 flex items-center justify-between mt-auto">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Security Score</p>
                  <span className="text-xs font-bold text-gray-700">Excellent</span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-4 h-1 rounded-full bg-[#C9A961]" />)}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Card */}
        <Card className="border-gray-100 shadow-lg overflow-hidden mt-16" style={{ borderRadius: '24px' }}>
          <div className="h-1.5 bg-gradient-to-r from-[#2C5F2D] to-[#4A8B4D]" />
          <CardContent className="p-8">
            <h2 className="text-lg font-black text-gray-900 uppercase tracking-widest mb-8 flex items-center gap-3">
              <Award className="w-5 h-5 text-[#2C5F2D]" /> Learning Stats
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-[#2C5F2D]/5 to-[#2C5F2D]/10 rounded-2xl p-5 text-center border border-[#2C5F2D]/10">
                <p className="text-3xl font-black text-[#2C5F2D]">{user.completedModules?.filter(id => id.startsWith('module-')).length || 0}</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2">Modules Done</p>
              </div>
              <div className="bg-gradient-to-br from-[#C9A961]/5 to-[#C9A961]/10 rounded-2xl p-5 text-center border border-[#C9A961]/10">
                <p className="text-3xl font-black text-[#C9A961]">{user.currentStreak || 0}</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2">Day Streak</p>
              </div>
              <div className="bg-gradient-to-br from-[#2C5F2D]/5 to-[#C9A961]/10 rounded-2xl p-5 text-center border border-gray-100 col-span-2 sm:col-span-1">
                <p className="text-3xl font-black text-gray-900">{user.longestStreak || 0}</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2">Best Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
