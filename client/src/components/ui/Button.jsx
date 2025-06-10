import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  disabled = false, 
  variant = 'primary',
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r text-white hover:shadow-lg hover:scale-105',
    secondary: 'bg-white/10 text-white border border-white/20 hover:bg-white/20',
    ghost: 'text-white/70 hover:text-white'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;