import React from 'react';
import { FactsAndNumbersCDISectionModule } from '../../domain/contentModule';
import { FlexCol, Box } from '../../../../../components/Layout/Flex/Flex';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { TitleWithSubtitleAndDescription } from '../components/TitleWithSubtitleAndDescription';
import { SimpleGrid } from '@chakra-ui/react';
import { FactCard } from './FactsAndFiguresSection';
import { colors } from 'styles/foundations/colors';

export const FactsAndNumbersCDISection: React.FC<{
  specificContentModule: FactsAndNumbersCDISectionModule;
}> = ({ specificContentModule }) => {
  return (
    <FlexCol>
      <SectionContainer py="md">
        <Box mb={8} width={{ base: '100%', lg: '50%' }}>
          <TitleWithSubtitleAndDescription {...specificContentModule} />
        </Box>

        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={{ base: 3, lg: 8 }}>
          {specificContentModule.facts?.map?.((f, index) => (
            <FactCard
              key={index}
              fact={f}
              borderTop={`2px solid ${colors.black}`}
              isFirstIndex={index < 3}
            />
          ))}
        </SimpleGrid>
      </SectionContainer>
    </FlexCol>
  );
};

export default FactsAndNumbersCDISection;