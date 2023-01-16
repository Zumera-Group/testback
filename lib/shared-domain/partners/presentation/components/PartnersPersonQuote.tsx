import React from 'react';
import { Grid, GridItem, Image } from '@chakra-ui/react';

import { P } from '../../../../../components/Typography/P';
import { SectionContainer } from '../../../../../components/Layout/SectionContainer';
import { FlexCol, FlexRow } from 'components/Layout/Flex/Flex';
import { colors } from '../../../../../styles/foundations/colors';
import { TitleWithSubtitleAndDescription } from '../../../page/presentation/components/TitleWithSubtitleAndDescription';
import { PartnerPersonQuoteModule } from '../../../page/domain/contentModule';
import styles from './PartnersPersonQuote.module.css';
import quotes from './Quote.svg';
import { icons } from 'components/Icons';

export const PartnersPersonQuote: React.FC<{
  specificContentModule: PartnerPersonQuoteModule;
}> = ({ specificContentModule }) => {
  const {
    image: profileImage,
    partnerImageLabel,
    quoteOwner,
    quoteText,
    subtitle,
    title,
  } = specificContentModule;

  const imageUrl = profileImage.asset.url;

  return (
    <SectionContainer>
      <FlexCol pt="var(--section-top)">
        <div className={styles.title}>
          <TitleWithSubtitleAndDescription subtitle={subtitle} title={title} />
        </div>
        <FlexCol>
          <Grid templateColumns={{ base: '1fr', lg: '0.5fr 1fr' }} gap={0}>
            <GridItem>
              {imageUrl && (
                <Image
                  width={{ base: '395px', lg: '295px' }}
                  height="auto"
                  mb="1rem"
                  alt=""
                  // layout="fill"
                  objectFit="contain"
                  src={imageUrl}
                />
              )}
              <P className={styles.partnerImageLabel} color={colors.text.light}>
                {partnerImageLabel}
              </P>
              <FlexCol mb={4}>
                {specificContentModule?.bullets?.map((b, index) => (
                  <FlexRow key={index} mt={2}>
                    <FlexCol flexShrink={0} mr={2} mt={0.5}>
                      <icons.TransactionX
                        color={colors.primary.darkGreen}
                        size="14px"
                        strokeW="14px"
                      />
                    </FlexCol>
                    <P
                      className={styles.partnerImageLabel}
                      color={colors.text.light}
                    >
                      {b}
                    </P>
                  </FlexRow>
                ))}
              </FlexCol>
            </GridItem>
            {quoteText && (
              <GridItem
                height="fit-content"
                p="2rem 1rem"
                border="1px solid black"
              >
                <Image src={quotes.src} alt="" height="80px" width="100px" />
                <P color={colors.text.light} fontStyle="italic" mt={2} mb={3}>
                  <span
                    style={{
                      whiteSpace: 'pre-line',
                      width: '100%',
                      display: 'block',
                    }}
                  >
                    {quoteText}
                  </span>
                </P>

                <P color={colors.text.light} fontWeight="bold">
                  {quoteOwner}
                </P>
              </GridItem>
            )}
          </Grid>
        </FlexCol>
      </FlexCol>
    </SectionContainer>
  );
};
