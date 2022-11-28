import { PartnerAboutWithImageModule } from '../../../page/domain/contentModule';
import { TitleWithSubtitleAndDescription } from '../../../page/presentation/components/TitleWithSubtitleAndDescription';
import { fontSizes } from '../../../../../styles/foundations/fontStyles';
import { useIsIpad } from '../../../useDevice';
import { FlexCol } from 'components/Layout/Flex/Flex';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { Grid, GridItem } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { colors } from 'styles/foundations/colors';

export const PartnersAboutWithImage: React.FC<{
  specificContentModule: PartnerAboutWithImageModule;
}> = ({ specificContentModule }) => {
  const { description, image, title } = specificContentModule;
  const isIpad = useIsIpad();

  const styleProps = (backgroundImg, position = 'right') => ({
    backgroundImage: `url(${backgroundImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: position,
    backgroundAttachment: isIpad ? 'initial' : 'fixed',
  });

  // Get the height of the bg depending the height of the content on resize
  const sectionRef = useRef(undefined);
  const [height, setHeight] = useState(undefined);
  useEffect(() => {
    window.addEventListener('resize', () =>
      setHeight(sectionRef?.current?.clientHeight),
    );
    setHeight(sectionRef?.current?.clientHeight);
  }, [sectionRef]);

  return (
    <>
      {/* DESKTOP */}
      <SectionContainer>
        <Grid
          display={{ base: 'none', lg: 'grid' }}
          templateColumns="1fr 1fr"
          mt="3em"
          ref={sectionRef}
          gap={8}
        >
          <GridItem pt="3em" pb="3em" mt="3em" mb="3em">
            <TitleWithSubtitleAndDescription
              description={description}
              title={title}
              fontSizeDescription={fontSizes.h3}
            />
          </GridItem>
          <GridItem />
        </Grid>
      </SectionContainer>
      <FlexCol>
        <Grid
          templateColumns="1fr 1fr"
          gap="0"
          display={{ base: 'none', lg: 'grid' }}
        >
          <GridItem
            mt={height * -1}
            height={height}
            zIndex="-1"
            bg={colors.partnersAboutBg}
          />
          <GridItem
            mt={height * -1}
            height={height}
            zIndex="-1"
            style={styleProps(image?.asset?.url, 'left')}
          />
        </Grid>
      </FlexCol>
      {/* MOBILE */}
      <FlexCol bg={colors.partnersAboutBg}>
        <SectionContainer>
          <Grid display={{ base: 'grid', lg: 'none' }} templateColumns="1fr">
            <GridItem pb="1em" mt="3em" mb="3em">
              <TitleWithSubtitleAndDescription
                description={description}
                title={title}
                fontSizeDescription={fontSizes.h3}
              />
            </GridItem>
            <GridItem
              height="15em"
              style={styleProps(image?.asset?.url, 'center')}
              mb="3em"
            />
          </Grid>
        </SectionContainer>
      </FlexCol>
    </>
  );
};
