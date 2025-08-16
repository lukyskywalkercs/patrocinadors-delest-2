import React from 'react';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea: React.FC<TextareaProps> = ({ className, ...props }) => {
  const baseClasses = "block w-full rounded-lg border-2 border-transparent bg-slate-100 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-0";
  return <textarea className={`${baseClasses} ${className}`} {...props} />;
};

export default Textarea;