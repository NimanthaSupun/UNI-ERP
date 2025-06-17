import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import RoleSelection from "./components/RoleSelection";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";
import ResearchMentoringPanel from "./components/ResearchMentoringPanel";
const UniversityERPApp = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedRole, setSelectedRole] = useState(null);
  const { user } = useAuth();
  console.log("Current page:", currentPage);

  const navigate = (page, role = null) => {
    setCurrentPage(page);
    if (role) setSelectedRole(role);
  };

  switch (currentPage) {
    case "home":
      return <RoleSelection onRoleSelect={navigate} />;
    case "login":
      return <LoginForm role={selectedRole} onNavigate={navigate} />;
    case "register":
      return <RegisterForm role={selectedRole} onNavigate={navigate} />;
    case "dashboard":
      // Only show dashboard if user is logged in
      return user ? <Dashboard user={user} onNavigate={navigate} /> : <RoleSelection onRoleSelect={navigate} />;
    case "mentoring":
      // Only show mentoring panel if user is logged in
      return user ? <ResearchMentoringPanel onNavigate={navigate} /> : <RoleSelection onRoleSelect={navigate} />;
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
