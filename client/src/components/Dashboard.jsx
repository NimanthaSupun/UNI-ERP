import React from "react";
import {
  GraduationCap,
  BookOpen,
  Users,
  Check,
  Calendar,
  Building,
  UserSearch,
  TrendingUp,
  Clock,
  MapPin,
  BarChart3,
  Brain,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Dashboard = ({ user, onNavigate }) => {
  const { logout } = useAuth();

  const getRoleInfo = () => {
    switch (user.role) {
      case "student":
        return {
          title: "Student Dashboard",
          color: "from-blue-500 to-blue-600",
          icon: GraduationCap,
        };
      case "lecturer":
        return {
          title: "Lecturer Dashboard",
          color: "from-emerald-500 to-emerald-600",
          icon: BookOpen,
        };
      case "coordinator":
        return {
          title: "Coordinator Dashboard",
          color: "from-purple-500 to-purple-600",
          icon: Users,
        };
      default:
        return {
          title: "Dashboard",
          color: "from-gray-500 to-gray-600",
          icon: GraduationCap,
        };
    }
  };

  const handleLogout = () => {
    logout();
    if (onNavigate) {
      onNavigate("home", null); // Reset to role selection and clear selectedRole
    }
  };

  const roleInfo = getRoleInfo();
  const IconComponent = roleInfo.icon;

  // Get role-specific blocks
  const getRoleBlocks = () => {
    if (user.role === "coordinator") {
      return [
        {
          id: 1,
          title: "Hall Allocation and Timetable Scheduling",
          description: "Manage lecture halls and room assignments",
          icon: Building,
          color: "from-orange-500 to-red-500",
          stats: "12 Halls Active",
        },
      ];
    } else {
      // For students and lecturers
      return [
        {
          id: 1,
          title: "Research Mentoring Panel",
          description: "Connect with mentors and research opportunities",
          icon: UserSearch,
          color: "from-cyan-500 to-blue-500",
          stats: user.role === "student" ? "3 Mentors" : "8 Students",
        },
        {
          id: 2,
          title: "Student Behavior Analysis",
          description: "Track academic performance and engagement",
          icon: BarChart3,
          color: "from-violet-500 to-purple-500",
          stats: user.role === "student" ? "Performance: 85%" : "24 Students",
        },
      ];
    }
  };

  const roleBlocks = getRoleBlocks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-400 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 p-6 lg:p-8">
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 lg:mb-12">
          <div className="flex items-center mb-4 lg:mb-0">
            <div
              className={`w-16 h-16 bg-gradient-to-r ${roleInfo.color} rounded-2xl flex items-center justify-center mr-4 shadow-2xl transform rotate-12`}
            >
              <IconComponent className="w-8 h-8 text-white transform -rotate-12" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-1">
                {roleInfo.title}
              </h1>
              <p className="text-slate-300 text-lg">
                Welcome back, {user.fullName}
              </p>
              <div className="flex items-center mt-2">
                <Clock className="w-4 h-4 text-slate-400 mr-2" />
                <span className="text-slate-400 text-sm">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-8 py-3 bg-white/10 text-white rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:scale-105"
          >
            Logout
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Profile Information Card - Enhanced */}
          <div className="xl:col-span-2">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Profile Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1 p-4 bg-white/5 rounded-xl border border-white/10">
                  <label className="block text-slate-400 mb-1 text-sm font-medium">
                    Full Name
                  </label>
                  <p className="text-white font-semibold text-lg">
                    {user.fullName}
                  </p>
                </div>

                <div className="space-y-1 p-4 bg-white/5 rounded-xl border border-white/10">
                  <label className="block text-slate-400 mb-1 text-sm font-medium">
                    Email
                  </label>
                  <p className="text-white font-semibold">{user.email}</p>
                </div>

                <div className="space-y-1 p-4 bg-white/5 rounded-xl border border-white/10">
                  <label className="block text-slate-400 mb-1 text-sm font-medium">
                    Role
                  </label>
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 bg-gradient-to-r ${roleInfo.color} rounded-full mr-2`}
                    ></div>
                    <p className="text-white font-semibold capitalize">
                      {user.role}
                    </p>
                  </div>
                </div>

                {user.studentId && (
                  <div className="space-y-1 p-4 bg-white/5 rounded-xl border border-white/10">
                    <label className="block text-slate-400 mb-1 text-sm font-medium">
                      Student ID
                    </label>
                    <p className="text-white font-semibold">{user.studentId}</p>
                  </div>
                )}

                {user.staffId && (
                  <div className="space-y-1 p-4 bg-white/5 rounded-xl border border-white/10">
                    <label className="block text-slate-400 mb-1 text-sm font-medium">
                      Staff ID
                    </label>
                    <p className="text-white font-semibold">{user.staffId}</p>
                  </div>
                )}

                {user.degreeProgram && (
                  <div className="space-y-1 p-4 bg-white/5 rounded-xl border border-white/10">
                    <label className="block text-slate-400 mb-1 text-sm font-medium">
                      Degree Program
                    </label>
                    <p className="text-white font-semibold">
                      {user.degreeProgram}
                    </p>
                  </div>
                )}

                {user.designation && (
                  <div className="space-y-1 p-4 bg-white/5 rounded-xl border border-white/10">
                    <label className="block text-slate-400 mb-1 text-sm font-medium">
                      Designation
                    </label>
                    <p className="text-white font-semibold">
                      {user.designation}
                    </p>
                  </div>
                )}

                {user.department && (
                  <div className="space-y-1 p-4 bg-white/5 rounded-xl border border-white/10">
                    <label className="block text-slate-400 mb-1 text-sm font-medium">
                      Department
                    </label>
                    <p className="text-white font-semibold">
                      {user.department}
                    </p>
                  </div>
                )}

                {user.yearOfStudy && (
                  <div className="space-y-1 p-4 bg-white/5 rounded-xl border border-white/10">
                    <label className="block text-slate-400 mb-1 text-sm font-medium">
                      Year of Study
                    </label>
                    <p className="text-white font-semibold">
                      {user.yearOfStudy}
                    </p>
                  </div>
                )}

                {user.contactNumber && (
                  <div className="space-y-1 p-4 bg-white/5 rounded-xl border border-white/10">
                    <label className="block text-slate-400 mb-1 text-sm font-medium">
                      Contact Number
                    </label>
                    <p className="text-white font-semibold">
                      {user.contactNumber}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Success Message - Enhanced */}
          <div className="xl:col-span-1">
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/50 rounded-3xl p-8 backdrop-blur-xl shadow-2xl h-fit">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-green-400 font-bold text-lg">
                    Registration Successful!
                  </h3>
                </div>
              </div>
              <p className="text-green-300 text-sm leading-relaxed">
                You have successfully registered and logged into the University
                ERP system. Your profile is now active and ready to use.
              </p>
              <div className="mt-4 p-3 bg-green-500/10 rounded-xl border border-green-500/30">
                <p className="text-green-300 text-xs">
                  System Status: <span className="font-semibold">Online</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Role-Specific Action Blocks */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Brain className="w-6 h-6 mr-3" />
            Quick Actions
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roleBlocks.map((block) => {
              const BlockIcon = block.icon;
              let navTarget = null;
              if (block.title === "Research Mentoring Panel")
                navTarget = "mentoring";
              return (
                <div
                  key={block.id}
                  className="group relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden"
                  onClick={() => {
                    console.log("Card clicked!");
                    navTarget && onNavigate(navTarget);
                  }}
                >
                  {/* Background gradient effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${block.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
                  ></div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${block.color} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}
                      >
                        <BlockIcon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-white text-xs font-medium">
                          {block.stats}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                      {block.title}
                    </h4>

                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                      {block.description}
                    </p>

                    <div className="flex items-center text-slate-400 group-hover:text-white transition-colors duration-300">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      <span className="text-xs font-medium">Access Now</span>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-all duration-500"></div>
                  <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white/5 rounded-full blur-lg group-hover:bg-white/10 transition-all duration-500"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
