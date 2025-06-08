import React, { useState, createContext, useContext } from 'react';

const AuthContext = createContext(null);

const dummyUsers = [
  // ...your dummy users as in your prompt...
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(dummyUsers);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const foundUser = users.find(u => u.email === email && u.password === password);
    setLoading(false);
    if (foundUser) {
      setUser(foundUser);
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const register = async (userData) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (users.find(u => u.email === userData.email)) {
      setLoading(false);
      return { success: false, message: 'Email already exists' };
    }
    const newUser = { id: users.length + 1, ...userData };
    setUsers([...users, newUser]);
    setUser(newUser);
    setLoading(false);
    return { success: true };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};