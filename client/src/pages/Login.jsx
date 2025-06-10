import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { getRoleInfo } from '../utils/roleUtils.js';
import BackgroundLayout from '../components/layout/BackgroundLayout.jsx';
import Input from '../components/ui/Input.jsx';
import PasswordInput from '../components/ui/PasswordInput.jsx';
import Button from '../components/ui/Button.jsx';

const Login = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const roleInfo = getRoleInfo(role);
  const IconComponent = roleInfo.icon;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(formData.email, formData.password);
    if (!result.success) {
      setError(result.message);
    } else {
      navigate('/dashboard');
    }
  };

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <BackgroundLayout>
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <Link
            to="/"
            className="flex items-center text-white/70 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Role Selection
          </Link>

          {/* Login Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className={`w-16 h-16 bg-gradient-to-r ${roleInfo.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">{roleInfo.portalTitle}</h2>
              <p className="text-slate-300">Sign in to your account</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm">
                  {error}
                </div>
              )}

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
                onChange={handleInputChange('password')}
                placeholder="Enter your password"
                required
              />

              <Button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r ${roleInfo.color}`}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Register Link */}
            <div className="text-center mt-6">
              <p className="text-slate-300">
                Don't have an account?{' '}
                <Link
                  to={`/register/${role}`}
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  Register here
                </Link>
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-white/5 rounded-xl">
              <p className="text-slate-300 text-sm mb-2">Demo credentials:</p>
              <p className="text-slate-400 text-xs">
                Email: john.student@university.edu<br />
                Password: password123
              </p>
            </div>
          </div>
        </div>
      </div>
    </BackgroundLayout>
  );
};

export default Login;