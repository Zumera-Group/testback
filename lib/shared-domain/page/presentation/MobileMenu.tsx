import Link from 'next/link';
import React from 'react';

import { icons } from 'components/Icons';
import { Box, FlexCol, FlexRow } from 'components/Layout/Flex/Flex';
import { H } from 'components/Typography/H';
import { P } from 'components/Typography/P';
import { AnimatePresence, motion } from 'framer-motion';
import { links } from 'lib/links';
import { colors } from 'styles/foundations/colors';
import { fontSizes, fontWeights } from 'styles/foundations/fontStyles';
import { getTranslateByScope } from 'translation/i18n';
import { SiteSettings, Sector, Service } from '../domain';
import { SectorServiceItem } from './BigMenu';
import { LanguageSwitcher } from './LanguageSwitcher';
import mobileBackgroundImage from '../../../../public/big-menu-bg.png';
import { Logo } from './PageHeader';

import { useLinkWithCurrentLocale } from 'lib/shared-domain/useLinkWithCurrentLocale';

export const MobileMenu: React.FC<{
  siteSettings: SiteSettings;
  getIsActive: (slug: string) => boolean;
  closeMobileMenu: () => void;
  sectors: Sector[];
  services: Service[];
  homeSlug: string;
  logo: string;
  otherLangSlug?: string;
}> = ({
  siteSettings,
  getIsActive,
  closeMobileMenu,
  sectors,
  services,
  logo,
  homeSlug,
  otherLangSlug,
}) => {
  const linkWithCurrentLocale = useLinkWithCurrentLocale();
  const [showMode, setShowMode] = React.useState<
    'normal' | 'sectors' | 'services'
  >('normal');

  const getHeadingText = () => {
    if (showMode === 'sectors') {
      const sectorsMenu = siteSettings.hamburgerMenu.find(
        (menu) => menu.type.toLowerCase() === showMode,
      );
      return sectorsMenu.name;
    }
    if (showMode === 'services') {
      const servicesMenu = siteSettings.hamburgerMenu.find(
        (menu) => menu.type.toLowerCase() === showMode,
      );
      return servicesMenu.name;
    }
  };

  const getLinkForHeading = () => {
    if (showMode === 'sectors') {
      const sectorsMenu = siteSettings.hamburgerMenu.find(
        (menu) => menu.type.toLowerCase() === showMode,
      );
      return sectorsMenu?.page?.slug?.current;
    }
    if (showMode === 'services') {
      const servicesMenu = siteSettings.hamburgerMenu.find(
        (menu) => menu.type.toLowerCase() === showMode,
      );
      return servicesMenu?.page?.slug?.current;
    }

    return '';
  };

  return (
    <>
      <Box position="fixed" width="100%" height="100vh" zIndex={99999}>
        <motion.div
          style={{ height: '100%', width: '100%' }}
          initial={{ opacity: 0, y: `100px` }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          exit={{
            opacity: 0,
            y: `100vh`,
            transition: { delay: 0.4 },
          }}
        >
          <FlexCol
            justifyContent="center"
            backgroundImage={`url(${mobileBackgroundImage.src})`}
            backgroundPosition="center"
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            height="100%"
            width="100%"
            pt={10}
            overflow="hidden"
          >
            <FlexRow position="absolute" top={4} left={3} ml={0.5}>
              <Logo isMobile slug={homeSlug} src={logo} />
            </FlexRow>
            <Box
              as="button"
              onClick={closeMobileMenu}
              position="fixed"
              top={2.5}
              right={2}
            >
              <icons.BurgerOpen />
            </Box>

            <FlexCol overflow="scroll" h="100%" pb={3}>
              {siteSettings.hamburgerMenu.map((h) => (
                <FlexRow
                  alignItems="center"
                  justifyContent="space-between"
                  mx={4}
                  cursor="pointer"
                  my={2}
                  key={h.page.slug?.current}
                  onClick={() => setShowMode(h.type)}
                >
                  {h.type === 'normal' ? (
                    <Link
                      passHref
                      href={linkWithCurrentLocale(h.page.slug?.current)}
                    >
                      <P as="a" fontSize={fontSizes.h3} color={colors.white}>
                        {h.name}
                      </P>
                    </Link>
                  ) : (
                    <>
                      <P
                        fontSize={fontSizes.h3}
                        fontWeight={
                          getIsActive(h.page.slug?.current) &&
                          fontWeights.semiBold
                        }
                        color={colors.white}
                      >
                        {h.name}
                      </P>
                      {(h.type === 'services' || h.type === 'sectors') && (
                        <icons.LinkArrow color={colors.white} size="16px" />
                      )}
                    </>
                  )}
                </FlexRow>
              ))}
              <Box mx={4} mt={3}>
                <Box
                  width="100%"
                  borderTop="1px"
                  borderLeftStyle="solid"
                  borderLeftColor="gray.250"
                  opacity={0.8}
                  mb={5}
                ></Box>
                <LanguageSwitcher
                  fontSize={fontSizes.h3}
                  fontColor={colors.white}
                  otherLangSlug={otherLangSlug}
                />
              </Box>
            </FlexCol>
          </FlexCol>
        </motion.div>
        <AnimatePresence>
          {(showMode === 'sectors' || showMode === 'services') && (
            <motion.div
              style={{
                height: '100vh',
                width: '100vw',
                position: 'absolute',
                zIndex: 99,
                top: 0,
              }}
              initial={{ opacity: 0, x: `100vw` }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              exit={{
                opacity: 0,
                x: `100vw`,
                transition: { delay: 0.4 },
              }}
            >
              <Box
                width="100vw"
                height="100vh"
                py={5}
                px={4}
                backgroundColor={colors.white}
              >
                <Box as="button" onClick={() => setShowMode('normal')} mb={4}>
                  <icons.ArrowLeft />
                </Box>

                <Box>
                  <Link
                    passHref
                    href={linkWithCurrentLocale(getLinkForHeading())}
                  >
                    <H
                      as="a"
                      mb={4}
                      fontSize={fontSizes.h1}
                      color={colors.primary.darkGreen}
                    >
                      {getHeadingText()}
                    </H>
                  </Link>
                </Box>

                <Box overflow="scroll" maxHeight="calc(90%)">
                  {showMode === 'sectors' &&
                    [...sectors, ...sectors]?.map((s) => (
                      <SectorServiceItem
                        delay={0.5}
                        href={links().sectors(s)}
                        title={s.name}
                        key={s._id}
                      />
                    ))}
                  {showMode === 'services' &&
                    services?.map((s) => (
                      <SectorServiceItem
                        delay={0.5}
                        href={links().services(s)}
                        title={s.name}
                        key={s._id}
                      />
                    ))}
                </Box>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </>
  );
};
