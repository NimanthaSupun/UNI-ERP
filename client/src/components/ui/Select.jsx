import React from 'react';

const Select = ({ 
  label, 
  value, 
  onChange, 
  options = [], 
  placeholder = 'Select an option',
  required = false,
  error,
  className = '',
  ...props 
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-white mb-2 font-medium">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
        {...props}
      >
        <option value="" className="bg-slate-800">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option} className="bg-slate-800">
            {option}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
    </div>
  );
};

export default Select;