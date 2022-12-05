import React from 'react';
import { LandingPageOurPromiseSectionModule } from '../../domain/contentModule';
import { TitleWithSubtitleAndDescription } from '../components/TitleWithSubtitleAndDescription';

import { Grid, GridItem, Text } from '@chakra-ui/react';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { colors } from 'styles/foundations/colors';
import { H } from 'components/Typography/H';
import { fontSizes, fontWeights } from 'styles/foundations/fontStyles';
import { FlexCol } from 'components/Layout/Flex/Flex';
import { TopicList } from '../components/TopicList';
import { SanityBlockContent } from 'components/SanityBlockContent';

export const LandingPageOurPromiseSection: React.FC<{
  specificContentModule: LandingPageOurPromiseSectionModule;
}> = ({ specificContentModule }) => {
  const {
    title,
    description,
    topics,
    iconTopics,
    firstText,
    secondText,
    bgImage,
  } = specificContentModule;

  const colorsText = {
    title: colors.white,
    description: colors.white,
    default: colors.primary.darkGreen,
    headerTitle: colors.black,
  };

  return (
    <FlexCol
      backgroundImage={`linear-gradient(90deg,black,
        rgba(0, 29, 26, 0.95),
        rgba(0, 29, 26, 0.68),
        transparent),url(${bgImage?.asset?.url})`}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      py="lg"
      px="md"
    >
      <SectionContainer py="lg" px="md">
        <Grid
          templateColumns={{
            base: 'repeat(auto-fit, minmax(330px, 1fr))',
            lg: '1fr 1fr',
          }}
          gap={6}
        >
          <GridItem>
            <TitleWithSubtitleAndDescription
              description={description}
              title={title}
              color={colorsText}
            />
          </GridItem>

          <GridItem bgColor={colors.white} p="3em">
            <H
              mb="1em"
              color={colorsText.headerTitle}
              fontWeight={fontWeights.semiBold}
              fontSize={fontSizes.h1}
            >
              {firstText}
            </H>

            <Text
              color={colorsText.default}
              fontWeight={fontWeights.regular}
              fontSize={fontSizes.h3}
            >
              {Array.isArray(secondText) ? (
                <SanityBlockContent text={secondText} />
              ) : (
                secondText
              )}
            </Text>
            <TopicList
              textColor={colors.primary.darkGreen}
              topics={topics}
              listIcon={iconTopics?.iconImage?.asset?.url}
            />
          </GridItem>
        </Grid>
      </SectionContainer>
    </FlexCol>
  );
};
