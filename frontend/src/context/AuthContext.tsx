import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

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
    // 1. Authenticate with Google on the client using Firebase
    const result = await signInWithPopup(auth, googleProvider);
    const idToken = await result.user.getIdToken();

    // 2. Exchange Firebase Token for Backend JWT
    const res = await api.post('/auth/google-login', { idToken });
    const { token: newToken, user: userData } = res.data;

    // 3. Set standard authentication states
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
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
    <AuthContext.Provider value={{ user, token, loading, login, register, loginWithGoogle, logout, updateProgress, updateProfile, forgotPassword, resetPassword }}>
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
