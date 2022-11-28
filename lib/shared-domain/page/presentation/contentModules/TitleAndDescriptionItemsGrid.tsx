import { SectionContainer } from 'components/Layout/SectionContainer';
import { H } from 'components/Typography/H';
import { P } from 'components/Typography/P';
import React from 'react';
import { Box, FlexCol } from '../../../../../components/Layout/Flex/Flex';
import { TitleAndDescriptionItemsGridModule } from '../../domain/contentModule';
import { TitleWithSubtitleAndDescription } from '../components/TitleWithSubtitleAndDescription';
import {
  fontSizes,
  fontWeights,
} from '../../../../../styles/foundations/fontStyles';
import { Grid, GridItem } from '@chakra-ui/react';

export const TitleAndDescriptionItemsGrid: React.FC<{
  specificContentModule: TitleAndDescriptionItemsGridModule;
}> = ({ specificContentModule }) => {
  return (
    <FlexCol>
      <SectionContainer py="lg">
        <Box mb={8} width={{ base: '100%', lg: '50%' }}>
          <TitleWithSubtitleAndDescription {...specificContentModule} />
        </Box>
        <Grid templateColumns="repeat(auto-fit, minmax(330px, 1fr))" gap="2rem">
          {specificContentModule.items.map((item) => (
            <GridItem key={item.title + item.description}>
              <P fontSize={fontSizes.h3} fontWeight={fontWeights.highlight}>
                {item.title}
              </P>
              <P mt={1.5}>{item.description}</P>
            </GridItem>
          ))}
        </Grid>
      </SectionContainer>
    </FlexCol>
  );
};

export default TitleAndDescriptionItemsGrid;
