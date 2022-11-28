import { useBreakpointValue, Text, Flex } from '@chakra-ui/react';
import { FlexCol } from 'components/Layout/Flex/Flex';
import { H } from 'components/Typography/H';
import React from 'react';

import { TrustSectionModule } from '../../domain/contentModule';

import { colors } from '../../../../../styles/foundations/colors';
import { SectionContainer } from 'components/Layout/SectionContainer';

export const TrustSection: React.FC<{
  specificContentModule: TrustSectionModule;
}> = ({ specificContentModule }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const hVariant = isMobile
    ? 'mobileWebsiteTrustSectionH'
    : 'websiteTrustSectionH';
  const pVariant = isMobile
    ? 'mobileWebsiteTrustSectionP'
    : 'websiteTrustSectionP';

  const textColor = colors.white;

  return (
    <FlexCol
      backgroundImage={`url(${specificContentModule.getBackgroundImage()})`}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundAttachment={!isMobile && 'fixed'}
    >
      <SectionContainer py="md" px="md">
        <Flex direction={{ base: 'column', md: 'row' }}>
          {specificContentModule.textElements.map((t, index) => (
            <FlexCol
              mb={{ base: 3, md: 0 }}
              textAlign="center"
              flex={1}
              key={index}
            >
              <H mb={1} color={textColor} variant={hVariant}>
                {t.title}
              </H>
              <Text color={textColor} variant={pVariant}>
                {t.subtitle}
              </Text>
            </FlexCol>
          ))}
        </Flex>
      </SectionContainer>
    </FlexCol>
  );
};

export default TrustSection;
