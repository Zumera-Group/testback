import React from 'react';
import { Transaction } from '../../transactions/domain/index';
import {
  SiteSettings,
  ServiceTransactionShowcaseSection,
} from '../../page/domain/index';
import TransactionShowcase from 'components/TransactionShowcase';

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
      link={{
        title: section.linkText,
        page: siteSettings?.transactionsOverviewPage?.slug?.current,
      }}
      // transactionLinkText={section.linkText}
      // viewAllButton={{
      //   href: siteSettings?.transactionsOverviewPage?.slug?.current,
      //   title: section.linkTextInTransactionCard,
      // }}
    />
  );
};
