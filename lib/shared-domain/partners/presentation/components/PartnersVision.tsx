import { PartnerVisionModule } from '../../../page/domain/contentModule';
import { P } from '../../../../../components/Typography/P';
import { TitleWithSubtitleAndDescription } from '../../../page/presentation/components/TitleWithSubtitleAndDescription';
import { colors } from '../../../../../styles/foundations/colors';
import { fontSizes } from '../../../../../styles/foundations/fontStyles';
import PartnersVisionBg from './PartnersVisionBg.png';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { Box, FlexCol, FlexRow } from 'components/Layout/Flex/Flex';
import { Grid, GridItem } from '@chakra-ui/react';
import { useIsIpad } from '../../../useDevice';
import { icons } from 'components/Icons';
import { SanityBlockContent } from 'components/SanityBlockContent';

export const PartnersVision: React.FC<{
  specificContentModule: PartnerVisionModule;
}> = ({ specificContentModule }) => {
  const isIpad = useIsIpad();

  const color = specificContentModule?.image?.asset?.url
    ? colors.text.light
    : colors.white;

  return (
    <FlexCol
      py="3em"
      mt="6em"
      mb="0"
      style={{
        backgroundImage: `url(${
          specificContentModule?.image?.asset?.url
            ? specificContentModule?.image?.asset?.url
            : PartnersVisionBg.src
        })`,
        width: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      backgroundAttachment={isIpad ? 'initial' : 'fixed'}
      backgroundSize="cover"
    >
      <SectionContainer>
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }}>
          <GridItem>
            <TitleWithSubtitleAndDescription
              subtitle={specificContentModule.subtitle}
              title={specificContentModule.title}
              color={{
                subtitle: color,
                title: specificContentModule?.image?.asset?.url
                  ? colors.black
                  : colors.white,
              }}
            />
            <P fontSize={fontSizes.h3} color={color} fontWeight="bold">
              {specificContentModule.boldText}
            </P>
            <P fontSize={fontSizes.h3} mt={4} color={color}>
              {specificContentModule.normalText}
            </P>
            {specificContentModule?.bulletPoints?.map((b, index) => (
              <FlexRow key={index} mt={4}>
                <FlexCol flexShrink={0} mr={2} mt={1}>
                  <icons.TransactionX
                    color={
                      specificContentModule?.image?.asset?.url
                        ? colors.primary.darkGreen
                        : colors.white
                    }
                    size="14px"
                    strokeW="14px"
                  />
                </FlexCol>
                <FlexCol>
                  <P
                    fontSize={fontSizes.h3}
                    color={
                      specificContentModule?.image?.asset?.url
                        ? colors.primary.darkGreen
                        : colors.white
                    }
                    fontWeight="bold"
                  >
                    {b.title}
                  </P>
                  {b.description && (
                    <Box>
                      <P
                        whiteSpace="pre-wrap"
                        color={color}
                        fontSize={fontSizes.h3}
                        style={{ hyphens: 'manual', maxWidth: '100%' }}
                      >
                        {Array.isArray(b.description) ? (
                          <SanityBlockContent text={b.description} />
                        ) : (
                          b.description
                        )}
                      </P>
                    </Box>
                  )}
                </FlexCol>
              </FlexRow>
            ))}
          </GridItem>
          <GridItem />
        </Grid>
      </SectionContainer>
    </FlexCol>
  );
};
