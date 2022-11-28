import { Icon } from '@chakra-ui/react';
import React from 'react';

export const Location: React.FC<{ color?: string }> = ({ color }) => {
  return (
    <Icon
      width="20px"
      height="20px"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.25 6.66666C16.25 10.12 10 19.5833 10 19.5833C10 19.5833 3.75 10.12 3.75 6.66666C3.75 5.00905 4.40848 3.41934 5.58058 2.24724C6.75268 1.07514 8.3424 0.416656 10 0.416656C11.6576 0.416656 13.2473 1.07514 14.4194 2.24724C15.5915 3.41934 16.25 5.00905 16.25 6.66666V6.66666Z"
        stroke={color || '#212121'}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 9.16666C11.3807 9.16666 12.5 8.04737 12.5 6.66666C12.5 5.28594 11.3807 4.16666 10 4.16666C8.61929 4.16666 7.5 5.28594 7.5 6.66666C7.5 8.04737 8.61929 9.16666 10 9.16666Z"
        stroke={color || '#212121'}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
