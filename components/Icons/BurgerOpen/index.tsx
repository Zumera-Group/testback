import React from 'react';

export const BurgerOpen: React.FC<{ color?: string; size?: string }> = ({
  color,
  size,
}) => {
  return (
    <svg
      width={size || '43px'}
      height={size || '43px'}
      viewBox="0 0 43 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.6064 31.8204L19.2399 23.209"
        stroke={color || '#F7F7E6'}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M10.6055 10.6055L19.2389 19.2168"
        stroke={color || '#F7F7E6'}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M31.8167 10.6055L23.1846 19.2168"
        stroke={color || '#F7F7E6'}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M31.8157 31.8184L23.1836 23.207"
        stroke={color || '#F7F7E6'}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
    </svg>
  );
};
