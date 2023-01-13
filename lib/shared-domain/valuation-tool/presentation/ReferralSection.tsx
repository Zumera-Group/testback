import { Box, Grid, GridItem, Image } from '@chakra-ui/react';
import { FlexCol } from 'components/Layout/Flex/Flex';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { P } from 'components/Typography/P';
import { ReferralSectionModule } from 'lib/shared-domain/page/domain/contentModule';
import { TitleWithSubtitleAndDescription } from 'lib/shared-domain/page/presentation/components/TitleWithSubtitleAndDescription';
import React from 'react';
import { fontSizes } from '../../../../styles/foundations/fontStyles';
import { colors } from '../../../../styles/foundations/colors';

const Quote: React.FC<{
  quote: string;
  author: string;
  source: string;
  rating: {
    asset: {
      url: string;
    };
  };
  starAlignRight?: boolean;
}> = (params) => {
  return (
    <FlexCol>
      {params?.rating?.asset?.url && (
        <FlexCol alignItems={params.starAlignRight && 'flex-end'}>
          <Box mb={4} height="20px" position="relative">
            <Image
              // layout="fill"
              objectFit="contain"
              alt=""
              src={params?.rating?.asset?.url}
            />
          </Box>
        </FlexCol>
      )}

      <P mb={4}>{params.quote}</P>
      <P
        fontWeight="700"
        color={colors.primary.darkGreen}
        fontSize={fontSizes.small}
      >
        {params.author}
      </P>
      <P color={colors.text.light} fontSize={fontSizes.tiny} mb={4}>
        {params.source}
      </P>
    </FlexCol>
  );
};

export const ReferralSection: React.FC<{
  specificContentModule: ReferralSectionModule;
}> = ({ specificContentModule }) => {
  return (
    <SectionContainer>
      <TitleWithSubtitleAndDescription
        subtitle={''}
        title={specificContentModule.title}
      />
      <Grid
        mt={8}
        templateColumns={{
          base: '1fr',
          lg: '1fr 1fr',
        }}
        gap={{ base: 0, lg: 12 }}
      >
        <GridItem>
          <Quote {...specificContentModule.review1} />
        </GridItem>
        <GridItem mt={{ base: 4, lg: 20 }}>
          <Quote {...specificContentModule.review2} starAlignRight />
        </GridItem>
      </Grid>
    </SectionContainer>
  );
};
