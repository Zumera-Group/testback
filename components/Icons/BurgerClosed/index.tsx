import { Icon } from '@chakra-ui/react';
import React from 'react';

export const BurgerClosed: React.FC<{ color?: string }> = ({ color }) => {
  return (
    <Icon
      width="27px"
      height="20px"
      viewBox="0 0 27 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 2L25 2"
        stroke={color || '#F7F7E6'}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M2 10L25 10"
        stroke={color || '#F7F7E6'}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M2 18L25 18"
        stroke={color || '#F7F7E6'}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </Icon>
  );
};
