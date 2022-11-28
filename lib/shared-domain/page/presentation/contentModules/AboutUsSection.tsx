import { Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';
import { Box, FlexCol, FlexRow } from 'components/Layout/Flex/Flex';
import { P } from 'components/Typography/P';
import React from 'react';

import { AboutUsSectionModule } from '../../domain/contentModule';
import { LinkWithArrow } from '../components/LinkWithArrow';
import { TitleWithSubtitleAndDescription } from '../components/TitleWithSubtitleAndDescription';

import { icons } from '../../../../../components/Icons/index';
import { H } from 'components/Typography/H';
import { fontWeights } from '../../../../../styles/foundations/fontStyles';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { SanityBlockContent } from 'components/SanityBlockContent';
import { colors } from 'styles/foundations/colors';

export const AboutUsSection: React.FC<{
  specificContentModule: AboutUsSectionModule;
}> = ({ specificContentModule }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <FlexCol
      backgroundImage={`url(${specificContentModule.getBackgroundImage()})`}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundAttachment={!isMobile && 'fixed'}
    >
      <SectionContainer py="md">
        <Box width={{ base: '100%', lg: '50%' }}>
          <TitleWithSubtitleAndDescription
            {...specificContentModule}
            description={[]}
          />
        </Box>
        <Grid templateColumns="repeat(auto-fit, minmax(330px, 1fr))" gap={12}>
          <GridItem>
            <SanityBlockContent text={specificContentModule.description} />

            <Box mt={4}>
              <LinkWithArrow
                href={specificContentModule?.link?.page?.slug?.current}
                title={specificContentModule?.link?.title}
              />
            </Box>
          </GridItem>
          <GridItem>
            <Box>
              {specificContentModule?.bulletPoints?.map((b, index) => (
                <Box mb={4} key={index}>
                  <H fontSize="24px" fontWeight={fontWeights.highlight} mb={1}>
                    {b.title}
                  </H>
                  {b.texts.map((t, index) => (
                    <FlexRow mb={2} key={index} alignItems="center">
                      <Box
                        transform="rotate(180deg)"
                        style={{ marginBottom: '-4px' }}
                      >
                        <icons.ChevronLeft color="black" />
                      </Box>
                      <P color={colors.text.light} ml={2}>
                        {t}
                      </P>
                    </FlexRow>
                  ))}
                </Box>
              ))}
            </Box>
          </GridItem>
        </Grid>
      </SectionContainer>
    </FlexCol>
  );
};

export default AboutUsSection;
