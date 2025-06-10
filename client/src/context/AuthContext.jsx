import React, { createContext, useContext, useState } from 'react';
import { dummyUsers } from '../data/dummyUsers.js';

// Create Auth Context
const AuthContext = createContext(null);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(dummyUsers);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      setLoading(false);
      return { success: true };
    }
    setLoading(false);
    return { success: false, message: 'Invalid credentials' };
  };

  const register = async (userData) => {
    setLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      setLoading(false);
      return { success: false, message: 'Email already exists' };
    }

    const newUser = {
      id: users.length + 1,
      ...userData
    };
    
    setUsers([...users, newUser]);
    setUser(newUser);
    setLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};