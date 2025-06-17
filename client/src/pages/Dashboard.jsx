import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { getRoleInfo } from '../utils/roleUtils.js';
import BackgroundLayout from '../components/layout/BackgroundLayout.jsx';
import Button from '../components/ui/Button.jsx';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null;
  }

  const roleInfo = getRoleInfo(user.role);
  const IconComponent = roleInfo.icon;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <BackgroundLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center">
            <div className={`w-12 h-12 bg-gradient-to-r ${roleInfo.color} rounded-xl flex items-center justify-center mr-4 shadow-xl`}>
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{roleInfo.title} Dashboard</h1>
              <p className="text-slate-300">Welcome back, {user.fullName}</p>
            </div>
          </div>
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {/* User Info Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl max-w-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-400 mb-1 text-sm">Full Name</label>
              <p className="text-white font-medium">{user.fullName}</p>
            </div>
            <div>
              <label className="block text-slate-400 mb-1 text-sm">Email</label>
              <p className="text-white font-medium">{user.email}</p>
            </div>
            <div>
              <label className="block text-slate-400 mb-1 text-sm">Role</label>
              <p className="text-white font-medium capitalize">{user.role}</p>
            </div>
            {user.studentId && (
              <div>
                <label className="block text-slate-400 mb-1 text-sm">Student ID</label>
                <p className="text-white font-medium">{user.studentId}</p>
              </div>
            )}
            {user.staffId && (
              <div>
                <label className="block text-slate-400 mb-1 text-sm">Staff ID</label>
                <p className="text-white font-medium">{user.staffId}</p>
              </div>
            )}
            {user.degreeProgram && (
              <div>
                <label className="block text-slate-400 mb-1 text-sm">Degree Program</label>
                <p className="text-white font-medium">{user.degreeProgram}</p>
              </div>
            )}
            {user.designation && (
              <div>
                <label className="block text-slate-400 mb-1 text-sm">Designation</label>
                <p className="text-white font-medium">{user.designation}</p>

              </div>
            )}
            {user.department && (
              <div>
                <label className="block text-slate-400 mb-1 text-sm">Department</label>
                <p className="text-white font-medium">{user.department}</p>
                
              </div>
            )}
            {user.yearOfStudy && (
              <div>
                <label className="block text-slate-400 mb-1 text-sm">Year of Study</label>
                <p className="text-white font-medium">{user.yearOfStudy}</p>
              </div>
            )}
            {user.contactNumber && (
              <div>
                <label className="block text-slate-400 mb-1 text-sm">Contact Number</label>
                <p className="text-white font-medium">{user.contactNumber}</p>
              </div>
            )}
          </div>
        </div>

        {/* Success Message */}
        <div className="mt-8 bg-green-500/20 border border-green-500/50 rounded-xl p-6 max-w-2xl">
          <div className="flex items-center">
            <Check className="w-6 h-6 text-green-400 mr-3" />
            <div>
              <h3 className="text-green-400 font-semibold">Registration Successful!</h3>
              <p className="text-green-300 text-sm">You have successfully registered and logged into the University ERP system.</p>
            </div>
          </div>
        </div>
      </div>
    </BackgroundLayout>
  );
};

export default Dashboard;
