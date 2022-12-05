import { useRouter } from 'next/router';
import { Service, Sector } from './shared-domain/page/domain/index';
import { NewsArticle } from './shared-domain/newsArticle/domain/index';
import { Transaction } from './shared-domain/transactions/domain';
import { Employee } from './shared-domain/employees/domain/index';
import { Questionnaire } from './shared-domain/questionnaire/domain/index';
import { VTLanding } from './shared-domain/valuation-tool/domain';

const getLocale = () => {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    return router.locale.trim();
  } catch (e) {
    return 'en';
  }
};

export const links = (l?: string) => {
  const locale = l || getLocale();

  if (locale === 'en') {
    return {
      services: (s: Service): string => `/en/services/${s?.slug?.current}`,
      newsArticles: (n: NewsArticle): string => `/en/news/${n?.slug?.current}`,
      transactions: (t: Transaction): string =>
        `/en/transactions/${t?.slug?.current}`,
      sectors: (s: Sector): string => `/en/sectors/${s?.slug?.current}`,
      employees: (e: Employee): string => `/en/employees/${e?.slug?.current}`,
      questionnaires: (q: Questionnaire): string =>
        `/en/questionnaires/${q?.questionnaireSlug?.current}`,
      landings: (l: VTLanding): string =>
        `/en/landing/${l?.landingSlug?.current}`,
    };
  }

  return {
    services: (s: Service): string =>
      `/de/leistungsspektrum/${s?.slug?.current}`,
    newsArticles: (n: NewsArticle): string => `/de/news/${n?.slug?.current}`,
    transactions: (t: Transaction): string =>
      `/de/transaktionen/${t?.slug?.current}`,
    sectors: (s: Sector): string => `/de/sektoren/${s?.slug?.current}`,
    employees: (e: Employee): string => `/de/mitarbeiter/${e?.slug?.current}`,
    questionnaires: (q: Questionnaire): string =>
      `/de/fragenkatalog/${q?.questionnaireSlug?.current}`,
    landings: (l: VTLanding): string =>
      `/de/landing/${l?.landingSlug?.current}`,
  };
};
