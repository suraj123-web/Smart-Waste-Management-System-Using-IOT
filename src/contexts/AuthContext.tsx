"use client";

import type { User } from '@/types';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } // Asegúrate de que esto es 'next/navigation' para App Router
from 'next/navigation'; // Corrección: next/router es para Pages Router, next/navigation para App Router


interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<boolean>;
  signup: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data - in a real app, this would come from a database
const MOCK_USERS: Record<string, User> = {
  "user@example.com": { id: "1", email: "user@example.com", password: "password123" },
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const loadUserFromStorage = useCallback(() => {
    setIsLoading(true);
    try {
      const storedUser = localStorage.getItem('binsight_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to load user from storage:", error);
      // Potentially clear corrupted storage
      localStorage.removeItem('binsight_user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  const login = async (email: string, pass: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    const foundUser = Object.values(MOCK_USERS).find(u => u.email === email && u.password === pass);
    if (foundUser) {
      const { password, ...userToStore } = foundUser; // Don't store password in localStorage
      setUser(userToStore);
      localStorage.setItem('binsight_user', JSON.stringify(userToStore));
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const signup = async (email: string, pass: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    if (MOCK_USERS[email]) {
      setIsLoading(false);
      return false; // User already exists
    }
    const newUser: User = { id: String(Date.now()), email, password: pass }; // Store password for mock check
    MOCK_USERS[email] = newUser; // Add to mock "database"
    
    const { password, ...userToStore } = newUser;
    setUser(userToStore);
    localStorage.setItem('binsight_user', JSON.stringify(userToStore));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('binsight_user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
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
