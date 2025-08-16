import React from 'react';

interface SegmentedControlOption {
  label: string;
  value: string;
}

interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
  name?: string;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({ options, value, onChange, name }) => {
  return (
    <div className="flex w-full rounded-md bg-slate-100 p-1" role="group">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`w-full rounded text-center text-sm font-medium transition-all px-3 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100
            ${value === option.value ? 'bg-white text-slate-900 shadow-sm' : 'bg-transparent text-slate-600 hover:bg-slate-200/60'}
          `}
          aria-pressed={value === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default SegmentedControl;
