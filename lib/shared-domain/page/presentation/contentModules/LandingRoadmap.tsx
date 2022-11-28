import React from 'react';
import {
  LandingPageTrackRecordModule,
  LandingRoadmapModule,
} from '../../../page/domain/contentModule';
import { TitleWithSubtitleAndDescription } from '../../../page/presentation/components/TitleWithSubtitleAndDescription';
import { TransactionCarousel } from '../../../transactions/presentation/components/TransactionCarousel';
import { FlexCol, FlexRow } from '../../../../../components/Layout/Flex/Flex';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { colors } from '../../../../../styles/foundations/colors';
import { P } from '../../../../../components/Typography/P';
import { SanityBlockContent } from '../../../../../components/SanityBlockContent';
import { fontSizes } from '../../../../../styles/foundations/fontStyles';
import styles from './LandingRoadmap.module.css';
import { SectionContainer } from '../../../../../components/Layout/SectionContainer';

export const LandingRoadmap: React.FC<{
  specificContentModule: LandingRoadmapModule;
}> = ({ specificContentModule }) => {
  return (
    <SectionContainer pt="md">
      <FlexCol textAlign="center">
        <TitleWithSubtitleAndDescription
          description={specificContentModule.description}
          title={specificContentModule.title}
        />
      </FlexCol>

      <FlexCol position="relative" pb="3em">
        <div className="bp-desktop">
          <FlexCol
            className={styles.line}
            position="absolute"
            top="8.05rem"
            width="calc(100% - 100px)"
            height="2px"
            bg={colors.primary.darkGreen}
          >
            <FlexCol
              className={styles.arrow}
              position="absolute"
              right={0}
              top="-3px"
            />
          </FlexCol>
        </div>

        <div className="bp-desktop">
          <FlexRow justifyContent="center">
            {specificContentModule.items.map((i, index) => {
              return (
                <FlexCol key={i.title} mt={10} maxWidth="28%" mx={4}>
                  <FlexCol
                    bg="white"
                    zIndex={10}
                    maxWidth="64px"
                    paddingLeft={2}
                    paddingRight={2}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <P fontSize="60px" color={colors.primary.darkGreen}>
                      {index + 1}
                    </P>
                  </FlexCol>

                  <P
                    fontSize={fontSizes.h1_2}
                    fontWeight="bold"
                    color={colors.primary.darkGreen}
                    mb={2.5}
                  >
                    {i.title}
                  </P>
                  <SanityBlockContent text={i.description} />
                </FlexCol>
              );
            })}
          </FlexRow>
        </div>

        <div className="bp-mobile">
          <FlexCol>
            {specificContentModule.items.map((i, index) => {
              return (
                <FlexCol key={i.title} mt={10} maxWidth="100%" mx={4}>
                  <FlexCol
                    bg="white"
                    zIndex={10}
                    maxWidth="64px"
                    paddingLeft={2}
                    paddingRight={2}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <P fontSize="60px" color={colors.primary.darkGreen}>
                      {index + 1}
                    </P>
                  </FlexCol>

                  <P
                    fontSize={fontSizes.h1_2}
                    fontWeight="bold"
                    color={colors.primary.darkGreen}
                    mb={2.5}
                  >
                    {i.title}
                  </P>
                  <SanityBlockContent text={i.description} />
                </FlexCol>
              );
            })}
          </FlexCol>
        </div>
      </FlexCol>
    </SectionContainer>
  );
};
