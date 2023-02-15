import React from 'react';

export const P: React.FC<any> = ({
  fontWeight,
  fontSize,
  color = 'black',
  variant = 'p',
  children,
  ...props
}) => {
  return <div>{children}</div>;
};
