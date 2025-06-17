import React, { useState } from "react";
import {
  GraduationCap,
  BookOpen,
  Users,
  Eye,
  EyeOff,
  ArrowLeft,
  Check,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const RegisterForm = ({ role, onNavigate }) => {
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [roleSpecificData, setRoleSpecificData] = useState({});

  // If role is not set, redirect to role selection
  if (!role) {
    onNavigate("home");
    return null;
  }

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handlePasswordChange = (password) => {
    setFormData({ ...formData, password });
    setPasswordStrength(checkPasswordStrength(password));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (passwordStrength < 3) {
      setError("Password is too weak. Please use a stronger password.");
      return;
    }
    const userData = {
      ...formData,
      ...roleSpecificData,
      role,
    };
    if (result.success) {
      onNavigate("dashboard");
    } else {
      setError(result.message);
    }
    const result = await register(userData);
    if (!result.success) setError(result.message);
  };

  const getRoleInfo = () => {
    switch (role) {
      case "student":
        return {
          title: "Student Registration",
          color: "from-blue-500 to-blue-600",
          icon: GraduationCap,
        };
      case "lecturer":
        return {
          title: "Lecturer Registration",
          color: "from-emerald-500 to-emerald-600",
          icon: BookOpen,
        };
      case "coordinator":
        return {
          title: "Coordinator Registration",
          color: "from-purple-500 to-purple-600",
          icon: Users,
        };
      default:
        return {
          title: "Registration",
          color: "from-gray-500 to-gray-600",
          icon: GraduationCap,
        };
    }
  };

  const roleInfo = getRoleInfo();
  const IconComponent = roleInfo.icon;

  const renderRoleSpecificFields = () => {
    switch (role) {
      case "student":
        return (
          <>
            <div>
              <label className="block text-white mb-2 font-medium">
                Student ID
              </label>
              <input
                type="text"
                value={roleSpecificData.studentId || ""}
                onChange={(e) =>
                  setRoleSpecificData({
                    ...roleSpecificData,
                    studentId: e.target.value,
                  })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your student ID"
                required
              />
            </div>
            <div>
              <label className="block text-white mb-2 font-medium">
                Degree Program
              </label>
              <select
                value={roleSpecificData.degreeProgram || ""}
                onChange={(e) =>
                  setRoleSpecificData({
                    ...roleSpecificData,
                    degreeProgram: e.target.value,
                  })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select your degree program</option>
                <option value="BSc IT">BSc IT</option>
                <option value="BSc Management">BSc Management</option>
                <option value="BSc Engineering">BSc Engineering</option>
                <option value="BA Business">BA Business</option>
              </select>
            </div>
            <div>
              <label className="block text-white mb-2 font-medium">
                Year of Study
              </label>
              <select
                value={roleSpecificData.yearOfStudy || ""}
                onChange={(e) =>
                  setRoleSpecificData({
                    ...roleSpecificData,
                    yearOfStudy: e.target.value,
                  })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select year of study</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>
            <div>
              <label className="block text-white mb-2 font-medium">
                Faculty / Department
              </label>
              <select
                value={roleSpecificData.department || ""}
                onChange={(e) =>
                  setRoleSpecificData({
                    ...roleSpecificData,
                    department: e.target.value,
                  })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Management">Management</option>
                <option value="Engineering">Engineering</option>
                <option value="Business">Business</option>
              </select>
            </div>
          </>
        );
      case "lecturer":
        return (
          <>
            <div>
              <label className="block text-white mb-2 font-medium">
                Staff ID
              </label>
              <input
                type="text"
                value={roleSpecificData.staffId || ""}
                onChange={(e) =>
                  setRoleSpecificData({
                    ...roleSpecificData,
                    staffId: e.target.value,
                  })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your staff ID"
                required
              />
            </div>
            <div>
              <label className="block text-white mb-2 font-medium">
                Designation
              </label>
              <select
                value={roleSpecificData.designation || ""}
                onChange={(e) =>
                  setRoleSpecificData({
                    ...roleSpecificData,
                    designation: e.target.value,
                  })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select designation</option>
                <option value="Lecturer">Lecturer</option>
                <option value="Senior Lecturer">Senior Lecturer</option>
                <option value="Professor">Professor</option>
                <option value="Assistant Professor">Assistant Professor</option>
              </select>
            </div>
            <div>
              <label className="block text-white mb-2 font-medium">
                Department
              </label>
              <select
                value={roleSpecificData.department || ""}
                onChange={(e) =>
                  setRoleSpecificData({
                    ...roleSpecificData,
                    department: e.target.value,
                  })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Management">Management</option>
                <option value="Engineering">Engineering</option>
                <option value="Business">Business</option>
              </select>
            </div>
          </>
        );
      case "coordinator":
        return (
          <>
            <div>
              <label className="block text-white mb-2 font-medium">
                Staff ID
              </label>
              <input
                type="text"
                value={roleSpecificData.staffId || ""}
                onChange={(e) =>
                  setRoleSpecificData({
                    ...roleSpecificData,
                    staffId: e.target.value,
                  })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your staff ID"
                required
              />
            </div>
            <div>
              <label className="block text-white mb-2 font-medium">
                Designation
              </label>
              <select
                value={roleSpecificData.designation || ""}
                onChange={(e) =>
                  setRoleSpecificData({
                    ...roleSpecificData,
                    designation: e.target.value,
                  })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select designation</option>
                <option value="Timetable Officer">Timetable Officer</option>
                <option value="Hall Manager">Hall Manager</option>
                <option value="Academic Coordinator">
                  Academic Coordinator
                </option>
                <option value="Program Coordinator">Program Coordinator</option>
              </select>
            </div>
            <div>
              <label className="block text-white mb-2 font-medium">
                Department
              </label>
              <select
                value={roleSpecificData.department || ""}
                onChange={(e) =>
                  setRoleSpecificData({
                    ...roleSpecificData,
                    department: e.target.value,
                  })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select department</option>
                <option value="Administration">Administration</option>
                <option value="Academic Affairs">Academic Affairs</option>
                <option value="Student Services">Student Services</option>
                <option value="IT Services">IT Services</option>
              </select>
            </div>
            <div>
              <label className="block text-white mb-2 font-medium">
                Contact Number (Optional)
              </label>
              <input
                type="tel"
                value={roleSpecificData.contactNumber || ""}
                onChange={(e) =>
                  setRoleSpecificData({
                    ...roleSpecificData,
                    contactNumber: e.target.value,
                  })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your contact number"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-md">
          <button
            onClick={() => onNavigate("login", role)}
            className="flex items-center text-white/70 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Login
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
              <p className="text-slate-300">Create your account</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-white mb-2 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>
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
                    onChange={(e) => handlePasswordChange(e.target.value)}
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
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 flex-1 rounded ${
                            i < passwordStrength
                              ? passwordStrength <= 2
                                ? "bg-red-500"
                                : passwordStrength <= 3
                                ? "bg-yellow-500"
                                : "bg-green-500"
                              : "bg-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Password strength:{" "}
                      {passwordStrength <= 2
                        ? "Weak"
                        : passwordStrength <= 3
                        ? "Medium"
                        : "Strong"}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-white mb-2 font-medium">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {formData.confirmPassword &&
                  formData.password !== formData.confirmPassword && (
                    <p className="text-red-400 text-xs mt-1 flex items-center">
                      <X className="w-3 h-3 mr-1" />
                      Passwords do not match
                    </p>
                  )}
                {formData.confirmPassword &&
                  formData.password === formData.confirmPassword && (
                    <p className="text-green-400 text-xs mt-1 flex items-center">
                      <Check className="w-3 h-3 mr-1" />
                      Passwords match
                    </p>
                  )}
              </div>
              {renderRoleSpecificFields()}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 bg-gradient-to-r ${roleInfo.color} text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
            <div className="text-center mt-6">
              <p className="text-slate-300">
                Already have an account?{" "}
                <button
                  onClick={() => onNavigate("login", role)}
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
