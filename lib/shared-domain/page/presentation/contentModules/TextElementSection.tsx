import { Box, SimpleGrid } from '@chakra-ui/react';
import useBreakpointValue from 'lib/shared-domain/useBreakpoint';
import { P } from 'components/Typography/P';
import React from 'react';
import { SectionContainer } from '../../../../../components/Layout/SectionContainer';
import { TextElementSectionModule } from '../../domain/contentModule';
import { colors } from '../../../../../styles/foundations/colors';
import { fontSizes } from '../../../../../styles/foundations/fontStyles';

export const TextElementSection: React.FC<{
  specificContentModule: TextElementSectionModule;
}> = ({ specificContentModule }) => {
  const firstBlock = specificContentModule.firstBlock[0].children[0].text;
  const secondBlock = specificContentModule.secondBlock[0].children[0].text;
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const TEXT_VARIANT = isMobile
    ? 'mobileTextElementSectionFirstBlockP'
    : 'textElementSectionFirstBlockP';

  return (
    <SectionContainer py="md">
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 4, lg: 8 }}>
        <Box>
          <P
            fontSize={fontSizes.h2}
            variant={TEXT_VARIANT}
            color={colors.text.light}
          >
            {firstBlock}
          </P>
        </Box>
        <Box maxW={isMobile ? '100%' : '500px'}>
          <P
            fontSize={fontSizes.h2}
            variant={TEXT_VARIANT}
            color={colors.text.light}
          >
            {secondBlock}
          </P>
        </Box>
      </SimpleGrid>
    </SectionContainer>
  );
};

export default TextElementSection;
