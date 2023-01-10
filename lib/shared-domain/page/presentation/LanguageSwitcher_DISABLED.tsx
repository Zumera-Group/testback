import Link from 'next/link';
import React from 'react';

import { Box } from 'components/Layout/Flex/Flex';
import { P } from 'components/Typography/P';
import { useRouter } from 'next/router';
import { fontWeights } from '../../../../styles/foundations/fontStyles';
import { enPaths, dePaths } from '../paths';

export const LanguageSwitcher: React.FC<{
  fontColor: string;
  fontSize?: string;
  otherLangSlug?: string;
}> = ({ fontColor, fontSize, otherLangSlug }) => {
  const router = useRouter();
  const getLocale = () => {
    if (otherLangSlug) return null;
    if (router.locale === 'en') return 'de';
    if (router.locale === 'de') return 'en';
  };

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
    <Box>
      <Link passHref locale={getLocale()} href={getSlug()}>
        <P
          as="a"
          fontSize={fontSize}
          cursor="pointer"
          color={fontColor}
          _hover={{ fontWeight: fontWeights.semiBold }}
        >
          {router.locale === 'en' ? 'DE' : 'EN'}
        </P>
      </Link>
    </Box>
  );
};
