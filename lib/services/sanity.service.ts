import { Locale } from 'lib/locale';
import { getClient } from '../sanity.server';

export type SanityLocale = 'de' | 'fr' | 'en_GB';

const langMap: Record<Locale, SanityLocale> = {
  de: 'de',
  fr: 'fr',
  en: 'en_GB',
};

export class SanityService {
  async fetch(query: string, preview?: boolean) {
    try {
      return await getClient(preview).fetch(query);
    } catch (error) {
      console.log(error);
    }
  }

  getSanityLocale = (locale: Locale): SanityLocale => {
    if (langMap[locale]) return langMap[locale];

    return 'en_GB';
  };

  static getLocaleFromSanityLocale = (locale: string) => {
    if (locale === 'fr') return 'fr';
    if (locale === 'de') return 'de';
    return 'en';
  };
}
