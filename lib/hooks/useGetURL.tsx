import { useRouter } from 'next/router';

export const useGetURL = () => {
  const { locale } = useRouter();
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const localeType = locale === 'en' ? 'en' : 'de';
  const path = router.asPath;
  const url = `${baseUrl}${localeType}${path}`;
  return url;
};
