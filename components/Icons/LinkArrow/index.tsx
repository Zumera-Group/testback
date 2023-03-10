import React from 'react';

export const LinkArrow: React.FC<{ color?: string; size?: string }> = ({
  color,
  size,
}) => {
  return (
    <svg
      width={size || '12px'}
      height={size || '12px'}
      viewBox="0 0 12 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.9703 0.992188L0.818604 10.1439"
        stroke={color || 'black'}
        strokeWidth="1.35767"
        strokeMiterlimit="10"
      />
      <path
        d="M10.3238 6.624V0.992188H4.33997"
        stroke={color || 'black'}
        strokeWidth="1.35767"
      />
    </svg>
  );
};
