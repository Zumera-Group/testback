import { SectionContainer } from 'components/Layout/SectionContainer';
import { H } from 'components/Typography/H';
import { P } from 'components/Typography/P';
import React from 'react';
import { Box, FlexCol } from '../../../../../components/Layout/Flex/Flex';
import { FactsAndFiguresSectionModule } from '../../domain/contentModule';
import { TitleWithSubtitleAndDescription } from '../components/TitleWithSubtitleAndDescription';
import { Fact } from '../../domain/index';
import { colors } from '../../../../../styles/foundations/colors';
import {
  fontSizes,
  fontWeights,
} from '../../../../../styles/foundations/fontStyles';
import { Flex, useBreakpointValue } from '@chakra-ui/react';

export const FactCard: React.FC<{
  fact: Fact;
  borderTop?: string;
  isFirstIndex?: boolean;
}> = ({ fact, borderTop, isFirstIndex }) => {
  // const isMobile = useBreakpointValue({ base: true, lg: false });
  const isMobile = false;

  const BORDER_TOP = borderTop || 'none';
  return (
    <FlexCol
      flex={1}
      mr={{ base: 0, lg: 3 }}
      mb={{ base: 4, lg: 0 }}
      pt={borderTop ? 5 : 1}
      borderTop={BORDER_TOP}
    >
      <H
        mb={{ base: 0, lg: 1 }}
        lineHeight="50px"
        fontWeight={fontWeights.highlight}
        fontSize={isMobile ? fontSizes.mobileWebsiteH1 : '50px'}
      >
        {fact.factTitle}
      </H>
      <Box my={{ base: 1, lg: 2 }}>
        <P
          lineHeight="30px"
          fontWeight={fontWeights.highlight}
          color={colors.text.light}
          fontSize={isMobile ? fontSizes.h3 : fontSizes.h1_2}
        >
          {fact.factSubtitle}
        </P>
      </Box>
      <P
        mt={1}
        fontSize={fontSizes.p}
        fontWeight={fontWeights.regular}
        color={colors.text.light}
      >
        {fact.factDescription[0]?.children[0]?.text}
      </P>
    </FlexCol>
  );
};

export const FactsAndFiguresSection: React.FC<{
  specificContentModule: FactsAndFiguresSectionModule;
}> = ({ specificContentModule }) => {
  // const isMobile = useBreakpointValue({ base: true, lg: false });
  const isMobile = false;

  return (
    <FlexCol>
      <SectionContainer py="lg">
        <Box mb={10} width={{ base: '100%', lg: '50%' }}>
          <TitleWithSubtitleAndDescription {...specificContentModule} />
        </Box>
        <Flex direction={{ base: 'column', lg: 'row' }} w="100%">
          {specificContentModule.facts?.map?.((f, index) => (
            <FactCard key={index} fact={f} isFirstIndex={index === 0} />
          ))}
        </Flex>
      </SectionContainer>
    </FlexCol>
  );
};

export default FactsAndFiguresSection;
