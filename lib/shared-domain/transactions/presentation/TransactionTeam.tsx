import React from 'react';

import { TransactionTeam as Team } from 'components/Transaction/TransactionTeam';
import { Transaction } from '../domain/index';

export const TransactionTeam: React.FC<{
  transaction: Transaction;
  content: any;
}> = ({ transaction, content }) => {
  return <Team transaction={transaction} content={content} />;
};
