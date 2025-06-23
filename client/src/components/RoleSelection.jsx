import React, { useState } from "react";
import { GraduationCap, BookOpen, Users, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RoleSelection = ({ onRoleSelect }) => {
  const navigate = useNavigate();

  const [hoveredRole, setHoveredRole] = useState(null);

  const roles = [
    {
      id: "student",
      title: "Student",
      description: "Access courses, grades, assignments and academic resources",
      icon: GraduationCap,
      color: "from-blue-500 to-blue-600",
      hoverColor: "from-blue-600 to-blue-700",
    },
    {
      id: "lecturer",
      title: "Lecturer",
      description: "Manage courses, students, grades and academic content",
      icon: BookOpen,
      color: "from-emerald-500 to-emerald-600",
      hoverColor: "from-emerald-600 to-emerald-700",
    },
    {
      id: "coordinator",
      title: "Coordinator",
      description: "Oversee programs, schedules and administrative tasks",
      icon: Users,
      color: "from-purple-500 to-purple-600",
      hoverColor: "from-purple-600 to-purple-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mb-4 shadow-2xl">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            University
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {" "}
              ERP
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Welcome to your comprehensive academic management system. Choose
            your role to continue.
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl w-full">
          {roles.map((role) => {
            const IconComponent = role.icon;
            const isHovered = hoveredRole === role.id;

            return (
              <div
                key={role.id}
                className={`relative group cursor-pointer transition-all duration-500 transform ${
                  isHovered
                    ? "scale-105 -translate-y-2"
                    : "hover:scale-105 hover:-translate-y-2"
                }`}
                onMouseEnter={() => setHoveredRole(role.id)}
                onMouseLeave={() => setHoveredRole(null)}
                // onClick={() => onRoleSelect('login', role.id)}
                onClick={() => navigate("/login", { state: { role: role.id } })}
              >
                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl overflow-hidden h-100">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${
                      isHovered ? role.hoverColor : role.color
                    } opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>

                  <div className="relative flex justify-center mb-6">
                    <div
                      className={`w-24 h-24 bg-gradient-to-br ${
                        role.color
                      } rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 ${
                        isHovered ? "ring-4 ring-white/30" : ""
                      }`}
                    >
                      <IconComponent className="w-12 h-12 text-white" />
                    </div>
                  </div>

                  <div className="text-center relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                      {role.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed mb-6 group-hover:text-slate-200 transition-colors">
                      {role.description}
                    </p>

                    <div
                      className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${role.color} text-white rounded-full font-semibold transition-all duration-300 group-hover:shadow-lg group-hover:scale-105`}
                    >
                      Continue as {role.title}
                      <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${role.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
