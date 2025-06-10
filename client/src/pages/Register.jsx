import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Check, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { getRoleInfo } from '../utils/roleUtils.js';
import { checkPasswordStrength } from '../utils/passwordUtils.js';
import { 
  degreePrograms, 
  yearsOfStudy, 
  departments, 
  lecturerDesignations, 
  coordinatorDesignations, 
  coordinatorDepartments 
} from '../data/constants.js';
import BackgroundLayout from '../components/layout/BackgroundLayout.jsx';
import Input from '../components/ui/Input.jsx';
import PasswordInput from '../components/ui/PasswordInput.jsx';
import Select from '../components/ui/Select.jsx';
import Button from '../components/ui/Button.jsx';

const Register = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [roleSpecificData, setRoleSpecificData] = useState({});
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const roleInfo = getRoleInfo(role);
  const IconComponent = roleInfo.icon;

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData({ ...formData, password });
    setPasswordStrength(checkPasswordStrength(password));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (passwordStrength < 3) {
      setError('Password is too weak. Please use a stronger password.');
      return;
    }

    const userData = {
      ...formData,
      ...roleSpecificData,
      role
    };

    const result = await register(userData);
    if (!result.success) {
      setError(result.message);
    } else {
      navigate('/dashboard');
    }
  };

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleRoleSpecificChange = (field) => (e) => {
    setRoleSpecificData({ ...roleSpecificData, [field]: e.target.value });
  };

  const renderRoleSpecificFields = () => {
    switch (role) {
      case 'student':
        return (
          <>
            <Input
              label="Student ID"
              value={roleSpecificData.studentId || ''}
              onChange={handleRoleSpecificChange('studentId')}
              placeholder="Enter your student ID"
              required
            />
            <Select
              label="Degree Program"
              value={roleSpecificData.degreeProgram || ''}
              onChange={handleRoleSpecificChange('degreeProgram')}
              options={degreePrograms}
              placeholder="Select your degree program"
              required
            />
            <Select
              label="Year of Study"
              value={roleSpecificData.yearOfStudy || ''}
              onChange={handleRoleSpecificChange('yearOfStudy')}
              options={yearsOfStudy}
              placeholder="Select year of study"
              required
            />
            <Select
              label="Faculty / Department"
              value={roleSpecificData.department || ''}
              onChange={handleRoleSpecificChange('department')}
              options={departments}
              placeholder="Select department"
              required
            />
          </>
        );
      case 'lecturer':
        return (
          <>
            <Input
              label="Staff ID"
              value={roleSpecificData.staffId || ''}
              onChange={handleRoleSpecificChange('staffId')}
              placeholder="Enter your staff ID"
              required
            />
            <Select
              label="Designation"
              value={roleSpecificData.designation || ''}
              onChange={handleRoleSpecificChange('designation')}
              options={lecturerDesignations}
              placeholder="Select designation"
              required
            />
            <Select
              label="Department"
              value={roleSpecificData.department || ''}
              onChange={handleRoleSpecificChange('department')}
              options={departments}
              placeholder="Select department"
              required
            />
          </>
        );
      case 'coordinator':
        return (
          <>
            <Input
              label="Staff ID"
              value={roleSpecificData.staffId || ''}
              onChange={handleRoleSpecificChange('staffId')}
              placeholder="Enter your staff ID"
              required
            />
            <Select
              label="Designation"
              value={roleSpecificData.designation || ''}
              onChange={handleRoleSpecificChange('designation')}
              options={coordinatorDesignations}
              placeholder="Select designation"
              required
            />
            <Select
              label="Department"
              value={roleSpecificData.department || ''}
              onChange={handleRoleSpecificChange('department')}
              options={coordinatorDepartments}
              placeholder="Select department"
              required
            />
            <Input
              label="Contact Number"
              type="tel"
              value={roleSpecificData.contactNumber || ''}
              onChange={handleRoleSpecificChange('contactNumber')}
              placeholder="Enter your contact number (optional)"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <BackgroundLayout>
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <Link
            to={`/login/${role}`}
            className="flex items-center text-white/70 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Login
          </Link>

          {/* Register Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className={`w-16 h-16 bg-gradient-to-r ${roleInfo.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">{roleInfo.registrationTitle}</h2>
              <p className="text-slate-300">Create your account</p>
            </div>

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm">
                  {error}
                </div>
              )}

              {/* Common Fields */}
              <Input
                label="Full Name"
                value={formData.fullName}
                onChange={handleInputChange('fullName')}
                placeholder="Enter your full name"
                required
              />

              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                placeholder="Enter your institutional email"
                required
              />

              <PasswordInput
                label="Password"
                value={formData.password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                showStrength={true}
                required
              />

              <div className="space-y-2">
                <PasswordInput
                  label="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange('confirmPassword')}
                  placeholder="Confirm your password"
                  required
                />
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-red-400 text-xs flex items-center">
                    <X className="w-3 h-3 mr-1" />
                    Passwords do not match
                  </p>
                )}
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <p className="text-green-400 text-xs flex items-center">
                    <Check className="w-3 h-3 mr-1" />
                    Passwords match
                  </p>
                )}
              </div>

              {/* Role-specific fields */}
              {renderRoleSpecificFields()}

              <Button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r ${roleInfo.color}`}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-slate-300">
                Already have an account?{' '}
                <Link
                  to={`/login/${role}`}
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </BackgroundLayout>
  );
};

export default Register;