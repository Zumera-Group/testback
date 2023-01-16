import React, { useEffect } from 'react';
import Image from 'next/image';
import useBreakpointValue from 'lib/shared-domain/useBreakpoint';

import { icons } from 'components/Icons';
import { colors } from 'styles/foundations/colors';
import { fontWeights } from 'styles/foundations/fontStyles';
import { HEADER_HEIGHT } from '../constants';
import { SiteSettings } from '../domain/index';
import Link from 'next/link';
import {
  CDIGlobalSectionModule,
  ContentModule,
  HeroSectionModule,
} from '../domain/contentModule';
import { FlexCol, Box, FlexRow } from 'components/Layout/Flex/Flex';
import { P } from 'components/Typography/P';
import { SectionContainer } from 'components/Layout/SectionContainer';
// import { BigMenu } from './BigMenu';
import { AnimatePresence } from 'framer-motion';
// import { MobileMenu } from './MobileMenu';
// import { LanguageSwitcher } from './LanguageSwitcher';
import { useLinkWithCurrentLocale } from 'lib/shared-domain/useLinkWithCurrentLocale';
import { useRouter } from 'next/router';

export const Logo: React.FC<{
  slug: string;
  src: string;
  isMobile?: boolean;
}> = ({ slug, src, isMobile = false }) => {
  return (
    <Link passHref href={slug}>
      <Box as="a" cursor="pointer" className={isMobile ? 'logoMobile' : ''}>
        {src ? (
          <Image
            unoptimized
            priority
            loading="eager"
            width={!isMobile ? '182px' : '60px'}
            height="22px"
            objectFit="contain"
            alt=""
            src={src}
          />
        ) : null}
      </Box>
    </Link>
  );
};

export const PageHeader: React.FC<{
  siteSettings: SiteSettings;
  contentModules: ContentModule[];
  darkBg?: boolean;
  otherLangSlug?: string;
  hideHeader?: boolean;
  isLightHeader?: boolean;
}> = ({
  siteSettings,
  contentModules,
  darkBg,
  otherLangSlug,
  hideHeader,
  isLightHeader,
}) => {
  const [bigMenuOpen, setBigMenuOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [showStickyBg, setShowStickyBg] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setShowStickyBg(window.pageYOffset > 100);
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const router = useRouter();
  const linkWithCurrentLocale = useLinkWithCurrentLocale();

  // const isLogoMobile = useBreakpointValue({ base: true, lg: false });
  // const logo = isLogoMobile
  //   ? siteSettings?.logoMobile?.asset?.url
  //   : siteSettings?.logo?.asset?.url;
  // const darkLogo = isLogoMobile
  //   ? siteSettings?.darkLogoMobile?.asset?.url
  //   : siteSettings?.darkLogo?.asset?.url;

  const homeSlug = linkWithCurrentLocale(siteSettings?.homePage?.slug?.current);

  const getIsActive = (slug: string) => {
    return router.query.slug === slug;
  };

  React.useEffect(() => {
    setMobileMenuOpen(false);
    setBigMenuOpen(false);
  }, [router.query.slug, router.locale]);

  const isPageWithLightBg = () => {
    if (isLightHeader) {
      return true;
    }

    const heroSection = contentModules.find(
      (c) =>
        c.specificContentModule instanceof HeroSectionModule ||
        c.specificContentModule instanceof CDIGlobalSectionModule,
    );

    if (darkBg) return false;
    if (!heroSection) return true;
    return false;
    // return (
    //   (heroSection.specificContentModule as HeroSectionModule).type ===
    //     'level2' ||
    //   (heroSection.specificContentModule as HeroSectionModule).type ===
    //     'transaction' ||
    //   (heroSection.specificContentModule as HeroSectionModule).type ===
    //     'news' ||
    //   (heroSection.specificContentModule as HeroSectionModule).type ===
    //     'career' ||
    //   (heroSection.specificContentModule as HeroSectionModule).type ===
    //     'termsAndConditions'
    // );
  };

  useEffect(() => {
    const body = document?.body;
    if (mobileMenuOpen || bigMenuOpen) {
      body?.classList?.add?.('no-scroll');
    } else {
      body?.classList?.remove?.('no-scroll');
    }
  }, [mobileMenuOpen, bigMenuOpen]);

  const fontColor =
    isPageWithLightBg() || showStickyBg
      ? colors.primary.darkGreen
      : colors.white;

  const services = siteSettings?.hamburgerMenu.find(
    (h) => h.type === 'services',
  )?.serviceMenuItems;
  const sectors = siteSettings?.hamburgerMenu.find(
    (h) => h.type === 'sectors',
  )?.sectorMenuItems;

  return (
    <>
      {/* {isLogoMobile ? (
        <AnimatePresence>
          {mobileMenuOpen && (
            <MobileMenu
              closeMobileMenu={() => setMobileMenuOpen(false)}
              siteSettings={siteSettings}
              getIsActive={getIsActive}
              services={services}
              sectors={sectors}
              logo={logo}
              homeSlug={homeSlug}
              otherLangSlug={otherLangSlug}
            />
          )}
        </AnimatePresence>
      ) : (
        <AnimatePresence>
          {bigMenuOpen && (
            <BigMenu
              siteSettings={siteSettings}
              services={services}
              sectors={sectors}
              homeSlug={homeSlug}
              logo={logo}
              closeBigMenu={() => setBigMenuOpen(false)}
            />
          )}
        </AnimatePresence>
      )}
      <Box
        className="pageHeader"
        bgColor={showStickyBg && colors.white}
        height={HEADER_HEIGHT}
        position="fixed"
        top={0}
        width="100vw"
        zIndex={999}
      >
        <SectionContainer>
          <FlexRow
            height="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <FlexRow alignItems="center">
              {isLogoMobile ? null : (
                <Box
                  as="button"
                  onClick={() => setBigMenuOpen(!bigMenuOpen)}
                  mb={1}
                  mr={2}
                >
                  <icons.BurgerClosed color={fontColor} />
                </Box>
              )}
              <FlexCol cursor="pointer">
                {isPageWithLightBg() || showStickyBg ? (
                  <Logo
                    isMobile={isLogoMobile}
                    slug={linkWithCurrentLocale(homeSlug)}
                    src={darkLogo}
                  />
                ) : (
                  <Logo
                    isMobile={isLogoMobile}
                    slug={linkWithCurrentLocale(homeSlug)}
                    src={logo}
                  />
                )}
              </FlexCol>
            </FlexRow>
            {isLogoMobile ? (
              <Box zIndex={10}>
                <Box
                  mb={1}
                  as="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <icons.BurgerClosed color={fontColor} />
                </Box>
              </Box>
            ) : (
              <FlexRow alignItems="center">
                {!hideHeader &&
                  siteSettings?.headerMenu.map((h) => (
                    <FlexCol cursor="pointer" mx={2} key={h.page.slug?.current}>
                      <Link
                        passHref
                        href={linkWithCurrentLocale(h.page.slug?.current)}
                      >
                        <P
                          as="a"
                          _hover={{ fontWeight: fontWeights.semiBold }}
                          _after={{
                            content: `"${h.name}"`,
                            height: 0,
                            visibility: 'hidden',
                            fontWeight: fontWeights.semiBold,
                          }}
                          fontWeight={
                            getIsActive(h.page.slug?.current) &&
                            fontWeights.semiBold
                          }
                          color={fontColor}
                          display="inline-flex"
                          align="center"
                          flexDirection="column"
                          justifyContent="space-between"
                        >
                          {h.name}
                        </P>
                      </Link>
                    </FlexCol>
                  ))}
                <Box
                  height="28px"
                  ml={1}
                  mr={3}
                  borderLeft="1px"
                  borderLeftStyle="solid"
                  borderLeftColor={fontColor}
                  opacity={0.2}
                />
                {!hideHeader && (
                  <LanguageSwitcher
                    otherLangSlug={otherLangSlug}
                    fontColor={fontColor}
                  />
                )}
              </FlexRow>
            )}
          </FlexRow>
        </SectionContainer>
      </Box> */}
    </>
  );
};
