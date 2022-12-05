import { Box, Button, Grid, GridItem } from '@chakra-ui/react';
import { PartnerStrategyModule } from '../../../page/domain/contentModule';
import { TitleWithSubtitleAndDescription } from '../../../page/presentation/components/TitleWithSubtitleAndDescription';
import { fontSizes } from '../../../../../styles/foundations/fontStyles';
import { P } from '../../../../../components/Typography/P';
import { colors } from '../../../../../styles/foundations/colors';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { TopicList } from 'lib/shared-domain/page/presentation/components/TopicList';
import { FlexCol } from 'components/Layout/Flex/Flex';

export const PartnerStrategic: React.FC<{
  specificContentModule: PartnerStrategyModule;
}> = ({ specificContentModule }) => {
  const texts = [specificContentModule.text1, specificContentModule.text2];
  const { cardLeftText, topics, iconTopics } = specificContentModule;

  return (
    <SectionContainer>
      <FlexCol>
        <TitleWithSubtitleAndDescription
          title={specificContentModule.title}
          subtitle={specificContentModule.subtitle}
        />
        <Box pb="3em">
          {texts.map((t) => (
            <P fontSize={fontSizes.h3} key={t} color="text.light">
              {t}
            </P>
          ))}
        </Box>

        <Grid
          p="3em"
          boxShadow="var(--shadow-1)"
          templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
          gap={3}
          mt="1em"
        >
          <GridItem>
            <P
              color={colors.primary.darkGreen}
              fontWeight="bold"
              fontSize={fontSizes.h1_2}
            >
              {cardLeftText}
            </P>
          </GridItem>
          <GridItem pl={{ base: '0em', lg: '3em' }}>
            <TopicList
              topics={topics}
              listIcon={iconTopics?.iconImage?.asset?.url}
              ulStyle={{ marginTop: '-1em' }}
              liStyle={{ marginTop: '2em' }}
            />
            <Button
              mt={4}
              width={200}
              variant="solid"
              ml="3em"
              href={specificContentModule.cardButtonUrl}
              as="a"
            >
              {specificContentModule.cardButtonText}
            </Button>
          </GridItem>
        </Grid>
      </FlexCol>
    </SectionContainer>
  );
};
