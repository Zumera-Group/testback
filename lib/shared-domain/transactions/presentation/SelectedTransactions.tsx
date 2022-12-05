import { Flex } from '@chakra-ui/react';
import { Box, FlexCol } from 'components/Layout/Flex/Flex';
import { H } from 'components/Typography/H';
import React, { useEffect, useState } from 'react';
import { SectionContainer } from '../../../../components/Layout/SectionContainer';
import { Transaction } from '../domain/index';
import { TitleWithSubtitleAndDescription } from 'lib/shared-domain/page/presentation/components/TitleWithSubtitleAndDescription';

import { TransactionCarousel } from './components/TransactionCarousel';
import { fetchTransactions } from '../application/useGetTransactions';
import { useRouter } from 'next/router';

const useFetchTransactions = () => {
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetchTransactions(router.locale as any).then((t) => {
        setTransactions(t);
      });
    }
  }, []);

  return transactions;
};

export const SelectedTransactions: React.FC<{
  transaction: Transaction;
  content: any;
}> = ({ transaction, content }) => {
  const transactions = useFetchTransactions();

  const t = (item) => content?.[item];
  const filteredTransactions = transactions?.filter(
    (t) => t._id !== transaction._id,
  );
  if (!filteredTransactions || filteredTransactions.length === 0) return null;

  return (
    <>
      <SectionContainer py="md">
        <Box width={{ base: '100%', lg: '50%' }}>
          <TitleWithSubtitleAndDescription
            description={t('description')}
            title={t('title')}
            subtitle={t('subtitle')}
          />
        </Box>
        <Box mb={8} mt={6}>
          <TransactionCarousel
            linkText={t('linkText')}
            transactions={filteredTransactions}
          />
        </Box>
      </SectionContainer>
    </>
  );
};
