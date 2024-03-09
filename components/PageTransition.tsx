import { ChatButton } from 'components/ChatButton';
import React from 'react';

export const PageTransition = ({
  children,
}) => {
  return (
    <>
      {children}
      <ChatButton />
    </>
  );
};

export default PageTransition;
