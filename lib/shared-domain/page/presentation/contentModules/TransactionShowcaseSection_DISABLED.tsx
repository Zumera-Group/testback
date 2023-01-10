import React from 'react';

import { TransactionShowcaseSectionModule } from '../../domain/contentModule';

import { TransactionShowcase } from 'lib/shared-domain/transactions/presentation/TransactionShowcase';

export const TransactionShowcaseSection: React.FC<{
  specificContentModule: TransactionShowcaseSectionModule;
  sharedContent?: any;
}> = ({ specificContentModule, sharedContent }) => {
  return (
    <TransactionShowcase
      {...specificContentModule}
      sharedContent={sharedContent}
      transactionLinkText={specificContentModule.linkText}
      viewAllButton={{
        href: specificContentModule?.link?.page?.slug?.current,
        title: specificContentModule?.link?.title,
      }}
    />
  );
};

export default TransactionShowcaseSection;