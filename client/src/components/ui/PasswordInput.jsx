import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { checkPasswordStrength, getPasswordStrengthText, getPasswordStrengthColor } from '../../utils/passwordUtils.js';

const PasswordInput = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  showStrength = false,
  error,
  className = '',
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const strength = showStrength ? checkPasswordStrength(value) : 0;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-white mb-2 font-medium">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 ${className}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
      
      {showStrength && value && (
        <div className="mt-2">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded ${
                  i < strength ? getPasswordStrengthColor(strength) : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Password strength: {getPasswordStrengthText(strength)}
          </p>
        </div>
      )}
      
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
    </div>
  );
};

export default PasswordInput;