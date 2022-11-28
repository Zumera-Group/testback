import { PartnerAboutModule } from '../../../page/domain/contentModule';
import { P } from '../../../../../components/Typography/P';
import { TitleWithSubtitleAndDescription } from '../../../page/presentation/components/TitleWithSubtitleAndDescription';
import { colors } from '../../../../../styles/foundations/colors';
import {
  fontSizes,
  fontWeights,
} from '../../../../../styles/foundations/fontStyles';
import { FlexCol } from 'components/Layout/Flex/Flex';
import { SectionContainer } from '../../../../../components/Layout/SectionContainer';
import { Box, Grid, GridItem, Image } from '@chakra-ui/react';

export const PartnerAbout: React.FC<{
  specificContentModule: PartnerAboutModule;
}> = ({ specificContentModule }) => {
  const texts = [
    specificContentModule.aboutText1,
    specificContentModule.aboutText3,
    specificContentModule.aboutText2,
    specificContentModule.aboutText4,
  ];

  const texts2 = [
    specificContentModule.textWithIcon1?.title,
    specificContentModule.textWithIcon2?.title,
    specificContentModule?.textWithIcon3?.title,
    specificContentModule?.textWithIcon4?.title,
  ]?.filter((e) => !!e);

  const icons = [
    specificContentModule?.textWithIcon1?.icon?.iconImage?.asset.url,
    specificContentModule?.textWithIcon2?.icon?.iconImage?.asset.url,
    specificContentModule?.textWithIcon3?.icon?.iconImage?.asset?.url,
    specificContentModule?.textWithIcon4?.icon?.iconImage?.asset?.url,
  ]?.filter((e) => !!e);

  return (
    <SectionContainer py="lg" px="md">
      <FlexCol>
        {specificContentModule?.topImage?.asset?.url && (
          <FlexCol mb={6} alignItems="flex-end">
            <Box>
              <Image
                alt=""
                src={specificContentModule.topImage.asset.url}
                w="160px"
              />
            </Box>
          </FlexCol>
        )}

        <TitleWithSubtitleAndDescription
          subtitle={specificContentModule.subtitle}
          title={specificContentModule.title}
        />
        <Grid
          templateColumns={{
            base: 'repeat(auto-fit, minmax(330px, 1fr))',
            lg: '1fr 1fr',
          }}
          gap={4}
        >
          {texts.map((t, index) => (
            <GridItem key={index} alignContent="center">
              <P
                style={
                  index == 0
                    ? { fontWeight: fontWeights.bold }
                    : { fontWeight: fontWeights.regular }
                }
                fontSize={fontSizes.h3}
                color={colors.text.light}
              >
                {t}
              </P>
            </GridItem>
          ))}
        </Grid>
        <Grid
          templateColumns={{
            base: '1fr',
            lg: icons.length === 4 ? '1fr 1fr 1fr 1fr' : '1fr 1fr 1fr',
          }}
          textAlign={{ base: 'left', lg: 'center' }}
          alignItems={{ base: 'center', lg: 'baseline' }}
          mt="5em"
          gap={10}
        >
          {texts2.map((t, i) => (
            <GridItem
              key={t}
              alignItems={{ base: 'center', lg: 'baseline' }}
              display={{
                base: 'flex',
                lg: 'grid',
              }}
            >
              <Box display="flex" justifyContent="center">
                {icons[i] && (
                  <Image
                    alt=""
                    src={icons[i]}
                    h="60px"
                    maxW="60px"
                    w="fit-content"
                  />
                )}
              </Box>
              <P
                p="1em"
                ml={{ base: '1em', lg: '0em' }}
                fontSize={fontSizes.h3}
                color={colors.text.light}
              >
                {t}
              </P>
            </GridItem>
          ))}
        </Grid>
      </FlexCol>
    </SectionContainer>
  );
};
