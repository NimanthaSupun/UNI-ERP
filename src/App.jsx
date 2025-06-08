// import { useState } from 'react'
// import './App.css'
// import UniversityERPMain from './pages/UniversityERPMain'

// function App() {
//   return (
//     <div>
//       <UniversityERPMain/>
//     </div>
//   )
// }

// export default App

// todo:--------------------------

import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import RoleSelection from './components/RoleSelection';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';

const UniversityERPApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedRole, setSelectedRole] = useState(null);
  const { user } = useAuth();

  const navigate = (page, role = null) => {
    setCurrentPage(page);
    if (role) setSelectedRole(role);
  };

  if (user) return <Dashboard user={user} />;

  switch (currentPage) {
    case 'home':
      return <RoleSelection onRoleSelect={navigate} />;
    case 'login':
      return <LoginForm role={selectedRole} onNavigate={navigate} />;
    case 'register':
      return <RegisterForm role={selectedRole} onNavigate={navigate} />;
    default:
      return <RoleSelection onRoleSelect={navigate} />;
  }
};

function App() {
  return (
    <AuthProvider>
      <UniversityERPApp />
    </AuthProvider>
  );
}

export default App;