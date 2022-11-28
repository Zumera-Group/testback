import { Icon } from '@chakra-ui/react';
import React from 'react';

export const TransactionX: React.FC<{
  size?: string;
  color?: string;
  strokeW?: string;
  style?: any
}> = ({ size, color, strokeW, style }) => {
  return (
    <Icon
      style={style}
      width={size || '120px'}
      height={size || '120px'}
      viewBox="0 0 146 146"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.723145 144.93L59.3835 86.2695"
        stroke={color || 'black'}
        strokeWidth={strokeW || '1.81023'}
        strokeMiterlimit="10"
      />
      <path
        d="M0.723145 0.417969L59.3835 59.0783"
        stroke={color || 'black'}
        strokeWidth={strokeW || '1.81023'}
        strokeMiterlimit="10"
      />
      <path
        d="M144.852 0.417969L86.2007 59.0783"
        stroke={color || 'black'}
        strokeWidth={strokeW || '1.81023'}
        strokeMiterlimit="10"
      />
      <path
        d="M144.852 144.93L86.2007 86.2695"
        stroke={color || 'black'}
        strokeWidth={strokeW || '1.81023'}
        strokeMiterlimit="10"
      />
    </Icon>
  );
};
