import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: number;
  email: string;
  name: string;
  company?: string;
  jobTitle?: string;
  profilePicture?: string;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signUp: (name: string, email: string, password: string, company?: string, jobTitle?: string) => Promise<{ success: boolean; message: string }>;
  signOut: () => void;
  updateUser: (userData: Partial<User>) => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Set to false for demo

  console.log('AuthProvider initialized - isLoading:', isLoading, 'isAuthenticated:', !!user);

  const signIn = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    console.log('Demo signIn called with:', email);
    
    // Simulate a successful login for demo purposes
    setUser({
      id: 1,
      email: email,
      name: 'Demo User',
      company: 'Demo Company',
      jobTitle: 'Demo Job',
      createdAt: new Date()
    });
    setToken('demo-token-123');
    
    return {
      success: true,
      message: 'Demo login successful'
    };
  };

  const signUp = async (name: string, email: string, password: string, company?: string, jobTitle?: string): Promise<{ success: boolean; message: string }> => {
    console.log('Demo signUp called with:', name, email);
    
    // Simulate a successful signup for demo purposes
    setUser({
      id: 1,
      email: email,
      name: name,
      company: company || 'Demo Company',
      jobTitle: jobTitle || 'Demo Job',
      createdAt: new Date()
    });
    setToken('demo-token-123');
    
    return {
      success: true,
      message: 'Demo signup successful'
    };
  };

  const signOut = () => {
    console.log('Demo signOut called');
    setUser(null);
    setToken(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signIn,
    signUp,
    signOut,
    updateUser,
    token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
