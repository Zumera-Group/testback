import React from 'react';
import { AboutTheToolSectionModule } from '../../domain/contentModule';
import { SectionContainer } from '../../../../../components/Layout/SectionContainer';
import {
  Box,
  FlexCol,
  FlexRow,
} from '../../../../../components/Layout/Flex/Flex';
import { TitleWithSubtitleAndDescription } from '../components/TitleWithSubtitleAndDescription';
import { colors } from '../../../../../styles/foundations/colors';
import { SimpleGrid, VStack, Flex } from '@chakra-ui/react';
import useBreakpointValue from 'lib/shared-domain/useBreakpoint';
import { icons } from 'components/Icons';
import { P } from '../../../../../components/Typography/P';
import { H } from '../../../../../components/Typography/H';
import { LinkWithArrow } from '../components/LinkWithArrow';
import {
  fontSizes,
  fontWeights,
} from '../../../../../styles/foundations/fontStyles';

export const AboutTheToolSection: React.FC<{
  specificContentModule: AboutTheToolSectionModule;
}> = ({ specificContentModule }) => {
  const VARIANT_H = 'mobileFactsAndFiguresSectionH';
  const isMobile = useBreakpointValue({ base: true, lg: false });
  return (
    <SectionContainer py={isMobile ? 'sm' : 'lg'}>
      <Flex direction={{ base: 'column', lg: 'row' }}>
        <Box width={{ base: '100%', lg: '45%' }} mr={5}>
          <TitleWithSubtitleAndDescription
            title={specificContentModule.title}
            subtitle={specificContentModule.subtitle}
            description={specificContentModule.description}
            color={{ title: colors.text.darker }}
          />
          <VStack align="flex-start" spacing={2} my={{ base: 2, lg: 4 }}>
            {specificContentModule.bulletPoints?.map((b, i) => (
              <FlexRow key={i}>
                <Box mr={2}>
                  <icons.TransactionX size="16px" strokeW="15" />
                </Box>
                <Box>
                  <P>{b}</P>
                </Box>
              </FlexRow>
            ))}
          </VStack>
        </Box>
        <SimpleGrid
          columns={2}
          mt={6}
          spacingX={{ base: 0, lg: 5 }}
          spacingY={{ base: 5, lg: 2 }}
        >
          {specificContentModule.facts?.map((f, i) => (
            <FlexCol key={i} justify="center">
              <H variant={VARIANT_H} mb={3}>
                {f.factFigure}
              </H>
              <P
                fontSize={{
                  base: fontSizes.h3,
                  lg: fontSizes.websiteFactsAndFiguresP,
                }}
                lineHeight="24px"
                fontWeight={fontWeights.highlight}
                color={colors.text.light}
              >
                {f.factTitle}
              </P>
            </FlexCol>
          ))}
        </SimpleGrid>
      </Flex>
      <Box mt={{ base: 7, lg: 4 }}>
        <LinkWithArrow
          title={specificContentModule.buttonText}
          href={`${specificContentModule.linkUrl}`}
        />
      </Box>
    </SectionContainer>
  );
};

export default AboutTheToolSection;
