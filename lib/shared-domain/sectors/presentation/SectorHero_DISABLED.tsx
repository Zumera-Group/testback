import React from 'react';

import backgroundImage from '../../../../public/sectorDetail/hero-bg.png';
import { Box, FlexCol } from 'components/Layout/Flex/Flex';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { HEADER_HEIGHT } from '../../page/constants';
import Image from 'next/image';

import { Sector } from '../../page/domain/index';
import { TitleWithSubtitleAndDescription } from '../../page/presentation/components/TitleWithSubtitleAndDescription';
import { colors } from 'styles/foundations/colors';
import { fontSizes, fontWeights } from 'styles/foundations/fontStyles';
import { P } from 'components/Typography/P';
import { Flex } from '@chakra-ui/react';
import useBreakpointValue from 'lib/shared-domain/useBreakpoint';
import { getEmployeeFullName } from 'lib/shared-domain/employees/domain/getEmployeeFullName';
import { useFormatDate } from 'lib/shared-domain/useFormatDate';

const TitleWithText: React.FC<{
  title: string;
  text: string;
}> = ({ title, text }) => {
  return (
    <FlexCol mb={4} flexBasis="30%">
      <P
        mb={2}
        fontSize={fontSizes.small}
        color={colors.primary.darkGreen}
        fontWeight={fontWeights.bold}
      >
        {title}
      </P>
      <P>{text}</P>
    </FlexCol>
  );
};

export const SectorHero: React.FC<{ sector: Sector; content: any }> = ({
  sector,
  content,
}) => {
  const format = useFormatDate();
  const contributorsAsText = sector.contributors
    ?.map((c) => getEmployeeFullName(c))
    .join(', ');
  // const displayLogo = useBreakpointValue({ base: false, lg: true });
  const displayLogo = false;
  const t = (item) => content?.[item];
  // const isMobile = useBreakpointValue({ base: true, md: false });
  const isMobile = false;

  return (
    <FlexCol
      width="100%"
      justifyContent="center"
      backgroundImage={`url(${backgroundImage.src})`}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      position="relative"
      backgroundAttachment={!isMobile && 'fixed'}
    >
      <SectionContainer py="md">
        <Box mt={HEADER_HEIGHT}>
          <Flex>
            <Box mt={{ base: 0, lg: 10 }} width={{ base: '100%', lg: '50%' }}>
              <TitleWithSubtitleAndDescription
                color={{ title: colors.primary.darkGreen }}
                title={sector.name}
                description={sector.description}
                headingType="h1"
              />
            </Box>
            {displayLogo && sector.detailPageHeroImage?.asset?.url && (
              <Flex justify="center" align="flex-start" w="50%">
                <Image unoptimized
                  src={sector.detailPageHeroImage?.asset?.url}
                  alt=""
                  height="350px"
                  width="350px"
                />
              </Flex>
            )}
          </Flex>
          <Flex mt={8} width="100%" direction={{ base: 'column', md: 'row' }}>
            {sector.date && (
              <TitleWithText
                title={t('lateUpdate')}
                text={sector.date && format(new Date(sector.date))}
              />
            )}
            {sector.type && (
              <TitleWithText title={t('type')} text={sector.type} />
            )}
            {contributorsAsText && (
              <TitleWithText
                title={t('contributors')}
                text={contributorsAsText}
              />
            )}
          </Flex>
        </Box>
      </SectionContainer>
    </FlexCol>
  );
};
