import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '../config/firebase';

const getGoogleAuthErrorMessage = (error: unknown) => {
  const code = typeof error === 'object' && error && 'code' in error
    ? String((error as { code?: string }).code)
    : '';

  if (code === 'auth/unauthorized-domain') {
    return `Google login is not enabled for ${window.location.hostname}. Add this domain to Firebase Authentication > Settings > Authorized domains.`;
  }
  if (code === 'auth/popup-blocked') {
    return 'The Google sign-in popup was blocked. Allow popups for this website and try again.';
  }
  if (code === 'auth/popup-closed-by-user') {
    return 'Google sign-in was cancelled before completion.';
  }
  if (code === 'auth/cancelled-popup-request') {
    return 'Another Google sign-in popup is already open.';
  }
  if (code === 'auth/operation-not-allowed') {
    return 'Google sign-in is not enabled in Firebase Authentication.';
  }

  return error instanceof Error ? error.message : 'Google sign-in failed.';
};

interface User {
  id: string;
  name: string;
  email: string;
  completedModules?: string[];
  lastViewedModuleId?: string;
  suggestedModuleId?: string;
  currentStreak?: number;
  longestStreak?: number;
  lastActivityDate?: string;
  role?: 'user' | 'admin';
  quizAnswers?: Record<string, number[]>;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  updateProgress: (moduleId?: string, quizAnswers?: Record<string, number[]>, lastViewedModuleId?: string) => Promise<void>;
  updateProfile: (data: { name?: string; currentPassword?: string; newPassword?: string }) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (email: string, otp: string, newPassword: string) => Promise<void>;
  isGoogleLoginConfigured: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const res = await api.get('/user/profile');
          setUser(res.data);
        } catch (err) {
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password });
    const { token: newToken, user: userData } = res.data;
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await api.post('/auth/register', { name, email, password });
    const { token: newToken, user: userData } = res.data;
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
  };

  const loginWithGoogle = async () => {
    if (!auth || !googleProvider) {
      throw new Error('Google sign-in needs Firebase configuration before it can be used.');
    }

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken(true);

      const res = await api.post('/auth/google-login', { idToken });
      const { token: newToken, user: userData } = res.data;

      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);
    } catch (error: any) {
      if (error?.response?.data?.message) throw error;
      throw new Error(getGoogleAuthErrorMessage(error));
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const updateProgress = async (moduleId?: string, quizAnswers?: Record<string, number[]>, lastViewedModuleId?: string) => {
    if (!user) return;
    try {
      const res = await api.post('/user/progress', { moduleId, quizAnswers, lastViewedModuleId });
      setUser(res.data); // The response is now the full user object
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  };
  const updateProfile = async (data: { name?: string; currentPassword?: string; newPassword?: string }) => {
    const res = await api.put('/user/profile', data);
    setUser(res.data);
  };

  const forgotPassword = async (email: string) => {
    await api.post('/auth/forgot-password', { email });
  };

  const resetPassword = async (email: string, otp: string, newPassword: string) => {
    await api.post('/auth/reset-password', { email, otp, newPassword });
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, loginWithGoogle, logout, updateProgress, updateProfile, forgotPassword, resetPassword, isGoogleLoginConfigured: isFirebaseConfigured }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
