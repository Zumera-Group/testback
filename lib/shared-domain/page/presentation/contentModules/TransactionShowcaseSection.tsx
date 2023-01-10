import React from 'react';

import { TransactionShowcaseSectionModule } from '../../domain/contentModule';

import TransactionShowCase from 'components/TransactionShowcase';

export const TransactionShowcaseSection: React.FC<{
  specificContentModule: TransactionShowcaseSectionModule;
  sharedContent?: any;
}> = ({ specificContentModule, sharedContent }) => {
  return (
    <TransactionShowCase
      {...specificContentModule}
      {...sharedContent}
    />
  );
};

export default TransactionShowcaseSection;