import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { enGB, de } from 'date-fns/locale';

export const useFormatDate = () => {
  const router = useRouter();
  const routerLocale = router?.locale;
  let locale = enGB;

  if (routerLocale === 'de') {
    locale = de;
  }

  return (value: Date) => {
    try {
      return format(
        new Date(value.valueOf() + value.getTimezoneOffset() * 60 * 1000),
        'P',
        { locale },
      );
    } catch (e) {
      return JSON.stringify(value);
    }
  };
};
