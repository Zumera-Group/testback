import React from 'react';
import { Heading, HeadingProps } from '@chakra-ui/react';

export const H: React.FC<HeadingProps> = ({
  color = 'black',
  variant = 'h1',
  children,
  ...props
}) => (
  <Heading {...props} color={color} variant={variant}>
    {children}
  </Heading>
);
