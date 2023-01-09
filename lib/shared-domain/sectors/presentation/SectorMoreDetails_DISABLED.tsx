import { useBreakpointValue } from '@chakra-ui/react';
import { FlexCol, Box } from 'components/Layout/Flex/Flex';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { TitleWithSubtitleAndDescription } from 'lib/shared-domain/page/presentation/components/TitleWithSubtitleAndDescription';
import React from 'react';
import { colors } from 'styles/foundations/colors';

import fallbackImage from '../../../../public/sectorDetail/more-details-bg.jpg';
import { Sector } from '../../page/domain/index';

export const SectorMoreDetails: React.FC<{ sector: Sector; content: any }> = ({
  sector,
  content,
}) => {
  // const isMobile = useBreakpointValue({ base: true, md: false });
  const isMobile = false;

  if (!sector.moreDetailsSection) return null;
  const contentFullImage =
    sector?.moreDetailsSection?.sectorMoreDetailsPicture?.asset?.url;
  
  return (
    <FlexCol
      width="100%"
      justifyContent="center"
      backgroundImage={`url(${contentFullImage || fallbackImage.src})`}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundAttachment={!isMobile && 'fixed'}
      position="relative"
    >
      <SectionContainer py="md">
        <Box mt={{ base: 0, md: 20 }} width={{ base: '100%', lg: '50%' }}>
          <TitleWithSubtitleAndDescription
            color={{
              title: colors.white,
              subtitle: colors.white,
              description: colors.white,
            }}
            title={sector.moreDetailsSection.title}
            subtitle={sector.moreDetailsSection.subtitle}
            description={sector.moreDetailsSection.moreDetailsDescription}
          />
        </Box>
      </SectionContainer>
    </FlexCol>
  );
};
