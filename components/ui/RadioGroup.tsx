import React from 'react';

interface RadioOption {
  value: string;
  title: string;
  description: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
  className?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options, value, onChange, name, className }) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${className}`}>
      {options.map((option) => (
        <label
          key={option.value}
          className={`relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm transition-all focus:outline-none 
            ${value === option.value ? 'border-indigo-600 ring-2 ring-indigo-600' : 'border-slate-300 hover:border-slate-400'}
          `}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="sr-only"
            aria-labelledby={`${name}-${option.value}-label`}
            aria-describedby={`${name}-${option.value}-description`}
          />
          <div className="flex flex-1">
            <div className="flex flex-col">
              <span id={`${name}-${option.value}-label`} className="block text-sm font-semibold text-slate-900">
                {option.title}
              </span>
              <span id={`${name}-${option.value}-description`} className="mt-1 flex items-center text-sm text-slate-500">
                {option.description}
              </span>
            </div>
          </div>
           <svg className={`h-5 w-5 ml-3 transition-opacity ${value === option.value ? 'opacity-100 text-indigo-600' : 'opacity-0'}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
