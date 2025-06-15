import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ChevronRight } from 'lucide-react';
import { getRoleInfo } from '../utils/roleUtils.js';
import BackgroundLayout from '../components/layout/BackgroundLayout.jsx';

const RoleSelection = () => {
  const [hoveredRole, setHoveredRole] = useState(null);
  const navigate = useNavigate();

  const roles = ['student', 'lecturer', 'coordinator'];

  const handleRoleSelect = (role) => {
    navigate(`/login/${role}`);
  };

  return (
    <BackgroundLayout>
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mb-4 shadow-2xl">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            University
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> ERP</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Welcome to your comprehensive academic management system. Choose your role to continue.
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl w-full">
          {roles.map((role) => {
            const roleInfo = getRoleInfo(role);
            const IconComponent = roleInfo.icon;
            const isHovered = hoveredRole === role;
            
            return (
              <div
                key={role}
                className={`relative group cursor-pointer transition-all duration-500 transform ${
                  isHovered ? 'scale-105 -translate-y-2' : 'hover:scale-105 hover:-translate-y-2'
                }`}
                onMouseEnter={() => setHoveredRole(role)}
                onMouseLeave={() => setHoveredRole(null)}
                onClick={() => handleRoleSelect(role)}
              >
                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl overflow-hidden h-100">
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    isHovered ? roleInfo.hoverColor : roleInfo.color
                  } opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <div className="relative flex justify-center mb-6">
                    <div className={`w-24 h-24 bg-gradient-to-br ${roleInfo.color} rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 ${
                      isHovered ? 'ring-4 ring-white/30' : ''
                    }`}>
                      <IconComponent className="w-12 h-12 text-white" />
                    </div>
                  </div>

                  <div className="text-center relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                      {roleInfo.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed mb-6 group-hover:text-slate-200 transition-colors">
                      {roleInfo.description}
                    </p>
                    
                    <div className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${roleInfo.color} text-white rounded-full font-semibold transition-all duration-300 group-hover:shadow-lg group-hover:scale-105`}>
                      Continue as {roleInfo.title}
                      <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
                <div className={`absolute inset-0 bg-gradient-to-br ${roleInfo.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}></div>
              </div>
            );
          })}
        </div>
      </div>
    </BackgroundLayout>
  );
};

export default RoleSelection;