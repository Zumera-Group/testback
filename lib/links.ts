import { useRouter } from 'next/router';
import { Sector, Service } from './shared-domain/page/domain/index';
import { NewsArticle } from './shared-domain/newsArticle/domain/index';
import { Transaction } from './shared-domain/transactions/domain';
import { Employee } from './shared-domain/employees/domain/index';
import { Questionnaire } from './shared-domain/questionnaire/domain/index';
import { VTLanding } from './shared-domain/valuation-tool/domain';
import { BlogArticle } from './shared-domain/blogArticle/domain';

const getLocale = () => {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    return router.locale.trim();
  } catch (e) {
    return 'en';
  }
};

/**
 * @deprecated - please use createUrl instead
 */
export const links = (l?: string) => {
  const locale = l || getLocale();

  if (locale === 'en') {
    return {
      services: (s: Service): string =>
        `/en/services/${s?.slug?.current || ''}`,
      newsArticles: (n: NewsArticle): string =>
        `/en/news/${n?.slug?.current || ''}`,
      transactions: (t: Transaction): string =>
        `/en/transactions/${t?.slug?.current || ''}`,
      sectors: (s: Sector): string => `/en/sectors/${s?.slug?.current || ''}`,
      employees: (e: Employee): string =>
        `/en/employees/${e?.slug?.current || ''}`,
      questionnaires: (q: Questionnaire | CalculatorPage): string =>
        `/en/questionnaires/${q?.questionnaireSlug?.current || ''}`,
      landings: (l: VTLanding): string =>
        `/en/landing/${l?.landingSlug?.current || ''}`,
      blogArticles: (b: BlogArticle): string =>
        `/en/blog/${b?.slug?.current || ''}`,
      blogValToolArticle: (bv: BlogArticle): string =>
        `/en/valuation-tool/${bv?.slug?.current || ''}`,
    };
  }

  if (locale === 'fr') {
    return {
      services: (s: Service): string =>
        `/fr/prestations-de-service/${s?.slug?.current || ''}`,
      newsArticles: (n: NewsArticle): string =>
        `/fr/news/${n?.slug?.current || ''}`,
      transactions: (t: Transaction): string =>
        `/fr/transactionnel/${t?.slug?.current || ''}`,
      sectors: (s: Sector): string => `/fr/secteurs/${s?.slug?.current || ''}`,
      employees: (e: Employee): string =>
        `/fr/employes/${e?.slug?.current || ''}`,
      questionnaires: (q: Questionnaire): string =>
        `/fr/des-questionnaires/${q?.questionnaireSlug?.current || ''}`,
      landings: (l: VTLanding): string =>
        `/fr/landing/${l?.landingSlug?.current || ''}`,
      blogArticles: (b: BlogArticle): string =>
        `/fr/blog/${b?.slug?.current || ''}`,
      blogValToolArticle: (bv: BlogArticle): string =>
        `/fr/outil-de-valorisation/${bv?.slug?.current || ''}`,
    };
  }

  return {
    services: (s: Service): string =>
      `/de/leistungsspektrum/${s?.slug?.current}`,
    newsArticles: (n: NewsArticle): string =>
      `/de/news/${n?.slug?.current || ''}`,
    transactions: (t: Transaction): string =>
      `/de/transaktionen/${t?.slug?.current || ''}`,
    sectors: (s: Sector): string => `/de/sektoren/${s?.slug?.current || ''}`,
    employees: (e: Employee): string =>
      `/de/mitarbeiter/${e?.slug?.current || ''}`,
    questionnaires: (q: Questionnaire): string =>
      `/de/fragenkatalog/${q?.questionnaireSlug?.current || ''}`,
    landings: (l: VTLanding): string =>
      `/de/landing/${l?.landingSlug?.current || ''}`,
    blogArticles: (b: BlogArticle): string =>
      `/de/blog/${b?.slug?.current || ''}`,
    blogValToolArticle: (bv: BlogArticle): string =>
      `/de/unternehmenswert-rechner/${bv?.slug?.current || ''}`,
  };
};

export const allLinks = {
  'valuation-tool': {
    en: 'valuation-tool',
    de: 'unternehmenswert-rechner',
    fr: 'outil-de-valorisation',
  },
  employees: {
    en: 'employees',
    de: 'mitarbeiter',
    fr: 'employes',
  },
  questionnaires: {
    en: 'questionnaires',
    de: 'fragenkatalog',
    fr: 'des-questionnaires',
  },
  sectors: {
    en: 'sectors',
    de: 'sektoren',
    fr: 'secteurs',
  },
  transactions: {
    en: 'transactions',
    de: 'transaktionen',
    fr: 'transactionnel',
  },
  services: {
    en: 'services',
    de: 'leistungsspektrum',
    fr: 'prestations-de-service',
  },
  blog: {
    en: 'blog',
    de: 'blog',
    fr: 'blog',
  },
  landing: {
    en: 'landing',
    de: 'landing',
    fr: 'landing',
  },
  'terms-and-conditions': {
    en: 'terms-and-conditions',
    de: 'terms-and-conditions',
    fr: 'terms-and-conditions',
  },
  'privacy-policy': {
    en: 'privacy-policy',
    de: 'privacy-policy',
    fr: 'privacy-policy',
  },
  home: {
    en: 'home',
    de: 'home',
    fr: 'home',
  },
  news: {
    en: 'news',
    de: 'news',
    fr: 'news',
  },
  'about-us': {
    en: 'about-us',
    de: 'ueber-uns',
    fr: 'propos-de-nous',
  },
  /**
   * @deprecated - we dont have these pages.
   */
  'cdi-global': {
    en: 'cdi-global',
    de: 'cdi-global',
    fr: 'cdi-global',
  },
  career: {
    en: 'career',
    de: 'karriere',
    fr: 'carriere',
  },
  imprint: {
    en: 'imprint',
    de: 'impressum',
    fr: 'imprimer',
  },
  taxCalculator: {
    en: 'tax-calculator',
    de: 'tax-calculator',
    fr: 'tax-calculator',
  },
  preCalculator: {
    en: 'pre-calculator',
    de: 'pre-calculator',
    fr: 'pre-calculator',
  }
};

export const getDefaultCountry = (locale: string) => {
  const countriesMap = {
    en: 'GB',
    de: 'DE',
    fr: 'FR',
  };

  return countriesMap[locale] || 'GB';
};

export const getBuiltLink = ({
  locale,
  path,
  uri,
}: {
  locale: string;
  path: string;
  uri: string;
}) => {
  if (!locale || !path) {
    return `/en/${path || ''}/${uri}/`;
  }
  const localizedPath = allLinks[path][locale];

  return `/${locale}/${localizedPath}/${uri}/`;
};

export const getArticlePaginationInfo = ({
  locale,
  startArticle,
  endArticle,
  total,
}) => {
  if (locale === 'en') {
    return `Showing ${startArticle}-${endArticle + 1} of ${total + 1} articles`;
  } else if (locale === 'fr') {
    return `Afficher ${startArticle}-${endArticle + 1} sur ${
      total + 1
    } articles`;
  } else {
    return `Zeigt ${startArticle}-${endArticle + 1} von ${total + 1} artikeln`;
  }
};

export const getPagePrefixByType = (type: string, locale: string): string => {
  const out: string[] = [locale];

  const linkTypePart = {
    sector: allLinks.sectors[locale],
    valueCalculator: allLinks.questionnaires[locale],
    employee: allLinks.employees[locale],
    transaction: allLinks.transactions[locale],
    newsArticle: allLinks.news[locale],
    service: allLinks.services[locale],
    landings: allLinks.landing[locale],
    taxCalculator: allLinks.taxCalculator[locale],
    blogArticle: allLinks.blog[locale],
    blogValToolArticle: allLinks['valuation-tool'][locale],
    preCalculator: allLinks.preCalculator[locale],
  };

  if (type in linkTypePart) {
    out.push(linkTypePart[type]);
  }

  return `/${out.join('/')}`;
}

export const createUrl = ({type, locale, slug, isAbsolute = false}: {
  type: string,
  locale: string,
  slug: string,
  isAbsolute?: boolean
}): string => {
  let url: string = '';

  if (isAbsolute) {
    url += process.env.NEXT_PUBLIC_BASE_URL;
  }

  url += getPagePrefixByType(type, locale);
  url += `/${slug}/`;

  return url;
};
