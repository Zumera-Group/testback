import React from 'react';

import { TransactionCompany as TCompany } from 'components/Transaction/TransactionCompany';
import { Transaction } from '../domain/index';

export const TransactionCompany: React.FC<{
  transaction: Transaction;
}> = ({ transaction }) => {
  return <TCompany transaction={transaction} />;
};
