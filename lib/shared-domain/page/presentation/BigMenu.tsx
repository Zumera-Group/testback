import { icons } from 'components/Icons';
import Link from 'next/link';
import { Box, FlexCol, FlexRow } from 'components/Layout/Flex/Flex';
import React from 'react';
import { colors } from 'styles/foundations/colors';
import { SiteSettings, Service, Sector } from '../domain';
import { Logo } from './PageHeader';
import backgroundImage from '../../../../public/big-menu-bg.png';
import { fontSizes } from 'styles/foundations/fontStyles';
import { P } from 'components/Typography/P';
import { H } from 'components/Typography/H';
import { fontWeights } from '../../../../styles/foundations/fontStyles';
import { motion } from 'framer-motion';
import { useHover } from '../../../hooks/useOnHover';
import { links } from 'lib/links';
import { useLinkWithCurrentLocale } from 'lib/shared-domain/useLinkWithCurrentLocale';
import { Flex } from '@chakra-ui/react';

const SIDEBAR_WIDTH = '350px';

export const SectorServiceItem: React.FC<{
  title: string;
  href: string;
  flexBasis?: string;
  delay?: number;
  onHover?: () => void;
}> = ({ title, href, flexBasis = '100%', delay, onHover }) => {
  const [ref, isHovered] = useHover();
  React.useEffect(() => {
    if (isHovered && onHover) {
      onHover();
    }
  }, [isHovered]);
  return (
    <FlexCol ref={ref} my={3} flexBasis={flexBasis}>
      <motion.div
        initial={{ opacity: 0, y: '-20px' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
      >
        <Box>
          <Link passHref href={href}>
            <P
              as="a"
              color={colors.text.light}
              _hover={{ color: colors.primary.lightGreen }}
            >
              {title}
            </P>
          </Link>
        </Box>
      </motion.div>
    </FlexCol>
  );
};

export const BigMenu: React.FC<{
  siteSettings: SiteSettings;
  services: Service[];
  sectors: Sector[];
  homeSlug: string;
  logo: string;
  closeBigMenu: () => void;
}> = ({ homeSlug, logo, closeBigMenu, siteSettings, sectors, services }) => {
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
    return '';
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
    <FlexRow position="fixed" width="100%" height="100vh" zIndex={99999}>
      <motion.div
        initial={{ opacity: 0, x: `-${SIDEBAR_WIDTH}` }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0, duration: 0.5, type: 'easeInOut' }}
        exit={{
          opacity: 0,
          x: `-${SIDEBAR_WIDTH}`,
          transition: { delay: 0, duration: 0.5, type: 'easeInOut' },
        }}
      >
        <FlexCol
          flexShrink={0}
          height="100%"
          backgroundImage={`url(${backgroundImage.src})`}
          backgroundPosition="center"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          width={SIDEBAR_WIDTH}
        >
          <Box>
            <FlexRow
              my={2}
              mx={3}
              mb={6}
              position="relative"
              alignItems="center"
            >
              <Box as="button" onClick={closeBigMenu} mr={1}>
                <icons.BurgerOpen />
              </Box>
              <Box mt={0.5}>
                <Logo slug={homeSlug} src={logo} />
              </Box>
            </FlexRow>
            {siteSettings.hamburgerMenu?.map((h) => (
              <FlexCol
                px={4}
                width="100%"
                onClick={() => {
                  setShowMode(h.type);
                }}
                cursor="pointer"
                py={2}
                backgroundColor={
                  h.type !== 'normal' &&
                  h.type === showMode &&
                  colors.primary.darkestGreen
                }
                key={h.page.slug?.current}
              >
                {h.type === 'normal' ? (
                  <Link
                    passHref
                    href={linkWithCurrentLocale(h.page.slug?.current)}
                  >
                    <P
                      as="a"
                      fontSize={fontSizes.h3}
                      color={colors.white}
                      _hover={{ fontWeight: fontWeights.semiBold }}
                    >
                      {h.name}
                    </P>
                  </Link>
                ) : (
                  <FlexRow
                    alignItems="center"
                    justifyContent="space-between"
                    role="group"
                  >
                    <P
                      fontWeight={h.type === showMode && fontWeights.bold}
                      fontSize={fontSizes.h3}
                      color={colors.white}
                      _groupHover={{ fontWeight: fontWeights.semiBold }}
                    >
                      {h.name}
                    </P>
                    <Flex
                      transition=".2s ease-in all"
                      _groupHover={{
                        transform: 'translateY(-2px)',
                      }}
                    >
                      <icons.LinkArrow color={colors.white} size="16px" />
                    </Flex>
                  </FlexRow>
                )}
              </FlexCol>
            ))}
          </Box>
        </FlexCol>
      </motion.div>
      <FlexCol width="100%" height="100%" position="relative">
        <motion.div
          initial={{ opacity: 0, x: '200px' }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0, duration: 0.5, type: 'easeInOut' }}
          exit={{
            opacity: 0,
            x: '100vw',
            transition: { delay: 0, duration: 0.5, type: 'easeInOut' },
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <FlexCol width="100%" height="100%" bg={colors.white} py={8} px={10}>
            <Link passHref href={linkWithCurrentLocale(getLinkForHeading())}>
              <H
                width="fit-content"
                _hover={{ fontWeight: fontWeights.highlight }}
                as="a"
                mb={4}
                fontSize={fontSizes.h1}
                color={colors.primary.darkGreen}
              >
                {getHeadingText()}
              </H>
            </Link>
            <FlexRow overflow="auto" flexWrap="wrap" width="100%">
              {showMode === 'sectors' &&
                sectors?.map((s) => (
                  <SectorServiceItem
                    href={links().sectors(s)}
                    title={s.name}
                    key={s._id}
                  />
                ))}
              {showMode === 'services' &&
                services?.map((s) => (
                  <SectorServiceItem
                    href={links().services(s)}
                    title={s.name}
                    key={s._id}
                  />
                ))}
            </FlexRow>
          </FlexCol>
        </motion.div>
      </FlexCol>
    </FlexRow>
  );
};
