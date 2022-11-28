import { TransactionShowcase } from 'lib/shared-domain/transactions/presentation/TransactionShowcase';
import React from 'react';
import { Transaction } from '../../transactions/domain/index';
import {
  SiteSettings,
  ServiceTransactionShowcaseSection,
} from '../../page/domain/index';

export const ServiceTransactionShowcase: React.FC<{
  transaction: Transaction;
  siteSettings: SiteSettings;
  section: ServiceTransactionShowcaseSection | any;
}> = ({ transaction, siteSettings, section }) => {
  return (
    <TransactionShowcase
      transaction={transaction}
      title={section.title}
      subtitle={section.subtitle}
      description={section.description}
      transactionLinkText={section.linkText}
      viewAllButton={{
        href: siteSettings?.transactionsOverviewPage?.slug?.current,
        title: section.linkTextInTransactionCard,
      }}
    />
  );
};
