import { links } from 'lib/links';
import React from 'react';
import { Sector } from '../../../page/domain/index';
import Image from 'next/image';
import useBreakpointValue from 'lib/shared-domain/useBreakpoint';
import { FlexCol, Box } from 'components/Layout/Flex/Flex';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { LinkWithArrow } from 'lib/shared-domain/page/presentation/components/LinkWithArrow';
import { TitleWithSubtitleAndDescription } from 'lib/shared-domain/page/presentation/components/TitleWithSubtitleAndDescription';
// import backgroundImage from '../../../../../public/transactionDetail/sector-section-bg.png';
import { colors } from 'styles/foundations/colors';

export const SectorHeader: React.FC<{
  sector: Sector;
  subtitle?: string;
  linkText: string;
}> = ({ sector, subtitle, linkText }) => {
  // const isMobile = useBreakpointValue({ base: true, md: false });
  const isMobile = false;

  if (!sector) return null;

  return (
    <FlexCol
      position="relative"
      width="100%"
      justifyContent="center"
      // backgroundImage={`url(${backgroundImage.src})`}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundAttachment={!isMobile && 'fixed'}
    >
      {!isMobile && sector?.detailPageHeroImage?.asset?.url && (
        <Box
          position="absolute"
          top="100px"
          right="200px"
          width="30%"
          height="70%"
          maxWidth="30%"
          maxHeight="70%"
        >
          {sector?.detailPageHeroImage?.asset?.url ? (
            <Image
              unoptimized
              loading="lazy"
              src={sector?.detailPageHeroImage?.asset?.url}
              alt={sector?.name}
              objectFit="contain"
              layout="fill"
            />
          ) : null}
        </Box>
      )}

      <SectionContainer py="md">
        <Box pt={{ base: 0, md: 8 }} width={{ base: '100%', lg: '50%' }}>
          <TitleWithSubtitleAndDescription
            title={sector?.name}
            description={sector?.description}
            subtitle={subtitle}
            color={{ title: colors.primary.lightGreen }}
          />
        </Box>
        <Box mt={8}>
          <LinkWithArrow href={links().sectors(sector)} title={linkText} />
        </Box>
      </SectionContainer>
    </FlexCol>
  );
};
