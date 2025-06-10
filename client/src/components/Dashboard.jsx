import React from 'react';
import { GraduationCap, BookOpen, Users, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const Dashboard = ({ user }) => {
  const { logout } = useAuth();

  const getRoleInfo = () => {
    switch (user.role) {
      case 'student':
        return { title: 'Student Dashboard', color: 'from-blue-500 to-blue-600', icon: GraduationCap };
      case 'lecturer':
        return { title: 'Lecturer Dashboard', color: 'from-emerald-500 to-emerald-600', icon: BookOpen };
      case 'coordinator':
        return { title: 'Coordinator Dashboard', color: 'from-purple-500 to-purple-600', icon: Users };
      default:
        return { title: 'Dashboard', color: 'from-gray-500 to-gray-600', icon: GraduationCap };
    }
  };

  const roleInfo = getRoleInfo();
  const IconComponent = roleInfo.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center">
            <div className={`w-12 h-12 bg-gradient-to-r ${roleInfo.color} rounded-xl flex items-center justify-center mr-4 shadow-xl`}>
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{roleInfo.title}</h1>
              <p className="text-slate-300">Welcome back, {user.fullName}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="px-6 py-2 bg-white/10 text-white rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            Logout
          </button>
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
    </div>
  );
};

export default Dashboard;