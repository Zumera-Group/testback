import { Box, Button, Grid, GridItem, Image } from '@chakra-ui/react';
import { FlexCol } from 'components/Layout/Flex/Flex';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { TopicList } from 'lib/shared-domain/page/presentation/components/TopicList';
import { useRouter } from 'next/router';
import { colors } from 'styles/foundations/colors';
import { LandingPageEnterSurveySectionModule } from '../../../page/domain/contentModule';
import { TitleWithSubtitleAndDescription } from '../../../page/presentation/components/TitleWithSubtitleAndDescription';

export const LandingPageEnterSurveySection: React.FC<{
  specificContentModule: LandingPageEnterSurveySectionModule;
}> = ({ specificContentModule }) => {
  const {
    bgImage,
    image,
    description,
    title,
    topics,
    iconTopics,
    buttonTarget,
    buttonText,
  } = specificContentModule;

  const router = useRouter();
  const page = router.locale === 'en' ? 'questionnaires' : 'fragenkatalog';

  const targetButtonLink =
    '/' +
    router.locale +
    '/' +
    page +
    '/' +
    buttonTarget?.questionnaireSlug?.current;

  return (
    <FlexCol
      backgroundImage={{ base: 'none', lg: `url(${bgImage?.asset?.url})` }}
      backgroundPosition="right center"
      backgroundSize="50%"
      backgroundRepeat="no-repeat"
      py="lg"
      px="md"
    >
      <SectionContainer py="lg">
        <Grid
          templateColumns={{
            base: '1fr',
            lg: '1fr 1fr',
          }}
          gap={6}
        >
          <GridItem>
            <TitleWithSubtitleAndDescription
              description={description}
              title={title}
            />
            <TopicList
              textColor={colors.primary.darkGreen}
              topics={topics}
              listIcon={iconTopics?.iconImage?.asset?.url}
            />
            <Button
              ml={6}
              width={200}
              variant="solid"
              mt={6}
              href={targetButtonLink}
              as="a"
            >
              {buttonText}
            </Button>
          </GridItem>

          {/* Desktop */}
          <GridItem alignSelf="center" display={{ base: 'none', lg: 'grid' }}>
            {image?.asset?.url && (
              <>
                <Box width="100%" height="100%" position="relative" pl={4}>
                  <Image
                    margin="auto"
                    objectFit="contain"
                    src={image?.asset?.url}
                    alt={``}
                    // layout="fill"
                  />
                </Box>
              </>
            )}
          </GridItem>

          {/* Mobile */}
          <GridItem
            display={{ base: 'grid', lg: 'none' }}
            textAlign="center"
            backgroundImage={`url(${bgImage?.asset?.url})`}
            backgroundPosition="center"
            backgroundSize="100%"
            backgroundRepeat="no-repeat"
            py="lg"
            px="md"
          >
            {image?.asset?.url && (
              <Box width="100%" height="100%" position="relative" pl={4}>
                <Image
                  margin="auto"
                  objectFit="contain"
                  src={image?.asset?.url}
                  alt={``}
                  // layout="fill"
                />
              </Box>
            )}
          </GridItem>
        </Grid>
      </SectionContainer>
    </FlexCol>
  );
};
