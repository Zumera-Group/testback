import Link from 'next/link';
import { useRouter } from 'next/router';

import { enPaths, dePaths, frPaths } from 'lib/shared-domain/page/paths';

import styles from './LanguageSwitcher.module.scss';
import { useEffect, useRef, useState } from 'react';
import { locales } from 'lib/locale';
import { allLinks } from 'lib/links';

interface Props {
  classes?: string;
  isLight: boolean;
  sideBar?: boolean;
}

export const LanguageSwitcher: React.FC<Props> = ({
  classes,
  isLight,
  sideBar,
}) => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const ref: any = useRef();

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
    fr: [
      ...frPaths,
      'des-questionnaires',
      'landing',
      'employes',
      'terms-and-conditions',
      'privacy-policy',
      'home',
    ],
  };

  const getSlug = (lang: string) => {
    const currentLocale = router.locale;
    const pathElements = router.asPath.split('/').filter((el) => el !== '');

    const pageIndex = pages[currentLocale]?.findIndex(
      (el) => el === pathElements[0],
    );

    console.log(pathElements, 'pathElements')

    if (!pages[lang][pageIndex]) {
      return '/home';
    }

    if (pageIndex === -1) {
      return `/${pathElements[0]}`;
    }

    return `/${pages[lang][pageIndex]}${
      pathElements[1] ? '/' + pathElements[1] : ''
    }`;
  };

  useEffect(() => {
    const onClick = ({ target }: any) => {
      if (!ref.current?.contains(target) && show) {
        setShow(false);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [show]);

  return (
    <div
      className={[
        styles.switcher,
        classes ?? '',
        sideBar ? styles.sidebar : '',
      ].join(' ')}
      ref={ref}
    >
      <button
        className={[styles.link, isLight ? styles.light : ''].join(' ')}
        onClick={() => setShow(!show)}
      >
        {(router.locale || 'en').toUpperCase()}
      </button>
      <div
        className={[styles.linksWrapper, show ? styles.active : ''].join(' ')}
      >
        {locales
          .filter((lang) => router.locale !== lang)
          .map((lang) => (
            <Link
              passHref
              locale={lang}
              href={getSlug(lang)}
              className={[styles.link, classes ?? ''].join(' ')}
              key={lang}
            >
              {(lang || '').toUpperCase()}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
