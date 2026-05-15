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
      <div className="max-w-2xl mx-auto px-4 sm:px-6 -mt-8 relative z-10 space-y-6">
        {/* Personal Info Card */}
        <Card className="border-gray-100 shadow-lg overflow-hidden" style={{ borderRadius: '24px' }}>
          <div className="h-1.5 bg-gradient-to-r from-[#1B2A4A] to-[#C9A961]" />
          <CardContent className="p-8">
            <h2 className="text-lg font-black text-gray-900 uppercase tracking-widest mb-8 flex items-center gap-3">
              <User className="w-5 h-5 text-[#1B2A4A]" /> Personal Information
            </h2>

            {/* Name */}
            <div className="space-y-6">
              <div className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#1B2A4A]/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-[#1B2A4A]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Full Name</p>
                    {editingName ? (
                      <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-900 outline-none focus:border-[#1B2A4A] focus:ring-2 focus:ring-[#1B2A4A]/10 transition-all"
                        autoFocus
                      />
                    ) : (
                      <p className="text-gray-900 font-bold text-[15px] truncate">{user.name}</p>
                    )}
                  </div>
                </div>
                {editingName ? (
                  <div className="flex gap-2 ml-4 flex-shrink-0">
                    <button
                      onClick={() => { setEditingName(false); setName(user.name); }}
                      className="px-4 py-2 text-xs font-bold text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveName}
                      disabled={saving}
                      className="px-4 py-2 text-xs font-bold text-white bg-[#1B2A4A] rounded-xl hover:bg-[#122038] transition-colors flex items-center gap-1.5 disabled:opacity-50"
                    >
                      <Save className="w-3.5 h-3.5" /> Save
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setEditingName(true)}
                    className="p-2.5 text-gray-400 hover:text-[#C9A961] hover:bg-white rounded-xl transition-all flex-shrink-0"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Email (read-only) */}
              <div className="flex items-center p-5 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-[#C9A961]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#C9A961]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Email Address</p>
                    <p className="text-gray-900 font-bold text-[15px]">{user.email}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-gray-400 border-gray-200 text-[9px] uppercase tracking-widest font-bold flex-shrink-0">
                  Read Only
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Card */}
        <Card className="border-gray-100 shadow-lg overflow-hidden" style={{ borderRadius: '24px' }}>
          <div className="h-1.5 bg-gradient-to-r from-[#C9A961] to-[#1B2A4A]" />
          <CardContent className="p-8">
            <h2 className="text-lg font-black text-gray-900 uppercase tracking-widest mb-8 flex items-center gap-3">
              <Lock className="w-5 h-5 text-[#C9A961]" /> Security
            </h2>

            {!changingPassword ? (
              <div className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1B2A4A]/10 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-[#1B2A4A]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Password</p>
                    <p className="text-gray-900 font-bold text-[15px]">••••••••••</p>
                  </div>
                </div>
                <button
                  onClick={() => setChangingPassword(true)}
                  className="px-5 py-2.5 text-xs font-bold text-[#1B2A4A] bg-white border-2 border-[#1B2A4A]/20 rounded-xl hover:border-[#1B2A4A] hover:bg-[#1B2A4A]/5 transition-all flex items-center gap-2"
                >
                  Change Password <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Current password */}
                <div className="relative">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrentPw ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={e => setCurrentPassword(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-12 text-sm font-semibold text-gray-900 outline-none focus:border-[#1B2A4A] focus:ring-2 focus:ring-[#1B2A4A]/10 transition-all"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPw(!showCurrentPw)}
                      className="absolute z-10 text-gray-400 hover:text-gray-600"
                      style={{ right: '12px', top: '50%', transform: 'translateY(-50%)', left: 'auto' }}
                    >
                      {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* New password */}
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPw ? 'text' : 'password'}
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-12 text-sm font-semibold text-gray-900 outline-none focus:border-[#1B2A4A] focus:ring-2 focus:ring-[#1B2A4A]/10 transition-all"
                      placeholder="Enter new password (min 5 chars)"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPw(!showNewPw)}
                      className="absolute z-10 text-gray-400 hover:text-gray-600"
                      style={{ right: '12px', top: '50%', transform: 'translateY(-50%)', left: 'auto' }}
                    >
                      {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm password */}
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPw ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-12 text-sm font-semibold text-gray-900 outline-none focus:border-[#1B2A4A] focus:ring-2 focus:ring-[#1B2A4A]/10 transition-all"
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPw(!showConfirmPw)}
                      className="absolute z-10 text-gray-400 hover:text-gray-600"
                      style={{ right: '12px', top: '50%', transform: 'translateY(-50%)', left: 'auto' }}
                    >
                      {showConfirmPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {confirmPassword && newPassword !== confirmPassword && (
                    <p className="text-red-500 text-xs font-semibold mt-2">Passwords do not match</p>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      setChangingPassword(false);
                      setCurrentPassword('');
                      setNewPassword('');
                      setConfirmPassword('');
                    }}
                    className="flex-1 px-4 py-3 text-sm font-bold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleChangePassword}
                    disabled={saving || !currentPassword || !newPassword || newPassword !== confirmPassword}
                    className="flex-1 px-4 py-3 text-sm font-bold text-white bg-[#1B2A4A] rounded-xl hover:bg-[#122038] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" /> Update Password
                  </button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card className="border-gray-100 shadow-lg overflow-hidden" style={{ borderRadius: '24px' }}>
          <div className="h-1.5 bg-gradient-to-r from-[#1B2A4A] to-[#2D4A8A]" />
          <CardContent className="p-8">
            <h2 className="text-lg font-black text-gray-900 uppercase tracking-widest mb-8 flex items-center gap-3">
              <Award className="w-5 h-5 text-[#1B2A4A]" /> Learning Stats
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-[#1B2A4A]/5 to-[#1B2A4A]/10 rounded-2xl p-5 text-center border border-[#1B2A4A]/10">
                <p className="text-3xl font-black text-[#1B2A4A]">{user.completedModules?.filter(id => id.startsWith('module-')).length || 0}</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2">Modules Done</p>
              </div>
              <div className="bg-gradient-to-br from-[#C9A961]/5 to-[#C9A961]/10 rounded-2xl p-5 text-center border border-[#C9A961]/10">
                <p className="text-3xl font-black text-[#C9A961]">{user.currentStreak || 0}</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2">Day Streak</p>
              </div>
              <div className="bg-gradient-to-br from-[#1B2A4A]/5 to-[#C9A961]/10 rounded-2xl p-5 text-center border border-gray-100 col-span-2 sm:col-span-1">
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
