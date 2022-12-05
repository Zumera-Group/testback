import { Grid, GridItem, Box } from '@chakra-ui/react';
import React from 'react';
import Image from 'next/image';

import { TitleTextAndImageSectionModule } from '../../domain/contentModule';

import { SectionContainer } from 'components/Layout/SectionContainer';
import { TitleWithSubtitleAndDescription } from '../components/TitleWithSubtitleAndDescription';

export const TitleTextAndImageSection: React.FC<{
  specificContentModule: TitleTextAndImageSectionModule;
}> = ({ specificContentModule }) => {
  return (
    <SectionContainer py="lg">
      <Grid
        templateColumns={{
          base: 'repeat(auto-fit, minmax(330px, 1fr))',
          lg: '1fr 1fr',
        }}
        gap={6}
      >
        <GridItem>
          <TitleWithSubtitleAndDescription
            title={specificContentModule.title}
            description={specificContentModule.description}
          />
        </GridItem>
        <GridItem>
          {specificContentModule?.image?.asset?.url && (
            <Box width="100%" height="100%" position="relative" pl={4}>
              <Image
                unoptimized
                objectFit="contain"
                src={specificContentModule?.image?.asset?.url}
                alt={``}
                layout="fill"
              />
            </Box>
          )}
        </GridItem>
      </Grid>
    </SectionContainer>
  );
};

export default TitleTextAndImageSection;
