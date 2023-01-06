import { useBreakpointValue } from '@chakra-ui/react';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { H } from 'components/Typography/H';

import React from 'react';
import { colors } from 'styles/foundations/colors';
import { Box, FlexCol } from '../../../../../components/Layout/Flex/Flex';
import { HeadlineWithBackgroundSectionModule } from '../../domain/contentModule';
import { fonts } from '../../../../../styles/foundations/fontStyles';

export const HeadlineWithBackgroundSection: React.FC<{
  specificContentModule: HeadlineWithBackgroundSectionModule;
}> = ({ specificContentModule }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <FlexCol
      width="100%"
      justifyContent="center"
    >
      <SectionContainer py="xl">
        <Box py={{ base: 4, lg: 0 }} textAlign="center">
          <H
            fontSize={isMobile ? '50px' : '80px'}
            fontFamily={fonts.condor}
            color={colors.white}
          >
            {specificContentModule.title}
          </H>
        </Box>
      </SectionContainer>
    </FlexCol>
  );
};

export default HeadlineWithBackgroundSection;
