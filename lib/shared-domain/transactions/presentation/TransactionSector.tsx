import React from 'react';
import { Transaction } from '../domain/index';

import { TransactionSector as TSector } from 'components/Transaction';

export const TransactionSector: React.FC<{
  transaction: Transaction;
  content: any;
}> = ({ transaction, content }) => {
  const t = (item) => content?.[item];
  const firstSector = transaction.sectors?.[0];

  if (!firstSector) return null;

  return (
    <TSector
      sector={firstSector}
      linkText={t('linkText')}
      subtitle={t('subtitle')}
    />
  );
};
