// src/components/common/NeonInput.jsx
import React from 'react';

const NeonInput = ({ label, id, type = 'text', value, onChange, placeholder, required = false, className = '' }) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium mb-2 text-gray-300">
          {label} {required && <span className="text-safe-red">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full p-3 bg-black-primary border border-gray-700 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue rounded-md shadow-inner text-white placeholder-gray-500 transition duration-200 ${className}`}
      />
    </div>
  );
};

export default NeonInput;
