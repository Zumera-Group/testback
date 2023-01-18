import React from 'react';

import { Transaction } from '../domain/index';
import TransactionsSelected from 'components/Transaction/TransactionsSelected/TransactionsSelected';

export const SelectedTransactions: React.FC<{
  transaction: Transaction;
  content: any;
}> = ({ transaction, content }) => {
  return <TransactionsSelected transaction={transaction} content={content} />;
};
