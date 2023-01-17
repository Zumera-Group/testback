import React from 'react';

import { Transaction } from 'lib/shared-domain/transactions/domain';
import { Service } from '../../page/domain/index';

import { ServiceTransactions as STransactions } from 'components/Service/ServiceTransactions';

export const ServiceTransactions: React.FC<{
  transactions: Transaction[];
  service: Service;
  content: any;
}> = ({ transactions, service, content }) => {
  return (
    <STransactions
      transactions={transactions}
      service={service}
      content={content}
    />
  );
};

export default ServiceTransactions;
