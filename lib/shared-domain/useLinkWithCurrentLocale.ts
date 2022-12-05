import { useRouter } from 'next/router';

const getLocale = () => {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    return router.locale.trim();
  } catch (e) {
    return 'en';
  }
};

export const useLinkWithCurrentLocale = () => {
  return (path: string): string => {
    if (
      path?.startsWith('/de/') ||
      path?.startsWith('/en/') ||
      path?.startsWith('http')
    )
      return path;
    else return '/' + getLocale() + '/' + path;
  };
};
