import React from 'react';

import { Box } from 'components/Layout/Flex/Flex';
import { TitleWithSubtitleAndDescription } from '../components/TitleWithSubtitleAndDescription';

import { SectionContainer } from 'components/Layout/SectionContainer';
import { TransactionCarousel } from '../../../transactions/presentation/components/TransactionCarousel';
import { Transaction } from 'lib/shared-domain/transactions/domain';
import { AllTransactionsCarouselSectionModule } from '../../domain/contentModule';
import { useOnElementIntersecting } from 'lib/hooks/useOnElementIntersecting';
import { fetchTransactions } from 'lib/shared-domain/transactions/application/useGetTransactions';
import { useRouter } from 'next/router';

export const AllTransactionsCarouselSection: React.FC<{
  specificContentModule: AllTransactionsCarouselSectionModule;
}> = ({ specificContentModule }) => {
  const [containerRef, isVisible] = useOnElementIntersecting({
    threshold: 0,
    rootMargin: '0px 0px -20px 0px',
  });
  const router = useRouter();

  const [transactions, setTransactions] = React.useState([]);

  React.useEffect(() => {
    if (typeof window !== 'undefined' && isVisible) {
      fetchTransactions(router.locale as any).then((t) => {
        setTransactions(t);
      });
    }
  }, [isVisible]);

  const transactionFiltered = filterTransactionsForAllTransactionsCarousel(
    specificContentModule,
    transactions,
  );

  return (
    <Box ref={containerRef}>
      {isVisible && (
        <SectionContainer py="md">
          <Box width={{ base: '100%', lg: '50%' }}>
            <TitleWithSubtitleAndDescription {...specificContentModule} />
          </Box>
          <TransactionCarousel
            linkText={specificContentModule.linkText}
            transactions={transactionFiltered}
          />
        </SectionContainer>
      )}
    </Box>
  );
};

function filterTransactionsForAllTransactionsCarousel(
  specificContentModule: AllTransactionsCarouselSectionModule,
  transactions: Transaction[],
) {
  try {
    if (specificContentModule.showAll) {
      return transactions;
    }

    const sectorKeys = specificContentModule.sectors?.map((s) => s._ref);

    const transactionFiltered = transactions?.filter((transaction) => {
      const sectors = transaction?.sectors || [];
      return sectors.some((s) => sectorKeys?.includes?.(s._id));
    });

    return transactionFiltered;
  } catch (e) {
    return [];
  }
}

export default AllTransactionsCarouselSection;
