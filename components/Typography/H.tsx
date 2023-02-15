import React from 'react';

export const H: React.FC<any> = ({
  color = 'black',
  variant = 'h1',
  children,
  ...props
}) => (
  // @ts-ignore
  <div {...props}>{children}</div>
);
