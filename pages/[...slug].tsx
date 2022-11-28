import React from 'react';
import { useRouter } from 'next/router';
import LoadingIndicator from 'lib/animations/LoadingIndicator';

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ locale }) {
  return {
    redirect: {
      destination: `/${locale}/404`,
    },
  };
}

const CatchRoutesTo404Page = () => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <LoadingIndicator />;
      </>
    );
  }

  return <LoadingIndicator />;
};

export default CatchRoutesTo404Page;
