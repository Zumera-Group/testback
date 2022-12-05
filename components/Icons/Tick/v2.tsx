import { Icon } from '@chakra-ui/react';
import React from 'react';

export const TickV2: React.FC<{ color?: string; size?: any }> = ({
  color,
  size,
}) => {
  return (
    <Icon
      width={size || '1px'}
      height={size || '8px'}
      viewBox="0 0 10 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 1L3.5 6.5L1 4"
        stroke={color || '#CBCBCB'}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
