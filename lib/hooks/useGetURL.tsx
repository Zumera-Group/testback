import { useRouter } from 'next/router';

export const useGetURL = () => {
  const { locale } = useRouter();
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const path = router.asPath;
  const url = `${baseUrl}${locale}${path}`;
  return url;
};
