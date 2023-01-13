import React from 'react';

import { TransactionGridSectionModule } from '../../domain/contentModule';

import TransactionGridSectionComponent from 'components/TransactionGridSection';

export const TransactionGridSection: React.FC<{
  specificContentModule: TransactionGridSectionModule;
}> = ({ specificContentModule }) => {
  return <TransactionGridSectionComponent {...specificContentModule} />;
};

export default TransactionGridSection;
