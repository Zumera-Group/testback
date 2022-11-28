import React from 'react';
import { Text, TextProps } from '@chakra-ui/react';

export const P: React.FC<TextProps> = ({
  fontWeight,
  fontSize,
  color = 'black',
  variant = 'p',
  children,
  ...props
}) => {
  return (
    <Text
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      variant={variant}
      {...props}
    >
      {children}
    </Text>
  );
};
