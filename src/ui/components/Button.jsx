import React from 'react';

const Button = ({ children, onClick, disabled = false, type = 'button', ariaLabel, className = '' }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      aria-label={ariaLabel}
      className={`bg-risdblue-500 hover:bg-risdblue-600 focus:outline-none focus:ring-2 focus:ring-risdblue-600 focus:ring-opacity-50 text-light py-2 px-4 rounded font-normal ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
