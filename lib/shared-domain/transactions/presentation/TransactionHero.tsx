import React from 'react';

import { TransactionHero as THero } from 'components/Transaction';
import { Transaction } from '../domain/index';

export const TransactionHero: React.FC<{
  transaction: Transaction;
  content: any;
}> = ({ transaction, content }) => {
  console.log(transaction);
  console.log(content);
  return <THero transaction={transaction} content={content} />;
};
