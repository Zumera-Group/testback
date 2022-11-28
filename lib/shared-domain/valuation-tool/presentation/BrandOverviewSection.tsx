import { Box, Grid, GridItem, Image } from '@chakra-ui/react';

import { FlexRow } from 'components/Layout/Flex/Flex';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { SanityBlockContent } from 'components/SanityBlockContent';
import { P } from 'components/Typography/P';
import { BrandOverviewSectionModule } from 'lib/shared-domain/page/domain/contentModule';
import { TitleWithSubtitleAndDescription } from 'lib/shared-domain/page/presentation/components/TitleWithSubtitleAndDescription';
import React from 'react';

export const BrandOverviewSection: React.FC<{
  specificContentModule: BrandOverviewSectionModule;
}> = ({ specificContentModule }) => {
  return (
    <SectionContainer>
      <TitleWithSubtitleAndDescription
        subtitle={specificContentModule.subtitle}
        title={specificContentModule.title}
      />
      <Grid
        mt={8}
        templateColumns={{
          base: '1fr',
          lg: '1fr 1fr',
        }}
        gap={{ base: 0, lg: 4 }}
      >
        {specificContentModule?.brands?.map((t, i) => (
          <GridItem key={i}>
            <FlexRow alignItems="center">
              {t?.image?.asset?.url && (
                <Box flexShrink={0} width="200px" position="relative">
                  <Image
                    layout="fill"
                    objectFit="contain"
                    alt=""
                    src={t?.image?.asset?.url}
                  />
                </Box>
              )}
              {t.description && (
                <Box>
                  <P
                    whiteSpace="pre-wrap"
                    style={{ hyphens: 'manual', maxWidth: '100%' }}
                  >
                    {Array.isArray(t.description) ? (
                      <SanityBlockContent text={t.description} />
                    ) : (
                      t.description
                    )}
                  </P>
                </Box>
              )}
            </FlexRow>
          </GridItem>
        ))}
      </Grid>
    </SectionContainer>
  );
};
