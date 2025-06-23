// import React, { useState } from "react";
// import { AuthProvider, useAuth } from "./context/AuthContext";
// import RoleSelection from "./components/RoleSelection";
// import LoginForm from "./components/LoginForm";
// import RegisterForm from "./components/RegisterForm";
// import Dashboard from "./components/Dashboard";
// import ResearchMentoringPanel from "./components/ResearchMentoringPanel";
// import ResearchHub from "../src/components/ResearchHub/ResearchHub";
// import TestPage from "./components/TestPage";
// const UniversityERPApp = () => {
//   const [currentPage, setCurrentPage] = useState("home");
//   const [selectedRole, setSelectedRole] = useState(null);
//   const { user } = useAuth();
//   console.log("Current page:", currentPage);

//   const navigate = (page, role = null) => {
//     setCurrentPage(page);
//     if (role) setSelectedRole(role);
//   };

//   switch (currentPage) {
//     case "home":
//       return <RoleSelection onRoleSelect={navigate} />;
//     case "login":
//       return <LoginForm role={selectedRole} onNavigate={navigate} />;
//     case "register":
//       return <RegisterForm role={selectedRole} onNavigate={navigate} />;
//     case "dashboard":
//       // Only show dashboard if user is logged in
//       return user ? (
//         <Dashboard user={user} onNavigate={navigate} />
//       ) : (
//         <RoleSelection onRoleSelect={navigate} />
//       );
//     case "mentoring":
//       // Only show mentoring panel if user is logged in
//       return user ? (
//         <ResearchMentoringPanel onNavigate={navigate} />
//       ) : (
//         <RoleSelection onRoleSelect={navigate} />
//       );
//     default:
//       return <RoleSelection onRoleSelect={navigate} />;
//   }
// };
// function App() {
//   return (
//     <AuthProvider>
//       <UniversityERPApp />
//     </AuthProvider>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import RoleSelection from "./components/RoleSelection";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";
import ResearchMentoringPanel from "./components/ResearchMentoringPanel";
import ResearchHub from "./components/ResearchHub/ResearchHub";
import TestPage from "./components/TestPage";

// Protect routes that require login
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RoleSelection />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/mentoring" element={<ProtectedRoute><ResearchMentoringPanel /></ProtectedRoute>} />
      <Route path="/researchhub/*" element={<ProtectedRoute><ResearchHub /></ProtectedRoute>} />
      <Route path="/test" element={<TestPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;