import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { enGB, de, fr } from 'date-fns/locale';

export const useFormatDateLong = (value: Date) => {
  const router = useRouter();
  const routerLocale = router?.locale;
  let locale = enGB;

  if (routerLocale === 'de') {
    locale = de;
  }
  if (routerLocale === 'fr') {
    locale = fr;
  }

  try {
    let localeFormat;
    if (locale === de) {
      localeFormat = 'de-DE'
    } else if (locale === fr) {
      localeFormat = 'fr-FR'
    } else {
      localeFormat = 'en-GB';
    }
    const val = new Date(value);

    const date = new Date(
      val.getFullYear(),
      val.getMonth(),
      val.getDate(),
    ).toLocaleDateString(localeFormat, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const formattedDate =
      locale === de ? date.replace('.', '') : date.replace(',', '');

    return formattedDate;
  } catch (e) {
    return JSON.stringify(value);
  }
};

export default useFormatDateLong;
