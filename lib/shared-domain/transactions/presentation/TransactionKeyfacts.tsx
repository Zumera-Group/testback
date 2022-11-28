import { Flex } from '@chakra-ui/react';
import { Box, FlexCol } from 'components/Layout/Flex/Flex';
import { H } from 'components/Typography/H';
import React from 'react';
import { SectionContainer } from '../../../../components/Layout/SectionContainer';
import { Transaction } from '../domain/index';
import { P } from '../../../../components/Typography/P';
import { TitleWithSubtitleAndDescription } from 'lib/shared-domain/page/presentation/components/TitleWithSubtitleAndDescription';
import {
  fontSizes,
  fontWeights,
} from '../../../../styles/foundations/fontStyles';
import { colors } from '../../../../styles/foundations/colors';

export const TransactionKeyfacts: React.FC<{
  transaction: Transaction;
  content: Record<string, string>;
}> = ({ transaction, content }) => {
  const t = (item) => content?.[item];

  if (!transaction.keyFacts || transaction.keyFacts?.length === 0) return null;
  return (
    <SectionContainer py="md">
      <Box width={{ base: '100%', lg: '50%' }}>
        <TitleWithSubtitleAndDescription
          description={t('description')}
          title={t('title')}
          subtitle={t('subTitle')}
        />
      </Box>
      <Flex mt={6} direction={{ base: 'column', md: 'row' }}>
        {transaction.keyFacts?.map((t, index) => (
          <FlexCol mb={{ base: 3, md: 0 }} flex={1} key={index}>
            <H
              fontSize={fontSizes.h1}
              fontWeight={fontWeights.highlight}
              mb={1.5}
            >
              {t.title}
            </H>
            <P color={colors.gray[800]}>{t.subtitle}</P>
          </FlexCol>
        ))}
      </Flex>
    </SectionContainer>
  );
};
