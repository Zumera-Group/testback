import React from 'react';
import { HowCoolSectionModule } from '../../domain/contentModule';
import {
  FlexCol,
  FlexRow,
  Box,
} from '../../../../../components/Layout/Flex/Flex';
import { SectionContainer } from '../../../../../components/Layout/SectionContainer';
import { TitleWithSubtitleAndDescription } from '../components/TitleWithSubtitleAndDescription';
import { VStack, useBreakpointValue, Flex } from '@chakra-ui/react';
import { icons } from '../../../../../components/Icons/index';
import { P } from '../../../../../components/Typography/P';
import { SanityBlockContent } from '../../../../../components/SanityBlockContent';
import { colors } from '../../../../../styles/foundations/colors';
import Image from 'next/image';

export const HowCoolSection: React.FC<{
  specificContentModule: HowCoolSectionModule;
}> = ({ specificContentModule }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  return (
    <FlexCol>
      <SectionContainer py={isMobile ? 'sm' : 'lg'}>
        <Flex direction={{ base: 'column', lg: 'row' }}>
          <Box width={{ base: '100%', lg: '45%' }} mr={5} mt={isMobile ? 0 : 3}>
            <TitleWithSubtitleAndDescription
              title={specificContentModule.title}
            />
            <VStack align="flex-start" spacing={4}>
              {specificContentModule.bulletPoints?.map((b, i) => (
                <FlexRow key={i} align="baseline">
                  <Box mr={2}>
                    <icons.TransactionX size="16px" strokeW="15" />
                  </Box>
                  <Box>
                    <P variant="globalNetworkOfficeItemTitle" mb={2}>
                      {b.title}
                    </P>
                    <SanityBlockContent
                      className="sanity-block-h3"
                      text={b.description}
                    />
                  </Box>
                </FlexRow>
              ))}
            </VStack>
          </Box>
          <FlexCol
            bg={colors.white}
            py={{ base: 5, lg: 8 }}
            px={{ base: 5, lg: 8 }}
            mt={{ base: 4, lg: 0 }}
            justify="flex-start"
            width={{ base: '100%', lg: '50%' }}
          >
            {/* <FlexRow position="relative" mr={1} mb={5} height="80px">
              <Box position="absolute" height="80px" width="100px" right={5}>
                <Image unoptimized
                  loading="lazy"
                  src={specificContentModule.getBackgroundImage('quotes')}
                  alt=""
                  height="80px"
                  width="100px"
                />
              </Box>
            </FlexRow> */}
            <P
              variant="howCoolQuoteP"
              color={colors.text.light}
              mb={isMobile ? 0 : 7}
            >
              {specificContentModule.quote?.quoteText}
            </P>
            <Box mt={5}>
              <P
                variant="globalNetworkOfficeItemTitle"
                mb={2}
              >{`${specificContentModule.quote?.quoteAuthor?.firstName} ${specificContentModule.quote?.quoteAuthor?.lastName}`}</P>
              <P color={colors.text.light}>
                {specificContentModule.quote?.quoteAuthor?.jobTitle}
              </P>
            </Box>
          </FlexCol>
        </Flex>
      </SectionContainer>
    </FlexCol>
  );
};

export default HowCoolSection;