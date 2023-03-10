import { ChatButton } from 'components/ChatButton';
import React from 'react';

export const PageTransition: React.FC<{ slug: string }> = ({
  slug,
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
