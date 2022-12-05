import React from 'react';
import { NewsArticle } from '../domain/index';
import { SectionContainer } from '../../../../components/Layout/SectionContainer';
import { TitleWithSubtitleAndDescription } from '../../page/presentation/components/TitleWithSubtitleAndDescription';
import { FlexRow } from 'components/Layout/Flex/Flex';
import { icons } from 'components/Icons';
import { P } from '../../../../components/Typography/P';
import { Box } from '../../../../components/Layout/Flex/Flex';

export const NewsEventWhyToAttend: React.FC<{
  newsEvent: NewsArticle;
  content: any;
}> = ({ newsEvent, content }) => {
  return (
    <SectionContainer pt="xs" pb="md">
      <Box mb={4}>
        <TitleWithSubtitleAndDescription
          title={content?.whyAttendSectionContent?.title}
          subtitle={content?.whyAttendSectionContent?.subtitle}
          description={newsEvent?.whyToAttendSection?.description}
        />
      </Box>
      {newsEvent?.whyToAttendSection?.bulletPoints?.map((b, i) => (
        <FlexRow key={i} align="center" my={3}>
          <icons.TransactionX size="10px" strokeW="20" />
          <P ml={2}>{b}</P>
        </FlexRow>
      ))}
    </SectionContainer>
  );
};
