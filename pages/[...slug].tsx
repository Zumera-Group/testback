import React from 'react';
import { useRouter } from 'next/router';

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
    return null;
  }

  return null;
};

export default CatchRoutesTo404Page;
