import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { NewsArticle } from '../domain/index';
import { SectionContainer } from '../../../../components/Layout/SectionContainer';
import downloadBgImage from '../../../../public/contentModules/newsGridSection/download-bg.png';
import { TitleWithSubtitleAndDescription } from 'lib/shared-domain/page/presentation/components/TitleWithSubtitleAndDescription';
import { Box, FlexCol, FlexRow } from '../../../../components/Layout/Flex/Flex';
import { Flex } from '@chakra-ui/layout';

const WEBKIT_SCROLL = `::-webkit-scrollbar {
  background: transparent;
}`;

export const NewsEventAbout: React.FC<{
  newsEvent: NewsArticle;
  content: any;
}> = ({ newsEvent, content }) => {
  return (
    <SectionContainer py="md">
      <TitleWithSubtitleAndDescription
        title={content?.aboutTheEventSectionContent?.title}
        subtitle={content?.aboutTheEventSectionContent?.subtitle}
        description={newsEvent?.aboutTheEvent?.description}
      />

      <Flex
        mt={4}
        flexDirection={{ base: 'column', lg: 'row' }}
        justify={{ base: 'center', lg: 'space-between' }}
      >
        <Box maxW={{ base: '100%', lg: '50%' }}>
          <TitleWithSubtitleAndDescription
            description={newsEvent?.aboutTheEvent?.eventExplanation}
          />
        </Box>
        <FlexCol
          mt={{ base: 4, lg: 0 }}
          maxW={{ base: '100%', lg: '45%' }}
          w={{ base: '100%', lg: '45%' }}
          justify="center"
          style={{ scrollbarWidth: 'none' }}
          css={WEBKIT_SCROLL}
        >
          <Box id={newsEvent?.aboutTheEvent?.iframeId}></Box>
          <Script src={newsEvent?.aboutTheEvent?.iframeUrl} />
          <Script id={newsEvent?.aboutTheEvent?.iframeId} strategy="lazyOnload">
            {`${newsEvent?.aboutTheEvent?.iframeCode}`}
          </Script>
        </FlexCol>
      </Flex>
    </SectionContainer>
  );
};
