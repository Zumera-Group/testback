import React from 'react';

import { Box } from 'components/Layout/Flex/Flex';
import { TransactionsCarouselSectionModule } from '../../domain/contentModule';
import { TitleWithSubtitleAndDescription } from '../components/TitleWithSubtitleAndDescription';

import { SectionContainer } from 'components/Layout/SectionContainer';
import { TransactionCarousel } from '../../../transactions/presentation/components/TransactionCarousel';

export const TransactionsCarouselSection: React.FC<{
  specificContentModule: TransactionsCarouselSectionModule;
}> = ({ specificContentModule }) => {
  return (
    <>
      <SectionContainer py="md">
        <Box width={{ base: '100%', lg: '50%' }}>
          <TitleWithSubtitleAndDescription {...specificContentModule} />
        </Box>
        <TransactionCarousel
          linkText={specificContentModule.linkText}
          transactions={specificContentModule.transactions}
        />
      </SectionContainer>
    </>
  );
};

export default TransactionsCarouselSection;