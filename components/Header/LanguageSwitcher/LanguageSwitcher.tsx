import Link from 'next/link';
import { useRouter } from 'next/router';

// import { enPaths, dePaths, frPaths } from 'lib/shared-domain/page/paths';

import styles from './LanguageSwitcher.module.scss';
import { useEffect, useRef, useState } from 'react';
import { locales } from 'lib/locale';
import { useCallback } from 'react';
import { IAlternateLangHrefs } from '../../../@types/i18n';

interface Props {
  classes?: string;
  isLight: boolean;
  sideBar?: boolean;
  langAlternates?: IAlternateLangHrefs
}

export const LanguageSwitcher: React.FC<Props> = ({
  classes,
  isLight,
  sideBar,
  langAlternates
}) => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const ref: any = useRef();

  // const pages = {
  //   en: [
  //     ...enPaths,
  //     'questionnaires',
  //     'landing',
  //     'employees',
  //     'terms-and-conditions',
  //     'privacy-policy',
  //     'home',
  //   ],
  //   de: [
  //     ...dePaths,
  //     'fragenkatalog',
  //     'landing',
  //     'mitarbeiter',
  //     'impressum',
  //     'datenschutzerklarung',
  //     'home',
  //   ],
  //   fr: [
  //     ...frPaths,
  //     'des-questionnaires',
  //     'landing',
  //     'employes',
  //     'terms-and-conditions',
  //     'privacy-policy',
  //     'home',
  //   ],
  // };

  // console.log('--- pages:', pages);
  const getSlug = useCallback((lang: string) => {
    // console.log('---- get Slug ---', lang, langAlternates);
    if (langAlternates) {
      if (lang in langAlternates) {
        return langAlternates[lang];
      }

      return `/${lang}/home`
    }

    //the legacy way often leads to 404 - since almost all pages pass  langAlternates -
    // lets just point to the home page to avoid 404 page:
    return `/${lang}/home`

    // console.log('no langAlternates - legacy way:');
/*
    const currentLocale = router.locale;
    const pathElements = router.asPath.split('/').filter((el) => el !== '');
    // console.log(currentLocale, pathElements);
    const pageIndex = pages[currentLocale]?.findIndex(
      (el) => el === pathElements[0],
    );

    if (!pages[lang][pageIndex]) {
      return '/home';
    }

    if (pageIndex === -1) {
      return `/${pathElements[0]}`;
    }

    return `/${pages[lang][pageIndex]}${
      pathElements[1] ? '/' + pathElements[1] : ''
    }`;*/
  }, [langAlternates, router]);

  useEffect(() => {
    // console.log('useEffence - bind on click - it is incorrect')
    const onClick = ({ target }: any) => {
      // console.log('on click handlerr')
      if (!ref.current?.contains(target) && show) {
        setShow(false);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [show]);

  useEffect(() => {
    if (show) {
      setShow(false);
    }
  }, [router.asPath]);

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
