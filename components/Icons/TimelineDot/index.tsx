import React from 'react';

export const TimelineDot: React.FC<{ color?: string }> = ({ color }) => {
  return (
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" fill={color || '#0C4E40'} />
      <path
        d="M14 10C14 12.2091 12.2091 14 10 14C7.79086 14 6 12.2091 6 10C6 7.79086 7.79086 6 10 6C12.2091 6 14 7.79086 14 10Z"
        fill="white"
      />
    </svg>
  );
};
