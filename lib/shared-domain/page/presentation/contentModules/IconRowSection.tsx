import { Grid } from '@chakra-ui/react';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { SanityBlockContent } from 'components/SanityBlockContent';
import { P } from 'components/Typography/P';
import Image from 'next/image';

import React from 'react';
import { colors } from 'styles/foundations/colors';
import { fontSizes } from 'styles/foundations/fontStyles';
import { Box, FlexCol } from '../../../../../components/Layout/Flex/Flex';
import { IconRowSectionModule } from '../../domain/contentModule';

export const IconRowSection: React.FC<{
  specificContentModule: IconRowSectionModule;
}> = ({ specificContentModule }) => {
  return (
    <SectionContainer py="lg">
      <Grid
        templateColumns={{
          base: 'repeat(auto-fit, minmax(300px, 1fr))',
          xl: 'repeat(4, minmax(100px, 1fr))',
        }}
        gap={4}
      >
        {specificContentModule.iconRows?.map((s, index) => (
          <Box textAlign="center" key={index}>
            <FlexCol
              mx="auto"
              alignItems="center"
              justifyContent="center"
              mb={3}
              position="relative"
              width="65px"
              height="65px"
              borderRadius="100%"
              backgroundColor={colors.primary.lightestGreen}
              border="1px solid"
              borderColor={colors.primary.darkestGreen}
            >
              {s?.icon?.iconImage?.asset?.url && (
                <Box width="40px" height="40px" position="relative">
                  <Image
                    unoptimized
                    objectFit="contain"
                    src={s.icon.iconImage.asset.url}
                    alt={``}
                    layout="fill"
                  />
                </Box>
              )}
            </FlexCol>
            <P
              color={colors.primary.darkestGreen}
              mb={1}
              fontSize={fontSizes.h1_2}
              fontWeight="600"
            >
              {s.title}
            </P>
            <P color={colors.text.light}>
              {Array.isArray(s.description) ? (
                <SanityBlockContent text={s.description} />
              ) : (
                s.description
              )}
            </P>
          </Box>
        ))}
      </Grid>
    </SectionContainer>
  );
};

export default IconRowSection;
