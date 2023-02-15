import React from 'react';
// import { Heading, HeadingProps } from '@chakra-ui/react';

export const H: React.FC<any> = ({
  color = 'black',
  variant = 'h1',
  children,
  ...props
}) => (
  // @ts-ignore
  <div {...props}>{children}</div>
);
