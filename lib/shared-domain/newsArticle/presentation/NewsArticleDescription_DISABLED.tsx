import React from 'react';
import { NewsArticle } from '../domain/index';
import { SectionContainer } from '../../../../components/Layout/SectionContainer';
import { TitleWithSubtitleAndDescription } from '../../page/presentation/components/TitleWithSubtitleAndDescription';
import { Box, FlexCol, FlexRow } from 'components/Layout/Flex/Flex';
import Image from 'next/image';
import { P } from 'components/Typography/P';
import { fontWeights } from '../../../../styles/foundations/fontStyles';
import useBreakpointValue from 'lib/shared-domain/useBreakpoint';
import { icons } from '../../../../components/Icons/index';
import { colors } from 'styles/foundations/colors';

const TitleWithSubtitle: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => {
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  const fontSize = isMobile ? 'mobileWebsiteH1' : 'websiteH1';

  return (
    <FlexCol mb={3} mx={2} flexBasis={isMobile ? '100%' : '30%'}>
      <P fontSize={fontSize} fontWeight={fontWeights.bold}>
        {title}
      </P>
      <P>{subtitle}</P>
    </FlexCol>
  );
};

export const NewsArticleDescription: React.FC<{
  newsArticle: NewsArticle;
  content: any;
}> = ({ newsArticle, content }) => {
  const t = (item) => content?.[item] || '';

  return (
    <SectionContainer py="md">
      {(newsArticle.newArticleSection?.articleText ||
        newsArticle.newArticleSection?.articleTextRichEditor) && (
        <Box mb={0}>
          <TitleWithSubtitleAndDescription
            subtitle={t('subtitle')}
            title={newsArticle?.newArticleSection?.articleTextTitle}
            description={
              newsArticle.newArticleSection?.articleTextRichEditor ||
              newsArticle.newArticleSection?.articleText
            }
          />
        </Box>
      )}
      {newsArticle?.newArticleSection?.links &&
        newsArticle?.newArticleSection?.links?.length > 0 && (
          <Box mt={4} mb={8}>
            {newsArticle.newArticleSection?.links?.map((l, index) => (
              <a target="_blank" key={index} href={l.url} rel="noreferrer">
                <FlexRow
                  width="fit-content"
                  pb={2}
                  mb={4}
                  borderBottomColor={colors.black}
                  borderBottomStyle="solid"
                  borderBottomWidth="1px"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <P fontWeight={fontWeights.bold}>{l.title}</P>
                  <Box ml={2}>
                    <icons.LinkArrow size="14px" />
                  </Box>
                </FlexRow>
              </a>
            ))}
          </Box>
        )}
      {(newsArticle.newArticleSection?.secondDescription ||
        newsArticle.newArticleSection?.secondDescriptionRichText) && (
        <Box mb={6}>
          <TitleWithSubtitleAndDescription
            title={newsArticle.newArticleSection?.secondTitle}
            description={
              newsArticle.newArticleSection?.secondDescriptionRichText ||
              newsArticle.newArticleSection?.secondDescription
            }
          />
        </Box>
      )}

      {(newsArticle.newArticleSection?.secondDescription ||
        newsArticle.newArticleSection?.secondDescriptionRichText) &&
        newsArticle.secondPicture?.asset?.url && (
          <Box position="relative" height="450px">
            <Image
              unoptimized
              loading="lazy"
              objectFit="cover"
              layout="fill"
              alt={newsArticle.title}
              src={newsArticle.secondPicture?.asset?.url + `?h=400`}
            />
          </Box>
        )}
      {newsArticle?.newArticleSection?.facts &&
        newsArticle?.newArticleSection?.facts?.length > 0 && (
          <FlexRow flexWrap="wrap" mt={4}>
            {newsArticle?.newArticleSection?.facts?.map((f, index) => (
              <TitleWithSubtitle
                title={f.title}
                subtitle={f.subtitle}
                key={index}
              />
            ))}
          </FlexRow>
        )}

      {(newsArticle.newArticleSection?.conclusion ||
        newsArticle.newArticleSection?.conclusionRichText) && (
        <Box mt={6}>
          <TitleWithSubtitleAndDescription
            title={
              newsArticle.newArticleSection?.conclusionTitle ||
              t('conclusionTitle')
            }
            description={
              newsArticle.newArticleSection?.conclusionRichText ||
              newsArticle.newArticleSection?.conclusion
            }
          />
        </Box>
      )}
    </SectionContainer>
  );
};
