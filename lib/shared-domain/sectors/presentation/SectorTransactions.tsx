import React from 'react';

import { Transaction } from 'lib/shared-domain/transactions/domain';
import { Sector } from '../../page/domain/index';

import { SectorTransactions as STransactions } from 'components/Sector';

export const SectorTransactions: React.FC<{
  transactions: Transaction[];
  sector: Sector;
  content: any;
}> = ({ transactions, sector, content }) => {
  return (
    <STransactions
      transactions={transactions}
      sector={sector}
      content={content}
    />
  );
};

export default SectorTransactions;
