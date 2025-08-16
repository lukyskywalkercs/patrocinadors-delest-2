
import React from 'react';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const Select: React.FC<SelectProps> = ({ className, children, ...props }) => {
  const baseClasses = "block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm";
  return (
    <select className={`${baseClasses} ${className}`} {...props}>
      {children}
    </select>
  );
};

export default Select;
