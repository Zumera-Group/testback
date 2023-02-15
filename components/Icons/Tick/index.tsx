import React from 'react';

export const Tick: React.FC<{ color?: string; size?: any }> = ({
  color,
  size,
}) => {
  return (
    <svg
      minWidth={4}
      width={size}
      height="auto"
      viewBox="0 0 10 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 1L3.5 6.5L1 4"
        stroke={color || '#CBCBCB'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
