import React from 'react';

import { Box } from '@chakra-ui/react';
import useBreakpointValue from 'lib/shared-domain/useBreakpoint';
import { colors } from '../../../../../../styles/foundations/colors';
import { TimelineSectionModule } from '../../../domain/contentModule';
import { TitleWithSubtitleAndDescription } from '../../components/TitleWithSubtitleAndDescription';
import { AccordionMobile } from './AccordionMobile';
import { TimelineLayout } from './TimelineLayout';
import { SectionContainer } from 'components/Layout/SectionContainer';

const TimelineLine = () => {
  return (
    <>
      <Box
        borderBottom={`2px solid ${colors.primary.darkGreen}`}
        position="absolute"
        w={'75%'}
        h={1}
        bottom={0}
        left={0}
      ></Box>
      <Box
        h={1}
        w={'25%'}
        borderBottom={`2px dashed ${colors.primary.darkGreen}`}
        position="absolute"
        bottom={0}
        right={0}
      ></Box>
    </>
  );
};

export const TimelineSection: React.FC<{
  specificContentModule: TimelineSectionModule;
}> = ({ specificContentModule }) => {
  const { linkText, services } = specificContentModule;
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box position="relative" my={10}>
      {!isMobile && <TimelineLine />}
      <SectionContainer>
        <Box mb={8} width={{ base: '100%', lg: '50%' }}>
          <TitleWithSubtitleAndDescription {...specificContentModule} />
        </Box>
        {isMobile ? (
          <AccordionMobile
            services={services}
            specificContentModule={specificContentModule}
          />
        ) : null}
        {!isMobile ? (
          <TimelineLayout services={services} linkText={linkText} />
        ) : null}
      </SectionContainer>
    </Box>
  );
};

export default TimelineSection;