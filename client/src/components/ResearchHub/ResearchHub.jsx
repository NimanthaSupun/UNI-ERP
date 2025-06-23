import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import LandingPage from "./Home/LandingPage.jsx";
import StudentDashboard from "./Dashbord/StudentDashboard.jsx";
import SupervisorList from "./Superviors/SupervisorList.jsx";
import CollaborationFeed from './Collaboration/CollaborationFeed.jsx';

const ResearchHub = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="indashboard" element={<StudentDashboard />} />
        <Route path="supervisors" element={<SupervisorList />} />
        <Route path="collaboration" element={<CollaborationFeed />} />
      </Route>
    </Routes>
  );
};

export default ResearchHub;