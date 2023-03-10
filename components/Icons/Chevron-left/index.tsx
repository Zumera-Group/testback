import React from 'react';

export const ChevronLeft: React.FC<{ color?: string; size?: string }> = ({
  color,
  size,
}) => {
  return (
    <svg
      width={size || '8px'}
      height={size || '14px'}
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 13L1 7L7 1"
        stroke={color || '#6B7280'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
