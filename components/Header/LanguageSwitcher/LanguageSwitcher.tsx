import Link from 'next/link';
import { useRouter } from 'next/router';

import { enPaths, dePaths } from 'lib/shared-domain/page/paths';

import styles from './LanguageSwitcher.module.scss';

interface Props {
  otherLangSlug?: string;
  classes?: string;
}

export const LanguageSwitcher: React.FC<Props> = ({ otherLangSlug, classes }) => {
  const router = useRouter();

  const getLocale = () => {
    if (otherLangSlug) return null;
    if (router.locale === 'en') return 'de';
    if (router.locale === 'de') return 'en';
  };

  const localeLabel = () => {
    return router.locale === 'en' ? 'DE' : 'EN';
  }

  const pages = {
    en: [
      ...enPaths,
      'questionnaires',
      'landing',
      'employees',
      'terms-and-conditions',
      'privacy-policy',
      'home',
    ],
    de: [
      ...dePaths,
      'fragenkatalog',
      'landing',
      'home',
      'impressum',
      'datenschutzerklarung',
      'mitarbeiter',
    ],
  };

  const getSlug = () => {
    if (otherLangSlug) {
      if (otherLangSlug.startsWith('/')) {
        return otherLangSlug;
      }
      return `/${otherLangSlug}`;
    }
    const currentLocale = router.locale;
    const otherLocale = currentLocale === 'en' ? 'de' : 'en';
    const pathElements = router.asPath.split('/').filter((el) => el !== '');

    if (pathElements) {
      const pageIndex = pages[currentLocale]?.findIndex(
        (el) => el === pathElements[0],
      );

      if (pageIndex === -1) {
        return `/${pathElements[0]}`;
      }
      const pathOtherLocale = `/${pages[otherLocale][pageIndex]}`;

      return pathOtherLocale;
    } else {
      return '/home';
    }
  };

  return (
    <Link
      passHref
      locale={getLocale()}
      href={getSlug()}
    >
      <a className={[
          styles.link,
          classes ?? '',
        ].join(' ')}>
        {localeLabel()}
      </a>
    </Link>
  );
};

export default LanguageSwitcher;