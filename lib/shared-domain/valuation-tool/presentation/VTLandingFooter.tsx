import React from 'react';
import { SiteSettings } from '../../page/domain/index';
import { SectionContainer } from '../../../../components/Layout/SectionContainer';
import { Flex } from '@chakra-ui/react';
import useBreakpointValue from 'lib/shared-domain/useBreakpoint';
import { Box, FlexRow } from '../../../../components/Layout/Flex/Flex';
import { P } from '../../../../components/Typography/P';
import { fontSizes } from '../../../../styles/foundations/fontStyles';
import { colors } from '../../../../styles/foundations/colors';
// import { FooterLink } from '../../page/presentation/PageFooter';
import { FooterLink } from 'components/Footer';
import Image from 'next/image';

export const VTLandingFooter: React.FC<{
  siteSettings: SiteSettings;
}> = ({ siteSettings }) => {
  // const isMobile = useBreakpointValue({ base: true, lg: false });
  const isMobile = false;

  return (
    <SectionContainer pt={isMobile ? 'md' : 'xs'} pb={isMobile ? 'xs' : 'md'}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify={{ md: 'space-between' }}
      >
        <Flex
          direction={{ base: 'column', md: 'row' }}
          alignItems={{ base: 'flex-start', md: 'end' }}
        >
          <Box mr={8} mb={{ base: 4, md: 0 }}>
            <P fontSize={fontSizes.small} color={colors.text.light}>
              {siteSettings.footerCopyright}
            </P>
          </Box>
          <Box mr={8} mb={{ base: 4, md: 0 }}>
            <FooterLink
              // color={colors.text.light}
              // hoverColor={colors.primary.lightGreen}
              title={siteSettings.footerTermsOfService.name}
              href={
                '/' + siteSettings.footerTermsOfService?.page?.slug?.current
              }
            />
          </Box>
          <Box mr={8} mb={{ base: 4, md: 0 }}>
            <FooterLink
              // color={colors.text.light}
              // hoverColor={colors.primary.lightGreen}
              title={siteSettings.footerPrivacyPolice.name}
              href={'/' + siteSettings.footerPrivacyPolice?.page?.slug?.current}
            />
          </Box>
        </Flex>
        <FlexRow mr={7}>
          {siteSettings.footerSocialLinks?.map((sl) => (
            <Box
              mr={2}
              key={sl._key}
              mb={{ base: 1, md: 0 }}
              transition=".2s ease-in all"
              _hover={{ transform: 'translateY(-2px)' }}
            >
              <a target="_blank" href={sl.link} rel="noopener noreferrer">
                {sl.iconDark?.iconImage?.asset?.url ? (
                  <Image
                    unoptimized
                    loading="lazy"
                    src={sl.iconDark?.iconImage?.asset?.url}
                    alt={sl.link}
                    height="22px"
                    width="22px"
                  />
                ) : null}
              </a>
            </Box>
          ))}
        </FlexRow>
      </Flex>
    </SectionContainer>
  );
};
