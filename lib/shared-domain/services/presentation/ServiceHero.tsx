import React from 'react';

import backgroundImage1 from '../../../../public/serviceDetail/hero-bg-1.png';

import { Box, FlexCol } from 'components/Layout/Flex/Flex';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { TitleWithSubtitleAndDescription } from 'lib/shared-domain/page/presentation/components/TitleWithSubtitleAndDescription';
import { HEADER_HEIGHT } from '../../page/constants';
import { useBreakpointValue } from '@chakra-ui/react';
import { Service } from '../../page/domain/index';
import { colors } from 'styles/foundations/colors';

export const ServiceHero: React.FC<{ service: Service }> = ({ service }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <FlexCol
        width="100%"
        justifyContent="center"
        backgroundImage={`url(${backgroundImage1.src})`}
        backgroundPosition="center bottom"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        backgroundAttachment={!isMobile && 'fixed'}
      >
        <SectionContainer py="md">
          <Box mb={12} mt={HEADER_HEIGHT}>
            <Box width={{ base: '100%', lg: '50%' }}>
              <TitleWithSubtitleAndDescription
                color={{ title: colors.primary.darkGreen }}
                description={service?.description}
                title={service?.name}
                headingType="h1"
              />
            </Box>
          </Box>
        </SectionContainer>
      </FlexCol>
    </>
  );
};
