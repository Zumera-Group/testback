import React from 'react';
import Link from 'next/link';

import useBreakpointValue from 'lib/shared-domain/useBreakpoint';

import { colors } from 'styles/foundations/colors';
import { HEADER_HEIGHT } from '../../page/constants';
import { SiteSettings } from '../../page/domain';
import { VTLanding } from '../domain';
import {
  CDIGlobalSectionModule,
  ContentModule,
  HeroSectionModule,
} from '../../page/domain/contentModule';
import { FlexCol, Box, FlexRow } from 'components/Layout/Flex/Flex';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { Btn } from 'components/Buttons/Button';
import { Logo } from 'lib/shared-domain/page/presentation/PageHeader';
import { links } from 'lib/links';
import { useLinkWithCurrentLocale } from 'lib/shared-domain/useLinkWithCurrentLocale';

export const VTLandingHeader: React.FC<{
  siteSettings: SiteSettings;
  contentModules: ContentModule[];
  landing: VTLanding;
}> = ({ siteSettings, contentModules, landing }) => {
  const [showStickyBg, setShowStickyBg] = React.useState(false);
  const isLogoMobile = useBreakpointValue({ base: true, lg: false });
  const linkWithCurrentLocale = useLinkWithCurrentLocale();

  React.useEffect(() => {
    const onScroll = () => {
      setShowStickyBg(window.pageYOffset > 100);
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const logo = isLogoMobile
    ? siteSettings?.logoMobile?.asset?.url
    : siteSettings?.logo?.asset?.url;
  const darkLogo = isLogoMobile
    ? siteSettings?.darkLogoMobile?.asset?.url
    : siteSettings?.darkLogo?.asset?.url;
  const homeSlug = linkWithCurrentLocale(siteSettings?.homePage?.slug?.current);

  const isPageWithLightBg = () => {
    const heroSection = contentModules.find(
      (c) =>
        c.specificContentModule instanceof HeroSectionModule ||
        c.specificContentModule instanceof CDIGlobalSectionModule,
    );

    if (!heroSection) return true;

    return (
      (heroSection.specificContentModule as HeroSectionModule).type ===
        'level2' ||
      (heroSection.specificContentModule as HeroSectionModule).type ===
        'transaction' ||
      (heroSection.specificContentModule as HeroSectionModule).type ===
        'news' ||
      (heroSection.specificContentModule as HeroSectionModule).type ===
        'career' ||
      (heroSection.specificContentModule as HeroSectionModule).type ===
        'termsAndConditions'
    );
  };

  const urlToTool = links().questionnaires(landing?.questionnaire as any);

  return (
    <>
      <Box
        className="pageHeader"
        bgColor={showStickyBg && colors.white}
        height={HEADER_HEIGHT}
        position="fixed"
        top={0}
        width="100vw"
        zIndex={999}
      >
        <SectionContainer classes="vtLandingHeader">
          <FlexRow
            height="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <FlexRow alignItems="center">
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

            {(landing?.questionnaire || landing?.externalButtonUrl) &&
              landing?.buttonText && (
                <FlexRow alignItems="center">
                  <Link
                    passHref
                    href={
                      landing?.questionnaire
                        ? urlToTool
                        : landing?.externalButtonUrl
                    }
                  >
                    <Btn
                      as="a"
                      cursor="pointer"
                      aria-label="Button"
                      variant={
                        isPageWithLightBg() || showStickyBg
                          ? 'primary'
                          : 'white'
                      }
                      paddingX={4}
                    >
                      {landing?.buttonText}
                    </Btn>
                  </Link>
                </FlexRow>
              )}
          </FlexRow>
        </SectionContainer>
      </Box>
    </>
  );
};
