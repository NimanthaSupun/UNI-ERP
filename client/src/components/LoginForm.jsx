import React, { useState } from "react";
import {
  GraduationCap,
  BookOpen,
  Users,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const LoginForm = ({ role, onNavigate }) => {
  const { login, loading } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // If role is not set, redirect to role selection
  if (!role) {
    onNavigate("home");
    return null;
  }

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setError('');
  //     const result = await login(formData.email, formData.password, role);
  //     if (!result.success) setError(result.message);
  //   };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await login(formData.email, formData.password, role);
    if (result.success) {
      onNavigate("dashboard");
    } else {
      setError(result.message);
    }
  };

  const getRoleInfo = () => {
    switch (role) {
      case "student":
        return {
          title: "Student Portal",
          color: "from-blue-500 to-blue-600",
          icon: GraduationCap,
        };
      case "lecturer":
        return {
          title: "Lecturer Portal",
          color: "from-emerald-500 to-emerald-600",
          icon: BookOpen,
        };
      case "coordinator":
        return {
          title: "Coordinator Portal",
          color: "from-purple-500 to-purple-600",
          icon: Users,
        };
      default:
        return {
          title: "Login",
          color: "from-gray-500 to-gray-600",
          icon: GraduationCap,
        };
    }
  };

  const roleInfo = getRoleInfo();
  const IconComponent = roleInfo.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-md">
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center text-white/70 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Role Selection
          </button>
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="text-center mb-8">
              <div
                className={`w-16 h-16 bg-gradient-to-r ${roleInfo.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl`}
              >
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {roleInfo.title}
              </h2>
              <p className="text-slate-300">Sign in to your account</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-white mb-2 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your institutional email"
                  required
                />
              </div>
              <div>
                <label className="block text-white mb-2 font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 bg-gradient-to-r ${roleInfo.color} text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
            <div className="text-center mt-6">
              <p className="text-slate-300">
                Don't have an account?{" "}
                <button
                  onClick={() => onNavigate("register", role)}
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  Register here
                </button>
              </p>
            </div>
            <div className="mt-6 p-4 bg-white/5 rounded-xl">
              <p className="text-slate-300 text-sm mb-2">Demo credentials:</p>
              {role === "student" && (
                <p className="text-slate-400 text-xs">
                  Email: john.student@university.edu
                  <br />
                  Password: password123
                </p>
              )}
              {role === "lecturer" && (
                <p className="text-slate-400 text-xs">
                  Email: jane.lecturer@university.edu
                  <br />
                  Password: password123
                </p>
              )}
              {role === "coordinator" && (
                <p className="text-slate-400 text-xs">
                  Email: admin.coordinator@university.edu
                  <br />
                  Password: password123
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
