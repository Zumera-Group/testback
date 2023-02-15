import React from 'react';

export const Tooltip: React.FC<{ color?: string; className?: string }> = ({
  color,
  className,
}) => {
  return (
    <svg
      width="16px"
      height="16px"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || ''}
    >
      <g
        stroke={color || '#ffffff'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        clipPath="url(#a)"
      >
        <path d="M7.999 14.667a6.667 6.667 0 1 0 0-13.334 6.667 6.667 0 0 0 0 13.334Z" />
        <path d="M6.059 6a2 2 0 0 1 3.886.667c0 1.333-2 2-2 2M8 11.333h.007" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill={color || '#ffffff'} d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
