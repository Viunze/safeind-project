// src/components/common/Button.jsx
import React from 'react';

const baseStyles = "font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-[1.03]";

const variants = {
  primary: "bg-neon-blue text-black-primary shadow-neon-sm hover:shadow-neon-lg",
  secondary: "bg-transparent border border-neon-purple text-neon-purple hover:bg-neon-purple/20",
  tertiary: "bg-gray-800 text-gray-50 hover:bg-gray-700",
};

const Button = ({ children, onClick, variant = 'primary', type = 'button', disabled = false, className = '' }) => {
  const style = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${style} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
