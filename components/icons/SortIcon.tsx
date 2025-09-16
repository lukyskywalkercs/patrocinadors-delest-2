import React from 'react';

interface SortIconProps {
  direction?: 'asc' | 'desc';
}

export const SortIcon: React.FC<SortIconProps> = ({ direction }) => {
  return (
    <div className="flex flex-col items-center justify-center w-4 h-4 text-slate-400 group-hover:text-slate-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-2 w-2 -mb-0.5 transition-colors ${direction === 'asc' ? 'text-slate-800' : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-2 w-2 -mt-0.5 transition-colors ${direction === 'desc' ? 'text-slate-800' : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
};