import { Box, FlexCol } from 'components/Layout/Flex/Flex';
import { HEADER_HEIGHT } from 'lib/shared-domain/page/constants';
import React from 'react';
import { NewsArticle } from '../domain/index';
import { SimpleGrid } from '@chakra-ui/react';

import { TitleWithSubtitleAndDescription } from 'lib/shared-domain/page/presentation/components/TitleWithSubtitleAndDescription';
import Image from 'next/image';
import { SectionContainer } from '../../../../components/Layout/SectionContainer';
import { P } from 'components/Typography/P';
import { fontSizes } from 'styles/foundations/fontStyles';
import { colors } from 'styles/foundations/colors';
import { fontWeights } from '../../../../styles/foundations/fontStyles';
import { useFormatDate } from 'lib/shared-domain/useFormatDate';

const HERO_MIN_HEIGHT = '640px';
const MOBILE_COLUMN_HEIGHT = '320px';

export const NewsArticleHero: React.FC<{ newsArticle: NewsArticle }> = ({
  newsArticle,
}) => {
  const format = useFormatDate();

  const showImage = !newsArticle?.isPressRelease;

  return (
    <SectionContainer>
      <Box mt={HEADER_HEIGHT}>
        <SimpleGrid
          minHeight={HERO_MIN_HEIGHT}
          columns={{ base: 1, lg: showImage ? 2 : 1 }}
        >
          <FlexCol
            background="linear-gradient(264.95deg, #E0C6B7 -2.77%, #F8F8E6 62.17%)"
            minHeight={{ base: MOBILE_COLUMN_HEIGHT, lg: '100%' }}
            py={4}
            justifyContent="center"
            px={{ base: 4, lg: 12 }}
          >
            {newsArticle.date && (
              <P
                fontWeight={fontWeights.semiBold}
                color={colors.black}
                fontSize={fontSizes.small}
                mb={3}
              >
                {format(new Date(newsArticle.date))}
              </P>
            )}
            <P fontSize={fontSizes.h1} as="h1">
              {newsArticle.title}
            </P>
            <TitleWithSubtitleAndDescription
              description={newsArticle.subtitle}
            />
          </FlexCol>
          {showImage && (
            <FlexCol
              mt={{ base: 3, lg: 0 }}
              ml={{ base: 0, lg: 2 }}
              height={{ base: MOBILE_COLUMN_HEIGHT, lg: '100%' }}
            >
              {newsArticle.picture?.asset?.url && (
                <Box position="relative" height="100%">
                  <Image
                    unoptimized
                    objectFit={
                      newsArticle.detailPageImageFit ||
                      newsArticle.pictureImageFit ||
                      'cover'
                    }
                    layout="fill"
                    alt={newsArticle.title}
                    src={
                      newsArticle.secondPicture?.asset?.url ||
                      newsArticle.picture?.asset?.url
                    }
                  />
                </Box>
              )}
            </FlexCol>
          )}
        </SimpleGrid>
      </Box>
    </SectionContainer>
  );
};
