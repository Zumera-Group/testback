import { ChatButton } from 'components/ChatButton';
import React from 'react';
// import { useRouter } from 'next/router';

export const PageTransition: React.FC<{ slug: string }> = ({ slug, children }) => {
  // const router = useRouter();
  // const IS_IN_QUESTIONNAIRE =
  //   router.pathname.startsWith('/questionnaires') ||
  //   router.pathname.startsWith('/fragenkatalog');

  return (
    <>
      {children}
      <ChatButton />
    </>
  );
};
