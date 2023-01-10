import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SiteSettings, Service, Sector } from '../domain/index';
import footerBgImage from '../../../../public/footer_bg.webp';
import footerBgImageMobile from '../../../../public/footer_bg_mobile.webp';
import { Box, FlexCol, FlexRow } from 'components/Layout/Flex/Flex';
import { colors } from '../../../../styles/foundations/colors';
import { fontSizes } from '../../../../styles/foundations/fontStyles';
import { H } from '../../../../components/Typography/H';
import { P } from 'components/Typography/P';
import { Flex } from '@chakra-ui/react';
import useBreakpointValue from 'lib/shared-domain/useBreakpoint';
import { icons } from '../../../../components/Icons/index';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { motion, AnimatePresence } from 'framer-motion';
import { links } from 'lib/links';
import { useLinkWithCurrentLocale } from 'lib/shared-domain/useLinkWithCurrentLocale';
import { Questionnaire } from '../../questionnaire/domain/index';

export const FooterLink: React.FC<{
  href: string;
  title: string;
  color?: string;
  hoverColor?: string;
  fontSize?: string;
}> = ({ href, title, color, hoverColor, fontSize }) => {
  return (
    <Box width="fit-content" cursor="pointer">
      <Link passHref href={href}>
        <P
          as="a"
          _hover={{ color: hoverColor || colors.white }}
          fontSize={fontSize || fontSizes.small}
          color={color || colors.text.lightest}
        >
          {title}
        </P>
      </Link>
    </Box>
  );
};

const PageFooterColumn: React.FC<{
  pageFooter: {
    type: 'normal' | 'sectors' | 'services' | 'tools';
    title: string;
    menuItems?: {
      _key: string;
      name: string;
      page: {
        slug: {
          current: string;
        };
      };
    }[];
    toolsMenuItems?: {
      _key: string;
      name: string;
      page: Questionnaire;
    }[];
    serviceMenuItems?: Service[];
    sectorMenuItems?: Sector[];
  };
}> = ({ pageFooter }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false); // Just mobile
  // const isMobile = useBreakpointValue({ base: true, md: false });
  const linkWithCurrentLocale = useLinkWithCurrentLocale();

  return (
    <FlexCol
      mr={2}
      mb={{ base: 2, md: 0 }}
      flexBasis={{ base: '100%', md: '23%' }}
    >
      <FlexRow
        as={isMobile ? 'button' : null}
        onClick={() => isMobile && setIsMenuOpen(!isMenuOpen)}
        alignItems="center"
        justifyContent="space-between"
      >
        <H
          mb={{ base: 0, md: 1 }}
          as="h2"
          fontSize={fontSizes.h2}
          color={colors.white}
        >
          {pageFooter.title}
        </H>
        {isMobile && (
          <Box
            mr={1}
            transition=".2s ease-in all"
            transform={
              isMenuOpen ? 'rotate(-270deg)' : 'rotate(-90deg) translateY(-5px)'
            }
          >
            <icons.ChevronLeft color={colors.white} />
          </Box>
        )}
      </FlexRow>
      <AnimatePresence>
        {(isMenuOpen || !isMobile) && (
          <motion.div
            initial={{ opacity: 0, y: '-20px', height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ height: 0, opacity: 0 }}
          >
            {pageFooter.type === 'services' &&
              pageFooter.serviceMenuItems?.map((s) => (
                <FlexCol my={0.5} key={s._id}>
                  <FooterLink title={s.name} href={links().services(s)} />
                </FlexCol>
              ))}
            {pageFooter.type === 'sectors' &&
              pageFooter.sectorMenuItems?.map((s) => (
                <FlexCol my={0.5} key={s._id}>
                  <FooterLink title={s.name} href={links().sectors(s)} />
                </FlexCol>
              ))}
            {pageFooter.type === 'normal' &&
              pageFooter.menuItems?.map((h) => (
                <FlexCol my={0.5} key={h._key}>
                  <FooterLink
                    title={h.name}
                    href={linkWithCurrentLocale(h.page?.slug?.current)}
                  />
                </FlexCol>
              ))}
            {pageFooter.type === 'tools' &&
              pageFooter.toolsMenuItems?.map((h) => (
                <FlexCol my={0.5} key={h._key}>
                  <FooterLink
                    title={h.name}
                    href={links().questionnaires(h.page)}
                  />
                </FlexCol>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </FlexCol>
  );
};

export const PageFooter: React.FC<{
  siteSettings: SiteSettings;
}> = ({ siteSettings }) => {
  const linkWithCurrentLocale = useLinkWithCurrentLocale();

  return (
    <Box
      py={{ base: 0, md: 8 }}
      mt={{ base: '-3px', md: 0 }}
      backgroundImage={{
        base: `url(${footerBgImageMobile.src})`,
        md: `url(${footerBgImage.src})`,
      }}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
    >
      <SectionContainer>
        <FlexRow
          borderBottomStyle="solid"
          borderBottomWidth="1px"
          borderBottomColor={colors.gray[200]}
          flexWrap="wrap"
          pb={{ base: 4, md: 8 }}
          mb={4}
        >
          {siteSettings.footerMenu?.map((f) => (
            <PageFooterColumn key={f._key} pageFooter={f} />
          ))}
        </FlexRow>
        <FlexRow mb={8} justifyContent="space-between" alignItems="center">
          <Flex
            direction={{ base: 'column', md: 'row' }}
            alignItems={{ base: 'flex-start', md: 'center' }}
          >
            <Box mr={{ base: 2, md: 8 }} mb={{ base: 2, md: 0 }}>
              <P
                fontSize={fontSizes.p}
                color={colors.text.lightest}
                lineHeight="24px"
              >
                {siteSettings.footerCopyright}
              </P>
            </Box>
            <Box mr={8} mb={{ base: 2, md: 0 }}>
              <FooterLink
                fontSize={fontSizes.p}
                title={siteSettings.footerTermsOfService.name}
                href={linkWithCurrentLocale(
                  siteSettings.footerTermsOfService.page?.slug?.current,
                )}
              />
            </Box>
            <Box mr={8}>
              <FooterLink
                fontSize={fontSizes.p}
                title={siteSettings.footerPrivacyPolice.name}
                href={linkWithCurrentLocale(
                  siteSettings.footerPrivacyPolice?.page?.slug?.current,
                )}
              />
            </Box>
          </Flex>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            alignItems={{ base: 'flex-start', md: 'end' }}
          >
            {siteSettings.footerSocialLinks?.map((sl) => (
              <Box
                mx={2}
                key={sl._key}
                mb={{ base: 1, md: 0 }}
                transition=".2s ease-in all"
                _hover={{ transform: 'translateY(-2px)' }}
              >
                {sl.icon?.iconImage?.asset?.url ? (
                  <a target="_blank" href={sl.link} rel="noopener noreferrer">
                    <Image
                      unoptimized
                      loading="lazy"
                      src={sl.icon?.iconImage?.asset?.url + `?h=400`}
                      alt={sl.link}
                      height="22px"
                      width="22px"
                    />
                  </a>
                ) : null}
              </Box>
            ))}
          </Flex>
        </FlexRow>
      </SectionContainer>
    </Box>
  );
};

export default PageFooter;
