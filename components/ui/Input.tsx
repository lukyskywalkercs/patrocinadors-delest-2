import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  const baseClasses = "block w-full rounded-lg border-2 border-transparent bg-slate-100 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-0";
  return <input className={`${baseClasses} ${className}`} {...props} />;
};

export default Input;