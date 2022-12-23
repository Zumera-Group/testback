import React from 'react';
import { SectionContainer } from '../../../../components/Layout/SectionContainer';
import { FlexCol, Box } from '../../../../components/Layout/Flex/Flex';
import { SimpleGrid } from '@chakra-ui/react';
import useBreakpointValue from 'lib/shared-domain/useBreakpoint';
import { P } from '../../../../components/Typography/P';
import { NewsArticle } from '../domain/index';
import reportDownloadBg from 'public/newsDetail/reportDownloadBg-min.jpg';
import { colors } from '../../../../styles/foundations/colors';
import { CardDownload } from './newsCards';

export const NewsArticleReportDownload: React.FC<{
  newsArticle: NewsArticle;
}> = ({ newsArticle }) => {
  // const isMobile = useBreakpointValue({ base: true, lg: false });
  const isMobile = false;

  if (
    !newsArticle?.reportDownloadSection?.title &&
    !newsArticle?.reportDownloadSection?.description &&
    !newsArticle?.reportDownloadSection?.report
  )
    return null;

  const DescriptionVariant = isMobile
    ? 'mobileReportDownloadDescription'
    : 'reportDownloadDescription';
  return (
    <FlexCol
      backgroundImage={`url(${reportDownloadBg.src})`}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
    >
      <SectionContainer py="sm">
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 5, md: 10, lg: 15 }}
        >
          <Box mt={{ base: 0, md: 5 }}>
            <P variant="reportDownloadTitle" color={colors.white} mb={4}>
              {newsArticle?.reportDownloadSection?.title}
            </P>
            <P
              whiteSpace="pre-wrap"
              variant={DescriptionVariant}
              color={colors.duckEgg}
            >
              {newsArticle?.reportDownloadSection?.description}
            </P>
          </Box>
          {newsArticle?.reportDownloadSection?.report && (
            <Box height="fit-content">
              <CardDownload
                content={{
                  ...newsArticle?.reportDownloadSection?.report,
                  buttonCaption:
                    newsArticle?.reportDownloadSection?.report?.buttonText,
                  emailLabel:
                    newsArticle?.reportDownloadSection?.report
                      ?.emailPlaceholder,
                }}
                bgLight
                hideIconBtn
              />
            </Box>
          )}
        </SimpleGrid>
      </SectionContainer>
    </FlexCol>
  );
};
