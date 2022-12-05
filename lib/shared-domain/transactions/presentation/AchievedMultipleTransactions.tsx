import React from 'react';
import { Box, Square } from '@chakra-ui/react';
import useBreakpointValue from 'lib/shared-domain/useBreakpoint';
import { FlexCol } from 'components/Layout/Flex/Flex';
import { H } from 'components/Typography/H';
import { P } from 'components/Typography/P';
import { colors } from 'styles/foundations/colors';
import { getTranslateByScope } from 'translation/i18n';
import { SectionContainer } from 'components/Layout/SectionContainer';

const MultipleText: React.FC<{
  multiple: number;
  text: string;
  color: string;
  border: string;
  needsMoreSpacing: boolean;
}> = ({ multiple, text, color, border, needsMoreSpacing }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isMobile) {
    return (
      <Box position="absolute" w={350} pr={3}>
        <Box borderTop={border}></Box>

        <Box ml={7} mt={2}>
          <P
            fontWeight="bold"
            fontSize={needsMoreSpacing ? '12px' : '18px'}
            lineHeight={needsMoreSpacing ? '12px' : '20px'}
          >
            {multiple}x
          </P>
          <P
            fontWeight="semiBold"
            fontSize={needsMoreSpacing ? '12px' : '18px'}
            lineHeight={needsMoreSpacing ? '12px' : '20px'}
            color={color}
          >
            {text}
          </P>
        </Box>
      </Box>
    );
  }

  return (
    <FlexCol position="relative" align="flex-end">
      <Square
        position="absolute"
        bottom="-55px"
        size={100}
        borderRight={border}
      ></Square>

      <Box textAlign="end" position="absolute" top={needsMoreSpacing ? 16 : 7}>
        <P fontWeight="bold" fontSize="32px" lineHeight="44px">
          {multiple}x
        </P>
        <P
          fontWeight="semibold"
          fontSize="small"
          lineHeight="44px"
          color={color}
        >
          {text}
        </P>
      </Box>
    </FlexCol>
  );
};

export const AchievedMultipleTransactions: React.FC<{
  sectorMultiple: number;
  transactionMultiple: number;
  content: any;
}> = ({ sectorMultiple, transactionMultiple, content }) => {
  const t = (item) => content?.[item];

  const isMobile = useBreakpointValue({ base: true, md: false });
  const percentage = (sectorMultiple / transactionMultiple) * 100;
  const transactionMultipleBarHeight = 100 - percentage;
  return (
    <SectionContainer py="md">
      <Box pb={isMobile ? 10 : 20}>
        <FlexCol
          mb={isMobile ? 7 : 10}
          width={isMobile ? '100%' : '100%'}
          maxW={600}
        >
          <H
            as="h1"
            fontSize={isMobile ? 'mobileTransactionSectionTitle' : 'websiteH1'}
            lineHeight="52px"
            fontWeight="regular"
            color={colors.text.darker}
            mb={3}
          >
            {t('title')}
          </H>
          <H
            as="h3"
            fontSize="24px"
            fontWeight="regular"
            color={colors.text.light}
            lineHeight="24px"
            order={-1}
            mb={2}
          >
            {t('subtitle')}
          </H>
          <P color={colors.text.light} variant="websiteTimelineSectionP">
            {t('text')}
          </P>
        </FlexCol>

        {isMobile ? (
          <Box h={440}>
            <Box
              h={`${transactionMultipleBarHeight}%`}
              w={5}
              bg={colors.sliderActiveBgColor}
            >
              <MultipleText
                multiple={transactionMultiple}
                text={content?.transactionMultipleText}
                color={colors.primary.darkGreen}
                border={'1px solid #17AA8B'}
                needsMoreSpacing={percentage > 80}
              />
            </Box>
            <Box
              h={`${percentage}%`}
              w={5}
              bg={colors.achievedTransactionMultipleBarMobile}
            >
              <MultipleText
                multiple={sectorMultiple}
                text={content?.sectorMultipleText}
                color={colors.text.light}
                border={'1px dashed #17AA8B'}
                needsMoreSpacing={percentage > 80}
              />
            </Box>
          </Box>
        ) : (
          <Box>
            <Box h={5} bg={colors.sliderActiveBgColor} position="relative">
              <MultipleText
                multiple={transactionMultiple}
                text={content?.transactionMultipleText}
                color={colors.primary.darkGreen}
                border={'1px solid #17AA8B'}
                needsMoreSpacing={percentage > 80}
              />
              <Box
                position="relative"
                h={5}
                w={`${percentage}%`}
                bg={colors.achievedTransactionMultipleBar}
              >
                <MultipleText
                  multiple={sectorMultiple}
                  text={content?.sectorMultipleText}
                  color={colors.text.light}
                  border={'1px dashed #17AA8B'}
                  needsMoreSpacing={false}
                />
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </SectionContainer>
  );
};
