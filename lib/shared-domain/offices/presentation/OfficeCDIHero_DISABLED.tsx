import { SectionContainer } from 'components/Layout/SectionContainer';
import React from 'react';
import { FlexCol, Box } from '../../../../components/Layout/Flex/Flex';
import { TitleWithSubtitleAndDescription } from '../../page/presentation/components/TitleWithSubtitleAndDescription';
import { colors } from '../../../../styles/foundations/colors';
import { Office } from '../domain/index';
import { P } from '../../../../components/Typography/P';
import backgroundImage from 'public/cdiDetail/hero-bg.jpg';
import { useBreakpointValue } from '@chakra-ui/react';

export const OfficeCDIHero: React.FC<{
  office: Office;
  subtitle: string;
}> = ({ office, subtitle }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <FlexCol
      width="100%"
      justifyContent="center"
      backgroundImage={`url(${backgroundImage.src})`}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundAttachment={!isMobile && 'fixed'}
      position="relative"
    >
      <SectionContainer py="lg">
        <Box mt={{ base: 8, lg: 10 }} width={{ base: '100%', lg: '50%' }}>
          <TitleWithSubtitleAndDescription
            color={{ title: colors.white, subtitle: colors.white }}
            title={office?.city}
            subtitle={subtitle}
            headingType="h1"
          />
          <FlexCol>
            <P
              variant="globalNetworkOfficeItemContent"
              color={colors.white}
            >{`${office.street} ${office.houseNumber}`}</P>
            <P variant="globalNetworkOfficeItemContent" color={colors.white}>
              {`${office.zipCode} ${office.city}`}
            </P>
            <P variant="globalNetworkOfficeItemContent" color={colors.white}>
              {office.country}
            </P>
          </FlexCol>
        </Box>
      </SectionContainer>
    </FlexCol>
  );
};
