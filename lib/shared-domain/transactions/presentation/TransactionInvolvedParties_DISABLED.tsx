import React from 'react';
import { Grid, GridItem, Image } from '@chakra-ui/react';

import comma from './img/comma.png';
import commaRight from './img/commaright.png';
import bgImage from './img/transactionInvolvedPartiesBg.png';

import { TextStyles } from 'styles/components/Text';
import { fontSizes, fontWeights } from 'styles/foundations/fontStyles';
import { colors } from 'styles/foundations/colors';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { P } from 'components/Typography/P';
import { TitleWithSubtitleAndDescription } from '../../page/presentation/components/TitleWithSubtitleAndDescription';
import { optionalUI } from '../domain';

const ImageLogo: React.FC<{
  content?: any;
  position?: string;
}> = ({ content, position = 'right' }) => (
  <>
    {content?.companyLogo?.asset?.url && (
      <Image
        justifySelf={position}
        alt="logo"
        maxW="10em"
        maxH="10em"
        height="auto"
        src={content?.companyLogo?.asset?.url}
      />
    )}
  </>
);

const BoxContent: React.FC<{
  content?: { quote?: string; name?: string; jobTitle?: string };
}> = ({ content }) => (
  <>
    <P
      pt="2em"
      pb="2em"
      style={TextStyles.variants.howCoolQuoteP}
      color={colors.text.light}
    >
      {content?.quote}
    </P>
    <P fontSize={fontSizes.h2} fontWeight={fontWeights.highlight}>
      {content?.name}
    </P>
    <P
      pt="1em"
      fontSize={fontSizes.small}
      fontWeight={fontWeights.highlight}
      color={colors.text.light}
    >
      {content?.jobTitle}
    </P>
  </>
);

export const TransactionInvolvedParties: React.FC<{
  optionalUI: optionalUI;
}> = ({
  optionalUI: { involvedParty1, involvedParty2, involvedPartyHeader },
}) => {
  return (
    <SectionContainer>
      <Grid templateColumns={{ md: '1fr', lg: '1fr 1fr' }}>
        <GridItem pb="3em">
          <TitleWithSubtitleAndDescription
            description={involvedPartyHeader?.description}
            title={involvedPartyHeader?.title}
            subtitle={involvedPartyHeader?.subtitle}
          />
        </GridItem>
      </Grid>
      <SectionContainer
        style={{
          background: `url(${bgImage.src})`,
          backgroundPostion: 'center',
          backgroundSize: 'cover',
        }}
      >
        <Grid templateColumns={{ base: '1fr', lg: '0.8fr 1fr' }} gap={1}>
          <GridItem pb="3em" pt="3em">
            <Grid templateColumns="1fr 1fr" alignItems="end">
              <Image maxW="6em" alt="comma" src={comma?.src} />
              <ImageLogo content={involvedParty1} position="right" />
            </Grid>
            <BoxContent content={involvedParty1} />
          </GridItem>
          <GridItem />
        </Grid>
      </SectionContainer>
      {/* SECOND BOX */}
      <SectionContainer style={{ margin: 0, padding: 0 }}>
        <Grid
          templateColumns={{ base: '1fr', lg: '1fr 1.2fr' }}
          gap={{ base: 0, lg: 10 }}
          mt={{ base: '1em', lg: '-25em' }}
          mb="3em"
        >
          <GridItem />
          <GridItem bgColor="white" p="3em" pb="4em" border="1px solid #595959">
            <Grid templateColumns="1fr 1fr" alignItems="end">
              <ImageLogo content={involvedParty2} position="left" />
              <Image
                justifySelf="right"
                maxW="6em"
                alt="comma"
                src={commaRight?.src}
              />
            </Grid>
            <BoxContent content={involvedParty2} />
          </GridItem>
        </Grid>
      </SectionContainer>
    </SectionContainer>
  );
};
