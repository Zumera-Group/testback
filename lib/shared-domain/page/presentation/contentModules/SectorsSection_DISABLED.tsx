import { Flex, SimpleGrid } from '@chakra-ui/react';
import { SectionContainer } from 'components/Layout/SectionContainer';
import React from 'react';
import { Box } from '../../../../../components/Layout/Flex/Flex';
import { SectorsSectionModule } from '../../domain/contentModule';
import { TitleWithSubtitleAndDescription } from '../components/TitleWithSubtitleAndDescription';

import { LinkWithArrow } from '../components/LinkWithArrow';
// import { SectorCard } from 'lib/shared-domain/sectors/presentation/components/SectorCard';

export const SectorsSection: React.FC<{
  specificContentModule: SectorsSectionModule;
}> = ({ specificContentModule }) => {
  const showMoreButton =
    specificContentModule.button?.page?.slug?.current &&
    specificContentModule.button?.text;

  return (
    <SectionContainer py="md">
      <Box mb={8} width={{ base: '100%', lg: '50%' }}>
        <TitleWithSubtitleAndDescription {...specificContentModule} />
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 3 }} spacing={3}>
        {/*{specificContentModule?.sectors?.map((s, index) => (*/}
        {/*  <SectorCard key={index} index={index} sector={s} />*/}
        {/*))}*/}
      </SimpleGrid>
      {showMoreButton && (
        <Flex justify="center" align="center" mt={{ base: 4, md: 7 }}>
          <LinkWithArrow
            title={specificContentModule.button?.text}
            href={specificContentModule.button?.page?.slug?.current}
          />
        </Flex>
      )}
    </SectionContainer>
  );
};

export default SectorsSection;
