import React, { useState, createContext, useContext } from 'react';

const AuthContext = createContext(null);

const dummyUsers = [
  {
    id: 1,
    // email: 'john.student@university.edu',
    email: 'supunnimantha199@gmail.com',
    password: 'password123',
    role: 'student',
    fullName: 'John Doe',
    studentId: 'STU001',
    degreeProgram: 'BSc IT',
    yearOfStudy: '2nd Year',
    department: 'Computer Science',
    researchInterests: ['AI', 'Web Development']
  },
  {
    id: 2,
    email: 'jane.lecturer@university.edu',
    password: 'password123',
    role: 'lecturer',
    fullName: 'Dr. Jane Smith',
    staffId: 'LEC001',
    designation: 'Senior Lecturer',
    department: 'Computer Science',
    researchAreas: ['Machine Learning', 'Data Science']
  },
  {
    id: 3,
    email: 'admin.coordinator@university.edu',
    password: 'password123',
    role: 'coordinator',
    fullName: 'Mike Johnson',
    staffId: 'ADM001',
    designation: 'Timetable Officer',
    department: 'Administration',
    contactNumber: '+94771234567'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(dummyUsers);
  const [loading, setLoading] = useState(false);

  const login = async (email, password, role) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    const foundUser = users.find(
      u => u.email === email && u.password === password && u.role === role
    );
    setLoading(false);
    if (foundUser) {
      setUser(foundUser);
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials or role' };
  };

  const register = async (userData) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    if (users.find(u => u.email === userData.email && u.role === userData.role)) {
      setLoading(false);
      return { success: false, message: 'Email already exists for this role' };
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